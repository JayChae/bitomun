# 이메일 구독 기능 설정 가이드

nodemailer를 사용한 구독 기능이 구현되었습니다. 이메일을 받기 위해 아래 설정을 완료해주세요.

## 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 아래 내용을 추가하세요:

```env
# SMTP 이메일 설정
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@yourdomain.com

# 구독 정보를 받을 관리자 이메일
ADMIN_EMAIL=admin@yourdomain.com
```

## Gmail 사용 시 설정 방법

### 1. Google 앱 비밀번호 생성

Gmail을 사용하는 경우 2단계 인증을 활성화하고 앱 비밀번호를 생성해야 합니다:

1. Google 계정 설정으로 이동: https://myaccount.google.com/
2. 보안 > 2단계 인증 활성화
3. 앱 비밀번호 생성: https://myaccount.google.com/apppasswords
4. "메일" 선택 후 16자리 비밀번호 생성
5. 생성된 비밀번호를 `SMTP_PASSWORD`에 입력

### 2. Gmail 설정 예시

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=youremail@gmail.com
SMTP_PASSWORD=abcd efgh ijkl mnop  # 앱 비밀번호 (공백 제거)
SMTP_FROM=youremail@gmail.com
ADMIN_EMAIL=youremail@gmail.com
```

## 다른 이메일 서비스 사용

### Naver 메일

```env
SMTP_HOST=smtp.naver.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-id@naver.com
SMTP_PASSWORD=your-password
```

### Daum 메일

```env
SMTP_HOST=smtp.daum.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-id@daum.net
SMTP_PASSWORD=your-password
```

### Office 365 / Outlook

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-password
```

## 테스트 방법

1. 환경 변수 설정 완료 후 개발 서버 재시작:

   ```bash
   pnpm dev
   ```

2. 웹사이트에서 구독 버튼 클릭하여 테스트

3. 설정한 `ADMIN_EMAIL`로 구독 알림 이메일이 도착하는지 확인

## 구현된 기능

- ✅ 구독 모달에서 이름과 이메일 입력
- ✅ API 엔드포인트 (`/api/subscribe`)를 통한 데이터 전송
- ✅ nodemailer를 사용한 이메일 전송
- ✅ 관리자 이메일로 구독 정보 알림
- ✅ 입력 유효성 검사 (이메일 형식 확인)
- ✅ 에러 처리 및 사용자 피드백

## 파일 구조

```
app/
  └── api/
      └── subscribe/
          └── route.ts          # 구독 API 엔드포인트

components/
  └── subscribe-modal.tsx       # 구독 모달 컴포넌트 (업데이트됨)
```

## 주의사항

- `.env.local` 파일은 절대 git에 커밋하지 마세요
- SMTP 비밀번호는 안전하게 보관하세요
- Gmail 앱 비밀번호는 일반 비밀번호와 다릅니다
- 운영 환경(Vercel, AWS 등)에서는 환경 변수를 해당 플랫폼의 설정에서 입력하세요

## 문제 해결

### 이메일이 전송되지 않는 경우

1. 환경 변수가 올바르게 설정되었는지 확인
2. 개발 서버를 재시작했는지 확인
3. 콘솔 로그에서 에러 메시지 확인
4. Gmail 사용 시 앱 비밀번호를 사용했는지 확인
5. 방화벽에서 SMTP 포트(587, 465)가 열려있는지 확인

### TypeScript 에러가 표시되는 경우

IDE에서 TypeScript 서버를 재시작하세요:

- VSCode: `Ctrl+Shift+P` > "TypeScript: Restart TS Server"
- Cursor: `Ctrl+Shift+P` > "TypeScript: Restart TS Server"
