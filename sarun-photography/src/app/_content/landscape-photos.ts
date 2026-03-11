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
      en: "Traditional Thai temple beside a calm lake",
      th: "วัดไทยริมสระน้ำที่เงียบสงบ",
    },
    description: {
      en: "A peaceful temple complex surrounded by trees and reflective water.",
      th: "วัดเงียบสงบท่ามกลางต้นไม้และผืนน้ำที่สะท้อนแสง",
    },
    theme: "architecture",
  },
  {
    id: "architecture3",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773085359/%E0%B8%87%E0%B9%88%E0%B8%A7%E0%B8%87%E0%B8%84%E0%B8%B1%E0%B8%9A._%E0%B8%9E%E0%B8%A4%E0%B8%A8%E0%B8%88%E0%B8%B4%E0%B8%81%E0%B8%B2%E0%B8%A2%E0%B8%99_10_2562-2_wtwyqh.jpg",
    alt: {
      en: "Golden pagoda rising above surrounding greenery",
      th: "พระเจดีย์สีทองโดดเด่นเหนือแนวต้นไม้",
    },
    description: {
      en: "A golden stupa stands prominently within the temple grounds.",
      th: "พระเจดีย์สีทองตั้งเด่นอยู่กลางพื้นที่วัด",
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
      th: "พระปฐมเจดีย์เปล่งแสงอบอุ่นตัดกับท้องฟ้ายามค่ำ",
    },
    theme: "architecture",
  },
  {
    id: "architecture5",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083984/20220105_103906990_iOS_qfgzdg.jpg",
    alt: {
      en: "Golden pagoda framed by temple structures",
      th: "พระเจดีย์สีทองล้อมรอบด้วยสถาปัตยกรรมวัด",
    },
    description: {
      en: "Temple architecture layered around a central golden stupa.",
      th: "องค์เจดีย์สีทองอยู่ท่ามกลางอาคารวัดโดยรอบ",
    },
    theme: "architecture",
  },
  {
    id: "cityscape1",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773085054/%E0%B9%84%E0%B8%9F%E0%B8%A5%E0%B8%B2%E0%B8%81%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%AF%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%8A%E0%B8%B2%E0%B8%98%E0%B8%B4%E0%B8%9B%E0%B9%84%E0%B8%95%E0%B8%A2%E0%B9%81%E0%B8%AA%E0%B8%87%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%9A%E0%B8%B4%E0%B8%942_vmhazp.jpg",
    alt: {
      en: "Monument with colorful traffic light trails at night",
      th: "อนุสาวรีย์พร้อมเส้นแสงการจราจรยามค่ำ",
    },
    description: {
      en: "Long exposure captures Bangkok traffic circling Monument.",
      th: "ภาพสปีดต่ำจับเส้นแสงรถรอบอนุสาวรีย์",
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
      en: "Night traffic flows through historic Bangkok streets.",
      th: "การจราจรยามค่ำเคลื่อนผ่านย่านประวัติศาสตร์ของกรุงเทพฯ",
    },
    theme: "cityscape",
  },
  {
    id: "cityscape5",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773085452/%E0%B8%A5%E0%B8%B2%E0%B8%81%E0%B9%84%E0%B8%9F%E0%B8%8A%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B52_ljgwki.jpg",
    alt: {
      en: "City street filled with streaking car lights",
      th: "ถนนในเมืองกับเส้นแสงรถที่พุ่งผ่าน",
    },
    description: {
      en: "Night traffic creates flowing light across Bangkok streets.",
      th: "การจราจรยามค่ำสร้างเส้นแสงไหลผ่านถนนในกรุงเทพฯ",
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
      en: "Long exposure light trails pass the famous Giant Swing.",
      th: "เส้นแสงจากรถพาดผ่านเสาชิงช้าในภาพสปีดต่ำ",
    },
    theme: "cityscape",
  },
  {
    id: "cityscape3",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772907642/%E0%B9%80%E0%B8%94%E0%B8%B4%E0%B8%99%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B9%81%E0%B8%96%E0%B8%A7%E0%B8%A7%E0%B8%B1%E0%B8%87_%E0%B8%81%E0%B8%B8%E0%B8%A1%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B8%98%E0%B9%8C_08_2568_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_2_qph0oh.jpg",
    alt: {
      en: "Traffic light trails near the Grand Palace at night",
      th: "เส้นแสงรถใกล้พระบรมมหาราชวังยามค่ำ",
    },
    description: {
      en: "Night traffic flows through historic Bangkok streets.",
      th: "การจราจรยามค่ำเคลื่อนผ่านย่านประวัติศาสตร์ของกรุงเทพฯ",
    },
    theme: "cityscape",
  },
  {
    id: "cityscape6",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773084252/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%AB%E0%B8%A1%E0%B8%94%E0%B9%81%E0%B8%A5%E0%B9%89%E0%B8%A7%E0%B9%80%E0%B8%A2%E0%B9%88-9_dglpnn.jpg",
    alt: {
      en: "Bangkok skyline reflected on still water",
      th: "เส้นขอบฟ้ากรุงเทพสะท้อนบนผิวน้ำ",
    },
    description: {
      en: "A calm reflection of city buildings at dusk.",
      th: "เงาสะท้อนอาคารเมืองบนผืนน้ำในยามเย็น",
    },
    theme: "cityscape",
  },
  {
    id: "landscape6",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773084262/Phu_Kradueng_Trip_%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_14_2566_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_1_m9bsgd.jpg",
    alt: {
      en: "Mountain trail leading through forest scenery",
      th: "ทางเดินภูเขาผ่านป่าเขียว",
    },
    description: {
      en: "A hiking path winds through the mountain landscape.",
      th: "เส้นทางเดินป่าคดเคี้ยวผ่านภูมิประเทศภูเขา",
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
      en: "Rolling hills stretch beneath warm sunlight.",
      th: "แนวเนินเขาโค้งต่อเนื่องใต้แสงแดดอุ่น",
    },
    theme: "landscape",
  },
  {
    id: "landscape5",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772908874/Phu_Kradueng_Trip_%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_16_2566_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_54_bfqvof.jpg",
    alt: {
      en: "Open plateau landscape on Phu Kradueng",
      th: "ภูมิประเทศโล่งกว้างบนภูกระดึง",
    },
    description: {
      en: "Wide open terrain stretches across the mountain plateau.",
      th: "พื้นที่โล่งกว้างทอดยาวบนที่ราบสูง",
    },
    theme: "landscape",
  },
  {
    id: "landscape8",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772947204/Chiang_Khan_Trip_%E0%B8%81%E0%B8%A3%E0%B8%81%E0%B8%8E%E0%B8%B2%E0%B8%84%E0%B8%A1_07_2567_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_46_c6u8mj.jpg",
    alt: {
      en: "Layers of misty mountains fading into the horizon",
      th: "ชั้นภูเขาซ้อนกันจางหายไปในสายหมอก",
    },
    description: {
      en: "Soft layers of distant mountains dissolve into morning mist.",
      th: "แนวภูเขาที่ซ้อนกันค่อย ๆ จางหายไปในหมอกยามเช้า",
    },
    theme: "landscape",
  },
  {
    id: "landscape3",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772908854/Thongphaphum_Trip_%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_21_2566_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_26_rzw91j.jpg",
    alt: {
      en: "Wide mountain panorama under dramatic clouds",
      th: "มุมกว้างของภูเขาภายใต้เมฆที่เคลื่อนไหว",
    },
    description: {
      en: "Distant mountain ranges stretch across the horizon.",
      th: "เทือกเขาไกลทอดยาวตลอดแนวขอบฟ้า",
    },
    theme: "landscape",
  },
  {
    id: "landscape1",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772946697/%E0%B8%A0%E0%B8%B9%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%94%E0%B8%B6%E0%B8%87%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88%E0%B8%AA%E0%B8%B1%E0%B8%9A-1_l55mfp.jpg",
    alt: {
      en: "Mountain peaks rising above morning mist",
      th: "ยอดเขาโผล่พ้นทะเลหมอกยามเช้า",
    },
    description: {
      en: "Layers of mountains fade into the misty horizon.",
      th: "แนวภูเขาซ้อนชั้นจางหายไปในทะเลหมอก",
    },
    theme: "landscape",
  },
  {
    id: "landscape7",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772946491/Chiang_Khan_Trip_%E0%B8%81%E0%B8%A3%E0%B8%81%E0%B8%8E%E0%B8%B2%E0%B8%84%E0%B8%A1_06_2567_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_5_igs4hi.jpg",
    alt: {
      en: "Dramatic clouds drifting over distant mountain peaks",
      th: "เมฆเคลื่อนผ่านยอดเขาไกลอย่างน่าตื่นตา",
    },
    description: {
      en: "Dark clouds roll slowly above a wide mountain landscape.",
      th: "เมฆก้อนใหญ่ลอยผ่านทิวเขากว้างไกล",
    },
    theme: "landscape",
  },
  {
    id: "landscape4",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772947219/Thongphaphum_Trip_%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_21_2566_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_14_me3n8f.jpg",
    alt: {
      en: "Misty valley surrounded by mountain ridges",
      th: "หุบเขาที่ปกคลุมด้วยหมอกบาง",
    },
    description: {
      en: "Morning haze softens the contours of the valley.",
      th: "หมอกยามเช้าทำให้แนวภูเขาดูนุ่มนวล",
    },
    theme: "landscape",
  },
  {
    id: "minimal5",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083654/%E0%B8%94%E0%B8%AD%E0%B8%87%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%88%E0%B8%B1%E0%B8%94%E0%B9%86._%E0%B8%81%E0%B8%A3%E0%B8%81%E0%B8%8E%E0%B8%B2%E0%B8%84%E0%B8%A1_31_2562-9_zirfxr.jpg",
    alt: {
      en: "Abstract city lights forming colorful bokeh",
      th: "แสงไฟเมืองเบลอเป็นโบเก้หลากสี",
    },
    description: {
      en: "Defocused lights create a soft abstract pattern at night.",
      th: "แสงไฟที่เบลอกลายเป็นลวดลายโบเก้ยามค่ำ",
    },
    theme: "minimalism",
  },
  {
    id: "minimal2",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083767/%E0%B8%A5%E0%B8%AD%E0%B8%87%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%95%E0%B8%AD%E0%B8%99%E0%B8%9D%E0%B8%99%E0%B8%95%E0%B8%81._%E0%B8%81%E0%B8%A3%E0%B8%81%E0%B8%8E%E0%B8%B2%E0%B8%84%E0%B8%A1_24_2562-6_r7zzxd.jpg",
    alt: {
      en: "Red light reflecting through water droplets",
      th: "แสงสีแดงสะท้อนผ่านหยดน้ำ",
    },
    description: {
      en: "Droplets and reflections form an abstract red composition.",
      th: "หยดน้ำและแสงสะท้อนสร้างภาพนามธรรมสีแดง",
    },
    theme: "minimalism",
  },
  {
    id: "minimal3",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083796/%E0%B8%A5%E0%B8%AD%E0%B8%87%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%95%E0%B8%AD%E0%B8%99%E0%B8%9D%E0%B8%99%E0%B8%95%E0%B8%81._%E0%B8%81%E0%B8%A3%E0%B8%81%E0%B8%8E%E0%B8%B2%E0%B8%84%E0%B8%A1_24_2562-3_e91be5.jpg",
    alt: {
      en: "Raindrops scattered across a glass surface",
      th: "หยดฝนกระจายอยู่บนกระจก",
    },
    description: {
      en: "Rain droplets form a calm minimalist texture on glass.",
      th: "หยดฝนสร้างพื้นผิวเรียบง่ายบนกระจก",
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
      en: "A single streetlight stands beneath a warm sunset sky.",
      th: "เสาไฟถนนเดี่ยวตั้งอยู่ใต้ท้องฟ้ายามเย็น",
    },
    theme: "minimalism",
  },
  {
    id: "minimal8",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083987/20220106_094403130_iOS_f66amq.jpg",
    alt: {
      en: "Hand tossing a small object with mountains behind",
      th: "มือโยนวัตถุเล็ก ๆ โดยมีภูเขาอยู่ด้านหลัง",
    },
    description: {
      en: "A playful moment captured against a natural backdrop.",
      th: "ช่วงเวลาสนุกเล็ก ๆ ที่ถ่ายท่ามกลางธรรมชาติ",
    },
    theme: "minimalism",
  },
  {
    id: "minimal10",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772947204/Chiang_Khan_Trip_%E0%B8%81%E0%B8%A3%E0%B8%81%E0%B8%8E%E0%B8%B2%E0%B8%84%E0%B8%A1_07_2567_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_47_wqyxlu.jpg",
    alt: {
      en: "Soft pastel mountains emerging from fog",
      th: "ภูเขาสีพาสเทลโผล่พ้นหมอกบาง",
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
      en: "Winding road cutting through dense green forest",
      th: "ถนนคดเคี้ยวผ่านป่าเขียวหนาแน่น",
    },
    description: {
      en: "A quiet road curves through a sea of trees.",
      th: "ถนนเงียบสงบคดเคี้ยวผ่านผืนป่า",
    },
    theme: "landscape",
  },
  {
    id: "sky8",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773085406/%E0%B8%88%E0%B8%B4%E0%B9%8B%E0%B8%A7%E0%B8%A7%E0%B8%A7%E0%B8%A7_%E0%B8%81%E0%B8%A3%E0%B8%81%E0%B8%8E%E0%B8%B2%E0%B8%84%E0%B8%A1_04_2021_tbol2j.png",
    alt: {
      en: "Cat lifted toward a glowing sunset sky",
      th: "แมวถูกอุ้มขึ้นสู่ท้องฟ้ายามพระอาทิตย์ตก",
    },
    description: {
      en: "A playful silhouette of a cat against warm sunset colors.",
      th: "เงาของแมวกับสีสันอบอุ่นของท้องฟ้ายามเย็น",
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
      en: "A small pine cone framed by soft evening light.",
      th: "ลูกสนเล็ก ๆ ท่ามกลางแสงเย็นที่นุ่มนวล",
    },
    theme: "nature",
  },
  {
    id: "nature2",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083835/%E0%B8%A3%E0%B8%B8%E0%B9%89%E0%B8%87%E0%B9%80%E0%B8%89%E0%B8%A2%E0%B8%A7%E0%B9%88%E0%B8%B0%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%9A25630610_zbwtvm.jpg",
    alt: {
      en: "Palm tree standing beneath a bright rainbow",
      th: "ต้นปาล์มใต้สายรุ้งสดใส",
    },
    description: {
      en: "A rainbow arcs across the sky after the rain.",
      th: "สายรุ้งพาดผ่านท้องฟ้าหลังฝนตก",
    },
    theme: "nature",
  },
  {
    id: "nature10",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773084338/Phu_Kradueng_Trip_%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_14_2566_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_8_tvss9e.jpg",
    alt: {
      en: "Large glowing sun behind dramatic clouds",
      th: "ดวงอาทิตย์ขนาดใหญ่หลังกลุ่มเมฆ",
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
      en: "A dramatic lightning bolt lights up the night sky.",
      th: "สายฟ้าส่องสว่างทั่วท้องฟ้ายามค่ำ",
    },
    theme: "nature",
  },
  {
    id: "nature5",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773085086/Phu_Kradueng_Trip_%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_16_2566_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_53_plqynu.jpg",
    alt: {
      en: "Red leaves glowing under a clear blue sky",
      th: "ใบไม้สีแดงสดใต้ท้องฟ้าสีฟ้า",
    },
    description: {
      en: "Bright autumn leaves contrast against the blue sky.",
      th: "ใบไม้สีแดงตัดกับท้องฟ้าสีฟ้าอย่างสวยงาม",
    },
    theme: "nature",
  },
  {
    id: "nature1",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083821/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B9%80%E0%B8%81%E0%B9%88%E0%B8%B2%E0%B9%80%E0%B8%A5%E0%B9%88%E0%B8%B2%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88%E0%B8%99%E0%B8%B0._%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_08_2561-2_olglxy.jpg",
    alt: {
      en: "Colorful tents appearing through morning fog",
      th: "เต็นท์หลากสีท่ามกลางหมอกยามเช้า",
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
      en: "Small white wildflowers glowing in sunlight",
      th: "ดอกไม้ป่าสีขาวเล็ก ๆ ในแสงแดด",
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
      en: "Autumn leaves glow with warm natural light.",
      th: "ใบไม้ฤดูใบไม้ร่วงเปล่งสีสดในแสงธรรมชาติ",
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
      en: "Seasonal colors begin to transform the forest.",
      th: "สีสันของฤดูกาลเริ่มเปลี่ยนแปลงผืนป่า",
    },
    theme: "nature",
  },
  {
    id: "nature11",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773084299/Phu_Kradueng_Trip_%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_14_2566_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_2_ptyhp4.jpg",
    alt: {
      en: "Macro view of a small green plant",
      th: "ภาพมาโครของพืชสีเขียวขนาดเล็ก",
    },
    description: {
      en: "Fine plant details captured in close-up.",
      th: "รายละเอียดของพืชถูกถ่ายทอดอย่างใกล้ชิด",
    },
    theme: "nature",
  },
  {
    id: "sky1",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773085107/%E0%B9%81%E0%B8%95%E0%B9%88%E0%B8%87%E0%B8%97%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%9F%E0%B9%89%E0%B8%B2_%E0%B8%A1%E0%B8%B4%E0%B8%96%E0%B8%B8%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B8%99_20_2562-7_jxbto9.jpg",
    alt: {
      en: "Quiet road leading into a glowing sunset sky",
      th: "ถนนเงียบทอดสู่ท้องฟ้ายามพระอาทิตย์ตก",
    },
    description: {
      en: "The evening sky glows softly above the empty road.",
      th: "ท้องฟ้ายามเย็นเปล่งแสงเหนือถนนที่เงียบสงบ",
    },
    theme: "sky",
  },
  {
    id: "sky2",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083481/%E0%B8%AD%E0%B8%B1%E0%B8%9B%E0%B9%80%E0%B8%94%E0%B8%95%E0%B8%9D%E0%B8%B5%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%AD%E0%B8%B5%E0%B8%81_1._%E0%B8%98%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%E0%B8%84%E0%B8%A1_07_2561_tv65vd.jpg",
    alt: {
      en: "Calm lake reflecting colorful sunset clouds",
      th: "ทะเลสาบสะท้อนเมฆยามเย็นหลากสี",
    },
    description: {
      en: "Water mirrors the colors of the evening sky.",
      th: "ผิวน้ำสะท้อนสีสันของท้องฟ้ายามเย็น",
    },
    theme: "sky",
  },
  {
    id: "sky4",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773084777/%E0%B8%A1%E0%B8%B2%E0%B8%A7%E0%B9%88%E0%B8%B0._%E0%B8%9E%E0%B8%A4%E0%B8%A8%E0%B8%88%E0%B8%B4%E0%B8%81%E0%B8%B2%E0%B8%A2%E0%B8%99_30_2562-8_jyibe2.jpg",
    alt: {
      en: "Transmission tower silhouetted against sunset",
      th: "เสาไฟฟ้าเป็นเงากับท้องฟ้ายามเย็น",
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
      en: "Bare trees silhouetted against a deep red sunset",
      th: "ต้นไม้ไร้ใบเป็นเงากับท้องฟ้าสีแดงเข้ม",
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
      en: "Soft pink clouds drifting above the treeline",
      th: "เมฆสีชมพูอ่อนเหนือแนวต้นไม้",
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
      en: "Fiery sunset clouds above a quiet neighborhood",
      th: "เมฆยามเย็นสีแดงสดเหนือชุมชน",
    },
    description: {
      en: "A dramatic sunset lights up the evening sky.",
      th: "พระอาทิตย์ตกสร้างสีสันเข้มบนท้องฟ้า",
    },
    theme: "sky",
  },
  {
    id: "star2",
    src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083937/Process_practice_2_kukcar.jpg",
    alt: {
      en: "Bright stars scattered across the night sky",
      th: "ดาวจำนวนมากกระจายเต็มท้องฟ้ายามค่ำ",
    },
    description: {
      en: "Astrophotography capturing the clarity of the night sky.",
      th: "ภาพถ่ายดาราศาสตร์ที่เผยให้เห็นดาวชัดเจน",
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
      en: "A peaceful night under a sky filled with stars.",
      th: "ค่ำคืนเงียบสงบใต้ท้องฟ้าที่เต็มไปด้วยดาว",
    },
    theme: "star",
  },
];
