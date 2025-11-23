import { AsiaResources, LocaleType } from "@/types";

import { japanResourcesEn, japanResourcesKo } from "./japan";
import { koreaResourcesEn, koreaResourcesKo } from "./korea";

export const asiaResources: { [key in LocaleType]: AsiaResources } = {
  en: {
    japan: japanResourcesEn,
    korea: koreaResourcesEn,
    taiwan: {},
    indonesia: {},
    india: {},
  },
  ko: {
    japan: japanResourcesKo,
    korea: koreaResourcesKo,
    taiwan: {},
    indonesia: {},
    india: {},
  },
};
