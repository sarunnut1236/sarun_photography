import { settings } from "../_lib/settings";

const DEFAULT_OG_IMAGE =
  "https://res.cloudinary.com/dkjleico2/image/upload/v1773089164/IMG_5668_p1cuxr.jpg";

const PORTRAIT_OG_IMAGE =
  "https://res.cloudinary.com/dkjleico2/image/upload/v1773083009/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%8D%E0%B8%B2_2569_4_nbfmm9.jpg";

const LANDSCAPE_OG_IMAGE =
  "https://res.cloudinary.com/dkjleico2/image/upload/v1773085424/%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%9B%E0%B8%90%E0%B8%A1%E0%B9%80%E0%B8%88%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B9%8C_%E0%B9%81%E0%B8%95%E0%B9%88%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88_kqmb44.png";

const { halfDayThb } = settings.rates;

type LocalizedSeo = {
  title: { en: string; th: string };
  description: { en: string; th: string };
  ogImage?: string;
};

export const seoPages = {
  home: {
    title: {
      en: "Sarun Photography",
      th: "ซารัน โฟโตกราฟฟี",
    },
    description: {
      en: `Portrait sessions in Bangkok from ${halfDayThb} THB. Graduation, university, and lifestyle photography by Sarun Photography.`,
      th: `รับถ่ายภาพบุคคลในกรุงเทพฯ เริ่ม ${halfDayThb} บาท ถ่ายรับปริญญา มหาวิทยาลัย และภาพไลฟ์สไตล์ โดย Sarun Photography`,
    },
    ogImage: DEFAULT_OG_IMAGE,
  },
  portrait: {
    title: {
      en: "Portrait Photography Bangkok",
      th: "ถ่ายภาพบุคคล กรุงเทพ",
    },
    description: {
      en: "Graduation, university, and city portrait sessions in Bangkok. View albums and book via LINE or email.",
      th: "ผลงานถ่ายรูปรับปริญญา มหาวิทยาลัย และพอร์ตเทรตในเมือง กรุงเทพฯ จองผ่าน LINE หรืออีเมล",
    },
    ogImage: PORTRAIT_OG_IMAGE,
  },
  landscape: {
    title: {
      en: "Landscape Photography Thailand",
      th: "ภาพภูมิทัศน์ ประเทศไทย",
    },
    description: {
      en: "Architecture, cityscape, nature, and night sky photography across Thailand by Sarun Photography.",
      th: "ภาพสถาปัตยกรรม ซิตี้สเคป ธรรมชาติ และท้องฟ้ายามค่ำ ทั่วประเทศไทย โดย Sarun Photography",
    },
    ogImage: LANDSCAPE_OG_IMAGE,
  },
  hire: {
    title: {
      en: "Book a Portrait Session",
      th: "จองถ่ายภาพบุคคล",
    },
    description: {
      en: `Bangkok portrait packages from ${halfDayThb} THB half day. Graduation and lifestyle sessions. Book via LINE or email.`,
      th: `แพ็กเกจถ่ายภาพบุคคลกรุงเทพฯ ครึ่งวัน ${halfDayThb} บาท รับปริญญาและไลฟ์สไตล์ จองผ่าน LINE หรืออีเมล`,
    },
    ogImage: PORTRAIT_OG_IMAGE,
  },
} satisfies Record<string, LocalizedSeo>;

export type SeoPageKey = keyof typeof seoPages;
