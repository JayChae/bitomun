import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type SubscribeData = {
  name: string;
  email: string;
};

export async function POST(request: NextRequest) {
  try {
    const data: SubscribeData = await request.json();

    // 필수 필드 검증
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: "필수 정보가 누락되었습니다." },
        { status: 400 },
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "유효하지 않은 이메일 형식입니다." },
        { status: 400 },
      );
    }

    // Nodemailer transporter 설정
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // 관리자에게 보낼 이메일 내용
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL, // 구독 정보를 받을 관리자 이메일
      subject: `[비트문] 새로운 구독 신청 - ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">새로운 구독 신청이 접수되었습니다.</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>이름:</strong> ${data.name}</p>
            <p style="margin: 10px 0;"><strong>이메일:</strong> ${data.email}</p>
            <p style="margin: 10px 0;"><strong>신청 시간:</strong> ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}</p>
          </div>
          <p style="color: #666; font-size: 14px;">이 이메일은 비트문 웹사이트에서 자동으로 발송되었습니다.</p>
        </div>
      `,
    };

    // 이메일 전송
    await transporter.sendMail(mailOptions);

    // 콘솔에도 로그 출력
    console.log("=== 새로운 구독 신청 ===");
    console.log("이름:", data.name);
    console.log("이메일:", data.email);
    console.log("신청 시간:", new Date().toISOString());
    console.log("========================");

    return NextResponse.json(
      { message: "구독 신청이 성공적으로 접수되었습니다." },
      { status: 200 },
    );
  } catch (error) {
    console.error("구독 신청 처리 중 오류:", error);

    // 이메일 전송 실패 시에도 콘솔에 정보 로깅
    const data = await request.json().catch(() => ({}));
    console.log("=== 구독 신청 (이메일 전송 실패) ===");
    console.log("데이터:", data);
    console.log("===================================");

    return NextResponse.json(
      { error: "서버 오류가 발생했습니다. 나중에 다시 시도해주세요." },
      { status: 500 },
    );
  }
}
