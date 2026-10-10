import { locales, type Locale } from "@/i18n/routing";

const englishImageAlt = {
  "/assets/our-story/la-neuveville.jpg": "Lake Biel landscape near La Neuveville",
  "/assets/our-story/cree.png": "Green CREE electric vehicle prototype",
  "/assets/our-story/smart-bottle-ethimedix.png": "Smart Bottle concept render",
  "/assets/our-story/personal-injector.png": "Personal injector product render",
  "/assets/our-story/total-car-expo.jpg": "The Total Car prototype displayed at an exhibition",
  "/assets/our-story/total-car.png": "Aventor performance vehicle on track",
  "/assets/our-story/bone-fixation-production.jpg": "Bone fixation system prototype",
  "/assets/projects/airsmile/airsmile-01.webp": "AirSmile handheld dental care device render",
  "/assets/our-story/softcar-concept.png": "White Softcar concept vehicle",
  "/assets/our-story/stajvelo.png": "Stajvelo e-bike against a concrete wall",
  "/assets/our-story/softcar-v1.png": "Yellow Softcar reveal vehicle",
};

type StoryMediaCopy = {
  openLocationMap: string;
  openProject: string;
  imageAlt: Record<keyof typeof englishImageAlt, string>;
};

const copy = {
  en: {
    openLocationMap: "Open DOMTEKNIKA location map",
    openProject: "Open project: {title}",
    imageAlt: englishImageAlt,
  },
  fr: {
    openLocationMap: "Afficher la localisation de DOMTEKNIKA sur la carte",
    openProject: "Voir le projet : {title}",
    imageAlt: {
      "/assets/our-story/la-neuveville.jpg": "Paysage du lac de Bienne près de La Neuveville",
      "/assets/our-story/cree.png": "Prototype du véhicule électrique CREE vert",
      "/assets/our-story/smart-bottle-ethimedix.png": "Rendu du concept Smart Bottle",
      "/assets/our-story/personal-injector.png": "Rendu du produit Personal Injector",
      "/assets/our-story/total-car-expo.jpg": "Prototype The Total Car présenté dans une exposition",
      "/assets/our-story/total-car.png": "Véhicule Aventor sur circuit",
      "/assets/our-story/bone-fixation-production.jpg": "Prototype du système de fixation osseuse",
      "/assets/projects/airsmile/airsmile-01.webp": "Rendu du dispositif portatif de soins dentaires AirSmile",
      "/assets/our-story/softcar-concept.png": "Véhicule concept SOFTCAR blanc",
      "/assets/our-story/stajvelo.png": "Vélo électrique STAJVELO devant un mur en béton",
      "/assets/our-story/softcar-v1.png": "Véhicule SOFTCAR jaune présenté au public",
    },
  },
  de: {
    openLocationMap: "DOMTEKNIKAs Standort auf der Karte anzeigen",
    openProject: "Projekt ansehen: {title}",
    imageAlt: {
      "/assets/our-story/la-neuveville.jpg": "Bielersee-Landschaft bei La Neuveville",
      "/assets/our-story/cree.png": "Grüner Prototyp des Elektrofahrzeugs CREE",
      "/assets/our-story/smart-bottle-ethimedix.png": "Darstellung des Smart-Bottle-Konzepts",
      "/assets/our-story/personal-injector.png": "Produktdarstellung des Personal Injector",
      "/assets/our-story/total-car-expo.jpg": "Prototyp The Total Car auf einer Ausstellung",
      "/assets/our-story/total-car.png": "Aventor-Fahrzeug auf der Rennstrecke",
      "/assets/our-story/bone-fixation-production.jpg": "Prototyp eines Knochenfixationssystems",
      "/assets/projects/airsmile/airsmile-01.webp": "Darstellung des tragbaren Zahnpflegegeräts AirSmile",
      "/assets/our-story/softcar-concept.png": "Weisses SOFTCAR-Konzeptfahrzeug",
      "/assets/our-story/stajvelo.png": "STAJVELO-E-Bike vor einer Betonwand",
      "/assets/our-story/softcar-v1.png": "Bei der Präsentation gezeigtes gelbes SOFTCAR-Fahrzeug",
    },
  },
  es: {
    openLocationMap: "Ver la ubicación de DOMTEKNIKA en el mapa",
    openProject: "Ver el proyecto: {title}",
    imageAlt: {
      "/assets/our-story/la-neuveville.jpg": "Paisaje del lago de Biel cerca de La Neuveville",
      "/assets/our-story/cree.png": "Prototipo verde del vehículo eléctrico CREE",
      "/assets/our-story/smart-bottle-ethimedix.png": "Representación del concepto Smart Bottle",
      "/assets/our-story/personal-injector.png": "Representación del producto Personal Injector",
      "/assets/our-story/total-car-expo.jpg": "Prototipo The Total Car presentado en una exposición",
      "/assets/our-story/total-car.png": "Vehículo Aventor en un circuito",
      "/assets/our-story/bone-fixation-production.jpg": "Prototipo del sistema de fijación ósea",
      "/assets/projects/airsmile/airsmile-01.webp": "Representación del dispositivo portátil de cuidado dental AirSmile",
      "/assets/our-story/softcar-concept.png": "Vehículo conceptual SOFTCAR blanco",
      "/assets/our-story/stajvelo.png": "Bicicleta eléctrica STAJVELO frente a un muro de hormigón",
      "/assets/our-story/softcar-v1.png": "Vehículo SOFTCAR amarillo presentado al público",
    },
  },
  ja: {
    openLocationMap: "DOMTEKNIKA の所在地を地図で見る",
    openProject: "{title} のプロジェクトを見る",
    imageAlt: {
      "/assets/our-story/la-neuveville.jpg": "La Neuveville 近郊のビール湖の風景",
      "/assets/our-story/cree.png": "緑色の CREE 電動車両の試作品",
      "/assets/our-story/smart-bottle-ethimedix.png": "Smart Bottle のコンセプト画像",
      "/assets/our-story/personal-injector.png": "自動注射器の製品イメージ",
      "/assets/our-story/total-car-expo.jpg": "展示会で公開された Total Car の試作品",
      "/assets/our-story/total-car.png": "サーキットを走る Aventor",
      "/assets/our-story/bone-fixation-production.jpg": "骨固定システムの試作品",
      "/assets/projects/airsmile/airsmile-01.webp": "AirSmile の携帯型歯科ケア機器",
      "/assets/our-story/softcar-concept.png": "白い SOFTCAR のコンセプト車両",
      "/assets/our-story/stajvelo.png": "コンクリート壁の前に置かれた STAJVELO の電動自転車",
      "/assets/our-story/softcar-v1.png": "発表された黄色い SOFTCAR",
    },
  },
  ko: {
    openLocationMap: "지도에서 DOMTEKNIKA 위치 보기",
    openProject: "프로젝트 보기: {title}",
    imageAlt: {
      "/assets/our-story/la-neuveville.jpg": "La Neuveville 인근 비엘 호수의 풍경",
      "/assets/our-story/cree.png": "녹색 CREE 전기차 시제품",
      "/assets/our-story/smart-bottle-ethimedix.png": "Smart Bottle 콘셉트 렌더링",
      "/assets/our-story/personal-injector.png": "Personal Injector 제품 렌더링",
      "/assets/our-story/total-car-expo.jpg": "전시회에 소개된 The Total Car 시제품",
      "/assets/our-story/total-car.png": "트랙을 달리는 Aventor 차량",
      "/assets/our-story/bone-fixation-production.jpg": "골 고정 시스템 시제품",
      "/assets/projects/airsmile/airsmile-01.webp": "AirSmile 휴대용 치아 관리 기기 렌더링",
      "/assets/our-story/softcar-concept.png": "흰색 SOFTCAR 콘셉트 차량",
      "/assets/our-story/stajvelo.png": "콘크리트 벽 앞의 STAJVELO 전기 자전거",
      "/assets/our-story/softcar-v1.png": "공개 행사에 소개된 노란색 SOFTCAR 차량",
    },
  },
  zh: {
    openLocationMap: "在地图上查看 DOMTEKNIKA 的位置",
    openProject: "查看项目：{title}",
    imageAlt: {
      "/assets/our-story/la-neuveville.jpg": "La Neuveville 附近的比尔湖风景",
      "/assets/our-story/cree.png": "绿色 CREE 电动车原型",
      "/assets/our-story/smart-bottle-ethimedix.png": "Smart Bottle 概念渲染图",
      "/assets/our-story/personal-injector.png": "Personal Injector 产品渲染图",
      "/assets/our-story/total-car-expo.jpg": "展览中展示的 The Total Car 原型车",
      "/assets/our-story/total-car.png": "赛道上的 Aventor 车辆",
      "/assets/our-story/bone-fixation-production.jpg": "骨固定系统原型",
      "/assets/projects/airsmile/airsmile-01.webp": "AirSmile 便携式牙齿护理设备渲染图",
      "/assets/our-story/softcar-concept.png": "白色 SOFTCAR 概念车",
      "/assets/our-story/stajvelo.png": "混凝土墙前的 STAJVELO 电动自行车",
      "/assets/our-story/softcar-v1.png": "公开展示的黄色 SOFTCAR 车辆",
    },
  },
} satisfies Record<Locale, StoryMediaCopy>;

export function getStoryMediaCopy(locale: string) {
  return copy[locales.includes(locale as Locale) ? locale as Locale : "en"];
}

export function getStoryMediaAlt(locale: string, source: string, fallback: string) {
  const imageAlt: Record<string, string> = getStoryMediaCopy(locale).imageAlt;
  return imageAlt[source] ?? fallback;
}
