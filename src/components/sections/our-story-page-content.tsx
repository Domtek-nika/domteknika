"use client";

import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Container } from "@/components/layout/container";
import { LazyContactMap } from "@/components/sections/lazy-contact-map";
import { Reveal } from "@/components/providers/reveal";
import {
  OurStoryTimelineBlock,
  OurStoryTimelineRail,
  OurStoryTimelineStep,
} from "@/components/sections/our-story-timeline-rail";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type StoryLocale = "en" | "fr" | "de" | "es" | "ko" | "zh";
type CardKey =
  | "founded"
  | "cree"
  | "swissbiomed"
  | "startup"
  | "totalCar"
  | "aventor"
  | "boneFixation"
  | "softcar"
  | "stajvelo"
  | "softcarReveal"
  | "today";
type IconKey = "box" | "monitor" | "document" | "globe";
type MediaKey =
  | "lake"
  | "cree"
  | "startupProducts"
  | "startupCar"
  | "totalCar"
  | "boneFixation"
  | "airsmile"
  | "softcar"
  | "stajvelo"
  | "softcarReveal";

interface StoryCard {
  year: string;
  title: string;
  description: string;
  icon: IconKey;
  awards?: boolean;
}

interface StoryCopy {
  eyebrow: string;
  title: string;
  intro: string;
  cards: Record<CardKey, StoryCard>;
}

type TimelineBlock =
  | { type: "card"; key: CardKey }
  | { type: "media"; key: MediaKey };

interface TimelineRow {
  left?: TimelineBlock;
  right?: TimelineBlock;
}

const STORY_CARD_PROJECT_IDS: Partial<Record<CardKey, string>> = {
  cree: "sam-cree",
  swissbiomed: "airsmile",
  startup: "smart-bottle",
  totalCar: "totalcar-concept",
  aventor: "aventor",
  boneFixation: "biome-staple-applicator",
  softcar: "softcar",
  stajvelo: "stajvelo-rv01",
  softcarReveal: "softcar",
};

const STORY_MEDIA_PROJECT_IDS: Partial<Record<MediaKey, string>> = {
  cree: "sam-cree",
  startupCar: "totalcar-concept",
  totalCar: "aventor",
  boneFixation: "biome-staple-applicator",
  airsmile: "airsmile",
  softcar: "softcar",
  stajvelo: "stajvelo-rv01",
  softcarReveal: "softcar",
};

const LOCATION_DIALOG_COPY: Record<
  StoryLocale,
  { eyebrow: string; title: string; address: string; openMaps: string; close: string }
> = {
  en: { eyebrow: "Our location", title: "DOMTEKNIKA in La Neuveville", address: "Chem. de Saint-Joux 16B\n2520 La Neuveville\nSwitzerland", openMaps: "Open in Google Maps", close: "Close map" },
  fr: { eyebrow: "Notre adresse", title: "DOMTEKNIKA à La Neuveville", address: "Chem. de Saint-Joux 16B\n2520 La Neuveville\nSuisse", openMaps: "Ouvrir dans Google Maps", close: "Fermer la carte" },
  de: { eyebrow: "Unser Standort", title: "DOMTEKNIKA in La Neuveville", address: "Chem. de Saint-Joux 16B\n2520 La Neuveville\nSchweiz", openMaps: "In Google Maps öffnen", close: "Karte schließen" },
  es: { eyebrow: "Nuestra dirección", title: "DOMTEKNIKA en La Neuveville", address: "Chem. de Saint-Joux 16B\n2520 La Neuveville\nSuiza", openMaps: "Abrir en Google Maps", close: "Cerrar el mapa" },
  ko: { eyebrow: "회사 주소", title: "La Neuveville의 DOMTEKNIKA", address: "Chem. de Saint-Joux 16B\n2520 La Neuveville\n스위스", openMaps: "Google 지도에서 열기", close: "지도 닫기" },
  zh: { eyebrow: "公司地址", title: "位于 La Neuveville 的 DOMTEKNIKA", address: "Chem. de Saint-Joux 16B\n2520 La Neuveville\n瑞士", openMaps: "在 Google 地图中打开", close: "关闭地图" },
};

