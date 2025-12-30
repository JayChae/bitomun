# Bitomun 프로젝트 개발 가이드

## 프로젝트 개요

비트코인 한국 커뮤니티 플랫폼으로, SEO와 다국어 지원(한국어/영어)이 핵심인 Next.js 기반 웹사이트입니다.

## 기술 스택

### Core Framework

- **Next.js**: 15.5.7 (App Router)
- **React**: 19.1.2
- **TypeScript**: ^5
- **Node.js**: pnpm@10.6.3+sha512 (필수)

### UI & Styling

- **Tailwind CSS**: ^4 (OKLCH 색상 공간 사용)
- **shadcn/ui**: New York 스타일
- **Lucide React**: 아이콘 라이브러리

### Internationalization

- **next-intl**: ^4.3.12
- **지원 언어**: 한국어(ko, 기본), 영어(en)
- **메시지 파일**: `/messages/ko.json`, `/messages/en.json`

## 프로젝트 구조

```
/
├── app/
│   ├── [locale]/              # 다국어 라우트
│   │   ├── page.tsx          # 홈페이지
│   │   ├── about/            # 소개 페이지
│   │   ├── development/      # 개발 리소스
│   │   │   ├── layer1/[category]/
│   │   │   └── layer2/[category]/
│   │   ├── education/        # 교육 리소스
│   │   ├── global/[continent]/[country]/  # 글로벌 커뮤니티
│   │   ├── apply/            # 지원 페이지
│   │   ├── internship/       # 인턴십
│   │   └── support/          # 후원
│   ├── api/                  # API 라우트
│   │   ├── spreadsheet/      # Google Sheets 연동
│   │   ├── subscribe/        # 뉴스레터 구독
│   │   └── consulting-request/
│   ├── robots.ts             # SEO: robots.txt
│   └── sitemap.ts            # SEO: sitemap.xml
├── components/
│   ├── ui/                   # shadcn UI 컴포넌트
│   └── [공유 컴포넌트]        # 프로젝트 공용 컴포넌트
├── i18n/
│   ├── routing.ts            # 라우팅 설정
│   ├── request.ts            # 요청 설정
│   └── navigation.ts         # 타입 안전 네비게이션
├── messages/                 # 다국어 메시지
│   ├── en.json
│   └── ko.json
├── lib/                      # 유틸리티 함수
│   ├── utils.ts              # cn() 함수 등
│   └── rate-limit.ts         # Rate limiting
├── types/                    # TypeScript 타입 정의
├── constants/                # 상수 정의
└── public/                   # 정적 파일
```

## 개발 규칙

### 1. 코드 스타일

#### 클린 코드 원칙

- **가독성 최우선**: 초등학생도 이해할 수 있을 정도로 명확하게 작성
- **단순성 유지**: 과도한 추상화와 엔지니어링 지양
- **명확한 네이밍**: 변수, 함수, 컴포넌트 이름은 목적을 명확히 표현

#### 파일 및 폴더 네이밍

- **kebab-case 사용**: `user-profile.tsx`, `api-client.ts`
- **컴포넌트 파일**: `component-name.tsx`
- **페이지 파일**: `page.tsx` (Next.js App Router 규칙)

### 3. 컴포넌트 작성 규칙

- 컴포넌트 분리:유지보수에 좋은 컴포넌트 분리를 고려한다.
- 컴포넌트 분리 위치: 컴포넌트 분리할 때 페이지 내에 필요한 컴포넌트는 페이지 파일 안에 작성한다.

### 4. 서버 vs 클라이언트 컴포넌트

#### 기본 원칙: **서버 컴포넌트 우선**

모든 컴포넌트는 기본적으로 서버 컴포넌트로 작성하고, 필요한 경우에만 클라이언트 컴포넌트로 전환합니다.

#### 서버 컴포넌트 (기본)

```typescript
// app/[locale]/page.tsx
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale); // Static rendering 활성화
  const t = await getTranslations("landing");

  return (
    <main>
      <h1>{t("title")}</h1>
    </main>
  );
}
```

**서버 컴포넌트를 사용해야 하는 경우:**

- 데이터 fetching이 필요한 경우
- SEO가 중요한 콘텐츠
- 민감한 정보나 API 키를 다루는 경우
- 번들 사이즈를 줄이고 싶은 경우

#### shadcn 컴포넌트 사용 시

- **가능한 경우 trigger만 사용**하여 서버 컴포넌트 유지
- Dialog, Popover 등은 trigger를 서버 컴포넌트에서 사용하고, 내부 컨텐츠만 클라이언트로 분리

### 5. 스타일링

#### Tailwind CSS 사용법

**cn() 함수 사용** (필수)

**중요: 조건부 스타일링이나 변수로 className을 구분할 때는 반드시 cn() 함수를 사용해야 합니다.**

