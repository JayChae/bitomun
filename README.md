# Bitomun

비트코인 한국 커뮤니티 플랫폼.
교육 리소스, 개발 자료, 글로벌 커뮤니티 연결을 제공합니다.

**도메인**: https://www.bitomun.com

## 주요 기능

### 1. 비트코인 개발 리소스

- Layer1 개발 리소스 (11개 카테고리)
- Layer2 (Lightning Network) 리소스 (7개 카테고리)
- 라이브러리, API, 유틸리티, 지갑, 하드웨어 등

### 2. 교육 콘텐츠

- 오프라인 교육 프로그램
- 개발 가이드 및 튜토리얼
- 서적, 강의, 인증 과정
- 1:1 컨설팅 신청

### 3. 글로벌 커뮤니티

- 6개 대륙, 27개국 커뮤니티 정보
- 국가별 비트코인 커뮤니티 연결

### 4. 지원 시스템

- 펀딩 신청
- 기타 문의
- 인턴십 프로그램

### 5. 후원

- Bitcoin 온체인 후원
- Lightning Network 후원

## 기술 스택

### Core

- **Next.js**: 15.5.9 (App Router)
- **React**: 19.1.2
- **TypeScript**: ^5
- **Node.js**: pnpm 10.6.3 (필수)

### UI & Styling

- **Tailwind CSS**: ^4 (OKLCH 색상 공간)
- **shadcn/ui**: New York 스타일
- **Lucide React**: 아이콘

### Internationalization

- **next-intl**: ^4.3.12
- **지원 언어**: 한국어(기본), 영어

### 외부 서비스

- **Google Sheets API**: 뉴스레터 구독자 관리
- **Resend**: 이메일 발송
- **Vercel**: 배포 및 호스팅

### 개발 도구

- **ESLint**: 코드 린팅
- **Prettier**: 코드 포맷팅
- **Husky**: Git hooks
- **lint-staged**: 커밋 전 자동 포맷팅

## 시작하기

### 필수 요구사항

- Node.js 20 이상
- pnpm 10.6.3

### 설치

```bash
# pnpm 설치 (없는 경우)
npm install -g pnpm

# 의존성 설치
pnpm install
```

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하세요. (문의 바람)

```env
# Resend (이메일 서비스)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=your_email@domain.com
ADMIN_EMAIL=admin@domain.com

# Google Sheets (뉴스레터 구독자 관리)
GOOGLE_SHEET_ID=your_sheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=base64_encoded_service_account_json
```

#### Google Sheets 설정 방법

1. Google Cloud Console에서 프로젝트 생성
2. Google Sheets API 활성화
3. 서비스 계정 생성 및 JSON 키 다운로드
4. JSON 파일을 Base64로 인코딩하여 `GOOGLE_PRIVATE_KEY`에 저장
5. Google Sheets를 서비스 계정 이메일과 공유

#### Resend 설정 방법

