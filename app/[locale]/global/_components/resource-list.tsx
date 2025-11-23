import { CountryResources, OrganizationCategory } from "@/types";

import { ContinentColorTheme } from "../_constants";
import { ResourceCard } from "./resource-card";

type ResourceListProps = {
  countryData: CountryResources;
  categories: OrganizationCategory[];
  categoryLabels: Record<OrganizationCategory, string>;
  emptyState: {
    title: string;
    description: string;
  };
  comingSoonText: string;
  theme: ContinentColorTheme;
};

export function ResourceList({
  countryData,
  categories,
  categoryLabels,
  emptyState,
  comingSoonText,
  theme,
}: ResourceListProps) {
  const hasResources = categories.some(
    (cat) => countryData[cat] && countryData[cat].length > 0,
  );

  if (!hasResources) {
    return (
      <div className="text-muted-foreground flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 p-6 dark:from-gray-800 dark:to-gray-700">
          <svg
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-semibold">{emptyState.title}</h3>
        <p className="max-w-sm">{emptyState.description}</p>
      </div>
    );
  }

  return (
    <div className="mb-12 space-y-16">
      {categories.map((category, index) => {
        const resources = countryData[category];
        const isEmpty = !resources || resources.length === 0;

        return (
          <div key={category} className="relative">
            {/* 카테고리 헤더 */}
            <div className="mb-8 flex items-center gap-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${theme.iconGradient} text-white shadow-lg ${theme.iconShadow}`}>
                <span className="text-lg font-bold">{index + 1}</span>
              </div>
              <h3 className="text-lg font-bold tracking-tight sm:text-xl lg:text-2xl">
                {categoryLabels[category]}
              </h3>
            </div>

            {isEmpty ? (
              <p className="text-muted-foreground text-sm">{comingSoonText}</p>
            ) : (
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
                {resources.map((resource, resourceIndex) => (
                  <li
                    key={resource.name}
                    className="h-full"
                    style={{
                      animationDelay: `${resourceIndex * 100}ms`,
                    }}
                  >
                    <ResourceCard
                      href={resource.url}
                      logo={resource.logo}
                      name={resource.name}
                      description={resource.description}
                      theme={theme}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