const STORY_COPY: Record<StoryLocale, StoryCopy> = {
  en: {
    eyebrow: "Our journey since 1998",
    title: "Our Story",
    intro:
      "Founded in 1998 by Jean-Luc Thuliez, a visionary engineer, DOMTEKNIKA has spent more than 25 years turning complex technical challenges into reliable engineered solutions. From early concepts and prototypes to simulation, electronics and industrial development, we help ideas become products that work. Explore a selection of projects that reflect our expertise and long-standing experience.",
    cards: {
      founded: {
        year: "1998",
        title: "Founded in La Neuveville - Switzerland",
        description:
          "DOMTEKNIKA was born in La Neuveville with a clear ambition: combining creativity, mechanical engineering and polymer expertise to turn ideas into real-world solutions.",
        icon: "box",
      },
      cree: {
        year: "2001",
        title: "SAM CREE - Early electric mobility",
        description:
          "Before founding DOMTEKNIKA, Jean-Luc Thuliez contributed to the SAM CREE project while working at another company. This ultra-light electric three-wheeler already reflected the mobility ideas that would later shape his engineering approach.",
        icon: "box",
      },
      swissbiomed: {
        year: "2009",
        title: "SwissBiomed - a dedicated medtech chapter",
        description:
          "With the creation of SwissBiomed, DOMTEKNIKA expanded its engineering know-how into medical-device development, combining precision mechanics, materials expertise and prototyping for healthcare innovation.",
        icon: "monitor",
      },
      startup: {
        year: "2011-2013",
        title: "Award-winning startup innovations 3 years in a row",
        description:
          "From Smart Bottle to Skin Care and Personal Injector, DOMTEKNIKA turned ambitious startup concepts into award-winning innovations across smart products, beauty-tech and medtech.",
        icon: "document",
        awards: true,
      },
      totalCar: {
        year: "2013",
        title: "The Total Car",
        description:
          "With The Total Car, the team explored new vehicle architectures using bio-based polymers and recyclable structures, pushing mobility toward a cleaner production model.",
        icon: "globe",
      },
      aventor: {
        year: "2014",
        title: "Aventor - performance as a testbed",
        description:
          "Started in 2012 as an internal DOMTEKNIKA project, Aventor was fully designed and prototyped by the team, from its electrical and mechanical architecture to three- and four-wheel versions, before a separate startup was created.",
        icon: "document",
      },
      boneFixation: {
        year: "2014",
        title: "Bone Fixation System",
        description:
          "A polymer-based medical fixation concept developed for DePuy Synthes, designed to simplify surgical use while ensuring precise, reliable bone stabilization.",
        icon: "document",
      },
      softcar: {
        year: "2015",
        title: "Softcar Concept",
        description:
          "First designed in 2006-2007 and still under development, SOFTCAR is a hybrid vehicle platform that can also be configured as fully electric. DOMTEKNIKA led the complete electrical and mechanical design and prototyping before a separate startup was created.",
        icon: "globe",
      },
      stajvelo: {
        year: "2018",
        title: "Stajvelo - polymer innovation on two wheels",
        description:
          "DOMTEKNIKA applied its polymer design expertise to Stajvelo, an urban e-bike built around integrated structures, comfort, design and riding pleasure.",
        icon: "document",
      },
      softcarReveal: {
        year: "2024",
        title: "Softcar Reveal",
        description:
          "Softcar revealed a new generation of clean urban vehicle, bringing decades of lightweight engineering and circular mobility research into a tangible product.",
        icon: "globe",
      },
      today: {
        year: "Today",
        title: "Engineering what comes next",
        description:
          "DOMTEKNIKA continues to support industrial, medtech and mobility innovators from idea to prototype, combining design, simulation, electronics and manufacturing know-how.",
        icon: "document",
      },
    },
  },
  fr: {
    eyebrow: "Our journey since 1998",
    title: "Notre histoire",
    intro:
      "Fondée en 1998 par Jean-Luc Thuliez, ingénieur visionnaire, DOMTEKNIKA transforme depuis plus de 25 ans des défis techniques complexes en solutions fiables. Des premiers concepts aux prototypes, de la simulation à l'électronique et au développement industriel, nous faisons évoluer les idées vers des produits concrets, performants et industrialisables. Découvrez une sélection de projets qui reflètent notre expertise et notre expérience.",
    cards: {
      founded: {
        year: "1998",
        title: "Création à La Neuveville, en Suisse",
        description:
          "DOMTEKNIKA est née à La Neuveville avec une ambition claire : combiner créativité, ingénierie mécanique et expertise polymère pour transformer les idées en solutions concrètes.",
        icon: "box",
      },
      cree: {
        year: "2001",
        title: "SAM CREE - Aux origines de la mobilité électrique",
        description:
          "Avant de fonder DOMTEKNIKA, Jean-Luc Thuliez a contribué au projet SAM CREE au sein d'une autre entreprise. Ce trois-roues électrique ultraléger illustrait déjà les principes de mobilité qui nourriront ensuite son approche de l'ingénierie.",
        icon: "box",
      },
      swissbiomed: {
        year: "2009",
        title: "SwissBiomed - un chapitre dédié aux dispositifs médicaux",
        description:
          "Avec SwissBiomed, DOMTEKNIKA a étendu son savoir-faire au développement de dispositifs médicaux, en combinant mécanique de précision, matériaux et prototypage.",
        icon: "monitor",
      },
      startup: {
        year: "2011-2013",
        title: "Innovations de startup primées trois années de suite",
        description:
          "De Smart Bottle à Skin Care et Personal Injector, DOMTEKNIKA a transformé des concepts de startup ambitieux en innovations primées dans les produits connectés, les technologies de beauté et les dispositifs médicaux.",
        icon: "document",
        awards: true,
      },
      totalCar: {
        year: "2013",
        title: "The Total Car",
        description:
          "Avec The Total Car, l'équipe a exploré de nouvelles architectures de véhicule utilisant des polymères biosourcés et des structures recyclables.",
        icon: "globe",
      },
      aventor: {
        year: "2014",
        title: "Aventor - la haute performance comme banc d'essai",
        description:
          "Lancé en 2012 comme projet interne de DOMTEKNIKA, Aventor a été entièrement conçu et prototypé par l'équipe, de l'architecture électrique et mécanique aux versions trois et quatre roues, avant la création d'une startup indépendante.",
        icon: "document",
      },
      boneFixation: {
        year: "2014",
        title: "Bone Fixation System",
        description:
          "Un concept de fixation médicale polymère développé pour DePuy Synthes, conçu pour simplifier l'usage chirurgical tout en assurant une stabilisation précise.",
        icon: "document",
      },
      softcar: {
        year: "2015",
        title: "Softcar Concept",
        description:
          "Imaginée dès 2006-2007 et toujours en développement, SOFTCAR est une plateforme de véhicule hybride pouvant aussi être configurée en 100 % électrique. DOMTEKNIKA a assuré toute la conception électrique et mécanique ainsi que le prototypage avant la création d'une startup indépendante.",
        icon: "globe",
      },
      stajvelo: {
        year: "2018",
        title: "Stajvelo - innovation polymère sur deux roues",
        description:
          "DOMTEKNIKA a appliqué son expertise polymère à Stajvelo, un vélo électrique urbain construit autour de structures intégrées, du confort et du design.",
        icon: "document",
      },
      softcarReveal: {
        year: "2024",
        title: "Présentation de Softcar",
        description:
          "Softcar révèle une nouvelle génération de véhicule urbain propre, concrétisant des décennies d'ingénierie légère et de mobilité circulaire.",
        icon: "globe",
      },
      today: {
        year: "Aujourd'hui",
        title: "Concevoir les solutions de demain",
        description:
          "DOMTEKNIKA continue d'accompagner les entreprises et les équipes d'innovation dans l'industrie, le médical et la mobilité, de l'idée jusqu'au prototype et à l'industrialisation.",
        icon: "document",
      },
    },
  },
  de: {
    eyebrow: "Our journey since 1998",
    title: "Unsere Geschichte",
    intro:
      "1998 vom visionären Ingenieur Jean-Luc Thuliez gegründet, verwandelt DOMTEKNIKA seit mehr als 25 Jahren komplexe technische Herausforderungen in zuverlässige Engineering-Lösungen. Von ersten Konzepten und Prototypen bis zu Simulation, Elektronik und industrieller Entwicklung machen wir aus Ideen konkrete, leistungsfähige und industrialisierbare Produkte. Entdecken Sie Projekte, die unsere Kompetenz und langjährige Erfahrung sichtbar machen.",
    cards: {
      founded: {
        year: "1998",
        title: "Gründung in La Neuveville, Schweiz",
        description:
          "DOMTEKNIKA entstand in La Neuveville mit einer klaren Ambition: Kreativität, Maschinenbau und Polymerkompetenz zu verbinden, um Ideen in konkrete Lösungen zu verwandeln.",
        icon: "box",
      },
      cree: {
        year: "2001",
        title: "SAM CREE - frühe Elektromobilität",
        description:
          "Bevor er DOMTEKNIKA gründete, wirkte Jean-Luc Thuliez bei einem anderen Unternehmen am Projekt SAM CREE mit. Das ultraleichte Elektro-Dreirad zeigte bereits die Mobilitätsideen, die später seinen Entwicklungsansatz prägen sollten.",
        icon: "box",
      },
      swissbiomed: {
        year: "2009",
        title: "SwissBiomed - ein eigenes Medizintechnik-Kapitel",
        description:
          "Mit SwissBiomed erweiterte DOMTEKNIKA sein Engineering-Know-how in die Medizintechnik und verband Präzisionsmechanik, Materialien und Prototyping.",
        icon: "monitor",
      },
      startup: {
        year: "2011-2013",
        title: "Prämierte Startup-Innovationen in drei aufeinanderfolgenden Jahren",
        description:
          "Von Smart Bottle bis Skin Care und Personal Injector entwickelte DOMTEKNIKA ambitionierte Startup-Konzepte zu prämierten Innovationen für vernetzte Produkte, Beauty-Technologie und Medizintechnik.",
        icon: "document",
        awards: true,
      },
      totalCar: {
        year: "2013",
        title: "The Total Car",
        description:
          "Mit The Total Car erforschte das Team neue Fahrzeugarchitekturen mit biobasierten Polymeren und recycelbaren Strukturen.",
        icon: "globe",
      },
      aventor: {
        year: "2014",
        title: "Aventor - Hochleistung als Entwicklungsprüfstand",
        description:
          "Aventor begann 2012 als internes DOMTEKNIKA-Projekt. Das Team übernahm die vollständige elektrische und mechanische Entwicklung sowie den Prototypenbau für Drei- und Vierradversionen, bevor ein eigenständiges Startup entstand.",
        icon: "document",
      },
      boneFixation: {
        year: "2014",
        title: "Bone Fixation System",
        description:
          "Ein polymerbasiertes medizinisches Fixationskonzept für DePuy Synthes, entwickelt für einfachere chirurgische Anwendung und präzise Stabilisierung.",
        icon: "document",
      },
      softcar: {
        year: "2015",
        title: "Softcar Concept",
        description:
          "SOFTCAR wurde 2006-2007 erstmals entworfen und wird weiterhin entwickelt. Die Hybridplattform kann auch vollelektrisch konfiguriert werden; DOMTEKNIKA verantwortete die vollständige elektrische und mechanische Entwicklung sowie den Prototypenbau vor der Gründung eines eigenständigen Startups.",
        icon: "globe",
      },
      stajvelo: {
        year: "2018",
        title: "Stajvelo - Polymerinnovation auf zwei Rädern",
        description:
          "DOMTEKNIKA übertrug seine Polymerexpertise auf Stajvelo, ein urbanes Elektrofahrrad mit integrierten Strukturen, Komfort und Design.",
        icon: "document",
      },
      softcarReveal: {
        year: "2024",
        title: "Vorstellung des Softcar",
        description:
          "Softcar zeigte eine neue Generation sauberer urbaner Fahrzeuge und machte Jahrzehnte leichter Ingenieurarbeit und Kreislaufmobilität greifbar.",
        icon: "globe",
      },
      today: {
        year: "Heute",
        title: "Engineering für die Lösungen von morgen",
        description:
          "DOMTEKNIKA begleitet Unternehmen und Innovationsteams aus Industrie, Medizintechnik und Mobilität von der Idee über den Prototyp bis zur Industrialisierung.",
        icon: "document",
      },
    },
  },
  es: {
    eyebrow: "Our journey since 1998",
    title: "Nuestra historia",
    intro:
      "Fundada en 1998 por Jean-Luc Thuliez, ingeniero visionario, DOMTEKNIKA lleva más de 25 años convirtiendo retos técnicos complejos en soluciones de ingeniería fiables. Desde los primeros conceptos y prototipos hasta la simulación, la electrónica y el desarrollo industrial, hacemos que las ideas evolucionen hacia productos concretos, eficaces e industrializables. Descubre una selección de proyectos que refleja nuestra capacidad técnica y trayectoria.",
    cards: {
      founded: {
        year: "1998",
        title: "Fundación en La Neuveville, Suiza",
        description:
          "DOMTEKNIKA nació en La Neuveville con una ambición clara: combinar creatividad, ingeniería mecánica y experiencia en polímeros para transformar ideas en soluciones concretas.",
        icon: "box",
      },
      cree: {
        year: "2001",
        title: "SAM CREE - movilidad eléctrica pionera",
        description:
          "Antes de fundar DOMTEKNIKA, Jean-Luc Thuliez participó en el proyecto SAM CREE dentro de otra empresa. Este triciclo eléctrico ultraligero ya reflejaba las ideas de movilidad que más tarde marcarían su enfoque de ingeniería.",
        icon: "box",
      },
      swissbiomed: {
        year: "2009",
        title: "SwissBiomed - un capítulo dedicado a la tecnología médica",
        description:
          "Con SwissBiomed, DOMTEKNIKA amplió su saber hacer hacia el desarrollo de dispositivos médicos, combinando mecánica de precisión, materiales y prototipado.",
        icon: "monitor",
      },
      startup: {
        year: "2011-2013",
        title: "Innovaciones startup premiadas durante tres años seguidos",
        description:
          "De Smart Bottle a Skin Care y Personal Injector, DOMTEKNIKA convirtió conceptos de startup ambiciosos en innovaciones premiadas para productos conectados, tecnología de belleza y dispositivos médicos.",
        icon: "document",
        awards: true,
      },
      totalCar: {
        year: "2013",
        title: "The Total Car",
        description:
          "Con The Total Car, el equipo exploró nuevas arquitecturas de vehículo basadas en polímeros de origen biológico y estructuras reciclables.",
        icon: "globe",
      },
      aventor: {
        year: "2014",
        title: "Aventor - el rendimiento como banco de pruebas",
        description:
          "Aventor comenzó en 2012 como proyecto interno de DOMTEKNIKA. El equipo realizó todo el diseño eléctrico y mecánico y el prototipado de versiones de tres y cuatro ruedas antes de crear una startup independiente.",
        icon: "document",
      },
      boneFixation: {
        year: "2014",
        title: "Bone Fixation System",
        description:
          "Concepto de fijación médica polimérica desarrollado para DePuy Synthes, diseñado para simplificar el uso quirúrgico y asegurar una estabilización precisa.",
        icon: "document",
      },
      softcar: {
        year: "2015",
        title: "Softcar Concept",
        description:
          "Diseñada por primera vez en 2006-2007 y todavía en desarrollo, SOFTCAR es una plataforma de vehículo híbrido que también puede configurarse como totalmente eléctrica. DOMTEKNIKA realizó todo el diseño eléctrico y mecánico y el prototipado antes de crear una startup independiente.",
        icon: "globe",
      },
      stajvelo: {
        year: "2018",
        title: "Stajvelo - innovación polimérica sobre dos ruedas",
        description:
          "DOMTEKNIKA aplicó su experiencia en polímeros a Stajvelo, una bicicleta eléctrica urbana concebida a partir de estructuras integradas, confort y diseño.",
        icon: "document",
      },
      softcarReveal: {
        year: "2024",
        title: "Presentación de Softcar",
        description:
          "Softcar reveló una nueva generación de vehículo urbano limpio, materializando décadas de ingeniería ligera y movilidad circular.",
        icon: "globe",
      },
      today: {
        year: "Hoy",
        title: "Ingeniería para las soluciones del mañana",
        description:
          "DOMTEKNIKA sigue acompañando a empresas y equipos de innovación de la industria, la tecnología médica y la movilidad, desde la idea hasta el prototipo y la industrialización.",
        icon: "document",
      },
    },
  },
  ko: {
    eyebrow: "Our journey since 1998",
    title: "회사 연혁",
    intro:
      "1998년 선구적인 엔지니어 Jean-Luc Thuliez가 설립한 DOMTEKNIKA는 25년 넘게 복잡한 기술 과제를 신뢰할 수 있는 엔지니어링 솔루션으로 전환해 왔습니다. 초기 콘셉트와 프로토타입부터 시뮬레이션, 전자 시스템, 산업화 개발까지 아이디어를 구체적이고 성능과 양산성을 갖춘 제품으로 발전시킵니다. 우리의 전문성과 경험을 보여 주는 프로젝트를 살펴보세요.",
    cards: {
      founded: {
        year: "1998",
        title: "스위스 La Neuveville에서 창립",
        description:
          "DOMTEKNIKA는 창의성, 기계공학, 폴리머 전문성을 결합해 아이디어를 구체적인 솔루션으로 바꾸겠다는 명확한 목표로 La Neuveville에서 시작되었습니다.",
        icon: "box",
      },
      cree: {
        year: "2001",
        title: "SAM CREE - 초기 전기 모빌리티",
        description:
          "DOMTEKNIKA를 설립하기 전, Jean-Luc Thuliez는 다른 회사에서 SAM CREE 프로젝트에 참여했습니다. 이 초경량 전기 삼륜차에는 훗날 그의 엔지니어링 접근법으로 이어질 모빌리티 철학이 이미 담겨 있었습니다.",
        icon: "box",
      },
      swissbiomed: {
        year: "2009",
        title: "SwissBiomed - 의료기기 개발의 새로운 장",
        description:
          "SwissBiomed를 통해 DOMTEKNIKA는 정밀 기계, 소재, 프로토타이핑을 결합해 의료기기 개발 분야로 전문성을 확장했습니다.",
        icon: "monitor",
      },
      startup: {
        year: "2011-2013",
        title: "3년 연속 수상한 startup 혁신",
        description:
          "Smart Bottle, Skin Care, Personal Injector까지 DOMTEKNIKA는 스마트 제품, 뷰티 기술, 의료기술 분야의 야심찬 startup 콘셉트를 수상 혁신으로 발전시켰습니다.",
        icon: "document",
        awards: true,
      },
      totalCar: {
        year: "2013",
        title: "The Total Car",
        description:
          "The Total Car를 통해 팀은 바이오 기반 폴리머와 재활용 가능한 구조를 활용한 새로운 차량 아키텍처를 탐구했습니다.",
        icon: "globe",
      },
      aventor: {
        year: "2014",
        title: "Aventor - 고성능을 개발 검증의 장으로",
        description:
          "Aventor는 2012년에 시작된 DOMTEKNIKA의 사내 프로젝트입니다. 팀이 전기·기계 설계와 시제품 제작을 모두 수행하고 세 바퀴와 네 바퀴 버전을 개발한 뒤 별도의 스타트업으로 이어졌습니다.",
        icon: "document",
      },
      boneFixation: {
        year: "2014",
        title: "Bone Fixation System",
        description:
          "DePuy Synthes를 위해 개발한 폴리머 기반 의료 고정 콘셉트로, 수술 사용성을 단순화하면서 정밀한 안정화를 목표로 했습니다.",
        icon: "document",
      },
      softcar: {
        year: "2015",
        title: "Softcar Concept",
        description:
          "SOFTCAR는 2006~2007년에 처음 설계되어 현재도 개발 중인 하이브리드 차량 플랫폼이며 순수 전기 구성도 가능합니다. DOMTEKNIKA가 전기·기계 설계와 시제품 제작 전 과정을 수행한 뒤 별도의 스타트업으로 이어졌습니다.",
        icon: "globe",
      },
      stajvelo: {
        year: "2018",
        title: "Stajvelo - 두 바퀴 위의 폴리머 혁신",
        description:
          "DOMTEKNIKA는 통합 구조, 편안함, 디자인을 갖춘 도심형 전기자전거 Stajvelo에 폴리머 설계 전문성을 적용했습니다.",
        icon: "document",
      },
      softcarReveal: {
        year: "2024",
        title: "Softcar 공개",
        description:
          "Softcar는 수십 년간 축적한 경량 엔지니어링과 순환 모빌리티 연구를 구현한 차세대 저환경 도시형 차량입니다.",
        icon: "globe",
      },
      today: {
        year: "오늘",
        title: "미래를 위한 엔지니어링",
        description:
          "DOMTEKNIKA는 산업, 의료기술, 모빌리티 분야의 기업과 혁신팀을 아이디어부터 프로토타입, 산업화까지 지원합니다.",
        icon: "document",
      },
    },
  },
  zh: {
    eyebrow: "Our journey since 1998",
    title: "我们的故事",
    intro:
      "DOMTEKNIKA 于 1998 年由富有远见的工程师 Jean-Luc Thuliez 创立。25 年多来，我们持续将复杂技术挑战转化为可靠的工程解决方案。从早期概念和原型，到仿真、电子系统与工业化开发，我们让创意成长为具体、可靠且可工业化的产品。通过这些代表项目，了解我们的专业能力与长期积累。",
    cards: {
      founded: {
        year: "1998",
        title: "创立于瑞士 La Neuveville",
        description:
          "DOMTEKNIKA 诞生于 La Neuveville，目标明确：把创意、机械工程和聚合物专长结合起来，将想法转化为具体方案。",
        icon: "box",
      },
      cree: {
        year: "2001",
        title: "SAM CREE - 早期电动出行探索",
        description:
          "在创立 DOMTEKNIKA 之前，Jean-Luc Thuliez 曾在另一家公司参与 SAM CREE 项目。这款超轻型电动三轮车已经体现出后来影响其工程方法的出行理念。",
        icon: "box",
      },
      swissbiomed: {
        year: "2009",
        title: "SwissBiomed - 专注医疗技术的新篇章",
        description:
          "借助 SwissBiomed，DOMTEKNIKA 将工程能力扩展到医疗器械开发，结合精密机械、材料和原型开发。",
        icon: "monitor",
      },
      startup: {
        year: "2011-2013",
        title: "连续三年获奖的 startup 创新",
        description:
          "从 Smart Bottle 到 Skin Care 和 Personal Injector，DOMTEKNIKA 将智能产品、美妆科技和医疗技术领域具有突破性的 startup 概念转化为获奖创新。",
        icon: "document",
        awards: true,
      },
      totalCar: {
        year: "2013",
        title: "The Total Car",
        description:
          "通过 The Total Car，团队探索了使用生物基聚合物和可回收结构的新型车辆架构。",
        icon: "globe",
      },
      aventor: {
        year: "2014",
        title: "Aventor - 以性能作为试验场",
        description:
          "Aventor 于 2012 年作为 DOMTEKNIKA 内部项目启动。团队完成了全部电气、机械设计与样机开发，并推出三轮和四轮版本，之后成立了独立初创公司。",
        icon: "document",
      },
      boneFixation: {
        year: "2014",
        title: "Bone Fixation System",
        description:
          "为 DePuy Synthes 开发的聚合物医疗固定概念，旨在简化外科使用并实现精确稳定。",
        icon: "document",
      },
      softcar: {
        year: "2015",
        title: "Softcar Concept",
        description:
          "SOFTCAR 于 2006 至 2007 年首次设计，目前仍在持续开发。这是一款可配置为纯电版本的混合动力车辆平台；DOMTEKNIKA 在成立独立初创公司之前完成了全部电气、机械设计与样机开发。",
        icon: "globe",
      },
      stajvelo: {
        year: "2018",
        title: "Stajvelo - 两轮上的聚合物创新",
        description:
          "DOMTEKNIKA 将聚合物设计专长应用于 Stajvelo，这是一款围绕集成结构、舒适性和设计打造的城市电动自行车。",
        icon: "document",
      },
      softcarReveal: {
        year: "2024",
        title: "Softcar 发布",
        description:
          "Softcar 展示了新一代低环境影响城市车辆，将数十年的轻量化工程与循环出行研究转化为具体产品。",
        icon: "globe",
      },
      today: {
        year: "今天",
        title: "面向未来的工程",
        description:
          "DOMTEKNIKA 继续支持工业、医疗技术和出行领域的企业与创新团队，从创意、原型一路走向工业化。",
        icon: "document",
      },
    },
  },
};