1. [Resend](https://resend.com) 가입
2. API 키 생성
3. 도메인 인증 (선택)

### 실행

```bash
# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# 린팅
pnpm lint

# 포맷팅
pnpm prettier
```

개발 서버: http://localhost:3000

## 프로젝트 구조

```
/
├── app/                      # Next.js App Router
│   ├── [locale]/            # 다국어 라우트
│   │   ├── page.tsx        # 홈페이지
│   │   ├── about/          # 소개
│   │   ├── development/    # 개발 리소스
│   │   │   ├── layer1/[category]/
│   │   │   └── layer2/[category]/
│   │   ├── education/      # 교육
│   │   ├── global/         # 글로벌 커뮤니티
│   │   │   └── [continent]/[country]/
│   │   ├── apply/          # 지원
│   │   ├── internship/     # 인턴십
│   │   └── support/        # 후원
│   ├── api/                # API 라우트
│   │   ├── spreadsheet/    # 뉴스레터 구독
│   │   ├── sponsorship-request/
│   │   ├── other-request/
│   │   └── consulting-request/
│   ├── robots.ts           # SEO
│   └── sitemap.ts          # SEO
├── components/             # 컴포넌트
│   ├── ui/                # shadcn UI
│   ├── forms/             # 폼 컴포넌트
│   ├── header.tsx         # 헤더
│   └── footer.tsx         # 푸터
├── i18n/                   # 다국어 설정
│   ├── routing.ts
│   ├── request.ts
│   └── navigation.ts
├── messages/               # 다국어 메시지
│   ├── ko.json            # 한국어
│   └── en.json            # 영어
├── lib/                    # 유틸리티
│   ├── utils.ts
│   └── rate-limit.ts
├── types/                  # TypeScript 타입
├── constants/              # 상수
├── public/                 # 정적 파일
├── middleware.ts           # Next.js 미들웨어
├── next.config.ts          # Next.js 설정
└── CLAUDE.md              # 개발 가이드
```

## API 엔드포인트

### POST /api/spreadsheet

뉴스레터 구독자 정보를 Google Sheets에 저장합니다.

**요청 본문**:

```json
{
  "name": "홍길동",
  "email": "hong@example.com"
}
```

**기능**:

- Rate limiting (분당 5회)
- 이메일 중복 체크
- 한국 시간대로 저장

### POST /api/sponsorship-request

펀딩 신청 이메일을 발송합니다.

**요청 본문**:

```json
{
  "name": "홍길동",
  "email": "hong@example.com",
  "phone": "010-1234-5678",
  "organization": "비트코인 재단",
  "message": "펀딩 신청 내용"
}
```

### POST /api/other-request

기타 문의 이메일을 발송합니다.

### POST /api/consulting-request

1:1 컨설팅 신청 이메일을 발송합니다.

## 주요 페이지

### 홈페이지 (`/`)

- 비트코인 소개
- 주요 기능 안내
- 뉴스레터 구독

### 개발 리소스 (`/development`)

- Layer1 리소스: 라이브러리, API, 노드 소프트웨어, 하드웨어 지갑 등
- Layer2 리소스: Lightning Network 관련 도구 및 서비스

### 교육 (`/education`)

- 오프라인 교육 프로그램
- 개발 가이드
- 1:1 컨설팅

### 글로벌 커뮤니티 (`/global`)

- 27개국 비트코인 커뮤니티 정보
- 대륙별 분류

### 지원 (`/apply`)

- 펀딩 신청
- 기타 문의

### 후원 (`/support`)

- Bitcoin 온체인 주소
- Lightning Address

## 다국어 지원

### 지원 언어

- 한국어 (ko) - 기본
- 영어 (en)

### 메시지 파일 구조

```
messages/
├── ko.json
└── en.json
```

### 사용 방법

#### 서버 컴포넌트

```typescript
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("landing");

  return <h1>{t("title")}</h1>;
}
```

#### 클라이언트 컴포넌트

```typescript
"use client";
import { useTranslations } from "next-intl";

export default function Component() {
  const t = useTranslations("subscribe");
  return <button>{t("button")}</button>;
}
```

### 링크

```typescript
import { Link } from "@/i18n/navigation";

// 자동으로 locale 포함
<Link href="/about">About</Link>
```

## SEO

### Metadata

모든 페이지에 `generateMetadata` 함수 구현.

- title, description
- Open Graph
- 언어 대체 URL

### Sitemap

- 자동 생성: `/sitemap.xml`
- 모든 페이지의 다국어 버전 포함
- 총 200개 이상의 URL

### Robots.txt

- 자동 생성: `/robots.txt`
- 모든 크롤러 허용

### Structured Data (JSON-LD)

- Organization
- Website
- EducationalOrganization

### 시멘틱 HTML

모든 페이지에서 시멘틱 태그 사용.

- `<main>`, `<article>`, `<section>`, `<header>`, `<nav>`

## 스타일링

### Tailwind CSS

- OKLCH 색상 공간 사용
- 다크 테마 기본
- 커스텀 애니메이션

### cn() 함수 사용 (필수)

조건부 스타일링 시 반드시 `cn()` 함수를 사용하세요.

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base-class",
  condition && "conditional-class",
  className
)} />
```

### shadcn/ui 컴포넌트

- New York 스타일
- `components/ui/` 디렉토리

## 성능 최적화

### Static Generation

- 모든 페이지에서 `setRequestLocale(locale)` 호출
- ISR 및 Static Generation 활성화

### 이미지

- Next.js Image 컴포넌트 사용
- SVG 허용
- 모든 도메인 허용

### 폰트

- Pretendard Variable (한국어)
- Local font 최적화
- swap, preload

### 번들링

- Turbopack 사용

## 보안

### Rate Limiting

- `/api/spreadsheet`: 분당 5회 제한
- IP 주소 기반

### 보안 헤더

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=()

### 데이터 검증

- 이메일 정규식 검증
- 필수 필드 검증

## 배포

### Vercel

프로젝트는 Vercel에 배포됩니다.

```bash
# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

### 환경 변수

Vercel 대시보드에서 환경 변수를 설정하세요.

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `ADMIN_EMAIL`
- `GOOGLE_SHEET_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

## 개발 가이드

### CLAUDE.md

상세한 개발 가이드는 [CLAUDE.md](CLAUDE.md)를 참조하세요.

주요 내용:

- 코드 스타일 규칙
- 컴포넌트 작성 규칙
- 서버 vs 클라이언트 컴포넌트
- 다국어 처리
- SEO 최적화
- 성능 최적화

### 개발 원칙

- 가독성 최우선
- 과도한 엔지니어링 지양
- 서버 컴포넌트 우선
- 클린 코드

### 네이밍 규칙

- 파일 및 폴더: kebab-case
- 컴포넌트: PascalCase
- 변수 및 함수: camelCase

## Git 워크플로우

### Husky & lint-staged

커밋 전 자동으로 린팅 및 포맷팅이 실행됩니다.

```bash
# 커밋
git add .
git commit -m "feat: 새 기능 추가"
```

### 커밋 메시지

간결하고 명확하게 작성하세요.

## 문제 해결

### 빌드 오류

```bash
# 캐시 삭제
rm -rf .next node_modules
pnpm install
pnpm build
```

### 환경 변수 오류

`.env` 파일이 올바르게 설정되었는지 확인하세요.

### Google Sheets 연동 오류

1. 서비스 계정 이메일이 시트와 공유되었는지 확인
2. Google Sheets API가 활성화되었는지 확인
3. `GOOGLE_PRIVATE_KEY`가 올바르게 Base64 인코딩되었는지 확인

### Resend 오류

1. API 키가 유효한지 확인
2. 도메인 인증 상태 확인

## 라이선스

MIT

## 기여

기여는 언제나 환영합니다.
이슈 및 풀 리퀘스트를 통해 참여해주세요.
