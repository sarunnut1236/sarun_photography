import type { LocalizedString, Photo } from "./portrait-albums";

export type LandscapePhoto = Photo & {
  location?: LocalizedString;
  theme: "cityscape" | "minimalism" | "nature" | "architecture" | "star" | "landscape" | "sky";
};

export const landscapePhotos: LandscapePhoto[] = [
  {
    id: "architecture4",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773085361/%E0%B8%87%E0%B9%88%E0%B8%A7%E0%B8%87%E0%B8%84%E0%B8%B1%E0%B8%9A._%E0%B8%9E%E0%B8%A4%E0%B8%A8%E0%B8%88%E0%B8%B4%E0%B8%81%E0%B8%B2%E0%B8%A2%E0%B8%99_10_2562_jsxxip.jpg",
    alt: {
      en: "Kong Din temple, Rayong, vantage point. Exhaustingly climbed to take the photo.",
      th: "วัดกองดิน ระยอง มุมสูง ต้องปีนเขาขึ้นไปถ่าย เกือบตุย",
    },
    description: {
      en: "Kong Din temple, Rayong, vantage point. Exhaustingly climbed to take the photo.",
      th: "วัดกองดิน ระยอง มุมสูง ต้องปีนเขาขึ้นไปถ่าย เกือบตุย",
    },
    theme: "architecture",
  },
  {
    id: "architecture3",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773085359/%E0%B8%87%E0%B9%88%E0%B8%A7%E0%B8%87%E0%B8%84%E0%B8%B1%E0%B8%9A._%E0%B8%9E%E0%B8%A4%E0%B8%A8%E0%B8%88%E0%B8%B4%E0%B8%81%E0%B8%B2%E0%B8%A2%E0%B8%99_10_2562-2_wtwyqh.jpg",
    alt: {
      en: "Kong Din temple, Rayong. Look how tranquil it is!",
      th: "วัดกองดิน ระยอง มุมสูง แบบเห็นบรรยากาศรอบ ๆ ด้วย",
    },
    description: {
      en: "Kong Din temple, Rayong. Look how tranquil it is!",
      th: "วัดกองดิน ระยอง มุมสูง แบบเห็นบรรยากาศรอบ ๆ ด้วย",
    },
    theme: "architecture",
  },
  {
    id: "architecture1",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773085424/%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%9B%E0%B8%90%E0%B8%A1%E0%B9%80%E0%B8%88%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B9%8C_%E0%B9%81%E0%B8%95%E0%B9%88%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88_kqmb44.png",
    alt: {
      en: "Phra Pathom Chedi illuminated at night",
      th: "พระปฐมเจดีย์ส่องแสงในยามค่ำคืน",
    },
    description: {
      en: "The iconic Phra Pathom Chedi glows warmly against the night sky.",
      th: "พระปฐมเจดีย์เปล่งแสงอบอุ่นตัดกับท้องฟ้ายามค่ำที่ก็อุ่นเหมือนกัน",
    },
    theme: "architecture",
  },
  {
    id: "architecture5",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083984/20220105_103906990_iOS_qfgzdg.jpg",
    alt: {
      en: "Chiang Khong Buddha's relics, Nan. I've been there during the COVID-19 quarantine, cured the plague with divinity.",
      th: "พระธาตุเชียงของ น่าน เคยไปกักตัวช่วงโควิดที่นั่น 1 สัปดาห์ ประสบการณ์แบบใหม่แบบสับ",
    },
    description: {
      en: "Chiang Khong Buddha's relics, Nan. I've been there during the COVID-19 quarantine, cured the plague with divinity.",
      th: "พระธาตุเชียงของ น่าน เคยไปกักตัวช่วงโควิดที่นั่น 1 สัปดาห์ ประสบการณ์แบบใหม่แบบสับ",
    },
    theme: "architecture",
  },
  {
    id: "cityscape1",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773085054/%E0%B9%84%E0%B8%9F%E0%B8%A5%E0%B8%B2%E0%B8%81%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%AF%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%8A%E0%B8%B2%E0%B8%98%E0%B8%B4%E0%B8%9B%E0%B9%84%E0%B8%95%E0%B8%A2%E0%B9%81%E0%B8%AA%E0%B8%87%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%9A%E0%B8%B4%E0%B8%942_vmhazp.jpg",
    alt: {
      en: "Monument of the Thai democracy with colorful traffic light trails at night",
      th: "อนุสาวรีย์ประชาธิปไตยพร้อมเส้นแสงการจราจรยามค่ำ",
    },
    description: {
      en: "Monument of the Thai democracy with colorful traffic light trails at night",
      th: "อนุสาวรีย์ประชาธิปไตยพร้อมเส้นแสงการจราจรยามค่ำ",
    },
    theme: "cityscape",
  },
  {
    id: "cityscape2",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772946415/%E0%B9%80%E0%B8%94%E0%B8%B4%E0%B8%99%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B9%81%E0%B8%96%E0%B8%A7%E0%B8%A7%E0%B8%B1%E0%B8%87_%E0%B8%A5%E0%B8%B2%E0%B8%81%E0%B9%84%E0%B8%9F%E0%B8%9F%E0%B8%B4%E0%B8%99_%E0%B9%86_%E0%B8%81%E0%B8%B8%E0%B8%A1%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B8%98%E0%B9%8C_08_2568_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_2_dpspxp.jpg",
    alt: {
      en: "Traffic light trails near the Grand Palace at night",
      th: "เส้นแสงรถใกล้พระบรมมหาราชวังยามค่ำ",
    },
    description: {
      en: "Traffic light trails near the Grand Palace at night",
      th: "เส้นแสงรถใกล้พระบรมมหาราชวังยามค่ำ",
    },
    theme: "cityscape",
  },
  {
    id: "cityscape5",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773085452/%E0%B8%A5%E0%B8%B2%E0%B8%81%E0%B9%84%E0%B8%9F%E0%B8%8A%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B52_ljgwki.jpg",
    alt: {
      en: "Chong Non Si BTS station. Congesting but scenic at the same time.",
      th: "ใครไม่ซี ช่องนนทรี แฮร่",
    },
    description: {
      en: "Chong Non Si BTS station. Congesting but scenic at the same time.",
      th: "ใครไม่ซี ช่องนนทรี แฮร่",
    },
    theme: "cityscape",
  },
  {
    id: "cityscape4",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773085038/%E0%B8%A5%E0%B8%B2%E0%B8%81%E0%B9%84%E0%B8%9F%E0%B9%80%E0%B8%AA%E0%B8%B2%E0%B8%8A%E0%B8%B4%E0%B8%87%E0%B8%8A%E0%B9%89%E0%B8%B2_2_najcsi.jpg",
    alt: {
      en: "Giant Swing with dynamic traffic light trails",
      th: "เสาชิงช้าพร้อมเส้นแสงรถที่เคลื่อนไหว",
    },
    description: {
      en: "Giant Swing with dynamic traffic light trails",
      th: "เสาชิงช้าพร้อมเส้นแสงรถที่เคลื่อนไหว",
    },
    theme: "cityscape",
  },
  {
    id: "cityscape3",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772907642/%E0%B9%80%E0%B8%94%E0%B8%B4%E0%B8%99%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B9%81%E0%B8%96%E0%B8%A7%E0%B8%A7%E0%B8%B1%E0%B8%87_%E0%B8%81%E0%B8%B8%E0%B8%A1%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B8%98%E0%B9%8C_08_2568_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_2_qph0oh.jpg",
    alt: {
      en: "This is what a palace supposed to be, no traffic.",
      th: "วังไม่ควรจะมีรถวิ่งผ่าน จัดให้",
    },
    description: {
      en: "This is what a palace supposed to be, no traffic.",
      th: "วังไม่ควรจะมีรถวิ่งผ่าน จัดให้",
    },
    theme: "cityscape",
  },
  {
    id: "cityscape6",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773084252/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%AB%E0%B8%A1%E0%B8%94%E0%B9%81%E0%B8%A5%E0%B9%89%E0%B8%A7%E0%B9%80%E0%B8%A2%E0%B9%88-9_dglpnn.jpg",
    alt: {
      en: "You can find this view at Benjakitta park.",
      th: "ถ้าไปเดินสวนเบญจกิตติ มุมนี้ตอนเย็นคือโคสดี",
    },
    description: {
      en: "You can find this view at Benjakitta park.",
      th: "ถ้าไปเดินสวนเบญจกิตติ มุมนี้ตอนเย็นคือโคสดี",
    },
    theme: "cityscape",
  },
  {
    id: "landscape6",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773084262/Phu_Kradueng_Trip_%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_14_2566_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_1_m9bsgd.jpg",
    alt: {
      en: "Phu Kradueng, Loei. Before reaching Sum Haek, turn around. The view is reel reel gooood.",
      th: "ภูกระดึง เลย ก่อนถึงซำแฮก ให้หันหลังด้วยนะ ของโคตรดี",
    },
    description: {
      en: "Phu Kradueng, Loei. Before reaching Sum Haek, turn around. The view is reel reel gooood.",
      th: "ภูกระดึง เลย ก่อนถึงซำแฮก ให้หันหลังด้วยนะ ของโคตรดี",
    },
    theme: "landscape",
  },
  {
    id: "landscape2",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772947362/Thongphaphum_Trip_%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_21_2566_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_27_v3g42q.jpg",
    alt: {
      en: "Sunlit hills of Thong Pha Phum",
      th: "เนินเขาทองผาภูมิในแสงแดดอ่อน",
    },
    description: {
      en: "Sunlit hills of Thong Pha Phum",
      th: "เนินเขาทองผาภูมิในแสงแดดอ่อน",
    },
    theme: "landscape",
  },
  {
    id: "landscape5",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772908874/Phu_Kradueng_Trip_%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_16_2566_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_54_bfqvof.jpg",
    alt: {
      en: "Phu Kradueng, Loei. After watching the sunset, its not over yet, keep your cams ready!",
      th: "ภูกระดึง เลย หลังจากดูพระอาทิตย์ตกเสร็จ อย่าเพิ่งเก็บกล้องนะ",
    },
    description: {
      en: "Phu Kradueng, Loei. After watching the sunset, its not over yet, keep your cams ready!",
      th: "ภูกระดึง เลย หลังจากดูพระอาทิตย์ตกเสร็จ อย่าเพิ่งเก็บกล้องนะ",
    },
    theme: "landscape",
  },
  {
    id: "landscape8",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772947204/Chiang_Khan_Trip_%E0%B8%81%E0%B8%A3%E0%B8%81%E0%B8%8E%E0%B8%B2%E0%B8%84%E0%B8%A1_07_2567_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_46_c6u8mj.jpg",
    alt: {
      en: "Phu Tok, Chiang Khan, Loei. Misty mountains in the morning.",
      th: "ภูทอก เชียงคาน เลย ทะเลหมอกฉ่ำ ๆ",
    },
    description: {
      en: "Phu Tok, Chiang Khan, Loei. Misty mountains in the morning.",
      th: "ภูทอก เชียงคาน เลย ทะเลหมอกฉ่ำ ๆ",
    },
    theme: "landscape",
  },
  {
    id: "landscape3",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772908854/Thongphaphum_Trip_%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_21_2566_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_26_rzw91j.jpg",
    alt: {
      en: "Distant mountain ranges stretch across the horizon, available at Thong Pha Phum.",
      th: "เทือกเขาไกลทอดยาวตลอดแนวขอบฟ้า อยู่ที่ทองผาภูมิเองจ้า",
    },
    description: {
      en: "Distant mountain ranges stretch across the horizon, available at Thong Pha Phum.",
      th: "เทือกเขาไกลทอดยาวตลอดแนวขอบฟ้า อยู่ที่ทองผาภูมิเองจ้า",
    },
    theme: "landscape",
  },
  {
    id: "landscape1",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772946697/%E0%B8%A0%E0%B8%B9%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%94%E0%B8%B6%E0%B8%87%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88%E0%B8%AA%E0%B8%B1%E0%B8%9A-1_l55mfp.jpg",
    alt: {
      en: "Phu Kradueng, Loei. This view is so good that I didn't get tired.",
      th: "ภูกระดึง เลย เจอวิวแบบนี้ก็หายเหนื่อยเลยดิ",
    },
    description: {
      en: "Phu Kradueng, Loei. This view is so good that I didn't get tired.",
      th: "ภูกระดึง เลย เจอวิวแบบนี้ก็หายเหนื่อยเลยดิ",
    },
    theme: "landscape",
  },
  {
    id: "landscape7",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772946491/Chiang_Khan_Trip_%E0%B8%81%E0%B8%A3%E0%B8%81%E0%B8%8E%E0%B8%B2%E0%B8%84%E0%B8%A1_06_2567_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_5_igs4hi.jpg",
    alt: {
      en: "Dramatic clouds drifting over distant mountain peaks, Phu Tok, Chiang Khan, Loei",
      th: "เมฆเคลื่อนผ่านยอดเขาไกลอย่างน่าตื่นตา ภูทอก เชียงคาน เลย",
    },
    description: {
      en: "Dramatic clouds drifting over distant mountain peaks, Phu Tok, Chiang Khan, Loei",
      th: "เมฆเคลื่อนผ่านยอดเขาไกลอย่างน่าตื่นตา ภูทอก เชียงคาน เลย",
    },
    theme: "landscape",
  },
  {
    id: "landscape4",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772947219/Thongphaphum_Trip_%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_21_2566_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_14_me3n8f.jpg",
    alt: {
      en: "This mountain rock so hard",
      th: "บรรพต สวยไปหม๊ด",
    },
    description: {
      en: "This mountain rock so hard",
      th: "บรรพต สวยไปหม๊ด",
    },
    theme: "landscape",
  },
  {
    id: "minimal5",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083654/%E0%B8%94%E0%B8%AD%E0%B8%87%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%88%E0%B8%B1%E0%B8%94%E0%B9%86._%E0%B8%81%E0%B8%A3%E0%B8%81%E0%B8%8E%E0%B8%B2%E0%B8%84%E0%B8%A1_31_2562-9_zirfxr.jpg",
    alt: {
      en: "When you want to take car lights, but you don't have a tripod, take a bokeh instead.",
      th: "เมื่อคุณอยากถ่ายไฟรถ แต่ไม่มีขาตั้งกล้อง เอาโบเก้ไปแทนละกัน",
    },
    description: {
      en: "When you want to take car lights, but you don't have a tripod, take a bokeh instead.",
      th: "เมื่อคุณอยากถ่ายไฟรถ แต่ไม่มีขาตั้งกล้อง เอาโบเก้ไปแทนละกัน",
    },
    theme: "minimalism",
  },
  {
    id: "minimal2",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083767/%E0%B8%A5%E0%B8%AD%E0%B8%87%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%95%E0%B8%AD%E0%B8%99%E0%B8%9D%E0%B8%99%E0%B8%95%E0%B8%81._%E0%B8%81%E0%B8%A3%E0%B8%81%E0%B8%8E%E0%B8%B2%E0%B8%84%E0%B8%A1_24_2562-6_r7zzxd.jpg",
    alt: {
      en: "Droplets and reflections form an abstract red composition.",
      th: "หยดน้ำและแสงสะท้อนสร้างภาพสุด abstract",
    },
    description: {
      en: "Droplets and reflections form an abstract red composition.",
      th: "หยดน้ำและแสงสะท้อนสร้างภาพสุด abstract",
    },
    theme: "minimalism",
  },
  {
    id: "minimal3",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083796/%E0%B8%A5%E0%B8%AD%E0%B8%87%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%95%E0%B8%AD%E0%B8%99%E0%B8%9D%E0%B8%99%E0%B8%95%E0%B8%81._%E0%B8%81%E0%B8%A3%E0%B8%81%E0%B8%8E%E0%B8%B2%E0%B8%84%E0%B8%A1_24_2562-3_e91be5.jpg",
    alt: {
      en: "Rain droplets form a calm minimalist texture on glass.",
      th: "หยดฝนสร้างพื้นผิวเเกร๋ ๆ บนกระจก",
    },
    description: {
      en: "Rain droplets form a calm minimalist texture on glass.",
      th: "หยดฝนสร้างพื้นผิวเเกร๋ ๆ บนกระจก",
    },
    theme: "minimalism",
  },
  {
    id: "minimal1",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773085193/%E0%B8%AD%E0%B8%B1%E0%B8%99%E0%B8%99%E0%B8%B5%E0%B9%89%E0%B8%AA%E0%B8%A7%E0%B8%A225630509_s5vdzw.jpg",
    alt: {
      en: "Streetlight silhouette against an orange evening sky",
      th: "เสาไฟถนนเป็นเงากับท้องฟ้าสีส้มยามเย็น",
    },
    description: {
      en: "Streetlight silhouette against an orange evening sky",
      th: "เสาไฟถนนเป็นเงากับท้องฟ้าสีส้มยามเย็น",
    },
    theme: "minimalism",
  },
  {
    id: "minimal8",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083987/20220106_094403130_iOS_f66amq.jpg",
    alt: {
      en: "Hand tossing a small object with mountains behind",
      th: "ส้ม หยุด!!",
    },
    description: {
      en: "When you combine high speed shuter photo with landscape",
      th: "ส้ม หยุด!!",
    },
    theme: "minimalism",
  },
  {
    id: "minimal10",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772947204/Chiang_Khan_Trip_%E0%B8%81%E0%B8%A3%E0%B8%81%E0%B8%8E%E0%B8%B2%E0%B8%84%E0%B8%A1_07_2567_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_47_wqyxlu.jpg",
    alt: {
      en: "Gentle colors and fog create a minimalist mountain scene.",
      th: "สีพาสเทลและหมอกสร้างภาพภูเขาแบบมินิมอล",
    },
    description: {
      en: "Gentle colors and fog create a minimalist mountain scene.",
      th: "สีพาสเทลและหมอกสร้างภาพภูเขาแบบมินิมอล",
    },
    theme: "minimalism",
  },
  {
    id: "landscape9",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773085082/Thongphaphum_Trip_%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_21_2566_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_11_vm0jqn.jpg",
    alt: {
      en: "Most fav photo of Thong Pha Phum trip, so aesthetic.",
      th: "นี่เป็นรูปที่ชอบที่สุดในทริปทองผาภูมิ สุนทรีย์มาก",
    },
    description: {
      en: "Most fav photo of Thong Pha Phum trip, so aesthetic.",
      th: "นี่เป็นรูปที่ชอบที่สุดในทริปทองผาภูมิ สุนทรีย์มาก",
    },
    theme: "landscape",
  },
  {
    id: "sky8",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773085406/%E0%B8%88%E0%B8%B4%E0%B9%8B%E0%B8%A7%E0%B8%A7%E0%B8%A7%E0%B8%A7_%E0%B8%81%E0%B8%A3%E0%B8%81%E0%B8%8E%E0%B8%B2%E0%B8%84%E0%B8%A1_04_2021_tbol2j.png",
    alt: {
      en: "A playful silhouette of a my cat against warm sunset colors.",
      th: "แมวผมเอง พานางมาเดินเล่น",
    },
    description: {
      en: "A playful silhouette of a my cat against warm sunset colors.",
      th: "แมวผมเอง พานางมาเดินเล่น",
    },
    theme: "sky",
  },
  {
    id: "nature4",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083932/Process_practice_1_sanooi.jpg",
    alt: {
      en: "Pine cone held in hand beside a calm lake",
      th: "ลูกสนอยู่ในมือข้างทะเลสาบที่สงบ",
    },
    description: {
      en: "Pine cone held in hand beside a calm lake",
      th: "ลูกสนอยู่ในมือข้างทะเลสาบที่สงบ",
    },
    theme: "nature",
  },
  {
    id: "nature2",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083835/%E0%B8%A3%E0%B8%B8%E0%B9%89%E0%B8%87%E0%B9%80%E0%B8%89%E0%B8%A2%E0%B8%A7%E0%B9%88%E0%B8%B0%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%9A25630610_zbwtvm.jpg",
    alt: {
      en: "Palm tree standing beneath a bright rainbow across the sky after the rain.",
      th: "ต้นปาล์มใต้สายรุ้งสดใสพาดผ่านท้องฟ้าหลังฝนตก",
    },
    description: {
      en: "Palm tree standing beneath a bright rainbow across the sky after the rain.",
      th: "ต้นปาล์มใต้สายรุ้งสดใสพาดผ่านท้องฟ้าหลังฝนตก",
    },
    theme: "nature",
  },
  {
    id: "nature10",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773084338/Phu_Kradueng_Trip_%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_14_2566_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_8_tvss9e.jpg",
    alt: {
      en: "Sunlight breaks through heavy clouds near sunset.",
      th: "แสงอาทิตย์ส่องทะลุเมฆหนาใกล้ยามเย็น",
    },
    description: {
      en: "Sunlight breaks through heavy clouds near sunset.",
      th: "แสงอาทิตย์ส่องทะลุเมฆหนาใกล้ยามเย็น",
    },
    theme: "nature",
  },
  {
    id: "nature3",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083863/%E0%B8%9F%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B9%88%E0%B8%B2%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%9A_kwwjc6.jpg",
    alt: {
      en: "Lightning striking during a powerful night storm",
      th: "สายฟ้าฟาดในพายุยามค่ำคืน",
    },
    description: {
      en: "Lightning striking during a powerful night storm",
      th: "สายฟ้าฟาดในพายุยามค่ำคืน หน้าบ้านตัวเองจ้า เป็นรูปที่ขี้เกียจที่สุด",
    },
    theme: "nature",
  },
  {
    id: "nature5",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773085086/Phu_Kradueng_Trip_%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_16_2566_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_53_plqynu.jpg",
    alt: {
      en: "Bright autumn leaves contrast against the blue sky.",
      th: "ใบเมเปิลสีแดงตัดกับท้องฟ้าสีฟ้าอย่างสวยงาม",
    },
    description: {
      en: "Bright autumn leaves contrast against the blue sky.",
      th: "ใบเมเปิลสีแดงตัดกับท้องฟ้าสีฟ้าอย่างสวยงาม",
    },
    theme: "nature",
  },
  {
    id: "nature1",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083821/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B9%80%E0%B8%81%E0%B9%88%E0%B8%B2%E0%B9%80%E0%B8%A5%E0%B9%88%E0%B8%B2%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88%E0%B8%99%E0%B8%B0._%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_08_2561-2_olglxy.jpg",
    alt: {
      en: "A campsite slowly emerges from the morning mist.",
      th: "แคมป์ปิ้งค่อย ๆ ปรากฏขึ้นจากหมอกยามเช้า",
    },
    description: {
      en: "A campsite slowly emerges from the morning mist.",
      th: "แคมป์ปิ้งค่อย ๆ ปรากฏขึ้นจากหมอกยามเช้า",
    },
    theme: "nature",
  },
  {
    id: "nature6",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773085379/Phu_Kradueng_Trip_%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_15_2566_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_17_np5g2f.jpg",
    alt: {
      en: "Delicate wildflowers bloom quietly in the grass.",
      th: "ดอกไม้ป่าเล็ก ๆ บานอยู่ในทุ่งหญ้า",
    },
    description: {
      en: "Delicate wildflowers bloom quietly in the grass.",
      th: "ดอกไม้ป่าเล็ก ๆ บานอยู่ในทุ่งหญ้า",
    },
    theme: "nature",
  },
  {
    id: "nature8",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773085377/Phu_Kradueng_Trip_%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_15_2566_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_19_yalxow.jpg",
    alt: {
      en: "Bright red maple leaves in soft sunlight",
      th: "ใบเมเปิลสีแดงสดในแสงอ่อน",
    },
    description: {
      en: "Bright red maple leaves in soft sunlight",
      th: "ใบเมเปิลสีแดงสดในแสงอ่อน",
    },
    theme: "nature",
  },
  {
    id: "nature9",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773085047/Phu_Kradueng_Trip_%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_15_2566_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_18_kikpat.jpg",
    alt: {
      en: "Autumn leaves turning red among green foliage",
      th: "ใบไม้เริ่มเปลี่ยนเป็นสีแดงท่ามกลางใบเขียว",
    },
    description: {
      en: "Autumn leaves turning red among green foliage",
      th: "ใบไม้เริ่มเปลี่ยนเป็นสีแดงท่ามกลางใบเขียว",
    },
    theme: "nature",
  },
  {
    id: "nature11",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773084299/Phu_Kradueng_Trip_%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_14_2566_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_2_ptyhp4.jpg",
    alt: {
      en: "Macro view of a small green plant",
      th: "ภาพมาโครของต้นอะไรก็ไม่รู้ แต่สวยมาก",
    },
    description: {
      en: "Macro view of a small green plant",
      th: "ภาพมาโครของต้นอะไรก็ไม่รู้ แต่สวยมาก",
    },
    theme: "nature",
  },
  {
    id: "sky1",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773085107/%E0%B9%81%E0%B8%95%E0%B9%88%E0%B8%87%E0%B8%97%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%9F%E0%B9%89%E0%B8%B2_%E0%B8%A1%E0%B8%B4%E0%B8%96%E0%B8%B8%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B8%99_20_2562-7_jxbto9.jpg",
    alt: {
      en: "Sunset on exactly Summer Solstice day",
      th: "ฟ้าระเบิดวันครีษมายันแบบเป๊ะ ๆ ของโคตรดี หาได้ยากนัก",
    },
    description: {
      en: "Sunset on exactly Summer Solstice day",
      th: "ฟ้าระเบิดวันครีษมายันแบบเป๊ะ ๆ ของโคตรดี หาได้ยากนัก",
    },
    theme: "sky",
  },
  {
    id: "sky2",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083481/%E0%B8%AD%E0%B8%B1%E0%B8%9B%E0%B9%80%E0%B8%94%E0%B8%95%E0%B8%9D%E0%B8%B5%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%AD%E0%B8%B5%E0%B8%81_1._%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_07_2561_tv65vd.jpg",
    alt: {
      en: "Calm lake reflecting colorful sunrise clouds at Phu Kradueng",
      th: "ทะเลสาบสะท้อนเมฆยามเช้าหลากสีที่ภูกระดึง",
    },
    description: {
      en: "Calm lake reflecting colorful sunrise clouds at Phu Kradueng",
      th: "ทะเลสาบสะท้อนเมฆยามเช้าหลากสีที่ภูกระดึง",
    },
    theme: "sky",
  },
  {
    id: "sky4",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773084777/%E0%B8%A1%E0%B8%B2%E0%B8%A7%E0%B9%88%E0%B8%B0._%E0%B8%9E%E0%B8%A4%E0%B8%A8%E0%B8%88%E0%B8%B4%E0%B8%81%E0%B8%B2%E0%B8%A2%E0%B8%99_30_2562-8_jyibe2.jpg",
    alt: {
      en: "Industrial structures stand against a colorful sky.",
      th: "โครงสร้างอุตสาหกรรมตัดกับท้องฟ้าสีสัน",
    },
    description: {
      en: "Industrial structures stand against a colorful sky.",
      th: "โครงสร้างอุตสาหกรรมตัดกับท้องฟ้าสีสัน",
    },
    theme: "sky",
  },
  {
    id: "sky5",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773085100/%E0%B8%84%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%AB%E0%B8%A5%E0%B8%87%E0%B8%A0%E0%B8%B9%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%94%E0%B8%B6%E0%B8%87_%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%95%E0%B9%81%E0%B8%97%E0%B9%87%E0%B8%81%E0%B8%AA%E0%B8%B5%E0%B9%81%E0%B8%94%E0%B8%87_%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_09_2565_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_2_qnbkov.jpg",
    alt: {
      en: "Dark branches contrast with the glowing evening sky.",
      th: "กิ่งไม้สีดำตัดกับแสงท้องฟ้ายามเย็น",
    },
    description: {
      en: "Dark branches contrast with the glowing evening sky.",
      th: "กิ่งไม้สีดำตัดกับแสงท้องฟ้ายามเย็น",
    },
    theme: "sky",
  },
  {
    id: "sky6",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773084038/%E0%B8%99%E0%B8%AD%E0%B8%99%E0%B8%99%E0%B8%99%E0%B8%99-1_ldqpdj.jpg",
    alt: {
      en: "Evening clouds paint the sky with pastel tones.",
      th: "เมฆยามเย็นแต่งแต้มท้องฟ้าด้วยสีพาสเทล",
    },
    description: {
      en: "Evening clouds paint the sky with pastel tones.",
      th: "เมฆยามเย็นแต่งแต้มท้องฟ้าด้วยสีพาสเทล",
    },
    theme: "sky",
  },
  {
    id: "sky7",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083917/%E0%B8%97%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%9F%E0%B9%89%E0%B8%B2%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%9F%E0%B8%A5%E0%B8%B8%E0%B8%8425630808_xcyqlc.jpg",
    alt: {
      en: "Your land can worth more with just an access to such exploding sky.",
      th: "แค่มีวิวท้องฟ้าระเบิดแบบนี้แถวบ้าน ที่ดินก็ดูมีมูลค่าเพิ่มขึ้น 200%",
    },
    description: {
      en: "Your land can worth more with just an access to such exploding sky.",
      th: "แค่มีวิวท้องฟ้าระเบิดแบบนี้แถวบ้าน ที่ดินก็ดูมีมูลค่าเพิ่มขึ้น 200%",
    },
    theme: "sky",
  },
  {
    id: "star2",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083937/Process_practice_2_kukcar.jpg",
    alt: {
      en: "My first astrophotography of a lifetime.",
      th: "ภาพถ่ายดาวครั้งแรกในชีวิต",
    },
    description: {
      en: "My first astrophotography of a lifetime.",
      th: "ภาพถ่ายดาวครั้งแรกในชีวิต",
    },
    theme: "star",
  },
  {
    id: "star1",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773085355/%E0%B8%9D%E0%B8%B6%E0%B8%81%E0%B9%81%E0%B8%95%E0%B8%87%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B9%81%E0%B8%A5%E0%B8%99%E0%B8%94%E0%B9%8C%E0%B8%81%E0%B8%A5%E0%B8%B2%E0%B8%87%E0%B8%84%E0%B8%B7%E0%B8%992.%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_07_2561_al4rwo.jpg",
    alt: {
      en: "Starry sky above a quiet campsite",
      th: "ท้องฟ้าเต็มไปด้วยดาวเหนือแคมป์",
    },
    description: {
      en: "Starry sky above a quiet campsite",
      th: "ท้องฟ้าเต็มไปด้วยดาวเหนือแคมป์",
    },
    theme: "star",
  },
];