const MEDIA: Record<
  MediaKey,
  {
    images: Array<{
      src: string;
      alt: string;
      title: string;
      meta: string;
      width: number;
      height: number;
      className?: string;
      projectId?: string;
      loading?: "eager" | "lazy";
    }>;
    className?: string;
  }
> = {
  lake: {
    className: "md:pt-5",
    images: [
      {
        src: "/assets/our-story/la-neuveville.jpg",
        alt: "Lake Biel landscape near La Neuveville",
        title: "La Neuveville",
        meta: "Suisse",
        width: 799,
        height: 533,
        loading: "eager",
        className: "w-[280px] sm:w-[340px] md:w-[300px] xl:w-[340px] min-[1800px]:!w-[390px] min-[2400px]:!w-[425px]",
      },
    ],
  },
  cree: {
    images: [
      {
        src: "/assets/our-story/cree.png",
        alt: "Green CREE electric vehicle prototype",
        title: "CREE",
        meta: "2001",
        width: 338,
        height: 223,
        className: "w-[260px] sm:w-[330px] md:w-[290px] xl:w-[330px] min-[1800px]:!w-[380px] min-[2400px]:!w-[415px]",
      },
    ],
  },
  startupProducts: {
    className: "gap-3 sm:flex-row md:flex-col xl:flex-row xl:gap-4 min-[1800px]:!gap-5 min-[2400px]:!gap-6",
    images: [
      {
        src: "/assets/our-story/smart-bottle-ethimedix.png",
        alt: "Smart Bottle concept render",
        title: "Smart Bottle",
        meta: "2011",
        width: 600,
        height: 900,
        className: "w-[120px] rotate-[-5deg] sm:w-[140px] min-[1800px]:!w-[160px] min-[2400px]:!w-[176px]",
        projectId: "smart-bottle",
      },
      {
        src: "/assets/our-story/personal-injector.png",
        alt: "Personal injector product render",
        title: "Personal Injector",
        meta: "2013",
        width: 265,
        height: 142,
        className: "w-[210px] sm:w-[250px] min-[1800px]:!w-[288px] min-[2400px]:!w-[315px]",
        projectId: "personal-injector",
      },
    ],
  },
  startupCar: {
    images: [
      {
        src: "/assets/our-story/total-car-expo.jpg",
        alt: "The Total Car prototype displayed at an exhibition",
        title: "The Total Car",
        meta: "2013",
        width: 1600,
        height: 1066,
        className: "w-[280px] sm:w-[370px] md:w-[320px] xl:w-[370px] min-[1800px]:!w-[425px] min-[2400px]:!w-[465px]",
      },
    ],
  },
  totalCar: {
    images: [
      {
        src: "/assets/our-story/total-car.png",
        alt: "Aventor performance vehicle on track",
        title: "Aventor",
        meta: "2015",
        width: 452,
        height: 202,
        className: "w-[300px] sm:w-[390px] md:w-[310px] lg:w-[340px] xl:w-[390px] min-[1800px]:!w-[448px] min-[2400px]:!w-[490px]",
      },
    ],
  },
  boneFixation: {
    images: [
      {
        src: "/assets/our-story/bone-fixation-production.jpg",
        alt: "Bone fixation system prototype",
        title: "Bone Fixation",
        meta: "2016",
        width: 1200,
        height: 800,
        className: "w-[260px] sm:w-[340px] md:w-[300px] xl:w-[340px] min-[1800px]:!w-[390px] min-[2400px]:!w-[425px]",
      },
    ],
  },
  airsmile: {
    images: [
      {
        src: "/assets/projects/airsmile/airsmile-01.webp",
        alt: "AirSmile handheld dental care device render",
        title: "AirSmile",
        meta: "2009",
        width: 856,
        height: 552,
        className: "w-[230px] sm:w-[300px] md:w-[260px] xl:w-[300px] min-[1800px]:!w-[345px] min-[2400px]:!w-[380px]",
      },
    ],
  },
  softcar: {
    images: [
      {
        src: "/assets/our-story/softcar-concept.png",
        alt: "White Softcar concept vehicle",
        title: "Softcar",
        meta: "2017",
        width: 249,
        height: 184,
        className: "w-[220px] sm:w-[248px] min-[1800px]:!w-[285px] min-[2400px]:!w-[315px]",
      },
    ],
  },
  stajvelo: {
    images: [
      {
        src: "/assets/our-story/stajvelo.png",
        alt: "Stajvelo e-bike against a concrete wall",
        title: "Stajvelo",
        meta: "2018",
        width: 359,
        height: 204,
        className: "w-[285px] sm:w-[355px] md:w-[300px] lg:w-[330px] xl:w-[355px] min-[1800px]:!w-[410px] min-[2400px]:!w-[450px]",
      },
    ],
  },
  softcarReveal: {
    images: [
      {
        src: "/assets/our-story/softcar-v1.png",
        alt: "Yellow Softcar reveal vehicle",
        title: "Softcar",
        meta: "2024",
        width: 275,
        height: 183,
        className: "w-[245px] sm:w-[275px] md:w-[240px] xl:w-[275px] min-[1800px]:!w-[318px] min-[2400px]:!w-[350px]",
      },
    ],
  },
};

