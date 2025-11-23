const baseUrl = "https://www.bitomun.com";

export function OrganizationJsonLd({ locale }: { locale: string }) {
  const isKorean = locale === "ko";

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bitomun",
    alternateName: isKorean ? "비토문" : "Bitomun",
    url: baseUrl,
    logo: `${baseUrl}/images/icon.webp`,
    description: isKorean
      ? "비토문은 비트코인을 알고자 하시는분들에게 해답의 열쇠를 드립니다. 올바른 비트코인 문화 확산과 산업 확대를 위해 자격을 갖춘 사람과 단체에게 후원합니다."
      : "Bitomun is the key to unlocking the answers for those who want to learn about Bitcoin. We support qualified individuals and organizations to spread the correct Bitcoin culture and expand the industry.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@bitomun.com",
      contactType: "customer service",
      availableLanguage: ["Korean", "English"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  );
}

export function WebsiteJsonLd({ locale }: { locale: string }) {
  const isKorean = locale === "ko";

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Bitomun",
    alternateName: isKorean ? "비토문" : "Bitomun",
    url: baseUrl,
    description: isKorean
      ? "비트코인 교육, 개발 리소스, 글로벌 커뮤니티 정보를 제공하는 플랫폼"
      : "A platform providing Bitcoin education, development resources, and global community information",
    inLanguage: isKorean ? "ko-KR" : "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
    />
  );
}

export function EducationalOrganizationJsonLd({ locale }: { locale: string }) {
  const isKorean = locale === "ko";

  const educationalOrgData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Bitomun",
    alternateName: isKorean ? "비토문" : "Bitomun",
    url: baseUrl,
    logo: `${baseUrl}/images/icon.webp`,
    description: isKorean
      ? "비트코인 교육 및 개발자 양성 프로그램을 제공하는 교육 기관"
      : "Educational organization providing Bitcoin education and developer training programs",
    areaServed: "Worldwide",
    knowsAbout: [
      "Bitcoin",
      "Lightning Network",
      "Cryptocurrency",
      "Blockchain Technology",
      "Bitcoin Development",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgData) }}
    />
  );
}
