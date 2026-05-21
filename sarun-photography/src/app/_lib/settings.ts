import siteSettings from "../../../settings.json";

export type SiteSettings = {
  rates: {
    halfDayThb: number;
    fullDayThb: number;
  };
};

export const settings: SiteSettings = siteSettings;