const TIMELINE_ROWS: TimelineRow[] = [
  { left: { type: "card", key: "founded" }, right: { type: "media", key: "lake" } },
  { left: { type: "media", key: "cree" }, right: { type: "card", key: "cree" } },
  {
    left: { type: "card", key: "swissbiomed" },
    right: { type: "media", key: "airsmile" },
  },
  { left: { type: "media", key: "startupProducts" }, right: { type: "card", key: "startup" } },
  { left: { type: "card", key: "totalCar" }, right: { type: "media", key: "startupCar" } },
  { left: { type: "media", key: "totalCar" }, right: { type: "card", key: "aventor" } },
  { left: { type: "card", key: "boneFixation" }, right: { type: "media", key: "boneFixation" } },
  { left: { type: "media", key: "softcar" }, right: { type: "card", key: "softcar" } },
  { left: { type: "card", key: "stajvelo" }, right: { type: "media", key: "stajvelo" } },
  { left: { type: "media", key: "softcarReveal" }, right: { type: "card", key: "softcarReveal" } },
  { left: { type: "card", key: "today" } },
];

export function getOurStoryCopy(locale: string) {
  return STORY_COPY[isStoryLocale(locale) ? locale : "en"];
}

function isStoryLocale(locale: string): locale is StoryLocale {
  return locale in STORY_COPY;
}

