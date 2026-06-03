import type { LocalizedString } from "./portrait-albums";
import type { LandscapePhoto } from "./landscape-photos";

export type LandscapeThemeId = LandscapePhoto["theme"];

export type LandscapeTheme = {
  id: LandscapeThemeId;
  title: LocalizedString;
  description: LocalizedString;
};

export const landscapeThemes: LandscapeTheme[] = [
  {
    id: "cityscape",
    title: { en: "Cityscape", th: "ภาพซิตี้สเคป" },
    description: {
      en: "Whenever I spot something pretty, I shoot it — temples, buildings, or even nice car light trails.",
      th: "เจออะไรสวย ๆ ก็ถ่ายมา ไม่ว่าจะเป็น วัดวาอาราม ตึก หรือว่าไฟรถสวย ๆ",
    },
  },
  {
    id: "landscape",
    title: { en: "Landscape", th: "ภาพแลนด์สเคป" },
    description: {
      en: "Sweeping views of forests and mountains — just to show how grand nature really is.",
      th: "วิวทิวทัศน์ป่าเขาลำเนาไพร ให้มันรู้ไปเลยว่าธรรมชาติมันยิ่งใหญ่แค่ไหน",
    },
  },
  {
    id: "nature",
    title: { en: "Nature", th: "ภาพธรรมชาติ" },
    description: {
      en: "Close-ups of the beautiful things in nature — plants, animals, the sun, or natural phenomena.",
      th: "ถ่ายเจาะจงสิ่งสวยงามในธรรมชาติ ไม่ว่าจะเป็นพืช สัตว์ พระอาทิตย์ หรือว่าปรากฎการณ์ทางธรรมชาติ",
    },
  },
  {
    id: "star",
    title: { en: "Stars", th: "ภาพดาว" },
    description: {
      en: "The stars still shine bright tonight — you've got to escape the city's light pollution to actually catch them.",
      th: "ค่ำคืนนี้ยังมีดวงดาวเจิดจ้า ต้องออกไปต่างจังหวัดที่มีมลพิษทางแสงน้อย ๆ ถึงจะถ่ายติดดาว",
    },
  },
  {
    id: "sky",
    title: { en: "Sky", th: "ภาพท้องฟ้า" },
    description: {
      en: "After school every day I'd grab my camera and bike out to shoot the evening sky — the clouds are gorgeous and never the same twice.",
      th: "ทุกวันตอนหลังเลิกเรียนผมชอบถือกล้องแล้วปั่นจักรยานออกไปถ่ายท้องฟ้าตอนเย็น เมฆแต่ละวันมันสวยไม่เคยเหมือนกันเลย",
    },
  },
  {
    id: "architecture",
    title: { en: "Architecture", th: "ภาพสถาปัตยกรรม" },
    description: {
      en: "Beautiful architecture shot up close and intentional — not the wide overview like cityscape.",
      th: "สถาปัตยกรรมสวย ๆ ถ่ายแบบเจาะจง ไม่ได้ถ่ายรวม ๆ เหมือน cityscape",
    },
  },
  {
    id: "minimalism",
    title: { en: "Minimalism", th: "ภาพมินิมอล" },
    description: {
      en: "A super artsy style — I just shoot whatever I feel like.",
      th: "เป็นสไตล์ที่ติสต์มาก อยากถ่ายอะไรก็ถ่าย",
    },
  },
];
