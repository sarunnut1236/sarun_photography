export type LocalizedString = {
  en: string;
  th: string;
};

export type Photo = {
  id: string;
  src: string;
  alt: LocalizedString;
  description: LocalizedString;
  cloudinaryId?: string;
};

export type PortraitAlbum = {
  id: string;
  title: LocalizedString;
  photos: Photo[];
};

export const portraitAlbums: PortraitAlbum[] = [
  {
    id: "fern",
    title: { en: "Fern", th: "เฟิร์น" },
    photos: [
      {
        id: "fern1",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772907843/_SRN8095_nxaqe4.jpg",
        alt: { en: "Portrait by the Chao Phraya River at sunset", th: "ภาพบุคคลริมแม่น้ำเจ้าพระยายามพระอาทิตย์ตก" },
        description: { en: "Soft golden light by the river.", th: "แสงสีทองนุ่ม ๆ ริมแม่น้ำ" },
      },
      {
        id: "fern2",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772907826/_SRN8038_dfe2v4.jpg",
        alt: { en: "Portrait with Bangkok skyline", th: "ภาพบุคคลกับเส้นขอบฟ้ากรุงเทพฯ" },
        description: { en: "A quiet moment above the skyline.", th: "ช่วงเวลาสงบเหนือเส้นขอบฟ้า" },
      },
      {
        id: "fern3",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772907790/_SRN8066_semzwq.jpg",
        alt: { en: "Portrait with city reflections", th: "ภาพบุคคลสะท้อนผ่านกระจก" },
        description: { en: "Reflections blend city textures.", th: "ภาพสะท้อนผสานกับเมือง" },
      },
      {
        id: "fern4",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772906632/_SRN8139_l5mq0n.jpg",
        alt: { en: "Portrait in front of shophouse", th: "ภาพบุคคลหน้าตึกแถวเมืองเก่า" },
        description: { en: "Soft side light on shophouse façade.", th: "แสงด้านข้างเน้นรายละเอียดผนังตึก" },
      },
    ],
  },
  {
    id: "aing",
    title: { en: "Aing", th: "อิง" },
    photos: [
      {
        id: "aing1",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083169/%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%B4%E0%B8%87_%E0%B8%A1%E0%B8%B5%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%A1_22_2568_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_55_bi06ip.jpg",
        alt: { en: "Portrait of Aing", th: "ภาพบุคคลอิง" },
        description: { en: "Portrait session March 2025.", th: "ชุดภาพมีนาคม 2568" },
      },
      {
        id: "aing2",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083104/%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%B4%E0%B8%87_%E0%B8%A1%E0%B8%B5%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%A1_22_2568_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_20_xlp7ev.jpg",
        alt: { en: "Portrait of Aing", th: "ภาพบุคคลอิง" },
        description: { en: "Portrait session March 2025.", th: "ชุดภาพมีนาคม 2568" },
      },
      {
        id: "aing3",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083088/%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%B4%E0%B8%87_%E0%B8%A1%E0%B8%B5%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%A1_22_2568_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_45_r7daaj.jpg",
        alt: { en: "Portrait of Aing", th: "ภาพบุคคลอิง" },
        description: { en: "Portrait session March 2025.", th: "ชุดภาพมีนาคม 2568" },
      },
      {
        id: "aing4",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083084/%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%B4%E0%B8%87_%E0%B8%A1%E0%B8%B5%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%A1_22_2568_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_22_remoyq.jpg",
        alt: { en: "Portrait of Aing", th: "ภาพบุคคลอิง" },
        description: { en: "Portrait session March 2025.", th: "ชุดภาพมีนาคม 2568" },
      },
      {
        id: "aing5",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083079/%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%B4%E0%B8%87_%E0%B8%A1%E0%B8%B5%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%A1_22_2568_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_47_ebvfvq.jpg",
        alt: { en: "Portrait of Aing", th: "ภาพบุคคลอิง" },
        description: { en: "Portrait session March 2025.", th: "ชุดภาพมีนาคม 2568" },
      },
      {
        id: "aing6",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083079/%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%B4%E0%B8%87_%E0%B8%A1%E0%B8%B5%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%A1_22_2568_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_16_jbc4eq.jpg",
        alt: { en: "Portrait of Aing", th: "ภาพบุคคลอิง" },
        description: { en: "Portrait session March 2025.", th: "ชุดภาพมีนาคม 2568" },
      },
      {
        id: "aing7",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083078/%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%B4%E0%B8%87_%E0%B8%A1%E0%B8%B5%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%A1_22_2568_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_15_ngu5qb.jpg",
        alt: { en: "Portrait of Aing", th: "ภาพบุคคลอิง" },
        description: { en: "Portrait session March 2025.", th: "ชุดภาพมีนาคม 2568" },
      },
    ],
  },
  {
    id: "nam",
    title: { en: "Nam", th: "น้ำ" },
    photos: [
      {
        id: "nam1",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083083/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%8D%E0%B8%B2_2569_3_ebexgb.jpg",
        alt: { en: "Portrait of Nam – graduation", th: "ภาพบุคคลน้ำ – รับปริญญา" },
        description: { en: "Graduation portraits 2026.", th: "ชุดภาพรับปริญญา 2569" },
      },
      {
        id: "nam2",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083082/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%8D%E0%B8%B2_2569_69_ikkmoa.jpg",
        alt: { en: "Portrait of Nam – graduation", th: "ภาพบุคคลน้ำ – รับปริญญา" },
        description: { en: "Graduation portraits 2026.", th: "ชุดภาพรับปริญญา 2569" },
      },
      {
        id: "nam3",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083032/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%8D%E0%B8%B2_2569_107_nmcbml.jpg",
        alt: { en: "Portrait of Nam – graduation", th: "ภาพบุคคลน้ำ – รับปริญญา" },
        description: { en: "Graduation portraits 2026.", th: "ชุดภาพรับปริญญา 2569" },
      },
      {
        id: "nam4",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083009/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%8D%E0%B8%B2_2569_4_nbfmm9.jpg",
        alt: { en: "Portrait of Nam – graduation", th: "ภาพบุคคลน้ำ – รับปริญญา" },
        description: { en: "Graduation portraits 2026.", th: "ชุดภาพรับปริญญา 2569" },
      },
      {
        id: "nam5",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083005/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%8D%E0%B8%B2_2569_76_jdz2qv.jpg",
        alt: { en: "Portrait of Nam – graduation", th: "ภาพบุคคลน้ำ – รับปริญญา" },
        description: { en: "Graduation portraits 2026.", th: "ชุดภาพรับปริญญา 2569" },
      },
      {
        id: "nam6",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083001/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%8D%E0%B8%B2_2569_49_wnrfeh.jpg",
        alt: { en: "Portrait of Nam – graduation", th: "ภาพบุคคลน้ำ – รับปริญญา" },
        description: { en: "Graduation portraits 2026.", th: "ชุดภาพรับปริญญา 2569" },
      },
      {
        id: "nam7",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773082994/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%8D%E0%B8%B2_2569_46_dirty0.jpg",
        alt: { en: "Portrait of Nam – graduation", th: "ภาพบุคคลน้ำ – รับปริญญา" },
        description: { en: "Graduation portraits 2026.", th: "ชุดภาพรับปริญญา 2569" },
      },
    ],
  },
];