```typescript
import { cn } from "@/lib/utils";

// ✅ 올바른 방법 - cn() 함수 사용
<div className={cn(
  "border-border bg-card/50 relative h-full",
  "hover:scale-[1.02] hover:shadow-xl",
  isActive && "border-primary",
  className // props로 받은 추가 클래스
)} />

// ✅ 조건부 스타일링 - cn() 사용
<div className={cn(
  "absolute inset-0 transition-colors",
  isBitcoin
    ? "bg-gradient-to-br from-orange-500/10"
    : "bg-gradient-to-br from-yellow-500/10"
)} />

// ❌ 잘못된 방법 - 템플릿 리터럴 직접 사용 (절대 사용 금지)
<div className={`absolute inset-0 transition-colors ${
  isBitcoin ? "bg-orange-500" : "bg-yellow-500"
}`} />
```

**cn() 함수를 사용해야 하는 경우:**

- 조건부 스타일링 (삼항 연산자, && 연산자 등)
- props로 className을 받아 병합할 때
- 변수로 스타일을 구분해야 할 때
- 동적으로 클래스를 추가/제거할 때

### 6. 다국어 처리 (next-intl)

#### 서버 컴포넌트

```typescript
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale); // Static rendering 활성화 (필수!)
  const t = await getTranslations("landing");

  return <h1>{t("title")}</h1>;
}
```

#### 클라이언트 컴포넌트

```typescript
"use client";

import { useTranslations } from "next-intl";

export default function ClientComponent() {
  const t = useTranslations("subscribe");
  return <button>{t("button")}</button>;
}
```

#### 링크 사용

```typescript
import { Link } from "@/i18n/navigation";

// 자동으로 현재 locale이 포함됨
<Link href="/about">About</Link>  // → /ko/about 또는 /en/about
```

#### 메시지 파일 구조 (`messages/ko.json`)

페이지.title 형식으로 작성한다

```json
{
  "Metadata": {
    "title": "Bitomun",
    "pages": {
      "home": {
        "title": "홈",
        "description": "비트코인 한국 커뮤니티"
      }
    }
  },
  "landing": {
    "title": "환영합니다",
    "subtitle": "비트코인 커뮤니티"
  }
}
```

### 7. SEO 최적화

#### Metadata 생성

```typescript
// app/[locale]/layout.tsx 또는 page.tsx
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.pages.home" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://www.bitomun.com",
      siteName: "Bitomun",
      images: [{ url: "/og-image.png" }],
      locale: locale,
      type: "website",
    },
    alternates: {
      languages: {
        en: "/en",
        ko: "/ko",
        "x-default": "/ko",
      },
    },
  };
}
```

#### 시멘틱 HTML 사용 (필수)

```typescript
<main>
  <article>
    <header>
      <h1>{t("title")}</h1>
      <p>{t("subtitle")}</p>
    </header>

    <section>
      <h2>{t("sectionTitle")}</h2>
      <p>{t("content")}</p>
    </section>
  </article>

  <aside>
    <nav aria-label="Related links">
      {/* 관련 링크 */}
    </nav>
  </aside>
</main>
```

#### 구조화된 데이터 (JSON-LD)

```typescript
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/json-ld";

export default function Layout() {
  return (
    <>
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      {children}
    </>
  );
}
```

### 8. 성능 최적화

#### Static Generation 활성화

```typescript
// 모든 페이지에서 setRequestLocale 호출 (필수)
import { setRequestLocale } from "next-intl/server";

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale); // ← 이것이 static generation을 활성화함
  // ...
}
```

## 코드 변경 후 보고

코드 변경 후에는 **반드시** 요약 보고를 작성합니다.

코드 변경 후에는 꼭 요약해서 보고 한다. 보고 할때는 아래 사항을 꼭 지킨다.

- 항상 클릭하면 변경한 코드로 갈 수 있게 링크를 걸어준다.
- 파일 링크 뿐만 아니라 줄까지 언급해 클릭만하면 바로 볼 수 있도록 한다.

**링크 형식**: 파일명과 줄 번호를 **반드시** 포함하여 클릭 시 해당 코드로 바로 이동

- 단일 줄: `[파일명:줄번호](경로#L줄번호)`
- 여러 줄: `[파일명:시작줄-끝줄](경로#L시작줄-L끝줄)`

### 예시

```markdown
## 변경 사항

### 1. [subscribe-modal.tsx](components/subscribe-modal.tsx#L15-L30)

- useState를 사용하여 모달 open 상태 관리 추가
- 구독 버튼 클릭 시 모달이 열리도록 구현

### 2. [page.tsx](app/[locale]/page.tsx#L45)

- SubscribeModal 컴포넌트 추가
- 히어로 섹션에 구독 버튼 추가

## 테스트 필요 사항

- [ ] 모바일에서 모달이 정상 작동하는지 확인
- [ ] 구독 폼 제출 시 이메일이 전송되는지 확인
```

## 자주 사용하는 명령어

```bash
# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# 린팅
pnpm lint

# 타입 체크
pnpm type-check
```

## 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [next-intl 공식 문서](https://next-intl-docs.vercel.app/)
- [shadcn/ui 공식 문서](https://ui.shadcn.com/)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
