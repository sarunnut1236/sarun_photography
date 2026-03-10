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
    title: { en: "City wander", th: "เที่ยวในเมือง" },
    photos: [
      {
        id: "fern1",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772907843/_SRN8095_nxaqe4.jpg",
        alt: {
          en: "Beautiful portraits in the city",
          th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว",
        },
        description: {
          en: "Beautiful portraits in the city",
          th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว",
        },
      },
      {
        id: "fern2",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772907826/_SRN8038_dfe2v4.jpg",
        alt: { en: "Beautiful portraits in the city", th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว" },
        description: {
          en: "Beautiful portraits in the city",
          th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว",
        },
      },
      {
        id: "fern3",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772907790/_SRN8066_semzwq.jpg",
        alt: { en: "Beautiful portraits in the city", th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว" },
        description: {
          en: "Beautiful portraits in the city",
          th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว",
        },
      },
      {
        id: "fern4",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1772906632/_SRN8139_l5mq0n.jpg",
        alt: { en: "Beautiful portraits in the city", th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว" },
        description: {
          en: "Beautiful portraits in the city",
          th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว",
        },
      },
    ],
  },
  {
    id: "aing",
    title: { en: "University shots", th: "ถ่ายรูปเล่นในมหาลัย" },
    photos: [
      {
        id: "aing1",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083169/%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%B4%E0%B8%87_%E0%B8%A1%E0%B8%B5%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%A1_22_2568_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_55_bi06ip.jpg",
        alt: { en: "Walking around Chulalongkorn University", th: "ถ่ายรูปเล่นแถวจุฬาฯ" },
        description: { en: "Walking around Chulalongkorn University", th: "ถ่ายรูปเล่นแถวจุฬาฯ" },
      },
      {
        id: "aing2",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083104/%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%B4%E0%B8%87_%E0%B8%A1%E0%B8%B5%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%A1_22_2568_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_20_xlp7ev.jpg",
        alt: { en: "Walking around Chulalongkorn University", th: "ถ่ายรูปเล่นแถวจุฬาฯ" },
        description: { en: "Walking around Chulalongkorn University", th: "ถ่ายรูปเล่นแถวจุฬาฯ" },
      },
      {
        id: "aing3",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083088/%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%B4%E0%B8%87_%E0%B8%A1%E0%B8%B5%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%A1_22_2568_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_45_r7daaj.jpg",
        alt: { en: "Walking around Chulalongkorn University", th: "ถ่ายรูปเล่นแถวจุฬาฯ" },
        description: { en: "Walking around Chulalongkorn University", th: "ถ่ายรูปเล่นแถวจุฬาฯ" },
      },
      {
        id: "aing4",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083084/%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%B4%E0%B8%87_%E0%B8%A1%E0%B8%B5%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%A1_22_2568_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_22_remoyq.jpg",
        alt: { en: "Walking around Chulalongkorn University", th: "ถ่ายรูปเล่นแถวจุฬาฯ" },
        description: { en: "Walking around Chulalongkorn University", th: "ถ่ายรูปเล่นแถวจุฬาฯ" },
      },
      {
        id: "aing5",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083079/%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%B4%E0%B8%87_%E0%B8%A1%E0%B8%B5%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%A1_22_2568_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_47_ebvfvq.jpg",
        alt: { en: "Walking around Chulalongkorn University", th: "ถ่ายรูปเล่นแถวจุฬาฯ" },
        description: { en: "Walking around Chulalongkorn University", th: "ถ่ายรูปเล่นแถวจุฬาฯ" },
      },
      {
        id: "aing6",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083079/%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%B4%E0%B8%87_%E0%B8%A1%E0%B8%B5%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%A1_22_2568_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_16_jbc4eq.jpg",
        alt: { en: "Walking around Chulalongkorn University", th: "ถ่ายรูปเล่นแถวจุฬาฯ" },
        description: { en: "Walking around Chulalongkorn University", th: "ถ่ายรูปเล่นแถวจุฬาฯ" },
      },
    ],
  },
  {
    id: "nam",
    title: { en: "Graduation photoshoot", th: "ถ่ายรูปรับปริญญา" },
    photos: [
      {
        id: "nam1",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083083/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%8D%E0%B8%B2_2569_3_ebexgb.jpg",
        alt: { en: "Graduation portraits 2025", th: "ชุดภาพรับปริญญา 2568" },
        description: { en: "Graduation portraits 2025", th: "ชุดภาพรับปริญญา 2568" },
      },
      {
        id: "nam2",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083082/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%8D%E0%B8%B2_2569_69_ikkmoa.jpg",
        alt: { en: "Graduation portraits 2025", th: "ชุดภาพรับปริญญา 2568" },
        description: { en: "Graduation portraits 2025", th: "ชุดภาพรับปริญญา 2568" },
      },
      {
        id: "nam3",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083032/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%8D%E0%B8%B2_2569_107_nmcbml.jpg",
        alt: { en: "Graduation portraits 2025", th: "ชุดภาพรับปริญญา 2568" },
        description: { en: "Graduation portraits 2025", th: "ชุดภาพรับปริญญา 2568" },
      },
      {
        id: "nam4",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083009/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%8D%E0%B8%B2_2569_4_nbfmm9.jpg",
        alt: { en: "Graduation portraits 2025", th: "ชุดภาพรับปริญญา 2568" },
        description: { en: "Graduation portraits 2025", th: "ชุดภาพรับปริญญา 2568" },
      },
      {
        id: "nam5",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083005/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%8D%E0%B8%B2_2569_76_jdz2qv.jpg",
        alt: { en: "Graduation portraits 2025", th: "ชุดภาพรับปริญญา 2568" },
        description: { en: "Graduation portraits 2025", th: "ชุดภาพรับปริญญา 2568" },
      },
      {
        id: "nam6",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083001/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%8D%E0%B8%B2_2569_49_wnrfeh.jpg",
        alt: { en: "Graduation portraits 2025", th: "ชุดภาพรับปริญญา 2568" },
        description: { en: "Graduation portraits 2025", th: "ชุดภาพรับปริญญา 2568" },
      },
      {
        id: "nam7",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773082994/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%8D%E0%B8%B2_2569_46_dirty0.jpg",
        alt: { en: "Graduation portraits 2025", th: "ชุดภาพรับปริญญา 2568" },
        description: { en: "Graduation portraits 2025", th: "ชุดภาพรับปริญญา 2568" },
      },
      {
        id: "nam8",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773162915/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%8D%E0%B8%B2_2569_100_ogvq9b.jpg",
        alt: { en: "Graduation portraits 2025", th: "ชุดภาพรับปริญญา 2568" },
        description: { en: "Graduation portraits 2025", th: "ชุดภาพรับปริญญา 2568" },
      },
      {
        id: "nam9",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773162948/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%8D%E0%B8%B2_2569_44_hiomh8.jpg",
        alt: { en: "Graduation portraits 2025", th: "ชุดภาพรับปริญญา 2568" },
        description: { en: "Graduation portraits 2025", th: "ชุดภาพรับปริญญา 2568" },
      },
    ],
  },
  {
    id: "tammy",
    title: { en: "Street style", th: "ลุคสตรีท" },
    photos: [
      {
        id: "tammy1",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773163030/_SRN8041_mwy47g.jpg",
        alt: { en: "Beautiful portraits in the city", th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว" },
        description: {
          en: "Beautiful portraits in the city",
          th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว",
        },
      },
      {
        id: "tammy2",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773163088/_SRN7994_lsacs3.jpg",
        alt: { en: "Beautiful portraits in the city", th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว" },
        description: {
          en: "Beautiful portraits in the city",
          th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว",
        },
      },
      {
        id: "tammy3",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773163115/_SRN8054_gelxxe.jpg",
        alt: { en: "Beautiful portraits in the city", th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว" },
        description: {
          en: "Beautiful portraits in the city",
          th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว",
        },
      },
      {
        id: "tammy4",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773163136/_SRN8146_lxkut4.jpg",
        alt: { en: "Beautiful portraits in the city", th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว" },
        description: {
          en: "Beautiful portraits in the city",
          th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว",
        },
      },
      {
        id: "tammy5",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773163152/_SRN8151_autn4p.jpg",
        alt: { en: "Beautiful portraits in the city", th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว" },
        description: {
          en: "Beautiful portraits in the city",
          th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว",
        },
      },
    ],
  },
];
