import type { LocalizedString } from "./portrait-albums";

export type HireFaqItem = {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
};

export const hireFaqItems: HireFaqItem[] = [
  {
    id: "graduation-bangkok",
    question: {
      en: "Do you shoot graduation at universities in Bangkok?",
      th: "รับถ่ายรูปรับปริญญาในกรุงเทพฯ ไหม?",
    },
    answer: {
      en: "Yes — graduation and campus sessions are available. Share your date and university so we can plan locations.",
      th: "รับครับ — ทั้งรับปริญญาและในมหาลัย บอกวันที่กับมหาลัยมาได้เลย จะช่วยวางโลเคชัน",
    },
  },
  {
    id: "booking-lead-time",
    question: {
      en: "How far in advance should I book?",
      th: "ควรจองล่วงหน้ากี่วัน?",
    },
    answer: {
      en: "1–2 weeks is ideal for graduation season. Weekday lifestyle shoots can sometimes be arranged sooner.",
      th: "ช่วงรับปริญญาแนะนำ 1–2 สัปดาห์ งานไลฟ์สไตล์วันธรรมดาอาจจัดได้เร็วกว่านั้น",
    },
  },
  {
    id: "indoor-outdoor",
    question: {
      en: "Indoor or outdoor?",
      th: "ถ่ายในร่มหรือกลางแจ้ง?",
    },
    answer: {
      en: "Both work. We pick spots based on your style, weather, and whether you need formal graduation portraits.",
      th: "ได้ทั้งสองแบบ เลือกตามสไตล์ อากาศ และว่าเป็นชุดรับปริญญาหรือไม่",
    },
  },
];
