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
      en: "Bangkok and other cities at the edges of the day — skylines, streets, and pockets of quiet between buildings.",
      th: "กรุงเทพฯ และเมืองอื่น ๆ ช่วงแสงเปลี่ยน — เส้นขอบฟ้า ถนน และมุมเงียบ ๆ ระหว่างตึก",
    },
  },
  {
    id: "landscape",
    title: { en: "Landscape", th: "ภาพแลนด์สเคป" },
    description: {
      en: "Wider views from road trips and hikes — valleys, ridges, and horizons that made me stop the car.",
      th: "ภาพกว้างจากทริปและการเดินป่า — หุบเขา สันเขา และเส้นขอบฟ้าที่ทำให้ต้องจอดรถ",
    },
  },
  {
    id: "nature",
    title: { en: "Nature", th: "ภาพธรรมชาติ" },
    description: {
      en: "Forests, water, and small details outdoors — the parts of a place that feel alive rather than scenic only.",
      th: "ป่า น้ำ และรายละเอียดเล็ก ๆ กลางแจ้ง — สิ่งที่ทำให้รู้สึกว่าสถานที่นั้นมีชีวิต ไม่ใช่แค่สวย",
    },
  },
  {
    id: "star",
    title: { en: "Stars", th: "ภาพดาว" },
    description: {
      en: "Night sky experiments — learning how little light the sensor needs and how patient you have to be.",
      th: "ทดลองถ่ายท้องฟ้ายามค่ำ — เรียนรู้ว่าเซนเซอร์ต้องการแสงน้อยแค่ไหน และต้องอดทนแค่ไหน",
    },
  },
  {
    id: "sky",
    title: { en: "Sky", th: "ภาพท้องฟ้า" },
    description: {
      en: "Clouds, sunsets, and changing weather — often the reason I pointed the camera up instead of ahead.",
      th: "เมฆ พระอาทิตย์ตกดิน และอากาศที่เปลี่ยน — บ่อยครั้งเป็นสาเหตุที่หันกล้องขึ้นฟ้าแทนข้างหน้า",
    },
  },
  {
    id: "architecture",
    title: { en: "Architecture", th: "ภาพสถาปัตยกรรม" },
    description: {
      en: "Temples, structures, and lines in built spaces — shape, symmetry, and how light falls on surfaces.",
      th: "วัด สิ่งปลูกสร้าง และเส้นในพื้นที่ที่มนุษย์สร้าง — รูปทรง สมมาตร และแสงที่กระทบผิว",
    },
  },
  {
    id: "minimalism",
    title: { en: "Minimalism", th: "ภาพมินิมอล" },
    description: {
      en: "Frames with not much in them on purpose — a few elements, negative space, and calm composition.",
      th: "เฟรมที่ตั้งใจให้ไม่มีของมาก — องค์ประกอบน้อยชิ้น พื้นที่ว่าง และองค์ประกอบที่สงบ",
    },
  },
];