export function OurStoryPageContent({ locale }: { locale: string }) {
  const copy = getOurStoryCopy(locale);
  const router = useRouter();
  const [locationMapOpen, setLocationMapOpen] = useState(false);

  const openProject = useCallback(
    (projectId: string) => {
      router.push(`/projects/${projectId}`);
    },
    [router],
  );

  return (
    <section
      className="relative overflow-hidden bg-background pt-[132px] md:pt-[152px]"
      aria-labelledby="our-story-title"
    >
      <Image
        src="/assets/our-story/background/technical-front-flange.png"
        alt=""
        width={1448}
        height={1086}
        priority
        sizes="(max-width: 768px) 84vw, 520px"
        className="pointer-events-none absolute right-[-34vw] top-[82px] z-0 w-[84vw] max-w-[600px] rotate-[-10deg] opacity-[0.13] sm:right-[-20vw] sm:w-[78vw] md:right-[-1vw] md:top-[64px] md:w-[42vw] min-[1800px]:!right-[4vw] min-[1800px]:!top-[84px] min-[1800px]:!max-w-[900px] min-[2400px]:!right-[6vw] min-[2400px]:!max-w-[1050px]"
      />
      <OurStoryBackgroundSketches />

      <Container size="wide" className="relative z-10 pb-14 md:pb-[72px] min-[1800px]:!pb-[100px] min-[2400px]:!pb-[120px]">
        <div className="max-w-[540px] min-[1800px]:!max-w-[720px] min-[2400px]:!max-w-[900px]">
          <Reveal>
            <div className="flex items-center gap-3 text-[15px] font-medium leading-none text-muted-foreground md:text-[16px] min-[2400px]:!gap-5 min-[2400px]:!text-[26px]">
              <span className="h-[3px] w-[34px] shrink-0 bg-brand min-[2400px]:!h-1 min-[2400px]:!w-[74px]" aria-hidden />
              {copy.eyebrow}
            </div>
            <h1
              id="our-story-title"
              className="domtek-text-shadow mt-[38px] text-[42px] font-extrabold leading-none text-foreground sm:text-[60px] md:mt-[52px] md:text-[66px] min-[1800px]:!text-[74px] min-[2400px]:!mt-[82px] min-[2400px]:!text-[78px]"
            >
              {copy.title}
              <span className="text-brand">.</span>
            </h1>
            <p className="mt-8 max-w-[430px] text-[15px] font-medium leading-[1.35] text-muted-foreground sm:text-[16px] min-[1800px]:!max-w-[620px] min-[1800px]:!text-[18px] min-[2400px]:!max-w-[760px] min-[2400px]:!text-[21px]">
              {copy.intro}
            </p>
          </Reveal>

        </div>

        <OurStoryTimelineRail>
          {TIMELINE_ROWS.map((row, index) => (
            <TimelineRow
              key={index}
              row={row}
              copy={copy}
              onOpenProject={openProject}
              onOpenLocationMap={() => setLocationMapOpen(true)}
            />
          ))}
        </OurStoryTimelineRail>
      </Container>

      {locationMapOpen && (
        <OurStoryLocationDialog
          locale={locale as StoryLocale}
          onClose={() => setLocationMapOpen(false)}
        />
      )}
    </section>
  );
}

