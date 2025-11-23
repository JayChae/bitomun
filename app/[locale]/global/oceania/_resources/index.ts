import { LocaleType, OceaniaResources } from "@/types";

import { australiaResourcesEn, australiaResourcesKo } from "./australia";

export const oceaniaResources: { [key in LocaleType]: OceaniaResources } = {
  en: {
    australia: australiaResourcesEn,
    "new-zealand": {},
  },
  ko: {
    australia: australiaResourcesKo,
    "new-zealand": {},
  },
};
