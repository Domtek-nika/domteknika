"use client";

import Image from "next/image";
import {
  ArrowDownUp,
  ArrowRight,
  ArrowUpRight,
  Box,
  Building2,
  CalendarDays,
  CarFront,
  Check,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Globe2,
  HeartPulse,
  HousePlug,
  Search,
  Shapes,
  ShieldCheck,
  Target,
  Watch as WatchIcon,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/providers/reveal";
import PATENT_TITLES from "@/data/patent-titles.json";
import { Link } from "@/i18n/navigation";
import { getProjectCardImageFitClass } from "@/lib/project-card-image";
import { cn } from "@/lib/utils";
import projectAssetManifest from "../../../public/assets/projects/manifest.json";

type ProjectSectorKey =
  | "mobility"
  | "household"
  | "medical"
  | "watchmaking"
  | "building"
  | "sport"
  | "others";
type FilterKey = "all" | ProjectSectorKey;
type ProjectSortKey =
  "default" | "date-desc" | "date-asc" | "title-asc" | "title-desc";

const PROJECT_LIGHTBOX_FRAME_CLASS =
  "relative h-[min(82vh,620px)] w-[min(92vw,900px)] touch-pan-y md:h-[min(70vh,560px)] md:w-[min(74vw,840px)] lg:w-[min(64vw,820px)]";
const PROJECT_LIGHTBOX_IMAGE_SIZES =
  "(max-width: 768px) 92vw, (max-width: 1024px) 74vw, 820px";
const PROJECT_IMAGE_ZOOM_SELECTOR = "[data-project-image-zoom]";

export type Project = {
  id: string;
  hiddenFromCatalog?: boolean;
  temporarilyDisabled?: boolean;
  category: string;
  filter?: Exclude<FilterKey, "all">;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  gallery?: string[];
  tags: string[];
  overview: string;
  scope?: string[];
  relatedPatents?: RelatedPatent[];
};

type RelatedPatent = {
  patentId: string;
  publication: string;
  title: string;
  note: string;
};

type ProjectAssetManifestEntry = {
  slug: string;
  images: Array<{ output: string }>;
};

const RELATED_PATENT_RECORDS = {
  WO2026078588A1: {
    publication: "WO2026078588 (A1)",
    title: "ULTRA-LIGHTWEIGHT AND RECYCLABLE DASHBOARD",
  },
  EP4488027A1: {
    publication: "EP4488027 (A1)",
    title: "REINFORCED ROTOMOLDED BODY",
  },
  EP4705115A1: {
    publication: "EP4705115 (A1)",
    title: "DEFLECTOR FOR RIMS, E.G. CAR RIMS",
  },
  EP4680511A1: {
    publication: "EP4680511 (A1)",
    title: "RECYCLABLE STEERING WHEEL",
  },
  MA68857A1: {
    publication: "MA68857 (A1)",
    title: "ALL-TERRAIN SOLAR TRACTOR VEHICLE WITH INTERCHANGEABLE MODULES",
  },
  US2025129628A1: {
    publication: "US2025129628 (A1)",
    title: "AUTOMOBILE PLANT WITH SMALL CARBON FOOTPRINT",
  },
  US2024326565A1: {
    publication: "US2024326565 (A1)",
    title: "Vehicle door",
  },
  EP3744622A1: {
    publication: "EP3744622 (A1)",
    title: "VEHICLE ARCHITECTURE",
  },
  EP3393889A1: {
    publication: "EP3393889 (A1)",
    title: "VEHICLE ARCHITECTURE",
  },
  EP3261867A2: {
    publication: "EP3261867 (A2)",
    title: "ELECTRIC SINGLE-SEATER VEHICLE",
  },
  US6015022A: {
    publication: "US6015022 (A)",
    title: "Ultra-light road vehicle",
  },
  US5584510A: {
    publication: "US5584510 (A)",
    title: "Motor vehicle chassis",
  },
  US5667030A: {
    publication: "US5667030 (A)",
    title: "Heat exchanger for motor vehicle cooling system",
  },
  FR2757569A1: {
    publication: "FR2757569 (A1)",
    title: "Admission system for automobile electronic fuel injection engines",
  },
  US2011061534A1: {
    publication: "US2011061534 (A1)",
    title: "BEVERAGE PRODUCTION DEVICE",
  },
  EP2745749A1: {
    publication: "EP2745749 (A1)",
    title: "Device for preparing a drink",
  },
  CH700288A2: {
    publication: "CH700288 (A2)",
    title: "Automatic hot beverage preparing machine",
  },
  EP1744653A1: {
    publication: "EP1744653 (A1)",
    title: "DEVICE FOR GENERATING AT LEAST ONE BEVERAGE JET",
  },
  AU2014274521A1: {
    publication: "AU2014274521 (A1)",
    title:
      "Device and method for producing a frothed liquid from soluble ingredients and diluent",
  },
  EP2000065A1: {
    publication: "EP2000065 (A1)",
    title:
      "Device and method for producing a beverage by mixing soluble ingredients and a diluent",
  },
  US2010173057A1: {
    publication: "US2010173057 (A1)",
    title:
      "DEVICE AND METHOD FOR PRODUCING A FROTHED LIQUID FROM SOLUBLE INGREDIENTS AND DILUENT",
  },
  US2009320941A1: {
    publication: "US2009320941 (A1)",
    title: "MULTI-WAY VALVE DEVICE",
  },
  EP3215454A1: {
    publication: "EP3215454 (A1)",
    title:
      "BEAKER THAT CAN BE FILLED FROM THE BOTTOM AND CONNECTING DEVICE FOR THE BEAKER",
  },
  CH701083B1: {
    publication: "CH701083 (B1)",
    title:
      "Dispositif pour le détartrage et le blanchiment simultané des dents",
  },
  US2015360014A1: {
    publication: "US2015360014 (A1)",
    title: "Applicator and capsule for such applicator",
  },
  FR2999439A1: {
    publication: "FR2999439 (A1)",
    title:
      "DISPOSITIF DE DISTRIBUTION D'UN PRODUIT ET D'EMISSION D'UN RAYONNEMENT LUMINEUX",
  },
  US2015342657A1: {
    publication: "US2015342657 (A1)",
    title: "BONE FIXATION ASSEMBLY",
  },
  EP3185821A1: {
    publication: "EP3185821 (A1)",
    title: "IMPACTOR BODY FOR ORTHOPAEDIC SURGERY OPERATION",
  },
  US2016000570A1: {
    publication: "US2016000570 (A1)",
    title: "Polymer based joint implants and method of manufacture",
  },
  WO2016004540A1: {
    publication: "WO2016004540 (A1)",
    title:
      "OPTICAL METHOD FOR MAKING AT LEAST ONE COMPONENT OF A WATCH MOVEMENT INVISIBLE",
  },
  CH707437A1: {
    publication: "CH707437 (A1)",
    title: "Method for making a watch movement component invisible",
  },
  US2022338602A1: {
    publication: "US2022338602 (A1)",
    title: "Frame for bad weather and/or sun protection device",
  },
  WO2021043427A1: {
    publication: "WO2021043427 (A1)",
    title: "HOUSING FOR A DEVICE FOR PROTECTION AGAINST BAD WEATHER AND/OR SUN",
  },
  WO2008017182A1: {
    publication: "WO2008017182 (A1)",
    title:
      "METHOD AND DEVICE FOR CONTROLLING THE QUALITY OF A FILTRATION CARTRIDGE",
  },
  USD568097S: {
    publication: "USD568097 (S)",
    title: "Filter accessory for carafe",
  },
  USD560092S: {
    publication: "USD560092 (S)",
    title: "Carafe",
  },
} satisfies Record<string, Omit<RelatedPatent, "patentId" | "note">>;

type RelatedPatentId = keyof typeof RELATED_PATENT_RECORDS;

function relatedPatent(patentId: RelatedPatentId, note: string): RelatedPatent {
  return {
    patentId,
    publication: RELATED_PATENT_RECORDS[patentId].publication,
    title: RELATED_PATENT_RECORDS[patentId].title,
    note,
  };
}

type PanelRect = {
  left: number;
  top: number;
  width: number;
  height: number;
  radius: string;
};

type ProjectsLocale = "en" | "fr" | "de" | "es" | "ko" | "zh" | "ja";

const RELATED_PATENT_NOTE_TRANSLATIONS: Partial<
  Record<ProjectsLocale, Partial<Record<RelatedPatentId, string>>>
> = {
  fr: {
    EP3215454A1:
      "Brevet couvrant le gobelet à remplissage par le bas et son dispositif de connexion, avec Jean-Luc Thuliez et Étienne Crozier parmi les inventeurs.",
    US5584510A:
      "Principes de châssis pour l'intégration structurelle et la gestion de l'énergie d'impact dans un véhicule compact.",
    US5667030A:
      "Échangeur thermique de refroidissement intégré à une architecture de véhicule légère.",
    US6015022A:
      "Architecture de véhicule routier électrique ultraléger avec châssis à poutre centrale et empattement compact.",
  },
  de: {
    CH701083B1:
      "Patentkontext für die Zahnreinigung und Aufhellung über eine Kartuschen- und Strahlarchitektur.",
    EP2000065A1:
      "Mischkammer- und Luftführungsprinzipien für Getränke aus löslichen Zutaten.",
    EP3185821A1:
      "Patentkontext für orthopädische Chirurgiewerkzeuge rund um Impaktor- und Reamer-Instrumente.",
    EP3215454A1:
      "Patent für den von unten befüllbaren Becher und seine Anschlussvorrichtung, mit Jean-Luc Thuliez und Étienne Crozier unter den Erfindern.",
    EP3261867A2:
      "Direkter Aventor-SA-Patentkontext für die Architektur eines elektrischen Einsitzers.",
    EP3744622A1: "Patentfamilie zur Fahrzeugarchitektur der SOFTCAR-Plattform.",
    EP3393889A1:
      "Frühere SOFTCAR-Fahrzeugarchitektur mit leichtem Struktur- und Karosseriekonzept.",
    EP4488027A1:
      "Verstärktes Rotomolding-Verfahren für leichte Fahrzeugkarosserieteile.",
    EP4680511A1:
      "Recycelbare Lenkradarchitektur für Fahrzeuginterieurs mit geringer Umweltwirkung.",
    EP4705115A1:
      "SOFTCAR-Felgendeflektor für Radluftführung und aerodynamische Radabdeckung.",
    FR2999439A1:
      "Spende- und Lichtemissionsprinzipien für eine präzise kosmetische Anwendung.",
    US2009320941A1:
      "Mehrwegeventil- und Dosierlogik für kompakte Getränkesysteme.",
    US2010173057A1:
      "Herstellung einer aufgeschäumten Flüssigkeit aus löslichen Zutaten und Verdünnungsmittel.",
    US2011061534A1:
      "Kapselbasierter Getränkekontext für den doppelten Wasserweg durch die Kapsel.",
    US2015342657A1:
      "Fixierungs- und Lastübertragungskontext für belastungskritische biomedizinische Baugruppen.",
    US2015360014A1:
      "Applikator- und Kapselsystem für austauschbare Produktzufuhr.",
    US2016000570A1:
      "Fertigungsrahmen für polymerbasierte Gelenkimplantate und biomedizinische Präzisionsteile.",
    US2022338602A1:
      "Ausklappbarer Rahmen für ein Wetter- und Sonnenschutzsystem.",
    US2024326565A1:
      "Türsystem für komplexe Fahrzeuggeometrie und kompakten Zugang.",
    US2025129628A1:
      "Konzept einer Automobilfabrik mit kleiner CO2-Bilanz, verbunden mit der Industrialisierungsstrategie.",
    US5584510A:
      "Chassisprinzipien für Strukturintegration und Energieaufnahme in einem kompakten Fahrzeug.",
    US5667030A:
      "Wärmetauscher für die Kühlung, integriert in eine leichte Fahrzeugarchitektur.",
    US6015022A:
      "Ultraleichte elektrische Straßenfahrzeugarchitektur mit zentralem Träger und kompakter Radstandsstrategie.",
    USD560092S: "Designpatent für die Form der Karaffe.",
    USD568097S: "Designpatent für das Filterzubehör der Karaffe.",
    WO2008017182A1:
      "Qualitätskontrolle für eine Filterkartusche in einem Gefäß für gefiltertes Wasser.",
    WO2016004540A1:
      "Optisches Verfahren, um Komponenten eines Uhrwerks unsichtbar oder sehr diskret erscheinen zu lassen.",
    WO2021043427A1: "Gehäusekontext für Wetter- und Sonnenschutzsysteme.",
    WO2026078588A1:
      "Ultraleichtes, recycelbares Armaturenbrett mit integrierten geformten Funktionen und Luftkanälen.",
  },
  es: {
    CH701083B1:
      "Contexto de patente para limpieza y blanqueamiento dental mediante arquitectura de cartucho y chorro.",
    EP2000065A1:
      "Principios de cámara de mezcla y gestión de aire para bebidas a partir de ingredientes solubles.",
    EP3185821A1:
      "Contexto de patente de instrumental ortopédico para instrumentos relacionados con impactores y fresas.",
    EP3215454A1:
      "Patente del vaso llenable por la base y su dispositivo de conexión, con Jean-Luc Thuliez y Étienne Crozier entre los inventores.",
    EP3261867A2:
      "Contexto directo de patente de Aventor SA para la arquitectura de un vehículo eléctrico monoplaza.",
    EP3744622A1:
      "Familia de patentes de arquitectura de vehículo para la plataforma SOFTCAR.",
    EP3393889A1:
      "Arquitectura de vehículo SOFTCAR anterior, centrada en estructura ligera y carrocería.",
    EP4488027A1:
      "Proceso de carrocería rotomoldeada reforzada para piezas ligeras de vehículo.",
    EP4680511A1:
      "Arquitectura de volante reciclable alineada con interiores de bajo impacto.",
    EP4705115A1:
      "Deflector de llanta SOFTCAR para flujo de aire en la rueda e integración aerodinámica.",
    FR2999439A1:
      "Principios de dosificación y emisión luminosa para una aplicación cosmética precisa.",
    US2009320941A1:
      "Lógica de válvula multivía y dosificación para sistemas compactos de bebida.",
    US2010173057A1:
      "Producción de líquido espumado a partir de ingredientes solubles y diluyente.",
    US2011061534A1:
      "Contexto de preparación de bebida en cápsula para el recorrido doble del agua dentro de la cápsula.",
    US2015342657A1:
      "Contexto de fijación y transferencia de carga para conjuntos biomédicos sometidos a esfuerzo.",
    US2015360014A1:
      "Sistema de aplicador y cápsula para alimentación reemplazable de producto.",
    US2016000570A1:
      "Marco de fabricación para implantes articulares poliméricos y piezas biomédicas de precisión.",
    US2022338602A1:
      "Estructura desplegable para un sistema de protección contra lluvia y sol.",
    US2024326565A1:
      "Sistema de puerta para geometría compleja de carrocería y acceso compacto.",
    US2025129628A1:
      "Concepto de planta automotriz de baja huella de carbono conectado con la estrategia de industrialización.",
    US5584510A:
      "Principios de chasis para integración estructural y absorción de energía en un vehículo compacto.",
    US5667030A:
      "Intercambiador térmico de refrigeración integrado en una arquitectura de vehículo ligera.",
    US6015022A:
      "Arquitectura de vehículo eléctrico ultraligero con viga central y estrategia de distancia entre ejes compacta.",
    USD560092S: "Patente de diseño de la forma de la jarra.",
    USD568097S: "Patente de diseño del accesorio filtrante de la jarra.",
    WO2008017182A1:
      "Control de calidad de un cartucho de filtración integrado en una jarra de agua filtrada.",
    WO2016004540A1:
      "Método óptico para hacer que componentes de un movimiento relojero sean invisibles o muy discretos.",
    WO2021043427A1:
      "Contexto de carcasa para sistemas de protección contra lluvia y sol.",
    WO2026078588A1:
      "Salpicadero ultraligero y reciclable que integra funciones moldeadas y circuitos de aire.",
  },
  ko: {
    CH701083B1:
      "카트리지와 분사 구조를 이용한 치아 세정 및 미백 장치의 특허 맥락입니다.",
    EP2000065A1:
      "용해성 원료 기반 음료를 위한 혼합 챔버와 공기 흐름 설계 원리입니다.",
    EP3185821A1:
      "임팩터와 리머 계열 수술 기구에 관련된 정형외과 수술 도구 특허 맥락입니다.",
    EP3215454A1:
      "Jean-Luc Thuliez와 Étienne Crozier 등이 발명자로 참여한 하부 충전 컵과 연결 장치 특허입니다.",
    EP3261867A2:
      "전기 단좌 차량 아키텍처에 관한 Aventor SA의 직접 특허 맥락입니다.",
    EP3744622A1: "SOFTCAR 플랫폼에 연결된 차량 아키텍처 특허군입니다.",
    EP3393889A1:
      "경량 구조와 차체 콘셉트에 초점을 둔 초기 SOFTCAR 차량 아키텍처입니다.",
    EP4488027A1: "경량 차량 부품을 위한 보강 회전성형 차체 공정입니다.",
    EP4680511A1:
      "저영향 차량 인테리어에 맞춘 재활용 가능 스티어링 휠 아키텍처입니다.",
    EP4705115A1:
      "휠 주변 공기 흐름과 공력 휠 커버 통합을 위한 SOFTCAR 림 디플렉터 작업입니다.",
    FR2999439A1: "정밀한 화장품 도포를 위한 제품 분배와 광 방출 원리입니다.",
    US2009320941A1:
      "소형 음료 시스템을 위한 다방향 밸브와 정량 제어 로직입니다.",
    US2010173057A1:
      "용해성 원료와 희석액으로 거품 액체를 만드는 제조 원리입니다.",
    US2011061534A1:
      "캡슐 내부를 왕복하는 물의 이중 경로와 관련된 캡슐 음료 제조 맥락입니다.",
    US2015342657A1:
      "하중이 중요한 생체의료 조립체의 고정과 하중 전달 맥락입니다.",
    US2015360014A1:
      "교체 가능한 제품 공급을 위한 애플리케이터와 캡슐 시스템입니다.",
    US2016000570A1:
      "폴리머 기반 관절 임플란트와 정밀 생체의료 부품의 제조 맥락입니다.",
    US2022338602A1:
      "비와 햇빛 보호 시스템을 위한 전개식 프레임 특허 맥락입니다.",
    US2024326565A1:
      "복잡한 차체 형상과 컴팩트한 접근성을 위한 차량 도어 시스템입니다.",
    US2025129628A1: "산업화 전략과 연결된 저탄소 자동차 공장 개념입니다.",
    US5584510A:
      "소형 차량의 구조 패키징과 충격 에너지 관리를 위한 섀시 원리입니다.",
    US5667030A: "경량 차량 아키텍처에 통합된 냉각용 열교환기입니다.",
    US6015022A:
      "중앙 빔 섀시와 짧은 휠베이스 전략을 갖춘 초경량 전기 도로 차량 아키텍처입니다.",
    USD560092S: "카라프 형태에 관한 디자인 특허입니다.",
    USD568097S: "카라프 필터 액세서리에 관한 디자인 특허입니다.",
    WO2008017182A1:
      "정수 용기에 통합된 필터 카트리지 품질 관리 방법과 장치입니다.",
    WO2016004540A1:
      "시계 무브먼트 부품을 보이지 않거나 매우 절제되어 보이게 하는 광학 방법입니다.",
    WO2021043427A1: "비와 햇빛 보호 시스템을 위한 하우징 특허 맥락입니다.",
    WO2026078588A1:
      "성형 기능과 공기 회로를 통합한 초경량 재활용 가능 대시보드입니다.",
  },
  zh: {
    CH701083B1: "通过胶囊和喷射结构实现牙齿清洁与美白的专利背景。",
    EP2000065A1: "用于可溶性原料饮品的混合腔和气流管理原理。",
    EP3185821A1: "与冲击器和铰刀类外科器械相关的骨科手术工具专利背景。",
    EP3215454A1:
      "可从底部灌装的杯体及其连接装置专利，Jean-Luc Thuliez 与 Étienne Crozier 等为发明人。",
    EP3261867A2: "Aventor SA 关于电动单座车辆架构的直接专利背景。",
    EP3744622A1: "面向 SOFTCAR 平台的车辆架构专利族。",
    EP3393889A1: "早期 SOFTCAR 车辆架构，聚焦轻量结构和车身概念。",
    EP4488027A1: "用于轻量化车辆部件的增强滚塑车身工艺。",
    EP4680511A1: "面向低影响车辆内饰的可回收方向盘架构。",
    EP4705115A1: "SOFTCAR 轮辋导流件，用于车轮气流和空气动力轮罩集成。",
    FR2999439A1: "用于精准化妆品施用的产品分配和发光原理。",
    US2009320941A1: "用于紧凑饮品系统的多路阀和定量控制逻辑。",
    US2010173057A1: "由可溶性原料和稀释液制备发泡液体的原理。",
    US2011061534A1: "与水在胶囊内往返双通道流动相关的胶囊饮品制备背景。",
    US2015342657A1: "面向承载关键生物医疗组件的固定和载荷传递背景。",
    US2015360014A1: "用于可替换产品供给的施用器和胶囊系统。",
    US2016000570A1: "聚合物关节植入物和精密生物医疗部件的制造背景。",
    US2022338602A1: "用于防雨和遮阳保护系统的可展开框架专利背景。",
    US2024326565A1: "适用于复杂车身几何和紧凑出入空间的车门系统。",
    US2025129628A1: "与工业化策略相关的低碳汽车工厂概念。",
    US5584510A: "紧凑车辆中用于结构集成和能量吸收的底盘原理。",
    US5667030A: "集成在轻量化车辆架构中的冷却热交换器。",
    US6015022A: "采用中央梁底盘和紧凑轴距策略的超轻电动道路车辆架构。",
    USD560092S: "覆盖滤水壶外形的设计专利。",
    USD568097S: "覆盖滤水壶过滤附件的设计专利。",
    WO2008017182A1: "用于滤水容器中滤芯质量控制的方法和装置。",
    WO2016004540A1: "使手表机芯部件不可见或非常低调的光学方法。",
    WO2021043427A1: "用于防雨和遮阳保护系统的外壳专利背景。",
    WO2026078588A1: "集成成型功能和空气回路的超轻可回收仪表板。",
  },
  ja: {
    CH701083B1:
      "カートリッジと噴射機構を使い、歯のクリーニングとホワイトニングを行う装置に関する特許です。",
    EP2000065A1:
      "可溶性の原料から飲料を作る際の混合室と空気の流れに関する技術です。",
    EP3185821A1:
      "インパクターやリーマーなど、整形外科で使う器具に関連する特許です。",
    EP3215454A1:
      "底から飲料を注ぐカップと接続装置の特許で、Jean-Luc Thuliez と Étienne Crozier も発明者に名を連ねています。",
    EP3261867A2:
      "Aventor SA に直接関連する、一人乗り電気自動車の構造に関する特許です。",
    EP3744622A1: "SOFTCAR の車両構造に関する特許群です。",
    EP3393889A1:
      "軽量な構造と車体の構想を扱う、SOFTCAR の初期の特許です。",
    EP4488027A1: "軽量な車体部品を作るための、補強を伴う回転成形技術です。",
    EP4680511A1:
      "環境負荷の少ない車内を目指した、リサイクル可能なステアリングホイールの構造です。",
    EP4705115A1:
      "SOFTCAR のホイール周囲の空気の流れと、空力性能を考えたカバーに関するリム用部品です。",
    FR2999439A1: "化粧品を正確に塗布するための供給方法と発光機能に関する技術です。",
    US2009320941A1:
      "小型飲料機器の多方弁と、決まった量を供給する制御方式です。",
    US2010173057A1:
      "可溶性の原料と希釈液から、泡立った飲料を作る方法です。",
    US2011061534A1:
      "飲料カプセル内を水が往復する、二重流路の仕組みに関連する特許です。",
    US2015342657A1:
      "力が加わる医療用部品の固定と、荷重の伝達に関する技術です。",
    US2015360014A1:
      "交換可能なカプセルから製品を供給するための塗布器具です。",
    US2016000570A1:
      "樹脂製の関節インプラントと精密な医療用部品の製造に関する技術です。",
    US2022338602A1:
      "雨や日差しを防ぐ装置に使う、展開式フレームに関する特許です。",
    US2024326565A1:
      "複雑な車体形状にも対応し、限られた空間で乗り降りしやすくするドアの構造です。",
    US2025129628A1: "製造工程の構想につながる、CO₂ 排出量の少ない自動車工場のコンセプトです。",
    US5584510A:
      "小型車両で部品を配置し、衝突時のエネルギーを吸収するための車台の構造です。",
    US5667030A: "軽量な車両構造に組み込む冷却用の熱交換器です。",
    US6015022A:
      "中央の梁を使った車台と短いホイールベースを備える、超軽量の電気自動車の構造です。",
    USD560092S: "浄水カラフェの形状に関する意匠特許です。",
    USD568097S: "浄水カラフェのフィルター部品に関する意匠特許です。",
    WO2008017182A1:
      "浄水容器に組み込まれたフィルターカートリッジの状態を管理する方法と装置です。",
    WO2016004540A1:
      "時計のムーブメント部品を見えなく、または目立たなくする光学的な方法です。",
    WO2021043427A1: "雨や日差しを防ぐ装置の外装に関する特許です。",
    WO2026078588A1:
      "成形時に設ける機能や空気の通り道を一体化した、超軽量でリサイクル可能なダッシュボードです。",
  },
};

type ProjectStat = {
  label: string;
  value: string;
  detail?: string;
  icon: LucideIcon;
};

type ProjectFilterOption = {
  key: FilterKey;
  label: string;
  icon?: LucideIcon;
};

type ProjectSortOption = {
  key: ProjectSortKey;
  label: string;
};

type ProjectsPageCopy = {
  hero: {
    eyebrow: string;
    title: string;
    strong: string;
    rest: string;
    lead: string;
  };
  filters: ProjectFilterOption[];
  featuredProject: Project;
  projects: Project[];
  stats: ProjectStat[];
  statsLabel: string;
  selectedTitle: string;
  resultsLabel: string;
  filtersLabel: string;
  sort: {
    label: string;
    options: ProjectSortOption[];
  };
  searchLabel: string;
  searchPlaceholder: string;
  noResults: string;
  featuredLabel: string;
  viewCaseStudy: string;
  cardOpenDetails: string;
  modal: {
    close: string;
    openImage: string;
    closeImage: string;
    previousImage: string;
    nextImage: string;
    gallery: string;
    overview: string;
    scope: string;
    tags: string;
    relatedPatents: string;
    area: string;
    focus: string;
    output: string;
    design: string;
    prototype: string;
    openFullPage: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    bodyStrong: string;
    body: string;
    button: string;
    subject: string;
  };
};

type ProjectModalCopy = ProjectsPageCopy["modal"];

const FILTERS: ProjectFilterOption[] = [
  { key: "all", label: "All" },
  {
    key: "mobility",
    label: "Mobility",
    icon: CarFront,
  },
  {
    key: "household",
    label: "Household Products",
    icon: HousePlug,
  },
  {
    key: "medical",
    label: "Medical",
    icon: HeartPulse,
  },
  {
    key: "watchmaking",
    label: "Watchmaking",
    icon: WatchIcon,
  },
  {
    key: "building",
    label: "Building Systems",
    icon: Building2,
  },
  {
    key: "sport",
    label: "Sport & Outdoor",
    icon: Dumbbell,
  },
  {
    key: "others",
    label: "Others",
    icon: Shapes,
  },
];

function projectFiltersWithLabels(
  labels: Partial<Record<FilterKey, string>>,
): ProjectFilterOption[] {
  return FILTERS.map((filter) => ({
    ...filter,
    label: labels[filter.key] ?? filter.label,
  }));
}

export const FEATURED_PROJECT: Project = {
  id: "stajvelo-rv01",
  category: "Mobility",
  filter: "mobility",
  title: "STAJVELO RV01",
  description:
    "Urban e-bike developed for STAJVELO, a Monaco-based company, around injected structural components, distinctive wheels and carefully integrated details.",
  image: "/assets/projects/stajvelo-rv01/stajvelo-rv01-01.webp",
  imageAlt: "STAJVELO RV01 electric bicycle on a road circuit",
  tags: ["#2017", "#E-bike", "#Polymer"],
  overview:
    "DOMTEKNIKA developed the polymer architecture and injected structural components of this urban e-bike for STAJVELO, from the initial concept and wheel engineering through to a manufacturable product definition.",
};

const PROJECT_GALLERIES = Object.fromEntries(
  (projectAssetManifest as ProjectAssetManifestEntry[]).map((project) => [
    project.slug,
    project.images.map((image) => image.output),
  ]),
) as Record<string, string[]>;

function getProjectGallery(project: Project) {
  const gallery = PROJECT_GALLERIES[project.id] ?? project.gallery ?? [];
  const images = gallery.includes(project.image)
    ? gallery
    : [project.image, ...gallery];

  return images.length > 0 ? images : [project.image];
}

export const PROJECTS: Project[] = [
  {
    id: "aventor",
    category: "Mobility",
    filter: "mobility",
    title: "Aventor",
    description:
      "Internal electric vehicle project fully designed and prototyped by DOMTEKNIKA, from the electrical and mechanical architecture to the creation of a dedicated startup.",
    image: "/assets/projects/aventor/aventor-01.webp",
    imageAlt: "Green Aventor electric vehicle on a road course",
    tags: ["#2012", "#EV", "#Prototype"],
    overview:
      "Started in 2012, Aventor was fully designed and prototyped by DOMTEKNIKA as an internal project. The platform was developed in both three-wheel and four-wheel versions, from the complete electrical and mechanical architecture through physical prototypes, before the work continued in a separate startup.",
    relatedPatents: [
      relatedPatent(
        "EP3261867A2",
        "Direct Aventor SA patent covering the electric single-seater vehicle architecture.",
      ),
    ],
  },
  {
    id: "sam-cree",
    hiddenFromCatalog: true,
    category: "Mobility",
    filter: "mobility",
    title: "SAM CREE",
    description:
      "Historic ultra-light electric three-wheeler developed by Jean-Luc Thuliez before he founded DOMTEKNIKA.",
    image: "/assets/projects/sam-cree/sam-cree-01.webp",
    imageAlt: "Orange SAM CREE electric three-wheeler with open canopy",
    tags: ["#1993", "#EV", "#ThreeWheeler"],
    overview:
      "Before founding DOMTEKNIKA, Jean-Luc Thuliez contributed to SAM CREE while working at another company. The ultra-light electric three-wheeler explored tandem seating, a central beam chassis and compact urban mobility - ideas that later informed his engineering approach.",
  },
  {
    id: "angel-interceptor",
    category: "Mobility",
    filter: "mobility",
    title: "Angel Interceptor",
    description:
      "Two-wheel electric vehicle concept fully designed and prototyped by DOMTEKNIKA, covering the complete electrical and mechanical development.",
    image: "/assets/projects/angel-interceptor/angel-interceptor-01.webp",
    imageAlt: "Angel Interceptor three-wheel vehicle side-section CAD study",
    tags: ["#2008", "#EV", "#TwoWheeler"],
    overview:
      "Started around 2008, Angel Interceptor was an internal DOMTEKNIKA project covering the complete electrical and mechanical design and prototyping process. Unlike Aventor, it remained within DOMTEKNIKA and did not lead to the creation of a separate startup.",
  },
  {
    id: "softcar",
    category: "Mobility",
    filter: "mobility",
    title: "SOFTCAR",
    description:
      "Compact hybrid vehicle platform, with a possible fully electric configuration, developed through complete electrical and mechanical engineering and prototyping.",
    image: "/assets/projects/softcar/softcar-01.webp",
    imageAlt: "Yellow SOFTCAR compact city vehicle with open door",
    tags: ["#2006", "#Hybrid", "#Ongoing"],
    overview:
      "The first SOFTCAR designs date from 2006-2007. DOMTEKNIKA has led the complete electrical and mechanical design and prototyping as an internal project through the creation of a separate startup. Development is ongoing: the platform is conceived primarily as a hybrid vehicle, with a possible fully electric configuration.",
    relatedPatents: [
      relatedPatent(
        "WO2026078588A1",
        "Ultra-light recyclable dashboard integrating molded functions and air circuits.",
      ),
      relatedPatent(
        "EP4488027A1",
        "Reinforced rotomolded body process for lightweight vehicle parts.",
      ),
      relatedPatent(
        "EP4705115A1",
        "SOFTCAR rim deflector work for vehicle wheel airflow and aerodynamic wheel-cover integration.",
      ),
      relatedPatent(
        "EP4680511A1",
        "Recyclable steering wheel architecture aligned with low-impact vehicle interiors.",
      ),
      relatedPatent(
        "US2024326565A1",
        "Vehicle door system for complex body geometry and compact access.",
      ),
      relatedPatent(
        "EP3744622A1",
        "Vehicle architecture patent family for the SOFTCAR platform.",
      ),
      relatedPatent(
        "EP3393889A1",
        "Earlier SOFTCAR vehicle architecture covering the lightweight structural and body concept.",
      ),
      relatedPatent(
        "US2025129628A1",
        "Low-carbon automobile plant concept connected to the industrialization strategy.",
      ),
    ],
  },
  {
    id: "folding-bike-scooter",
    category: "Mobility",
    filter: "mobility",
    title: "Folding bike & scooter",
    description:
      "Internal folding bike and scooter concepts developed around compact mechanisms, everyday ergonomics and reduced transport volume.",
    image: "/assets/projects/folding-bike-scooter/folding-bike-scooter-01.webp",
    imageAlt: "DOMTEKNIKA folding electric bicycle concept",
    tags: ["#2011", "#Folding", "#Mobility"],
    overview:
      "DOMTEKNIKA explored several folding mobility architectures, from electric bicycles to scooters, refining hinges, locking systems, riding position and component integration to create compact, transportable and manufacturable concepts.",
  },
  {
    id: "instant-coffee-dispenser",
    category: "Household Products",
    filter: "household",
    title: "Soluble Coffee Machine",
    description:
      "Low-cost soluble-coffee machine designed to deliver an espresso-style cup from a broad range of soluble coffees and other soluble beverages.",
    image:
      "/assets/projects/instant-coffee-dispenser/instant-coffee-dispenser-01.webp",
    imageAlt: "Soluble coffee machine prototype with hand interaction",
    tags: ["#2006", "#Appliance", "#Prototype"],
    overview:
      "DOMTEKNIKA developed the complete machine and carried out an initial industrialization study. Its architecture supports a range of soluble coffees and other soluble beverages. To prepare cappuccinos without contaminating the machine, milk remains fully separated from the internal circuit and never passes through its pipes or components. This design limits residue buildup and simplifies hygiene, cleaning and maintenance. The machine was subsequently brought to market for a major coffee-machine brand.",
    relatedPatents: [
      relatedPatent(
        "EP2000065A1",
        "Mixing chamber and airflow management for soluble beverage ingredients.",
      ),
      relatedPatent(
        "US2010173057A1",
        "Frothed soluble-ingredient liquid production method and device.",
      ),
      relatedPatent(
        "US2009320941A1",
        "Multi-way valve and dosing logic for solvent and solid-substance preparation systems.",
      ),
    ],
  },
  {
    id: "totalcar-concept",
    category: "Mobility",
    filter: "mobility",
    title: "Total Car",
    description:
      "Three-wheeled technology demonstrator developed for Hutchinson and the Total group, from the chassis and propulsion electronics to the rotomoulded body panels.",
    image: "/assets/projects/totalcar-concept/total-car-01.webp",
    imageAlt:
      "Green Total Car three-wheeled technology demonstrator on display",
    tags: ["#2011", "#Demonstrator", "#ThreeWheeler", "#Rotomoulding"],
    overview:
      "Commissioned by Hutchinson, then part of the Total group, DOMTEKNIKA developed a complete three-wheeled technology demonstrator. The team designed the chassis, propulsion electronics and rotomoulded body panels.",
  },
  {
    id: "airsmile",
    category: "Household Products",
    filter: "household",
    title: "At-home tooth whitening device",
    description:
      "Non-electric at-home tooth whitening device inspired by professional Airflow systems and powered by a single-use treatment cartridge.",
    image: "/assets/projects/airsmile/airsmile-01.webp",
    imageAlt:
      "At-home tooth whitening device and single-use treatment cartridge",
    tags: ["#2007", "#Dental", "#Device"],
    overview:
      "Designed to reproduce at home the principle of Airflow devices used in dental practices, the device works without electricity. A single-use consumable supplies the propellant gases and active agents required for one treatment. DOMTEKNIKA developed the complete product, built functional prototypes, carried out performance testing and prepared the design for industrialization.",
    relatedPatents: [
      relatedPatent(
        "CH701083B1",
        "Dental treatment cartridge and jet architecture relevant to at-home scaling and whitening devices.",
      ),
    ],
  },
  {
    id: "flex-drill",
    category: "Medical",
    filter: "medical",
    title: "Flexible orthopaedic drill",
    description:
      "Flexible polymer instrument combining lightweight construction, controlled production costs and compatibility with medical sterilization requirements.",
    image: "/assets/projects/flex-drill/flex-drill-01.webp",
    imageAlt: "Flexible orthopaedic drill with a blue polymer body",
    tags: ["#2014", "#Orthopaedics", "#Polymer"],
    overview:
      "DOMTEKNIKA designed and developed a new polymer architecture for this flexible orthopaedic instrument. The project covered concept research, complete development of the selected solution, functional prototyping and production-cost analysis, resulting in a lightweight, industrializable design suited to the constraints of medical use.",
  },
  {
    id: "biome-staple-applicator",
    category: "Medical",
    filter: "medical",
    title: "ZipFix sternal implant application instrument",
    description:
      "Single-use polymer instrument designed to replace a reusable steel solution, reducing manufacturing and maintenance costs while limiting contamination risks associated with reuse.",
    image:
      "/assets/projects/biome-staple-applicator/biome-staple-applicator-01.webp",
    imageAlt: "White and red ZipFix sternal implant application instrument",
    tags: ["#2013", "#SternalImplant", "#SingleUse"],
    overview:
      "The project addressed three key challenges of the reusable steel instrument: high manufacturing costs, long-term maintenance requirements and contamination risks associated with repeated use. DOMTEKNIKA developed a single-use polymer alternative for applying ZipFix sternal implants, covering concept research, complete product development, functional prototype validation and management of an initial injection-moulded series.",
    relatedPatents: [
      relatedPatent(
        "US2015342657A1",
        "Bone fixation assembly context for load-critical biomedical fastening devices.",
      ),
    ],
  },
  {
    id: "filter-carafe",
    category: "Household Products",
    filter: "household",
    title: "Filter Carafe",
    description:
      "Filter-carafe system developed end to end, featuring a low-cost mechanism that measures filtered-water volume and alerts the user when the cartridge should be replaced.",
    image: "/assets/projects/filter-carafe/filter-carafe-01.webp",
    imageAlt: "Filtered-water carafe concept with cartridge accessories",
    tags: ["#2006", "#Filtration", "#ProductDesign"],
    overview:
      "DOMTEKNIKA developed the complete product, from the carafe and filter accessory to a low-cost volume-counting component. By tracking the quantity of water filtered, the system indicates when the user should replace the cartridge.",
    relatedPatents: [
      relatedPatent(
        "WO2008017182A1",
        "Quality-control method and device for a filtration cartridge integrated into a filtered-water vessel.",
      ),
      relatedPatent("USD560092S", "Design patent covering the carafe form."),
      relatedPatent(
        "USD568097S",
        "Design patent covering the filter accessory for the carafe.",
      ),
    ],
  },
  {
    id: "ikitty",
    category: "Household Products",
    filter: "household",
    title: "Automatic cat food dispenser",
    description:
      "Automatic wet-food dispenser designed for multi-day absences, with portion cartridges and odor-controlled waste management.",
    image: "/assets/projects/ikitty/ikitty-01.webp",
    imageAlt: "Automatic cat food dispenser functional prototype",
    tags: ["#2023", "#PetTech", "#Mechanism"],
    overview:
      "Designed to dispense wet food automatically while the owner is away for several days, the machine also manages used portions to contain food odors. DOMTEKNIKA developed the cartridge that transfers capsules ergonomically from their packaging into the machine and built a functional demonstrator. The team also improved key functions, including compaction of used capsules and cartridge packaging, and contributed to digitizing the product design and integrating the functional modules into the new housing.",
  },
  {
    id: "smart-bottle",
    category: "Medical",
    filter: "medical",
    title: "Smart Bottle",
    description:
      "Automatic, secure dispenser for prescription-controlled liquid medicines, originally developed for morphine and adaptable to other liquid treatments.",
    image: "/assets/projects/smart-bottle/smart-bottle-01.webp",
    imageAlt:
      "Smart Bottle medical dispenser concept with blue internal module",
    tags: ["#2010–2015", "#Medical", "#Dosing"],
    overview:
      "Starting from a client concept and functional prototype, DOMTEKNIKA improved key functions, including a safety system designed to neutralize morphine if the bottle was breached. The team coordinated the new product design, engineered every part for industrial manufacture, built the first prototype of the revised version, then managed the first molds, injection-molding trials and initial production series. Although originally developed for morphine, the dispensing principle can be adapted to other liquid medicines.",
  },
  {
    id: "personal-injector",
    category: "Medical",
    filter: "medical",
    title: "Auto-injector",
    description:
      "Connected auto-injector designed to simplify and secure self-administered treatments, with a concealed needle and digital dose monitoring.",
    image: "/assets/projects/personal-injector/personal-injector-01.webp",
    imageAlt: "Medical auto-injector designed to conceal the needle",
    tags: ["#2013", "#Medical", "#DoseMonitoring"],
    overview:
      "Designed in particular for regular diabetes treatments, this auto-injector keeps the needle out of sight throughout use to reduce patient anxiety. DOMTEKNIKA led the industrialization of the device, optimizing its architecture for a reliable, robust product suitable for series production. Integrated dose monitoring also provides a clear record of treatment adherence over time.",
  },
  {
    id: "acetabular-reamer-holder",
    category: "Medical",
    filter: "medical",
    title: "Acetabular Reamer Holder",
    description:
      "Industrialization of PEEK components for an acetabular reamer holder, combining mechanical validation, injection optimization and process development.",
    image:
      "/assets/projects/acetabular-reamer-holder/acetabular-reamer-holder-01.webp",
    imageAlt: "Two orange and black PEEK parts for an acetabular reamer holder",
    tags: ["#2012", "#PEEK", "#Industrialization"],
    overview:
      "DOMTEKNIKA led the industrialization of two PEEK components for an acetabular reamer holder. The development combined finite-element and rheological analyses, geometry optimization for injection molding, tooling development and process tuning to ensure mechanical performance, precision and repeatability in production.",
  },
  {
    id: "single-use-turbine",
    category: "Medical",
    filter: "medical",
    title: "Single Use Turbine",
    description:
      "Polymer turbine developed before 2006 and documented as an early medical-device engineering project.",
    image: "/assets/projects/single-use-turbine/single-use-turbine-01.webp",
    imageAlt: "Transparent single-use turbine medical component",
    tags: ["#Pre-2006", "#Polymer", "#Medical"],
    overview:
      "The available project archive confirms that DOMTEKNIKA developed this turbine in polymer before 2006. It does not establish whether the primary objective was disposability, cost reduction or another technical requirement; the presentation is therefore limited to the component, its polymer construction and the period in which it was developed.",
  },
  {
    id: "glove-helmet-dryer",
    category: "Sport & Outdoor",
    filter: "sport",
    title: "Glove & helmet dryer",
    description:
      "Compact station designed to remove moisture from gloves and a helmet between sports sessions, documented through CAD studies and physical prototypes.",
    image: "/assets/projects/glove-helmet-dryer/glove-helmet-dryer-01.webp",
    imageAlt: "Prototype glove dryer with gloves mounted",
    tags: ["#2015", "#Consumer", "#Prototype"],
    overview:
      "The project explored a compact station intended to dry perspiration from gloves and a helmet between successive sessions. Available material documents CAD development and physical prototypes focused on equipment support, airflow and compact integration.",
  },
  {
    id: "folding-umbrella",
    category: "Others",
    filter: "others",
    title: "Pocket folding umbrella",
    description:
      "Pocket umbrella designed to fold to approximately smartphone size, with engineered frame kinematics and research into suitable fabrics.",
    image: "/assets/projects/folding-umbrella/pocket-folding-umbrella-01.webp",
    imageAlt: "Yellow pocket folding umbrella prototype",
    tags: ["#2018", "#Mechanism", "#Consumer"],
    overview:
      "DOMTEKNIKA worked on the frame architecture and folding kinematics required to achieve a smartphone-sized footprint when closed, and assessed fabrics compatible with compact folding. As the available information does not confirm whether full product development or industrialization was completed, the presentation focuses on the documented engineering and material research.",
    relatedPatents: [
      relatedPatent(
        "US2022338602A1",
        "Deployable frame architecture for a weather and sun-protection device.",
      ),
      relatedPatent(
        "WO2021043427A1",
        "Housing architecture for a weather-protection device.",
      ),
    ],
  },
  {
    id: "bottom-filling-cup",
    category: "Others",
    filter: "others",
    title: "Bottom-filling cup",
    description:
      "Event cup with an integrated bottom valve for faster filling from beer taps while limiting foam.",
    image: "/assets/projects/bottom-filling-cup/bottom-filling-cup-01.webp",
    imageAlt:
      "CAD study of two bottom-filling cups with integrated valve concepts",
    gallery: [
      "/assets/projects/bottom-filling-cup/bottom-filling-cup-01.webp",
      "/assets/projects/bottom-filling-cup/shared-02-valve-section.webp",
      "/assets/projects/bottom-filling-cup/shared-03-prototype-components.webp",
      "/assets/projects/bottom-filling-cup/shared-04-first-series.webp",
    ],
    tags: ["#2014–2015", "#Beverage", "#InjectionMolding"],
    overview:
      "Designed for high-throughput events, the concept enables beer to enter through the bottom of the cup, reducing turbulence and foam to accelerate service. DOMTEKNIKA defined the integrated valve architecture to combine rapid filling, leak-tight closure and easy cleaning, performed mechanical and rheological calculations, supervised injection molding of the first production series and conducted functional tests.",
    relatedPatents: [
      relatedPatent(
        "EP3215454A1",
        "Patent covering the bottom-fill cup and its connection device, with Jean-Luc Thuliez and Étienne Crozier among the inventors.",
      ),
    ],
  },
  {
    id: "skincare-applicator",
    category: "Household Products",
    filter: "household",
    title: "Skincare applicator",
    description:
      "Dermatology device combining physical massage, serum application and controlled light exposure to stimulate collagen production.",
    image: "/assets/projects/skincare-applicator/skincare-applicator-01.webp",
    imageAlt:
      "IDlab skincare applicator with cosmetic cartridges and packaging",
    tags: ["#2012", "#BeautyTech", "#Packaging"],
    overview:
      "Based on a principle developed by a dermatology research institute, the device combines physical massage, serum application and controlled light exposure to stimulate collagen production and support skin rejuvenation. DOMTEKNIKA developed the complete device and its single-use serum consumable, built functional prototypes and, together with the institute, ran performance tests to optimize the serum formulation and the most effective exposure wavelengths.",
    relatedPatents: [
      relatedPatent(
        "US2015360014A1",
        "Applicator and capsule system directly relevant to refillable dermocosmetic delivery.",
      ),
      relatedPatent(
        "FR2999439A1",
        "Product dispensing and light-emission device related to cosmetic application concepts.",
      ),
    ],
  },
  {
    id: "alicoffee-machine",
    category: "Household Products",
    filter: "household",
    title: "Coffee Machine",
    description:
      "Coffee machine concept built around a double-pass capsule circuit, where water makes an out-and-back path through the capsule.",
    image: "/assets/projects/alicoffee-machine/coffee-machine-01.webp",
    imageAlt: "Coffee machine countertop concept render",
    tags: ["#2014", "#Coffee", "#Capsule", "#Fluidics"],
    overview:
      "This project is limited to the coffee-machine capsule principle: water does not simply flow straight through the capsule. It follows an out-and-back path inside the capsule, creating a double pass during extraction.",
  },
  {
    id: "special-t-machine",
    temporarilyDisabled: true,
    category: "Household Products",
    filter: "household",
    title: "Capsule tea machine",
    description:
      "Capsule tea machine refined around extraction-head mechanics, infusion quality and industrialization readiness.",
    image: "/assets/projects/special-t-machine/tea-machine-01.webp",
    imageAlt: "Tea-machine brewing unit prototype",
    tags: ["#2008", "#Tea", "#BrewingUnit"],
    overview:
      "Starting from an existing extraction-head prototype, DOMTEKNIKA improved capsule retention, closing kinematics, capsule detection and opening, and tea flow at the capsule outlet. The team then supported industrialization of the extraction head, developed a system that prevents steam from accumulating inside the capsule to improve infusion, and contributed to industrializing several machine components.",
    relatedPatents: [
      relatedPatent(
        "US2011061534A1",
        "Beverage-production device for a tea-capsule machine, also published as WO2009135899.",
      ),
    ],
  },
  {
    id: "transparent-clock",
    category: "Watchmaking",
    filter: "watchmaking",
    title: "Transparent showcase clock",
    description:
      "Large showcase clock with a transparent face, no visible central hand pivot, peripheral disc drive and atomic-time synchronization.",
    image: "/assets/projects/transparent-clock/transparent-clock-01.webp",
    imageAlt:
      "Functional prototype of the transparent showcase clock with peripheral mechanism",
    gallery: [
      "/assets/projects/transparent-clock/transparent-clock-01.webp",
      "/assets/projects/transparent-clock/shared-02-gear-train-cad.webp",
      "/assets/projects/transparent-clock/shared-03-peripheral-drive.webp",
      "/assets/projects/transparent-clock/shared-04-toothed-discs.webp",
    ],
    tags: ["#2012–2013", "#Watchmaking", "#Mechatronics"],
    overview:
      "Developed for a watch retailer’s window in Geneva, the clock preserves a clear view through its face without a visible hand pivot at the center. DOMTEKNIKA developed the complete electrical and mechanical concept using transparent rotating discs driven at their periphery, integrated atomic-clock synchronization, coordinated the design study and built a functional prototype with injection-molded gear segments.",
  },
  {
    id: "kitesurf-safety",
    category: "Sport & Outdoor",
    filter: "sport",
    title: "Kitesurf safety systems",
    description: "Injection-moulded polymer primary and secondary releases developed to improve design, cost and reliability, with particular attention to the force needed to activate them.",
    image: "/assets/projects/kitesurf-safety/shared-01-primary-release.webp",
    imageAlt: "CAD rendering of the primary kitesurf safety release in black polymer with a red activation arrow",
    gallery: [
      "/assets/projects/kitesurf-safety/shared-01-primary-release.webp",
      "/assets/projects/kitesurf-safety/shared-02-secondary-release.webp",
      "/assets/projects/kitesurf-safety/shared-03-assembled-release.webp",
      "/assets/projects/kitesurf-safety/shared-04-release-operation.webp",
    ],
    tags: ["#2010–2011"],
    overview: "In 2010–2011, DOMTEKNIKA developed new kitesurf safety releases for a client whose existing systems did not meet design, cost and reliability expectations. These devices allow the rider to release the kite’s pull in strong winds, reducing the risk of being lifted and injured. Development of the primary and secondary injection-moulded polymer releases focused on the force required for activation.",
  },
  {
    id: "eternal-watch",
    category: "Watchmaking",
    filter: "watchmaking",
    title: "Eternal watch",
    description: "A mainspring winding system powered by ambient temperature variations, developed from an idea initiated by DOMTEKNIKA.",
    image: "/assets/projects/eternal-watch/shared-01-watch-render.webp",
    imageAlt: "Rendering of the eternal watch showing the integration of its mechanism",
    gallery: [
      "/assets/projects/eternal-watch/shared-01-watch-render.webp",
      "/assets/projects/eternal-watch/shared-02-winding-mechanism.webp",
      "/assets/projects/eternal-watch/shared-03-winding-figure.webp",
    ],
    tags: ["#2015"],
    overview: "In 2015, DOMTEKNIKA developed a system for a major Swiss watchmaker based on an internal idea rather than a client request. The mechanism uses ambient temperature variations to wind the mainspring automatically and prevent it from unwinding completely, an important consideration for mechanical watch accuracy. The project included a functional prototype and performance testing. A provisional patent filing was made, but was not followed by a definitive filing and was never published.",
  },
  {
    id: "invisible-gear-train-bridge",
    category: "Watchmaking",
    filter: "watchmaking",
    title: "Invisible gear train bridge",
    description: "A transparent gear train bridge designed to showcase the gears through carefully selected materials and surface treatments.",
    image: "/assets/projects/invisible-gear-train-bridge/shared-01-transparent-bridge-front.webp",
    imageAlt: "Front view of transparent gear train bridge components",
    gallery: [
      "/assets/projects/invisible-gear-train-bridge/shared-01-transparent-bridge-front.webp",
      "/assets/projects/invisible-gear-train-bridge/shared-02-transparent-bridge-perspective.webp",
    ],
    tags: ["#2011–2012"],
    overview: "In 2011–2012, DOMTEKNIKA developed a transparent gear train bridge for a major Swiss watchmaker. The project originated from an internal idea rather than a client request: making the bridge visually invisible to highlight the gears themselves. Work covered component design and calculations, material and treatment selection, and supervision of injection moulding for the first components.",
    relatedPatents: [
      relatedPatent("CH707437A1", "Transparent watch movement component and optical treatments."),
      relatedPatent("WO2016004540A1", "Optical method for making a watch movement component invisible."),
    ],
  },
  {
    id: "clepsydra",
    category: "Watchmaking",
    filter: "watchmaking",
    title: "Clepsydra",
    description: "Contribution to a monumental water clock, including a motorised turning mechanism and a half-scale prototype.",
    image: "/assets/projects/clepsydra/shared-01-design-concept.webp",
    imageAlt: "Concept presentation of the monumental water clock",
    gallery: [
      "/assets/projects/clepsydra/shared-01-design-concept.webp",
      "/assets/projects/clepsydra/shared-02-half-scale-prototype.webp",
      "/assets/projects/clepsydra/shared-03-turning-mechanism.webp",
    ],
    tags: ["#2008"],
    overview: "In 2008, DOMTEKNIKA contributed to the development of a monumental water clock for a major Swiss watchmaker, initially intended for display in Geneva. The team helped define the concept, developed and motorised the clock’s turning mechanism, participated in building a half-scale prototype and carried out functional tests.",
  },
  {
    id: "velum-sky-screen",
    category: "Building Systems",
    filter: "building",
    title: "Velum Sky amphitheatre screen",
    description:
      "Custom lifting system for the Velum Sky screen, engineered with guides that remain invisible when raised while supporting the screen in full cantilever during deployment.",
    image: "/assets/projects/velum-sky-screen/velum-sky-screen-01.webp",
    imageAlt:
      "Giant screen lifting system in the Velum Sky amphitheatre in Geneva",
    tags: ["#2025", "#Building", "#Engineering"],
    overview:
      "DOMTEKNIKA engineered the complete mechanical system that raises, lowers and positions the giant screen in the Velum Sky amphitheatre in Geneva. The central challenge was to keep the guides invisible in the raised position while controlling a fully cantilevered screen as it descends, requiring precise management of guidance, stiffness, drive and integration into the building.",
  },
];

const STATS: ProjectStat[] = [
  {
    label: "Projects delivered",
    value: "100+",
    icon: Box,
  },
  {
    label: "Project support",
    value: "End-to-end",
    icon: ShieldCheck,
  },
  {
    label: "Engineering expertise",
    value: "Multi-sector",
    icon: Target,
  },
  {
    label: "International projects",
    value: "Worldwide",
    icon: Globe2,
  },
  {
    label: "Swiss engineering",
    value: "Since 1998",
    icon: CalendarDays,
  },
];

const FR_PROJECT_OVERRIDES: Record<string, Partial<Project>> = {
  "stajvelo-rv01": {
    category: "Mobilité",
    description:
      "Vélo électrique urbain développé pour STAJVELO, entreprise monégasque, autour de pièces structurelles injectées, de roues distinctives et d'une intégration soignée.",
    imageAlt: "Vélo électrique STAJVELO RV01 sur circuit",
    overview:
      "DOMTEKNIKA a développé pour STAJVELO l'architecture polymère et les pièces structurelles injectées de ce vélo électrique urbain, depuis le concept initial et l'ingénierie des roues jusqu'à la définition industrialisable du produit.",
  },
  aventor: {
    category: "Mobilité",
    description:
      "Projet interne de véhicule électrique entièrement conçu et prototypé par DOMTEKNIKA, de l'architecture électrique et mécanique à la création d'une startup dédiée.",
    imageAlt: "Véhicule électrique vert Aventor sur circuit",
    overview:
      "Lancé en 2012, Aventor a été entièrement conçu et prototypé par DOMTEKNIKA comme projet interne. La plateforme a été développée en versions trois et quatre roues, de l'architecture électrique et mécanique complète aux prototypes physiques, avant que le projet se poursuive au sein d'une startup séparée.",
    relatedPatents: [
      relatedPatent(
        "EP3261867A2",
        "Brevet Aventor SA directement lié à l'architecture de véhicule électrique monoplace.",
      ),
    ],
  },
  "totalcar-concept": {
    category: "Mobilité",
    title: "Total Car",
    description:
      "Démonstrateur technologique à trois roues développé pour Hutchinson et le groupe Total, du châssis à l'électronique de propulsion jusqu'aux pièces de carrosserie rotomoulées.",
    imageAlt: "Démonstrateur technologique à trois roues Total Car exposé",
    overview:
      "À la demande de Hutchinson, alors filiale du groupe Total, DOMTEKNIKA a développé un démonstrateur technologique complet à trois roues. L'équipe a conçu le châssis, l'électronique de propulsion et les pièces de carrosserie rotomoulées.",
  },
  "sam-cree": {
    category: "Mobilité",
    title: "SAM CREE",
    description:
      "Trois-roues électrique ultraléger historique auquel Jean-Luc Thuliez a contribué avant de fonder DOMTEKNIKA.",
    imageAlt:
      "Véhicule électrique à trois roues SAM CREE avec verrière ouverte",
    overview:
      "Avant de fonder DOMTEKNIKA, Jean-Luc Thuliez a contribué au projet SAM CREE au sein d'une autre entreprise. Ce trois-roues électrique ultraléger explorait les sièges en tandem, un châssis poutre central et une mobilité urbaine compacte - des principes qui nourriront ensuite son approche de l'ingénierie.",
  },
  "angel-interceptor": {
    category: "Mobilité",
    description:
      "Concept électrique à deux roues entièrement conçu et prototypé par DOMTEKNIKA, couvrant l'ensemble du développement électrique et mécanique.",
    imageAlt: "Étude du concept électrique à deux roues Angel Interceptor",
    overview:
      "Lancé vers 2008, Angel Interceptor est un projet interne de DOMTEKNIKA couvrant la conception électrique et mécanique complète ainsi que le prototypage. Contrairement à Aventor, il est resté au sein de DOMTEKNIKA et n'a pas donné lieu à la création d'une startup séparée.",
  },
  softcar: {
    category: "Mobilité",
    title: "SOFTCAR",
    description:
      "Plateforme de mobilité urbaine compacte conçue autour d'une architecture hybride, avec une déclinaison entièrement électrique possible.",
    imageAlt: "Véhicule urbain compact jaune SOFTCAR avec porte ouverte",
    overview:
      "Les premières études de SOFTCAR remontent à 2008. Né comme projet interne, les premiers prototypes du véhicule ont été entièrement conçus par DOMTEKNIKA, de l'architecture électrique à la conception mécanique, avant de donner naissance à une startup indépendante. Son développement se poursuit aujourd'hui autour d'une plateforme principalement hybride.",
    relatedPatents: [
      relatedPatent(
        "WO2026078588A1",
        "Tableau de bord ultra-léger et recyclable intégrant fonctions moulées et circuits d'air.",
      ),
      relatedPatent(
        "EP4488027A1",
        "Procédé de carrosserie rotomoulée renforcée pour pièces véhicule légères.",
      ),
      relatedPatent(
        "EP4705115A1",
        "Déflecteur de jante SOFTCAR pour le flux d'air autour des roues et l'intégration aérodynamique.",
      ),
      relatedPatent(
        "EP4680511A1",
        "Volant recyclable aligné avec les intérieurs véhicule à faible impact.",
      ),
      relatedPatent(
        "US2024326565A1",
        "Système de porte pour géométrie de carrosserie complexe et accès compact.",
      ),
      relatedPatent(
        "EP3744622A1",
        "Famille de brevets d'architecture véhicule pour la plateforme SOFTCAR.",
      ),
      relatedPatent(
        "EP3393889A1",
        "Architecture véhicule SOFTCAR antérieure, centrée sur la structure légère et le concept de carrosserie.",
      ),
      relatedPatent(
        "US2025129628A1",
        "Concept d'usine automobile à faible empreinte carbone lié à l'industrialisation.",
      ),
    ],
  },
  "folding-bike-scooter": {
    category: "Mobilité",
    title: "Vélo & scooter pliants",
    description:
      "Concepts internes de vélo et de scooter pliants, développés autour de mécanismes compacts, de l'ergonomie d'usage et d'un encombrement réduit pour le transport.",
    imageAlt: "Concept de vélo électrique pliant DOMTEKNIKA",
    overview:
      "DOMTEKNIKA a étudié plusieurs architectures de mobilité pliante, du vélo électrique au scooter, en travaillant les charnières, le verrouillage, la position de conduite et l'intégration des composants afin d'obtenir des concepts compacts, transportables et réalisables.",
  },
  airsmile: {
    category: "Appareils ménagers",
    title: "Blanchisseur de dent",
    description:
      "Appareil de blanchiment dentaire à domicile, sans électricité, inspiré des systèmes Airflow professionnels et alimenté par un consommable à usage unique.",
    imageAlt: "Blanchisseur de dent à domicile et consommable à usage unique",
    overview:
      "Conçu pour proposer à domicile un blanchiment dentaire inspiré des appareils Airflow utilisés en cabinet, l'appareil fonctionne sans électricité. Un consommable à usage unique fournit les gaz propulseurs et les agents actifs nécessaires à un traitement. DOMTEKNIKA a développé l'ensemble du produit, réalisé des prototypes fonctionnels et des essais de performance, puis préparé son industrialisation.",
    relatedPatents: [
      relatedPatent(
        "CH701083B1",
        "Architecture de cartouche dentaire et de jets pertinente pour un dispositif de détartrage/blanchiment à domicile.",
      ),
    ],
  },
  "flex-drill": {
    category: "Médical",
    title: "Foret orthopédique flexible",
    description:
      "Instrument orthopédique flexible en polymère, associant légèreté, maîtrise des coûts de production et compatibilité avec les exigences de stérilisation.",
    imageAlt: "Foret orthopédique flexible avec corps polymère bleu",
    overview:
      "DOMTEKNIKA a conçu et développé une nouvelle architecture polymère pour cet instrument orthopédique flexible. Le projet a couvert la recherche de concepts, le développement complet de la solution retenue, la réalisation de prototypes fonctionnels et l'analyse des coûts de production, pour aboutir à un dispositif léger, industrialisable et adapté aux contraintes de l'usage médical.",
  },
  "biome-staple-applicator": {
    category: "Médical",
    title: "Instrument d’application d’implants sternaux ZipFix",
    description:
      "Instrument polymère à usage unique conçu pour remplacer une solution réutilisable en acier, réduire les coûts de fabrication et de maintenance, et limiter les risques de contamination liés à la réutilisation.",
    imageAlt:
      "Instrument blanc et rouge d’application d’implants sternaux ZipFix",
    overview:
      "Le projet répondait à trois enjeux majeurs de l'instrument réutilisable en acier : un coût de fabrication élevé, une maintenance importante sur toute sa durée de vie et des risques de contamination liés aux usages successifs. DOMTEKNIKA a développé une alternative polymère à usage unique pour l'application des implants sternaux ZipFix, de la recherche de concepts au développement complet du produit, jusqu'à la validation par prototypes fonctionnels et au pilotage d'une première série injectée.",
    relatedPatents: [
      relatedPatent(
        "US2015342657A1",
        "Contexte d'assemblage de fixation osseuse pour dispositifs biomédicaux soumis à des efforts.",
      ),
    ],
  },
  "filter-carafe": {
    category: "Appareils ménagers",
    title: "Carafe filtrante",
    description:
      "Système de carafe filtrante développé de bout en bout, avec un dispositif économique qui mesure le volume d'eau filtré et indique à l'utilisateur quand remplacer la cartouche.",
    imageAlt: "Concept de carafe filtrante avec accessoires de cartouche",
    overview:
      "DOMTEKNIKA a développé l'ensemble du produit, de la carafe et son accessoire filtrant jusqu'au composant économique de comptage du volume. En suivant la quantité d'eau filtrée, le système indique à l'utilisateur quand remplacer la cartouche.",
    relatedPatents: [
      relatedPatent(
        "WO2008017182A1",
        "Méthode et dispositif de contrôle qualité pour cartouche de filtration intégrés à une carafe filtrante.",
      ),
      relatedPatent(
        "USD560092S",
        "Brevet de design portant sur la forme de la carafe.",
      ),
      relatedPatent(
        "USD568097S",
        "Brevet de design portant sur l'accessoire filtrant de la carafe.",
      ),
    ],
  },
  ikitty: {
    category: "Appareils ménagers",
    title: "Distributeur automatique de nourriture pour chat",
    description:
      "Distributeur automatique de pâtée pour les absences de plusieurs jours, avec capsules portionnées et gestion des déchets limitant les odeurs.",
    imageAlt:
      "Prototype fonctionnel de distributeur automatique de nourriture pour chat",
    overview:
      "Conçue pour distribuer automatiquement de la pâtée pendant plusieurs jours d'absence du propriétaire, la machine gère également les portions usagées afin de contenir les odeurs. DOMTEKNIKA a développé la cartouche qui permet de transférer ergonomiquement les capsules de leur emballage vers la machine et réalisé un prototype fonctionnel. L'équipe a aussi amélioré des fonctions clés, notamment le compactage des capsules après usage et leur conditionnement en cartouches, puis participé à la numérisation du design et à l'intégration des éléments fonctionnels dans la nouvelle enveloppe.",
  },
  "smart-bottle": {
    category: "Médical",
    title: "Smart Bottle",
    description:
      "Distributeur automatique et sécurisé de médicaments liquides selon prescription, développé à l’origine pour la morphine et adaptable à d’autres traitements liquides.",
    imageAlt:
      "Concept de distributeur médical Smart Bottle avec module interne bleu",
    overview:
      "À partir du concept et du prototype fonctionnel apportés par le client, DOMTEKNIKA a amélioré plusieurs fonctions clés, dont un dispositif de sécurité conçu pour neutraliser la morphine en cas d’effraction de la bouteille. L’équipe a piloté le nouveau design, conçu l’ensemble des pièces pour une fabrication industrielle, réalisé le premier prototype de la version révisée, puis suivi les premiers moules, la mise au point des injections et la production de la première série. Initialement développé pour la morphine, le principe de distribution peut être adapté à d’autres médicaments liquides.",
  },
  "personal-injector": {
    category: "Médical",
    title: "Auto-injecteur",
    description:
      "Auto-injecteur connecté conçu pour simplifier et sécuriser l'administration autonome des traitements, avec aiguille dissimulée et suivi numérique des doses.",
    imageAlt: "Auto-injecteur médical conçu pour dissimuler l'aiguille",
    overview:
      "Pensé notamment pour les traitements réguliers du diabète, cet auto-injecteur maintient l'aiguille hors du champ visuel pendant toute l'utilisation afin de réduire l'appréhension du patient. DOMTEKNIKA a piloté l'industrialisation du dispositif en optimisant son architecture pour obtenir un produit fiable, robuste et adapté à la fabrication en série. Le suivi intégré des doses permet également de documenter la régularité du traitement dans le temps.",
  },
  "acetabular-reamer-holder": {
    category: "Médical",
    title: "Porte-fraise acétabulaire",
    description:
      "Industrialisation de composants en PEEK pour un porte-fraise acétabulaire, intégrant validation mécanique, optimisation pour l'injection et développement du procédé.",
    imageAlt:
      "Deux pièces orange et noire en PEEK pour un porte-fraise acétabulaire",
    overview:
      "DOMTEKNIKA a piloté l'industrialisation de deux composants en PEEK destinés à un porte-fraise acétabulaire. Le développement a combiné analyses par éléments finis et simulations rhéologiques, optimisation des géométries pour l'injection, développement des outillages et mise au point du procédé afin de garantir performance mécanique, précision et répétabilité en production.",
  },
  "single-use-turbine": {
    category: "Médical",
    title: "Turbine à usage unique",
    description:
      "Turbine en polymère développée avant 2006 et documentée comme l’un des premiers projets d’ingénierie médicale de DOMTEKNIKA.",
    imageAlt: "Composant médical transparent de turbine à usage unique",
    overview:
      "Les archives disponibles confirment que DOMTEKNIKA a développé cette turbine en polymère avant 2006. Elles ne permettent pas d’établir si l’objectif principal concernait l’usage unique, la réduction des coûts ou une autre exigence technique ; la présentation reste donc limitée au composant, à sa réalisation en polymère et à sa période de développement.",
  },
  "glove-helmet-dryer": {
    category: "Produits",
    title: "Sèche-gants & casque",
    description:
      "Station compacte destinée à évacuer l’humidité des gants et du casque entre deux sessions, documentée par des études CAO et des prototypes physiques.",
    imageAlt: "Prototype de sèche-gants avec gants montés",
    overview:
      "Le projet portait sur une station compacte permettant de sécher la transpiration des gants et du casque entre deux sessions. Les éléments disponibles documentent des études CAO et des prototypes physiques centrés sur les supports, la circulation de l’air et l’intégration compacte de l’ensemble.",
  },
  "folding-umbrella": {
    category: "Produits",
    title: "Parapluie pliant de poche",
    description:
      "Parapluie de poche conçu pour atteindre approximativement le format d’un smartphone une fois replié, avec étude des armatures, des cinématiques et des toiles.",
    imageAlt: "Prototype de parapluie pliant de poche jaune",
    overview:
      "DOMTEKNIKA a travaillé sur l’architecture des armatures et les cinématiques de pliage nécessaires pour obtenir un encombrement proche de celui d’un smartphone, ainsi que sur la recherche de toiles compatibles avec un pliage très compact. Les informations disponibles ne confirmant ni un développement intégral du produit ni l’aboutissement de son industrialisation, la présentation se limite aux travaux d’ingénierie et de recherche matière documentés.",
    relatedPatents: [
      relatedPatent(
        "US2022338602A1",
        "Architecture de structure déployable pour dispositif de protection contre les intempéries et le soleil.",
      ),
      relatedPatent(
        "WO2021043427A1",
        "Architecture de boîtier pour dispositif de protection contre les intempéries.",
      ),
    ],
  },
  "bottom-filling-cup": {
    category: "Autres",
    title: "Gobelet à remplissage par le bas",
    description:
      "Gobelet événementiel doté d’une valve intégrée dans le fond pour accélérer le service à la tireuse tout en limitant la formation de mousse.",
    imageAlt:
      "Étude CAO de deux gobelets à remplissage par le bas avec concepts de valve intégrée",
    overview:
      "Conçu pour les manifestations nécessitant un débit de service élevé, le concept permet d’injecter la bière par le fond du gobelet afin de réduire les turbulences et la formation de mousse. DOMTEKNIKA a défini l’architecture de la valve intégrée pour réunir remplissage rapide, étanchéité et facilité de nettoyage, réalisé les calculs mécaniques et rhéologiques, piloté l’injection des premières séries et mené les essais fonctionnels.",
  },
  "skincare-applicator": {
    category: "Appareils ménagers",
    title: "Applicateur de soin de la peau",
    description:
      "Appareil dermatologique combinant massage physique, application de sérum et exposition lumineuse contrôlée pour stimuler la production de collagène.",
    imageAlt: "Rendu d'un applicateur dermocosmétique blanc",
    overview:
      "Fondé sur un principe développé par un institut de recherche en dermatologie, l'appareil combine massage physique, application de sérum et exposition lumineuse contrôlée afin de stimuler la production de collagène et le rajeunissement cutané. DOMTEKNIKA a développé intégralement l'appareil et son consommable de sérum à usage unique, réalisé des prototypes fonctionnels puis mené, avec l'institut, des essais de performance pour optimiser la formulation du sérum et les longueurs d'onde les plus efficaces.",
    relatedPatents: [
      relatedPatent(
        "US2015360014A1",
        "Système applicateur et capsule directement lié aux recharges dermocosmétiques.",
      ),
      relatedPatent(
        "FR2999439A1",
        "Dispositif de distribution de produit et d'émission lumineuse lié aux concepts cosmétiques.",
      ),
    ],
  },
  "alicoffee-machine": {
    category: "Appareils ménagers",
    title: "Machine à café",
    description:
      "Concept de machine à café basé sur un circuit capsule double passage, où l'eau fait un aller-retour dans la capsule.",
    imageAlt: "Rendu du concept de machine à café de comptoir",
    overview:
      "Ce projet se limite au principe capsule de la machine à café: l'eau ne traverse pas simplement la capsule en ligne droite. Elle effectue un aller-retour dans la capsule, créant un double passage pendant l'extraction.",
  },
  "special-t-machine": {
    category: "Appareils ménagers",
    title: "Machine à thé à capsules",
    description:
      "Machine à thé en capsules optimisée autour de la tête d'extraction, de la qualité d'infusion et de la préparation industrielle.",
    imageAlt: "Prototype d'unité d'extraction pour machine à thé",
    overview:
      "À partir d'un prototype existant de la tête d'extraction, DOMTEKNIKA a amélioré le maintien de la capsule, la cinématique de fermeture, la détection et l'ouverture de la capsule ainsi que l'écoulement du thé en sortie. L'équipe a ensuite participé à l'industrialisation de la tête d'extraction, développé un système limitant l'accumulation de vapeur dans la capsule afin d'améliorer l'infusion, puis contribué à l'industrialisation de plusieurs pièces de la machine.",
    relatedPatents: [
      relatedPatent(
        "US2011061534A1",
        "Dispositif de production de boisson pour machine à capsules de thé, également publié sous WO2009135899.",
      ),
    ],
  },
  "instant-coffee-dispenser": {
    category: "Produits",
    title: "Machine à café soluble",
    description:
      "Machine à café soluble économique conçue pour obtenir un résultat en tasse proche d'un espresso à partir de différents cafés solubles et autres boissons solubles.",
    imageAlt: "Prototype de machine à café soluble manipulé à la main",
    overview:
      "DOMTEKNIKA a développé l'ensemble de la machine, puis mené une première étude d'industrialisation. Son architecture accepte différents cafés et boissons solubles. Pour préparer des cappuccinos sans contaminer la machine, le lait reste entièrement séparé du circuit interne et ne traverse ni les conduites ni les composants. Cette conception limite les résidus et simplifie l'hygiène, le nettoyage et l'entretien. La machine a ensuite été commercialisée pour une grande marque de machines à café.",
    relatedPatents: [
      relatedPatent(
        "EP2000065A1",
        "Chambre de mélange et gestion de flux d'air pour ingrédients solubles.",
      ),
      relatedPatent(
        "US2010173057A1",
        "Méthode et dispositif de production de liquide moussé depuis ingrédients solubles.",
      ),
      relatedPatent(
        "US2009320941A1",
        "Vanne multivoies et logique de dosage pour systèmes solvant/substances solides.",
      ),
    ],
  },
  "kitesurf-safety": {
    category: "Sport",
    title: "Sécurité de kitesurf",
    description: "Sécurités primaires et secondaires en polymère injecté, développées pour améliorer le design, le coût et la fiabilité, avec une attention particulière à l’effort de déclenchement.",
    image: "/assets/projects/kitesurf-safety/shared-01-primary-release.webp",
    imageAlt: "Rendu CAO de la sécurité primaire de kitesurf en polymère noir avec flèche rouge de déclenchement",
    overview: "En 2010–2011, DOMTEKNIKA a développé de nouvelles sécurités de kitesurf pour un client dont les solutions existantes ne répondaient pas aux attentes en matière de design, de coût et de fiabilité. Ces dispositifs permettent à l’utilisateur de libérer la traction de l’aile en cas de vent trop fort, afin de limiter les risques d’être emporté et blessé. Le développement des sécurités primaires et secondaires en polymère injecté s’est concentré sur la force nécessaire à leur déclenchement.",
  },
  "eternal-watch": {
    category: "Horlogerie",
    title: "Montre éternelle",
    description: "Système de remontage du ressort de barillet utilisant les variations de température ambiante, développé à partir d’une idée de DOMTEKNIKA.",
    image: "/assets/projects/eternal-watch/shared-01-watch-render.webp",
    imageAlt: "Rendu de la montre éternelle montrant l’intégration du mécanisme",
    overview: "En 2015, DOMTEKNIKA a développé pour un grand horloger suisse un système issu d’une idée interne, et non d’une demande du client. Le mécanisme utilise les variations de température ambiante pour remonter automatiquement le ressort de barillet et éviter sa détente complète, un enjeu important pour la précision d’une montre mécanique. Le projet a abouti à un prototype fonctionnel et à des essais de performance. Un dépôt provisoire de brevet a été effectué, mais n’a pas été suivi d’un dépôt définitif et n’a jamais été publié.",
  },
  "invisible-gear-train-bridge": {
    category: "Horlogerie",
    title: "Pont de rouage invisible",
    description: "Pont de rouage transparent conçu pour mettre en valeur les rouages, grâce au choix des matériaux et des traitements de surface.",
    image: "/assets/projects/invisible-gear-train-bridge/shared-01-transparent-bridge-front.webp",
    imageAlt: "Pièces du pont de rouage transparent vues de face",
    overview: "En 2011–2012, DOMTEKNIKA a développé un pont de rouage transparent pour un grand horloger suisse. Le projet est né d’une idée interne, et non d’une demande du client : rendre le pont visuellement invisible afin de mettre en valeur les rouages eux-mêmes. Le travail a porté sur la conception et le calcul des pièces, le choix des matériaux et des traitements, ainsi que le pilotage de l’injection des premières pièces.",
    relatedPatents: [
      relatedPatent("CH707437A1", "Composant transparent de mouvement horloger et traitements optiques."),
      relatedPatent("WO2016004540A1", "Méthode optique pour rendre invisible un composant de mouvement horloger."),
    ],
  },
  "clepsydra": {
    category: "Horlogerie",
    title: "Clepsydre",
    description: "Participation au développement d’une clepsydre monumentale, avec un système de retournement motorisé et un prototype à l’échelle 1/2.",
    image: "/assets/projects/clepsydra/shared-01-design-concept.webp",
    imageAlt: "Planche de concept de la clepsydre monumentale",
    overview: "En 2008, DOMTEKNIKA a participé au développement d’une clepsydre monumentale pour un grand horloger suisse, initialement destinée à être exposée à Genève. L’équipe a contribué à la définition du concept, développé et motorisé le système de retournement de la clepsydre, puis participé au prototypage d’une version à l’échelle 1/2 et réalisé des tests fonctionnels.",
  },
  "transparent-clock": {
    category: "Horlogerie",
    title: "Horloge à fond transparent",
    description:
      "Grande horloge de vitrine à fond transparent, sans pivot central visible, avec entraînement périphérique des disques et synchronisation sur l’horloge atomique.",
    imageAlt:
      "Prototype fonctionnel de l’horloge à fond transparent avec mécanisme périphérique",
    overview:
      "Développée pour la vitrine d’un horloger à Genève, cette horloge préserve une vue dégagée à travers son cadran sans laisser apparaître de pivot central pour les aiguilles. DOMTEKNIKA a conçu l’ensemble du système électrique et mécanique à partir de disques transparents entraînés en périphérie, intégré la synchronisation sur l’horloge atomique, piloté l’étude de design et réalisé un prototype fonctionnel utilisant des segments de pignon injectés.",
  },
  "velum-sky-screen": {
    category: "Systèmes du bâtiment",
    title: "Écran escamotable Velum Sky",
    description:
      "Système de levage sur mesure pour l’écran Velum Sky, conçu avec des guides invisibles en position haute et un écran entièrement en porte-à-faux pendant sa descente.",
    imageAlt:
      "Système de levage de l’écran géant de l’amphithéâtre Velum Sky à Genève",
    overview:
      "DOMTEKNIKA a conçu l’ensemble du système mécanique qui monte, descend et positionne l’écran géant de l’amphithéâtre Velum Sky à Genève. Le défi central consistait à rendre les guides invisibles lorsque l’écran est remonté, tout en maîtrisant un écran entièrement en porte-à-faux pendant sa descente. La solution a nécessité un travail précis sur le guidage, la rigidité, le mécanisme de levage et l’intégration au bâtiment.",
  },
};

const DE_PROJECT_OVERRIDES: Record<string, Partial<Project>> = {
  "stajvelo-rv01": {
    category: "Mobilität",
    description:
      "Urbanes E-Bike für STAJVELO, ein Unternehmen aus Monaco, entwickelt rund um gespritzte Strukturbauteile, markante Räder und eine sorgfältige Integration.",
    imageAlt: "STAJVELO RV01 Elektrofahrrad auf einer Rennstrecke",
    overview:
      "DOMTEKNIKA entwickelte für STAJVELO die Polymerarchitektur und die gespritzten Strukturbauteile dieses urbanen E-Bikes, vom ersten Konzept und der Radentwicklung bis zur fertigungsgerechten Produktdefinition.",
  },
  aventor: {
    category: "Mobilität",
    description:
      "Internes Elektrofahrzeugprojekt, von DOMTEKNIKA vollständig elektrisch und mechanisch entwickelt und prototypisiert, bis zur Gründung eines eigenständigen Startups.",
    imageAlt: "Grünes elektrisches Aventor-Fahrzeug auf einer Teststrecke",
    overview:
      "Aventor startete 2012 als internes Projekt und wurde von DOMTEKNIKA vollständig entwickelt und prototypisiert. Die Plattform entstand als Drei- und Vierradversion, von der kompletten elektrischen und mechanischen Architektur bis zu physischen Prototypen, bevor das Projekt in einem eigenständigen Startup weitergeführt wurde.",
  },
  "totalcar-concept": {
    category: "Mobilität",
    description:
      "Dreirädriger Technologiedemonstrator für Hutchinson und die Total-Gruppe, vom Fahrgestell und der Antriebselektronik bis zu den rotationsgeformten Karosserieteilen.",
    imageAlt:
      "Ausgestellter grüner dreirädriger Total Car Technologiedemonstrator",
    overview:
      "Im Auftrag von Hutchinson, damals Teil der Total-Gruppe, entwickelte DOMTEKNIKA einen vollständigen dreirädrigen Technologiedemonstrator. Das Team konstruierte das Fahrgestell, die Antriebselektronik und die rotationsgeformten Karosserieteile.",
  },
  "sam-cree": {
    category: "Mobilität",
    title: "SAM CREE",
    description:
      "Historisches ultraleichtes Elektro-Dreirad, an dem Jean-Luc Thuliez vor der Gründung von DOMTEKNIKA mitwirkte.",
    imageAlt:
      "Orangefarbener elektrischer SAM CREE Dreiradwagen mit geöffnetem Dach",
    overview:
      "Bevor er DOMTEKNIKA gründete, wirkte Jean-Luc Thuliez bei einem anderen Unternehmen am Projekt SAM CREE mit. Das ultraleichte Elektro-Dreirad untersuchte Tandemsitze, einen zentralen Trägerrahmen und kompakte Stadtmobilität - Prinzipien, die später seinen Entwicklungsansatz prägten.",
  },
  "angel-interceptor": {
    category: "Mobilität",
    title: "Angel Interceptor",
    description:
      "Elektrisches Zweiradkonzept, von DOMTEKNIKA vollständig elektrisch und mechanisch entwickelt und prototypisiert.",
    imageAlt: "Studie des elektrischen Zweiradkonzepts Angel Interceptor",
    overview:
      "Angel Interceptor begann um 2008 als internes DOMTEKNIKA-Projekt und umfasste die vollständige elektrische und mechanische Entwicklung sowie den Prototypenbau. Anders als Aventor blieb das Projekt bei DOMTEKNIKA und führte nicht zur Gründung eines separaten Startups.",
  },
  softcar: {
    category: "Mobilität",
    description:
      "Kompakte Hybridfahrzeugplattform mit möglicher vollelektrischer Ausführung, entwickelt durch vollständige elektrische und mechanische Konstruktion und Prototypenbau.",
    imageAlt: "Kompaktes elektrisches Stadtfahrzeug SOFTCAR",
    overview:
      "Die ersten SOFTCAR-Entwürfe stammen aus den Jahren 2006-2007. DOMTEKNIKA verantwortet die vollständige elektrische und mechanische Entwicklung sowie den Prototypenbau, vom internen Projekt bis zur Gründung eines eigenständigen Startups. Die Entwicklung läuft weiter: Die Plattform ist primär als Hybridfahrzeug konzipiert, mit einer möglichen vollelektrischen Ausführung.",
  },
  "folding-bike-scooter": {
    category: "Mobilität",
    title: "Faltfahrrad & Scooter",
    description:
      "Interne Konzepte für Faltfahrräder und Scooter, entwickelt rund um kompakte Mechanismen, alltagstaugliche Ergonomie und ein kleines Transportvolumen.",
    imageAlt: "DOMTEKNIKA Konzept eines faltbaren Elektrofahrrads",
    overview:
      "DOMTEKNIKA untersuchte verschiedene faltbare Mobilitätsarchitekturen – vom Elektrofahrrad bis zum Scooter. Gelenke, Verriegelung, Fahrposition und Komponentenintegration wurden gezielt weiterentwickelt, um kompakte, transportfähige und herstellbare Konzepte zu schaffen.",
  },
  airsmile: {
    category: "Haushaltsprodukte",
    title: "Gerät zur Zahnaufhellung für zu Hause",
    description:
      "Stromloses Gerät zur Zahnaufhellung für zu Hause, inspiriert von professionellen Airflow-Systemen und versorgt durch eine Einweg-Behandlungskartusche.",
    imageAlt: "Gerät zur Zahnaufhellung für zu Hause",
    overview:
      "Das Gerät überträgt das Prinzip der in Zahnarztpraxen verwendeten Airflow-Systeme auf die Anwendung zu Hause und funktioniert ohne Strom. Ein Einweg-Verbrauchsteil liefert die für eine Behandlung erforderlichen Treibgase und Wirkstoffe. DOMTEKNIKA entwickelte das gesamte Produkt, baute funktionsfähige Prototypen, führte Leistungstests durch und bereitete die Industrialisierung vor.",
  },
  "flex-drill": {
    category: "Medizin",
    title: "Flexibler orthopädischer Bohrer",
    description:
      "Flexibles orthopädisches Instrument aus Polymer, das geringes Gewicht, kontrollierte Produktionskosten und medizinische Sterilisationsanforderungen verbindet.",
    imageAlt: "Flexibler orthopädischer Bohrer mit blauem Polymerkörper",
    overview:
      "DOMTEKNIKA konzipierte und entwickelte eine neue Polymerarchitektur für dieses flexible orthopädische Instrument. Das Projekt umfasste Konzeptstudien, die vollständige Entwicklung der ausgewählten Lösung, funktionsfähige Prototypen und eine Produktionskostenanalyse. Das Ergebnis ist eine leichte, industrialisierbare und für die Anforderungen der medizinischen Anwendung geeignete Lösung.",
  },
  "biome-staple-applicator": {
    category: "Medizin",
    title: "Applikationsinstrument für ZipFix-Sternalimplantate",
    description:
      "Einweg-Instrument aus Polymer als Ersatz für eine wiederverwendbare Stahllösung, das Herstellungs- und Wartungskosten sowie Kontaminationsrisiken durch Wiederverwendung reduziert.",
    imageAlt: "Weiß-rotes Applikationsinstrument für ZipFix-Sternalimplantate",
    overview:
      "Das Projekt löste drei zentrale Herausforderungen des wiederverwendbaren Stahlinstruments: hohe Herstellungskosten, langfristigen Wartungsaufwand und Kontaminationsrisiken bei wiederholter Verwendung. DOMTEKNIKA entwickelte eine Einweg-Alternative aus Polymer für die Anwendung von ZipFix-Sternalimplantaten – von der Konzeptstudie und vollständigen Produktentwicklung bis zur Validierung mit funktionsfähigen Prototypen und Betreuung einer ersten Spritzgussserie.",
  },
  "filter-carafe": {
    category: "Haushaltsprodukte",
    title: "Filterkaraffe",
    description:
      "Vollständig entwickelte Filterkaraffe mit einer kostengünstigen Volumenerfassung, die die gefilterte Wassermenge misst und den fälligen Kartuschenwechsel anzeigt.",
    imageAlt: "Konzept einer Filterkaraffe mit Kartuschenzubehör",
    overview:
      "DOMTEKNIKA entwickelte das gesamte Produkt – von der Karaffe und dem Filterzubehör bis zur kostengünstigen Komponente zur Volumenerfassung. Anhand der gefilterten Wassermenge zeigt das System an, wann die Kartusche gewechselt werden muss.",
    relatedPatents: [
      relatedPatent(
        "WO2008017182A1",
        "Qualitätskontrolle für eine Filterkartusche in einem Gefäß für gefiltertes Wasser.",
      ),
      relatedPatent("USD560092S", "Designpatent für die Form der Karaffe."),
      relatedPatent(
        "USD568097S",
        "Designpatent für das Filterzubehör der Karaffe.",
      ),
    ],
  },
  ikitty: {
    category: "Haushaltsprodukte",
    title: "Automatischer Nassfutterspender für Katzen",
    description:
      "Automatischer Nassfutterspender für mehrtägige Abwesenheiten mit Portionskapseln und geruchsgeschützter Abfallverwaltung.",
    imageAlt: "Automatischer Nassfutterspender für Katzen",
    overview:
      "Die Maschine gibt während einer mehrtägigen Abwesenheit des Besitzers automatisch Nassfutter aus und verwaltet zugleich die gebrauchten Portionen, um Futtergerüche einzudämmen. DOMTEKNIKA entwickelte die Kartusche für den ergonomischen Transfer der Kapseln aus ihrer Verpackung in die Maschine und baute einen funktionsfähigen Demonstrator. Das Team verbesserte zudem zentrale Funktionen wie die Verdichtung gebrauchter Kapseln und deren Verpackung in Kartuschen und unterstützte die Digitalisierung des Designs sowie die Integration der Funktionsmodule in das neue Gehäuse.",
  },
  "smart-bottle": {
    category: "Medizin",
    title: "Smart Bottle",
    description:
      "Automatischer, gesicherter Spender für verschreibungspflichtige Flüssigmedikamente, ursprünglich für Morphin entwickelt und auf andere flüssige Arzneimittel übertragbar.",
    imageAlt:
      "Medizinisches Smart-Bottle-Spenderkonzept mit blauem internem Modul",
    overview:
      "Ausgehend vom Konzept und einem funktionsfähigen Prototyp des Kunden verbesserte DOMTEKNIKA zentrale Funktionen, darunter ein Sicherheitssystem zur Neutralisierung des Morphins bei einem Aufbruch der Flasche. Das Team koordinierte das neue Produktdesign, konstruierte sämtliche Teile für die industrielle Fertigung, baute den ersten Prototyp der überarbeiteten Version und begleitete anschließend die ersten Werkzeuge, Spritzgussversuche und die erste Produktionsserie. Das ursprünglich für Morphin entwickelte Ausgabeprinzip lässt sich auf andere flüssige Arzneimittel übertragen.",
  },
  "personal-injector": {
    category: "Medizin",
    title: "Autoinjektor",
    description:
      "Vernetzter Autoinjektor für eine einfache und sichere Selbstmedikation mit verdeckter Nadel und digitaler Dosiserfassung.",
    imageAlt: "Medizinischer Autoinjektor mit verdeckter Nadel",
    overview:
      "Dieser insbesondere für regelmäßige Diabetesbehandlungen konzipierte Autoinjektor hält die Nadel während der gesamten Anwendung außer Sicht und reduziert so die Hemmschwelle für Patienten. DOMTEKNIKA leitete die Industrialisierung und optimierte die Architektur für ein zuverlässiges, robustes und serienreifes Produkt. Die integrierte Dosiserfassung dokumentiert zudem die Therapietreue im Zeitverlauf.",
  },
  "acetabular-reamer-holder": {
    category: "Medizin",
    title: "Acetabulum-Reamer-Halter",
    description:
      "Industrialisierung von PEEK-Komponenten für einen Acetabulum-Reamer-Halter mit mechanischer Validierung, Spritzgussoptimierung und Prozessentwicklung.",
    imageAlt:
      "Zwei orange-schwarze PEEK-Teile für einen Acetabulum-Reamer-Halter",
    overview:
      "DOMTEKNIKA leitete die Industrialisierung zweier PEEK-Komponenten für einen Acetabulum-Reamer-Halter. Finite-Elemente- und rheologische Analysen, Geometrieoptimierung für den Spritzguss, Werkzeugentwicklung und Prozessabstimmung wurden kombiniert, um mechanische Leistung, Präzision und Wiederholbarkeit in der Produktion sicherzustellen.",
  },
  "single-use-turbine": {
    category: "Medizin",
    title: "Single-Use-Turbine",
    description:
      "Vor 2006 entwickelte Polymerturbine, dokumentiert als frühes medizintechnisches Entwicklungsprojekt.",
    imageAlt: "Transparente medizinische Einweg-Turbinenkomponente",
    overview:
      "Die verfügbaren Projektunterlagen bestätigen, dass DOMTEKNIKA diese Turbine vor 2006 aus Polymer entwickelte. Ob das Hauptziel Einmalgebrauch, Kostensenkung oder eine andere technische Anforderung war, geht daraus nicht hervor; die Darstellung beschränkt sich daher auf das Bauteil, seine Polymerkonstruktion und den Entwicklungszeitraum.",
  },
  "glove-helmet-dryer": {
    category: "Produkte",
    title: "Handschuh- & Helmtrockner",
    description:
      "Kompakte Station zum Trocknen von Handschuhen und Helm zwischen zwei Sportsessions, dokumentiert durch CAD-Studien und physische Prototypen.",
    imageAlt: "Prototyp eines Handschuhtrockners mit montierten Handschuhen",
    overview:
      "Das Projekt untersuchte eine kompakte Station, die Feuchtigkeit aus Handschuhen und Helm zwischen aufeinanderfolgenden Läufen entfernt. Die verfügbaren Unterlagen dokumentieren CAD-Entwicklung und physische Prototypen mit Fokus auf Halterungen, Luftführung und kompakte Integration.",
  },
  "folding-umbrella": {
    category: "Produkte",
    title: "Taschen-Regenschirm",
    description:
      "Taschenregenschirm mit annäherndem Smartphone-Format im gefalteten Zustand, entwickelter Gestängekinematik und Recherche geeigneter Gewebe.",
    imageAlt: "Gelber Prototyp eines Taschen-Regenschirms",
    overview:
      "DOMTEKNIKA arbeitete an der Gestängearchitektur und Faltkinematik für ein Packmaß in Smartphone-Größe und untersuchte Gewebe, die sich für eine besonders kompakte Faltung eignen. Da die verfügbaren Informationen weder eine vollständige Produktentwicklung noch eine abgeschlossene Industrialisierung bestätigen, konzentriert sich die Darstellung auf die dokumentierten Konstruktions- und Materialarbeiten.",
  },
  "bottom-filling-cup": {
    category: "Sonstiges",
    title: "Von unten befüllbarer Becher",
    description:
      "Veranstaltungsbecher mit integriertem Bodenventil für schnelleres Zapfen bei gleichzeitig reduzierter Schaumbildung.",
    imageAlt:
      "CAD-Studie zweier von unten befüllbarer Becher mit integrierten Ventilkonzepten",
    overview:
      "Das Konzept wurde für Veranstaltungen mit hohem Ausschankvolumen entwickelt. Das Bier strömt durch den Becherboden ein, wodurch Turbulenzen und Schaumbildung reduziert und der Service beschleunigt werden. DOMTEKNIKA definierte die integrierte Ventilarchitektur für schnelles Befüllen, zuverlässige Dichtheit und einfache Reinigung, führte mechanische und rheologische Berechnungen durch, begleitete den Spritzguss der ersten Serien und realisierte Funktionstests.",
  },
  "skincare-applicator": {
    category: "Haushaltsprodukte",
    title: "Hautpflegegerät",
    description:
      "Dermatologisches Gerät, das physische Massage, Serumauftrag und kontrollierte Lichtbestrahlung zur Anregung der Kollagenproduktion kombiniert.",
    imageAlt: "Dermatologisches Hautpflegegerät",
    overview:
      "Auf Grundlage eines von einem dermatologischen Forschungsinstitut entwickelten Prinzips kombiniert das Gerät physische Massage, Serumauftrag und kontrollierte Lichtbestrahlung, um die Kollagenproduktion anzuregen und die Hautverjüngung zu unterstützen. DOMTEKNIKA entwickelte das komplette Gerät und das Einweg-Verbrauchsteil mit Serum, baute funktionsfähige Prototypen und führte gemeinsam mit dem Institut Leistungstests durch, um die Serumformulierung und die wirksamsten Wellenlängen zu optimieren.",
  },
  "alicoffee-machine": {
    category: "Haushaltsprodukte",
    title: "Kaffeemaschine",
    description:
      "Kaffeemaschinenkonzept mit doppeltem Kapselkreislauf, bei dem Wasser in der Kapsel hin und zurück geführt wird.",
    imageAlt: "Rendering des Kaffeemaschinenkonzepts",
    overview:
      "Dieses Projekt beschränkt sich auf das Kapselprinzip der Kaffeemaschine: Das Wasser fließt nicht einfach gerade durch die Kapsel, sondern folgt innen einem Hin-und-zurück-Weg mit doppeltem Durchlauf bei der Extraktion.",
  },
  "special-t-machine": {
    category: "Haushaltsprodukte",
    title: "Kapsel-Teemaschine",
    description:
      "Kapsel-Teemaschine, optimiert rund um die Mechanik des Extraktionskopfs, die Aufgussqualität und die Industrialisierung.",
    imageAlt: "Prototyp der Brüheinheit für eine Teemaschine",
    overview:
      "Ausgehend von einem bestehenden Prototyp des Extraktionskopfs verbesserte DOMTEKNIKA die Kapselhalterung, die Schließkinematik, die Erkennung und Öffnung der Kapsel sowie den Teefluss am Auslass. Anschließend unterstützte das Team die Industrialisierung des Extraktionskopfs, entwickelte ein System gegen Dampfansammlung in der Kapsel zur Verbesserung des Aufgusses und wirkte an der Industrialisierung mehrerer Maschinenkomponenten mit.",
    relatedPatents: [
      relatedPatent(
        "US2011061534A1",
        "Getränkezubereitungsvorrichtung für eine Teekapselmaschine, auch als WO2009135899 veröffentlicht.",
      ),
    ],
  },
  "instant-coffee-dispenser": {
    category: "Haushaltsprodukte",
    title: "Instantkaffeemaschine",
    description:
      "Kostengünstige Instantkaffeemaschine für ein espressoähnliches Ergebnis mit unterschiedlichen löslichen Kaffees und weiteren löslichen Getränken.",
    imageAlt: "Prototyp einer Instantkaffeemaschine mit Handinteraktion",
    overview:
      "DOMTEKNIKA entwickelte die komplette Maschine und führte eine erste Industrialisierungsstudie durch. Die Architektur verarbeitet unterschiedliche lösliche Kaffees und weitere lösliche Getränke. Für die Zubereitung von Cappuccino bleibt die Milch vollständig vom internen Kreislauf getrennt und gelangt weder in Leitungen noch in interne Komponenten. Dadurch werden Verunreinigungen und Rückstände vermieden sowie Hygiene, Reinigung und Wartung vereinfacht. Anschliessend wurde die Maschine für eine grosse Kaffeemaschinenmarke auf den Markt gebracht.",
  },
  "kitesurf-safety": {
    category: "Sport & Outdoor",
    title: "Kitesurf-Sicherheitssysteme",
    description: "Primäre und sekundäre Auslösesysteme aus spritzgegossenem Polymer zur Verbesserung von Design, Kosten und Zuverlässigkeit, mit besonderem Augenmerk auf die Auslösekraft.",
    image: "/assets/projects/kitesurf-safety/shared-01-primary-release.webp",
    imageAlt: "CAD-Darstellung der primären Kitesurf-Sicherheitsauslösung aus schwarzem Polymer mit rotem Auslösepfeil",
    overview: "2010–2011 entwickelte DOMTEKNIKA neue Kitesurf-Sicherheitssysteme für einen Kunden, dessen bestehende Lösungen die Anforderungen an Design, Kosten und Zuverlässigkeit nicht erfüllten. Die Systeme ermöglichen es, bei starkem Wind den Zug des Kites zu lösen und so das Risiko des Abhebens und von Verletzungen zu verringern. Bei der Entwicklung der primären und sekundären Auslösesysteme aus spritzgegossenem Polymer stand die erforderliche Auslösekraft im Mittelpunkt.",
  },
  "eternal-watch": {
    category: "Uhrenindustrie",
    title: "Ewige Uhr",
    description: "Aufzugssystem für die Zugfeder, das Schwankungen der Umgebungstemperatur nutzt und auf einer eigenen Idee von DOMTEKNIKA beruht.",
    image: "/assets/projects/eternal-watch/shared-01-watch-render.webp",
    imageAlt: "Darstellung der ewigen Uhr mit integriertem Mechanismus",
    overview: "2015 entwickelte DOMTEKNIKA für einen grossen Schweizer Uhrenhersteller ein System auf Basis einer eigenen Idee, nicht einer Kundenanfrage. Der Mechanismus nutzt Schwankungen der Umgebungstemperatur, um die Zugfeder automatisch aufzuziehen und ihre vollständige Entspannung zu verhindern – ein wichtiger Aspekt für die Ganggenauigkeit mechanischer Uhren. Das Projekt umfasste einen Funktionsprototyp und Leistungstests. Eine vorläufige Patentanmeldung wurde eingereicht, jedoch nicht durch eine endgültige Anmeldung weitergeführt und nie veröffentlicht.",
  },
  "invisible-gear-train-bridge": {
    category: "Uhrenindustrie",
    title: "Unsichtbare Räderwerksbrücke",
    description: "Transparente Räderwerksbrücke, die durch gezielte Materialwahl und Oberflächenbehandlungen die Zahnräder sichtbar hervorhebt.",
    image: "/assets/projects/invisible-gear-train-bridge/shared-01-transparent-bridge-front.webp",
    imageAlt: "Vorderansicht der transparenten Komponenten der Räderwerksbrücke",
    overview: "2011–2012 entwickelte DOMTEKNIKA für einen grossen Schweizer Uhrenhersteller eine transparente Räderwerksbrücke. Ausgangspunkt war eine eigene Idee, nicht eine Kundenanfrage: Die Brücke sollte optisch unsichtbar werden, um die Zahnräder selbst hervorzuheben. Die Arbeiten umfassten Konstruktion und Berechnung der Bauteile, Auswahl der Materialien und Behandlungen sowie die Betreuung des Spritzgusses der ersten Teile.",
    relatedPatents: [
      relatedPatent("CH707437A1", "Transparente Uhrwerkskomponente und optische Behandlungen."),
      relatedPatent("WO2016004540A1", "Optisches Verfahren, um eine Uhrwerkskomponente unsichtbar zu machen."),
    ],
  },
  "clepsydra": {
    category: "Uhrenindustrie",
    title: "Klepsydra",
    description: "Mitwirkung an einer monumentalen Wasseruhr mit motorisiertem Wendemechanismus und einem Prototyp im Massstab 1:2.",
    image: "/assets/projects/clepsydra/shared-01-design-concept.webp",
    imageAlt: "Konzeptdarstellung der monumentalen Wasseruhr",
    overview: "2008 wirkte DOMTEKNIKA an der Entwicklung einer monumentalen Wasseruhr für einen grossen Schweizer Uhrenhersteller mit, die ursprünglich in Genf ausgestellt werden sollte. Das Team beteiligte sich an der Konzeptdefinition, entwickelte und motorisierte den Wendemechanismus, wirkte am Bau eines Prototyps im Massstab 1:2 mit und führte Funktionstests durch.",
  },
  "transparent-clock": {
    category: "Uhrmacherei",
    title: "Transparente Schaufensteruhr",
    description:
      "Große Schaufensteruhr mit transparentem Zifferblatt, ohne sichtbare zentrale Zeigerachse, mit peripherem Scheibenantrieb und Atomuhr-Synchronisation.",
    imageAlt:
      "Funktionsprototyp der transparenten Schaufensteruhr mit peripherem Mechanismus",
    overview:
      "Die Uhr wurde für das Schaufenster eines Genfer Uhrengeschäfts entwickelt und ermöglicht einen freien Durchblick ohne sichtbare zentrale Zeigerachse. DOMTEKNIKA entwickelte das vollständige elektrische und mechanische Konzept mit transparenten, am Umfang angetriebenen Scheiben, integrierte die Synchronisation mit der Atomuhr, koordinierte die Designstudie und baute einen Funktionsprototyp mit spritzgegossenen Zahnsegmenten.",
  },
  "velum-sky-screen": {
    category: "Gebäudetechnik",
    title: "Versenkbare Leinwand Velum Sky",
    description:
      "Massgeschneidertes Hebesystem für die Velum-Sky-Leinwand mit in oberer Position unsichtbaren Führungen und vollständig auskragender Leinwand während des Absenkens.",
    imageAlt: "Hebesystem der Grossleinwand im Velum-Sky-Auditorium in Genf",
    overview:
      "DOMTEKNIKA entwickelte das komplette mechanische System zum Heben, Senken und Positionieren der Grossleinwand im Velum-Sky-Auditorium in Genf. Die zentrale Herausforderung bestand darin, die Führungen in oberer Position unsichtbar zu halten und zugleich die beim Absenken vollständig auskragende Leinwand zu beherrschen. Dafür mussten Führung, Steifigkeit, Antrieb und Gebäudeintegration präzise aufeinander abgestimmt werden.",
  },
};

const ES_PROJECT_OVERRIDES: Record<string, Partial<Project>> = {
  "stajvelo-rv01": {
    category: "Movilidad",
    description:
      "Bicicleta eléctrica urbana desarrollada para STAJVELO, empresa monegasca, en torno a componentes estructurales inyectados, ruedas distintivas y una integración cuidada.",
    imageAlt: "Bicicleta eléctrica STAJVELO RV01 en circuito",
    overview:
      "DOMTEKNIKA desarrolló para STAJVELO la arquitectura polimérica y los componentes estructurales inyectados de esta bicicleta eléctrica urbana, desde el concepto inicial y la ingeniería de las ruedas hasta la definición industrializable del producto.",
  },
  aventor: {
    category: "Movilidad",
    description:
      "Proyecto interno de vehículo eléctrico diseñado y prototipado íntegramente por DOMTEKNIKA, desde la arquitectura eléctrica y mecánica hasta la creación de una startup independiente.",
    imageAlt: "Vehículo eléctrico Aventor verde en circuito",
    overview:
      "Iniciado en 2012, Aventor fue diseñado y prototipado íntegramente por DOMTEKNIKA como proyecto interno. La plataforma se desarrolló en versiones de tres y cuatro ruedas, desde la arquitectura eléctrica y mecánica completa hasta los prototipos físicos, antes de continuar en una startup independiente.",
  },
  "totalcar-concept": {
    category: "Movilidad",
    description:
      "Demostrador tecnológico de tres ruedas desarrollado para Hutchinson y el grupo Total, desde el chasis y la electrónica de propulsión hasta las piezas de carrocería rotomoldeadas.",
    imageAlt:
      "Demostrador tecnológico verde de tres ruedas Total Car en exposición",
    overview:
      "Por encargo de Hutchinson, entonces parte del grupo Total, DOMTEKNIKA desarrolló un demostrador tecnológico completo de tres ruedas. El equipo diseñó el chasis, la electrónica de propulsión y las piezas de carrocería rotomoldeadas.",
  },
  "sam-cree": {
    category: "Movilidad",
    title: "SAM CREE",
    description:
      "Histórico triciclo eléctrico ultraligero en el que Jean-Luc Thuliez participó antes de fundar DOMTEKNIKA.",
    imageAlt: "Triciclo eléctrico naranja SAM CREE con techo abierto",
    overview:
      "Antes de fundar DOMTEKNIKA, Jean-Luc Thuliez participó en el proyecto SAM CREE dentro de otra empresa. El triciclo eléctrico ultraligero exploraba asientos en tándem, un chasis de viga central y movilidad urbana compacta, principios que más tarde marcarían su enfoque de ingeniería.",
  },
  "angel-interceptor": {
    category: "Movilidad",
    title: "Angel Interceptor",
    description:
      "Concepto eléctrico de dos ruedas diseñado y prototipado íntegramente por DOMTEKNIKA, incluyendo todo el desarrollo eléctrico y mecánico.",
    imageAlt: "Estudio del concepto eléctrico de dos ruedas Angel Interceptor",
    overview:
      "Angel Interceptor comenzó alrededor de 2008 como proyecto interno de DOMTEKNIKA. El equipo realizó el diseño eléctrico y mecánico completo, además de los prototipos. A diferencia de Aventor, el proyecto permaneció dentro de DOMTEKNIKA y no dio lugar a una startup independiente.",
  },
  softcar: {
    category: "Movilidad",
    description:
      "Plataforma compacta de vehículo híbrido, con posibilidad de configuración 100 % eléctrica, desarrollada mediante diseño eléctrico y mecánico completo y prototipado.",
    imageAlt: "Concepto SOFTCAR de vehículo urbano híbrido compacto",
    overview:
      "Los primeros diseños de SOFTCAR se remontan a 2006-2007. DOMTEKNIKA se encargó del desarrollo eléctrico y mecánico completo y de los prototipos, desde el proyecto interno hasta la creación de una startup independiente. El desarrollo continúa: la plataforma se concibe ante todo como vehículo híbrido, con una posible versión 100 % eléctrica.",
  },
  "folding-bike-scooter": {
    category: "Movilidad",
    title: "Bicicleta y scooter plegables",
    description:
      "Conceptos internos de bicicleta y scooter plegables, desarrollados en torno a mecanismos compactos, ergonomía de uso y un volumen reducido para el transporte.",
    imageAlt: "Concepto DOMTEKNIKA de bicicleta eléctrica plegable",
    overview:
      "DOMTEKNIKA estudió distintas arquitecturas de movilidad plegable, desde bicicletas eléctricas hasta scooters, trabajando las bisagras, el bloqueo, la posición de conducción y la integración de componentes para obtener conceptos compactos, transportables y fabricables.",
  },
  airsmile: {
    category: "Productos para el hogar",
    title: "Dispositivo de blanqueamiento dental doméstico",
    description:
      "Dispositivo doméstico de blanqueamiento dental sin electricidad, inspirado en los sistemas Airflow profesionales y alimentado por un consumible de un solo uso.",
    imageAlt: "Dispositivo doméstico de blanqueamiento dental",
    overview:
      "Diseñado para trasladar al hogar el principio de los sistemas Airflow utilizados en las clínicas dentales, el dispositivo funciona sin electricidad. Un consumible de un solo uso aporta los gases propulsores y los agentes activos necesarios para un tratamiento. DOMTEKNIKA desarrolló el producto completo, fabricó prototipos funcionales, realizó ensayos de rendimiento y preparó su industrialización.",
  },
  "flex-drill": {
    category: "Médico",
    title: "Broca ortopédica flexible",
    description:
      "Instrumento ortopédico flexible de polímero que combina ligereza, costes de producción controlados y compatibilidad con la esterilización médica.",
    imageAlt: "Broca ortopédica flexible con cuerpo de polímero azul",
    overview:
      "DOMTEKNIKA diseñó y desarrolló una nueva arquitectura de polímero para este instrumento ortopédico flexible. El proyecto abarcó la investigación de conceptos, el desarrollo completo de la solución elegida, prototipos funcionales y el análisis de costes de producción, dando lugar a un dispositivo ligero, industrializable y adaptado a las exigencias del uso médico.",
  },
  "biome-staple-applicator": {
    category: "Médico",
    title: "Instrumento de aplicación de implantes esternales ZipFix",
    description:
      "Instrumento de polímero de un solo uso que sustituye una solución reutilizable de acero, reduciendo los costes de fabricación y mantenimiento y los riesgos de contaminación por reutilización.",
    imageAlt:
      "Instrumento blanco y rojo para aplicar implantes esternales ZipFix",
    overview:
      "El proyecto resolvió tres retos principales del instrumento reutilizable de acero: su elevado coste de fabricación, el mantenimiento a largo plazo y los riesgos de contaminación asociados a usos sucesivos. DOMTEKNIKA desarrolló una alternativa de polímero de un solo uso para aplicar implantes esternales ZipFix, desde la investigación de conceptos y el desarrollo completo hasta la validación mediante prototipos funcionales y la gestión de una primera serie inyectada.",
  },
  "filter-carafe": {
    category: "Productos",
    title: "Jarra filtrante",
    description:
      "Sistema de jarra filtrante desarrollado íntegramente, con un dispositivo económico que mide el volumen de agua filtrada e indica cuándo debe sustituirse el cartucho.",
    imageAlt: "Concepto de jarra filtrante con accesorios de cartucho",
    overview:
      "DOMTEKNIKA desarrolló el producto completo, desde la jarra y el accesorio filtrante hasta el componente económico de medición de volumen. Al contabilizar el agua filtrada, el sistema indica al usuario cuándo debe cambiar el cartucho.",
    relatedPatents: [
      relatedPatent(
        "WO2008017182A1",
        "Método y dispositivo de control de calidad para un cartucho de filtración integrado en una jarra filtrante.",
      ),
      relatedPatent("USD560092S", "Patente de diseño de la forma de la jarra."),
      relatedPatent(
        "USD568097S",
        "Patente de diseño del accesorio filtrante de la jarra.",
      ),
    ],
  },
  ikitty: {
    category: "Productos para el hogar",
    title: "Dispensador automático de comida húmeda para gatos",
    description:
      "Dispensador automático de comida húmeda para ausencias de varios días, con cápsulas porcionadas y gestión de residuos para limitar los olores.",
    imageAlt: "Dispensador automático de comida húmeda para gatos",
    overview:
      "Diseñada para dispensar automáticamente comida húmeda durante ausencias de varios días, la máquina también gestiona las porciones usadas para contener los olores. DOMTEKNIKA desarrolló el cartucho que transfiere ergonómicamente las cápsulas desde su embalaje hasta la máquina y construyó un demostrador funcional. El equipo también mejoró funciones clave, como la compactación de las cápsulas usadas y su envasado en cartuchos, y participó en la digitalización del diseño y la integración de los módulos funcionales en la nueva carcasa.",
  },
  "smart-bottle": {
    category: "Médico",
    title: "Smart Bottle",
    description:
      "Dispensador automático y seguro de medicamentos líquidos sujetos a prescripción, desarrollado originalmente para morfina y adaptable a otros tratamientos líquidos.",
    imageAlt:
      "Concepto de dispensador médico Smart Bottle con módulo interno azul",
    overview:
      "A partir del concepto y del prototipo funcional aportados por el cliente, DOMTEKNIKA mejoró funciones clave, entre ellas un sistema de seguridad diseñado para neutralizar la morfina si se forzaba la botella. El equipo coordinó el nuevo diseño, desarrolló todas las piezas para fabricación industrial, construyó el primer prototipo de la versión revisada y gestionó los primeros moldes, las pruebas de inyección y la primera serie de producción. El principio de dispensación, creado inicialmente para morfina, puede adaptarse a otros medicamentos líquidos.",
  },
  "personal-injector": {
    category: "Médico",
    title: "Autoinyector",
    description:
      "Autoinyector conectado diseñado para simplificar y asegurar la administración autónoma del tratamiento, con aguja oculta y seguimiento digital de dosis.",
    imageAlt: "Autoinyector médico diseñado para ocultar la aguja",
    overview:
      "Pensado especialmente para tratamientos regulares de la diabetes, este autoinyector mantiene la aguja fuera de la vista durante todo el uso para reducir la aprensión del paciente. DOMTEKNIKA dirigió la industrialización del dispositivo, optimizando su arquitectura para obtener un producto fiable, robusto y apto para la producción en serie. El seguimiento integrado de dosis también permite documentar la regularidad del tratamiento.",
  },
  "acetabular-reamer-holder": {
    category: "Médico",
    title: "Soporte de fresa acetabular",
    description:
      "Industrialización de componentes de PEEK para un soporte de fresa acetabular, con validación mecánica, optimización para inyección y desarrollo del proceso.",
    imageAlt:
      "Dos piezas naranjas y negras de PEEK para un soporte de fresa acetabular",
    overview:
      "DOMTEKNIKA dirigió la industrialización de dos componentes de PEEK para un soporte de fresa acetabular. El desarrollo combinó análisis por elementos finitos y simulaciones reológicas, optimización de geometrías para inyección, desarrollo de moldes y puesta a punto del proceso para garantizar rendimiento mecánico, precisión y repetibilidad en producción.",
  },
  "single-use-turbine": {
    category: "Médico",
    title: "Turbina de un solo uso",
    description:
      "Turbina de polímero desarrollada antes de 2006 y documentada como uno de los primeros proyectos de ingeniería médica de DOMTEKNIKA.",
    imageAlt: "Componente médico transparente de turbina de un solo uso",
    overview:
      "El archivo disponible confirma que DOMTEKNIKA desarrolló esta turbina en polímero antes de 2006. No permite determinar si el objetivo principal era el uso único, la reducción de costes u otro requisito técnico; por ello, la presentación se limita al componente, su construcción en polímero y el periodo de desarrollo.",
  },
  "glove-helmet-dryer": {
    category: "Productos",
    title: "Secador de guantes y casco",
    description:
      "Estación compacta diseñada para eliminar la humedad de los guantes y el casco entre dos sesiones deportivas, documentada mediante estudios CAD y prototipos físicos.",
    imageAlt: "Prototipo de secador de guantes con guantes montados",
    overview:
      "El proyecto estudió una estación compacta destinada a secar la transpiración de los guantes y el casco entre sesiones sucesivas. El material disponible documenta el desarrollo CAD y prototipos físicos centrados en los soportes, la circulación del aire y la integración compacta.",
  },
  "folding-umbrella": {
    category: "Productos",
    title: "Paraguas plegable de bolsillo",
    description:
      "Paraguas de bolsillo diseñado para alcanzar aproximadamente el tamaño de un smartphone al plegarse, con cinemática de varillas y estudio de tejidos adecuados.",
    imageAlt: "Prototipo amarillo de paraguas plegable de bolsillo",
    overview:
      "DOMTEKNIKA trabajó en la arquitectura de las varillas y en la cinemática de plegado necesarias para lograr un volumen similar al de un smartphone, y evaluó tejidos compatibles con un plegado muy compacto. Como la información disponible no confirma ni el desarrollo integral del producto ni la finalización de su industrialización, la presentación se centra en la ingeniería y la investigación de materiales documentadas.",
  },
  "bottom-filling-cup": {
    category: "Otros",
    title: "Vaso de llenado por la base",
    description:
      "Vaso para eventos con una válvula integrada en la base que acelera el servicio desde el grifo de cerveza y limita la formación de espuma.",
    imageAlt:
      "Estudio CAD de dos vasos de llenado por la base con conceptos de válvula integrada",
    overview:
      "Diseñado para eventos que requieren un alto caudal de servicio, el concepto introduce la cerveza por la base del vaso para reducir las turbulencias y la formación de espuma. DOMTEKNIKA definió la arquitectura de la válvula integrada para combinar llenado rápido, estanqueidad y facilidad de limpieza, realizó cálculos mecánicos y reológicos, supervisó la inyección de las primeras series y llevó a cabo ensayos funcionales.",
  },
  "skincare-applicator": {
    category: "Productos para el hogar",
    title: "Aplicador para el cuidado de la piel",
    description:
      "Dispositivo dermatológico que combina masaje físico, aplicación de sérum y exposición luminosa controlada para estimular la producción de colágeno.",
    imageAlt: "Dispositivo dermatológico para el cuidado de la piel",
    overview:
      "Basado en un principio desarrollado por un instituto de investigación dermatológica, el dispositivo combina masaje físico, aplicación de sérum y exposición luminosa controlada para estimular la producción de colágeno y favorecer el rejuvenecimiento de la piel. DOMTEKNIKA desarrolló íntegramente el dispositivo y su consumible de sérum de un solo uso, fabricó prototipos funcionales y, junto con el instituto, realizó ensayos de rendimiento para optimizar la formulación del sérum y las longitudes de onda más eficaces.",
  },
  "alicoffee-machine": {
    category: "Productos",
    title: "Máquina de café",
    description:
      "Concepto de máquina de café basado en un circuito de cápsula de doble paso, donde el agua hace ida y vuelta dentro de la cápsula.",
    imageAlt: "Render del concepto de máquina de café",
    overview:
      "Este proyecto se limita al principio de cápsula de la máquina de café: el agua no atraviesa simplemente la cápsula en línea recta, sino que realiza un recorrido de ida y vuelta dentro de ella durante la extracción.",
  },
  "special-t-machine": {
    category: "Productos para el hogar",
    title: "Máquina de té en cápsulas",
    description:
      "Máquina de té en cápsulas optimizada en torno a la mecánica del cabezal de extracción, la calidad de la infusión y la preparación industrial.",
    imageAlt: "Prototipo del cabezal de extracción de una máquina de té",
    overview:
      "Partiendo de un prototipo existente del cabezal de extracción, DOMTEKNIKA mejoró la retención de la cápsula, la cinemática de cierre, la detección y apertura de la cápsula y el flujo del té a la salida. El equipo apoyó después la industrialización del cabezal, desarrolló un sistema que evita la acumulación de vapor dentro de la cápsula para mejorar la infusión y contribuyó a industrializar varios componentes de la máquina.",
    relatedPatents: [
      relatedPatent(
        "US2011061534A1",
        "Dispositivo de producción de bebida para máquina de cápsulas de té, publicado también como WO2009135899.",
      ),
    ],
  },
  "instant-coffee-dispenser": {
    category: "Productos",
    title: "Máquina de café soluble",
    description:
      "Máquina de café soluble de bajo coste diseñada para ofrecer un resultado similar al espresso con distintos cafés y otras bebidas solubles.",
    imageAlt: "Prototipo de máquina de café soluble con interacción manual",
    overview:
      "DOMTEKNIKA desarrolló íntegramente la máquina y realizó un primer estudio de industrialización. Su arquitectura admite distintos cafés solubles y otras bebidas solubles. Para preparar capuchinos sin contaminar la máquina, la leche se mantiene totalmente separada del circuito interno y no pasa por sus conductos ni componentes. Este diseño limita la acumulación de residuos y simplifica la higiene, la limpieza y el mantenimiento. Posteriormente, la máquina se comercializó para una importante marca de máquinas de café.",
  },
  "kitesurf-safety": {
    category: "Deporte y exterior",
    title: "Seguridad de kitesurf",
    description: "Sistemas de seguridad primarios y secundarios en polímero inyectado, desarrollados para mejorar el diseño, el coste y la fiabilidad, con especial atención a la fuerza de activación.",
    image: "/assets/projects/kitesurf-safety/shared-01-primary-release.webp",
    imageAlt: "Render CAD del sistema de seguridad primario de kitesurf en polímero negro con flecha roja de activación",
    overview: "En 2010–2011, DOMTEKNIKA desarrolló nuevos sistemas de seguridad de kitesurf para un cliente cuyas soluciones existentes no cumplían sus expectativas de diseño, coste y fiabilidad. Estos dispositivos permiten liberar la tracción de la cometa con viento fuerte para reducir el riesgo de que el usuario sea levantado y sufra lesiones. El desarrollo de los sistemas primarios y secundarios en polímero inyectado se centró en la fuerza necesaria para activarlos.",
  },
  "eternal-watch": {
    category: "Relojería",
    title: "Reloj eterno",
    description: "Sistema de remontaje del muelle real mediante variaciones de temperatura ambiente, desarrollado a partir de una idea propia de DOMTEKNIKA.",
    image: "/assets/projects/eternal-watch/shared-01-watch-render.webp",
    imageAlt: "Render del reloj eterno que muestra la integración de su mecanismo",
    overview: "En 2015, DOMTEKNIKA desarrolló para un gran fabricante suizo de relojes un sistema nacido de una idea interna, no de una solicitud del cliente. El mecanismo utiliza las variaciones de temperatura ambiente para dar cuerda automáticamente al muelle real y evitar que se destense por completo, un aspecto importante para la precisión de los relojes mecánicos. El proyecto incluyó un prototipo funcional y pruebas de rendimiento. Se presentó una solicitud provisional de patente, pero no se continuó con una solicitud definitiva y nunca se publicó.",
  },
  "invisible-gear-train-bridge": {
    category: "Relojería",
    title: "Puente de rodaje invisible",
    description: "Puente de rodaje transparente diseñado para destacar los engranajes mediante la selección de materiales y tratamientos superficiales.",
    image: "/assets/projects/invisible-gear-train-bridge/shared-01-transparent-bridge-front.webp",
    imageAlt: "Vista frontal de las piezas del puente de rodaje transparente",
    overview: "En 2011–2012, DOMTEKNIKA desarrolló un puente de rodaje transparente para un gran fabricante suizo de relojes. El proyecto nació de una idea interna, no de una solicitud del cliente: hacer el puente visualmente invisible para destacar los propios engranajes. El trabajo abarcó el diseño y cálculo de las piezas, la selección de materiales y tratamientos, y la supervisión de la inyección de las primeras piezas.",
    relatedPatents: [
      relatedPatent("CH707437A1", "Componente transparente de un movimiento relojero y tratamientos ópticos."),
      relatedPatent("WO2016004540A1", "Método óptico para hacer invisible un componente del movimiento de un reloj."),
    ],
  },
  "clepsydra": {
    category: "Relojería",
    title: "Clepsidra",
    description: "Participación en el desarrollo de una clepsidra monumental, con un mecanismo de volteo motorizado y un prototipo a escala 1:2.",
    image: "/assets/projects/clepsydra/shared-01-design-concept.webp",
    imageAlt: "Lámina conceptual de la clepsidra monumental",
    overview: "En 2008, DOMTEKNIKA participó en el desarrollo de una clepsidra monumental para un gran fabricante suizo de relojes, destinada inicialmente a exponerse en Ginebra. El equipo contribuyó a definir el concepto, desarrolló y motorizó el sistema de volteo, participó en la construcción de un prototipo a escala 1:2 y realizó pruebas funcionales.",
  },
  "transparent-clock": {
    category: "Relojería",
    title: "Reloj de escaparate transparente",
    description:
      "Gran reloj de escaparate con fondo transparente, sin eje central visible, accionamiento periférico de los discos y sincronización con reloj atómico.",
    imageAlt:
      "Prototipo funcional del reloj de escaparate transparente con mecanismo periférico",
    overview:
      "Desarrollado para el escaparate de una relojería de Ginebra, el reloj mantiene una vista despejada a través de la esfera sin mostrar un eje central para las agujas. DOMTEKNIKA desarrolló el concepto eléctrico y mecánico completo mediante discos transparentes accionados en la periferia, integró la sincronización con reloj atómico, coordinó el estudio de diseño y construyó un prototipo funcional con segmentos de engranaje inyectados.",
  },
  "velum-sky-screen": {
    category: "Sistemas para edificios",
    title: "Pantalla retráctil Velum Sky",
    description:
      "Sistema de elevación a medida para la pantalla Velum Sky, con guías invisibles en posición elevada y la pantalla totalmente en voladizo durante el descenso.",
    imageAlt:
      "Sistema de elevación de la pantalla gigante del auditorio Velum Sky de Ginebra",
    overview:
      "DOMTEKNIKA diseñó todo el sistema mecánico que eleva, desciende y posiciona la pantalla gigante del auditorio Velum Sky de Ginebra. El reto central consistía en mantener las guías invisibles en la posición elevada y, al mismo tiempo, controlar una pantalla totalmente en voladizo durante su descenso, lo que exigió un trabajo preciso de guiado, rigidez, accionamiento e integración en el edificio.",
  },
};

const KO_PROJECT_OVERRIDES: Record<string, Partial<Project>> = {
  "stajvelo-rv01": {
    category: "모빌리티",
    description:
      "모나코 기업 STAJVELO를 위해 개발한 도심형 전기자전거로, 사출 구조 부품과 독창적인 휠, 정교한 통합 설계를 중심으로 완성했습니다.",
    imageAlt: "도로 서킷 위의 STAJVELO RV01 전기자전거",
    overview:
      "DOMTEKNIKA는 STAJVELO를 위해 이 도심형 전기자전거의 폴리머 아키텍처와 사출 구조 부품을 개발했으며, 초기 콘셉트와 휠 엔지니어링부터 양산 가능한 제품 정의까지 수행했습니다.",
  },
  aventor: {
    category: "모빌리티",
    description:
      "DOMTEKNIKA가 전기·기계 아키텍처부터 전용 스타트업 설립 단계까지 전 과정을 설계하고 시제품으로 구현한 사내 전기차 프로젝트입니다.",
    imageAlt: "트랙 위의 초록색 Aventor 전기차",
    overview:
      "Aventor는 2012년에 시작된 DOMTEKNIKA의 사내 프로젝트입니다. 전기·기계 설계와 실제 시제품 제작을 모두 수행했으며, 세 바퀴와 네 바퀴 버전을 개발한 뒤 별도의 스타트업으로 이어졌습니다.",
  },
  "totalcar-concept": {
    category: "모빌리티",
    description:
      "Hutchinson과 Total 그룹을 위해 개발한 3륜 기술 실증 차량으로, 섀시와 구동 전자장치부터 회전성형 차체 부품까지 포함합니다.",
    imageAlt: "전시된 녹색 Total Car 3륜 기술 실증 차량",
    overview:
      "당시 Total 그룹에 속해 있던 Hutchinson의 의뢰로 DOMTEKNIKA는 3륜 기술 실증 차량을 완전 개발했습니다. 팀은 섀시, 구동 전자장치, 회전성형 차체 부품을 설계했습니다.",
  },
  "sam-cree": {
    category: "모빌리티",
    title: "SAM CREE",
    description:
      "Jean-Luc Thuliez가 DOMTEKNIKA 설립 전 다른 회사에서 개발에 참여한 역사적인 초경량 전기 삼륜차입니다.",
    imageAlt: "캐노피가 열린 주황색 SAM CREE 전기 삼륜차",
    overview:
      "DOMTEKNIKA를 설립하기 전, Jean-Luc Thuliez는 다른 회사에서 SAM CREE 프로젝트 개발에 참여했습니다. 이 초경량 전기 삼륜차는 탠덤 좌석, 중앙 빔 섀시, 컴팩트한 도심 이동성을 탐구했으며, 이러한 원칙은 훗날 그의 엔지니어링 접근법으로 이어졌습니다.",
  },
  "angel-interceptor": {
    category: "모빌리티",
    title: "Angel Interceptor",
    description:
      "DOMTEKNIKA가 전기·기계 설계부터 시제품까지 전 과정을 개발한 전기 이륜 콘셉트입니다.",
    imageAlt: "Angel Interceptor 전기 이륜 콘셉트 연구",
    overview:
      "Angel Interceptor는 약 2008년에 시작된 DOMTEKNIKA의 사내 전기 이륜 프로젝트입니다. 팀이 전기·기계 설계와 시제품 제작을 모두 담당했으며, Aventor와 달리 별도의 스타트업으로 분리되지는 않았습니다.",
  },
  softcar: {
    category: "모빌리티",
    description:
      "완전 전기 구성이 가능한 하이브리드 도심 차량 플랫폼으로, 전기·기계 설계와 시제품 제작을 전 과정 수행했습니다.",
    imageAlt: "SOFTCAR 소형 하이브리드 도심 차량 콘셉트",
    overview:
      "SOFTCAR의 초기 디자인은 2006~2007년으로 거슬러 올라갑니다. DOMTEKNIKA는 사내 프로젝트에서 별도 스타트업 설립까지 전기·기계 개발과 시제품 제작을 전담했습니다. 프로젝트는 아직 진행 중이며, 기본적으로 하이브리드 차량으로 설계되었지만 100% 전기 버전도 가능합니다.",
  },
  "folding-bike-scooter": {
    category: "모빌리티",
    title: "접이식 자전거와 스쿠터",
    description:
      "컴팩트한 메커니즘, 사용 편의성, 작은 운반 부피를 중심으로 개발한 사내 접이식 자전거 및 스쿠터 콘셉트입니다.",
    imageAlt: "DOMTEKNIKA 접이식 전기자전거 콘셉트",
    overview:
      "DOMTEKNIKA는 전기자전거부터 스쿠터까지 다양한 접이식 모빌리티 구조를 연구했습니다. 힌지, 잠금장치, 주행 자세, 부품 통합을 다듬어 컴팩트하고 운반이 쉬우며 제작 가능한 콘셉트를 개발했습니다.",
  },
  airsmile: {
    category: "생활용품",
    title: "가정용 치아 미백기",
    description:
      "전문 Airflow 시스템의 원리를 적용하고 일회용 치료 카트리지로 작동하는 무전원 가정용 치아 미백기입니다.",
    imageAlt: "가정용 치아 미백기",
    overview:
      "치과에서 사용하는 Airflow 장비의 원리를 가정에서 구현하도록 설계된 무전원 장치입니다. 일회용 소모품이 한 번의 치료에 필요한 추진 가스와 활성 성분을 공급합니다. DOMTEKNIKA는 제품 전체를 개발하고 기능성 프로토타입 제작, 성능 시험, 양산 준비까지 수행했습니다.",
  },
  "flex-drill": {
    category: "의료",
    title: "유연형 정형외과 드릴",
    description:
      "경량 구조, 생산 비용 관리, 의료용 멸균 요건을 결합한 유연형 폴리머 정형외과 기구입니다.",
    imageAlt: "파란색 폴리머 몸체의 유연형 정형외과 드릴",
    overview:
      "DOMTEKNIKA는 이 유연형 정형외과 기구를 위한 새로운 폴리머 구조를 설계하고 개발했습니다. 콘셉트 연구, 선정 솔루션의 전체 개발, 기능성 프로토타입 제작과 생산 비용 분석을 통해 가볍고 산업화가 가능하며 의료 환경의 제약에 적합한 기기를 완성했습니다.",
  },
  "biome-staple-applicator": {
    category: "의료",
    title: "ZipFix 흉골 임플란트 적용 기구",
    description:
      "재사용 강철 기구를 대체해 제조·유지보수 비용과 반복 사용에 따른 오염 위험을 줄이는 일회용 폴리머 기구입니다.",
    imageAlt: "흰색과 빨간색 ZipFix 흉골 임플란트 적용 기구",
    overview:
      "이 프로젝트는 재사용 강철 기구의 높은 제조 비용, 장기 유지보수 부담, 반복 사용에 따른 오염 위험이라는 세 가지 과제를 해결했습니다. DOMTEKNIKA는 ZipFix 흉골 임플란트 적용을 위한 일회용 폴리머 대안을 개발했으며, 콘셉트 연구와 전체 제품 개발부터 기능성 프로토타입 검증 및 첫 사출 생산 시리즈 관리까지 수행했습니다.",
  },
  "filter-carafe": {
    category: "제품",
    title: "필터 카라프",
    description:
      "제품 전체를 개발한 정수 카라프 시스템으로, 저비용 용량 계측 장치가 정수된 물의 양을 측정해 필터 교체 시점을 알려줍니다.",
    imageAlt: "필터 카트리지 액세서리가 포함된 정수 카라프 콘셉트",
    overview:
      "DOMTEKNIKA는 카라프와 필터 액세서리부터 저비용 용량 계측 부품까지 제품 전체를 개발했습니다. 정수된 물의 양을 추적해 사용자에게 카트리지 교체 시점을 알려줍니다.",
    relatedPatents: [
      relatedPatent(
        "WO2008017182A1",
        "정수 용기에 통합된 필터 카트리지 품질 관리 방법과 장치.",
      ),
      relatedPatent("USD560092S", "카라프 형태에 관한 디자인 특허."),
      relatedPatent("USD568097S", "카라프 필터 액세서리에 관한 디자인 특허."),
    ],
  },
  ikitty: {
    category: "생활용품",
    title: "고양이 습식 사료 자동 급여기",
    description:
      "며칠간 집을 비울 때 사용할 수 있도록 정량 캡슐과 냄새를 억제하는 폐기물 관리 기능을 갖춘 습식 사료 자동 급여기입니다.",
    imageAlt: "고양이 습식 사료 자동 급여기",
    overview:
      "보호자가 며칠 동안 집을 비운 상황에서도 습식 사료를 자동으로 급여하고, 사용한 포션을 관리해 음식 냄새가 퍼지는 것을 줄이도록 설계했습니다. DOMTEKNIKA는 캡슐을 포장에서 기기로 편리하게 옮기는 카트리지를 개발하고 기능성 시제품을 제작했습니다. 또한 사용한 캡슐의 압축과 카트리지 패키징을 개선하고, 제품 디자인의 디지털화와 기능 모듈의 새 하우징 통합에 참여했습니다.",
  },
  "smart-bottle": {
    category: "의료",
    title: "Smart Bottle",
    description:
      "처방에 따라 액상 의약품을 자동으로 안전하게 공급하며, 원래 모르핀용으로 개발되어 다른 액상 치료제로 확장할 수 있는 디스펜서입니다.",
    imageAlt: "파란색 내부 모듈이 있는 Smart Bottle 의료 디스펜서 콘셉트",
    overview:
      "고객이 제공한 콘셉트와 기능성 프로토타입을 바탕으로 DOMTEKNIKA는 병이 강제로 개봉될 경우 모르핀을 중화하도록 설계한 안전 기능을 포함해 핵심 기능을 개선했습니다. 팀은 새로운 제품 디자인을 주도하고 모든 부품을 산업 생산에 맞게 설계했으며, 개선 버전의 첫 프로토타입 제작부터 초기 금형, 사출 성형 시험, 첫 생산 시리즈까지 관리했습니다. 모르핀용으로 개발된 공급 원리는 다른 액상 의약품에도 적용할 수 있습니다.",
  },
  "personal-injector": {
    category: "의료",
    title: "자동 주사기",
    description:
      "숨겨진 바늘과 디지털 투여량 기록으로 안전하고 간편한 자가 투약을 지원하는 연결형 자동 주사기입니다.",
    imageAlt: "바늘이 보이지 않도록 설계된 의료용 자동 주사기",
    overview:
      "정기적인 당뇨병 치료를 위해 설계된 이 자동 주사기는 사용 중 바늘이 보이지 않아 환자의 불안을 줄여 줍니다. DOMTEKNIKA는 신뢰성과 내구성을 갖춘 양산 제품을 목표로 기기 구조를 최적화하고 산업화를 주도했습니다. 통합 투여량 기록 기능은 시간에 따른 치료 규칙성도 확인할 수 있게 합니다.",
  },
  "acetabular-reamer-holder": {
    category: "의료",
    title: "비구 리머 홀더",
    description:
      "기계 검증, 사출 최적화, 공정 개발을 결합한 비구 리머 홀더용 PEEK 부품 산업화 프로젝트입니다.",
    imageAlt: "비구 리머 홀더용 오렌지와 검정색 PEEK 부품 2개",
    overview:
      "DOMTEKNIKA는 비구 리머 홀더용 PEEK 부품 2개의 산업화를 주도했습니다. 유한요소 및 유동 해석, 사출 성형을 위한 형상 최적화, 금형 개발과 공정 조정을 결합해 양산 시 기계적 성능, 정밀도와 반복성을 확보했습니다.",
  },
  "single-use-turbine": {
    category: "의료",
    title: "일회용 터빈",
    description:
      "2006년 이전에 개발된 폴리머 터빈으로, 초기 의료기기 엔지니어링 프로젝트 중 하나로 기록되어 있습니다.",
    imageAlt: "투명한 일회용 의료 터빈 부품",
    overview:
      "현재 남아 있는 프로젝트 자료는 DOMTEKNIKA가 2006년 이전에 이 터빈을 폴리머로 개발했다는 사실을 확인해 줍니다. 주된 목표가 일회용 구현, 비용 절감 또는 다른 기술 요구였는지는 확인되지 않으므로, 이 소개는 부품 자체와 폴리머 구조, 개발 시기에 한정합니다.",
  },
  "glove-helmet-dryer": {
    category: "제품",
    title: "장갑 및 헬멧 건조기",
    description:
      "스포츠 활동 사이에 장갑과 헬멧의 습기를 제거하도록 설계하고 CAD 연구와 물리 프로토타입으로 기록한 컴팩트 건조 스테이션입니다.",
    imageAlt: "장갑이 장착된 장갑 건조기 프로토타입",
    overview:
      "이 프로젝트는 연속된 스포츠 활동 사이에 장갑과 헬멧의 땀과 습기를 건조하는 컴팩트 스테이션을 검토했습니다. 남아 있는 자료에는 장비 지지 구조, 공기 흐름, 컴팩트한 통합을 중심으로 한 CAD 개발과 물리 프로토타입이 기록되어 있습니다.",
  },
  "folding-umbrella": {
    category: "제품",
    title: "포켓 접이식 우산",
    description:
      "접었을 때 스마트폰과 비슷한 크기를 목표로 프레임 접힘 운동학과 적합한 원단을 연구한 포켓 우산입니다.",
    imageAlt: "노란색 포켓 접이식 우산 프로토타입",
    overview:
      "DOMTEKNIKA는 접었을 때 스마트폰 수준의 크기를 구현하기 위한 프레임 구조와 접힘 운동학을 개발하고, 매우 컴팩트한 접힘에 적합한 원단을 검토했습니다. 현재 자료로는 제품 전체 개발이나 산업화 완료 여부를 확인할 수 없으므로, 이 소개는 문서로 확인되는 엔지니어링과 소재 연구에 집중합니다.",
  },
  "bottom-filling-cup": {
    category: "기타",
    title: "하부 충전 컵",
    description:
      "바닥에 통합된 밸브를 통해 맥주를 더 빠르게 따르면서 거품 발생을 줄이는 행사용 컵입니다.",
    imageAlt: "통합 밸브 콘셉트를 적용한 하부 충전 컵 2종의 CAD 연구",
    overview:
      "많은 음료를 빠르게 제공해야 하는 행사를 위해, 맥주를 컵 바닥으로 주입해 난류와 거품을 줄이고 서비스 속도를 높이도록 설계했습니다. DOMTEKNIKA는 빠른 충전, 안정적인 밀폐와 간편한 세척을 결합한 통합 밸브 구조를 정의하고, 기계 및 유동 해석을 수행했으며, 초기 생산분의 사출 성형을 관리하고 기능 시험을 진행했습니다.",
  },
  "skincare-applicator": {
    category: "생활용품",
    title: "스킨케어 기기",
    description:
      "물리적 마사지, 세럼 도포, 제어된 광 노출을 결합해 콜라겐 생성을 촉진하는 피부과 연구 기반 기기입니다.",
    imageAlt: "피부과 연구 기반 스킨케어 기기",
    overview:
      "피부과 연구기관이 개발한 원리를 바탕으로 물리적 마사지, 세럼 도포, 제어된 광 노출을 결합해 콜라겐 생성을 촉진하고 피부 회복을 돕습니다. DOMTEKNIKA는 기기 전체와 일회용 세럼 소모품을 개발하고 기능성 프로토타입을 제작했으며, 연구기관과 함께 성능 시험을 진행해 세럼 조성과 가장 효과적인 노출 파장을 최적화했습니다.",
  },
  "alicoffee-machine": {
    category: "제품",
    title: "커피 머신",
    description:
      "캡슐 안에서 물이 왕복 경로를 만드는 이중 통과 캡슐 회로 기반의 커피 머신 콘셉트.",
    imageAlt: "커피 머신 콘셉트 렌더",
    overview:
      "이 프로젝트는 커피 머신의 캡슐 원리에만 초점을 둡니다. 물은 캡슐을 직선으로 통과하는 대신 내부에서 왕복하며, 추출 중 두 번 지나가는 흐름을 만듭니다.",
  },
  "special-t-machine": {
    category: "생활용품",
    title: "캡슐 티 머신",
    description:
      "추출 헤드 메커니즘, 차 추출 품질, 양산 준비를 중심으로 개선한 캡슐 티 머신입니다.",
    imageAlt: "캡슐 티 머신 추출 헤드 프로토타입",
    overview:
      "기존 추출 헤드 프로토타입을 바탕으로 캡슐 고정, 닫힘 기구, 캡슐 감지와 개봉, 차 배출 흐름을 개선했습니다. 이후 추출 헤드의 산업화를 지원하고, 캡슐 내부의 증기 축적을 방지해 추출 품질을 높이는 시스템을 개발했으며, 여러 기계 부품의 양산화에도 참여했습니다.",
    relatedPatents: [
      relatedPatent(
        "US2011061534A1",
        "차 캡슐 머신용 음료 제조 장치로, WO2009135899로도 공개되었습니다.",
      ),
    ],
  },
  "instant-coffee-dispenser": {
    category: "제품",
    title: "인스턴트 커피 머신",
    description:
      "다양한 인스턴트 커피와 기타 용해성 음료로 에스프레소에 가까운 맛을 구현하도록 설계한 저비용 커피 머신.",
    imageAlt: "손으로 조작하는 인스턴트 커피 머신 프로토타입",
    overview:
      "DOMTEKNIKA는 머신 전체를 개발하고 초기 양산화 검토까지 수행했습니다. 다양한 인스턴트 커피와 기타 용해성 음료를 사용할 수 있습니다. 카푸치노를 만들 때 우유가 기계 내부 회로와 완전히 분리되어 배관이나 내부 부품을 통과하지 않도록 설계했습니다. 이를 통해 오염과 잔류물 축적을 줄이고 위생 관리, 세척 및 유지보수를 간소화했습니다. 이후 이 제품은 주요 커피머신 브랜드를 위해 상용화되었습니다.",
  },
  "kitesurf-safety": {
    category: "스포츠·아웃도어",
    title: "카이트서핑 안전장치",
    description: "디자인, 비용, 신뢰성을 개선하기 위해 개발한 사출 성형 폴리머 1차·2차 안전장치로, 작동에 필요한 힘에 중점을 두었습니다.",
    image: "/assets/projects/kitesurf-safety/shared-01-primary-release.webp",
    imageAlt: "빨간 작동 화살표가 있는 검은색 폴리머 카이트서핑 1차 안전장치의 CAD 렌더링",
    overview: "2010–2011년 DOMTEKNIKA는 기존 제품의 디자인, 비용, 신뢰성에 만족하지 못한 고객을 위해 새로운 카이트서핑 안전장치를 개발했습니다. 이 장치는 강풍에서 카이트의 견인력을 해제하여 사용자가 공중으로 끌려 올라가 다칠 위험을 줄입니다. 사출 성형 폴리머로 제작한 1차·2차 안전장치의 개발은 사용자가 장치를 작동하는 데 필요한 힘에 초점을 맞췄습니다.",
  },
  "eternal-watch": {
    category: "시계 제조",
    title: "영원한 시계",
    description: "DOMTEKNIKA의 자체 아이디어에서 출발한, 주변 온도 변화를 이용해 태엽을 감는 시스템입니다.",
    image: "/assets/projects/eternal-watch/shared-01-watch-render.webp",
    imageAlt: "메커니즘의 배치를 보여주는 영원한 시계 렌더링",
    overview: "2015년 DOMTEKNIKA는 고객의 요청이 아닌 자체 아이디어를 바탕으로 스위스의 주요 시계 제조사를 위한 시스템을 개발했습니다. 이 메커니즘은 주변 온도 변화를 이용해 태엽을 자동으로 감아 완전히 풀리지 않도록 하며, 이는 기계식 시계의 정확도에 중요한 요소입니다. 작동 시제품을 제작하고 성능 시험을 수행했습니다. 임시 특허 출원은 이루어졌으나 정식 출원으로 이어지지 않았으며 공개되지 않았습니다.",
  },
  "invisible-gear-train-bridge": {
    category: "시계 제조",
    title: "보이지 않는 기어 트레인 브리지",
    description: "소재와 표면 처리를 선정하여 기어 자체가 돋보이도록 설계한 투명 기어 트레인 브리지입니다.",
    image: "/assets/projects/invisible-gear-train-bridge/shared-01-transparent-bridge-front.webp",
    imageAlt: "투명 기어 트레인 브리지 부품의 정면 모습",
    overview: "2011–2012년 DOMTEKNIKA는 스위스의 주요 시계 제조사를 위해 투명 기어 트레인 브리지를 개발했습니다. 고객 요청이 아닌 자체 아이디어에서 출발한 이 프로젝트는 브리지를 시각적으로 보이지 않게 하여 기어 자체를 돋보이게 하는 것을 목표로 했습니다. 부품 설계와 계산, 소재 및 처리 방법 선정, 초기 부품의 사출 성형 관리를 수행했습니다.",
    relatedPatents: [
      relatedPatent("CH707437A1", "투명 시계 무브먼트 부품 및 광학 처리."),
      relatedPatent("WO2016004540A1", "시계 무브먼트 부품을 보이지 않게 하는 광학적 방법."),
    ],
  },
  "clepsydra": {
    category: "시계 제조",
    title: "클렙시드라",
    description: "전동 반전 장치와 1/2 축척 시제품을 포함한 대형 물시계 개발에 참여했습니다.",
    image: "/assets/projects/clepsydra/shared-01-design-concept.webp",
    imageAlt: "대형 물시계의 콘셉트 보드",
    overview: "2008년 DOMTEKNIKA는 스위스의 주요 시계 제조사를 위한 대형 물시계 개발에 참여했습니다. 이 물시계는 원래 제네바에 전시될 예정이었습니다. 팀은 개념 정의에 참여하고 물시계 반전 장치를 개발·전동화했으며, 1/2 축척 시제품 제작에 참여하고 기능 시험을 수행했습니다.",
  },
  "transparent-clock": {
    category: "시계 제작",
    title: "투명 쇼윈도 시계",
    description:
      "투명한 시계면과 보이지 않는 중앙 바늘축, 원주 구동 디스크, 원자시계 동기화를 갖춘 대형 쇼윈도 시계입니다.",
    imageAlt: "원주 구동 메커니즘을 적용한 투명 쇼윈도 시계 기능성 프로토타입",
    overview:
      "제네바 시계 매장의 쇼윈도를 위해 개발한 이 시계는 중앙 바늘축을 노출하지 않고 시계면을 통해 뒤쪽이 보이도록 설계했습니다. DOMTEKNIKA는 원주에서 구동되는 투명 회전 디스크를 이용해 전체 전기·기계 콘셉트를 개발하고, 원자시계 동기화를 통합했으며, 디자인 연구를 주도하고 사출 성형 기어 세그먼트를 사용한 기능성 프로토타입을 제작했습니다.",
  },
  "velum-sky-screen": {
    category: "건축 시스템",
    title: "Velum Sky 대형 스크린 승강 시스템",
    description:
      "상부 위치에서는 가이드가 보이지 않고 하강 중에는 스크린 전체가 캔틸레버 상태를 유지하도록 설계한 Velum Sky 맞춤형 승강 시스템입니다.",
    imageAlt: "제네바 Velum Sky 강당의 대형 스크린 승강 시스템",
    overview:
      "DOMTEKNIKA는 제네바 Velum Sky 강당의 대형 스크린을 올리고 내리며 정확히 위치시키는 전체 기계 시스템을 설계했습니다. 핵심 과제는 상부 위치에서 가이드를 보이지 않게 유지하면서 하강 중 완전히 캔틸레버 상태인 스크린을 제어하는 것이었으며, 이를 위해 가이드, 강성, 구동과 건축물 통합을 정밀하게 설계했습니다.",
  },
};

const ZH_PROJECT_OVERRIDES: Record<string, Partial<Project>> = {
  "stajvelo-rv01": {
    category: "出行",
    description:
      "为摩纳哥企业 STAJVELO 开发的城市电动自行车，采用注塑结构件、独特车轮与精细的一体化设计。",
    imageAlt: "赛道上的 STAJVELO RV01 电动自行车",
    overview:
      "DOMTEKNIKA 为 STAJVELO 开发了这款城市电动自行车的聚合物架构与注塑结构件，涵盖初始概念、车轮工程及面向量产的产品定义。",
  },
  aventor: {
    category: "出行",
    description:
      "Aventor 是 DOMTEKNIKA 的内部电动车项目，从电气与机械架构到样机均由团队完整设计开发，并最终推动成立独立初创公司。",
    imageAlt: "赛道上的绿色 Aventor 电动车",
    overview:
      "Aventor 始于 2012 年。DOMTEKNIKA 完成了全部电气与机械设计和实体样机，并开发了三轮与四轮版本，之后项目延伸为一家独立初创公司。",
  },
  "totalcar-concept": {
    category: "出行",
    description:
      "为 Hutchinson 与 Total 集团开发的三轮技术验证车，涵盖底盘、驱动电子系统和滚塑车身部件。",
    imageAlt: "展出的绿色 Total Car 三轮技术验证车",
    overview:
      "应当时隶属于 Total 集团的 Hutchinson 委托，DOMTEKNIKA 完整开发了一款三轮技术验证车。团队负责底盘、驱动电子系统和滚塑车身部件的设计。",
  },
  "sam-cree": {
    category: "出行",
    title: "SAM CREE",
    description:
      "Jean-Luc Thuliez 在创立 DOMTEKNIKA 之前，于另一家公司参与开发的历史性超轻型电动三轮车。",
    imageAlt: "打开车顶的橙色 SAM CREE 电动三轮车",
    overview:
      "在创立 DOMTEKNIKA 之前，Jean-Luc Thuliez 曾在另一家公司参与 SAM CREE 项目。这款超轻型电动三轮车探索了串列座椅、中央梁底盘和紧凑型城市出行，这些原则后来影响了他的工程方法。",
  },
  "angel-interceptor": {
    category: "出行",
    title: "Angel Interceptor",
    description:
      "由 DOMTEKNIKA 完成全部电气、机械设计与样机开发的电动两轮概念。",
    imageAlt: "Angel Interceptor 电动两轮概念研究",
    overview:
      "Angel Interceptor 是约在 2008 年启动的 DOMTEKNIKA 内部电动两轮项目。团队负责完整的电气、机械设计与样机制作；与 Aventor 不同，该项目没有成立独立初创公司。",
  },
  softcar: {
    category: "出行",
    description:
      "可扩展为纯电配置的混合动力城市车辆平台，由 DOMTEKNIKA 完成全部电气、机械设计与样机开发。",
    imageAlt: "SOFTCAR 紧凑型混合动力城市车辆概念",
    overview:
      "SOFTCAR 的首批设计可追溯至 2006 至 2007 年。DOMTEKNIKA 从内部项目阶段到独立初创公司成立，负责完整的电气、机械开发与样机制作。项目至今仍在推进，核心定位是混合动力车辆，同时可提供 100% 纯电方案。",
  },
  "folding-bike-scooter": {
    category: "出行",
    title: "折叠自行车与滑板车",
    description:
      "围绕紧凑机构、使用舒适性和更小运输体积开发的内部折叠自行车与滑板车概念。",
    imageAlt: "DOMTEKNIKA 折叠电动自行车概念",
    overview:
      "DOMTEKNIKA 研究了从电动自行车到滑板车的多种折叠出行架构，并围绕铰链、锁止机构、骑行姿态和部件集成进行优化，以形成紧凑、便携且可制造的概念方案。",
  },
  airsmile: {
    category: "家居用品",
    title: "家用牙齿美白器",
    description:
      "无需用电的家用牙齿美白设备，借鉴专业 Airflow 系统，并通过一次性护理耗材提供所需介质。",
    imageAlt: "家用牙齿美白器",
    overview:
      "该设备将牙科诊所 Airflow 系统的原理带入家庭使用场景，并且无需用电。一次性耗材为单次护理提供所需的推进气体和活性成分。DOMTEKNIKA 完成了整机开发、功能原型制作、性能测试和量产准备。",
  },
  "flex-drill": {
    category: "医疗",
    title: "柔性骨科钻具",
    description: "柔性聚合物骨科器械，兼顾轻量化、可控生产成本和医疗灭菌要求。",
    imageAlt: "带蓝色聚合物主体的柔性骨科钻具",
    overview:
      "DOMTEKNIKA 为这款柔性骨科器械设计并开发了全新的聚合物架构。项目涵盖概念研究、选定方案的完整开发、功能原型制作和生产成本分析，最终形成轻量、可工业化并适应医疗使用要求的产品。",
  },
  "biome-staple-applicator": {
    category: "医疗",
    title: "ZipFix 胸骨植入物施用器械",
    description:
      "用于替代可重复使用钢制方案的一次性聚合物器械，可降低制造与维护成本，并减少重复使用带来的污染风险。",
    imageAlt: "白红色 ZipFix 胸骨植入物施用器械",
    overview:
      "该项目解决了可重复使用钢制器械的三项关键问题：制造成本高、长期维护负担重，以及连续使用所带来的污染风险。DOMTEKNIKA 为 ZipFix 胸骨植入物施用开发了一次性聚合物替代方案，涵盖概念研究、完整产品开发、功能原型验证和首批注塑生产管理。",
  },
  "filter-carafe": {
    category: "产品",
    title: "滤水壶",
    description:
      "完整开发的滤水壶系统，通过低成本计量装置统计过滤水量，并提示用户何时更换滤芯。",
    imageAlt: "带滤芯附件的滤水壶概念",
    overview:
      "DOMTEKNIKA 完成了从壶体、过滤附件到低成本水量计量部件的整套产品开发。系统通过累计过滤水量，提示用户何时更换滤芯。",
    relatedPatents: [
      relatedPatent(
        "WO2008017182A1",
        "用于滤水容器中滤芯质量控制的方法和装置。",
      ),
      relatedPatent("USD560092S", "覆盖滤水壶外形的设计专利。"),
      relatedPatent("USD568097S", "覆盖滤水壶过滤附件的设计专利。"),
    ],
  },
  ikitty: {
    category: "家居用品",
    title: "猫用湿粮自动喂食器",
    description:
      "面向主人离家数日场景的湿粮自动喂食器，采用定量胶囊并配备抑制异味的废弃物管理系统。",
    imageAlt: "猫用湿粮自动喂食器",
    overview:
      "该设备可在主人离家数日时自动投放湿粮，并管理使用后的份量容器以抑制食物异味。DOMTEKNIKA 开发了可将胶囊从包装中便捷转移至机器的料盒，并制作了功能样机。团队还改进了使用后胶囊的压缩与料盒包装，并参与产品设计数字化以及功能模块在新外壳中的集成。",
  },
  "smart-bottle": {
    category: "医疗",
    title: "Smart Bottle",
    description:
      "按处方自动、安全分配液体药物的装置，最初为吗啡开发，也可适配其他液体药物。",
    imageAlt: "带蓝色内部模块的 Smart Bottle 医疗分配器概念",
    overview:
      "以客户提供的概念和功能原型为基础，DOMTEKNIKA 改进了多项关键功能，其中包括在瓶体被强行破坏时中和吗啡的安全系统。团队统筹了新产品设计，完成全部零件的工业化设计，制作改进版本的首个原型，并跟进首批模具、注塑试制及首批量产。该分配原理虽最初为吗啡开发，也可适配其他液体药物。",
  },
  "personal-injector": {
    category: "医疗",
    title: "自动注射器",
    description:
      "连接型自动注射器，通过隐藏针头和数字剂量记录，让患者更简单、安全地自行完成治疗。",
    imageAlt: "隐藏针头设计的医疗自动注射器",
    overview:
      "这款自动注射器尤其适用于需要规律治疗的糖尿病患者，在整个使用过程中将针头保持在视线之外，从而减轻患者的不安。DOMTEKNIKA 主导设备工业化并优化其架构，使产品具备可靠性、耐用性和批量生产能力。集成式剂量记录功能还可持续记录治疗规律性。",
  },
  "acetabular-reamer-holder": {
    category: "医疗",
    title: "髋臼铰刀支架",
    description:
      "髋臼铰刀支架 PEEK 部件的工业化，涵盖机械验证、注塑优化和工艺开发。",
    imageAlt: "髋臼铰刀支架的两个橙黑色 PEEK 零件",
    overview:
      "DOMTEKNIKA 主导了髋臼铰刀支架两个 PEEK 部件的工业化。项目结合有限元与流变分析、注塑几何优化、模具开发和工艺调试，确保批量生产中的机械性能、精度和重复性。",
  },
  "single-use-turbine": {
    category: "医疗",
    title: "一次性涡轮",
    description: "2006 年以前开发的聚合物涡轮，记录为早期医疗器械工程项目。",
    imageAlt: "透明一次性医疗涡轮部件",
    overview:
      "现有项目档案确认 DOMTEKNIKA 在 2006 年以前以聚合物开发了这款涡轮。档案无法证明其首要目标是一次性使用、降低成本或其他技术要求，因此本页仅介绍该部件、其聚合物结构及开发时期。",
  },
  "glove-helmet-dryer": {
    category: "产品",
    title: "手套与头盔烘干器",
    description: "用于在两次运动之间去除手套和头盔湿气的紧凑工作站，并通过 CAD 研究和实体原型加以记录。",
    imageAlt: "装有手套的手套烘干器原型",
    overview:
      "该项目探索了一种紧凑工作站，用于在连续运动之间烘干手套和头盔中的汗液与湿气。现有资料记录了围绕装备支撑、气流组织和紧凑集成开展的 CAD 开发与实体原型。",
  },
  "folding-umbrella": {
    category: "产品",
    title: "口袋折叠伞",
    description:
      "折叠后接近智能手机尺寸的口袋伞，涵盖伞架折叠运动学设计及适用面料研究。",
    imageAlt: "黄色口袋折叠伞原型",
    overview:
      "DOMTEKNIKA 研究了折叠后实现智能手机级收纳尺寸所需的伞架结构与折叠运动学，并评估了适合高度紧凑折叠的面料。现有资料无法确认产品是否完成全部开发或工业化，因此本页聚焦于已有记录支持的工程与材料研究。",
  },
  "bottom-filling-cup": {
    category: "其他",
    title: "底部灌装杯",
    description:
      "面向活动场景的杯体，通过集成于底部的阀门加快啤酒灌装，同时减少泡沫形成。",
    imageAlt: "两款带集成阀门方案的底部灌装杯 CAD 研究",
    overview:
      "该概念面向需要高流量快速出杯的活动场景，让啤酒从杯底进入，从而减少湍流和泡沫并提高服务速度。DOMTEKNIKA 定义了兼顾快速灌装、可靠密封与便捷清洗的一体化阀门架构，完成机械与流变计算，跟进首批产品的注塑生产，并开展功能测试。",
  },
  "skincare-applicator": {
    category: "家居用品",
    title: "皮肤护理仪",
    description:
      "结合物理按摩、精华液涂抹和可控光照，以促进胶原蛋白生成的皮肤科研设备。",
    imageAlt: "皮肤科研护理设备",
    overview:
      "该设备基于皮肤科研机构开发的原理，将物理按摩、精华液涂抹和可控光照结合，以促进胶原蛋白生成并改善皮肤状态。DOMTEKNIKA 完成了整机及一次性精华液耗材的开发，制作了功能原型，并与研究机构共同开展性能测试，以优化精华液配方和最有效的照射波长。",
  },
  "alicoffee-machine": {
    category: "产品",
    title: "咖啡机",
    description: "咖啡机概念，基于双通道胶囊回路，水在胶囊内形成往返路径。",
    imageAlt: "咖啡机概念渲染图",
    overview:
      "该项目只围绕咖啡机的胶囊原理：水并非直线穿过胶囊，而是在胶囊内部往返流动，在萃取过程中形成双通道。",
  },
  "special-t-machine": {
    category: "家居用品",
    title: "胶囊茶饮机",
    description: "围绕萃取头机构、茶汤品质和量产准备进行优化的胶囊茶饮机。",
    imageAlt: "胶囊茶饮机萃取头原型",
    overview:
      "基于已有的萃取头原型，DOMTEKNIKA 改进了胶囊固定、闭合运动、胶囊检测与开启以及茶汤出口流动。随后团队支持萃取头工业化，开发了防止蒸汽在胶囊内积聚的系统以改善冲泡效果，并参与多项机器零件的量产导入。",
    relatedPatents: [
      relatedPatent(
        "US2011061534A1",
        "茶胶囊机饮品制备装置，也以 WO2009135899 公开。",
      ),
    ],
  },
  "instant-coffee-dispenser": {
    category: "产品",
    title: "速溶咖啡机",
    description:
      "面向多种速溶咖啡和其他速溶饮品的低成本咖啡机，旨在实现接近意式浓缩咖啡的杯中效果。",
    imageAlt: "带手部交互的速溶咖啡机原型",
    overview:
      "DOMTEKNIKA 完成了整机开发，并开展了首轮工业化研究。该架构兼容多种速溶咖啡和其他速溶饮品。制作卡布奇诺时，牛奶与机器内部回路完全隔离，不会流经管路或内部部件，从而减少污染与残留，并简化卫生管理、清洁和维护。该机器随后面向一家大型咖啡机品牌实现商业化。",
  },
  "kitesurf-safety": {
    category: "运动与户外",
    title: "风筝冲浪安全装置",
    description: "采用注塑聚合物制造的一级和二级安全释放装置，旨在改善设计、成本和可靠性，并特别关注触发所需的力量。",
    image: "/assets/projects/kitesurf-safety/shared-01-primary-release.webp",
    imageAlt: "带红色触发箭头的黑色聚合物风筝冲浪一级安全装置CAD效果图",
    overview: "2010–2011年，DOMTEKNIKA为一位对现有方案的设计、成本和可靠性不满意的客户开发了新的风筝冲浪安全装置。这些装置让使用者在强风中释放风筝牵引力，降低被带离地面和受伤的风险。一级和二级注塑聚合物安全装置的开发重点是使用者触发装置所需的力量。",
  },
  "eternal-watch": {
    category: "制表",
    title: "永恒腕表",
    description: "源于DOMTEKNIKA自主创意，利用环境温度变化为发条自动上弦的系统。",
    image: "/assets/projects/eternal-watch/shared-01-watch-render.webp",
    imageAlt: "展示机构集成方式的永恒腕表效果图",
    overview: "2015年，DOMTEKNIKA基于自主提出的创意，而非客户需求，为一家大型瑞士制表商开发了该系统。机构利用环境温度变化为发条自动上弦，避免其完全松弛，这对机械腕表的走时精度十分重要。项目完成了功能原型和性能测试。曾提交临时专利申请，但未继续提交正式申请，因此从未公开。",
  },
  "invisible-gear-train-bridge": {
    category: "制表",
    title: "隐形轮系夹板",
    description: "通过材料与表面处理的选择，使透明轮系夹板在视觉上隐形，以突出展示齿轮本身。",
    image: "/assets/projects/invisible-gear-train-bridge/shared-01-transparent-bridge-front.webp",
    imageAlt: "透明轮系夹板零件正面视图",
    overview: "2011–2012年，DOMTEKNIKA为一家大型瑞士制表商开发了透明轮系夹板。项目源于内部创意，而非客户需求：让夹板在视觉上隐形，从而突出齿轮本身。工作涵盖零件设计与计算、材料和处理工艺选择，以及首批零件的注塑管理。",
    relatedPatents: [
      relatedPatent("CH707437A1", "透明机芯零件及光学处理。"),
      relatedPatent("WO2016004540A1", "使腕表机芯零件隐形的光学方法。"),
    ],
  },
  "clepsydra": {
    category: "制表",
    title: "漏刻",
    description: "参与大型水钟开发，包括电动翻转机构和1:2比例原型。",
    image: "/assets/projects/clepsydra/shared-01-design-concept.webp",
    imageAlt: "大型水钟概念设计图",
    overview: "2008年，DOMTEKNIKA参与为一家大型瑞士制表商开发大型水钟，最初计划在日内瓦展出。团队参与概念定义，开发水钟翻转机构并实现电动驱动，参与制作1:2比例原型，并进行了功能测试。",
  },
  "transparent-clock": {
    category: "钟表",
    title: "透明橱窗时钟",
    description:
      "大型透明橱窗时钟，中央无可见指针转轴，采用圆周驱动透明圆盘并与原子钟同步。",
    imageAlt: "采用圆周驱动机构的透明橱窗时钟功能原型",
    overview:
      "该时钟为日内瓦一家钟表店的橱窗开发，在中央不显示指针转轴的同时保持表面通透。DOMTEKNIKA 采用圆周驱动的透明旋转圆盘完成整套电气与机械概念，集成原子钟同步功能，统筹外观设计研究，并制作了采用注塑齿轮分段的功能原型。",
  },
  "velum-sky-screen": {
    category: "建筑系统",
    title: "Velum Sky 巨幕升降系统",
    description: "为 Velum Sky 屏幕定制的升降系统，导轨在升起位置保持不可见，并在下降过程中支撑完全悬臂的屏幕。",
    imageAlt: "日内瓦 Velum Sky 礼堂巨型屏幕升降系统",
    overview:
      "DOMTEKNIKA 完整设计了日内瓦 Velum Sky 礼堂巨型屏幕的机械系统，实现升降与精准定位。核心挑战是在升起位置隐藏导轨，同时控制下降过程中完全处于悬臂状态的屏幕，因此需要精确统筹导向、刚度、驱动及建筑集成。",
  },
};

const JA_PROJECT_OVERRIDES: Record<string, Partial<Project>> = {
  "stajvelo-rv01": {
    category: "モビリティ",
    description:
      "モナコの STAJVELO 向け都市型電動自転車。射出成形の構造部品と独自のホイールを、製品全体のデザインに統合しました。",
    imageAlt: "走行コース上の電動自転車 STAJVELO RV01",
    overview:
      "DOMTEKNIKA は STAJVELO の都市型電動自転車について、初期構想からホイールの設計、ポリマー製構造部品の開発まで担当し、量産を見据えた製品仕様にまとめました。",
  },
  aventor: {
    category: "モビリティ",
    description:
      "Aventor は DOMTEKNIKA の社内発プロジェクト。電気系統と機械構造の設計から試作まで手がけ、その後、独立したスタートアップへ発展しました。",
    imageAlt: "走行コース上の緑色の電気自動車 Aventor",
    overview:
      "2012 年に始まった Aventor は、DOMTEKNIKA が構想から試作まで手がけた社内の電気自動車プロジェクトです。電気系統と機械構造を設計し、三輪・四輪の両仕様で実機を製作しました。開発はその後、独立したスタートアップに引き継がれました。",
  },
  "totalcar-concept": {
    category: "モビリティ",
    description:
      "Hutchinson と Total グループ向けに開発した三輪の技術実証車。シャシー、駆動用電子回路、回転成形の車体パネルを設計しました。",
    imageAlt: "展示された緑色の三輪技術実証車 Total Car",
    overview:
      "当時 Total グループに属していた Hutchinson の依頼を受け、DOMTEKNIKA は三輪の技術実証車を開発しました。車台から駆動用電子回路、回転成形による車体パネルまで設計しています。",
  },
  "sam-cree": {
    category: "モビリティ",
    title: "SAM CREE",
    description:
      "DOMTEKNIKA 設立前に Jean-Luc Thuliez が開発に携わった、超軽量の電動三輪車。",
    imageAlt: "オレンジ色のオープンキャノピー付き電動三輪車 SAM CREE",
    overview:
      "Jean-Luc Thuliez は DOMTEKNIKA の設立前、別の会社に在籍していた時期に SAM CREE の開発に参加しました。前後に並ぶ座席と中央の梁を使った車台を備え、都市で使いやすい小型の電動三輪車を模索した経験は、その後の設計にもつながりました。",
  },
  "angel-interceptor": {
    category: "モビリティ",
    title: "Angel Interceptor",
    description:
      "DOMTEKNIKA が電気系統と機械構造の設計から試作まで手がけた、二輪の電気自動車コンセプト。",
    imageAlt: "エンジェル インターセプター三輪車の側面断面 CAD スタディ",
    overview:
      "2008 年頃に始まった Angel Interceptor は、DOMTEKNIKA が電気系統と機械構造の設計から試作まで担った社内プロジェクトです。開発は社内で進められ、独立したスタートアップには発展しませんでした。",
  },
  softcar: {
    category: "モビリティ",
    description:
      "電動仕様にも対応できる小型ハイブリッド車のプラットフォーム。DOMTEKNIKA が電気・機械設計から試作まで一貫して開発しました。",
    imageAlt: "オープンドアの黄色の SOFTCAR コンパクトシティ車両",
    overview:
      "SOFTCAR の最初の構想は 2006〜2007 年にさかのぼります。DOMTEKNIKA は社内プロジェクトとして電気系統・機械構造の設計と試作を主導し、その後、独立したスタートアップが設立されました。開発は現在も続いており、ハイブリッド車を基本としながら完全電動仕様も想定しています。",
  },
  "folding-bike-scooter": {
    category: "モビリティ",
    title: "折りたたみ自転車とスクーター",
    description:
      "社内で検討した折りたたみ自転車とスクーター。小さく畳める機構、日常の使いやすさ、持ち運びやすさを重視しました。",
    imageAlt: "DOMTEKNIKA 折りたたみ電動自転車コンセプト",
    overview:
      "DOMTEKNIKA は電動自転車からスクーターまで、複数の折りたたみ方式を検討しました。ヒンジやロック機構、乗車姿勢、部品の配置を磨き込み、コンパクトで運びやすく、製造にも適した構想にまとめています。",
  },
  airsmile: {
    category: "生活用品",
    title: "家庭用ホワイトニング機器",
    description:
      "歯科用エアフロー装置の原理を応用した、電源不要の家庭用歯のホワイトニング機器。1 回使い切りのカートリッジを使用します。",
    imageAlt: "家庭用歯のホワイトニング機器と使い切りカートリッジ",
    overview:
      "歯科医院で使われるエアフロー装置の仕組みを家庭向けに応用した機器で、電気を使わずに動作します。使い切りのカートリッジが、1 回の処置に必要な噴射ガスと有効成分を供給します。DOMTEKNIKA は製品全体を開発し、試作品の製作と性能試験を経て、量産に向けた設計まで進めました。",
  },
  "flex-drill": {
    category: "医療",
    title: "柔軟な整形外科ドリル",
    description:
      "軽さ、製造コスト、医療用の滅菌への対応を両立させた、柔軟なポリマー製の整形外科器具。",
    imageAlt: "青色のポリマーボディを備えた柔軟な整形外科用ドリル",
    overview:
      "DOMTEKNIKA は、この柔軟な整形外科器具のために新しいポリマー構造を開発しました。構想の検討から設計、機能試作、製造コストの分析まで行い、医療現場の要件に合う軽量で量産可能な形にまとめました。",
  },
  "biome-staple-applicator": {
    category: "医療",
    title: "ZipFix 胸骨インプラント装着器具",
    description:
      "再利用型の鋼製器具に代わる使い捨てのポリマー製器具。製造・保守コストと、繰り返し使用による汚染リスクの低減を目指しました。",
    imageAlt: "白と赤の ZipFix 胸骨インプラント装着器具",
    overview:
      "従来の再利用型鋼製器具には、製造費、継続的な保守、再使用に伴う汚染リスクという課題がありました。DOMTEKNIKA は ZipFix 胸骨インプラントの装着に使うポリマー製の使い捨て器具を開発。構想から製品設計、試作品の検証、最初の射出成形ロットの管理まで担当しました。",
  },
  "filter-carafe": {
    category: "製品",
    title: "浄水カラフェ",
    description:
      "DOMTEKNIKA が製品全体を開発した浄水カラフェ。低コストの機構でろ過した水の量を測り、フィルターカートリッジの交換時期を知らせます。",
    imageAlt: "カートリッジ付属品を備えた濾過水カラフェのコンセプト",
    overview:
      "DOMTEKNIKA は、カラフェ本体とフィルター部品に加え、ろ過した水量を低コストで計測する機構まで開発しました。計測した水量を基に、フィルターカートリッジの交換時期を知らせます。",
    relatedPatents: [
      relatedPatent(
        "WO2008017182A1",
        "浄水容器に統合されたフィルターカートリッジの品質管理方法と装置。",
      ),
      relatedPatent("USD560092S", "カラフェの形状に関する意匠特許。"),
      relatedPatent("USD568097S", "カラフェ用フィルター部品に関する意匠特許。"),
    ],
  },
  ikitty: {
    category: "生活用品",
    title: "猫用ウェットフード自動給餌器",
    description:
      "数日間の留守を想定した猫用ウェットフード自動給餌器。小分けカートリッジと、臭いを抑える使用済み容器の管理機構を備えています。",
    imageAlt: "自動キャットフードディスペンサーの機能プロトタイプ",
    overview:
      "飼い主が数日間留守にしてもウェットフードを自動で与えられるよう、使用済みの容器も臭いを抑えて保管する構想です。DOMTEKNIKA は包装から本体へカプセルを装填しやすくするカートリッジを開発し、機能する試作機を製作しました。使用済みカプセルや包装の圧縮機構を改良し、製品設計のデジタル化と各機能を新しい筐体に収める作業にも参加しました。",
  },
  "smart-bottle": {
    category: "医療",
    title: "Smart Bottle",
    description:
      "投与管理が必要な液体医薬品を安全に自動で供給する装置。モルヒネ向けに開発され、他の液剤にも応用できます。",
    imageAlt: "青色の内部モジュールを備えた Smart Bottle の構想図",
    overview:
      "顧客の構想と機能試作を出発点に、DOMTEKNIKA は主要な機能を改良しました。ボトルが破損した場合にモルヒネを中和する安全機構もその一つです。製品の再設計を取りまとめ、量産に向けて各部品を設計し、改良版の初号機を製作。その後、金型製作、射出成形の試作、初期生産も管理しました。開発当初の用途はモルヒネでしたが、同じ供給方式は他の液体医薬品にも応用できます。",
  },
  "personal-injector": {
    category: "医療",
    title: "自動注射器",
    description:
      "針が見えない設計と投与量のデジタル記録により、患者自身による治療を使いやすく安全にする通信対応の自動注射器。",
    imageAlt: "針を隠すように設計された医療用自動注射器",
    overview:
      "特に糖尿病の継続的な治療を想定し、使用中に針が見えないようにして患者の不安を軽減します。DOMTEKNIKA は量産化を主導し、信頼性と耐久性を高めるために製品構造を最適化しました。投与量を記録する機能により、治療が計画どおり続けられているかも確認できます。",
  },
  "acetabular-reamer-holder": {
    category: "医療",
    title: "寛骨臼リーマーホルダー",
    description:
      "寛骨臼リーマーホルダー用 PEEK 部品を量産するため、強度検証、射出成形に適した形状設計、製造工程の開発を行いました。",
    imageAlt: "寛骨臼リーマーホルダー用のオレンジと黒の PEEK パーツ 2 個",
    overview:
      "DOMTEKNIKA は寛骨臼リーマーホルダーに使う 2 つの PEEK 部品の量産化を主導しました。有限要素解析と樹脂の流動解析を基に射出成形向けの形状を整え、金型と工程を開発。量産時にも必要な強度、精度、品質の再現性を確保しました。",
  },
  "single-use-turbine": {
    category: "医療",
    title: "使い捨てタービン",
    description:
      "2006 年以前に開発されたポリマー製タービン。医療機器分野における初期の開発事例として記録されています。",
    imageAlt: "透明な使い捨てタービン医療コンポーネント",
    overview:
      "保存されている資料から、DOMTEKNIKA が 2006 年以前にこのポリマー製タービンを開発したことが確認できます。一方、使い捨てを目的としたのか、コスト削減や別の技術要件が主眼だったのかは判明していません。ここでは確認できる部品の構造と開発時期のみを紹介します。",
  },
  "glove-helmet-dryer": {
    category: "製品",
    title: "手袋とヘルメット乾燥機",
    description:
      "スポーツの合間に手袋やヘルメットを乾かす小型装置。CAD による検討と実機試作の記録が残っています。",
    imageAlt: "手袋を取り付けた乾燥機の試作品",
    overview:
      "続けてスポーツを行う際、手袋やヘルメットに残る汗や湿気を乾かすための小型装置です。残された CAD データと試作品から、用具の保持方法、空気の流れ、省スペースの構造を検討していたことが分かります。",
  },
  "folding-umbrella": {
    category: "製品",
    title: "ポケット折りたたみ傘",
    description:
      "収納時にスマートフォン程度の大きさになる折りたたみ傘。骨組みの動きと、それに適した生地を検討しました。",
    imageAlt: "黄色いポケットサイズの折りたたみ傘の試作品",
    overview:
      "DOMTEKNIKA は、閉じるとスマートフォンほどの大きさになる傘を目指し、骨組みの構造と折りたたみ方を検討しました。小さく畳める生地の選定も行っています。製品開発や量産化まで完了したかは資料から確認できないため、ここでは記録に残る設計と素材の検討を紹介します。",
  },
  "bottom-filling-cup": {
    category: "その他",
    title: "底から注ぐビールカップ",
    description:
      "底面のバルブからビールを注ぐイベント用カップ。泡を抑えながら、素早く提供できます。",
    imageAlt: "底面バルブを備えた 2 種類のビールカップの CAD 検討図",
    overview:
      "多くの注文をさばくイベント会場向けに、ビールをカップの底から注いで泡立ちを抑える仕組みです。DOMTEKNIKA は、速く注げて漏れず、洗いやすいバルブを設計しました。機械・流体の解析、初期ロットの射出成形の監督、機能試験も行っています。",
  },
  "skincare-applicator": {
    category: "生活用品",
    title: "スキンケア機器",
    description:
      "マッサージ、美容液の塗布、制御された光照射を組み合わせ、コラーゲン生成を促すスキンケア機器。",
    imageAlt: "IDlab スキンケア アプリケーター、化粧品カートリッジとパッケージ付き",
    overview:
      "皮膚科学の研究機関が考案した原理を基に、マッサージ、美容液の塗布、光の照射を組み合わせた機器です。コラーゲンの生成を促し、肌のケアに役立てることを目指しています。DOMTEKNIKA は本体と使い切りの美容液カートリッジを開発し、試作品を製作。研究機関とともに、美容液の配合や照射する光の波長を検討する性能試験を行いました。",
  },
  "alicoffee-machine": {
    category: "製品",
    title: "コーヒーマシン",
    description:
      "抽出中、水がカプセル内を往復する二重流路を用いたコーヒーマシンの構想。",
    imageAlt: "卓上型コーヒーマシンのコンセプト画像",
    overview:
      "このプロジェクトで検討したのは、コーヒーカプセル内の水の通り道です。水を一方向に通すのではなく、カプセル内で往復させ、抽出時に二度通る仕組みを考案しました。",
  },
  "special-t-machine": {
    category: "生活用品",
    title: "カプセルティーマシン",
    description:
      "カプセルを扱う抽出ヘッドの機構とお茶の抽出品質を改良し、量産化も見据えたティーマシン。",
    imageAlt: "カプセル式ティーマシンの抽出ユニット試作品",
    overview:
      "既存の抽出ヘッド試作品を基に、DOMTEKNIKA はカプセルの保持方法、閉じる動き、カプセルの検知と開封、お茶の流れを改良しました。蒸気がカプセル内にたまらない仕組みも開発して抽出品質を高め、抽出ヘッドや複数の部品の量産化を支援しました。",
    relatedPatents: [
      relatedPatent(
        "US2011061534A1",
        "茶カプセルマシン用飲料製造装置として、WO2009135899としても公開されました。",
      ),
    ],
  },
  "instant-coffee-dispenser": {
    category: "製品",
    title: "インスタントコーヒーマシン",
    description:
      "さまざまなインスタントコーヒーや溶解性飲料から、エスプレッソに近い仕上がりを目指す低コストのコーヒーマシン。",
    imageAlt: "手の操作が可能な可溶性コーヒーマシンのプロトタイプ",
    overview:
      "DOMTEKNIKA は機械全体を開発し、量産化に向けた初期検討を行いました。さまざまなインスタントコーヒーや粉末飲料に対応しています。カプチーノを作る際も牛乳を内部の配管に通さない設計とし、残留物を抑えて衛生管理や清掃を容易にしました。その後、大手コーヒーマシンブランド向けの製品として市場に投入されました。",
  },
  "kitesurf-safety": {
    category: "スポーツ・アウトドア",
    title: "カイトサーフィン安全装置",
    description: "一次・二次の安全解除装置を射出成形ポリマーで開発。操作に必要な力にも配慮し、設計・コスト・信頼性の改善を図りました。",
    image: "/assets/projects/kitesurf-safety/shared-01-primary-release.webp",
    imageAlt: "赤い操作矢印が付いた黒いカイトサーフィン用安全解除装置の CAD 画像",
    overview: "2010〜2011 年、DOMTEKNIKA は既存製品の設計、コスト、信頼性に課題を抱える顧客のために、カイトサーフィン用の新たな安全解除装置を開発しました。強風時にカイトの牽引力を逃がし、利用者が引き上げられて負傷する危険を抑えるための装置です。一次・二次の両解除装置を射出成形ポリマーで製作し、操作に必要な力を重点的に検討しました。",
  },
  "eternal-watch": {
    category: "時計製造",
    title: "Eternal Watch",
    description: "周囲の温度変化を利用して主ゼンマイを巻き上げる機構。DOMTEKNIKA の社内発案から生まれました。",
    image: "/assets/projects/eternal-watch/shared-01-watch-render.webp",
    imageAlt: "機構の組み込みを示す Eternal Watch の完成イメージ",
    overview: "2015 年、DOMTEKNIKA は社内で生まれた着想を基に、スイスの大手時計メーカー向けの機構を開発しました。周囲の温度変化を使って主ゼンマイを自動で巻き上げ、完全にほどけるのを防ぎます。機械式時計の精度に関わる仕組みとして、機能試作と性能試験を行いました。仮出願は行われましたが、正式な出願には進まず、公開もされていません。",
  },
  "invisible-gear-train-bridge": {
    category: "時計製造",
    title: "透明な輪列受け",
    description: "歯車を際立たせるため、素材と表面処理を工夫して目立たなくした透明な輪列受け。",
    image: "/assets/projects/invisible-gear-train-bridge/shared-01-transparent-bridge-front.webp",
    imageAlt: "透明な輪列受けの正面図",
    overview: "2011〜2012 年、DOMTEKNIKA はスイスの大手時計メーカー向けに透明な輪列受けを開発しました。歯車そのものが見えるよう、支持部品を視覚的に目立たなくするという社内発の着想です。部品の設計と計算、素材・表面処理の選定に加え、最初の部品の射出成形も監督しました。",
    relatedPatents: [
      relatedPatent("CH707437A1", "透明時計ムーブメント部品と光学加工。"),
      relatedPatent("WO2016004540A1", "時計ムーブメント部品を見えないようにする光学的方法。"),
    ],
  },
  "clepsydra": {
    category: "時計製造",
    title: "Clepsydra（水時計）",
    description: "大型水時計の開発に参加し、回転機構の電動化と半分の大きさの試作品づくりに携わりました。",
    image: "/assets/projects/clepsydra/shared-01-design-concept.webp",
    imageAlt: "大型水時計のコンセプト図",
    overview: "2008 年、DOMTEKNIKA はスイスの大手時計メーカーが計画した大型水時計の開発に参加しました。当初はジュネーブでの展示を想定した計画です。コンセプトの検討、時計を回転させる機構の開発と電動化、半分の大きさの試作品づくりに携わり、動作試験も行いました。",
  },
  "transparent-clock": {
    category: "時計製作",
    title: "透明ショーウィンドウ時計",
    description:
      "透明な文字盤の中心に針の軸を見せず、外周から円盤を駆動する大型展示時計。原子時計との時刻同期にも対応します。",
    imageAlt: "外周に駆動機構を備えた透明な展示時計の試作品",
    overview:
      "ジュネーブの時計店のショーウィンドウ向けに開発された大型時計です。中央に針の軸を見せず、透明な文字盤の向こう側まで見通せるようにしました。DOMTEKNIKA は外周から駆動する透明な回転円盤と原子時計との時刻同期を含む電気・機械構造を設計し、検討を取りまとめました。射出成形の歯車部品を組み込んだ機能試作も製作しています。",
  },
  "velum-sky-screen": {
    category: "建築システム",
    title: "Velum Sky 大画面昇降システム",
    description:
      "Velum Sky の大型スクリーン用に開発した昇降システム。上昇時にはガイドを隠し、下降時には片持ち状態のスクリーンを支えます。",
    imageAlt: "ジュネーブの Velum Sky 講堂に設けた大型スクリーン昇降システム",
    overview:
      "DOMTEKNIKA は、ジュネーブの Velum Sky 講堂で大型スクリーンを昇降・位置決めする機械システム全体を設計しました。ガイドを上昇位置で見えないようにしながら、下降中は完全に片持ち状態になるスクリーンを制御するため、案内機構、剛性、駆動方式、建物との一体化を精密に検討しました。",
  },
};

const PROJECT_OVERRIDES: Record<
  ProjectsLocale,
  Record<string, Partial<Project>>
> = {
  en: {},
  fr: FR_PROJECT_OVERRIDES,
  de: DE_PROJECT_OVERRIDES,
  es: ES_PROJECT_OVERRIDES,
  ko: KO_PROJECT_OVERRIDES,
  zh: ZH_PROJECT_OVERRIDES,
  ja: JA_PROJECT_OVERRIDES,
};

export function localizeProject(
  project: Project,
  overrides: Record<string, Partial<Project>>,
) {
  return {
    ...project,
    ...(overrides[project.id] ?? {}),
  };
}

export function resolveProjectsLocale(locale: string): ProjectsLocale {
  return locale in PROJECT_OVERRIDES ? (locale as ProjectsLocale) : "en";
}

function localizeRelatedPatents(
  relatedPatents: Project["relatedPatents"],
  locale: ProjectsLocale,
  localizeNotes: boolean,
): Project["relatedPatents"] {
  if (!relatedPatents?.length) return relatedPatents;

  const noteTranslations = localizeNotes
    ? RELATED_PATENT_NOTE_TRANSLATIONS[locale]
    : undefined;
  const titles = PATENT_TITLES[locale] as Record<string, string>;

  return relatedPatents.map((patent) => ({
    ...patent,
    title: titles[patent.patentId] || patent.title,
    note: noteTranslations?.[patent.patentId as RelatedPatentId] ?? patent.note,
  }));
}

const PINNED_PROJECT_IDS = [
  "aventor",
  "special-t-machine",
  "stajvelo-rv01",
  "softcar",
];

const PROJECT_SORT_YEARS: Partial<Record<string, number>> = {
  "kitesurf-safety": 2010,
  "invisible-gear-train-bridge": 2011,
  "bottom-filling-cup": 2015,
  "smart-bottle": 2015,
  "single-use-turbine": 2005,
  "totalcar-concept": 2011,
  "transparent-clock": 2013,
  softcar: 2006,
};

const PROJECT_SOURCE_POSITIONS = new Map(
  [FEATURED_PROJECT, ...PROJECTS].map((project, index) => [project.id, index]),
);

const PROJECT_INITIAL_POSITION_OVERRIDES: Partial<Record<string, number>> = {
  "folding-bike-scooter": PROJECT_SOURCE_POSITIONS.get("ikitty"),
  ikitty: PROJECT_SOURCE_POSITIONS.get("folding-bike-scooter"),
};

function getInitialProjectPosition(projectId: string) {
  return (
    PROJECT_INITIAL_POSITION_OVERRIDES[projectId] ??
    PROJECT_SOURCE_POSITIONS.get(projectId) ??
    Number.MAX_SAFE_INTEGER
  );
}

export const ALL_PROJECTS = [FEATURED_PROJECT, ...PROJECTS].sort((a, b) => {
  const aIndex = PINNED_PROJECT_IDS.indexOf(a.id);
  const bIndex = PINNED_PROJECT_IDS.indexOf(b.id);

  if (aIndex !== -1 || bIndex !== -1) {
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  }

  return getInitialProjectPosition(a.id) - getInitialProjectPosition(b.id);
});

const PROJECT_SCOPES: Record<
  string,
  Partial<Record<ProjectsLocale, string[]>>
> = {
  "stajvelo-rv01": {
    en: [
      "Polymer and injected-composite architecture for a premium urban e-bike.",
      "Wheel, frame and component integration studies for a distinctive product identity.",
      "CAD refinement toward manufacturable surfaces and robust mechanical interfaces.",
    ],
    fr: [
      "Architecture polymère et composite injecté pour un vélo électrique urbain premium.",
      "Études roues, cadre et intégration composants pour une identité produit distinctive.",
      "Affinage CAO vers des surfaces industrialisables et interfaces mécaniques robustes.",
    ],
    de: [
      "Polymer- und Spritzverbundarchitektur für ein hochwertiges urbanes E-Bike.",
      "Studien zur Integration von Rädern, Rahmen und Komponenten für eine eigenständige Produktidentität.",
      "CAD-Verfeinerung hin zu fertigbaren Oberflächen und robusten mechanischen Schnittstellen.",
    ],
    es: [
      "Arquitectura en polímero y composite inyectado para una bicicleta eléctrica urbana de gama alta.",
      "Estudios de integración de ruedas, cuadro y componentes para una identidad de producto propia.",
      "Perfeccionamiento CAD orientado a superficies industrializables e interfaces mecánicas robustas.",
    ],
    ko: [
      "고급 도심형 전기자전거를 위한 폴리머 및 사출 복합재 구조 설계.",
      "차별화된 제품 정체성을 위한 휠, 프레임, 부품 통합 연구.",
      "양산 가능한 표면과 견고한 기계 인터페이스를 위한 CAD 정교화.",
    ],
    zh: [
      "为高端城市电动自行车开发聚合物与注塑复合材料架构。",
      "研究车轮、车架与组件集成，建立鲜明的产品识别度。",
      "深化 CAD 设计，使表面可工业化制造并确保机械接口可靠。",
    ],
    ja: [
      "高級都市型電動自転車のポリマー構造と射出成形複合材を設計。",
      "ホイール、フレーム、部品を一体化し、製品の個性を形にしました。",
      "量産できる形状と丈夫な部品接合部を目指して CAD を調整。",
    ],
  },
  aventor: {
    en: [
      "Complete electrical and mechanical architecture developed by DOMTEKNIKA.",
      "Three-wheel and four-wheel variants explored from 2012 onward.",
      "Internal prototypes and validation carried through to a separate startup.",
    ],
    fr: [
      "Architecture électrique et mécanique complète développée par DOMTEKNIKA.",
      "Versions trois et quatre roues étudiées à partir de 2012.",
      "Prototypes et validations menés en interne jusqu'à la création d'une startup distincte.",
    ],
    de: [
      "Vollständige elektrische und mechanische Architektur, entwickelt von DOMTEKNIKA.",
      "Drei- und vierrädrige Varianten, die seit 2012 untersucht wurden.",
      "Interne Prototypen und Validierung bis zur Gründung eines eigenständigen Startups.",
    ],
    es: [
      "Arquitectura eléctrica y mecánica completa desarrollada por DOMTEKNIKA.",
      "Versiones de tres y cuatro ruedas estudiadas desde 2012.",
      "Prototipos y validación internos hasta la creación de una startup independiente.",
    ],
    ko: [
      "DOMTEKNIKA가 개발한 완전한 전기·기계 아키텍처.",
      "2012년부터 검토한 세 바퀴 및 네 바퀴 버전.",
      "별도 스타트업 설립 단계까지 이어진 사내 시제품 제작과 검증.",
    ],
    zh: [
      "由 DOMTEKNIKA 完整开发电气与机械架构。",
      "自 2012 年起探索三轮与四轮版本。",
      "内部样机与验证工作一直推进至独立初创公司成立。",
    ],
    ja: [
      "電気系統と機械構造を DOMTEKNIKA が一貫して設計。",
      "2012 年以降、三輪・四輪の両仕様を検討。",
      "社内で試作・検証を重ね、開発は独立したスタートアップへ引き継がれました。",
    ],
  },
  "totalcar-concept": {
    en: [
      "Three-wheeled technology demonstrator commissioned by Hutchinson for the Total group.",
      "Complete chassis and propulsion-electronics development by DOMTEKNIKA.",
      "Rotomoulded body parts designed and integrated into the working demonstrator.",
    ],
    fr: [
      "Démonstrateur technologique à trois roues commandé par Hutchinson pour le groupe Total.",
      "Développement complet du châssis et de l'électronique de propulsion par DOMTEKNIKA.",
      "Pièces de carrosserie rotomoulées conçues et intégrées au démonstrateur fonctionnel.",
    ],
    de: [
      "Dreirädriger Technologiedemonstrator im Auftrag von Hutchinson für die Total-Gruppe.",
      "Vollständige Entwicklung von Fahrgestell und Antriebselektronik durch DOMTEKNIKA.",
      "Rotationsgeformte Karosserieteile für den funktionsfähigen Demonstrator entwickelt und integriert.",
    ],
    es: [
      "Demostrador tecnológico de tres ruedas encargado por Hutchinson para el grupo Total.",
      "Desarrollo completo del chasis y de la electrónica de propulsión por DOMTEKNIKA.",
      "Piezas de carrocería rotomoldeadas diseñadas e integradas en el demostrador funcional.",
    ],
    ko: [
      "Hutchinson이 Total 그룹을 위해 의뢰한 3륜 기술 실증 차량.",
      "DOMTEKNIKA가 수행한 섀시와 구동 전자장치의 전체 개발.",
      "실제 작동하는 실증 차량에 적용된 회전성형 차체 부품 설계와 통합.",
    ],
    zh: [
      "Hutchinson 为 Total 集团委托开发的三轮技术验证车。",
      "由 DOMTEKNIKA 完成底盘与驱动电子系统的整体开发。",
      "为可运行验证车设计并集成滚塑车身部件。",
    ],
    ja: [
      "Hutchinson が Total グループ向けに依頼した三輪の技術実証車。",
      "DOMTEKNIKA が車台と駆動用電子回路を設計。",
      "回転成形の車体部品を開発し、走行可能な実証車に組み込みました。",
    ],
  },
  "sam-cree": {
    en: [
      "Historic ultra-light electric three-wheeler developed before DOMTEKNIKA was founded.",
      "Jean-Luc Thuliez contributed to the project while working at another company.",
      "Tandem seating, a central beam chassis and compact urban packaging shaped this early mobility study.",
    ],
    fr: [
      "Trois-roues électrique ultraléger historique développé avant la création de DOMTEKNIKA.",
      "Jean-Luc Thuliez a contribué à ce projet lorsqu'il travaillait au sein d'une autre entreprise.",
      "Sièges en tandem, châssis à poutre centrale et encombrement urbain réduit caractérisaient cette étude pionnière.",
    ],
    de: [
      "Historisches ultraleichtes Elektro-Dreirad aus der Zeit vor der Gründung von DOMTEKNIKA.",
      "Jean-Luc Thuliez wirkte an dem Projekt mit, als er für ein anderes Unternehmen tätig war.",
      "Tandemsitze, zentraler Trägerrahmen und kompakte Abmessungen prägten diese frühe Mobilitätsstudie.",
    ],
    es: [
      "Triciclo eléctrico ultraligero histórico desarrollado antes de la creación de DOMTEKNIKA.",
      "Jean-Luc Thuliez participó en el proyecto mientras trabajaba en otra empresa.",
      "Asientos en tándem, chasis de viga central y dimensiones urbanas compactas definieron este estudio pionero.",
    ],
    ko: [
      "DOMTEKNIKA 설립 이전에 개발된 역사적인 초경량 전기 삼륜차입니다.",
      "Jean-Luc Thuliez가 다른 회사에서 근무하던 시기에 이 프로젝트에 참여했습니다.",
      "탠덤 좌석, 중앙 빔 섀시, 컴팩트한 도심형 패키징을 탐구한 초기 모빌리티 연구입니다.",
    ],
    zh: [
      "在 DOMTEKNIKA 创立之前开发的历史性超轻型电动三轮车。",
      "Jean-Luc Thuliez 在另一家公司任职期间参与了该项目。",
      "串列座椅、中央梁底盘与紧凑城市布局构成了这项早期出行研究。",
    ],
    ja: [
      "DOMTEKNIKA の設立前に開発された超軽量の電動三輪車。",
      "Jean-Luc Thuliez が別の会社に在籍中に開発へ参加。",
      "前後に並ぶ座席と中央の梁を使った車台で、小型の都市型車両を模索しました。",
    ],
  },
  "angel-interceptor": {
    en: [
      "Electric two-wheel concept initiated around 2008.",
      "Complete electrical and mechanical design developed by DOMTEKNIKA.",
      "Internal prototypes produced without creating a separate startup.",
    ],
    fr: [
      "Concept électrique deux roues lancé autour de 2008.",
      "Conception électrique et mécanique complète réalisée par DOMTEKNIKA.",
      "Prototypes développés en interne, sans création d'une startup distincte.",
    ],
    de: [
      "Elektrisches Zweiradkonzept, das um 2008 gestartet wurde.",
      "Vollständige elektrische und mechanische Entwicklung durch DOMTEKNIKA.",
      "Interne Prototypenentwicklung ohne Gründung eines separaten Startups.",
    ],
    es: [
      "Concepto eléctrico de dos ruedas iniciado alrededor de 2008.",
      "Diseño eléctrico y mecánico completo desarrollado por DOMTEKNIKA.",
      "Prototipos internos sin creación de una startup independiente.",
    ],
    ko: [
      "약 2008년에 시작된 전기 이륜 콘셉트.",
      "DOMTEKNIKA가 수행한 완전한 전기·기계 설계.",
      "별도 스타트업 설립 없이 진행한 사내 시제품 개발.",
    ],
    zh: [
      "约在 2008 年启动的电动两轮概念。",
      "由 DOMTEKNIKA 完成全部电气与机械设计。",
      "内部完成样机开发，未成立独立初创公司。",
    ],
    ja: [
      "2008 年頃に始まった二輪の電気自動車コンセプト。",
      "電気系統と機械構造を DOMTEKNIKA が設計。",
      "社内で試作を進め、独立したスタートアップは設立されませんでした。",
    ],
  },
  softcar: {
    en: [
      "Hybrid urban vehicle platform with a possible fully electric configuration.",
      "Complete electrical and mechanical design and prototyping by DOMTEKNIKA.",
      "Internal development started in 2006-2007, continued through a separate startup and remains ongoing.",
    ],
    fr: [
      "Plateforme de véhicule urbain hybride, avec une configuration 100 % électrique possible.",
      "Conception électrique et mécanique complète et prototypage réalisés par DOMTEKNIKA.",
      "Développement interne lancé en 2006-2007, poursuivi via une startup distincte et toujours en cours.",
    ],
    de: [
      "Hybride Stadtfahrzeugplattform mit möglicher vollelektrischer Konfiguration.",
      "Vollständige elektrische und mechanische Entwicklung sowie Prototypenbau durch DOMTEKNIKA.",
      "Interne Entwicklung seit 2006-2007, über ein separates Startup fortgeführt und weiterhin laufend.",
    ],
    es: [
      "Plataforma de vehículo urbano híbrido con posible configuración 100 % eléctrica.",
      "Diseño eléctrico y mecánico completo y prototipado realizados por DOMTEKNIKA.",
      "Desarrollo interno iniciado en 2006-2007, continuado mediante una startup independiente y todavía en curso.",
    ],
    ko: [
      "100% 전기 구성이 가능한 하이브리드 도심 차량 플랫폼.",
      "DOMTEKNIKA가 수행한 완전한 전기·기계 설계와 시제품 제작.",
      "2006~2007년 시작된 사내 개발로, 별도 스타트업을 통해 이어져 현재도 진행 중.",
    ],
    zh: [
      "可采用纯电配置的混合动力城市车辆平台。",
      "由 DOMTEKNIKA 完成全部电气、机械设计与样机开发。",
      "内部开发始于 2006 至 2007 年，经独立初创公司延续并仍在推进。",
    ],
    ja: [
      "完全電動仕様にも対応可能な都市型ハイブリッド車の構想。",
      "DOMTEKNIKA が電気系統・機械構造の設計と試作を一貫して担当。",
      "2006〜2007 年に社内で始まり、独立したスタートアップを経て開発が続いています。",
    ],
  },
  "folding-bike-scooter": {
    en: [
      "Folding geometry studies for compact storage and transport.",
      "Hinge, frame and riding-position concepts for small electric mobility.",
      "Visual and mechanical iterations across bike and scooter formats.",
    ],
    fr: [
      "Études de géométrie pliante pour rangement et transport compacts.",
      "Concepts charnières, cadre et position de conduite pour petite mobilité électrique.",
      "Itérations visuelles et mécaniques sur formats vélo et scooter.",
    ],
    de: [
      "Studien zur Faltgeometrie für kompakte Lagerung und einfachen Transport.",
      "Konzepte für Gelenke, Rahmen und Fahrposition bei kleinen Elektrofahrzeugen.",
      "Gestalterische und mechanische Iterationen für Fahrrad- und Scooterformate.",
    ],
    es: [
      "Estudios de geometría plegable para facilitar el almacenamiento y el transporte.",
      "Conceptos de bisagras, cuadro y posición de conducción para micromovilidad eléctrica.",
      "Iteraciones visuales y mecánicas en formatos de bicicleta y patinete.",
    ],
    ko: [
      "컴팩트한 보관과 운반을 위한 폴딩 지오메트리 연구.",
      "소형 전기 모빌리티를 위한 힌지, 프레임, 주행 자세 콘셉트.",
      "자전거와 스쿠터 형식에 대한 디자인 및 기계 구조 반복 개발.",
    ],
    zh: [
      "研究折叠几何结构，实现紧凑收纳与便捷运输。",
      "为小型电动出行工具开发铰链、车架与骑行姿态方案。",
      "针对自行车与滑板车形态进行造型和机械结构迭代。",
    ],
    ja: [
      "収納や持ち運びを考えた折りたたみ構造を検討。",
      "小型電動車両のヒンジ、フレーム、乗車姿勢を設計。",
      "自転車とスクーターの両形式で、外観と機構を改良しました。",
    ],
  },
  airsmile: {
    en: [
      "Handheld dental-device form factor with clean, approachable styling.",
      "Internal packaging for removable components and consumable interfaces.",
      "Prototype-family thinking for testing ergonomics and visual variants.",
    ],
    fr: [
      "Format de dispositif dentaire portatif avec style propre et accessible.",
      "Intégration interne des composants amovibles et des consommables.",
      "Famille de prototypes pour tester ergonomie et variantes visuelles.",
    ],
    de: [
      "Handliches Dentalgerät mit klarer, vertrauenswürdiger Formensprache.",
      "Interne Integration von abnehmbaren Komponenten und Verbrauchsteilen.",
      "Prototypenfamilie zur Prüfung von Ergonomie und Gestaltungsvarianten.",
    ],
    es: [
      "Formato portátil para un dispositivo dental con un diseño claro y accesible.",
      "Integración interna de componentes extraíbles y consumibles.",
      "Familia de prototipos para evaluar la ergonomía y distintas variantes visuales.",
    ],
    ko: [
      "깔끔하고 친근한 디자인의 휴대형 치과 기기 폼팩터.",
      "분리형 부품과 소모품 인터페이스의 내부 패키징.",
      "인체공학과 디자인 변형을 검증하기 위한 프로토타입 제품군.",
    ],
    zh: [
      "打造外观简洁、亲和的手持式口腔护理设备。",
      "完成可拆卸组件与耗材接口的内部集成。",
      "通过系列原型验证人体工学与不同造型方案。",
    ],
    ja: [
      "手になじみ、親しみやすい外観の歯科用機器を検討。",
      "取り外す部品や使い切りカートリッジを本体に収める構造を設計。",
      "複数の試作品で使いやすさと外観の違いを確認しました。",
    ],
  },
  "flex-drill": {
    en: [
      "Research and selection of a lightweight polymer instrument architecture.",
      "Complete mechanical development and validation through functional prototypes.",
      "Production-cost analysis and preparation for industrialization.",
    ],
    fr: [
      "Recherche et sélection d'une architecture d'instrument polymère légère et performante.",
      "Développement mécanique complet et validation par prototypes fonctionnels.",
      "Analyse des coûts de production et préparation à l'industrialisation.",
    ],
    de: [
      "Untersuchung und Auswahl einer leichten, leistungsfähigen Polymerarchitektur.",
      "Vollständige mechanische Entwicklung und Validierung mit funktionsfähigen Prototypen.",
      "Produktionskostenanalyse und Vorbereitung der Industrialisierung.",
    ],
    es: [
      "Investigación y selección de una arquitectura de polímero ligera y eficiente.",
      "Desarrollo mecánico completo y validación mediante prototipos funcionales.",
      "Análisis de costes de producción y preparación para la industrialización.",
    ],
    ko: [
      "가볍고 성능이 뛰어난 폴리머 기구 구조의 연구와 선정.",
      "전체 기계 개발과 기능성 프로토타입을 통한 검증.",
      "생산 비용 분석과 산업화 준비.",
    ],
    zh: [
      "研究并选择轻量、高性能的聚合物器械架构。",
      "完成机械开发并通过功能原型进行验证。",
      "分析生产成本并为工业化做好准备。",
    ],
    ja: [
      "軽量なポリマー製器具の構造を検討・選定。",
      "機械設計を進め、機能試作品で検証。",
      "製造コストを分析し、量産化に向けて準備しました。",
    ],
  },
  "biome-staple-applicator": {
    en: [
      "Replacement of a reusable steel architecture with an ergonomic, single-use polymer instrument.",
      "Complete product engineering and validation through functional prototypes.",
      "Industrialization and management of an initial injection-moulded series.",
    ],
    fr: [
      "Remplacement d'une architecture réutilisable en acier par un instrument ergonomique en polymère à usage unique.",
      "Conception complète du produit et validation par prototypes fonctionnels.",
      "Industrialisation et pilotage d'une première série de pièces injectées.",
    ],
    de: [
      "Ersatz einer wiederverwendbaren Stahlarchitektur durch ein ergonomisches Einweg-Instrument aus Polymer.",
      "Vollständige Produktentwicklung und Validierung mit funktionsfähigen Prototypen.",
      "Industrialisierung und Betreuung einer ersten Spritzgussserie.",
    ],
    es: [
      "Sustitución de una arquitectura reutilizable de acero por un instrumento ergonómico de polímero y de un solo uso.",
      "Ingeniería completa del producto y validación mediante prototipos funcionales.",
      "Industrialización y gestión de una primera serie de piezas inyectadas.",
    ],
    ko: [
      "재사용 강철 구조를 인체공학적 일회용 폴리머 기구로 대체.",
      "전체 제품 엔지니어링과 기능성 프로토타입 검증.",
      "산업화와 첫 사출 생산 시리즈 관리.",
    ],
    zh: [
      "以符合人体工学的一次性聚合物器械替代可重复使用的钢制架构。",
      "完成产品工程开发并通过功能原型验证。",
      "完成工业化并管理首批注塑生产。",
    ],
    ja: [
      "再利用型の鋼製器具に代わる、使いやすい使い捨てポリマー器具を開発。",
      "製品全体を設計し、機能試作品で検証。",
      "初期ロットの射出成形と量産化を管理しました。",
    ],
  },
  "filter-carafe": {
    en: [
      "Complete product development covering the carafe, filter accessory and integrated mechanism.",
      "Low-cost volume-counting component measuring the quantity of filtered water.",
      "Clear replacement indication telling the user when the filtration cartridge should be changed.",
    ],
    fr: [
      "Développement complet du produit, de la carafe et son accessoire filtrant jusqu'au mécanisme intégré.",
      "Composant économique de comptage mesurant le volume d'eau réellement filtré.",
      "Indication claire du moment où l'utilisateur doit remplacer la cartouche.",
    ],
    de: [
      "Vollständige Produktentwicklung von der Karaffe und dem Filterzubehör bis zum integrierten Mechanismus.",
      "Kostengünstige Volumenerfassung zur Messung der tatsächlich gefilterten Wassermenge.",
      "Klare Anzeige, wann die Filterkartusche gewechselt werden muss.",
    ],
    es: [
      "Desarrollo completo del producto, desde la jarra y el accesorio filtrante hasta el mecanismo integrado.",
      "Componente económico de medición del volumen de agua realmente filtrada.",
      "Indicación clara del momento en que el usuario debe sustituir el cartucho.",
    ],
    ko: [
      "카라페와 필터 액세서리부터 통합 메커니즘까지 제품 전체를 개발.",
      "실제로 정수된 물의 양을 측정하는 저비용 용량 계측 부품.",
      "사용자가 카트리지 교체 시점을 명확하게 확인할 수 있는 표시 기능.",
    ],
    zh: [
      "完成从壶体、过滤附件到集成机构的整套产品开发。",
      "采用低成本计量部件，统计实际过滤的水量。",
      "清晰提示用户何时需要更换滤芯。",
    ],
    ja: [
      "浄水容器、フィルター部品、内蔵機構まで製品全体を開発。",
      "ろ過した水量を低コストで測る部品を設計。",
      "フィルターの交換時期を分かりやすく知らせる仕組みを用意しました。",
    ],
  },
  ikitty: {
    en: [
      "Pet-product architecture around capsule insertion and feeding mechanics.",
      "Soft, recognizable product language balanced with internal functional packaging.",
      "Cutaway and prototype views to validate refills, access and product behavior.",
    ],
    fr: [
      "Architecture de produit animalier autour de l'insertion de capsules et du mécanisme de distribution.",
      "Langage produit doux et reconnaissable équilibré avec l'intégration fonctionnelle interne.",
      "Vues coupe et prototypes pour valider recharges, accès et comportement produit.",
    ],
    de: [
      "Produktarchitektur für ein Tierwohl-System mit Kapselaufnahme und Ausgabemechanik.",
      "Freundliche, eigenständige Formensprache in Einklang mit der internen Funktionstechnik.",
      "Schnittmodelle und Prototypen zur Prüfung von Nachfüllung, Zugang und Produktverhalten.",
    ],
    es: [
      "Arquitectura de producto para mascotas basada en la inserción de cápsulas y el mecanismo de dispensación.",
      "Lenguaje formal amable y reconocible, equilibrado con la integración funcional interna.",
      "Vistas en sección y prototipos para validar las recargas, el acceso y el funcionamiento del producto.",
    ],
    ko: [
      "캡슐 삽입과 급여 메커니즘을 중심으로 한 반려동물 제품 구조 설계.",
      "내부 기능 통합과 조화를 이루는 부드럽고 인지하기 쉬운 제품 디자인.",
      "리필, 접근성, 제품 작동을 검증하기 위한 단면 모델과 프로토타입.",
    ],
    zh: [
      "围绕胶囊装载与定量投放机构构建宠物产品架构。",
      "在内部功能集成的基础上，塑造亲和且易于识别的产品语言。",
      "通过剖面图与原型验证补充方式、操作路径和产品运行逻辑。",
    ],
    ja: [
      "カプセルの装填と給餌の仕組みを中心に製品を設計。",
      "親しみやすい外観と、内部機構を収める構造を両立。",
      "断面図と試作品で補充のしやすさや動作を検証しました。",
    ],
  },
  "smart-bottle": {
    en: [
      "Functional improvements based on the client’s concept and working prototype.",
      "Safety function designed to neutralize morphine if the bottle is breached.",
      "Industrial part design, revised prototype, tooling, injection trials and first-series production.",
      "Prescription-controlled platform adaptable to other liquid medicines.",
    ],
    fr: [
      "Amélioration des fonctions à partir du concept et du prototype fonctionnel du client.",
      "Dispositif de sécurité conçu pour neutraliser la morphine en cas d’effraction de la bouteille.",
      "Conception industrielle des pièces, prototype révisé, outillages, essais d’injection et première série.",
      "Plateforme de distribution selon prescription adaptable à d’autres médicaments liquides.",
    ],
    de: [
      "Funktionsverbesserungen auf Basis des Kundenkonzepts und des funktionsfähigen Prototyps.",
      "Sicherheitsfunktion zur Neutralisierung des Morphins bei einem Aufbruch der Flasche.",
      "Industrielle Teilekonstruktion, überarbeiteter Prototyp, Werkzeuge, Spritzgussversuche und erste Serie.",
      "Verschreibungsgesteuerte Plattform, die auf andere flüssige Arzneimittel übertragbar ist.",
    ],
    es: [
      "Mejoras funcionales a partir del concepto y el prototipo funcional del cliente.",
      "Función de seguridad diseñada para neutralizar la morfina si se fuerza la botella.",
      "Diseño industrial de piezas, prototipo revisado, moldes, pruebas de inyección y primera serie.",
      "Plataforma controlada por prescripción adaptable a otros medicamentos líquidos.",
    ],
    ko: [
      "고객의 콘셉트와 기능성 프로토타입을 바탕으로 한 기능 개선.",
      "병이 강제로 개봉될 경우 모르핀을 중화하도록 설계한 안전 기능.",
      "산업용 부품 설계, 개선 프로토타입, 금형, 사출 시험과 첫 생산 시리즈.",
      "다른 액상 의약품에도 적용 가능한 처방 기반 공급 플랫폼.",
    ],
    zh: [
      "基于客户概念和功能原型改进关键功能。",
      "设计在瓶体被强行破坏时中和吗啡的安全功能。",
      "完成零件工业化设计、改进原型、模具、注塑试制和首批量产。",
      "构建可适配其他液体药物的处方控制分配平台。",
    ],
    ja: [
      "顧客の構想と試作品を基に主要機能を改良。",
      "ボトル破損時にモルヒネを中和する安全機構を設計。",
      "量産向けの部品設計、改良試作、金型製作、射出成形試作と初期生産を担当。",
      "他の液体医薬品にも応用できる供給方式を検討しました。",
    ],
  },
  "personal-injector": {
    en: [
      "Industrialization and optimization for reliable series production.",
      "Self-injection architecture that conceals the needle to reduce patient anxiety.",
      "Integrated dose monitoring to document treatment adherence over time.",
    ],
    fr: [
      "Industrialisation et optimisation pour une fabrication en série fiable.",
      "Architecture d'auto-injection dissimulant l'aiguille afin de réduire l'anxiété du patient.",
      "Suivi intégré des doses pour documenter la régularité du traitement dans le temps.",
    ],
    de: [
      "Industrialisierung und Optimierung für eine zuverlässige Serienfertigung.",
      "Selbstinjektionsarchitektur mit verdeckter Nadel zur Verringerung der Patientenangst.",
      "Integrierte Dosiserfassung zur Dokumentation der Therapietreue im Zeitverlauf.",
    ],
    es: [
      "Industrialización y optimización para una producción en serie fiable.",
      "Arquitectura de autoinyección que oculta la aguja para reducir la ansiedad del paciente.",
      "Seguimiento integrado de dosis para documentar la regularidad del tratamiento.",
    ],
    ko: [
      "신뢰성 높은 양산을 위한 산업화와 최적화.",
      "환자의 불안을 줄이도록 바늘을 숨긴 자가 주사 구조.",
      "시간에 따른 치료 규칙성을 기록하는 통합 투여량 모니터링.",
    ],
    zh: [
      "面向可靠批量生产的工业化与优化。",
      "采用隐藏针头的自助注射架构，减轻患者焦虑。",
      "集成剂量监测，持续记录治疗规律性。",
    ],
    ja: [
      "信頼性の高い量産に向けて製品構造を最適化。",
      "針を見せず、患者の不安を抑える自己注射の仕組みを設計。",
      "投与量を記録し、治療の継続状況を確認できる機能を統合しました。",
    ],
  },
  "acetabular-reamer-holder": {
    en: [
      "Finite-element and rheological analyses of the PEEK components.",
      "Geometry optimization for injection molding and mechanical performance.",
      "Tooling development and injection-process tuning for repeatable production.",
    ],
    fr: [
      "Calculs par éléments finis et analyses rhéologiques des composants en PEEK.",
      "Optimisation des géométries pour l'injection et la performance mécanique.",
      "Développement des outillages et mise au point du procédé pour une production répétable.",
    ],
    de: [
      "Finite-Elemente- und rheologische Analysen der PEEK-Komponenten.",
      "Geometrieoptimierung für Spritzguss und mechanische Leistung.",
      "Werkzeugentwicklung und Prozessabstimmung für eine wiederholbare Produktion.",
    ],
    es: [
      "Análisis por elementos finitos y reológicos de los componentes de PEEK.",
      "Optimización de geometrías para inyección y rendimiento mecánico.",
      "Desarrollo de moldes y puesta a punto del proceso para una producción repetible.",
    ],
    ko: [
      "PEEK 부품의 유한요소 및 유동 해석.",
      "사출 성형과 기계적 성능을 위한 형상 최적화.",
      "반복 가능한 생산을 위한 금형 개발과 사출 공정 조정.",
    ],
    zh: [
      "对 PEEK 部件开展有限元与流变分析。",
      "优化几何结构，兼顾注塑成型与机械性能。",
      "开发模具并调试注塑工艺，实现稳定重复生产。",
    ],
    ja: [
      "PEEK 部品の強度解析と樹脂の流動解析を実施。",
      "射出成形と機械的性能の両面から部品形状を最適化。",
      "金型と成形条件を調整し、安定して再現できる製造工程を整えました。",
    ],
  },
  "single-use-turbine": {
    en: [
      "Polymer turbine developed before 2006.",
      "Early medical-device component documented through the surviving project material.",
      "Original cost, use-case and performance objectives not established by the available archive.",
    ],
    fr: [
      "Turbine en polymère développée avant 2006.",
      "Composant médical ancien documenté par les éléments de projet conservés.",
      "Objectifs initiaux de coût, d’usage et de performance non établis par les archives disponibles.",
    ],
    de: [
      "Vor 2006 entwickelte Polymerturbine.",
      "Frühe medizintechnische Komponente, dokumentiert durch die erhaltenen Projektunterlagen.",
      "Ursprüngliche Kosten-, Einsatz- und Leistungsziele sind in den verfügbaren Unterlagen nicht belegt.",
    ],
    es: [
      "Turbina de polímero desarrollada antes de 2006.",
      "Componente médico temprano documentado por el material de proyecto conservado.",
      "Los objetivos originales de coste, uso y rendimiento no constan en el archivo disponible.",
    ],
    ko: [
      "2006년 이전에 개발된 폴리머 터빈.",
      "현재 남아 있는 프로젝트 자료로 확인되는 초기 의료기기 부품.",
      "기존 자료로는 초기 비용, 용도, 성능 목표를 확인할 수 없음.",
    ],
    zh: [
      "2006 年以前开发的聚合物涡轮。",
      "由现存项目资料记录的早期医疗器械部件。",
      "现有档案无法确定其最初的成本、用途和性能目标。",
    ],
    ja: [
      "2006 年以前に開発されたポリマー製タービン。",
      "残された資料から確認できる初期の医療機器部品です。",
      "当時のコスト、用途、性能目標は資料から特定できません。",
    ],
  },
  "glove-helmet-dryer": {
    en: [
      "Compact station for drying gloves and a helmet between sports sessions.",
      "CAD studies covering supports, airflow and overall integration.",
      "Physical prototypes documenting the proposed architecture.",
    ],
    fr: [
      "Station compacte pour sécher gants et casque entre deux sessions.",
      "Études CAO des supports, de la circulation d’air et de l’intégration générale.",
      "Prototypes physiques documentant l’architecture proposée.",
    ],
    de: [
      "Kompakte Station zum Trocknen von Handschuhen und Helm zwischen zwei Sportsessions.",
      "CAD-Studien zu Halterungen, Luftführung und Gesamtintegration.",
      "Physische Prototypen zur Dokumentation der vorgeschlagenen Architektur.",
    ],
    es: [
      "Estación compacta para secar guantes y casco entre dos sesiones.",
      "Estudios CAD de los soportes, la circulación de aire y la integración general.",
      "Prototipos físicos que documentan la arquitectura propuesta.",
    ],
    ko: [
      "스포츠 활동 사이에 장갑과 헬멧을 건조하는 컴팩트 스테이션.",
      "지지 구조, 공기 흐름과 전체 통합을 다룬 CAD 연구.",
      "제안된 구조를 기록하는 물리 프로토타입.",
    ],
    zh: [
      "用于在两次运动之间烘干手套和头盔的紧凑工作站。",
      "围绕支撑结构、气流和整体集成开展 CAD 研究。",
      "通过实体原型记录所提出的系统架构。",
    ],
    ja: [
      "スポーツの合間に手袋やヘルメットを乾かす小型装置。",
      "用具の保持方法、空気の流れ、部品配置を CAD で検討。",
      "実際の試作品で構造を示しました。",
    ],
  },
  "folding-umbrella": {
    en: [
      "Frame architecture and folding kinematics for smartphone-scale storage.",
      "Research into fabrics compatible with highly compact folding.",
      "Presentation limited to documented engineering work; full industrialization is not confirmed.",
    ],
    fr: [
      "Architecture des armatures et cinématiques de pliage pour un rangement au format smartphone.",
      "Recherche de toiles compatibles avec un pliage très compact.",
      "Présentation limitée aux travaux documentés ; l’industrialisation complète n’est pas confirmée.",
    ],
    de: [
      "Gestängearchitektur und Faltkinematik für ein Packmass im Smartphone-Format.",
      "Recherche zu Geweben, die eine besonders kompakte Faltung ermöglichen.",
      "Darstellung auf dokumentierte Entwicklungsarbeiten begrenzt; eine vollständige Industrialisierung ist nicht bestätigt.",
    ],
    es: [
      "Arquitectura de varillas y cinemática de plegado para un volumen similar al de un smartphone.",
      "Investigación de tejidos compatibles con un plegado muy compacto.",
      "Presentación limitada al trabajo documentado; no se confirma una industrialización completa.",
    ],
    ko: [
      "스마트폰 크기 수납을 위한 프레임 구조와 접힘 운동학.",
      "매우 컴팩트한 접힘에 적합한 원단 연구.",
      "문서로 확인되는 엔지니어링 작업만 소개하며 전체 산업화는 확인되지 않음.",
    ],
    zh: [
      "设计伞架结构与折叠运动学，实现智能手机级收纳尺寸。",
      "研究适合高度紧凑折叠的面料。",
      "仅呈现已有资料支持的工程工作；尚无法确认是否完成全部工业化。",
    ],
    ja: [
      "スマートフォン程度に収納するため、骨組みと折りたたみ方を検討。",
      "小さく畳める生地を調査。",
      "資料で確認できる設計・素材検討のみを紹介し、量産化の完了は断定しません。",
    ],
  },
  "bottom-filling-cup": {
    en: [
      "Integrated bottom valve for rapid filling with reduced foam.",
      "Valve architecture designed for leak-tight closure and easy cleaning.",
      "Mechanical and rheological calculations to validate component and injection behavior.",
      "Supervision of the first injection-molded series and functional testing.",
    ],
    fr: [
      "Valve intégrée dans le fond pour un remplissage rapide avec moins de mousse.",
      "Architecture conçue pour assurer l’étanchéité et faciliter le nettoyage.",
      "Calculs mécaniques et rhéologiques pour valider le composant et son comportement à l’injection.",
      "Pilotage des premières séries injectées et essais fonctionnels.",
    ],
    de: [
      "Integriertes Bodenventil für schnelles Befüllen mit reduzierter Schaumbildung.",
      "Ventilarchitektur für zuverlässige Dichtheit und einfache Reinigung.",
      "Mechanische und rheologische Berechnungen zur Validierung von Bauteil und Spritzgussverhalten.",
      "Begleitung der ersten Spritzgussserien und Funktionstests.",
    ],
    es: [
      "Válvula integrada en la base para un llenado rápido con menos espuma.",
      "Arquitectura de válvula diseñada para garantizar la estanqueidad y facilitar la limpieza.",
      "Cálculos mecánicos y reológicos para validar el componente y su comportamiento en inyección.",
      "Supervisión de las primeras series inyectadas y ensayos funcionales.",
    ],
    ko: [
      "거품을 줄이면서 빠르게 충전하는 통합 바닥 밸브.",
      "안정적인 밀폐와 간편한 세척을 위한 밸브 구조.",
      "부품과 사출 거동을 검증하기 위한 기계 및 유동 해석.",
      "초기 사출 생산분 관리와 기능 시험.",
    ],
    zh: [
      "集成底部阀门，实现快速灌装并减少泡沫。",
      "阀门架构兼顾可靠密封与便捷清洗。",
      "通过机械与流变计算验证部件及其注塑行为。",
      "跟进首批注塑生产并完成功能测试。",
    ],
    ja: [
      "底面のバルブから素早く注ぎ、泡を抑える仕組み。",
      "漏れにくく、洗いやすいバルブ構造を設計。",
      "部品の動作と射出成形時の樹脂の流れを計算で検証。",
      "最初の射出成形ロットを監督し、機能試験を行いました。",
    ],
  },
  "skincare-applicator": {
    en: [
      "Ergonomic handpiece and cartridge packaging for a dermocosmetic applicator.",
      "Fluid-delivery concept work balanced with beauty-product visual codes.",
      "Prototype and principle views to explain use, refill and internal layout.",
    ],
    fr: [
      "Pièce à main ergonomique et intégration de la cartouche pour applicateur dermocosmétique.",
      "Concept de distribution fluide équilibré avec les codes visuels beauté.",
      "Vues prototype et principe pour expliquer usage, recharge et architecture interne.",
    ],
    de: [
      "Ergonomisches Handstück und Kartuschenintegration für einen dermokosmetischen Applikator.",
      "Entwicklung der Flüssigkeitsabgabe im Einklang mit der Formensprache hochwertiger Kosmetikprodukte.",
      "Prototypen und Prinzipdarstellungen zur Erklärung von Anwendung, Nachfüllung und Innenaufbau.",
    ],
    es: [
      "Pieza de mano ergonómica e integración del cartucho para un aplicador dermocosmético.",
      "Concepto de dispensación de fluido en armonía con los códigos visuales del sector de la belleza.",
      "Prototipos y vistas de principio para explicar el uso, la recarga y la arquitectura interna.",
    ],
    ko: [
      "더모코스메틱 어플리케이터를 위한 인체공학적 핸드피스와 카트리지 통합.",
      "뷰티 제품의 시각적 언어와 조화를 이루는 유체 토출 콘셉트.",
      "사용, 리필, 내부 구조를 설명하는 프로토타입과 원리 시각화.",
    ],
    zh: [
      "为皮肤护理施用器设计符合人体工学的手持部件并集成料盒。",
      "在实现稳定流体输送的同时，延续美容产品的视觉语言。",
      "通过原型与原理图说明使用方式、补充流程和内部架构。",
    ],
    ja: [
      "手になじむ本体と美容液カートリッジの配置を検討。",
      "美容機器としての外観と、美容液を届ける仕組みを両立。",
      "試作品と構造図で使い方、補充方法、内部配置を示しました。",
    ],
  },
  "alicoffee-machine": {
    en: [
      "Coffee-machine capsule circuit based on a double-pass water path.",
      "Water moves out and back through the capsule during extraction.",
      "The project description is intentionally limited to this fluidic principle.",
    ],
    fr: [
      "Circuit capsule de machine à café basé sur un chemin d'eau double passage.",
      "L'eau fait un aller-retour dans la capsule pendant l'extraction.",
      "La description du projet reste volontairement limitée à ce principe fluidique.",
    ],
    de: [
      "Kapselsystem einer Kaffeemaschine mit zweifachem Wasserdurchlauf.",
      "Während der Extraktion wird das Wasser durch die Kapsel hin- und zurückgeführt.",
      "Die Projektbeschreibung beschränkt sich bewusst auf dieses Strömungsprinzip.",
    ],
    es: [
      "Circuito de cápsula para cafetera basado en un doble paso del agua.",
      "Durante la extracción, el agua recorre la cápsula en ambos sentidos.",
      "La descripción del proyecto se limita deliberadamente a este principio de circulación.",
    ],
    ko: [
      "물이 두 번 통과하는 캡슐 유로를 적용한 커피 머신 구조.",
      "추출 과정에서 물이 캡슐 내부를 왕복하도록 설계.",
      "프로젝트 설명은 이 유체 원리에 한정해 제공합니다.",
    ],
    zh: [
      "开发采用双程水路的咖啡机胶囊系统。",
      "萃取过程中，水流在胶囊内完成往返循环。",
      "项目介绍有意仅聚焦于这一流体原理。",
    ],
    ja: [
      "水が二度通る流路を設けたコーヒーカプセルの構想。",
      "抽出中、水はカプセル内を往復します。",
      "紹介するのは、この水の流れに関する仕組みです。",
    ],
  },
  "special-t-machine": {
    en: [
      "Brewing-unit development for a tea-capsule machine.",
      "Capsule holding, opening, detection, ejection and beverage-flow validation.",
      "Pilot-series support and vortex component work linked to WO2009135899.",
    ],
    fr: [
      "Développement de l'unité d'extraction pour une machine à capsules de thé.",
      "Validation du maintien, de l'ouverture, de la détection, de l'éjection et du flux boisson.",
      "Support présérie et composant à vortex relié au brevet WO2009135899.",
    ],
    de: [
      "Entwicklung der Brüheinheit für eine Teekapselmaschine.",
      "Validierung von Kapselaufnahme, Öffnung, Erkennung, Auswurf und Getränkefluss.",
      "Unterstützung der Vorserie und Entwicklung einer Wirbelkomponente im Zusammenhang mit WO2009135899.",
    ],
    es: [
      "Desarrollo de la unidad de infusión para una máquina de cápsulas de té.",
      "Validación de la sujeción, apertura, detección y expulsión de la cápsula, así como del flujo de bebida.",
      "Apoyo a la preserie y desarrollo de un componente de vórtice relacionado con WO2009135899.",
    ],
    ko: [
      "티 캡슐 머신의 추출 유닛 개발.",
      "캡슐 고정, 개방, 감지, 배출과 음료 흐름 검증.",
      "WO2009135899와 관련된 와류 부품 개발 및 파일럿 생산 지원.",
    ],
    zh: [
      "开发茶胶囊机的冲泡单元。",
      "验证胶囊固定、开启、识别、弹出以及饮品流动过程。",
      "支持试生产，并开发与 WO2009135899 相关的涡流部件。",
    ],
    ja: [
      "ティーカプセルマシンの抽出ユニットを開発。",
      "カプセルの保持・検知・開封・排出と、お茶の流れを検証。",
      "試験生産を支援し、特許 WO2009135899 に関連する渦流部品も検討しました。",
    ],
  },
  "instant-coffee-dispenser": {
    en: [
      "Complete machine development followed by an initial industrialization study.",
      "Low-cost architecture compatible with soluble coffees and a broad range of other soluble beverages.",
      "Espresso-style result and cappuccino preparation with milk kept outside the internal circuit to prevent contamination and residue buildup.",
      "Subsequently brought to market for a major coffee-machine brand.",
    ],
    fr: [
      "Développement complet de la machine, suivi d'une première étude d'industrialisation.",
      "Architecture économique compatible avec différents cafés solubles et de nombreuses autres boissons solubles.",
      "Résultat proche d'un espresso et préparation de cappuccinos sans passage de lait dans les conduites ni les composants internes, afin d'éviter contamination et résidus.",
      "Machine ensuite commercialisée pour une grande marque de machines à café.",
    ],
    de: [
      "Vollständige Entwicklung der Maschine mit anschließender erster Industrialisierungsstudie.",
      "Kostengünstige Architektur für unterschiedliche lösliche Kaffees und zahlreiche weitere lösliche Getränke.",
      "Espressoähnliches Ergebnis und Cappuccino-Zubereitung mit Milch ausserhalb des internen Kreislaufs, um Verunreinigungen und Rückstände zu vermeiden.",
      "Anschliessend für eine grosse Kaffeemaschinenmarke auf den Markt gebracht.",
    ],
    es: [
      "Desarrollo completo de la máquina, seguido de un primer estudio de industrialización.",
      "Arquitectura de bajo coste compatible con distintos cafés solubles y numerosas bebidas solubles.",
      "Resultado similar al espresso y preparación de capuchinos manteniendo la leche fuera del circuito interno para evitar contaminación y residuos.",
      "Posteriormente comercializada para una importante marca de máquinas de café.",
    ],
    ko: [
      "머신 전체 개발 후 초기 양산화 검토까지 수행.",
      "다양한 인스턴트 커피와 여러 종류의 용해성 음료를 지원하는 저비용 구조.",
      "에스프레소에 가까운 결과와 우유를 내부 회로 밖에 유지해 오염과 잔류물을 방지하는 카푸치노 제조 방식.",
      "이후 주요 커피머신 브랜드를 위해 상용화.",
    ],
    zh: [
      "完成整机开发，并开展首轮工业化研究。",
      "低成本架构兼容多种速溶咖啡和其他速溶饮品。",
      "实现接近意式浓缩咖啡的效果，并在制作卡布奇诺时让牛奶保持在内部回路之外，以避免污染和残留物。",
      "随后面向一家大型咖啡机品牌实现商业化。",
    ],
    ja: [
      "機械全体を開発し、初期の量産化検討を実施。",
      "さまざまなインスタントコーヒーや粉末飲料に対応する低コストの構造。",
      "エスプレッソに近い仕上がりを目指し、牛乳は内部配管に通さず残留物を抑えます。",
      "その後、大手コーヒーマシンブランド向けに製品化されました。",
    ],
  },
  "kitesurf-safety": {
    en: [
      "Design and drawing of the primary and secondary release components.",
      "Mechanical and rheological calculations for injection-moulded parts.",
      "Study of release force and production of prototypes.",
      "Supervision of injection moulding for the first production runs.",
    ],
    fr: [
      "Conception et dessin des pièces des sécurités primaires et secondaires.",
      "Calculs mécaniques et de rhéologie pour les pièces injectées.",
      "Étude de l’effort de déclenchement et réalisation de prototypes.",
      "Pilotage de l’injection des premières séries.",
    ],
    de: [
      "Konstruktion und Zeichnung der primären und sekundären Sicherheitskomponenten.",
      "Mechanische und rheologische Berechnungen der Spritzgussteile.",
      "Untersuchung der Auslösekraft und Herstellung von Prototypen.",
      "Betreuung des Spritzgusses der ersten Serien.",
    ],
    es: [
      "Diseño y dibujo de las piezas de los sistemas primarios y secundarios.",
      "Cálculos mecánicos y reológicos para las piezas inyectadas.",
      "Estudio de la fuerza de activación y fabricación de prototipos.",
      "Supervisión de la inyección de las primeras series.",
    ],
    ko: [
      "1차·2차 안전장치 부품 설계 및 도면 작성.",
      "사출 부품의 기계 및 유동 해석.",
      "작동력 검토 및 시제품 제작.",
      "초기 생산분의 사출 성형 관리.",
    ],
    zh: [
      "一级和二级安全装置零件的设计与制图。",
      "注塑零件的力学和流变计算。",
      "触发力研究与原型制作。",
      "管理首批产品的注塑生产。",
    ],
    ja: [
      "一次・二次の安全解除部品を設計し、図面を作成。",
      "射出成形部品の強度と樹脂の流れを計算。",
      "解除に必要な操作力を調べ、試作品を製作。",
      "初期生産での射出成形を監督しました。",
    ],
  },
  "eternal-watch": {
    en: [
      "Feasibility calculations for winding through temperature variations.",
      "Component design and dimensioning.",
      "Construction of a functional prototype.",
      "System performance testing.",
    ],
    fr: [
      "Calculs de faisabilité du remontage à partir des variations de température.",
      "Conception et dimensionnement des pièces.",
      "Réalisation d’un prototype fonctionnel.",
      "Essais de performance du système.",
    ],
    de: [
      "Machbarkeitsberechnungen zum Aufzug durch Temperaturschwankungen.",
      "Konstruktion und Dimensionierung der Bauteile.",
      "Bau eines Funktionsprototyps.",
      "Leistungstests des Systems.",
    ],
    es: [
      "Cálculos de viabilidad del remontaje mediante variaciones de temperatura.",
      "Diseño y dimensionamiento de las piezas.",
      "Fabricación de un prototipo funcional.",
      "Pruebas de rendimiento del sistema.",
    ],
    ko: [
      "온도 변화를 이용한 태엽 감기의 실현 가능성 계산.",
      "부품 설계 및 치수 산정.",
      "작동 시제품 제작.",
      "시스템 성능 시험.",
    ],
    zh: [
      "利用温度变化上弦的可行性计算。",
      "零件设计与尺寸计算。",
      "制作功能原型。",
      "系统性能测试。",
    ],
    ja: [
      "温度変化によるゼンマイ巻き上げの実現可能性を計算。",
      "部品を設計し、必要な寸法を決定。",
      "動作する試作品を製作。",
      "システムの性能を試験しました。",
    ],
  },
  "invisible-gear-train-bridge": {
    en: [
      "Design and calculation of the gear train bridge components.",
      "Selection of transparent materials and treatments to make the component invisible.",
      "Supervision of injection moulding for the first components.",
    ],
    fr: [
      "Conception et calcul des pièces du pont de rouage.",
      "Sélection des matériaux transparents et des traitements pour rendre la pièce invisible.",
      "Pilotage de l’injection des premières pièces.",
    ],
    de: [
      "Konstruktion und Berechnung der Komponenten der Räderwerksbrücke.",
      "Auswahl transparenter Materialien und Behandlungen, um das Bauteil unsichtbar zu machen.",
      "Betreuung des Spritzgusses der ersten Teile.",
    ],
    es: [
      "Diseño y cálculo de las piezas del puente de rodaje.",
      "Selección de materiales transparentes y tratamientos para hacer invisible la pieza.",
      "Supervisión de la inyección de las primeras piezas.",
    ],
    ko: [
      "기어 트레인 브리지 부품 설계 및 계산.",
      "부품을 보이지 않게 하는 투명 소재 및 처리 방법 선정.",
      "초기 부품의 사출 성형 관리.",
    ],
    zh: [
      "轮系夹板零件的设计与计算。",
      "选择透明材料及使零件隐形的处理工艺。",
      "管理首批零件的注塑生产。",
    ],
    ja: [
      "透明な輪列受けの設計と計算。",
      "部品を目立たなくする素材と表面処理を選定。",
      "最初の部品の射出成形を監督しました。",
    ],
  },
  "clepsydra": {
    en: [
      "Contribution to the water clock concept.",
      "Development and motorisation of the turning mechanism.",
      "Participation in half-scale prototyping.",
      "Functional testing.",
    ],
    fr: [
      "Participation à la définition du concept de la clepsydre.",
      "Développement et motorisation du système de retournement.",
      "Participation au prototypage à l’échelle 1/2.",
      "Réalisation de tests fonctionnels.",
    ],
    de: [
      "Mitwirkung an der Konzeptdefinition der Wasseruhr.",
      "Entwicklung und Motorisierung des Wendemechanismus.",
      "Mitwirkung am Prototyp im Massstab 1:2.",
      "Durchführung von Funktionstests.",
    ],
    es: [
      "Participación en la definición del concepto de la clepsidra.",
      "Desarrollo y motorización del sistema de volteo.",
      "Participación en el prototipado a escala 1:2.",
      "Realización de pruebas funcionales.",
    ],
    ko: [
      "물시계 개념 정의 참여.",
      "반전 장치 개발 및 전동화.",
      "1/2 축척 시제품 제작 참여.",
      "기능 시험 수행.",
    ],
    zh: [
      "参与水钟概念定义。",
      "翻转机构开发及电动驱动。",
      "参与1:2比例原型制作。",
      "进行功能测试。",
    ],
    ja: [
      "水時計のコンセプト検討に参加。",
      "回転機構を開発し、電動化。",
      "半分の大きさの試作品づくりに参加。",
      "動作試験を行いました。",
    ],
  },
  "transparent-clock": {
    en: [
      "Complete electrical and mechanical concept for a large transparent showcase clock.",
      "Transparent discs driven from the periphery to eliminate a visible central hand pivot.",
      "Atomic-clock connection for automatic time synchronization.",
      "Design-study coordination and functional prototype with injection-molded gear segments.",
    ],
    fr: [
      "Concept électrique et mécanique complet d’une grande horloge de vitrine transparente.",
      "Disques transparents entraînés en périphérie pour supprimer tout pivot central visible.",
      "Connexion à l’horloge atomique pour la synchronisation automatique de l’heure.",
      "Pilotage de l’étude de design et prototype fonctionnel avec segments de pignon injectés.",
    ],
    de: [
      "Vollständiges elektrisches und mechanisches Konzept für eine große transparente Schaufensteruhr.",
      "Am Umfang angetriebene transparente Scheiben ohne sichtbare zentrale Zeigerachse.",
      "Anbindung an die Atomuhr zur automatischen Zeitsynchronisation.",
      "Koordination der Designstudie und Funktionsprototyp mit spritzgegossenen Zahnsegmenten.",
    ],
    es: [
      "Concepto eléctrico y mecánico completo para un gran reloj de escaparate transparente.",
      "Discos transparentes accionados desde la periferia para eliminar el eje central visible.",
      "Conexión con reloj atómico para la sincronización automática de la hora.",
      "Coordinación del estudio de diseño y prototipo funcional con segmentos de engranaje inyectados.",
    ],
    ko: [
      "대형 투명 쇼윈도 시계를 위한 전체 전기·기계 콘셉트.",
      "중앙 바늘축을 보이지 않게 하는 원주 구동 투명 디스크.",
      "자동 시간 동기화를 위한 원자시계 연결.",
      "디자인 연구 주도와 사출 성형 기어 세그먼트를 적용한 기능성 프로토타입.",
    ],
    zh: [
      "完成大型透明橱窗时钟的整套电气与机械概念。",
      "通过圆周驱动透明圆盘，消除可见的中央指针转轴。",
      "连接原子钟，实现时间自动同步。",
      "统筹外观设计研究，并制作采用注塑齿轮分段的功能原型。",
    ],
    ja: [
      "大型の透明な展示時計について、電気・機械構造を一貫して設計。",
      "外周から駆動する透明円盤により、中央の針の軸を見せない仕組み。",
      "原子時計と接続し、時刻を自動で同期。",
      "設計検討を取りまとめ、射出成形の歯車部品を使って機能試作を製作。",
    ],
  },
  "velum-sky-screen": {
    en: [
      "Custom lifting system for the Velum Sky amphitheatre screen in Geneva.",
      "Guides concealed in the raised position to preserve the architectural view.",
      "Guidance, stiffness and drive engineered for a fully cantilevered screen during descent.",
    ],
    fr: [
      "Système de levage sur mesure pour l’écran de l’amphithéâtre Velum Sky à Genève.",
      "Guides dissimulés en position haute pour préserver la vue architecturale.",
      "Guidage, rigidité et mécanisme de levage conçus pour maîtriser l’écran entièrement en porte-à-faux pendant sa descente.",
    ],
    de: [
      "Massgeschneidertes Hebesystem für die Leinwand im Velum-Sky-Auditorium in Genf.",
      "In oberer Position verdeckte Führungen zum Erhalt der architektonischen Ansicht.",
      "Führung, Steifigkeit und Antrieb für eine beim Absenken vollständig auskragende Leinwand.",
    ],
    es: [
      "Sistema de elevación a medida para la pantalla del auditorio Velum Sky de Ginebra.",
      "Guías ocultas en la posición elevada para preservar la vista arquitectónica.",
      "Guiado, rigidez y accionamiento diseñados para una pantalla totalmente en voladizo durante el descenso.",
    ],
    ko: [
      "제네바 Velum Sky 강당 스크린을 위한 맞춤형 승강 시스템.",
      "건축적 시야를 유지하도록 상부 위치에서 숨겨지는 가이드.",
      "하강 중 완전히 캔틸레버 상태인 스크린을 위한 가이드, 강성 및 구동 설계.",
    ],
    zh: [
      "为日内瓦 Velum Sky 礼堂屏幕定制升降系统。",
      "导轨在升起位置保持隐藏，以保留建筑空间的视觉完整性。",
      "为下降过程中完全悬臂的屏幕设计导向、刚度和驱动系统。",
    ],
    ja: [
      "ジュネーブの Velum Sky 講堂向けに大型スクリーンの昇降装置を設計。",
      "スクリーンを上げた状態ではガイドを隠し、建築空間の見え方を保ちます。",
      "下降中に片持ちとなるスクリーンに合わせ、案内機構、剛性、駆動方式を設計しました。",
    ],
  },
};

const PROJECT_SECTOR_LABELS: Record<
  ProjectsLocale,
  Record<ProjectSectorKey, string>
> = {
  en: {
    mobility: "Mobility",
    household: "Household Products",
    medical: "Medical",
    watchmaking: "Watchmaking",
    building: "Building Systems",
    sport: "Sport & Outdoor",
    others: "Others",
  },
  fr: {
    mobility: "Mobilité",
    household: "Appareils ménagers",
    medical: "Médical",
    watchmaking: "Horlogerie",
    building: "Systèmes du bâtiment",
    sport: "Sport",
    others: "Autres",
  },
  de: {
    mobility: "Mobilität",
    household: "Haushaltsprodukte",
    medical: "Medizintechnik",
    watchmaking: "Uhrenindustrie",
    building: "Gebäudesysteme",
    sport: "Sport & Outdoor",
    others: "Sonstiges",
  },
  es: {
    mobility: "Movilidad",
    household: "Productos para el hogar",
    medical: "Tecnología médica",
    watchmaking: "Relojería",
    building: "Sistemas para edificios",
    sport: "Deporte y exterior",
    others: "Otros",
  },
  ko: {
    mobility: "모빌리티",
    household: "생활용품",
    medical: "의료기기",
    watchmaking: "시계 제조",
    building: "빌딩 시스템",
    sport: "스포츠·아웃도어",
    others: "기타",
  },
  zh: {
    mobility: "出行",
    household: "家居用品",
    medical: "医疗器械",
    watchmaking: "制表",
    building: "建筑系统",
    sport: "运动与户外",
    others: "其他",
  },
  ja: {
    mobility: "モビリティ",
    household: "家庭用品",
    medical: "医療機器",
    watchmaking: "時計製造",
    building: "建築設備",
    sport: "スポーツ・アウトドア",
    others: "その他",
  },
};

const PROJECT_COUNT_LABELS: Record<ProjectsLocale, string> = {
  en: "projects",
  fr: "projets",
  de: "Projekte",
  es: "proyectos",
  ko: "개 프로젝트",
  zh: "个项目",
  ja: "プロジェクト",
};

function withProjectScope(project: Project, locale: ProjectsLocale): Project {
  const localizedScope = PROJECT_SCOPES[project.id]?.[locale];

  return {
    ...project,
    category: project.filter
      ? PROJECT_SECTOR_LABELS[locale][project.filter]
      : project.category,
    scope:
      localizedScope ??
      (locale === "en" ? PROJECT_SCOPES[project.id]?.en : undefined),
  };
}

export function getProjectsForLocale(
  locale: string,
  options?: { includeHidden?: boolean },
) {
  const resolvedLocale = resolveProjectsLocale(locale);
  const overrides = PROJECT_OVERRIDES[resolvedLocale];

  const localizedProjects = ALL_PROJECTS.map((project) => {
    const localizedProject = localizeProject(project, overrides);
    const projectOverride = overrides[project.id];
    const projectWithLocalizedPatents = {
      ...localizedProject,
      relatedPatents: localizeRelatedPatents(
        localizedProject.relatedPatents,
        resolvedLocale,
        !projectOverride?.relatedPatents && resolvedLocale !== "en",
      ),
    };

    return withProjectScope(projectWithLocalizedPatents, resolvedLocale);
  });

  return options?.includeHidden
    ? localizedProjects
    : localizedProjects.filter(
        (project) => !project.hiddenFromCatalog && !project.temporarilyDisabled,
      );
}

export function getPatentLinkedProjectsForLocale(
  patentId: string,
  locale: string,
): Project[] {
  return getProjectsForLocale(locale).flatMap((project) => {
    const isLinked = project.relatedPatents?.some(
      (patent) => patent.patentId === patentId,
    );

    if (!isLinked) return [];

    return [project];
  });
}

function isProjectCategoryFilter(
  key: FilterKey,
): key is Exclude<FilterKey, "all"> {
  return key !== "all";
}

const ACTIVE_PROJECT_FILTER_KEYS = new Set<Exclude<FilterKey, "all">>(
  ALL_PROJECTS.flatMap((project) => (project.filter ? [project.filter] : [])),
);

function withActiveProjectFilters(filters: ProjectFilterOption[]) {
  return filters.filter(
    (filter) =>
      !isProjectCategoryFilter(filter.key) ||
      ACTIVE_PROJECT_FILTER_KEYS.has(filter.key),
  );
}

const PROJECTS_COPY: Record<ProjectsLocale, ProjectsPageCopy> = {
  en: {
    hero: {
      eyebrow: "Our work in action",
      title: "Projects",
      strong: "Swiss precision engineering",
      rest: "for real-world results.",
      lead: "Explore a selection of projects where we turn complex challenges into high-performance products.",
    },
    filters: withActiveProjectFilters(FILTERS),
    featuredProject: withProjectScope(FEATURED_PROJECT, "en"),
    projects: getProjectsForLocale("en"),
    stats: STATS,
    statsLabel: "Project statistics",
    selectedTitle: "Selected projects",
    resultsLabel: "projects shown",
    filtersLabel: "Filter projects",
    sort: {
      label: "Sort",
      options: [
        { key: "default", label: "Default" },
        { key: "date-desc", label: "Newest first" },
        { key: "date-asc", label: "Oldest first" },
        { key: "title-asc", label: "Title A-Z" },
        { key: "title-desc", label: "Title Z-A" },
      ],
    },
    searchLabel: "Search projects",
    searchPlaceholder: "Search...",
    noResults: "No projects match your search.",
    featuredLabel: "Featured project",
    viewCaseStudy: "View project",
    cardOpenDetails: "Open project details",
    modal: {
      close: "Close project details",
      openImage: "View image larger",
      closeImage: "Close enlarged image",
      previousImage: "Previous image",
      nextImage: "Next image",
      gallery: "Project images",
      overview: "Project overview",
      scope: "What we handled",
      tags: "Project tags",
      relatedPatents: "Related patents",
      area: "Area",
      focus: "Focus",
      output: "Output",
      design: "Design",
      prototype: "Prototype",
      openFullPage: "Open full project page",
    },
    cta: {
      eyebrow: "Let's build together",
      title: "Let's build what's next",
      bodyStrong: "Have a challenge in mind ?",
      body: "We partner with forward-thinking companies to design, prototype and deliver solutions that make a real impact.",
      button: "Start a project",
      subject: "Project enquiry",
    },
  },
  fr: {
    hero: {
      eyebrow: "Our work in action",
      title: "Projets",
      strong: "Ingénierie suisse de précision",
      rest: "pour des résultats concrets.",
      lead: "Découvrez une sélection de projets où nous transformons des défis complexes en produits performants.",
    },
    filters: withActiveProjectFilters(
      projectFiltersWithLabels({
        all: "Tous",
        mobility: "Mobilité",
        household: "Appareils ménagers",
        medical: "Médical",
        watchmaking: "Horlogerie",
        building: "Systèmes du bâtiment",
        sport: "Sport",
        others: "Autres",
      }),
    ),
    featuredProject: withProjectScope(
      localizeProject(FEATURED_PROJECT, FR_PROJECT_OVERRIDES),
      "fr",
    ),
    projects: getProjectsForLocale("fr"),
    stats: [
      {
        ...STATS[0],
        label: "Projets livrés",
        value: "100+",
      },
      { ...STATS[1] },
      { ...STATS[2] },
      {
        ...STATS[3],
        label: "Projets internationaux",
        value: "International",
      },
      {
        ...STATS[4],
        label: "Ingénierie suisse",
        value: "Depuis 1998",
      },
    ],
    statsLabel: "Statistiques des projets",
    selectedTitle: "Projets sélectionnés",
    resultsLabel: "projets affichés",
    filtersLabel: "Filtrer les projets",
    sort: {
      label: "Trier",
      options: [
        { key: "default", label: "Initial" },
        { key: "date-desc", label: "Plus récents" },
        { key: "date-asc", label: "Plus anciens" },
        { key: "title-asc", label: "Titre A-Z" },
        { key: "title-desc", label: "Titre Z-A" },
      ],
    },
    searchLabel: "Rechercher des projets",
    searchPlaceholder: "Rechercher...",
    noResults: "Aucun projet ne correspond à votre recherche.",
    featuredLabel: "Projet phare",
    viewCaseStudy: "Voir le projet",
    cardOpenDetails: "Ouvrir le détail du projet",
    modal: {
      close: "Fermer le détail du projet",
      openImage: "Voir l'image en grand",
      closeImage: "Fermer l'image agrandie",
      previousImage: "Image précédente",
      nextImage: "Image suivante",
      gallery: "Images du projet",
      overview: "Vue d'ensemble du projet",
      scope: "Travail réalisé",
      tags: "Tags du projet",
      relatedPatents: "Brevets liés",
      area: "Domaine",
      focus: "Focus",
      output: "Livrable",
      design: "Design",
      prototype: "Prototype",
      openFullPage: "Voir la fiche complète",
    },
    cta: {
      eyebrow: "Let's build together",
      title: "Let's build what's next",
      bodyStrong: "Vous avez un défi en tête ?",
      body: "Nous accompagnons les entreprises visionnaires pour concevoir, prototyper et concrétiser des solutions à fort impact.",
      button: "Démarrer un projet",
      subject: "Demande de projet",
    },
  },
  de: {
    hero: {
      eyebrow: "Our work in action",
      title: "Projekte",
      strong: "Schweizer Präzisionstechnik",
      rest: "für messbare Ergebnisse.",
      lead: "Entdecken Sie eine Auswahl von Projekten, in denen wir komplexe Herausforderungen in leistungsfähige Produkte verwandeln.",
    },
    filters: withActiveProjectFilters(
      projectFiltersWithLabels({
        all: "Alle",
        mobility: "Mobilität",
        household: "Haushaltsprodukte",
        medical: "Medizintechnik",
        watchmaking: "Uhrenindustrie",
        building: "Gebäudesysteme",
        sport: "Sport & Outdoor",
        others: "Sonstiges",
      }),
    ),
    featuredProject: withProjectScope(
      localizeProject(FEATURED_PROJECT, DE_PROJECT_OVERRIDES),
      "de",
    ),
    projects: getProjectsForLocale("de"),
    stats: [
      { ...STATS[0], label: "Gelieferte Projekte", value: "100+" },
      { ...STATS[1] },
      { ...STATS[2] },
      { ...STATS[3], label: "Internationale Projekte", value: "Weltweit" },
      {
        ...STATS[4],
        label: "Schweizer Ingenieurskunst",
        value: "Seit 1998",
      },
    ],
    statsLabel: "Projektstatistiken",
    selectedTitle: "Ausgewählte Projekte",
    resultsLabel: "Projekte angezeigt",
    filtersLabel: "Projekte filtern",
    sort: {
      label: "Sortieren",
      options: [
        { key: "default", label: "Standard" },
        { key: "date-desc", label: "Neueste zuerst" },
        { key: "date-asc", label: "Älteste zuerst" },
        { key: "title-asc", label: "Titel A-Z" },
        { key: "title-desc", label: "Titel Z-A" },
      ],
    },
    searchLabel: "Projekte suchen",
    searchPlaceholder: "Suchen...",
    noResults: "Keine Projekte entsprechen Ihrer Suche.",
    featuredLabel: "Ausgewähltes Projekt",
    viewCaseStudy: "Projekt ansehen",
    cardOpenDetails: "Projektdetails öffnen",
    modal: {
      close: "Projektdetails schließen",
      openImage: "Bild vergrößern",
      closeImage: "Vergrößertes Bild schließen",
      previousImage: "Vorheriges Bild",
      nextImage: "Nächstes Bild",
      gallery: "Projektbilder",
      overview: "Projektübersicht",
      scope: "Unser Beitrag",
      tags: "Projekt-Tags",
      relatedPatents: "Verknüpfte Patente",
      area: "Bereich",
      focus: "Fokus",
      output: "Ergebnis",
      design: "Design",
      prototype: "Prototyp",
      openFullPage: "Vollständige Projektseite öffnen",
    },
    cta: {
      eyebrow: "Let's build together",
      title: "Entwickeln wir die nächste Lösung",
      bodyStrong: "Haben Sie eine Herausforderung im Kopf?",
      body: "Wir arbeiten mit zukunftsorientierten Unternehmen zusammen, um Lösungen zu entwerfen, zu prototypisieren und zu liefern, die echte Wirkung entfalten.",
      button: "Projekt starten",
      subject: "Projektanfrage",
    },
  },
  es: {
    hero: {
      eyebrow: "Our work in action",
      title: "Proyectos",
      strong: "Ingeniería suiza de precisión",
      rest: "para resultados reales.",
      lead: "Explora una selección de proyectos en los que convertimos retos complejos en productos de alto rendimiento.",
    },
    filters: withActiveProjectFilters(
      projectFiltersWithLabels({
        all: "Todos",
        mobility: "Movilidad",
        household: "Productos para el hogar",
        medical: "Tecnología médica",
        watchmaking: "Relojería",
        building: "Sistemas para edificios",
        sport: "Deporte y exterior",
        others: "Otros",
      }),
    ),
    featuredProject: withProjectScope(
      localizeProject(FEATURED_PROJECT, ES_PROJECT_OVERRIDES),
      "es",
    ),
    projects: getProjectsForLocale("es"),
    stats: [
      { ...STATS[0], label: "Proyectos entregados", value: "100+" },
      { ...STATS[1] },
      { ...STATS[2] },
      { ...STATS[3], label: "Proyectos globales", value: "Internacional" },
      {
        ...STATS[4],
        label: "Ingeniería suiza",
        value: "Desde 1998",
      },
    ],
    statsLabel: "Estadísticas de proyectos",
    selectedTitle: "Proyectos seleccionados",
    resultsLabel: "proyectos mostrados",
    filtersLabel: "Filtrar proyectos",
    sort: {
      label: "Ordenar",
      options: [
        { key: "default", label: "Inicial" },
        { key: "date-desc", label: "Más recientes" },
        { key: "date-asc", label: "Más antiguos" },
        { key: "title-asc", label: "Título A-Z" },
        { key: "title-desc", label: "Título Z-A" },
      ],
    },
    searchLabel: "Buscar proyectos",
    searchPlaceholder: "Buscar...",
    noResults: "Ningún proyecto coincide con tu búsqueda.",
    featuredLabel: "Proyecto destacado",
    viewCaseStudy: "Ver proyecto",
    cardOpenDetails: "Abrir detalles del proyecto",
    modal: {
      close: "Cerrar detalles del proyecto",
      openImage: "Ver imagen ampliada",
      closeImage: "Cerrar imagen ampliada",
      previousImage: "Imagen anterior",
      nextImage: "Imagen siguiente",
      gallery: "Imágenes del proyecto",
      overview: "Resumen del proyecto",
      scope: "Trabajo realizado",
      tags: "Etiquetas del proyecto",
      relatedPatents: "Patentes relacionadas",
      area: "Área",
      focus: "Foco",
      output: "Resultado",
      design: "Diseño",
      prototype: "Prototipo",
      openFullPage: "Ver la ficha completa",
    },
    cta: {
      eyebrow: "Let's build together",
      title: "Demos forma al próximo proyecto",
      bodyStrong: "¿Tienes un reto en mente?",
      body: "Colaboramos con empresas visionarias para diseñar, prototipar y entregar soluciones con impacto real.",
      button: "Iniciar un proyecto",
      subject: "Consulta de proyecto",
    },
  },
  ko: {
    hero: {
      eyebrow: "Our work in action",
      title: "프로젝트",
      strong: "스위스 정밀 엔지니어링",
      rest: "으로 실질적인 성과를 만듭니다.",
      lead: "복잡한 과제를 고성능 제품으로 바꾼 프로젝트를 살펴보세요.",
    },
    filters: withActiveProjectFilters(
      projectFiltersWithLabels({
        all: "전체",
        mobility: "모빌리티",
        household: "생활용품",
        medical: "의료기기",
        watchmaking: "시계 제조",
        building: "빌딩 시스템",
        sport: "스포츠·아웃도어",
        others: "기타",
      }),
    ),
    featuredProject: withProjectScope(
      localizeProject(FEATURED_PROJECT, KO_PROJECT_OVERRIDES),
      "ko",
    ),
    projects: getProjectsForLocale("ko"),
    stats: [
      { ...STATS[0], label: "완료한 프로젝트", value: "100+" },
      { ...STATS[1] },
      { ...STATS[2] },
      { ...STATS[3], label: "글로벌 프로젝트", value: "전 세계" },
      {
        ...STATS[4],
        label: "스위스 엔지니어링",
        value: "1998년부터",
      },
    ],
    statsLabel: "프로젝트 통계",
    selectedTitle: "선정 프로젝트",
    resultsLabel: "개 프로젝트",
    filtersLabel: "프로젝트 필터",
    sort: {
      label: "정렬",
      options: [
        { key: "default", label: "기본 순서" },
        { key: "date-desc", label: "최신순" },
        { key: "date-asc", label: "오래된순" },
        { key: "title-asc", label: "제목 A-Z" },
        { key: "title-desc", label: "제목 Z-A" },
      ],
    },
    searchLabel: "프로젝트 검색",
    searchPlaceholder: "검색...",
    noResults: "검색 조건에 맞는 프로젝트가 없습니다.",
    featuredLabel: "추천 프로젝트",
    viewCaseStudy: "프로젝트 보기",
    cardOpenDetails: "프로젝트 상세 열기",
    modal: {
      close: "프로젝트 상세 닫기",
      openImage: "이미지 크게 보기",
      closeImage: "확대 이미지 닫기",
      previousImage: "이전 이미지",
      nextImage: "다음 이미지",
      gallery: "프로젝트 이미지",
      overview: "프로젝트 개요",
      scope: "담당 범위",
      tags: "프로젝트 태그",
      relatedPatents: "관련 특허",
      area: "분야",
      focus: "초점",
      output: "결과물",
      design: "디자인",
      prototype: "프로토타입",
      openFullPage: "전체 프로젝트 페이지 보기",
    },
    cta: {
      eyebrow: "Let's build together",
      title: "다음 솔루션을 함께 개발합니다",
      bodyStrong: "구상 중인 과제가 있으신가요?",
      body: "미래지향적인 기업과 함께 실질적인 가치를 만드는 솔루션을 설계하고 프로토타입으로 검증해 실현합니다.",
      button: "프로젝트 시작",
      subject: "프로젝트 문의",
    },
  },
  zh: {
    hero: {
      eyebrow: "Our work in action",
      title: "项目",
      strong: "瑞士精密工程",
      rest: "成就可靠成果。",
      lead: "探索一组选定项目，了解我们如何把复杂挑战转化为高性能产品。",
    },
    filters: withActiveProjectFilters(
      projectFiltersWithLabels({
        all: "全部",
        mobility: "出行",
        household: "家居用品",
        medical: "医疗器械",
        watchmaking: "制表",
        building: "建筑系统",
        sport: "运动与户外",
        others: "其他",
      }),
    ),
    featuredProject: withProjectScope(
      localizeProject(FEATURED_PROJECT, ZH_PROJECT_OVERRIDES),
      "zh",
    ),
    projects: getProjectsForLocale("zh"),
    stats: [
      { ...STATS[0], label: "交付项目", value: "100+" },
      { ...STATS[1] },
      { ...STATS[2] },
      { ...STATS[3], label: "国际项目", value: "全球" },
      {
        ...STATS[4],
        label: "瑞士工程",
        value: "始于 1998",
      },
    ],
    statsLabel: "项目统计",
    selectedTitle: "精选项目",
    resultsLabel: "个项目",
    filtersLabel: "筛选项目",
    sort: {
      label: "排序",
      options: [
        { key: "default", label: "默认顺序" },
        { key: "date-desc", label: "最新优先" },
        { key: "date-asc", label: "最早优先" },
        { key: "title-asc", label: "标题 A-Z" },
        { key: "title-desc", label: "标题 Z-A" },
      ],
    },
    searchLabel: "搜索项目",
    searchPlaceholder: "搜索...",
    noResults: "没有符合搜索条件的项目。",
    featuredLabel: "重点项目",
    viewCaseStudy: "查看项目",
    cardOpenDetails: "打开项目详情",
    modal: {
      close: "关闭项目详情",
      openImage: "放大查看图片",
      closeImage: "关闭放大图片",
      previousImage: "上一张图片",
      nextImage: "下一张图片",
      gallery: "项目图片",
      overview: "项目概览",
      scope: "我们负责的工作",
      tags: "项目标签",
      relatedPatents: "相关专利",
      area: "领域",
      focus: "重点",
      output: "成果",
      design: "设计",
      prototype: "原型",
      openFullPage: "查看完整项目页面",
    },
    cta: {
      eyebrow: "Let's build together",
      title: "共同开发下一项解决方案",
      bodyStrong: "有想解决的挑战吗？",
      body: "我们与具有前瞻性的企业合作，设计、原型验证并交付真正产生影响的解决方案。",
      button: "启动项目",
      subject: "项目咨询",
    },
  },
  ja: {
    hero: {
      eyebrow: "ものづくりの実績",
      title: "プロジェクト",
      strong: "スイスの精密エンジニアリング",
      rest: "確かな成果へ。",
      lead: "複雑な課題を高性能な製品に変えたプロジェクトをご紹介します。",
    },
    filters: withActiveProjectFilters(
      projectFiltersWithLabels({
        all: "すべて",
        mobility: "モビリティ",
        household: "家庭用品",
        medical: "医療機器",
        watchmaking: "時計製造",
        building: "建築設備",
        sport: "スポーツ・アウトドア",
        others: "その他",
      }),
    ),
    featuredProject: withProjectScope(
      localizeProject(FEATURED_PROJECT, JA_PROJECT_OVERRIDES),
      "ja",
    ),
    projects: getProjectsForLocale("ja"),
    stats: [
      { ...STATS[0], label: "手がけたプロジェクト", value: "100+" },
      { ...STATS[1], label: "プロジェクト支援", value: "一貫対応" },
      { ...STATS[2], label: "エンジニアリング", value: "多分野に対応" },
      { ...STATS[3], label: "国際プロジェクト", value: "グローバル" },
      {
        ...STATS[4],
        label: "スイスエンジニアリング",
        value: "1998年から",
      },
    ],
    statsLabel: "プロジェクト統計",
    selectedTitle: "主なプロジェクト",
    resultsLabel: "件のプロジェクト",
    filtersLabel: "プロジェクトを絞り込む",
    sort: {
      label: "並べ替える",
      options: [
        { key: "default", label: "デフォルトの順序" },
        { key: "date-desc", label: "最新順" },
        { key: "date-asc", label: "古い順" },
        { key: "title-asc", label: "名前 A–Z" },
        { key: "title-desc", label: "名前 Z–A" },
      ],
    },
    searchLabel: "プロジェクトを検索",
    searchPlaceholder: "検索...",
    noResults: "条件に一致するプロジェクトはありません。",
    featuredLabel: "注目のプロジェクト",
    viewCaseStudy: "プロジェクトを見る",
    cardOpenDetails: "プロジェクトの詳細を開く",
    modal: {
      close: "プロジェクトの詳細を閉じる",
      openImage: "拡大して画像を表示",
      closeImage: "拡大画像を閉じる",
      previousImage: "前の写真",
      nextImage: "次の写真",
      gallery: "プロジェクト画像",
      overview: "プロジェクト概要",
      scope: "担当した内容",
      tags: "プロジェクトタグ",
      relatedPatents: "関連特許",
      area: "分野",
      focus: "重点",
      output: "成果",
      design: "設計",
      prototype: "試作",
      openFullPage: "プロジェクトページ全体を表示",
    },
    cta: {
      eyebrow: "一緒につくりましょう",
      title: "次のアイデアを形にしませんか",
      bodyStrong: "解決したい課題はありますか？",
      body: "企業とともに、実際に役立つ解決策を設計・試作し、製品へとつなげます。",
      button: "プロジェクトを相談する",
      subject: "プロジェクトの相談",
    },
  },
};

const MODAL_TRANSITION_MS = 320;
const MODAL_CLOSE_FALLBACK_MS = 360;
const PROJECT_HORIZONTAL_SCROLL_SELECTOR =
  "[data-project-dialog-horizontal-scroll]";
export const PROJECT_DETAIL_HASH_PREFIX = "project-";

function canScrollHorizontally(container: HTMLElement, deltaX: number) {
  const maxScrollLeft = container.scrollWidth - container.clientWidth;
  if (maxScrollLeft <= 0) return false;
  if (deltaX < 0) return container.scrollLeft > 0;
  if (deltaX > 0) return container.scrollLeft < maxScrollLeft - 1;
  return true;
}

function scrollHorizontalTrackFromWheel(
  event: WheelEvent,
  container: HTMLElement,
) {
  const delta =
    Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ? event.deltaX
      : event.deltaY;

  if (!delta || !canScrollHorizontally(container, delta)) return false;

  const maxScrollLeft = container.scrollWidth - container.clientWidth;
  container.scrollLeft = Math.max(
    0,
    Math.min(container.scrollLeft + delta, maxScrollLeft),
  );

  return true;
}

export function getProjectsPageCopy(locale: string) {
  return PROJECTS_COPY[resolveProjectsLocale(locale)];
}

function getProjectSortYear(project: Project) {
  const explicitYear = PROJECT_SORT_YEARS[project.id];
  if (explicitYear) return explicitYear;

  const yearTag = project.tags.find((tag) => /^#(?:19|20)\d{2}$/.test(tag));
  return yearTag ? Number(yearTag.slice(1)) : 0;
}

function compareProjectTitles(a: Project, b: Project, locale: ProjectsLocale) {
  return new Intl.Collator(locale, {
    numeric: true,
    sensitivity: "base",
  }).compare(a.title, b.title);
}

function sortProjects(
  projects: Project[],
  sortKey: ProjectSortKey,
  locale: ProjectsLocale,
) {
  const withIndex = projects.map((project, index) => ({ project, index }));

  return withIndex
    .sort((a, b) => {
      switch (sortKey) {
        case "date-desc": {
          const yearOrder =
            getProjectSortYear(b.project) - getProjectSortYear(a.project);
          if (yearOrder !== 0) return yearOrder;

          return a.index - b.index;
        }
        case "date-asc": {
          const yearOrder =
            getProjectSortYear(a.project) - getProjectSortYear(b.project);
          if (yearOrder !== 0) return yearOrder;

          return a.index - b.index;
        }
        case "title-asc":
          return compareProjectTitles(a.project, b.project, locale);
        case "title-desc":
          return compareProjectTitles(b.project, a.project, locale);
        case "default":
        default:
          return a.index - b.index;
      }
    })
    .map(({ project }) => project);
}

function centeredPanelRect(): PanelRect {
  const isMobile = window.innerWidth <= 640;
  const pad = isMobile ? 14 : 34;
  const maxWidth =
    window.innerWidth >= 2400 ? 2040 : window.innerWidth >= 1800 ? 1680 : 880;
  const maxHeight =
    window.innerWidth >= 2400 ? 1180 : window.innerWidth >= 1800 ? 980 : 720;
  const width = Math.min(maxWidth, window.innerWidth - pad * 2);
  const height = Math.min(maxHeight, window.innerHeight - pad * 2);

  return {
    left: (window.innerWidth - width) / 2,
    top: (window.innerHeight - height) / 2,
    width,
    height,
    radius: isMobile ? "16px" : window.innerWidth >= 1800 ? "26px" : "22px",
  };
}

function ProjectImageLightbox({
  image,
  alt,
  closeLabel,
  previousLabel,
  nextLabel,
  hasMultiple,
  onClose,
  onPrevious,
  onNext,
}: {
  image: string;
  alt: string;
  closeLabel: string;
  previousLabel: string;
  nextLabel: string;
  hasMultiple: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const [viewerState, setViewerState] = useState({
    image,
    offsetX: 0,
    offsetY: 0,
    zoom: 1,
  });
  const activePointersRef = useRef<Map<number, { x: number; y: number }>>(
    new Map(),
  );
  const panRef = useRef<{
    pointerId: number;
    x: number;
    y: number;
  } | null>(null);
  const pinchRef = useRef<{
    distance: number;
    centerX: number;
    centerY: number;
    offsetX: number;
    offsetY: number;
    zoom: number;
  } | null>(null);
  const swipeRef = useRef<{
    pointerId: number;
    x: number;
    y: number;
    used: boolean;
  } | null>(null);

  const currentViewerState =
    viewerState.image === image
      ? viewerState
      : { image, offsetX: 0, offsetY: 0, zoom: 1 };
  const { offsetX, offsetY, zoom } = currentViewerState;
  const imageStyle = {
    transform: `translate3d(${offsetX}px, ${offsetY}px, 0) scale(${zoom})`,
  } satisfies CSSProperties;

  const updateViewerState = useCallback(
    (nextState: Omit<typeof viewerState, "image">) => {
      setViewerState({
        image,
        ...nextState,
      });
    },
    [image],
  );

  const clampZoom = useCallback(
    (value: number) => Math.min(3, Math.max(1, Number(value.toFixed(2)))),
    [],
  );

  const getPinchGesture = useCallback(() => {
    const [first, second] = Array.from(activePointersRef.current.values());
    if (!first || !second) return null;

    const deltaX = second.x - first.x;
    const deltaY = second.y - first.y;

    return {
      centerX: (first.x + second.x) / 2,
      centerY: (first.y + second.y) / 2,
      distance: Math.hypot(deltaX, deltaY),
    };
  }, []);

  const getZoomedOffset = useCallback(
    (
      element: HTMLDivElement,
      clientX: number,
      clientY: number,
      startZoom: number,
      nextZoom: number,
      startOffsetX: number,
      startOffsetY: number,
    ) => {
      if (nextZoom <= 1) return { offsetX: 0, offsetY: 0 };

      const rect = element.getBoundingClientRect();
      const focalX = clientX - rect.left;
      const focalY = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const zoomRatio = nextZoom / Math.max(startZoom, 0.01);

      return {
        offsetX:
          startOffsetX + (focalX - centerX - startOffsetX) * (1 - zoomRatio),
        offsetY:
          startOffsetY + (focalY - centerY - startOffsetY) * (1 - zoomRatio),
      };
    },
    [],
  );

  const handleWheelZoom = useCallback(
    (event: ReactWheelEvent<HTMLDivElement>) => {
      if (!event.ctrlKey && !event.metaKey) return;

      event.preventDefault();
      event.stopPropagation();

      const normalizedDelta = Math.max(-18, Math.min(18, event.deltaY));
      const nextZoom = clampZoom(zoom * Math.exp(-normalizedDelta * 0.01));
      if (nextZoom === zoom) return;

      updateViewerState({
        ...getZoomedOffset(
          event.currentTarget,
          event.clientX,
          event.clientY,
          zoom,
          nextZoom,
          offsetX,
          offsetY,
        ),
        zoom: nextZoom,
      });
    },
    [clampZoom, getZoomedOffset, offsetX, offsetY, updateViewerState, zoom],
  );

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      activePointersRef.current.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
      });
      event.currentTarget.setPointerCapture(event.pointerId);

      if (activePointersRef.current.size >= 2) {
        event.preventDefault();
        panRef.current = null;
        swipeRef.current = null;
        const pinch = getPinchGesture();
        if (pinch) {
          pinchRef.current = {
            ...pinch,
            offsetX,
            offsetY,
            zoom,
          };
        }
        return;
      }

      swipeRef.current = {
        pointerId: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        used: false,
      };

      if (zoom <= 1) return;

      event.preventDefault();
      panRef.current = {
        pointerId: event.pointerId,
        x: event.clientX,
        y: event.clientY,
      };
    },
    [getPinchGesture, offsetX, offsetY, zoom],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (activePointersRef.current.has(event.pointerId)) {
        activePointersRef.current.set(event.pointerId, {
          x: event.clientX,
          y: event.clientY,
        });
      }

      const pinch = getPinchGesture();
      if (activePointersRef.current.size >= 2 && pinch) {
        event.preventDefault();
        if (!pinchRef.current) {
          pinchRef.current = {
            ...pinch,
            offsetX,
            offsetY,
            zoom,
          };
          return;
        }

        const start = pinchRef.current;
        if (start.distance <= 0) return;

        const nextZoom = clampZoom(
          start.zoom * (pinch.distance / start.distance),
        );
        const rect = event.currentTarget.getBoundingClientRect();
        const startFocalX = start.centerX - rect.left;
        const startFocalY = start.centerY - rect.top;
        const focalX = pinch.centerX - rect.left;
        const focalY = pinch.centerY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const zoomRatio = nextZoom / Math.max(start.zoom, 0.01);

        updateViewerState({
          offsetX:
            nextZoom === 1
              ? 0
              : focalX -
                centerX -
                zoomRatio * (startFocalX - centerX - start.offsetX),
          offsetY:
            nextZoom === 1
              ? 0
              : focalY -
                centerY -
                zoomRatio * (startFocalY - centerY - start.offsetY),
          zoom: nextZoom,
        });
        return;
      }

      const pan = panRef.current;
      if (!pan || pan.pointerId !== event.pointerId) return;

      event.preventDefault();
      const deltaX = event.clientX - pan.x;
      const deltaY = event.clientY - pan.y;
      panRef.current = {
        ...pan,
        x: event.clientX,
        y: event.clientY,
      };
      setViewerState((current) => {
        const base =
          current.image === image
            ? current
            : { image, offsetX: 0, offsetY: 0, zoom: 1 };

        return {
          ...base,
          offsetX: base.offsetX + deltaX,
          offsetY: base.offsetY + deltaY,
        };
      });
    },
    [
      clampZoom,
      getPinchGesture,
      image,
      offsetX,
      offsetY,
      updateViewerState,
      zoom,
    ],
  );

  const handlePointerEnd = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      activePointersRef.current.delete(event.pointerId);
      if (activePointersRef.current.size < 2) {
        pinchRef.current = null;
      }

      const pan = panRef.current;
      if (pan?.pointerId === event.pointerId) {
        panRef.current = null;
      }

      const swipe = swipeRef.current;
      if (
        swipe?.pointerId === event.pointerId &&
        !swipe.used &&
        zoom <= 1 &&
        hasMultiple &&
        event.pointerType === "touch"
      ) {
        const deltaX = swipe.x - event.clientX;
        const deltaY = swipe.y - event.clientY;
        if (Math.abs(deltaX) > 42 && Math.abs(deltaX) > Math.abs(deltaY)) {
          swipeRef.current = { ...swipe, used: true };
          if (deltaX > 0) {
            onNext();
          } else {
            onPrevious();
          }
        }
      }

      if (swipe?.pointerId === event.pointerId) {
        swipeRef.current = null;
      }

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    },
    [hasMultiple, onNext, onPrevious, zoom],
  );

  return (
    <div
      className="fixed inset-0 z-[40] grid place-items-center bg-black/82 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={closeLabel}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full border border-white/25 bg-white text-foreground shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        aria-label={closeLabel}
        onClick={onClose}
      >
        <X className="size-5" aria-hidden />
      </button>
      {hasMultiple && (
        <>
          <button
            type="button"
            className="absolute left-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white text-foreground shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 md:left-6 md:size-12"
            aria-label={previousLabel}
            onClick={(event) => {
              event.stopPropagation();
              onPrevious();
            }}
          >
            <ChevronLeft className="size-6" aria-hidden />
          </button>
          <button
            type="button"
            className="absolute right-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white text-foreground shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 md:right-6 md:size-12"
            aria-label={nextLabel}
            onClick={(event) => {
              event.stopPropagation();
              onNext();
            }}
          >
            <ChevronRight className="size-6" aria-hidden />
          </button>
        </>
      )}
      <div
        data-project-image-zoom
        data-lenis-prevent
        className={cn(
          PROJECT_LIGHTBOX_FRAME_CLASS,
          "overflow-hidden select-none",
          zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in",
        )}
        style={{ touchAction: "none" }}
        onClick={(event) => event.stopPropagation()}
        onDoubleClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          const nextZoom = zoom > 1 ? 1 : 2;
          updateViewerState({
            ...getZoomedOffset(
              event.currentTarget,
              event.clientX,
              event.clientY,
              zoom,
              nextZoom,
              offsetX,
              offsetY,
            ),
            zoom: nextZoom,
          });
        }}
        onWheel={handleWheelZoom}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <Image
          src={image}
          alt={alt}
          fill
          draggable={false}
          sizes={PROJECT_LIGHTBOX_IMAGE_SIZES}
          style={imageStyle}
          className="object-contain"
        />
      </div>
    </div>
  );
}

export function ProjectDetailsDialog({
  modal,
  onClosed,
  project,
}: {
  modal: ProjectModalCopy;
  onClosed: () => void;
  project: Project;
}) {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(
    null,
  );
  const [dialogState, setDialogState] = useState<
    "opening" | "open" | "closing"
  >("opening");
  const [panelRect, setPanelRect] = useState<PanelRect>(() =>
    centeredPanelRect(),
  );
  const panelRef = useRef<HTMLElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const lockedScrollYRef = useRef(0);

  const projectGallery = useMemo(() => getProjectGallery(project), [project]);
  const activeGalleryImage =
    projectGallery[
      Math.min(activeGalleryIndex, Math.max(projectGallery.length - 1, 0))
    ] ?? project.image;
  const expandedImage =
    expandedImageIndex === null
      ? null
      : (projectGallery[expandedImageIndex] ?? activeGalleryImage);

  const showExpandedImageAt = useCallback(
    (index: number) => {
      if (!projectGallery.length) return;

      const nextIndex =
        ((index % projectGallery.length) + projectGallery.length) %
        projectGallery.length;
      setActiveGalleryIndex(nextIndex);
      setExpandedImageIndex(nextIndex);
    },
    [projectGallery.length],
  );

  const showPreviousExpandedImage = useCallback(() => {
    if (expandedImageIndex === null) return;
    showExpandedImageAt(expandedImageIndex - 1);
  }, [expandedImageIndex, showExpandedImageAt]);

  const showNextExpandedImage = useCallback(() => {
    if (expandedImageIndex === null) return;
    showExpandedImageAt(expandedImageIndex + 1);
  }, [expandedImageIndex, showExpandedImageAt]);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const finishClose = useCallback(() => {
    clearCloseTimer();
    setExpandedImageIndex(null);
    previousFocusRef.current?.focus?.({ preventScroll: true });
    previousFocusRef.current = null;
    onClosed();
  }, [clearCloseTimer, onClosed]);

  const closeProject = useCallback(() => {
    if (dialogState === "closing") return;

    clearCloseTimer();
    setDialogState("closing");
    closeTimerRef.current = window.setTimeout(
      finishClose,
      MODAL_CLOSE_FALLBACK_MS,
    );
  }, [clearCloseTimer, dialogState, finishClose]);

  useEffect(() => {
    lockedScrollYRef.current = window.scrollY;
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setDialogState("open");
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const { body, documentElement } = document;
    const previousBodyStyles = {
      overscrollBehavior: body.style.overscrollBehavior,
    };
    const previousDocumentStyles = {
      overflowY: documentElement.style.overflowY,
      overscrollBehavior: documentElement.style.overscrollBehavior,
    };
    const scrollEventOptions = {
      capture: true,
      passive: false,
    } satisfies AddEventListenerOptions;
    let touchStartX = 0;
    let touchStartY = 0;

    const canScrollWithin = (container: HTMLElement, deltaY: number) => {
      const maxScrollTop = container.scrollHeight - container.clientHeight;
      if (maxScrollTop <= 0) return false;
      if (deltaY < 0) return container.scrollTop > 0;
      if (deltaY > 0) return container.scrollTop < maxScrollTop - 1;
      return true;
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0]?.clientX ?? 0;
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const preventBackgroundScroll = (event: Event) => {
      const horizontalScrollContainer =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(
              PROJECT_HORIZONTAL_SCROLL_SELECTOR,
            )
          : null;
      const zoomContainer =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(PROJECT_IMAGE_ZOOM_SELECTOR)
          : null;
      const scrollContainer =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(
              "[data-project-dialog-scroll], [data-patent-dialog-scroll]",
            )
          : null;
      const deltaY =
        event instanceof WheelEvent
          ? event.deltaY
          : event instanceof TouchEvent
            ? touchStartY - (event.touches[0]?.clientY ?? touchStartY)
            : 0;

      if (zoomContainer) return;

      if (horizontalScrollContainer) {
        if (
          event instanceof WheelEvent &&
          scrollHorizontalTrackFromWheel(event, horizontalScrollContainer)
        ) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }

        if (event instanceof TouchEvent) {
          const currentX = event.touches[0]?.clientX ?? touchStartX;
          const currentY = event.touches[0]?.clientY ?? touchStartY;
          const deltaX = touchStartX - currentX;
          const touchDeltaY = touchStartY - currentY;

          if (
            Math.abs(deltaX) > Math.abs(touchDeltaY) &&
            canScrollHorizontally(horizontalScrollContainer, deltaX)
          ) {
            event.stopPropagation();
            return;
          }
        }
      }

      if (scrollContainer && canScrollWithin(scrollContainer, deltaY)) {
        event.stopPropagation();
        return;
      }

      event.preventDefault();
      event.stopPropagation();
    };

    window.dispatchEvent(
      new CustomEvent("domtek:scroll-lock", { detail: { locked: true } }),
    );
    body.style.overscrollBehavior = "none";
    documentElement.style.overflowY = "scroll";
    documentElement.style.overscrollBehavior = "none";
    window.addEventListener("touchstart", onTouchStart, {
      capture: true,
      passive: true,
    });
    window.addEventListener(
      "wheel",
      preventBackgroundScroll,
      scrollEventOptions,
    );
    window.addEventListener(
      "touchmove",
      preventBackgroundScroll,
      scrollEventOptions,
    );

    return () => {
      window.removeEventListener("touchstart", onTouchStart, {
        capture: true,
      });
      window.removeEventListener(
        "wheel",
        preventBackgroundScroll,
        scrollEventOptions,
      );
      window.removeEventListener(
        "touchmove",
        preventBackgroundScroll,
        scrollEventOptions,
      );
      body.style.overscrollBehavior = previousBodyStyles.overscrollBehavior;
      documentElement.style.overflowY = previousDocumentStyles.overflowY;
      documentElement.style.overscrollBehavior =
        previousDocumentStyles.overscrollBehavior;
      const restoreScrollY = window.scrollY || lockedScrollYRef.current;
      window.scrollTo(window.scrollX, restoreScrollY);
      window.dispatchEvent(
        new CustomEvent("domtek:scroll-lock", {
          detail: { locked: false, scrollY: restoreScrollY },
        }),
      );
    };
  }, []);

  useEffect(() => {
    if (dialogState !== "open") return;

    const focusTimer = window.setTimeout(() => {
      panelRef.current?.focus({ preventScroll: true });
    }, MODAL_TRANSITION_MS);

    return () => window.clearTimeout(focusTimer);
  }, [dialogState]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (expandedImageIndex !== null) {
        if (event.key === "Escape") {
          setExpandedImageIndex(null);
          return;
        }

        if (projectGallery.length > 1 && event.key === "ArrowLeft") {
          event.preventDefault();
          showPreviousExpandedImage();
          return;
        }

        if (projectGallery.length > 1 && event.key === "ArrowRight") {
          event.preventDefault();
          showNextExpandedImage();
        }

        return;
      }

      if (event.key === "Escape") {
        closeProject();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.getClientRects().length > 0,
      );

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    closeProject,
    expandedImageIndex,
    projectGallery.length,
    showNextExpandedImage,
    showPreviousExpandedImage,
  ]);

  useEffect(() => {
    if (dialogState !== "open") return;

    const onResize = () => setPanelRect(centeredPanelRect());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [dialogState]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  const panelStyle = {
    left: panelRect.left,
    top: panelRect.top,
    width: Math.max(panelRect.width, 1),
    height: Math.max(panelRect.height, 1),
    borderRadius: panelRect.radius,
    transformOrigin: "50% 50%",
  } satisfies CSSProperties;

  const contentVisible = dialogState !== "closing";
  const backdropVisible = dialogState === "open";
  const panelVisible = dialogState === "open";

  return (
    <>
      <div className="fixed inset-0 z-[1000]">
        <button
          type="button"
          tabIndex={-1}
          className={cn(
            "absolute inset-0 cursor-default bg-black/55 backdrop-blur-[7px] transition-opacity duration-200 ease-out",
            backdropVisible ? "opacity-100" : "opacity-0",
          )}
          aria-label={modal.close}
          onClick={closeProject}
        />

        <section
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dialog-title"
          tabIndex={-1}
          style={panelStyle}
          className={cn(
            "fixed transform-gpu overflow-hidden bg-white shadow-[0_34px_110px_rgba(0,0,0,0.26)] outline-none transition-[opacity,transform] duration-300 ease-out will-change-transform",
            panelVisible
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-4 scale-[0.975] opacity-0",
          )}
        >
          <button
            type="button"
            className={cn(
              "absolute right-4 top-4 z-20 grid size-10 place-items-center rounded-full border border-border bg-white/95 text-foreground transition duration-200 hover:rotate-6 hover:scale-105 focus-visible:ring-2 focus-visible:ring-brand/30 min-[1800px]:right-8 min-[1800px]:top-8 min-[1800px]:size-14 min-[2400px]:size-16",
              contentVisible ? "opacity-100" : "opacity-0",
            )}
            aria-label={modal.close}
            onClick={closeProject}
          >
            <X
              className="size-4 min-[1800px]:size-6 min-[2400px]:size-7"
              aria-hidden
            />
          </button>

          <div
            className={cn(
              "grid h-full md:grid-cols-[46%_54%] min-[1800px]:grid-cols-[48%_52%]",
              !contentVisible && "pointer-events-none",
            )}
          >
            <div className="flex min-h-[280px] flex-col overflow-hidden bg-muted md:min-h-0">
              <button
                type="button"
                className="relative min-h-[210px] flex-1 cursor-zoom-in overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/35 min-[1800px]:min-h-[620px] min-[2400px]:min-h-[740px]"
                aria-label={modal.openImage}
                onClick={() =>
                  setExpandedImageIndex(
                    Math.min(
                      activeGalleryIndex,
                      Math.max(projectGallery.length - 1, 0),
                    ),
                  )
                }
              >
                <Image
                  src={activeGalleryImage}
                  alt={project.imageAlt}
                  fill
                  sizes="(min-width: 2400px) 980px, (min-width: 1800px) 820px, (max-width: 768px) 100vw, 460px"
                  className="object-contain p-6 md:p-7 min-[1800px]:p-12 min-[2400px]:p-14"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
              </button>

              {projectGallery.length > 1 && (
                <div
                  className="border-t border-border bg-white/[0.92] p-3 min-[1800px]:p-6 min-[2400px]:p-7"
                  aria-label={modal.gallery}
                >
                  <div
                    data-project-dialog-horizontal-scroll
                    data-lenis-prevent
                    className="flex touch-pan-x gap-2 overflow-x-auto overscroll-x-contain pb-1 min-[1800px]:gap-4"
                  >
                    {projectGallery.map((image, index) => (
                      <button
                        key={image}
                        type="button"
                        className={cn(
                          "relative h-[54px] w-[76px] shrink-0 overflow-hidden rounded-[4px] border bg-muted transition-[border-color,opacity,transform] duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand/30 min-[1800px]:h-[92px] min-[1800px]:w-[132px] min-[2400px]:h-[108px] min-[2400px]:w-[156px]",
                          activeGalleryIndex === index
                            ? "border-brand opacity-100"
                            : "border-border opacity-70 hover:opacity-100",
                        )}
                        aria-label={`${modal.gallery} ${index + 1}`}
                        aria-current={activeGalleryIndex === index}
                        onClick={() => setActiveGalleryIndex(index)}
                      >
                        <Image
                          src={image}
                          alt=""
                          fill
                          sizes="(min-width: 2400px) 156px, (min-width: 1800px) 132px, 76px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              data-project-dialog-scroll
              data-lenis-prevent
              className="min-h-0 overflow-y-auto overscroll-contain px-5 py-7 md:px-9 md:py-10 min-[1800px]:px-16 min-[1800px]:py-16 min-[2400px]:px-20 min-[2400px]:py-[72px]"
            >
              <span className="text-[11px] font-extrabold uppercase tracking-wide text-brand min-[1800px]:text-[17px] min-[2400px]:text-[19px]">
                {project.category}
              </span>
              <h2
                id="project-dialog-title"
                className="mt-4 max-w-[500px] text-[34px] font-extrabold leading-[0.98] tracking-[-0.02em] text-foreground md:text-[48px] min-[1800px]:max-w-[840px] min-[1800px]:text-[78px] min-[2400px]:max-w-[980px] min-[2400px]:text-[92px]"
              >
                {project.title}
              </h2>
              <p className="mt-6 max-w-[500px] text-[16px] font-medium leading-[1.45] text-muted-foreground md:text-[17px] min-[1800px]:max-w-[860px] min-[1800px]:text-[26px] min-[2400px]:max-w-[980px] min-[2400px]:text-[30px]">
                {project.description}
              </p>

              <Link
                href={`/projects/${project.id}`}
                className="group/fullProject mt-7 inline-flex min-h-11 items-center justify-center gap-3 rounded-[7px] bg-foreground px-5 py-2.5 text-[13px] font-extrabold text-white shadow-[0_8px_22px_rgba(0,0,0,0.16)] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 min-[1800px]:mt-10 min-[1800px]:min-h-16 min-[1800px]:px-8 min-[1800px]:text-[20px] min-[2400px]:text-[22px]"
              >
                <span>{modal.openFullPage}</span>
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover/fullProject:-translate-y-0.5 group-hover/fullProject:translate-x-0.5 min-[1800px]:size-6"
                  aria-hidden
                />
              </Link>

              <div className="mt-8 grid gap-6 md:grid-cols-2 min-[1800px]:mt-14 min-[1800px]:gap-12 min-[2400px]:mt-16">
                <section>
                  <h3 className="text-[12px] font-extrabold uppercase tracking-wide min-[1800px]:text-[18px] min-[2400px]:text-[20px]">
                    {modal.overview}
                  </h3>
                  <p className="mt-4 text-[14px] font-medium leading-[1.65] text-muted-foreground min-[1800px]:text-[21px] min-[2400px]:text-[24px]">
                    {project.overview}
                  </p>
                </section>
                <section>
                  <h3 className="text-[12px] font-extrabold uppercase tracking-wide min-[1800px]:text-[18px] min-[2400px]:text-[20px]">
                    {modal.tags}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-muted px-3 py-1.5 text-[11px] font-medium text-muted-foreground min-[1800px]:px-5 min-[1800px]:py-2.5 min-[1800px]:text-[17px] min-[2400px]:text-[19px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              {project.relatedPatents?.length ? (
                <section className="mt-8 border border-border bg-white min-[1800px]:mt-14">
                  <div className="border-b border-border px-4 py-3 min-[1800px]:px-7 min-[1800px]:py-6">
                    <h3 className="text-[12px] font-extrabold uppercase tracking-wide min-[1800px]:text-[18px] min-[2400px]:text-[20px]">
                      {modal.relatedPatents}
                    </h3>
                  </div>
                  <div className="grid divide-y divide-border">
                    {project.relatedPatents.map((patent) => (
                      <Link
                        key={patent.publication}
                        href={`/patents/${patent.patentId.toLowerCase()}`}
                        className="group/patentLink grid gap-1 px-4 py-3 text-left transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 min-[1800px]:gap-3 min-[1800px]:px-7 min-[1800px]:py-6"
                      >
                        <span className="text-[11px] font-extrabold text-brand min-[1800px]:text-[17px] min-[2400px]:text-[19px]">
                          {patent.publication}
                        </span>
                        <span className="text-[14px] font-extrabold leading-tight text-foreground transition-colors group-hover/patentLink:text-brand min-[1800px]:text-[22px] min-[2400px]:text-[25px]">
                          {patent.title}
                        </span>
                        <span className="text-[12px] font-medium leading-[1.45] text-muted-foreground min-[1800px]:text-[18px] min-[2400px]:text-[20px]">
                          {patent.note}
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        </section>

        {expandedImage && (
          <ProjectImageLightbox
            image={expandedImage}
            alt={project.imageAlt}
            closeLabel={modal.closeImage}
            previousLabel={modal.previousImage}
            nextLabel={modal.nextImage}
            hasMultiple={projectGallery.length > 1}
            onClose={() => setExpandedImageIndex(null)}
            onPrevious={showPreviousExpandedImage}
            onNext={showNextExpandedImage}
          />
        )}
      </div>
    </>
  );
}

export function HomeProjectDetailsDialog({
  locale,
  onClosed,
  projectId,
}: {
  locale: string;
  onClosed: () => void;
  projectId: string;
}) {
  const copy = getProjectsPageCopy(locale);
  const project = copy.projects.find((item) => item.id === projectId);

  if (!project) return null;

  return (
    <ProjectDetailsDialog
      modal={copy.modal}
      onClosed={onClosed}
      project={project}
    />
  );
}

export function ProjectsPageContent({ locale }: { locale: string }) {
  const resolvedLocale = resolveProjectsLocale(locale);
  const copy = PROJECTS_COPY[resolvedLocale];
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [sortKey, setSortKey] = useState<ProjectSortKey>("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [dialogState, setDialogState] = useState<
    "closed" | "opening" | "open" | "closing"
  >("closed");
  const [panelRect, setPanelRect] = useState<PanelRect | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const dialogStateRef = useRef(dialogState);
  const lockedScrollYRef = useRef(0);

  useEffect(() => {
    const closeSortOnOutsidePointer = (event: PointerEvent) => {
      const sortDetails = Array.from(
        document.querySelectorAll<HTMLDetailsElement>(
          "[data-project-sort-details]",
        ),
      );
      const openSortDetails = sortDetails.filter((details) => details.open);
      if (openSortDetails.length === 0) return;
      if (
        event.target instanceof Node &&
        openSortDetails.some((details) =>
          details.contains(event.target as Node),
        )
      ) {
        return;
      }

      openSortDetails.forEach((details) => details.removeAttribute("open"));
    };

    document.addEventListener("pointerdown", closeSortOnOutsidePointer);

    return () => {
      document.removeEventListener("pointerdown", closeSortOnOutsidePointer);
    };
  }, []);

  const visibleProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const filteredProjects =
      activeFilter === "all"
        ? copy.projects
        : copy.projects.filter((project) => project.filter === activeFilter);

    const matchedProjects = query
      ? filteredProjects.filter((project) =>
          [
            project.category,
            project.title,
            project.description,
            project.overview,
            ...(project.scope ?? []),
            ...project.tags,
          ]
            .join(" ")
            .toLowerCase()
            .includes(query),
        )
      : filteredProjects;

    return sortProjects(matchedProjects, sortKey, resolvedLocale);
  }, [activeFilter, copy.projects, resolvedLocale, searchQuery, sortKey]);
  const handleFilterChange = useCallback((filter: FilterKey) => {
    setActiveFilter(filter);
    setSortKey("default");
  }, []);
  const activeSortLabel =
    copy.sort.options.find((option) => option.key === sortKey)?.label ??
    copy.sort.options[0]?.label ??
    copy.sort.label;

  const renderProjectControls = ({
    wrapperClassName,
    sortClassName,
    searchClassName,
  }: {
    wrapperClassName: string;
    sortClassName: string;
    searchClassName: string;
  }) => (
    <div className={wrapperClassName}>
      <details data-project-sort-details className={sortClassName}>
        <summary
          className="flex h-12 w-full cursor-pointer list-none items-center justify-between gap-2 rounded-[4px] border border-border bg-white px-4 text-[13px] font-extrabold text-foreground shadow-[0_2px_7px_rgba(0,0,0,0.05)] outline-none transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-brand/35 focus-visible:ring-2 focus-visible:ring-brand/35 min-[520px]:px-2 md:px-3 xl:px-4 min-[1800px]:!h-[58px] min-[2400px]:!h-[64px] min-[2400px]:!gap-4 min-[2400px]:!rounded-[7px] min-[2400px]:!px-6 min-[2400px]:!text-[20px] [&::-webkit-details-marker]:hidden"
          aria-label={copy.sort.label}
        >
          <span className="inline-flex min-w-0 items-center gap-2">
            <ArrowDownUp
              className="size-4 shrink-0 text-brand min-[2400px]:!size-6"
              aria-hidden
            />
            <span className="shrink-0">{copy.sort.label}</span>
          </span>
          <span className="max-w-[110px] truncate text-[12px] font-medium text-muted-foreground min-[520px]:max-w-[48px] md:max-w-[74px] xl:max-w-[110px] min-[2400px]:!max-w-[190px] min-[2400px]:!text-[18px]">
            {activeSortLabel}
          </span>
        </summary>
        <div className="absolute left-0 top-[calc(100%+8px)] grid min-w-[220px] rounded-[7px] border border-border bg-white p-1 shadow-[0_16px_34px_rgba(0,0,0,0.14)] min-[2400px]:top-[calc(100%+14px)] min-[2400px]:min-w-[360px] min-[2400px]:rounded-[12px] min-[2400px]:p-2">
          {copy.sort.options.map((option) => {
            const active = option.key === sortKey;

            return (
              <button
                key={option.key}
                type="button"
                className={cn(
                  "flex items-center justify-between gap-4 rounded-[5px] px-3 py-2 text-left text-[13px] font-bold text-foreground transition-colors hover:bg-brand/10 focus-visible:bg-brand/10 focus-visible:outline-none min-[2400px]:rounded-[8px] min-[2400px]:px-5 min-[2400px]:py-4 min-[2400px]:text-[20px]",
                  active && "bg-brand text-white hover:bg-brand",
                )}
                aria-pressed={active}
                onClick={(event) => {
                  setSortKey(option.key);
                  event.currentTarget
                    .closest("details")
                    ?.removeAttribute("open");
                }}
              >
                <span>{option.label}</span>
                {active ? (
                  <Check
                    className="size-4 shrink-0 min-[2400px]:size-6"
                    aria-hidden
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </details>

      <label className={searchClassName}>
        <span className="sr-only">{copy.searchLabel}</span>
        <Search
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground min-[2400px]:!left-6 min-[2400px]:!size-6"
          aria-hidden
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder={copy.searchPlaceholder}
          className="h-12 w-full rounded-[4px] border border-border bg-white pl-11 pr-4 text-[13px] font-medium text-foreground outline-none shadow-[0_2px_7px_rgba(0,0,0,0.05)] transition-[border-color,box-shadow] duration-300 placeholder:text-muted-foreground/75 focus:border-brand/50 focus:shadow-[0_10px_24px_rgba(0,0,0,0.08)] min-[1800px]:!h-[58px] min-[2400px]:!h-[64px] min-[2400px]:!rounded-[7px] min-[2400px]:!pl-[58px] min-[2400px]:!pr-6 min-[2400px]:!text-[20px]"
        />
      </label>
    </div>
  );
  const [expandedGalleryIndex, setExpandedGalleryIndex] = useState<
    number | null
  >(null);

  const selectedProjectGallery = useMemo(
    () => (selectedProject ? getProjectGallery(selectedProject) : []),
    [selectedProject],
  );
  const activeGalleryImage =
    selectedProjectGallery[
      Math.min(
        activeGalleryIndex,
        Math.max(selectedProjectGallery.length - 1, 0),
      )
    ] ?? selectedProject?.image;
  const expandedGalleryImage =
    expandedGalleryIndex === null
      ? null
      : (selectedProjectGallery[expandedGalleryIndex] ??
        activeGalleryImage ??
        selectedProject?.image ??
        null);

  const showExpandedGalleryImageAt = useCallback(
    (index: number) => {
      if (!selectedProjectGallery.length) return;

      const nextIndex =
        ((index % selectedProjectGallery.length) +
          selectedProjectGallery.length) %
        selectedProjectGallery.length;
      setActiveGalleryIndex(nextIndex);
      setExpandedGalleryIndex(nextIndex);
    },
    [selectedProjectGallery.length],
  );

  const showPreviousExpandedGalleryImage = useCallback(() => {
    if (expandedGalleryIndex === null) return;
    showExpandedGalleryImageAt(expandedGalleryIndex - 1);
  }, [expandedGalleryIndex, showExpandedGalleryImageAt]);

  const showNextExpandedGalleryImage = useCallback(() => {
    if (expandedGalleryIndex === null) return;
    showExpandedGalleryImageAt(expandedGalleryIndex + 1);
  }, [expandedGalleryIndex, showExpandedGalleryImageAt]);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const finishClose = useCallback(() => {
    clearCloseTimer();
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has("project")) {
      searchParams.delete("project");
      const nextSearch = searchParams.toString();
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ""}${window.location.hash}`,
      );
    }

    setExpandedGalleryIndex(null);
    setSelectedProject(null);
    setPanelRect(null);
    setDialogState("closed");
    previousFocusRef.current?.focus?.({ preventScroll: true });
    previousFocusRef.current = null;
  }, [clearCloseTimer]);

  const openProject = useCallback(
    (project: Project) => {
      clearCloseTimer();
      lockedScrollYRef.current = window.scrollY;
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      setActiveGalleryIndex(0);
      setExpandedGalleryIndex(null);
      setSelectedProject(project);
      setPanelRect(centeredPanelRect());
      setDialogState("opening");

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setDialogState("open");
        });
      });
    },
    [clearCloseTimer],
  );

  useEffect(() => {
    const openProjectFromUrl = () => {
      const projectId = new URLSearchParams(window.location.search).get(
        "project",
      );
      if (!projectId || selectedProject?.id === projectId) return;

      const project = copy.projects.find((item) => item.id === projectId);
      if (!project) return;

      setActiveFilter(project.filter ?? "all");
      openProject(project);
    };

    openProjectFromUrl();
    window.addEventListener("popstate", openProjectFromUrl);
    return () => window.removeEventListener("popstate", openProjectFromUrl);
  }, [copy.projects, openProject, selectedProject?.id]);

  const closeProject = useCallback(() => {
    if (!selectedProject || dialogState === "closing") return;

    if (window.location.hash.startsWith(`#${PROJECT_DETAIL_HASH_PREFIX}`)) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }

    clearCloseTimer();
    setDialogState("closing");

    closeTimerRef.current = window.setTimeout(
      finishClose,
      MODAL_CLOSE_FALLBACK_MS,
    );
  }, [clearCloseTimer, dialogState, finishClose, selectedProject]);

  const openProjectFromHash = useCallback(() => {
    const hash = window.location.hash.slice(1);
    if (!hash.startsWith(PROJECT_DETAIL_HASH_PREFIX)) return;

    const projectId = decodeURIComponent(
      hash.slice(PROJECT_DETAIL_HASH_PREFIX.length),
    );
    if (!projectId || selectedProject?.id === projectId) return;

    const project =
      copy.featuredProject.id === projectId
        ? copy.featuredProject
        : copy.projects.find((item) => item.id === projectId);
    if (!project) return;

    openProject(project);
  }, [copy.featuredProject, copy.projects, openProject, selectedProject?.id]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(openProjectFromHash);
    window.addEventListener("hashchange", openProjectFromHash);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", openProjectFromHash);
    };
  }, [openProjectFromHash]);

  useEffect(() => {
    dialogStateRef.current = dialogState;
  }, [dialogState]);

  useEffect(() => {
    if (!selectedProject) return;

    const { body, documentElement } = document;
    const previousBodyStyles = {
      overscrollBehavior: body.style.overscrollBehavior,
    };
    const previousDocumentStyles = {
      overflowY: documentElement.style.overflowY,
      overscrollBehavior: documentElement.style.overscrollBehavior,
    };
    const scrollEventOptions = {
      capture: true,
      passive: false,
    } satisfies AddEventListenerOptions;
    let touchStartX = 0;
    let touchStartY = 0;

    const canScrollWithin = (container: HTMLElement, deltaY: number) => {
      const maxScrollTop = container.scrollHeight - container.clientHeight;
      if (maxScrollTop <= 0) return false;
      if (deltaY < 0) return container.scrollTop > 0;
      if (deltaY > 0) return container.scrollTop < maxScrollTop - 1;
      return true;
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0]?.clientX ?? 0;
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const preventBackgroundScroll = (event: Event) => {
      const horizontalScrollContainer =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(
              PROJECT_HORIZONTAL_SCROLL_SELECTOR,
            )
          : null;
      const zoomContainer =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(PROJECT_IMAGE_ZOOM_SELECTOR)
          : null;
      const scrollContainer =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(
              "[data-project-dialog-scroll], [data-patent-dialog-scroll]",
            )
          : null;
      const deltaY =
        event instanceof WheelEvent
          ? event.deltaY
          : event instanceof TouchEvent
            ? touchStartY - (event.touches[0]?.clientY ?? touchStartY)
            : 0;

      if (zoomContainer) return;

      if (horizontalScrollContainer) {
        if (
          event instanceof WheelEvent &&
          scrollHorizontalTrackFromWheel(event, horizontalScrollContainer)
        ) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }

        if (event instanceof TouchEvent) {
          const currentX = event.touches[0]?.clientX ?? touchStartX;
          const currentY = event.touches[0]?.clientY ?? touchStartY;
          const deltaX = touchStartX - currentX;
          const touchDeltaY = touchStartY - currentY;

          if (
            Math.abs(deltaX) > Math.abs(touchDeltaY) &&
            canScrollHorizontally(horizontalScrollContainer, deltaX)
          ) {
            event.stopPropagation();
            return;
          }
        }
      }

      if (scrollContainer && canScrollWithin(scrollContainer, deltaY)) {
        event.stopPropagation();
        return;
      }

      event.preventDefault();
      event.stopPropagation();
    };

    window.dispatchEvent(
      new CustomEvent("domtek:scroll-lock", { detail: { locked: true } }),
    );
    body.style.overscrollBehavior = "none";
    documentElement.style.overflowY = "scroll";
    documentElement.style.overscrollBehavior = "none";
    window.addEventListener("touchstart", onTouchStart, {
      capture: true,
      passive: true,
    });
    window.addEventListener(
      "wheel",
      preventBackgroundScroll,
      scrollEventOptions,
    );
    window.addEventListener(
      "touchmove",
      preventBackgroundScroll,
      scrollEventOptions,
    );

    return () => {
      window.removeEventListener("touchstart", onTouchStart, {
        capture: true,
      });
      window.removeEventListener(
        "wheel",
        preventBackgroundScroll,
        scrollEventOptions,
      );
      window.removeEventListener(
        "touchmove",
        preventBackgroundScroll,
        scrollEventOptions,
      );
      body.style.overscrollBehavior = previousBodyStyles.overscrollBehavior;
      documentElement.style.overflowY = previousDocumentStyles.overflowY;
      documentElement.style.overscrollBehavior =
        previousDocumentStyles.overscrollBehavior;
      const restoreScrollY = window.scrollY || lockedScrollYRef.current;
      window.scrollTo(window.scrollX, restoreScrollY);
      window.dispatchEvent(
        new CustomEvent("domtek:scroll-lock", {
          detail: { locked: false, scrollY: restoreScrollY },
        }),
      );
    };
  }, [selectedProject]);

  useEffect(() => {
    if (dialogState !== "open") return;

    const focusTimer = window.setTimeout(() => {
      panelRef.current?.focus({ preventScroll: true });
    }, MODAL_TRANSITION_MS);

    return () => window.clearTimeout(focusTimer);
  }, [dialogState]);

  useEffect(() => {
    if (!selectedProject) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (expandedGalleryIndex !== null) {
        if (event.key === "Escape") {
          setExpandedGalleryIndex(null);
          return;
        }

        if (selectedProjectGallery.length > 1 && event.key === "ArrowLeft") {
          event.preventDefault();
          showPreviousExpandedGalleryImage();
          return;
        }

        if (selectedProjectGallery.length > 1 && event.key === "ArrowRight") {
          event.preventDefault();
          showNextExpandedGalleryImage();
        }

        return;
      }

      if (event.key === "Escape") {
        closeProject();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.getClientRects().length > 0,
      );

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    closeProject,
    expandedGalleryIndex,
    selectedProject,
    selectedProjectGallery.length,
    showNextExpandedGalleryImage,
    showPreviousExpandedGalleryImage,
  ]);

  useEffect(() => {
    if (!selectedProject || dialogState !== "open") return;

    const onResize = () => setPanelRect(centeredPanelRect());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [dialogState, selectedProject]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  const panelStyle = panelRect
    ? ({
        left: panelRect.left,
        top: panelRect.top,
        width: Math.max(panelRect.width, 1),
        height: Math.max(panelRect.height, 1),
        borderRadius: panelRect.radius,
        transformOrigin: "50% 50%",
      } satisfies CSSProperties)
    : undefined;

  const contentVisible = dialogState !== "closing";
  const backdropVisible = dialogState === "open";
  const panelVisible = dialogState === "open";

  return (
    <>
      <section
        className="relative overflow-hidden border-b border-border bg-background pt-[132px] md:min-h-[590px] md:pt-[152px] min-[2400px]:!min-h-[1060px] min-[2400px]:!pt-[152px]"
        aria-labelledby="projects-page-title"
      >
        <Image
          src="/assets/project-page/image-fond-top.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none absolute inset-0 z-0 object-contain object-right-top opacity-[0.82] min-[2400px]:scale-[1.18] min-[2400px]:opacity-90"
        />
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-white/55 via-white/15 to-transparent" />
        <div
          className="pointer-events-none absolute bottom-[-22px] right-[-44vw] z-[1] hidden h-[430px] w-[96vw] max-w-none opacity-95 md:block lg:bottom-[-36px] lg:right-[-31vw] lg:h-[520px] lg:w-[86vw] xl:right-[-24vw] 2xl:right-[-15vw] min-[1800px]:!right-[calc((100vw-1680px)/2-170px)] min-[1800px]:!w-[min(72vw,1640px)] min-[2400px]:!bottom-[-64px] min-[2400px]:!right-[calc((100vw-1900px)/2-330px)] min-[2400px]:!h-[860px] min-[2400px]:!w-[1900px]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgb(0 0 0 / 0.18) 7%, black 18%, black 82%, rgb(0 0 0 / 0.24) 93%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, rgb(0 0 0 / 0.18) 7%, black 18%, black 82%, rgb(0 0 0 / 0.24) 93%, transparent 100%)",
          }}
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, rgb(0 0 0 / 0.72) 7%, black 18%, black 78%, rgb(0 0 0 / 0.35) 91%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, rgb(0 0 0 / 0.72) 7%, black 18%, black 78%, rgb(0 0 0 / 0.35) 91%, transparent 100%)",
            }}
          >
            <div
              className="absolute bottom-[14%] left-[18%] right-[5%] z-[1] h-[18%] rotate-[-1deg] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.46)_0%,rgba(0,0,0,0.3)_34%,rgba(0,0,0,0.13)_62%,transparent_80%)] opacity-85 blur-[20px] mix-blend-multiply lg:bottom-[12%] lg:left-[15%] lg:right-[4%] lg:h-[20%] lg:blur-[26px]"
              aria-hidden
            />
            <div
              className="absolute left-[18%] right-[5%] top-[17%] z-[1] h-[17%] rotate-[1deg] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.26)_34%,rgba(0,0,0,0.12)_62%,transparent_80%)] opacity-78 blur-[22px] mix-blend-multiply lg:left-[14%] lg:right-[4%] lg:top-[15%] lg:h-[18%] lg:blur-[28px]"
              aria-hidden
            />
            <Image
              src="/assets/projects/aventor/aventor-hero.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 96vw, 1180px"
              className="z-[2] object-contain object-center"
            />
            <div
              className="absolute inset-y-0 left-0 z-[3] w-[36%] bg-gradient-to-r from-background via-background/90 to-transparent xl:w-[38%]"
              aria-hidden
            />
            <div
              className="absolute inset-x-0 bottom-0 z-[3] h-[24%] bg-gradient-to-t from-background via-background/86 to-transparent"
              aria-hidden
            />
            <div
              className="absolute inset-y-0 right-0 z-[3] w-[18%] bg-gradient-to-l from-background/90 via-background/52 to-transparent"
              aria-hidden
            />
          </div>
        </div>

        <Container
          size="wide"
          className="relative z-10 flex items-start pb-14 md:min-h-[410px] md:pb-10 min-[2400px]:!min-h-[780px] min-[2400px]:!pb-20"
        >
          <Reveal className="max-w-[560px] pb-5 md:pb-0 min-[1800px]:!max-w-[720px] min-[2400px]:!max-w-[900px]">
            <div className="flex items-center gap-3 text-[15px] font-medium leading-none text-muted-foreground md:text-[16px] min-[2400px]:!gap-5 min-[2400px]:!text-[26px]">
              <span
                className="h-[3px] w-[34px] shrink-0 bg-brand min-[2400px]:!h-1 min-[2400px]:!w-[74px]"
                aria-hidden
              />
              {copy.hero.eyebrow}
            </div>
            <h1
              id="projects-page-title"
              className="domtek-text-shadow mt-[38px] max-w-full text-[42px] font-extrabold leading-none text-foreground sm:text-[60px] md:mt-[52px] md:text-[66px] min-[1800px]:!text-[74px] min-[2400px]:!mt-[82px] min-[2400px]:!text-[96px]"
            >
              {copy.hero.title}
              <span className="text-brand">.</span>
            </h1>
            <p className="mt-8 max-w-[430px] text-[15px] font-medium leading-[1.35] text-muted-foreground sm:text-[16px] min-[1800px]:!max-w-[620px] min-[1800px]:!text-[18px] min-[2400px]:!max-w-[760px] min-[2400px]:!text-[21px]">
              <strong className="font-extrabold">{copy.hero.strong}</strong>{" "}
              {copy.hero.rest}
            </p>
            <p className="mt-5 max-w-[430px] text-[15px] font-medium leading-[1.35] text-muted-foreground sm:text-[16px] min-[1800px]:!max-w-[620px] min-[1800px]:!text-[18px] min-[2400px]:!max-w-[760px] min-[2400px]:!text-[21px]">
              {copy.hero.lead}
            </p>
          </Reveal>
        </Container>
      </section>

      <ProjectsStatsSection stats={copy.stats} ariaLabel={copy.statsLabel} />

      <section
        id="projects"
        className="bg-background py-[48px] md:py-[56px] min-[2400px]:!py-[96px]"
        aria-labelledby="selected-projects"
      >
        <Container size="wide">
          <Reveal className="flex min-w-0 flex-col gap-4 md:flex-row md:items-end md:justify-between min-[2400px]:gap-8">
            <div className="min-w-0 shrink-0">
              <h2
                id="selected-projects"
                className="text-[22px] font-extrabold leading-none text-foreground min-[2400px]:!text-[40px]"
              >
                {copy.selectedTitle}
              </h2>
              <p className="mt-3 text-[12px] font-medium text-muted-foreground min-[2400px]:!mt-5 min-[2400px]:!text-[20px]">
                {visibleProjects.length} / {copy.projects.length}{" "}
                {copy.resultsLabel}
              </p>
            </div>
            {renderProjectControls({
              wrapperClassName:
                "grid w-full min-w-0 gap-3 min-[520px]:grid-cols-[minmax(138px,180px)_minmax(0,1fr)] md:w-auto md:flex",
              sortClassName: "relative z-30 min-w-0 md:w-[180px]",
              searchClassName: "relative block min-w-0 md:w-[320px]",
            })}
          </Reveal>

          <Reveal
            delay={0.06}
            className="mb-7 mt-7 min-[2400px]:mb-12 min-[2400px]:mt-12"
            as="div"
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 min-[1700px]:grid-cols-8 min-[2400px]:!gap-5">
              <div
                className="contents"
                role="group"
                aria-label={copy.filtersLabel}
              >
                {copy.filters.map((filter) => {
                  const active = activeFilter === filter.key;
                  const FilterIcon = filter.icon;
                  const count =
                    filter.key === "all"
                      ? copy.projects.length
                      : copy.projects.filter(
                          (project) => project.filter === filter.key,
                        ).length;

                  return (
                    <button
                      key={filter.key}
                      type="button"
                      className={cn(
                        "group/filter grid h-[48px] min-w-0 items-center gap-3 rounded-[4px] border border-border bg-white px-4 text-left shadow-[0_2px_6px_rgba(0,0,0,0.05)] outline-none transition-[translate,background-color,border-color,box-shadow,color] duration-500 hover:-translate-y-1 hover:border-brand/35 hover:shadow-[0_12px_26px_rgba(0,0,0,0.09)] focus-visible:ring-2 focus-visible:ring-brand/35 sm:gap-2 sm:px-3 min-[1700px]:h-[58px] min-[1700px]:px-4 min-[2400px]:!h-[64px] min-[2400px]:!gap-4 min-[2400px]:!px-6 [transition-timing-function:var(--ease-smooth)]",
                        FilterIcon
                          ? "grid-cols-[auto_1fr]"
                          : "place-items-center text-center",
                        active &&
                          "border-brand bg-brand text-white shadow-[0_10px_22px_rgba(0,0,0,0.18)] hover:border-brand hover:bg-brand hover:text-white hover:shadow-[0_12px_26px_rgba(0,0,0,0.18)]",
                      )}
                      aria-pressed={active}
                      onClick={() => handleFilterChange(filter.key)}
                    >
                      {FilterIcon && (
                        <FilterIcon
                          aria-hidden="true"
                          strokeWidth={1.7}
                          className={cn(
                            "h-7 w-7 shrink-0 text-brand transition-transform duration-500 group-hover/filter:-translate-y-0.5 group-hover/filter:scale-105 min-[2400px]:!h-11 min-[2400px]:!w-11 [transition-timing-function:var(--ease-smooth)]",
                            active && "text-white",
                          )}
                        />
                      )}
                      <span
                        className={cn(
                          "grid min-w-0",
                          !FilterIcon && "place-items-center text-center",
                        )}
                      >
                        <strong className="line-clamp-2 text-[12px] font-extrabold leading-[1.05] sm:text-[11px] md:text-[12px] min-[2400px]:!text-[20px]">
                          {filter.label}
                        </strong>
                        {filter.key !== "all" && (
                          <span
                            className={cn(
                              "mt-1 truncate text-[9px] font-medium leading-none text-muted-foreground min-[2400px]:!mt-2 min-[2400px]:!text-[15px]",
                              active && "text-white/85",
                            )}
                          >
                            {count} {PROJECT_COUNT_LABELS[resolvedLocale]}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {visibleProjects.length > 0 ? (
            <div className="grid items-stretch gap-4 md:grid-cols-2 min-[2400px]:!grid-cols-3 min-[2400px]:!gap-6">
              {visibleProjects.map((project, index) => (
                <div key={project.id} className="h-full">
                  <ProjectCard
                    project={project}
                    onOpen={openProject}
                    ctaLabel={copy.viewCaseStudy}
                    openDetailsLabel={copy.cardOpenDetails}
                    imageFetchPriority={index < 2 ? "auto" : "low"}
                  />
                </div>
              ))}
            </div>
          ) : (
            <Reveal className="rounded-[7px] border border-border bg-white px-5 py-12 text-center text-[14px] font-medium text-muted-foreground">
              {copy.noResults}
            </Reveal>
          )}
        </Container>
      </section>

      {selectedProject && (
        <div
          className="fixed inset-0 z-[1000]"
          aria-hidden={dialogState === "closed"}
        >
          <button
            type="button"
            tabIndex={-1}
            className={cn(
              "absolute inset-0 cursor-default bg-black/55 backdrop-blur-[7px] transition-opacity duration-200 ease-out",
              backdropVisible ? "opacity-100" : "opacity-0",
            )}
            aria-label={copy.modal.close}
            onClick={closeProject}
          />

          <section
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            tabIndex={-1}
            style={panelStyle}
            className={cn(
              "fixed transform-gpu overflow-hidden bg-white shadow-[0_34px_110px_rgba(0,0,0,0.26)] outline-none transition-[opacity,transform] duration-300 ease-out will-change-transform",
              panelVisible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-4 scale-[0.975] opacity-0",
            )}
          >
            <button
              type="button"
              className={cn(
                "absolute right-4 top-4 z-20 grid size-10 place-items-center rounded-full border border-border bg-white/95 text-foreground transition duration-200 hover:rotate-6 hover:scale-105 focus-visible:ring-2 focus-visible:ring-brand/30 min-[1800px]:right-8 min-[1800px]:top-8 min-[1800px]:size-14 min-[2400px]:size-16",
                contentVisible ? "opacity-100" : "opacity-0",
              )}
              aria-label={copy.modal.close}
              onClick={closeProject}
            >
              <X
                className="size-4 min-[1800px]:size-6 min-[2400px]:size-7"
                aria-hidden
              />
            </button>

            <div
              className={cn(
                "grid h-full md:grid-cols-[46%_54%] min-[1800px]:grid-cols-[48%_52%]",
                !contentVisible && "pointer-events-none",
              )}
            >
              <div className="flex min-h-[280px] flex-col overflow-hidden bg-muted md:min-h-0">
                <button
                  type="button"
                  className="relative min-h-[210px] flex-1 cursor-zoom-in overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/35 min-[1800px]:min-h-[620px] min-[2400px]:min-h-[740px]"
                  aria-label={copy.modal.openImage}
                  onClick={() =>
                    setExpandedGalleryIndex(
                      Math.min(
                        activeGalleryIndex,
                        Math.max(selectedProjectGallery.length - 1, 0),
                      ),
                    )
                  }
                >
                  <Image
                    src={activeGalleryImage ?? selectedProject.image}
                    alt={selectedProject.imageAlt}
                    fill
                    sizes="(min-width: 2400px) 980px, (min-width: 1800px) 820px, (max-width: 768px) 100vw, 460px"
                    className="object-contain p-6 md:p-7 min-[1800px]:p-12 min-[2400px]:p-14"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
                </button>

                {selectedProjectGallery.length > 1 && (
                  <div
                    className="border-t border-border bg-white/[0.92] p-3 min-[1800px]:p-6 min-[2400px]:p-7"
                    aria-label={copy.modal.gallery}
                  >
                    <div
                      data-project-dialog-horizontal-scroll
                      data-lenis-prevent
                      className="flex touch-pan-x gap-2 overflow-x-auto overscroll-x-contain pb-1 min-[1800px]:gap-4"
                    >
                      {selectedProjectGallery.map((image, index) => (
                        <button
                          key={image}
                          type="button"
                          className={cn(
                            "relative h-[54px] w-[76px] shrink-0 overflow-hidden rounded-[4px] border bg-muted transition-[border-color,opacity,transform] duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand/30 min-[1800px]:h-[92px] min-[1800px]:w-[132px] min-[2400px]:h-[108px] min-[2400px]:w-[156px]",
                            activeGalleryIndex === index
                              ? "border-brand opacity-100"
                              : "border-border opacity-70 hover:opacity-100",
                          )}
                          aria-label={`${copy.modal.gallery} ${index + 1}`}
                          aria-current={activeGalleryIndex === index}
                          onClick={() => setActiveGalleryIndex(index)}
                        >
                          <Image
                            src={image}
                            alt=""
                            fill
                            sizes="(min-width: 2400px) 156px, (min-width: 1800px) 132px, 76px"
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div
                data-project-dialog-scroll
                data-lenis-prevent
                className="min-h-0 overflow-y-auto overscroll-contain px-5 py-7 md:px-9 md:py-10 min-[1800px]:px-16 min-[1800px]:py-16 min-[2400px]:px-20 min-[2400px]:py-[72px]"
              >
                <span className="text-[11px] font-extrabold uppercase tracking-wide text-brand min-[1800px]:text-[17px] min-[2400px]:text-[19px]">
                  {selectedProject.category}
                </span>
                <h2
                  id="project-dialog-title"
                  className="mt-4 max-w-[500px] text-[34px] font-extrabold leading-[0.98] tracking-[-0.02em] text-foreground md:text-[48px] min-[1800px]:max-w-[840px] min-[1800px]:text-[78px] min-[2400px]:max-w-[980px] min-[2400px]:text-[92px]"
                >
                  {selectedProject.title}
                </h2>
                <p className="mt-6 max-w-[500px] text-[16px] font-medium leading-[1.45] text-muted-foreground md:text-[17px] min-[1800px]:max-w-[860px] min-[1800px]:text-[26px] min-[2400px]:max-w-[980px] min-[2400px]:text-[30px]">
                  {selectedProject.description}
                </p>

                <Link
                  href={`/projects/${selectedProject.id}`}
                  className="group/fullProject mt-7 inline-flex min-h-11 items-center justify-center gap-3 rounded-[7px] bg-foreground px-5 py-2.5 text-[13px] font-extrabold text-white shadow-[0_8px_22px_rgba(0,0,0,0.16)] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 min-[1800px]:mt-10 min-[1800px]:min-h-16 min-[1800px]:px-8 min-[1800px]:text-[20px] min-[2400px]:text-[22px]"
                >
                  <span>{copy.modal.openFullPage}</span>
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover/fullProject:-translate-y-0.5 group-hover/fullProject:translate-x-0.5 min-[1800px]:size-6"
                    aria-hidden
                  />
                </Link>

                <div className="mt-8 grid gap-6 md:grid-cols-2 min-[1800px]:mt-14 min-[1800px]:gap-12 min-[2400px]:mt-16">
                  <section>
                    <h3 className="text-[12px] font-extrabold uppercase tracking-wide min-[1800px]:text-[18px] min-[2400px]:text-[20px]">
                      {copy.modal.overview}
                    </h3>
                    <p className="mt-4 text-[14px] font-medium leading-[1.65] text-muted-foreground min-[1800px]:text-[21px] min-[2400px]:text-[24px]">
                      {selectedProject.overview}
                    </p>
                  </section>
                  <section>
                    <h3 className="text-[12px] font-extrabold uppercase tracking-wide min-[1800px]:text-[18px] min-[2400px]:text-[20px]">
                      {copy.modal.tags}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-muted px-3 py-1.5 text-[11px] font-medium text-muted-foreground min-[1800px]:px-5 min-[1800px]:py-2.5 min-[1800px]:text-[17px] min-[2400px]:text-[19px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>

                {selectedProject.relatedPatents?.length ? (
                  <section className="mt-8 border border-border bg-white min-[1800px]:mt-14">
                    <div className="border-b border-border px-4 py-3 min-[1800px]:px-7 min-[1800px]:py-6">
                      <h3 className="text-[12px] font-extrabold uppercase tracking-wide min-[1800px]:text-[18px] min-[2400px]:text-[20px]">
                        {copy.modal.relatedPatents}
                      </h3>
                    </div>
                    <div className="grid divide-y divide-border">
                      {selectedProject.relatedPatents.map((patent) => (
                        <Link
                          key={patent.publication}
                          href={`/patents/${patent.patentId.toLowerCase()}`}
                          className="group/patentLink grid gap-1 px-4 py-3 text-left transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 min-[1800px]:gap-3 min-[1800px]:px-7 min-[1800px]:py-6"
                        >
                          <span className="text-[11px] font-extrabold text-brand min-[1800px]:text-[17px] min-[2400px]:text-[19px]">
                            {patent.publication}
                          </span>
                          <span className="text-[14px] font-extrabold leading-tight text-foreground transition-colors group-hover/patentLink:text-brand min-[1800px]:text-[22px] min-[2400px]:text-[25px]">
                            {patent.title}
                          </span>
                          <span className="text-[12px] font-medium leading-[1.45] text-muted-foreground min-[1800px]:text-[18px] min-[2400px]:text-[20px]">
                            {patent.note}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>
            </div>
            {expandedGalleryImage && (
              <ProjectImageLightbox
                image={expandedGalleryImage}
                alt={selectedProject.imageAlt}
                closeLabel={copy.modal.closeImage}
                previousLabel={copy.modal.previousImage}
                nextLabel={copy.modal.nextImage}
                hasMultiple={selectedProjectGallery.length > 1}
                onClose={() => setExpandedGalleryIndex(null)}
                onPrevious={showPreviousExpandedGalleryImage}
                onNext={showNextExpandedGalleryImage}
              />
            )}
          </section>
        </div>
      )}
    </>
  );
}

function ProjectsStatsSection({
  stats,
  ariaLabel,
}: {
  stats: ProjectStat[];
  ariaLabel: string;
}) {
  return (
    <section
      className="bg-background py-[28px] min-[1180px]:pb-5 min-[1180px]:pt-[52px] min-[2400px]:!pb-6 min-[2400px]:!pt-14"
      aria-label={ariaLabel}
    >
      <Container size="wide">
        <div className="grid grid-cols-2 overflow-hidden rounded-[7px] border border-border bg-white min-[1180px]:grid-cols-5">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <Reveal
                as="article"
                key={`${index}-${stat.label}`}
                delay={index * 0.05}
                className={cn(
                  "group/stat relative flex min-h-[116px] transform-gpu flex-col items-center justify-center gap-1 bg-white px-5 py-2.5 text-center transition-shadow duration-500 hover:z-10 hover:shadow-[0_18px_42px_rgba(0,0,0,0.07)] sm:min-h-[92px] sm:px-7 sm:py-1.5 min-[1180px]:grid min-[1180px]:min-h-[76px] min-[1180px]:grid-cols-[34px_minmax(0,1fr)] min-[1180px]:items-center min-[1180px]:gap-3 min-[1180px]:py-2 min-[1180px]:pl-2 min-[1180px]:pr-3 min-[1180px]:text-left min-[2400px]:!min-h-[90px] min-[2400px]:!grid-cols-[48px_1fr] min-[2400px]:!gap-4 min-[2400px]:!px-5 min-[2400px]:!py-3 motion-reduce:transition-none [transition-timing-function:var(--ease-smooth)]",
                  index % 2 === 0 &&
                    index < stats.length - 1 &&
                    "border-r border-border min-[1180px]:border-r-0",
                  index < stats.length - 1 &&
                    "border-b border-border min-[1180px]:border-b-0",
                  index < stats.length - 1 &&
                    "min-[1180px]:border-r min-[1180px]:border-border",
                  index === stats.length - 1 &&
                    "col-span-2 min-[1180px]:col-span-1",
                )}
              >
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.65}
                  className="h-[36px] w-[40px] text-brand transition-transform duration-500 group-hover/stat:-translate-y-1 sm:h-[40px] sm:w-[44px] min-[1180px]:relative min-[1180px]:-left-5 min-[1180px]:h-[30px] min-[1180px]:w-[32px] min-[1180px]:justify-self-start min-[2400px]:!h-[46px] min-[2400px]:!w-[48px] motion-reduce:transition-none [transition-timing-function:var(--ease-smooth)]"
                />
                <div className="min-w-0 min-[1180px]:grid min-[1180px]:h-[48px] min-[1180px]:grid-rows-[22px_26px] min-[1180px]:content-center min-[2400px]:!h-[60px] min-[2400px]:!grid-rows-[28px_32px]">
                  <strong className="block max-w-full whitespace-nowrap text-[18px] font-extrabold leading-none text-foreground sm:text-[19px] min-[1180px]:flex min-[1180px]:h-[22px] min-[1180px]:items-center min-[1180px]:text-[17px] min-[1180px]:leading-[22px] 2xl:text-[18px] min-[2400px]:!h-[28px] min-[2400px]:!text-[22px] min-[2400px]:!leading-[28px]">
                    {stat.value}
                  </strong>
                  <span className="mt-0.5 block max-w-full break-words text-[12px] font-medium leading-tight text-muted-foreground [hyphens:auto] min-[1180px]:mt-0 min-[1180px]:flex min-[1180px]:h-[26px] min-[1180px]:items-start min-[1180px]:text-[11px] min-[1180px]:leading-[14px] 2xl:text-[12px] min-[2400px]:!h-[32px] min-[2400px]:!text-[15px] min-[2400px]:!leading-[17px]">
                    {stat.label}
                    {stat.detail ? ` ${stat.detail}` : null}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function ProjectCard({
  project,
  onOpen,
  ctaLabel,
  openDetailsLabel,
  imageFetchPriority,
}: {
  project: Project;
  onOpen: (project: Project) => void;
  ctaLabel: string;
  openDetailsLabel: string;
  imageFetchPriority: "auto" | "low";
}) {
  return (
    <article
      data-project-origin
      className="group relative h-full overflow-hidden rounded-[7px] border border-border bg-white transition-shadow duration-300 hover:shadow-[0_16px_34px_rgba(0,0,0,0.07)] min-[2400px]:rounded-[8px]"
    >
      <button
        type="button"
        className="absolute inset-0 z-10 rounded-[7px] text-left outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
        aria-haspopup="dialog"
        aria-label={`${openDetailsLabel}: ${project.title}`}
        onClick={() => onOpen(project)}
      />
      <div className="pointer-events-none relative z-20 flex h-full w-full flex-col text-left">
        <span className="relative block h-[220px] overflow-hidden bg-muted min-[2400px]:!h-[260px]">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            loading="lazy"
            fetchPriority={imageFetchPriority}
            sizes="(min-width: 2400px) 580px, (max-width: 768px) 100vw, 560px"
            className={cn(
              "transition-transform duration-500 group-hover:scale-[1.035]",
              getProjectCardImageFitClass(project.id),
            )}
          />
          <Link
            href={`/projects/${project.id}`}
            className="pointer-events-auto absolute right-4 top-4 z-30 grid size-9 place-items-center rounded-full bg-foreground/80 text-white transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:translate-x-0.5 hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 min-[2400px]:!right-5 min-[2400px]:!top-5 min-[2400px]:!size-10"
            aria-label={`${openDetailsLabel}: ${project.title}`}
          >
            <ArrowUpRight className="size-4 min-[2400px]:!size-5" aria-hidden />
          </Link>
        </span>

        <span className="flex min-h-[150px] flex-1 flex-col px-5 pb-5 pt-5 min-[2400px]:!min-h-[210px] min-[2400px]:!px-6 min-[2400px]:!pb-6 min-[2400px]:!pt-6">
          <span className="text-[11px] font-extrabold text-brand min-[2400px]:!text-[14px]">
            {project.category}
          </span>
          <strong className="mt-2 text-[19px] font-extrabold leading-tight text-foreground min-[2400px]:!mt-3 min-[2400px]:!text-[24px]">
            {project.title}
          </strong>
          <span className="mt-2 text-[13px] font-medium leading-[1.4] text-muted-foreground min-[2400px]:!mt-3 min-[2400px]:!text-[16px]">
            {project.description}
          </span>

          <span className="mt-auto flex items-end justify-between gap-4 pt-6 min-[2400px]:!gap-5 min-[2400px]:!pt-7">
            <span className="inline-flex items-center gap-5 text-[12px] font-extrabold text-foreground min-[2400px]:!gap-5 min-[2400px]:!text-[15px]">
              {ctaLabel}
              <ArrowRight
                className="size-4 text-brand transition-transform duration-300 group-hover:translate-x-1 min-[2400px]:!size-5"
                aria-hidden
              />
            </span>
            <span className="text-right text-[10px] font-medium text-muted-foreground min-[2400px]:!text-[12px]">
              {project.tags.join(" ")}
            </span>
          </span>
        </span>
      </div>
    </article>
  );
}

export function ProjectsPageCta({ locale }: { locale: string }) {
  const copy = PROJECTS_COPY[resolveProjectsLocale(locale)].cta;
  const mailSubject = encodeURIComponent(copy.subject);

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border bg-white py-16 md:min-h-[310px] md:py-20 min-[2400px]:!min-h-[650px] min-[2400px]:!py-[192px]"
      aria-labelledby="projects-cta-title"
    >
      <Image
        src="/assets/project-page/cta-sketch.png"
        alt=""
        width={874}
        height={398}
        quality={100}
        sizes="(min-width: 2400px) 70vw, (max-width: 1024px) 100vw, 700px"
        unoptimized
        className="pointer-events-none absolute bottom-0 right-0 hidden w-[46vw] max-w-[700px] opacity-35 md:block min-[2400px]:bottom-[-40px] min-[2400px]:right-[-6vw] min-[2400px]:w-[70vw] min-[2400px]:max-w-[1640px] min-[2400px]:opacity-45"
      />

      <Container size="wide" className="relative z-10">
        <Reveal className="max-w-[590px] min-[2400px]:!max-w-[1160px]">
          <div className="flex items-center gap-3 text-[15px] font-medium text-muted-foreground min-[2400px]:!gap-5 min-[2400px]:!text-[26px]">
            <span
              className="h-[2px] w-[26px] bg-brand min-[2400px]:!h-1 min-[2400px]:!w-[74px]"
              aria-hidden
            />
            {copy.eyebrow}
          </div>
          <h2
            id="projects-cta-title"
            className="domtek-text-shadow mt-8 text-[36px] font-extrabold leading-[1.05] text-foreground sm:text-[48px] min-[2400px]:!mt-[82px] min-[2400px]:!max-w-[1100px] min-[2400px]:!text-[96px]"
          >
            <span className="text-brand">.</span>
            {copy.title} <span className="text-brand">?</span>
          </h2>
          <p className="mt-6 max-w-[560px] text-[16px] font-medium leading-[1.35] text-muted-foreground min-[2400px]:!mt-10 min-[2400px]:!max-w-[900px] min-[2400px]:!text-[29px]">
            <strong className="font-extrabold">{copy.bodyStrong}</strong>{" "}
            {copy.body}
          </p>
          <a
            href={`mailto:contact@domteknika.ch?subject=${mailSubject}`}
            className="mt-8 inline-flex h-10 items-center justify-center gap-6 rounded-[7px] bg-brand px-5 text-[14px] font-extrabold text-white shadow-[0_4px_10px_rgba(0,0,0,0.28)] transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand/35 min-[2400px]:!mt-14 min-[2400px]:!h-[82px] min-[2400px]:!gap-8 min-[2400px]:!rounded-[10px] min-[2400px]:!px-14 min-[2400px]:!text-[29px]"
          >
            {copy.button}
            <ArrowRight className="size-4 min-[2400px]:!size-9" aria-hidden />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