function OurStoryBackgroundSketches() {
  const bearingSupport = "/assets/our-story/background/technical-bearing-support.png";
  const chassis = "/assets/our-story/background/technical-chassis-frame.png";
  const bearing = "/assets/our-story/background/technical-exploded-bearing.png";
  const explodedShaft = "/assets/our-story/background/technical-exploded-shaft-layout.png";
  const flange = "/assets/our-story/background/technical-flange-bracket.png";
  const frontFlange = "/assets/our-story/background/technical-front-flange.png";
  const liteChassis = "/assets/our-story/background/technical-lite-chassis.png";
  const moldCavity = "/assets/our-story/background/technical-mold-cavity.png";
  const rectBlock = "/assets/our-story/background/technical-rectangular-block.png";
  const roundFlange = "/assets/our-story/background/technical-round-flange-detail.png";

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <Image
        src={chassis}
        alt=""
        width={1448}
        height={1086}
        sizes="(max-width: 768px) 86vw, 520px"
        className="absolute right-[-36vw] top-[560px] w-[84vw] max-w-[600px] rotate-[-10deg] opacity-[0.12] sm:left-[-22vw] sm:right-auto sm:opacity-[0.15] md:left-[-7vw] md:top-[640px] md:w-[40vw]"
      />
      <Image
        src={bearingSupport}
        alt=""
        width={1448}
        height={1086}
        sizes="(max-width: 768px) 72vw, 460px"
        className="absolute right-[-40vw] top-[940px] w-[72vw] max-w-[460px] rotate-[8deg] opacity-[0.09] sm:right-[-30vw] md:left-[62vw] md:right-auto md:top-[1000px] md:w-[32vw] md:opacity-[0.12]"
      />
      <Image
        src={bearing}
        alt=""
        width={1448}
        height={1086}
        sizes="(max-width: 768px) 92vw, 620px"
        className="absolute right-[-54vw] top-[1210px] w-[90vw] max-w-[660px] rotate-[14deg] scale-x-[-1] opacity-[0.13] sm:right-[-38vw] md:right-[-16vw] md:top-[1340px] md:w-[46vw]"
      />
      <Image
        src={frontFlange}
        alt=""
        width={1448}
        height={1086}
        sizes="82vw"
        className="absolute left-[-48vw] top-[1600px] w-[82vw] max-w-[360px] rotate-[-12deg] opacity-[0.075] md:hidden"
      />
      <Image
        src={moldCavity}
        alt=""
        width={1448}
        height={1086}
        sizes="86vw"
        className="absolute right-[-52vw] top-[2240px] w-[86vw] max-w-[390px] rotate-[10deg] opacity-[0.065] md:hidden"
      />
      <Image
        src={roundFlange}
        alt=""
        width={930}
        height={695}
        sizes="74vw"
        className="absolute left-[-40vw] top-[2920px] w-[74vw] max-w-[330px] rotate-[9deg] opacity-[0.08] md:hidden"
      />
      <Image
        src={explodedShaft}
        alt=""
        width={1448}
        height={1086}
        sizes="94vw"
        className="absolute right-[-56vw] top-[3720px] w-[94vw] max-w-[420px] rotate-[7deg] opacity-[0.055] md:hidden"
      />
      <Image
        src={liteChassis}
        alt=""
        width={1448}
        height={1086}
        sizes="104vw"
        className="absolute left-[-60vw] top-[4580px] w-[104vw] max-w-[480px] rotate-[-5deg] opacity-[0.05] md:hidden"
      />
      <Image
        src={frontFlange}
        alt=""
        width={1448}
        height={1086}
        sizes="500px"
        className="absolute left-[-12vw] top-[1600px] hidden w-[34vw] max-w-[500px] rotate-[-12deg] opacity-[0.11] md:block"
      />
      <Image
        src={liteChassis}
        alt=""
        width={1448}
        height={1086}
        sizes="720px"
        className="absolute left-[-18vw] top-[1880px] hidden w-[54vw] max-w-[720px] rotate-[-5deg] opacity-[0.045] xl:block"
      />
      <Image
        src={flange}
        alt=""
        width={1448}
        height={1086}
        sizes="560px"
        className="absolute left-[64vw] top-[2260px] hidden w-[30vw] max-w-[440px] rotate-[-7deg] opacity-[0.075] md:block"
      />
      <Image
        src={moldCavity}
        alt=""
        width={1448}
        height={1086}
        sizes="560px"
        className="absolute left-[-12vw] top-[2460px] hidden w-[38vw] max-w-[560px] rotate-[10deg] opacity-[0.085] md:block"
      />
      <Image
        src={rectBlock}
        alt=""
        width={1448}
        height={1086}
        sizes="(max-width: 768px) 66vw, 470px"
        className="absolute right-[-42vw] top-[2920px] w-[66vw] max-w-[430px] rotate-[-10deg] opacity-[0.08] sm:right-[-30vw] md:left-[66vw] md:right-auto md:top-[2980px] md:w-[28vw] md:max-w-[410px] md:opacity-[0.08]"
      />
      <Image
        src={roundFlange}
        alt=""
        width={930}
        height={695}
        sizes="520px"
        className="absolute left-[-7vw] top-[3160px] hidden w-[36vw] max-w-[500px] rotate-[9deg] opacity-[0.11] md:block"
      />
      <Image
        src={explodedShaft}
        alt=""
        width={1448}
        height={1086}
        sizes="650px"
        className="absolute left-[52vw] top-[3320px] hidden w-[40vw] max-w-[600px] rotate-[7deg] opacity-[0.06] md:block"
      />
    </div>
  );
}

