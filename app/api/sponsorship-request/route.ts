import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type SponsorshipRequest = {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  amount?: string;
  message: string;
};

export async function POST(request: NextRequest) {
  try {
    const data: SponsorshipRequest = await request.json();

    // 필수 필드 검증
    if (!data.name || !data.email || !data.message) {
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
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // 관리자에게 보낼 이메일
    const adminMailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `[비토문] 새로운 스폰서십 신청 - ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">새로운 스폰서십 신청이 접수되었습니다.</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>이름:</strong> ${data.name}</p>
            <p style="margin: 10px 0;"><strong>이메일:</strong> ${data.email}</p>
            ${data.phone ? `<p style="margin: 10px 0;"><strong>전화번호:</strong> ${data.phone}</p>` : ""}
            ${data.organization ? `<p style="margin: 10px 0;"><strong>조직/기관:</strong> ${data.organization}</p>` : ""}
            ${data.amount ? `<p style="margin: 10px 0;"><strong>후원 금액:</strong> ${data.amount}</p>` : ""}
            <p style="margin: 10px 0;"><strong>메시지:</strong></p>
            <p style="margin: 10px 0; padding: 15px; background-color: white; border-left: 3px solid #f97316; white-space: pre-wrap;">${data.message}</p>
            <p style="margin: 10px 0;"><strong>신청 시간:</strong> ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}</p>
          </div>
          <p style="color: #666; font-size: 14px;">이 이메일은 비토문 웹사이트에서 자동으로 발송되었습니다.</p>
        </div>
      `,
    };

    // 신청자에게 보낼 확인 이메일
    const applicantMailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: data.email,
      subject: `[비토문] 스폰서십 신청이 접수되었습니다`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">안녕하세요, ${data.name}님</h2>
          <p style="font-size: 16px; line-height: 1.6;">비토문 스폰서십 신청이 정상적으로 접수되었습니다.</p>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #f97316;">신청 내용</h3>
            <p style="margin: 10px 0;"><strong>이름:</strong> ${data.name}</p>
            <p style="margin: 10px 0;"><strong>이메일:</strong> ${data.email}</p>
            ${data.phone ? `<p style="margin: 10px 0;"><strong>전화번호:</strong> ${data.phone}</p>` : ""}
            ${data.organization ? `<p style="margin: 10px 0;"><strong>조직/기관:</strong> ${data.organization}</p>` : ""}
            ${data.amount ? `<p style="margin: 10px 0;"><strong>후원 금액:</strong> ${data.amount}</p>` : ""}
            <p style="margin: 10px 0;"><strong>메시지:</strong></p>
            <p style="margin: 10px 0; padding: 15px; background-color: white; border-left: 3px solid #f97316; white-space: pre-wrap;">${data.message}</p>
            <p style="margin: 10px 0;"><strong>신청 시간:</strong> ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}</p>
          </div>

          <p style="font-size: 16px; line-height: 1.6;">
            담당자가 검토 후 빠른 시일 내에 연락드리겠습니다.<br>
            감사합니다.
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

          <p style="color: #666; font-size: 14px;">
            비토문 (Bitomun)<br>
            이 이메일은 자동으로 발송되었습니다.
          </p>
        </div>
      `,
    };

    // 두 이메일 모두 전송
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(applicantMailOptions),
    ]);

    // 콘솔 로그
    console.log("=== 새로운 스폰서십 신청 ===");
    console.log("이름:", data.name);
    console.log("이메일:", data.email);
    console.log("전화번호:", data.phone || "(없음)");
    console.log("조직/기관:", data.organization || "(없음)");
    console.log("후원 금액:", data.amount || "(없음)");
    console.log("메시지:", data.message);
    console.log("신청 시간:", new Date().toISOString());
    console.log("========================");

    return NextResponse.json(
      { message: "스폰서십 신청이 성공적으로 접수되었습니다." },
      { status: 200 },
    );
  } catch (error) {
    console.error("스폰서십 신청 처리 중 오류:", error);

    return NextResponse.json(
      { error: "서버 오류가 발생했습니다. 나중에 다시 시도해주세요." },
      { status: 500 },
    );
  }
}
