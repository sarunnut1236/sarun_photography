import type { LocalizedString } from "./portrait-albums";

export type GearItem = {
  id: string;
  name: LocalizedString;
  detail: LocalizedString;
};

export const gearItems: GearItem[] = [
  {
    id: "camera-body",
    name: { en: "Nikon D5600", th: "Nikon D5600" },
    detail: { en: "My favorite DSLR", th: "กล้องกระจกตัวโปรดของผม" },
  },
  {
    id: "kit-lens",
    name: { en: "18-55mm f/3.5-5.6", th: "18-55mm f/3.5-5.6" },
    detail: { en: "A versatile Kit lens", th: "เลนส์คิทมาตรฐาน แถมมากับกล้อง ใช้งานได้ยืดหยุ่นสุบ ๆ" },
  },
  {
    id: "prime-35mm",
    name: { en: "35mm f/1.8", th: "35mm f/1.8" },
    detail: { en: "Bokeh lens for portrait", th: "เลนส์หน้าชัดหลังเบลอเอาไว้ถ่ายพอร์ตเทรต" },
  },
  {
    id: "tele-lens",
    name: { en: "70-300mm f/4-5.6", th: "70-300mm f/4-5.6" },
    detail: { en: "Telephoto lens, mostly used for landscape", th: "เลนส์เทเล ส่วนใหญ่เอาไว้ถ่าย landscape" },
  },
  {
    id: "tripod",
    name: { en: "Tripod", th: "ขาตั้งกล้อง" },
    detail: { en: "Used for long exposure photos", th: "เอาไว้ถ่าย long exposure" },
  },
];