function TimelineRow({
  row,
  copy,
  onOpenProject,
  onOpenLocationMap,
}: {
  row: TimelineRow;
  copy: StoryCopy;
  onOpenProject: (projectId: string) => void;
  onOpenLocationMap: () => void;
}) {
  return (
    <OurStoryTimelineStep
      className="relative grid grid-cols-[28px_minmax(0,1fr)] gap-x-4 gap-y-5 md:grid-cols-[minmax(0,1fr)_36px_minmax(0,1fr)] md:gap-x-6 min-[1800px]:!grid-cols-[minmax(0,1fr)_44px_minmax(0,1fr)] min-[1800px]:!gap-x-8 min-[2400px]:!grid-cols-[minmax(0,1fr)_50px_minmax(0,1fr)] min-[2400px]:!gap-x-10"
      dotClassName="relative z-10 col-start-1 row-span-2 flex justify-center pt-8 md:col-start-2 md:pt-10 min-[1800px]:!pt-12 min-[2400px]:!pt-14"
    >
      {row.left ? (
        <OurStoryTimelineBlock className="col-start-2 row-start-1 md:col-start-1">
        <StoryBlock
          block={row.left}
          copy={copy}
          side="left"
          onOpenProject={onOpenProject}
          onOpenLocationMap={onOpenLocationMap}
          />
        </OurStoryTimelineBlock>
      ) : (
        <div className="hidden md:block" />
      )}

      {row.right ? (
        <OurStoryTimelineBlock
          className={cn(
            "col-start-2 md:col-start-3 md:row-start-1",
            row.left ? "row-start-2" : "row-start-1",
          )}
        >
          <StoryBlock
            block={row.right}
            copy={copy}
            side="right"
            onOpenProject={onOpenProject}
            onOpenLocationMap={onOpenLocationMap}
          />
        </OurStoryTimelineBlock>
      ) : (
        <div className="hidden md:block" />
      )}
    </OurStoryTimelineStep>
  );
}

function StoryBlock({
  block,
  copy,
  side,
  onOpenProject,
  onOpenLocationMap,
}: {
  block: TimelineBlock;
  copy: StoryCopy;
  side: "left" | "right";
  onOpenProject: (projectId: string) => void;
  onOpenLocationMap: () => void;
}) {
  if (block.type === "card") {
    return (
      <TimelineCard
        card={copy.cards[block.key]}
        projectId={STORY_CARD_PROJECT_IDS[block.key]}
        opensLocationMap={block.key === "founded"}
        side={side}
        onOpenProject={onOpenProject}
        onOpenLocationMap={onOpenLocationMap}
      />
    );
  }

  return (
    <TimelineMedia
      media={MEDIA[block.key]}
      side={side}
      projectId={STORY_MEDIA_PROJECT_IDS[block.key]}
      onOpenProject={onOpenProject}
      onOpenLocationMap={block.key === "lake" ? onOpenLocationMap : undefined}
    />
  );
}

function TimelineCard({
  card,
  projectId,
  opensLocationMap,
  side,
  onOpenProject,
  onOpenLocationMap,
}: {
  card: StoryCard;
  projectId?: string;
  opensLocationMap?: boolean;
  side: "left" | "right";
  onOpenProject: (projectId: string) => void;
  onOpenLocationMap: () => void;
}) {
  const isInteractive = Boolean(projectId || opensLocationMap);
  const className = cn(
    "group/card relative grid min-h-[112px] w-full max-w-[500px] grid-cols-1 gap-3 rounded-[7px] border border-border bg-white px-4 py-4 text-left shadow-[0_10px_30px_rgba(0,0,0,0.035)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_18px_42px_rgba(0,0,0,0.07)] [transition-timing-function:var(--ease-smooth)] sm:items-center md:min-h-[116px] md:max-w-[460px] md:px-5 md:py-4 lg:max-w-[470px] min-[1800px]:!min-h-[140px] min-[1800px]:!max-w-[560px] min-[1800px]:!gap-4 min-[1800px]:!px-7 min-[1800px]:!py-6 min-[2400px]:!min-h-[156px] min-[2400px]:!max-w-[620px] min-[2400px]:!px-8 min-[2400px]:!py-7",
    side === "left" ? "md:justify-self-end" : "md:justify-self-start",
    isInteractive &&
      "cursor-pointer pr-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 sm:pr-11 min-[1800px]:!pr-16 min-[2400px]:!pr-20",
    card.awards &&
      "gap-4 pr-12 sm:grid-cols-1 sm:items-start sm:pr-12 lg:grid-cols-[minmax(0,1fr)_176px] lg:pr-5 min-[1800px]:!grid-cols-[minmax(0,1fr)_200px] min-[1800px]:!pr-7 min-[2400px]:!grid-cols-[minmax(0,1fr)_220px] min-[2400px]:!pr-8",
  );

  const content = (
    <>
      <div className="min-w-0">
        <span className="block text-[13px] font-extrabold leading-none text-brand md:text-[14px] min-[1800px]:!text-[16px] min-[2400px]:!text-[18px]">
          {card.year}
        </span>
        <h3 className="mt-3 text-[16px] font-extrabold leading-tight text-foreground md:text-[17px] min-[1800px]:!text-[20px] min-[2400px]:!text-[22px]">
          {card.title}
        </h3>
        <p className="mt-2.5 text-[12px] font-medium leading-[1.5] text-muted-foreground md:text-[13px] min-[1800px]:!mt-3 min-[1800px]:!text-[15px] min-[2400px]:!text-[17px]">
          {card.description}
        </p>
      </div>

      {card.awards && (
        <Image
          src="/assets/our-story/awards.png"
          alt=""
          width={218}
          height={76}
          className="pointer-events-none w-[126px] self-start justify-self-start invert hue-rotate-180 sm:w-[140px] lg:col-start-2 lg:row-start-1 lg:w-[150px] lg:justify-self-center min-[1800px]:!w-[176px] min-[2400px]:!w-[194px]"
        />
      )}
      {isInteractive && (
        <span
          className="absolute right-3 top-3 grid size-6 place-items-center text-muted-foreground/70 transition-[color,transform] duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-muted-foreground min-[1800px]:!right-4 min-[1800px]:!top-4 min-[1800px]:!size-8 min-[2400px]:!size-9"
          aria-hidden
        >
          <ArrowUpRight className="size-4 min-[1800px]:!size-5 min-[2400px]:!size-6" />
        </span>
      )}
    </>
  );

  if (projectId) {
    return (
      <button
        type="button"
        className={className}
        onClick={() => onOpenProject(projectId)}
      >
        {content}
      </button>
    );
  }

  if (opensLocationMap) {
    return (
      <button type="button" className={className} onClick={onOpenLocationMap}>
        {content}
      </button>
    );
  }

  return <article className={className}>{content}</article>;
}

