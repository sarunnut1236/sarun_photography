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
  seoDescription: LocalizedString;
  photos: Photo[];
};

export const portraitAlbums: PortraitAlbum[] = [
  {
    id: "ferngrad",
    title: { en: "Couple graduation portraits", th: "ชุดภาพรับปริญญาคู่" },
    seoDescription: {
      en: "Take a photoshoot in pair with academic gown in Benjakitti park",
      th: "ถ่ายรูปคู่กับชุดครุยที่สวนเบญ",
    },
    photos: [
      {
        id: "ferngrad1",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1789895554/Fern_Grad_Portrait_202_necc1e.jpg",
        alt: { en: "Couple graduation portraits", th: "ชุดภาพรับปริญญาคู่" },
        description: { en: "Couple graduation portraits", th: "ชุดภาพรับปริญญาคู่" },
      },
      {
        id: "ferngrad2",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1789895618/Fern_Grad_Portrait_235_gpmy9d.jpg",
        alt: { en: "Couple graduation portraits", th: "ชุดภาพรับปริญญาคู่" },
        description: { en: "Couple graduation portraits", th: "ชุดภาพรับปริญญาคู่" },
      },
      {
        id: "ferngrad3",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1789895553/Fern_Grad_Portrait_131_mpiqsm.jpg",
        alt: { en: "Couple graduation portraits", th: "ชุดภาพรับปริญญาคู่" },
        description: { en: "Couple graduation portraits", th: "ชุดภาพรับปริญญาคู่" },
      },
      {
        id: "ferngrad4",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1789895556/Fern_Grad_Portrait_308_mcrmuh.jpg",
        alt: { en: "Couple graduation portraits", th: "ชุดภาพรับปริญญาคู่" },
        description: { en: "Couple graduation portraits", th: "ชุดภาพรับปริญญาคู่" },
      },
      {
        id: "ferngrad5",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1789895559/Fern_Grad_Portrait_104_mxl8x6.jpg",
        alt: { en: "Couple graduation portraits", th: "ชุดภาพรับปริญญาคู่" },
        description: { en: "Couple graduation portraits", th: "ชุดภาพรับปริญญาคู่" },
      },
      {
        id: "ferngrad6",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1789895557/Fern_Grad_Portrait_93_dok5tf.jpg",
        alt: { en: "Couple graduation portraits", th: "ชุดภาพรับปริญญาคู่" },
        description: { en: "Couple graduation portraits", th: "ชุดภาพรับปริญญาคู่" },
      },
      {
        id: "ferngrad7",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1789895556/Fern_Grad_Portrait_73_vhqmqs.jpg",
        alt: { en: "Couple graduation portraits", th: "ชุดภาพรับปริญญาคู่" },
        description: { en: "Couple graduation portraits", th: "ชุดภาพรับปริญญาคู่" },
      },
      {
        id: "ferngrad8",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1789895555/Fern_Grad_Portrait_186_flsv35.jpg",
        alt: { en: "Couple graduation portraits", th: "ชุดภาพรับปริญญาคู่" },
        description: { en: "Couple graduation portraits", th: "ชุดภาพรับปริญญาคู่" },
      },
      {
        id: "ferngrad9",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1789895554/Fern_Grad_Portrait_222_im3npu.jpg",
        alt: { en: "Couple graduation portraits", th: "ชุดภาพรับปริญญาคู่" },
        description: { en: "Couple graduation portraits", th: "ชุดภาพรับปริญญาคู่" },
      }
    ],
  },
  {
    id: "ainggrad",
    title: { en: "Graduation portraits 2026", th: "ชุดภาพรับปริญญา 2569" },
    seoDescription: {
      en: "Take a photoshoot with academic gown in Chulalongkorn university",
      th: "ถ่ายรูปกับชุดครุยที่จุฬาฯ",
    },
    photos: [
      {
        id: "ainggrad1",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1789894661/Aing_Grad_Portrait_2569_1_dnafn5.jpg",
        alt: { en: "Graduation portraits 2026", th: "ชุดภาพรับปริญญา 2569" },
        description: { en: "Graduation portraits 2026", th: "ชุดภาพรับปริญญา 2569" },
      },
      {
        id: "ainggrad2",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1789894661/Aing_Grad_Portrait_2569_27_fuxuzn.jpg",
        alt: { en: "Graduation portraits 2026", th: "ชุดภาพรับปริญญา 2569" },
        description: { en: "Graduation portraits 2026", th: "ชุดภาพรับปริญญา 2569" },
      },
      {
        id: "ainggrad3",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1789894661/Aing_Grad_Portrait_2569_20_uadm0o.jpg",
        alt: { en: "Graduation portraits 2026", th: "ชุดภาพรับปริญญา 2569" },
        description: { en: "Graduation portraits 2026", th: "ชุดภาพรับปริญญา 2569" },
      },
      {
        id: "ainggrad4",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1789894662/Aing_Grad_Portrait_2569_33_mlo9xp.jpg",
        alt: { en: "Graduation portraits 2026", th: "ชุดภาพรับปริญญา 2569" },
        description: { en: "Graduation portraits 2026", th: "ชุดภาพรับปริญญา 2569" },
      },
      {
        id: "ainggrad5",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1789894754/Aing_Grad_Portrait_2569_92_gvph6c.jpg",
        alt: { en: "Graduation portraits 2026", th: "ชุดภาพรับปริญญา 2569" },
        description: { en: "Graduation portraits 2026", th: "ชุดภาพรับปริญญา 2569" },
      },
      {
        id: "ainggrad6",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1789894757/Aing_Grad_Portrait_2569_62_nalfnc.jpg",
        alt: { en: "Graduation portraits 2026", th: "ชุดภาพรับปริญญา 2569" },
        description: { en: "Graduation portraits 2026", th: "ชุดภาพรับปริญญา 2569" },
      },
      {
        id: "ainggrad7",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1789894916/Aing_Grad_Portrait_2569_187_c9riuf.jpg",
        alt: { en: "Graduation portraits 2026", th: "ชุดภาพรับปริญญา 2569" },
        description: { en: "Graduation portraits 2026", th: "ชุดภาพรับปริญญา 2569" },
      },
      {
        id: "ainggrad8",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1789894917/Aing_Grad_Portrait_2569_197_eq32ks.jpg",
        alt: { en: "Graduation portraits 2026", th: "ชุดภาพรับปริญญา 2569" },
        description: { en: "Graduation portraits 2026", th: "ชุดภาพรับปริญญา 2569" },
      },
      {
        id: "ainggrad9",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1789894918/Aing_Grad_Portrait_2569_103_x69sya.jpg",
        alt: { en: "Graduation portraits 2026", th: "ชุดภาพรับปริญญา 2569" },
        description: { en: "Graduation portraits 2026", th: "ชุดภาพรับปริญญา 2569" },
      },
      {
        id: "ainggrad10",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1789894919/Aing_Grad_Portrait_2569_162_d7g3tu.jpg",
        alt: { en: "Graduation portraits 2026", th: "ชุดภาพรับปริญญา 2569" },
        description: { en: "Graduation portraits 2026", th: "ชุดภาพรับปริญญา 2569" },
      },
    ],
  },
  {
    id: "ferntam",
    title: { en: "City wander", th: "เที่ยวในเมือง" },
    seoDescription: {
      en: "Bangkok street portrait session — casual city walks with natural light and relaxed poses.",
      th: "พอร์ตเทรตเดินเที่ยวในเมืองกรุงเทพฯ แสงธรรมชาติ โพสสบาย ๆ",
    },
    photos: [
      {
        id: "ferntam1",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773249647/FernTam_2569_3_p9ck6p.jpg",
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
        id: "ferntam2",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773249649/FernTam_2569_12_uve3ws.jpg",
        alt: { en: "Beautiful portraits in the city", th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว" },
        description: {
          en: "Beautiful portraits in the city",
          th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว",
        },
      },
      {
        id: "ferntam3",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773249649/FernTam_2569_11_gkyh9v.jpg",
        alt: { en: "Beautiful portraits in the city", th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว" },
        description: {
          en: "Beautiful portraits in the city",
          th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว",
        },
      },
      {
        id: "ferntam4",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773249642/FernTam_2569_10_zm8vin.jpg",
        alt: { en: "Beautiful portraits in the city", th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว" },
        description: {
          en: "Beautiful portraits in the city",
          th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว",
        },
      },
      {
        id: "ferntam5",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773249641/FernTam_2569_8_qigdec.jpg",
        alt: { en: "Beautiful portraits in the city", th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว" },
        description: {
          en: "Beautiful portraits in the city",
          th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว",
        },
      },
      {
        id: "ferntam6",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773249642/FernTam_2569_7_xktbec.jpg",
        alt: { en: "Beautiful portraits in the city", th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว" },
        description: {
          en: "Beautiful portraits in the city",
          th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว",
        },
      },
      {
        id: "ferntam7",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773249645/FernTam_2569_5_mja56b.jpg",
        alt: { en: "Beautiful portraits in the city", th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว" },
        description: {
          en: "Beautiful portraits in the city",
          th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว",
        },
      },
      {
        id: "ferntam8",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773249643/FernTam_2569_1_qmcijg.jpg",
        alt: { en: "Beautiful portraits in the city", th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว" },
        description: {
          en: "Beautiful portraits in the city",
          th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว",
        },
      },
      {
        id: "ferntam9",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773249641/FernTam_2569_6_g3ippu.jpg",
        alt: { en: "Beautiful portraits in the city", th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว" },
        description: {
          en: "Beautiful portraits in the city",
          th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว",
        },
      },
      {
        id: "ferntam11",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773249644/FernTam_2569_9_tveb0c.jpg",
        alt: { en: "Beautiful portraits in the city", th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว" },
        description: {
          en: "Beautiful portraits in the city",
          th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว",
        },
      },
      {
        id: "ferntam12",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773249651/FernTam_2569_2_lvuobp.jpg",
        alt: { en: "Beautiful portraits in the city", th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว" },
        description: {
          en: "Beautiful portraits in the city",
          th: "ถ่ายรูปสวย ๆ ในเมืองระหว่างเดินเที่ยว",
        },
      },
      {
        id: "ferntam13",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773249644/FernTam_2569_4_xzzqdb.jpg",
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
    seoDescription: {
      en: "Casual university portrait walks around Bangkok campuses, including Chulalongkorn University.",
      th: "ถ่ายรูปเล่นในมหาลัยกรุงเทพฯ บรรยากาศสบาย ๆ รวมถึงแถวจุฬาฯ",
    },
    photos: [
      {
        id: "aing1",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083169/%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%B4%E0%B8%87_%E0%B8%A1%E0%B8%B5%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%A1_22_2568_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_55_bi06ip.jpg",
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
        id: "aing2",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083104/%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%B4%E0%B8%87_%E0%B8%A1%E0%B8%B5%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%A1_22_2568_%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88_20_xlp7ev.jpg",
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
    seoDescription: {
      en: "Bangkok graduation portraits in academic gown — formal poses and candid moments on campus.",
      th: "ถ่ายรูปรับปริญญาในกรุงเทพฯ ชุดครุย ทั้งท่าทางมาตรฐานและโมเมนต์ธรรมชาติ",
    },
    photos: [
      {
        id: "nam4",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083009/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%8D%E0%B8%B2_2569_4_nbfmm9.jpg",
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
        id: "nam5",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083005/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%8D%E0%B8%B2_2569_76_jdz2qv.jpg",
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
        id: "nam6",
        src: "https://res.cloudinary.com/dkjleico2/image/upload/v1773083001/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%8D%E0%B8%B2_2569_49_wnrfeh.jpg",
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
];
