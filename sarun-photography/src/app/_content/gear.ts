import type { LocalizedString } from "./portrait-albums";

export type GearItem = {
  id: string;
  name: LocalizedString;
  /** Short note (e.g. lens type or “model TBD”). */
  detail: LocalizedString;
};

/** Camera and lenses — update `name` / `detail` when you have exact models. */
export const gearItems: GearItem[] = [
  {
    id: "camera-body",
    name: { en: "Nikon D5600", th: "Nikon D5600" },
    detail: { en: "Camera body", th: "ตัวกล้อง" },
  },
  {
    id: "prime-35mm",
    name: { en: "35mm lens", th: "เลนส์ 35mm" },
    detail: { en: "Prime — model to be added", th: "Prime — จะระบุรุ่นภายหลัง" },
  },
  {
    id: "kit-lens",
    name: { en: "Kit lens", th: "เลนส์คิท" },
    detail: { en: "Model to be added", th: "จะระบุรุ่นภายหลัง" },
  },
  {
    id: "tele-lens",
    name: { en: "Telephoto lens", th: "เลนส์เทเล" },
    detail: { en: "Model to be added", th: "จะระบุรุ่นภายหลัง" },
  },
];