function TimelineMedia({
  media,
  side,
  projectId,
  onOpenProject,
  onOpenLocationMap,
}: {
  media: (typeof MEDIA)[MediaKey];
  side: "left" | "right";
  projectId?: string;
  onOpenProject: (projectId: string) => void;
  onOpenLocationMap?: () => void;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col items-center justify-center py-2 min-[1800px]:!py-3",
        side === "left" ? "md:items-end md:pr-4 min-[1800px]:!pr-6" : "md:items-start md:pl-4 min-[1800px]:!pl-6",
        media.className,
      )}
    >
      {media.images.map((image) => {
        const imageProjectId = image.projectId ?? projectId;
        const isInteractive = Boolean(imageProjectId || onOpenLocationMap);

        return (
          <figure
            key={image.src}
            className={cn(
              "relative max-w-full overflow-hidden rounded-[7px] border border-border bg-white shadow-[0_14px_36px_rgba(0,0,0,0.08)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_18px_42px_rgba(0,0,0,0.07)] focus-within:-translate-y-0.5 focus-within:border-brand/30 focus-within:shadow-[0_18px_42px_rgba(0,0,0,0.07)] [transition-timing-function:var(--ease-smooth)]",
              isInteractive &&
                "group/location",
              image.className,
            )}
          >
            <div className="relative bg-muted/30 px-2 pt-2 min-[1800px]:!px-3 min-[1800px]:!pt-3 min-[2400px]:!px-4 min-[2400px]:!pt-4">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading={image.loading ?? "lazy"}
              fetchPriority={image.loading === "eager" ? "auto" : "low"}
              sizes="(max-width: 768px) 76vw, (max-width: 1799px) 390px, (max-width: 2399px) 490px, 540px"
              className="h-auto w-full object-contain"
            />
          </div>
          <figcaption className="border-t border-border bg-white px-3 py-2.5 min-[1800px]:!px-4 min-[1800px]:!py-3.5 min-[2400px]:!px-5 min-[2400px]:!py-4">
            <span className="block min-w-0 truncate text-[11px] font-extrabold leading-none text-foreground sm:text-[12px] min-[1800px]:!text-[14px] min-[2400px]:!text-[16px]">
              {image.title}
            </span>
          </figcaption>
          {isInteractive && (
            <button
              type="button"
              className="absolute inset-0 cursor-pointer rounded-[7px] outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
              aria-label={
                onOpenLocationMap
                  ? "Open DOMTEKNIKA location map"
                  : `Open project: ${image.title}`
              }
              onClick={() => {
                if (onOpenLocationMap) {
                  onOpenLocationMap();
                  return;
                }
                if (imageProjectId) onOpenProject(imageProjectId);
              }}
            />
          )}
          </figure>
        );
      })}
    </div>
  );
}

function OurStoryLocationDialog({
  locale,
  onClose,
}: {
  locale: StoryLocale;
  onClose: () => void;
}) {
  const copy = LOCATION_DIALOG_COPY[locale] ?? LOCATION_DIALOG_COPY.en;
  const dialogRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const previousActiveElement = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[120] grid place-items-center p-4 sm:p-6 min-[1800px]:!p-[34px]" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
        aria-label={copy.close}
        onClick={onClose}
      />
      <section
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="our-story-location-title"
        className="relative z-10 flex w-full max-w-[860px] flex-col overflow-hidden rounded-[10px] border border-border bg-white shadow-[0_28px_80px_rgba(0,0,0,0.24)] outline-none min-[1800px]:!h-[min(980px,calc(100vh-68px))] min-[1800px]:!max-w-[1680px] min-[1800px]:!rounded-[26px] min-[2400px]:!h-[min(1180px,calc(100vh-68px))] min-[2400px]:!max-w-[2040px]"
      >
        <div className="flex shrink-0 items-start justify-between gap-5 border-b border-border px-5 py-4 sm:px-7 sm:py-5 min-[1800px]:!gap-8 min-[1800px]:!px-10 min-[1800px]:!py-8 min-[2400px]:!px-12 min-[2400px]:!py-10">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wide text-brand min-[1800px]:!text-[15px] min-[2400px]:!text-[17px]">
              {copy.eyebrow}
            </p>
            <h2
              id="our-story-location-title"
              className="mt-1 text-[22px] font-extrabold leading-tight text-foreground sm:text-[28px] min-[1800px]:!mt-2 min-[1800px]:!text-[36px] min-[2400px]:!text-[42px]"
            >
              {copy.title}
            </h2>
          </div>
          <button
            type="button"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-brand hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-brand/35 min-[1800px]:!size-12 min-[2400px]:!size-14"
            aria-label={copy.close}
            onClick={onClose}
          >
            <X className="size-4 min-[1800px]:!size-5 min-[2400px]:!size-6" aria-hidden />
          </button>
        </div>
        <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-[minmax(0,1fr)_190px] min-[1800px]:!min-h-0 min-[1800px]:!flex-1 min-[1800px]:!grid-cols-[minmax(0,1fr)_360px] min-[1800px]:!gap-6 min-[1800px]:!p-7 min-[2400px]:!grid-cols-[minmax(0,1fr)_420px] min-[2400px]:!gap-8 min-[2400px]:!p-8">
          <div className="h-[300px] overflow-hidden rounded-[7px] border border-border sm:h-[390px] min-[1800px]:!h-full min-[1800px]:!min-h-0 min-[1800px]:!rounded-[14px] min-[2400px]:!rounded-[16px]">
            <LazyContactMap label="DOMTEKNIKA" />
          </div>
          <div className="flex min-h-0 flex-col justify-between rounded-[7px] border border-border bg-muted/30 p-4 sm:p-5 min-[1800px]:!rounded-[14px] min-[1800px]:!p-8 min-[2400px]:!rounded-[16px] min-[2400px]:!p-10">
            <p className="whitespace-pre-line text-[14px] font-medium leading-[1.5] text-muted-foreground min-[1800px]:!text-[16px] min-[2400px]:!text-[18px]">
              {copy.address}
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Chemin%20de%20Saint-Joux%2016B%2C%202520%20La%20Neuveville%2C%20Switzerland"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-3 self-start text-[13px] font-extrabold text-foreground transition-colors hover:text-brand focus-visible:ring-2 focus-visible:ring-brand/35 min-[1800px]:!gap-4 min-[1800px]:!text-[16px] min-[2400px]:!text-[18px]"
            >
              {copy.openMaps}
              <ArrowUpRight className="size-4 text-brand min-[1800px]:!size-5 min-[2400px]:!size-6" aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
