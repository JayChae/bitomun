import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { NextRequest, NextResponse } from "next/server";

import { rateLimit } from "@/lib/rate-limit";

// Rate limiter: 5 requests per minute per IP
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max 500 unique IPs per interval
});

async function loadGoogleDoc() {
  try {
    // Base64로 인코딩된 서비스 계정 JSON을 디코딩
    const base64Credentials = process.env.GOOGLE_PRIVATE_KEY || "";
    const decodedCredentials = Buffer.from(
      base64Credentials,
      "base64",
    ).toString("utf-8");
    const credentials = JSON.parse(decodedCredentials);

    //  Google Sheets API를 등록하는 과정에서 발급받은 키, 이메일을 입력해주세요.
    const serviceAccountAuth = new JWT({
      key: credentials.private_key,
      email: credentials.client_email,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    // Google Doc의 SheetId를 입력해주세요.
    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEET_ID || "",
      serviceAccountAuth,
    );
    await doc.loadInfo();
    return doc;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier =
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip") ??
      "anonymous";
    const rateLimitResult = await limiter.check(5, identifier);

    if (!rateLimitResult.success) {
      console.warn("⚠️ Rate limit exceeded:", identifier);
      return NextResponse.json(
        { ok: false, errorCode: "TOO_MANY_REQUESTS" },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { name, email } = body;

    console.log("📝 구독 요청:", { name, email });

    if (!name || !email) {
      console.error("❌ 필수 필드 누락:", { name, email });
      return NextResponse.json(
        { ok: false, errorCode: "REQUIRED_FIELDS" },
        { status: 400 },
      );
    }

    const doc = await loadGoogleDoc();
    if (!doc) {
      console.error("❌ 스프레드시트 연결 실패");
      return NextResponse.json(
        { ok: false, errorCode: "SPREADSHEET_ERROR" },
        { status: 500 },
      );
    }

    console.log("✅ 스프레드시트 연결 성공");

    // "구독자정보" 라는 이름의 sheet가 존재하는지 확인하고, 없다면 만들어줍니다.
    let sheet = doc.sheetsByTitle["구독자정보"];
    if (!sheet) {
      console.log("📄 새 시트 생성 중...");
      sheet = await doc.addSheet({
        headerValues: ["name", "email", "createdAt"],
        title: "구독자정보",
      });
    }

    // sheet에서 모든 row 정보를 가져옵니다.
    const rows = await sheet.getRows();
    console.log(`📊 기존 행 개수: ${rows.length}`);

    // 이미 등록된 이메일인지 검증합니다 (개선된 중복 체크)
    const existingEmails = new Set(
      rows.map((row) => row.get("email")).filter(Boolean),
    );
    if (existingEmails.has(email)) {
      console.warn("⚠️ 이미 등록된 이메일:", email);
      return NextResponse.json(
        { ok: false, errorCode: "DUPLICATE_EMAIL" },
        { status: 400 },
      );
    }

    // 한국 시간으로 변환
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const koreaTimeDiff = 9 * 60 * 60 * 1000;
    const koreaTime = new Date(utc + koreaTimeDiff).toLocaleString();

    // sheet에 새로운 정보를 등록해줍니다.
    await sheet.addRow({
      name,
      email,
      createdAt: koreaTime,
    });

    console.log("✅ 구독자 정보 저장 완료:", { name, email });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("❌ 에러 발생:", error);
    return NextResponse.json(
      { ok: false, errorCode: "SERVER_ERROR" },
      { status: 500 },
    );
  }
}
