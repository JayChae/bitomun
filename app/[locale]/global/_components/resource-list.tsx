import { Inbox } from "lucide-react";

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
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div
          className={`mb-5 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.iconGradient} shadow-lg ${theme.iconShadow}`}
        >
          <Inbox className="size-8 text-white" strokeWidth={1.5} />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          {emptyState.title}
        </h3>
        <p className="max-w-sm text-sm text-gray-500 dark:text-gray-400">
          {emptyState.description}
        </p>
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
