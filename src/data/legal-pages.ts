import { locales, type Locale } from "@/i18n/routing";
import { getAnalyticsCopy } from "@/data/analytics-copy";

export type LegalLink = {
  label: string;
  href: string;
};

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
  links?: LegalLink[];
};

export type LegalPageContent = {
  intro: string;
  updatedLabel: string;
  updated: string;
  sections: LegalSection[];
};

type LegalPages = {
  legalNotice: LegalPageContent;
  privacyPolicy: LegalPageContent;
};

const companyContact: LegalLink[] = [
  { label: "+41 32 751 71 46", href: "tel:+41327517146" },
  { label: "info@domteknika.ch", href: "mailto:info@domteknika.ch" },
];

type LegalEnhancements = {
  companyIdentity: string;
  legal: {
    registry: LegalSection;
    scope: LegalSection;
    submissions: LegalSection;
    acceptableUse: LegalSection;
    privacy: LegalSection;
    changes: LegalSection;
    severability: LegalSection;
  };
  privacy: {
    scope: LegalSection;
    legalBasis: LegalSection;
    emailProvider: LegalSection;
    automatedDecisions: LegalSection;
    children: LegalSection;
  };
};

const legalEnhancements: Record<Locale, LegalEnhancements> = {
  en: {
    companyIdentity:
      "Company limited by shares registered in the Commercial Register of the Canton of Bern\nCommercial register number: CH-550.0.125.280-2\nEnterprise identification number (UID): CHE-100.171.369",
    legal: {
      registry: {
        title: "Company identification and contact",
        paragraphs: [
          "Domteknika S.A. is a Swiss company limited by shares with its registered office in La Neuveville. The company details shown on this page correspond to the public commercial-register information available at the date of the last update.",
          "General enquiries, notices concerning this website and requests relating to its content may be addressed to the postal address, telephone number or email address stated above.",
        ],
      },
      scope: {
        title: "Purpose and scope of the website",
        paragraphs: [
          "This website presents DOMTEKNIKA, its engineering capabilities, selected projects and publicly available patent information. Its content is provided for general corporate and informational purposes only. Unless expressly stated in a separate written document signed by DOMTEKNIKA, it does not constitute an offer, a technical specification, professional advice, a warranty or a contractual commitment.",
          "Access to and use of the website are subject to this legal notice and to mandatory law. DOMTEKNIKA may modify, suspend or withdraw all or part of the website where reasonably necessary, including for maintenance, security or business reasons.",
        ],
      },
      submissions: {
        title: "Confidential information and unsolicited submissions",
        paragraphs: [
          "The public website and its contact form are not secure project workspaces and do not, by themselves, create a confidential, fiduciary, advisory or contractual relationship. Do not submit trade secrets, patentable concepts, regulated data, sensitive personal data or information belonging to a third party through the public form unless DOMTEKNIKA has expressly agreed in advance to receive it through an appropriate channel.",
          "Project confidentiality, ownership of results, licences, deliverables and permitted uses are governed only by the applicable written proposal, non-disclosure agreement or project contract. Receipt or acknowledgement of an unsolicited idea does not imply acceptance, exclusivity, compensation or an obligation to evaluate or use it.",
        ],
      },
      acceptableUse: {
        title: "Permitted and prohibited use",
        paragraphs: [
          "You may browse the website and use its public information for legitimate personal or professional evaluation. You must not interfere with its operation or security, attempt unauthorised access, introduce malicious code, circumvent technical measures, impersonate another person, or use the website in a way that infringes applicable law or third-party rights.",
          "Systematic extraction, scraping, framing, republication, creation of a competing database, reverse engineering of protected interactive elements, or use of website content to train or enrich a commercial artificial-intelligence model requires DOMTEKNIKA's prior written authorisation, except where such restriction is prohibited by mandatory law.",
        ],
      },
      privacy: {
        title: "Personal data",
        paragraphs: [
          "The processing of personal data in connection with this website is described in the privacy policy. That policy forms part of the information governing use of the website but does not limit rights granted by mandatory data-protection law.",
        ],
      },
      changes: {
        title: "Changes to the website and this notice",
        paragraphs: [
          "DOMTEKNIKA may update the website and this legal notice to reflect changes in its services, technology or legal obligations. The version displayed online, together with its update date, is the current version. Material contractual rights already agreed in writing are not altered by a website update.",
        ],
      },
      severability: {
        title: "Severability and mandatory law",
        paragraphs: [
          "If a provision of this notice is invalid or unenforceable, the remaining provisions remain unaffected to the extent permitted by law. No provision excludes or limits liability where an exclusion or limitation is prohibited, including liability for wilful misconduct or gross negligence under applicable Swiss law.",
        ],
      },
    },
    privacy: {
      scope: {
        title: "Scope and categories of data",
        paragraphs: [
          "This policy covers personal data processed through the public website, the contact form and related business correspondence. Depending on how you interact with us, this may include identification and contact details, company and professional information, the content of your request, correspondence history, language preference, and technical connection or security data.",
          "We generally collect data directly from you or automatically from your browser when you use the website. We may also receive ordinary business contact details from your employer, colleagues, publicly available professional sources or a person who introduces you to us.",
        ],
      },
      legalBasis: {
        title: "Justifications and legal bases",
        paragraphs: [
          "Under Swiss law, we process personal data lawfully, proportionately and for the purposes described in this policy. Where the GDPR applies, processing is based, as appropriate, on steps requested before entering into a contract, performance of a contract, compliance with legal obligations, our legitimate interests in operating a secure website and managing business relationships, or consent where consent is specifically requested.",
          "You may withdraw consent at any time for future processing. Withdrawal does not affect processing already carried out or processing that relies on another lawful basis.",
        ],
      },
      emailProvider: {
        title: "Contact-form delivery provider",
        paragraphs: [
          "Messages submitted through the contact form are delivered to DOMTEKNIKA through Resend, a service operated by Plus Five Five, Inc., United States. The transmitted data includes the contact details and message you enter, together with delivery metadata required to send and secure the email.",
          "Resend states that account data, email metadata, logs and API records are stored in the United States. Where required, transfers are protected through recognised contractual safeguards, including standard contractual clauses. Do not use the public form for confidential project files or sensitive data.",
        ],
        links: [
          { label: "Resend privacy policy", href: "https://resend.com/legal/privacy-policy" },
          { label: "Resend data-processing addendum", href: "https://resend.com/legal/dpa" },
        ],
      },
      automatedDecisions: {
        title: "Automated decisions and profiling",
        paragraphs: [
          "DOMTEKNIKA does not use data collected through this website to make automated individual decisions with legal or similarly significant effects. It does not create advertising profiles from website visits and does not sell personal data.",
        ],
      },
      children: {
        title: "Children",
        paragraphs: [
          "This corporate website is intended for professional and general audiences and is not directed at children. We do not knowingly request personal data from children through the contact form. A parent or guardian who believes that a child has submitted personal data may contact us to request review and, where appropriate, deletion.",
        ],
      },
    },
  },
  fr: {
    companyIdentity:
      "Société anonyme inscrite au Registre du commerce du canton de Berne\nNuméro au registre du commerce : CH-550.0.125.280-2\nNuméro d’identification des entreprises (IDE) : CHE-100.171.369",
    legal: {
      registry: {
        title: "Identification de l’entreprise et contact",
        paragraphs: [
          "Domteknika S.A. est une société anonyme suisse dont le siège est à La Neuveville. Les informations figurant sur cette page correspondent aux données publiques du registre du commerce disponibles à la date de la dernière mise à jour.",
          "Les demandes générales, notifications relatives au site et questions concernant son contenu peuvent être adressées à l’adresse postale, au numéro de téléphone ou à l’adresse e-mail indiqués ci-dessus.",
        ],
      },
      scope: {
        title: "Objet et portée du site",
        paragraphs: [
          "Ce site présente DOMTEKNIKA, ses compétences d’ingénierie, une sélection de projets et des informations publiques relatives à des brevets. Son contenu est fourni à des fins institutionnelles et informatives. Sauf mention expresse dans un document écrit distinct signé par DOMTEKNIKA, il ne constitue ni une offre, ni une spécification technique, ni un conseil professionnel, ni une garantie, ni un engagement contractuel.",
          "L’accès au site et son utilisation sont soumis aux présentes mentions ainsi qu’au droit impératif. DOMTEKNIKA peut modifier, suspendre ou retirer tout ou partie du site lorsque cela est raisonnablement nécessaire, notamment pour des raisons de maintenance, de sécurité ou d’activité.",
        ],
      },
      submissions: {
        title: "Informations confidentielles et envois spontanés",
        paragraphs: [
          "Le site public et son formulaire de contact ne sont pas des espaces projet sécurisés et ne créent, à eux seuls, aucune relation confidentielle, fiduciaire, de conseil ou contractuelle. N’y transmettez aucun secret d’affaires, concept brevetable, donnée réglementée, donnée personnelle sensible ou information appartenant à un tiers sans accord préalable exprès de DOMTEKNIKA et sans canal approprié.",
          "La confidentialité d’un projet, la propriété des résultats, les licences, les livrables et les usages autorisés sont régis exclusivement par l’offre, l’accord de confidentialité ou le contrat de projet applicable. La réception ou l’accusé de réception d’une idée spontanée n’implique ni acceptation, ni exclusivité, ni rémunération, ni obligation de l’évaluer ou de l’utiliser.",
        ],
      },
      acceptableUse: {
        title: "Utilisation autorisée et usages interdits",
        paragraphs: [
          "Vous pouvez consulter le site et utiliser ses informations publiques dans le cadre d’une évaluation personnelle ou professionnelle légitime. Il est interdit de perturber son fonctionnement ou sa sécurité, de tenter un accès non autorisé, d’introduire un code malveillant, de contourner des mesures techniques, d’usurper une identité ou d’utiliser le site en violation du droit applicable ou des droits de tiers.",
          "L’extraction systématique, le scraping, l’intégration par cadrage, la republication, la création d’une base de données concurrente, la rétro-ingénierie d’éléments interactifs protégés ou l’utilisation des contenus pour entraîner ou enrichir un modèle commercial d’intelligence artificielle nécessitent l’autorisation écrite préalable de DOMTEKNIKA, sauf lorsque le droit impératif interdit une telle restriction.",
        ],
      },
      privacy: {
        title: "Données personnelles",
        paragraphs: [
          "Le traitement des données personnelles en lien avec ce site est décrit dans la politique de confidentialité. Celle-ci fait partie des informations régissant l’utilisation du site, sans limiter les droits accordés par le droit impératif de la protection des données.",
        ],
      },
      changes: {
        title: "Évolution du site et des présentes mentions",
        paragraphs: [
          "DOMTEKNIKA peut mettre à jour le site et les présentes mentions afin de tenir compte de l’évolution de ses services, de la technologie ou de ses obligations légales. La version publiée en ligne, accompagnée de sa date de mise à jour, est la version en vigueur. Une mise à jour du site ne modifie pas les droits contractuels déjà convenus par écrit.",
        ],
      },
      severability: {
        title: "Divisibilité et droit impératif",
        paragraphs: [
          "Si une disposition des présentes mentions est invalide ou inapplicable, les autres dispositions demeurent applicables dans la mesure permise par la loi. Aucune disposition n’exclut ou ne limite une responsabilité lorsque la loi l’interdit, notamment en cas de faute intentionnelle ou de négligence grave selon le droit suisse applicable.",
        ],
      },
    },
    privacy: {
      scope: {
        title: "Champ d’application et catégories de données",
        paragraphs: [
          "Cette politique couvre les données personnelles traitées par l’intermédiaire du site public, du formulaire de contact et des échanges professionnels qui en découlent. Selon votre interaction avec nous, il peut s’agir de données d’identification et de contact, d’informations sur votre entreprise et votre activité professionnelle, du contenu de votre demande, de l’historique des échanges, de votre préférence linguistique et de données techniques de connexion ou de sécurité.",
          "Nous recueillons généralement ces données directement auprès de vous ou automatiquement auprès de votre navigateur lors de l’utilisation du site. Nous pouvons également recevoir des coordonnées professionnelles usuelles de votre employeur, de collègues, de sources professionnelles publiques ou d’une personne qui nous met en relation.",
        ],
      },
      legalBasis: {
        title: "Justifications et bases juridiques",
        paragraphs: [
          "En droit suisse, nous traitons les données personnelles de manière licite, proportionnée et conformément aux finalités décrites dans la présente politique. Lorsque le RGPD s’applique, le traitement repose, selon le cas, sur des mesures précontractuelles demandées, l’exécution d’un contrat, le respect d’obligations légales, notre intérêt légitime à exploiter un site sécurisé et à gérer nos relations professionnelles, ou votre consentement lorsqu’il est expressément demandé.",
          "Vous pouvez retirer votre consentement à tout moment pour l’avenir. Ce retrait ne remet pas en cause les traitements déjà réalisés ni ceux qui reposent sur une autre base juridique.",
        ],
      },
      emailProvider: {
        title: "Prestataire d’acheminement du formulaire",
        paragraphs: [
          "Les messages envoyés au moyen du formulaire sont acheminés à DOMTEKNIKA par Resend, un service exploité par Plus Five Five, Inc., aux États-Unis. Les données transmises comprennent les coordonnées et le message que vous saisissez, ainsi que les métadonnées nécessaires à l’envoi et à la sécurisation de l’e-mail.",
          "Resend indique que les données de compte, métadonnées d’e-mail, journaux et enregistrements d’API sont conservés aux États-Unis. Lorsque cela est requis, les transferts sont encadrés par des garanties contractuelles reconnues, notamment des clauses contractuelles types. N’utilisez pas le formulaire public pour transmettre des fichiers projet confidentiels ou des données sensibles.",
        ],
        links: [
          { label: "Politique de confidentialité de Resend", href: "https://resend.com/legal/privacy-policy" },
          { label: "Accord de traitement des données de Resend", href: "https://resend.com/legal/dpa" },
        ],
      },
      automatedDecisions: {
        title: "Décisions automatisées et profilage",
        paragraphs: [
          "DOMTEKNIKA n’utilise pas les données recueillies sur ce site pour prendre des décisions individuelles entièrement automatisées produisant des effets juridiques ou comparables. Elle n’établit pas de profils publicitaires à partir des visites du site et ne vend pas de données personnelles.",
        ],
      },
      children: {
        title: "Mineurs",
        paragraphs: [
          "Ce site institutionnel s’adresse à un public professionnel et général; il n’est pas destiné aux enfants. Nous ne sollicitons pas sciemment de données personnelles d’enfants au moyen du formulaire. Un parent ou représentant légal qui estime qu’un enfant nous a transmis des données peut nous contacter afin d’en demander l’examen et, le cas échéant, la suppression.",
        ],
      },
    },
  },
  de: {
    companyIdentity:
      "Aktiengesellschaft, eingetragen im Handelsregister des Kantons Bern\nHandelsregister-Nummer: CH-550.0.125.280-2\nUnternehmens-Identifikationsnummer (UID): CHE-100.171.369",
    legal: {
      registry: {
        title: "Unternehmensangaben und Kontakt",
        paragraphs: [
          "Domteknika S.A. ist eine Schweizer Aktiengesellschaft mit Sitz in La Neuveville. Die Angaben auf dieser Seite entsprechen den zum Zeitpunkt der letzten Aktualisierung öffentlich verfügbaren Handelsregisterdaten.",
          "Allgemeine Anfragen, Mitteilungen zur Website und Fragen zu deren Inhalten können an die oben genannte Postadresse, Telefonnummer oder E-Mail-Adresse gerichtet werden.",
        ],
      },
      scope: {
        title: "Zweck und Geltungsbereich der Website",
        paragraphs: [
          "Diese Website stellt DOMTEKNIKA, ihre Ingenieurleistungen, ausgewählte Projekte und öffentlich zugängliche Patentinformationen vor. Die Inhalte dienen ausschliesslich der Unternehmensdarstellung und allgemeinen Information. Sofern nicht ausdrücklich in einem gesonderten, von DOMTEKNIKA unterzeichneten Dokument festgehalten, stellen sie weder ein Angebot noch eine technische Spezifikation, Beratung, Garantie oder vertragliche Zusage dar.",
          "Der Zugriff auf die Website und ihre Nutzung unterliegen diesen Hinweisen und zwingendem Recht. DOMTEKNIKA kann die Website ganz oder teilweise ändern, aussetzen oder einstellen, wenn dies insbesondere aus Wartungs-, Sicherheits- oder Geschäftsgründen angemessen erforderlich ist.",
        ],
      },
      submissions: {
        title: "Vertrauliche Informationen und unaufgeforderte Zusendungen",
        paragraphs: [
          "Die öffentliche Website und das Kontaktformular sind keine geschützten Projekträume und begründen für sich allein weder ein Vertraulichkeits-, Treuhand-, Beratungs- noch ein Vertragsverhältnis. Übermitteln Sie keine Geschäftsgeheimnisse, patentierbaren Konzepte, regulierten oder besonders schützenswerten Personendaten oder Informationen Dritter, sofern DOMTEKNIKA deren Empfang nicht vorab ausdrücklich über einen geeigneten Kanal vereinbart hat.",
          "Projektvertraulichkeit, Eigentum an Ergebnissen, Lizenzen, Liefergegenstände und zulässige Nutzungen richten sich ausschliesslich nach der jeweiligen schriftlichen Offerte, Geheimhaltungsvereinbarung oder dem Projektvertrag. Der Empfang oder die Bestätigung einer unaufgefordert eingesandten Idee bedeutet weder Annahme noch Exklusivität, Vergütung oder eine Pflicht zur Prüfung oder Nutzung.",
        ],
      },
      acceptableUse: {
        title: "Zulässige und unzulässige Nutzung",
        paragraphs: [
          "Sie dürfen die Website besuchen und öffentliche Informationen für eine legitime private oder berufliche Beurteilung verwenden. Untersagt sind Eingriffe in Betrieb oder Sicherheit, unbefugte Zugriffsversuche, Schadcode, die Umgehung technischer Massnahmen, Identitätstäuschung sowie Nutzungen, die gegen geltendes Recht oder Rechte Dritter verstossen.",
          "Systematische Extraktion, Scraping, Framing, Wiederveröffentlichung, Aufbau einer konkurrierenden Datenbank, Reverse Engineering geschützter interaktiver Elemente oder die Nutzung von Website-Inhalten zum Training oder zur Anreicherung eines kommerziellen KI-Modells bedürfen der vorherigen schriftlichen Zustimmung von DOMTEKNIKA, soweit zwingendes Recht eine solche Einschränkung nicht ausschliesst.",
        ],
      },
      privacy: { title: "Personendaten", paragraphs: ["Die Bearbeitung von Personendaten im Zusammenhang mit dieser Website ist in der Datenschutzerklärung beschrieben. Sie ist Bestandteil der Informationen zur Websitenutzung, schränkt jedoch keine Rechte aus zwingendem Datenschutzrecht ein."] },
      changes: { title: "Änderungen", paragraphs: ["DOMTEKNIKA kann die Website und diese Hinweise an Änderungen ihrer Leistungen, der Technik oder der Rechtslage anpassen. Es gilt die online veröffentlichte Fassung mit dem angegebenen Aktualisierungsdatum. Bereits schriftlich vereinbarte Vertragsrechte werden dadurch nicht geändert."] },
      severability: { title: "Teilunwirksamkeit und zwingendes Recht", paragraphs: ["Sollte eine Bestimmung unwirksam oder nicht durchsetzbar sein, bleiben die übrigen Bestimmungen im gesetzlich zulässigen Umfang bestehen. Eine Haftung wird nicht ausgeschlossen oder beschränkt, soweit dies gesetzlich unzulässig ist, insbesondere bei Absicht oder grober Fahrlässigkeit nach anwendbarem Schweizer Recht."] },
    },
    privacy: {
      scope: { title: "Geltungsbereich und Datenkategorien", paragraphs: ["Diese Erklärung gilt für Personendaten, die über die öffentliche Website, das Kontaktformular und die daraus entstehende Geschäftskorrespondenz bearbeitet werden. Dazu können Identitäts- und Kontaktdaten, Unternehmens- und Berufsinformationen, Inhalt und Verlauf Ihrer Anfrage, Sprachpräferenz sowie technische Verbindungs- und Sicherheitsdaten gehören.", "Wir erheben Daten in der Regel direkt bei Ihnen oder automatisch über Ihren Browser. Übliche geschäftliche Kontaktdaten können wir auch von Ihrem Arbeitgeber, von Kollegen, aus öffentlich zugänglichen beruflichen Quellen oder von einer vermittelnden Person erhalten."] },
      legalBasis: { title: "Rechtfertigungsgründe und Rechtsgrundlagen", paragraphs: ["Nach Schweizer Recht bearbeiten wir Personendaten rechtmässig, verhältnismässig und für die beschriebenen Zwecke. Soweit die DSGVO gilt, stützt sich die Bearbeitung je nach Fall auf vorvertragliche Massnahmen, Vertragserfüllung, rechtliche Pflichten, unsere berechtigten Interessen am sicheren Betrieb der Website und an Geschäftsbeziehungen oder auf eine ausdrücklich eingeholte Einwilligung.", "Eine Einwilligung kann jederzeit mit Wirkung für die Zukunft widerrufen werden. Bereits erfolgte Bearbeitungen und Bearbeitungen auf anderer Rechtsgrundlage bleiben davon unberührt."] },
      emailProvider: { title: "Dienstleister für das Kontaktformular", paragraphs: ["Nachrichten aus dem Kontaktformular werden über Resend, einen Dienst von Plus Five Five, Inc. in den USA, an DOMTEKNIKA übermittelt. Übertragen werden die eingegebenen Kontaktdaten und Nachrichten sowie für Versand und Sicherheit erforderliche Metadaten.", "Resend gibt an, Konto- und E-Mail-Metadaten, Protokolle und API-Datensätze in den USA zu speichern. Erforderliche Übermittlungen werden durch anerkannte vertragliche Garantien, insbesondere Standardvertragsklauseln, abgesichert. Übermitteln Sie über das öffentliche Formular keine vertraulichen Projektdateien oder sensiblen Daten."], links: [{ label: "Datenschutzerklärung von Resend", href: "https://resend.com/legal/privacy-policy" }, { label: "Auftragsverarbeitungsvereinbarung von Resend", href: "https://resend.com/legal/dpa" }] },
      automatedDecisions: { title: "Automatisierte Entscheidungen und Profiling", paragraphs: ["DOMTEKNIKA trifft anhand der über diese Website erhobenen Daten keine vollautomatisierten Einzelentscheidungen mit rechtlicher oder ähnlich erheblicher Wirkung. Es werden keine Werbeprofile aus Websitebesuchen erstellt und keine Personendaten verkauft."] },
      children: { title: "Kinder", paragraphs: ["Diese Unternehmenswebsite richtet sich an ein berufliches und allgemeines Publikum und nicht an Kinder. Wir fordern über das Formular nicht wissentlich Personendaten von Kindern an. Eltern oder gesetzliche Vertreter können uns kontaktieren, wenn sie eine Prüfung und gegebenenfalls Löschung solcher Daten wünschen."] },
    },
  },
  es: {
    companyIdentity: "Sociedad anónima inscrita en el Registro Mercantil del cantón de Berna\nNúmero de registro mercantil: CH-550.0.125.280-2\nNúmero de identificación empresarial (UID): CHE-100.171.369",
    legal: {
      registry: { title: "Identificación de la empresa y contacto", paragraphs: ["Domteknika S.A. es una sociedad anónima suiza con domicilio social en La Neuveville. Los datos de esta página corresponden a la información pública del registro mercantil disponible en la fecha de la última actualización.", "Las consultas generales, notificaciones sobre el sitio y preguntas sobre su contenido pueden enviarse a la dirección postal, al teléfono o al correo electrónico indicados arriba."] },
      scope: { title: "Objeto y alcance del sitio", paragraphs: ["Este sitio presenta DOMTEKNIKA, sus capacidades de ingeniería, proyectos seleccionados e información pública sobre patentes. Su contenido tiene fines corporativos e informativos. Salvo que conste expresamente en un documento independiente firmado por DOMTEKNIKA, no constituye una oferta, especificación técnica, asesoramiento profesional, garantía ni compromiso contractual.", "El acceso y uso del sitio están sujetos a este aviso y a la legislación imperativa. DOMTEKNIKA puede modificar, suspender o retirar total o parcialmente el sitio cuando sea razonablemente necesario por mantenimiento, seguridad o motivos empresariales."] },
      submissions: { title: "Información confidencial y envíos no solicitados", paragraphs: ["El sitio público y el formulario de contacto no son espacios de proyecto seguros y no crean por sí solos una relación confidencial, fiduciaria, de asesoramiento o contractual. No envíe secretos comerciales, conceptos patentables, datos regulados o sensibles ni información de terceros sin el consentimiento previo y expreso de DOMTEKNIKA y un canal adecuado.", "La confidencialidad del proyecto, la propiedad de los resultados, las licencias, los entregables y los usos permitidos se rigen exclusivamente por la oferta, acuerdo de confidencialidad o contrato aplicable. La recepción de una idea no solicitada no implica aceptación, exclusividad, remuneración ni obligación de evaluarla o utilizarla."] },
      acceptableUse: { title: "Uso permitido y prohibido", paragraphs: ["Puede consultar el sitio y utilizar su información pública para evaluaciones personales o profesionales legítimas. No puede perturbar su funcionamiento o seguridad, intentar accesos no autorizados, introducir código malicioso, eludir medidas técnicas, suplantar identidades ni infringir la ley o derechos de terceros.", "La extracción sistemática, scraping, framing, republicación, creación de bases de datos competidoras, ingeniería inversa de elementos interactivos protegidos o uso del contenido para entrenar o enriquecer un modelo comercial de inteligencia artificial requieren autorización previa y escrita de DOMTEKNIKA, salvo que la legislación imperativa prohíba dicha restricción."] },
      privacy: { title: "Datos personales", paragraphs: ["El tratamiento de datos personales relacionado con este sitio se describe en la política de privacidad. Dicha política forma parte de la información que rige el uso del sitio, sin limitar los derechos reconocidos por la legislación imperativa de protección de datos."] },
      changes: { title: "Cambios", paragraphs: ["DOMTEKNIKA puede actualizar el sitio y este aviso para reflejar cambios en sus servicios, la tecnología o sus obligaciones legales. La versión vigente es la publicada en línea con su fecha de actualización. Estas modificaciones no alteran derechos contractuales ya acordados por escrito."] },
      severability: { title: "Divisibilidad y normas imperativas", paragraphs: ["Si una disposición fuera inválida o inaplicable, las demás seguirán vigentes en la medida permitida por la ley. Ninguna disposición excluye o limita responsabilidades cuando la ley lo prohíbe, en particular por dolo o negligencia grave conforme al derecho suizo aplicable."] },
    },
    privacy: {
      scope: { title: "Alcance y categorías de datos", paragraphs: ["Esta política cubre los datos personales tratados a través del sitio público, el formulario y la correspondencia comercial relacionada. Puede incluir datos de identificación y contacto, información empresarial y profesional, contenido e historial de la solicitud, preferencia de idioma y datos técnicos de conexión o seguridad.", "Normalmente obtenemos los datos directamente de usted o automáticamente de su navegador. También podemos recibir datos profesionales habituales de su empleador, compañeros, fuentes profesionales públicas o de quien nos ponga en contacto."] },
      legalBasis: { title: "Justificaciones y bases jurídicas", paragraphs: ["Conforme al derecho suizo, tratamos los datos de forma lícita, proporcional y para los fines descritos. Cuando se aplica el RGPD, el tratamiento se basa, según proceda, en medidas precontractuales, ejecución contractual, obligaciones legales, nuestros intereses legítimos en operar un sitio seguro y gestionar relaciones comerciales, o el consentimiento cuando se solicite expresamente.", "Puede retirar su consentimiento para el futuro en cualquier momento. Ello no afecta a tratamientos ya realizados ni a los basados en otra base jurídica."] },
      emailProvider: { title: "Proveedor de entrega del formulario", paragraphs: ["Los mensajes del formulario se envían a DOMTEKNIKA mediante Resend, servicio operado por Plus Five Five, Inc. en Estados Unidos. Se transmiten los datos de contacto y el mensaje introducidos, junto con metadatos necesarios para el envío y la seguridad.", "Resend indica que los datos de cuenta, metadatos de correo, registros y datos de API se almacenan en Estados Unidos. Cuando procede, las transferencias se protegen mediante garantías contractuales reconocidas, incluidas cláusulas contractuales tipo. No envíe archivos confidenciales o datos sensibles mediante el formulario público."], links: [{ label: "Política de privacidad de Resend", href: "https://resend.com/legal/privacy-policy" }, { label: "Acuerdo de tratamiento de Resend", href: "https://resend.com/legal/dpa" }] },
      automatedDecisions: { title: "Decisiones automatizadas y perfiles", paragraphs: ["DOMTEKNIKA no utiliza los datos del sitio para adoptar decisiones individuales totalmente automatizadas con efectos jurídicos o similares. No crea perfiles publicitarios de las visitas ni vende datos personales."] },
      children: { title: "Menores", paragraphs: ["Este sitio corporativo está dirigido a un público profesional y general, no a menores. No solicitamos conscientemente datos de menores mediante el formulario. Sus representantes legales pueden contactarnos para solicitar su revisión y, cuando corresponda, supresión."] },
    },
  },
  ko: {
    companyIdentity: "스위스 베른주 상업등기부에 등록된 주식회사\n상업등기번호: CH-550.0.125.280-2\n기업식별번호(UID): CHE-100.171.369",
    legal: {
      registry: { title: "회사 정보 및 연락처", paragraphs: ["Domteknika S.A.는 La Neuveville에 본사를 둔 스위스 주식회사입니다. 이 페이지의 회사 정보는 최종 업데이트일 현재 공개된 상업등기 자료를 기준으로 합니다.", "일반 문의, 웹사이트 관련 통지 및 콘텐츠 문의는 위 우편주소, 전화번호 또는 이메일로 보내실 수 있습니다."] },
      scope: { title: "웹사이트의 목적과 적용 범위", paragraphs: ["본 사이트는 DOMTEKNIKA의 엔지니어링 역량, 주요 프로젝트 및 공개 특허 정보를 소개합니다. 콘텐츠는 기업 소개와 일반 정보 제공을 위한 것이며, DOMTEKNIKA가 별도의 서면 문서에 명시적으로 서명하지 않는 한 제안, 기술 사양, 전문 자문, 보증 또는 계약상 약속이 아닙니다.", "사이트 이용에는 본 고지와 강행법규가 적용됩니다. DOMTEKNIKA는 유지보수, 보안 또는 사업상 합리적으로 필요한 경우 사이트 전부 또는 일부를 변경·중단·철회할 수 있습니다."] },
      submissions: { title: "기밀정보 및 요청하지 않은 제안", paragraphs: ["공개 웹사이트와 문의 양식은 보안 프로젝트 공간이 아니며, 그 자체로 비밀유지·신탁·자문 또는 계약 관계를 형성하지 않습니다. DOMTEKNIKA가 적절한 채널을 통해 사전에 명시적으로 동의하지 않은 경우 영업비밀, 특허 가능 아이디어, 규제·민감 개인정보 또는 제3자 정보를 보내지 마십시오.", "프로젝트 기밀성, 결과물의 소유권, 라이선스, 납품물 및 허용된 이용은 해당 서면 제안서, 비밀유지계약 또는 프로젝트 계약에 의해서만 정해집니다. 요청하지 않은 아이디어의 수령이나 확인은 수락, 독점권, 보상 또는 평가·사용 의무를 의미하지 않습니다."] },
      acceptableUse: { title: "허용 및 금지되는 이용", paragraphs: ["합법적인 개인 또는 업무상 검토를 위해 사이트와 공개 정보를 이용할 수 있습니다. 운영·보안을 방해하거나 무단 접근, 악성 코드, 기술적 보호조치 우회, 사칭, 법령 또는 제3자 권리 침해 행위를 해서는 안 됩니다.", "체계적 추출, 스크래핑, 프레이밍, 재게시, 경쟁 데이터베이스 구축, 보호된 대화형 요소의 리버스 엔지니어링 또는 상업용 AI 모델의 학습·강화를 위한 콘텐츠 이용은 강행법규가 달리 정하지 않는 한 DOMTEKNIKA의 사전 서면 승인이 필요합니다."] },
      privacy: { title: "개인정보", paragraphs: ["본 사이트와 관련된 개인정보 처리는 개인정보처리방침에 설명되어 있습니다. 해당 방침은 사이트 이용 안내의 일부이며 강행 개인정보보호법이 보장하는 권리를 제한하지 않습니다."] },
      changes: { title: "변경", paragraphs: ["DOMTEKNIKA는 서비스, 기술 또는 법적 의무의 변화를 반영하여 사이트와 본 고지를 수정할 수 있습니다. 업데이트 날짜와 함께 온라인에 게시된 버전이 현재 버전이며, 이미 서면으로 합의된 계약상 권리는 변경하지 않습니다."] },
      severability: { title: "일부 무효 및 강행법규", paragraphs: ["일부 조항이 무효이거나 집행 불가능하더라도 나머지 조항은 법이 허용하는 범위에서 유효합니다. 적용되는 스위스법상 고의 또는 중과실 책임 등 법률이 금지하는 책임의 배제나 제한은 적용되지 않습니다."] },
    },
    privacy: {
      scope: { title: "적용 범위와 데이터 유형", paragraphs: ["본 방침은 공개 웹사이트, 문의 양식 및 관련 업무 연락을 통해 처리되는 개인정보에 적용됩니다. 이름과 연락처, 회사·직무 정보, 문의 내용과 이력, 언어 설정, 기술적 접속·보안 데이터가 포함될 수 있습니다.", "데이터는 일반적으로 이용자에게 직접 또는 브라우저를 통해 자동 수집합니다. 고용주, 동료, 공개된 전문 자료 또는 소개자로부터 일반적인 업무 연락처를 받을 수도 있습니다."] },
      legalBasis: { title: "처리 근거", paragraphs: ["스위스법에 따라 개인정보를 적법하고 비례적으로, 본 방침에 설명된 목적에 맞게 처리합니다. GDPR이 적용되는 경우 요청된 계약 전 조치, 계약 이행, 법적 의무, 안전한 사이트 운영과 업무 관계 관리에 관한 정당한 이익 또는 명시적으로 요청한 동의를 근거로 처리합니다.", "동의는 언제든 장래에 대해 철회할 수 있습니다. 이미 이루어진 처리나 다른 법적 근거에 따른 처리에는 영향을 미치지 않습니다."] },
      emailProvider: { title: "문의 양식 전송 서비스", paragraphs: ["문의 양식의 메시지는 미국 Plus Five Five, Inc.가 운영하는 Resend를 통해 DOMTEKNIKA에 전달됩니다. 입력한 연락처와 메시지, 이메일 전송 및 보안에 필요한 메타데이터가 전송됩니다.", "Resend는 계정 데이터, 이메일 메타데이터, 로그 및 API 기록을 미국에 저장한다고 밝히고 있습니다. 필요한 경우 표준계약조항 등 인정된 계약상 보호조치로 이전을 보호합니다. 공개 양식으로 기밀 프로젝트 파일이나 민감정보를 보내지 마십시오."], links: [{ label: "Resend 개인정보처리방침", href: "https://resend.com/legal/privacy-policy" }, { label: "Resend 데이터 처리 부속합의", href: "https://resend.com/legal/dpa" }] },
      automatedDecisions: { title: "자동화된 결정 및 프로파일링", paragraphs: ["DOMTEKNIKA는 사이트에서 수집한 데이터로 법적 또는 이에 준하는 중대한 효과를 내는 완전 자동화된 개인 결정을 하지 않습니다. 방문 기록으로 광고 프로필을 만들거나 개인정보를 판매하지 않습니다."] },
      children: { title: "아동", paragraphs: ["본 기업 웹사이트는 전문직 및 일반 이용자를 위한 것으로 아동을 대상으로 하지 않습니다. 문의 양식에서 아동의 개인정보를 의도적으로 요구하지 않습니다. 보호자는 해당 데이터의 확인 및 필요한 경우 삭제를 요청할 수 있습니다."] },
    },
  },
  zh: {
    companyIdentity: "在瑞士伯尔尼州商业登记处注册的股份有限公司\n商业登记号：CH-550.0.125.280-2\n企业识别号（UID）：CHE-100.171.369",
    legal: {
      registry: { title: "企业信息与联系方式", paragraphs: ["Domteknika S.A. 是一家注册地位于 La Neuveville 的瑞士股份有限公司。本页信息以最后更新日可公开查询的商业登记资料为依据。", "一般咨询、与网站有关的通知及内容问题，可通过上述邮寄地址、电话号码或电子邮箱联系我们。"] },
      scope: { title: "网站目的与适用范围", paragraphs: ["本网站用于介绍 DOMTEKNIKA、其工程能力、精选项目及公开的专利信息。内容仅供企业展示和一般信息参考。除非 DOMTEKNIKA 在另行签署的书面文件中明确说明，否则网站内容不构成要约、技术规格、专业建议、保证或合同承诺。", "访问和使用本网站须遵守本声明及强制性法律。基于维护、安全或业务方面的合理需要，DOMTEKNIKA 可修改、暂停或撤下网站的全部或部分内容。"] },
      submissions: { title: "保密信息与主动提交的内容", paragraphs: ["公开网站和联系表单并非安全的项目协作空间，其本身不会建立保密、信义、咨询或合同关系。未经 DOMTEKNIKA 事先明确同意并指定适当渠道，请勿发送商业秘密、可申请专利的构想、受监管或敏感个人数据，或属于第三方的信息。", "项目保密、成果所有权、许可、交付物及允许的用途，仅以适用的书面报价、保密协议或项目合同为准。收到或确认收到未经邀请提交的想法，不代表接受、独占、付费，也不产生评估或使用义务。"] },
      acceptableUse: { title: "允许与禁止的使用", paragraphs: ["您可以为合法的个人或专业评估浏览网站并使用公开信息。不得干扰网站运行或安全、尝试未经授权的访问、植入恶意代码、规避技术措施、冒用身份，或以违反法律和第三方权利的方式使用网站。", "除强制性法律另有规定外，系统性提取、抓取、框架嵌入、重新发布、建立竞争性数据库、对受保护的交互元素进行逆向工程，或使用网站内容训练或增强商业人工智能模型，均须事先取得 DOMTEKNIKA 的书面许可。"] },
      privacy: { title: "个人数据", paragraphs: ["与本网站有关的个人数据处理详见隐私政策。该政策构成网站使用说明的一部分，但不限制强制性数据保护法赋予的权利。"] },
      changes: { title: "变更", paragraphs: ["DOMTEKNIKA 可根据服务、技术或法律义务的变化更新网站及本声明。以标明更新日期的在线版本为当前版本。网站更新不会变更双方已经书面约定的合同权利。"] },
      severability: { title: "条款可分割性与强制性法律", paragraphs: ["如某项条款无效或无法执行，其余条款在法律允许范围内继续有效。对于法律禁止排除或限制的责任，包括适用瑞士法下的故意或重大过失责任，本声明不作排除或限制。"] },
    },
    privacy: {
      scope: { title: "适用范围与数据类别", paragraphs: ["本政策适用于通过公开网站、联系表单及相关业务沟通处理的个人数据。根据您的互动方式，可能包括身份和联系信息、公司与职业信息、咨询内容和沟通记录、语言偏好，以及技术连接或安全数据。", "我们通常直接向您收集数据，或在您使用网站时由浏览器自动提供。我们也可能从您的雇主、同事、公开职业信息来源或介绍人处获得常规业务联系方式。"] },
      legalBasis: { title: "处理依据与法律基础", paragraphs: ["根据瑞士法律，我们以合法、适度并符合本政策所述目的的方式处理个人数据。在 GDPR 适用时，处理可能基于您要求的合同前措施、合同履行、法律义务、我们安全运营网站及管理业务关系的正当利益，或在明确征求时基于您的同意。", "您可随时撤回同意，撤回仅对未来生效，不影响已完成的处理或基于其他法律依据的处理。"] },
      emailProvider: { title: "联系表单传输服务商", paragraphs: ["通过联系表单提交的信息由美国 Plus Five Five, Inc. 运营的 Resend 转发给 DOMTEKNIKA。传输的数据包括您填写的联系方式和留言，以及发送和保障电子邮件安全所需的元数据。", "Resend 表示，账户数据、邮件元数据、日志和 API 记录存储在美国。在法律要求的情况下，跨境传输通过标准合同条款等认可的合同保障措施进行保护。请勿通过公开表单发送机密项目文件或敏感数据。"], links: [{ label: "Resend 隐私政策", href: "https://resend.com/legal/privacy-policy" }, { label: "Resend 数据处理附录", href: "https://resend.com/legal/dpa" }] },
      automatedDecisions: { title: "自动化决策与画像", paragraphs: ["DOMTEKNIKA 不会利用本网站收集的数据作出具有法律或类似重大影响的完全自动化个人决策，不会根据网站访问建立广告画像，也不会出售个人数据。"] },
      children: { title: "未成年人", paragraphs: ["本企业网站面向专业人士和一般公众，并非面向儿童。我们不会通过联系表单有意索取儿童个人数据。家长或监护人如认为儿童提交了个人数据，可联系我们进行核查，并在适当情况下要求删除。"] },
    },
  },
};

const legalPages: Record<Locale, LegalPages> = {
  en: {
    legalNotice: {
      intro:
        "This legal notice identifies the company responsible for the DOMTEKNIKA website and sets out the conditions governing its use.",
      updatedLabel: "Last updated",
      updated: "July 2026",
      sections: [
        {
          title: "Website publisher",
          paragraphs: [
            "DOMTEKNIKA SA\nChemin de Saint-Joux 16B\n2520 La Neuveville\nSwitzerland",
            "DOMTEKNIKA SA is responsible for the editorial content of this website.",
          ],
          links: companyContact,
        },
        {
          title: "Hosting",
          paragraphs: [
            "This website is hosted in Switzerland by Infomaniak Network SA, Rue Eugène Marziano 25, 1227 Les Acacias (GE), Switzerland.",
          ],
          links: [
            {
              label: "Infomaniak legal information",
              href: "https://www.infomaniak.com/en/legal/legal-notice",
            },
          ],
        },
        {
          title: "Intellectual property",
          paragraphs: [
            "Unless otherwise stated, the structure, texts, photographs, illustrations, drawings, logos, videos and other content on this website are owned by DOMTEKNIKA SA or used with the permission of their respective rights holders. They are protected by Swiss and international intellectual-property laws.",
            "Any reproduction, adaptation, distribution or commercial use, in whole or in part, requires prior written permission from DOMTEKNIKA SA. Downloading or printing content for strictly private, non-commercial use remains permitted provided that copyright and ownership notices are retained.",
          ],
        },
        {
          title: "Liability and external links",
          paragraphs: [
            "DOMTEKNIKA SA takes reasonable care to keep the information on this website accurate and current. However, it gives no guarantee that the content is complete, continuously available or free from errors. Use of the website and reliance on its content remain the responsibility of the visitor, subject to mandatory law.",
            "Links to third-party websites are provided for convenience. DOMTEKNIKA SA does not control their content, availability or data-protection practices and accepts no responsibility for them.",
          ],
        },
        {
          title: "Applicable law",
          paragraphs: [
            "This website and this legal notice are governed by Swiss law. Subject to any mandatory place of jurisdiction, the courts at the registered office of DOMTEKNIKA SA have jurisdiction.",
          ],
        },
      ],
    },
    privacyPolicy: {
      intro:
        "This policy explains how DOMTEKNIKA SA processes personal data when you visit this website or contact us. It is based on the Swiss Federal Act on Data Protection (FADP) and, where applicable, the European General Data Protection Regulation (GDPR).",
      updatedLabel: "Last updated",
      updated: "July 2026",
      sections: [
        {
          title: "Controller",
          paragraphs: [
            "DOMTEKNIKA SA\nChemin de Saint-Joux 16B\n2520 La Neuveville\nSwitzerland",
            "Questions about data protection or requests concerning your personal data may be sent to:",
          ],
          links: companyContact,
        },
        {
          title: "Data processed when you visit the website",
          paragraphs: [
            "When the website is accessed, our hosting provider may automatically record technical information required to deliver and secure the service. This may include the IP address, date and time of access, requested page or file, referrer, browser, operating system and response status.",
            "These server logs are used to operate the website, detect faults, prevent misuse and maintain security. They are not used by DOMTEKNIKA SA to create advertising profiles.",
          ],
        },
        {
          title: "Contact requests",
          paragraphs: [
            "If you contact us by email, telephone or through the contact form, we process the information you provide, such as your name, company, email address, telephone number and message. We use it to answer your request, prepare possible business relations and document the correspondence where necessary.",
            "Please do not send confidential technical information or sensitive personal data through the form unless this has been agreed with us in advance.",
          ],
        },
        {
          title: "Purposes of processing",
          items: [
            "Providing, maintaining and securing the website.",
            "Responding to enquiries and preparing or managing business relationships.",
            "Meeting legal obligations and asserting or defending legal claims.",
            "Improving the reliability and usability of our digital services.",
          ],
        },
        {
          title: "Cookies and audience measurement",
          paragraphs: [
            "The website currently uses only a functional language-preference cookie (NEXT_LOCALE) so that the selected language can be retained. DOMTEKNIKA SA does not currently use advertising cookies, behavioural tracking or an audience-measurement service on this website.",
            "If optional analytics or marketing technologies are introduced later, this policy and, where required, the consent mechanism will be updated before they are activated.",
          ],
        },
        {
          title: "Maps and third-party content",
          paragraphs: [
            "Interactive maps use map data and tiles supplied through CARTO and OpenStreetMap. When a map is displayed, technical data such as your IP address and browser request may be transmitted to these providers. Their own privacy policies apply to their processing.",
          ],
          links: [
            { label: "CARTO privacy policy", href: "https://carto.com/privacy" },
            {
              label: "OpenStreetMap privacy policy",
              href: "https://osmfoundation.org/wiki/Privacy_Policy",
            },
          ],
        },
        {
          title: "Recipients and transfers abroad",
          paragraphs: [
            "Personal data may be disclosed to authorised employees and to service providers that support hosting, IT operations, mapping or professional advice, to the extent necessary for their tasks. We do not sell personal data.",
            "Some providers may process data outside Switzerland. Where the destination does not provide an adequate level of protection, we rely on recognised safeguards, in particular contractual safeguards, or on a statutory exception.",
          ],
        },
        {
          title: "Retention",
          paragraphs: [
            "We retain personal data only for as long as necessary for the purposes described above, for the duration of a business relationship and afterwards where legal retention duties, evidence requirements or legitimate interests apply. Technical logs are retained according to the operational and security settings of the hosting provider.",
          ],
        },
        {
          title: "Your rights",
          paragraphs: [
            "Under applicable data-protection law, you may request information about your personal data and, where the legal conditions are met, request correction, delivery, deletion or restriction of processing, or object to certain processing. You may also lodge a complaint with the competent data-protection authority, in Switzerland the Federal Data Protection and Information Commissioner (FDPIC).",
            "A request may require proof of identity. Statutory restrictions and exceptions remain reserved.",
          ],
          links: [
            {
              label: "Federal Data Protection and Information Commissioner",
              href: "https://www.edoeb.admin.ch/en",
            },
          ],
        },
        {
          title: "Security and policy updates",
          paragraphs: [
            "DOMTEKNIKA SA uses appropriate organisational and technical measures to protect personal data against unauthorised access, loss, misuse or alteration. No transmission or storage method can nevertheless be guaranteed to be completely secure.",
            "We may update this policy when our services or legal requirements change. The current version published on this page applies.",
          ],
        },
      ],
    },
  },
  fr: {
    legalNotice: {
      intro:
        "Les présentes mentions identifient l’entreprise responsable du site DOMTEKNIKA et précisent les conditions applicables à son utilisation.",
      updatedLabel: "Dernière mise à jour",
      updated: "juillet 2026",
      sections: [
        {
          title: "Éditeur du site",
          paragraphs: [
            "DOMTEKNIKA SA\nChemin de Saint-Joux 16B\n2520 La Neuveville\nSuisse",
            "DOMTEKNIKA SA est responsable du contenu éditorial de ce site.",
          ],
          links: companyContact,
        },
        {
          title: "Hébergement",
          paragraphs: [
            "Ce site est hébergé en Suisse par Infomaniak Network SA, Rue Eugène Marziano 25, 1227 Les Acacias (GE), Suisse.",
          ],
          links: [
            {
              label: "Mentions légales d’Infomaniak",
              href: "https://www.infomaniak.com/fr/cgv/mentions-legales",
            },
          ],
        },
        {
          title: "Propriété intellectuelle",
          paragraphs: [
            "Sauf indication contraire, la structure, les textes, photographies, illustrations, dessins, logos, vidéos et autres contenus de ce site appartiennent à DOMTEKNIKA SA ou sont utilisés avec l’autorisation de leurs titulaires. Ils sont protégés par les législations suisse et internationale relatives à la propriété intellectuelle.",
            "Toute reproduction, adaptation, diffusion ou exploitation commerciale, totale ou partielle, nécessite l’autorisation écrite préalable de DOMTEKNIKA SA. Le téléchargement ou l’impression pour un usage strictement privé et non commercial reste autorisé à condition de conserver les mentions de droit d’auteur et de propriété.",
          ],
        },
        {
          title: "Responsabilité et liens externes",
          paragraphs: [
            "DOMTEKNIKA SA veille avec soin à l’exactitude et à l’actualité des informations publiées. Elle ne garantit toutefois ni leur exhaustivité, ni la disponibilité permanente du site, ni l’absence d’erreurs. Sous réserve du droit impératif, l’utilisation du site et des informations qu’il contient relève de la responsabilité de la personne qui le consulte.",
            "Les liens vers des sites tiers sont proposés à titre pratique. DOMTEKNIKA SA n’en contrôle ni le contenu, ni la disponibilité, ni les pratiques de protection des données et décline toute responsabilité à leur égard.",
          ],
        },
        {
          title: "Droit applicable",
          paragraphs: [
            "Le présent site et ces mentions légales sont soumis au droit suisse. Sous réserve d’un for impératif, les tribunaux du siège de DOMTEKNIKA SA sont compétents.",
          ],
        },
      ],
    },
    privacyPolicy: {
      intro:
        "Cette politique explique comment DOMTEKNIKA SA traite les données personnelles lorsque vous consultez ce site ou nous contactez. Elle repose sur la loi fédérale suisse sur la protection des données (LPD) et, lorsqu’il s’applique, sur le règlement général européen sur la protection des données (RGPD).",
      updatedLabel: "Dernière mise à jour",
      updated: "juillet 2026",
      sections: [
        {
          title: "Responsable du traitement",
          paragraphs: [
            "DOMTEKNIKA SA\nChemin de Saint-Joux 16B\n2520 La Neuveville\nSuisse",
            "Toute question relative à la protection des données ou demande concernant vos données personnelles peut être adressée à :",
          ],
          links: companyContact,
        },
        {
          title: "Données traitées lors de la consultation du site",
          paragraphs: [
            "Lors de l’accès au site, notre hébergeur peut enregistrer automatiquement les informations techniques nécessaires à la fourniture et à la sécurité du service. Il peut notamment s’agir de l’adresse IP, de la date et de l’heure, de la page ou du fichier demandé, du site de provenance, du navigateur, du système d’exploitation et du statut de la réponse.",
            "Ces journaux techniques servent à exploiter le site, détecter les erreurs, prévenir les abus et assurer la sécurité. DOMTEKNIKA SA ne les utilise pas pour établir des profils publicitaires.",
          ],
        },
        {
          title: "Demandes de contact",
          paragraphs: [
            "Lorsque vous nous contactez par e-mail, téléphone ou au moyen du formulaire, nous traitons les informations que vous fournissez, par exemple vos nom, entreprise, adresse e-mail, numéro de téléphone et message. Elles servent à répondre à votre demande, préparer une éventuelle relation commerciale et documenter les échanges lorsque cela est nécessaire.",
            "N’envoyez pas d’informations techniques confidentielles ni de données personnelles sensibles au moyen du formulaire sans accord préalable de notre part.",
          ],
        },
        {
          title: "Finalités du traitement",
          items: [
            "Mettre à disposition, maintenir et sécuriser le site.",
            "Répondre aux demandes et préparer ou gérer les relations commerciales.",
            "Respecter nos obligations légales et faire valoir ou défendre des droits en justice.",
            "Améliorer la fiabilité et l’utilisation de nos services numériques.",
          ],
        },
        {
          title: "Cookies et mesure d’audience",
          paragraphs: [
            "Le site utilise actuellement uniquement un cookie fonctionnel de préférence linguistique (NEXT_LOCALE), afin de mémoriser la langue choisie. DOMTEKNIKA SA n’utilise actuellement sur ce site ni cookie publicitaire, ni suivi comportemental, ni service de mesure d’audience.",
            "Si des outils d’analyse ou de marketing facultatifs sont ajoutés ultérieurement, cette politique et, si nécessaire, le mécanisme de consentement seront mis à jour avant leur activation.",
          ],
        },
        {
          title: "Cartes et contenus tiers",
          paragraphs: [
            "Les cartes interactives utilisent des données et des tuiles cartographiques fournies par CARTO et OpenStreetMap. Lorsqu’une carte s’affiche, des données techniques, comme votre adresse IP et la requête de votre navigateur, peuvent être transmises à ces prestataires. Leurs propres politiques de confidentialité s’appliquent à leurs traitements.",
          ],
          links: [
            { label: "Politique de confidentialité de CARTO", href: "https://carto.com/privacy" },
            {
              label: "Politique de confidentialité d’OpenStreetMap",
              href: "https://osmfoundation.org/wiki/Privacy_Policy",
            },
          ],
        },
        {
          title: "Destinataires et transferts à l’étranger",
          paragraphs: [
            "Les données personnelles peuvent être communiquées aux collaborateurs autorisés et aux prestataires qui assurent l’hébergement, l’informatique, la cartographie ou le conseil professionnel, dans la mesure nécessaire à leurs missions. Nous ne vendons aucune donnée personnelle.",
            "Certains prestataires peuvent traiter des données hors de Suisse. Lorsque le pays de destination n’assure pas un niveau de protection adéquat, nous nous appuyons sur des garanties reconnues, notamment contractuelles, ou sur une exception prévue par la loi.",
          ],
        },
        {
          title: "Durée de conservation",
          paragraphs: [
            "Nous conservons les données personnelles uniquement pendant la durée nécessaire aux finalités décrites, pendant la relation commerciale puis, le cas échéant, durant les délais imposés par la loi, les besoins de preuve ou nos intérêts légitimes. Les journaux techniques sont conservés selon les paramètres d’exploitation et de sécurité de l’hébergeur.",
          ],
        },
        {
          title: "Vos droits",
          paragraphs: [
            "Dans les limites du droit applicable, vous pouvez demander des informations sur vos données personnelles et, lorsque les conditions légales sont réunies, leur rectification, leur remise, leur effacement ou la limitation du traitement, ainsi que vous opposer à certains traitements. Vous pouvez également saisir l’autorité de protection des données compétente, en Suisse le Préposé fédéral à la protection des données et à la transparence (PFPDT).",
            "Une preuve de votre identité peut être exigée. Les restrictions et exceptions prévues par la loi demeurent réservées.",
          ],
          links: [
            {
              label: "Préposé fédéral à la protection des données et à la transparence",
              href: "https://www.edoeb.admin.ch/fr",
            },
          ],
        },
        {
          title: "Sécurité et mises à jour",
          paragraphs: [
            "DOMTEKNIKA SA met en œuvre des mesures organisationnelles et techniques appropriées afin de protéger les données personnelles contre l’accès non autorisé, la perte, l’utilisation abusive ou l’altération. Aucune méthode de transmission ou de stockage ne peut néanmoins être garantie comme totalement sûre.",
            "Cette politique peut être adaptée lorsque nos services ou les exigences légales évoluent. La version en vigueur est celle publiée sur cette page.",
          ],
        },
      ],
    },
  },
  de: {
    legalNotice: {
      intro:
        "Dieses Impressum bezeichnet das für die DOMTEKNIKA-Website verantwortliche Unternehmen und erläutert die Bedingungen für deren Nutzung.",
      updatedLabel: "Letzte Aktualisierung",
      updated: "Juli 2026",
      sections: [
        {
          title: "Websitebetreiber",
          paragraphs: [
            "DOMTEKNIKA SA\nChemin de Saint-Joux 16B\n2520 La Neuveville\nSchweiz",
            "DOMTEKNIKA SA ist für die redaktionellen Inhalte dieser Website verantwortlich.",
          ],
          links: companyContact,
        },
        {
          title: "Hosting",
          paragraphs: [
            "Diese Website wird in der Schweiz von Infomaniak Network SA, Rue Eugène Marziano 25, 1227 Les Acacias (GE), Schweiz, gehostet.",
          ],
          links: [
            {
              label: "Rechtliche Hinweise von Infomaniak",
              href: "https://www.infomaniak.com/de/agb/impressum",
            },
          ],
        },
        {
          title: "Geistiges Eigentum",
          paragraphs: [
            "Soweit nicht anders angegeben, sind Aufbau, Texte, Fotografien, Illustrationen, Zeichnungen, Logos, Videos und sonstige Inhalte dieser Website Eigentum von DOMTEKNIKA SA oder werden mit Zustimmung der jeweiligen Rechteinhaber verwendet. Sie sind durch schweizerisches und internationales Immaterialgüterrecht geschützt.",
            "Jede vollständige oder teilweise Vervielfältigung, Bearbeitung, Verbreitung oder kommerzielle Nutzung bedarf der vorherigen schriftlichen Zustimmung von DOMTEKNIKA SA. Das Herunterladen oder Ausdrucken für ausschliesslich private, nicht kommerzielle Zwecke ist zulässig, sofern Urheber- und Eigentumshinweise erhalten bleiben.",
          ],
        },
        {
          title: "Haftung und externe Links",
          paragraphs: [
            "DOMTEKNIKA SA bemüht sich um richtige und aktuelle Informationen. Eine Gewähr für Vollständigkeit, ständige Verfügbarkeit oder Fehlerfreiheit wird jedoch nicht übernommen. Vorbehaltlich zwingenden Rechts erfolgen die Nutzung der Website und das Vertrauen auf ihre Inhalte in eigener Verantwortung.",
            "Links zu Websites Dritter werden lediglich als Service angeboten. DOMTEKNIKA SA hat keinen Einfluss auf deren Inhalte, Verfügbarkeit oder Datenschutzpraxis und übernimmt dafür keine Verantwortung.",
          ],
        },
        {
          title: "Anwendbares Recht",
          paragraphs: [
            "Für diese Website und dieses Impressum gilt schweizerisches Recht. Vorbehaltlich zwingender Gerichtsstände sind die Gerichte am Sitz von DOMTEKNIKA SA zuständig.",
          ],
        },
      ],
    },
    privacyPolicy: {
      intro:
        "Diese Datenschutzerklärung erläutert, wie DOMTEKNIKA SA Personendaten verarbeitet, wenn Sie diese Website besuchen oder mit uns Kontakt aufnehmen. Sie stützt sich auf das Schweizer Datenschutzgesetz (DSG) und, soweit anwendbar, auf die Datenschutz-Grundverordnung der EU (DSGVO).",
      updatedLabel: "Letzte Aktualisierung",
      updated: "Juli 2026",
      sections: [
        {
          title: "Verantwortlicher",
          paragraphs: [
            "DOMTEKNIKA SA\nChemin de Saint-Joux 16B\n2520 La Neuveville\nSchweiz",
            "Fragen zum Datenschutz oder Begehren zu Ihren Personendaten richten Sie bitte an:",
          ],
          links: companyContact,
        },
        {
          title: "Daten beim Besuch der Website",
          paragraphs: [
            "Beim Aufruf der Website kann unser Hosting-Anbieter automatisch technische Angaben erfassen, die für Bereitstellung und Sicherheit erforderlich sind. Dazu können IP-Adresse, Datum und Uhrzeit, aufgerufene Seite oder Datei, Referrer, Browser, Betriebssystem und Antwortstatus gehören.",
            "Diese Serverprotokolle dienen dem Betrieb der Website, der Fehleranalyse, der Missbrauchsprävention und der Sicherheit. DOMTEKNIKA SA verwendet sie nicht zur Erstellung von Werbeprofilen.",
          ],
        },
        {
          title: "Kontaktanfragen",
          paragraphs: [
            "Wenn Sie uns per E-Mail, Telefon oder Kontaktformular kontaktieren, verarbeiten wir die von Ihnen angegebenen Informationen, etwa Name, Unternehmen, E-Mail-Adresse, Telefonnummer und Nachricht. Wir verwenden sie zur Beantwortung Ihrer Anfrage, zur Anbahnung einer möglichen Geschäftsbeziehung und, soweit erforderlich, zur Dokumentation der Korrespondenz.",
            "Bitte übermitteln Sie ohne vorherige Absprache keine vertraulichen technischen Informationen oder besonders schützenswerten Personendaten über das Formular.",
          ],
        },
        {
          title: "Zwecke der Verarbeitung",
          items: [
            "Bereitstellung, Wartung und Absicherung der Website.",
            "Beantwortung von Anfragen sowie Vorbereitung oder Betreuung von Geschäftsbeziehungen.",
            "Erfüllung gesetzlicher Pflichten sowie Geltendmachung oder Abwehr von Rechtsansprüchen.",
            "Verbesserung der Zuverlässigkeit und Bedienbarkeit unserer digitalen Angebote.",
          ],
        },
        {
          title: "Cookies und Reichweitenmessung",
          paragraphs: [
            "Die Website verwendet derzeit nur ein funktionales Cookie für die Sprachwahl (NEXT_LOCALE), damit die gewählte Sprache gespeichert bleibt. DOMTEKNIKA SA setzt auf dieser Website derzeit keine Werbe-Cookies, kein verhaltensbezogenes Tracking und keinen Reichweitenmessdienst ein.",
            "Sollten später optionale Analyse- oder Marketingtechnologien eingesetzt werden, werden diese Erklärung und, soweit erforderlich, der Einwilligungsmechanismus vor deren Aktivierung angepasst.",
          ],
        },
        {
          title: "Karten und Inhalte Dritter",
          paragraphs: [
            "Interaktive Karten verwenden Kartendaten und Kartenkacheln von CARTO und OpenStreetMap. Beim Anzeigen einer Karte können technische Daten wie Ihre IP-Adresse und die Browseranfrage an diese Anbieter übertragen werden. Für deren Verarbeitung gelten die jeweiligen Datenschutzerklärungen.",
          ],
          links: [
            { label: "Datenschutzerklärung von CARTO", href: "https://carto.com/privacy" },
            {
              label: "Datenschutzerklärung von OpenStreetMap",
              href: "https://osmfoundation.org/wiki/Privacy_Policy",
            },
          ],
        },
        {
          title: "Empfänger und Bekanntgabe ins Ausland",
          paragraphs: [
            "Personendaten können befugten Mitarbeitenden sowie Dienstleistern zugänglich gemacht werden, die Hosting, IT-Betrieb, Kartenfunktionen oder professionelle Beratung erbringen, soweit dies für ihre Aufgaben erforderlich ist. Wir verkaufen keine Personendaten.",
            "Einzelne Anbieter können Daten ausserhalb der Schweiz verarbeiten. Bietet das Zielland keinen angemessenen Schutz, stützen wir uns auf anerkannte Garantien, insbesondere vertragliche Garantien, oder auf eine gesetzliche Ausnahme.",
          ],
        },
        {
          title: "Aufbewahrung",
          paragraphs: [
            "Wir bewahren Personendaten nur so lange auf, wie dies für die genannten Zwecke, während einer Geschäftsbeziehung und danach aufgrund gesetzlicher Aufbewahrungspflichten, Beweiserfordernisse oder berechtigter Interessen erforderlich ist. Technische Protokolle werden nach den Betriebs- und Sicherheitseinstellungen des Hosting-Anbieters aufbewahrt.",
          ],
        },
        {
          title: "Ihre Rechte",
          paragraphs: [
            "Nach dem anwendbaren Datenschutzrecht können Sie Auskunft über Ihre Personendaten verlangen und, sofern die gesetzlichen Voraussetzungen erfüllt sind, Berichtigung, Herausgabe, Löschung oder Einschränkung der Verarbeitung verlangen oder bestimmten Verarbeitungen widersprechen. Sie können sich zudem an die zuständige Datenschutzbehörde wenden, in der Schweiz an den Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB).",
            "Für ein Begehren kann ein Identitätsnachweis verlangt werden. Gesetzliche Einschränkungen und Ausnahmen bleiben vorbehalten.",
          ],
          links: [
            {
              label: "Eidgenössischer Datenschutz- und Öffentlichkeitsbeauftragter",
              href: "https://www.edoeb.admin.ch/de",
            },
          ],
        },
        {
          title: "Sicherheit und Aktualisierung",
          paragraphs: [
            "DOMTEKNIKA SA trifft angemessene organisatorische und technische Massnahmen, um Personendaten vor unbefugtem Zugriff, Verlust, Missbrauch oder Veränderung zu schützen. Eine vollständig sichere Übermittlung oder Speicherung kann jedoch nicht garantiert werden.",
            "Wir können diese Erklärung anpassen, wenn sich unsere Dienste oder die rechtlichen Anforderungen ändern. Es gilt die jeweils auf dieser Seite veröffentlichte Fassung.",
          ],
        },
      ],
    },
  },
  es: {
    legalNotice: {
      intro:
        "Este aviso identifica a la empresa responsable del sitio web de DOMTEKNIKA y establece las condiciones aplicables a su uso.",
      updatedLabel: "Última actualización",
      updated: "julio de 2026",
      sections: [
        {
          title: "Titular del sitio web",
          paragraphs: [
            "DOMTEKNIKA SA\nChemin de Saint-Joux 16B\n2520 La Neuveville\nSuiza",
            "DOMTEKNIKA SA es responsable del contenido editorial de este sitio web.",
          ],
          links: companyContact,
        },
        {
          title: "Alojamiento",
          paragraphs: [
            "Este sitio web está alojado en Suiza por Infomaniak Network SA, Rue Eugène Marziano 25, 1227 Les Acacias (GE), Suiza.",
          ],
          links: [
            {
              label: "Información legal de Infomaniak",
              href: "https://www.infomaniak.com/en/legal/legal-notice",
            },
          ],
        },
        {
          title: "Propiedad intelectual",
          paragraphs: [
            "Salvo indicación contraria, la estructura, los textos, fotografías, ilustraciones, dibujos, logotipos, vídeos y demás contenidos de este sitio pertenecen a DOMTEKNIKA SA o se utilizan con la autorización de sus titulares. Están protegidos por la legislación suiza e internacional en materia de propiedad intelectual.",
            "Cualquier reproducción, adaptación, difusión o explotación comercial, total o parcial, requiere la autorización previa y por escrito de DOMTEKNIKA SA. Se permite descargar o imprimir contenido para un uso estrictamente privado y no comercial, siempre que se conserven los avisos de autoría y propiedad.",
          ],
        },
        {
          title: "Responsabilidad y enlaces externos",
          paragraphs: [
            "DOMTEKNIKA SA procura que la información publicada sea correcta y esté actualizada. No obstante, no garantiza que sea exhaustiva, que el sitio esté siempre disponible o que no contenga errores. Sin perjuicio de las normas imperativas, el uso del sitio y de su contenido es responsabilidad de quien lo consulta.",
            "Los enlaces a sitios de terceros se facilitan por comodidad. DOMTEKNIKA SA no controla su contenido, disponibilidad ni prácticas de protección de datos y no asume responsabilidad por ellos.",
          ],
        },
        {
          title: "Legislación aplicable",
          paragraphs: [
            "Este sitio web y el presente aviso legal se rigen por el derecho suizo. Salvo que exista un fuero obligatorio, serán competentes los tribunales del domicilio social de DOMTEKNIKA SA.",
          ],
        },
      ],
    },
    privacyPolicy: {
      intro:
        "Esta política explica cómo DOMTEKNIKA SA trata datos personales cuando visita este sitio web o se pone en contacto con nosotros. Se basa en la Ley Federal Suiza de Protección de Datos (LPD) y, cuando resulte aplicable, en el Reglamento General de Protección de Datos de la Unión Europea (RGPD).",
      updatedLabel: "Última actualización",
      updated: "julio de 2026",
      sections: [
        {
          title: "Responsable del tratamiento",
          paragraphs: [
            "DOMTEKNIKA SA\nChemin de Saint-Joux 16B\n2520 La Neuveville\nSuiza",
            "Puede enviar cualquier consulta sobre protección de datos o solicitud relativa a sus datos personales a:",
          ],
          links: companyContact,
        },
        {
          title: "Datos tratados al visitar el sitio",
          paragraphs: [
            "Al acceder al sitio, nuestro proveedor de alojamiento puede registrar automáticamente la información técnica necesaria para prestar y proteger el servicio. Puede incluir la dirección IP, fecha y hora, página o archivo solicitado, sitio de procedencia, navegador, sistema operativo y estado de la respuesta.",
            "Estos registros técnicos se utilizan para operar el sitio, detectar errores, prevenir abusos y mantener la seguridad. DOMTEKNIKA SA no los utiliza para elaborar perfiles publicitarios.",
          ],
        },
        {
          title: "Solicitudes de contacto",
          paragraphs: [
            "Si se pone en contacto con nosotros por correo electrónico, teléfono o mediante el formulario, trataremos los datos que nos facilite, como su nombre, empresa, correo electrónico, teléfono y mensaje. Los utilizamos para responder, preparar una posible relación comercial y documentar la correspondencia cuando sea necesario.",
            "No envíe información técnica confidencial ni datos personales sensibles mediante el formulario sin haberlo acordado previamente con nosotros.",
          ],
        },
        {
          title: "Finalidades del tratamiento",
          items: [
            "Facilitar, mantener y proteger el sitio web.",
            "Responder consultas y preparar o gestionar relaciones comerciales.",
            "Cumplir obligaciones legales y ejercer o defender derechos.",
            "Mejorar la fiabilidad y la facilidad de uso de nuestros servicios digitales.",
          ],
        },
        {
          title: "Cookies y medición de audiencia",
          paragraphs: [
            "El sitio utiliza actualmente solo una cookie funcional de preferencia lingüística (NEXT_LOCALE) para conservar el idioma elegido. DOMTEKNIKA SA no utiliza actualmente en este sitio cookies publicitarias, seguimiento del comportamiento ni servicios de medición de audiencia.",
            "Si en el futuro se incorporan tecnologías opcionales de análisis o marketing, esta política y, cuando proceda, el mecanismo de consentimiento se actualizarán antes de activarlas.",
          ],
        },
        {
          title: "Mapas y contenidos de terceros",
          paragraphs: [
            "Los mapas interactivos utilizan datos y teselas de CARTO y OpenStreetMap. Al mostrar un mapa pueden transmitirse a estos proveedores datos técnicos, como su dirección IP y la solicitud del navegador. A sus tratamientos se aplican sus propias políticas de privacidad.",
          ],
          links: [
            { label: "Política de privacidad de CARTO", href: "https://carto.com/privacy" },
            {
              label: "Política de privacidad de OpenStreetMap",
              href: "https://osmfoundation.org/wiki/Privacy_Policy",
            },
          ],
        },
        {
          title: "Destinatarios y transferencias internacionales",
          paragraphs: [
            "Los datos personales pueden comunicarse a personal autorizado y a proveedores que prestan servicios de alojamiento, informática, cartografía o asesoramiento profesional, en la medida necesaria para sus funciones. No vendemos datos personales.",
            "Algunos proveedores pueden tratar datos fuera de Suiza. Cuando el país de destino no ofrece un nivel de protección adecuado, utilizamos garantías reconocidas, especialmente contractuales, o una excepción prevista por la ley.",
          ],
        },
        {
          title: "Conservación",
          paragraphs: [
            "Conservamos los datos personales únicamente durante el tiempo necesario para las finalidades descritas, durante la relación comercial y después cuando existan obligaciones legales de conservación, necesidades probatorias o intereses legítimos. Los registros técnicos se conservan conforme a la configuración operativa y de seguridad del proveedor de alojamiento.",
          ],
        },
        {
          title: "Sus derechos",
          paragraphs: [
            "Con arreglo a la normativa aplicable, puede solicitar información sobre sus datos personales y, cuando se cumplan los requisitos legales, su rectificación, entrega, supresión o la limitación del tratamiento, así como oponerse a determinados tratamientos. También puede presentar una reclamación ante la autoridad competente; en Suiza, el Comisionado Federal de Protección de Datos y Transparencia (PFPDT).",
            "Podremos solicitar una prueba de identidad. Se mantienen las limitaciones y excepciones previstas por la ley.",
          ],
          links: [
            {
              label: "Comisionado Federal de Protección de Datos y Transparencia",
              href: "https://www.edoeb.admin.ch/en",
            },
          ],
        },
        {
          title: "Seguridad y actualizaciones",
          paragraphs: [
            "DOMTEKNIKA SA aplica medidas organizativas y técnicas adecuadas para proteger los datos personales frente al acceso no autorizado, la pérdida, el uso indebido o la alteración. No obstante, ningún método de transmisión o almacenamiento puede garantizarse como completamente seguro.",
            "Podemos actualizar esta política cuando cambien nuestros servicios o las exigencias legales. Se aplica la versión vigente publicada en esta página.",
          ],
        },
      ],
    },
  },
  ko: {
    legalNotice: {
      intro:
        "본 법적 고지는 DOMTEKNIKA 웹사이트의 운영 주체를 밝히고 웹사이트 이용에 적용되는 조건을 안내합니다.",
      updatedLabel: "최종 업데이트",
      updated: "2026년 7월",
      sections: [
        {
          title: "웹사이트 운영자",
          paragraphs: [
            "DOMTEKNIKA SA\nChemin de Saint-Joux 16B\n2520 La Neuveville\nSwitzerland",
            "본 웹사이트의 편집 콘텐츠에 대한 책임은 DOMTEKNIKA SA에 있습니다.",
          ],
          links: companyContact,
        },
        {
          title: "호스팅",
          paragraphs: [
            "본 웹사이트는 Infomaniak Network SA, Rue Eugène Marziano 25, 1227 Les Acacias (GE), Switzerland가 스위스에서 호스팅합니다.",
          ],
          links: [
            {
              label: "Infomaniak 법적 정보",
              href: "https://www.infomaniak.com/en/legal/legal-notice",
            },
          ],
        },
        {
          title: "지식재산권",
          paragraphs: [
            "별도 표시가 없는 한, 본 웹사이트의 구성, 문구, 사진, 일러스트, 도면, 로고, 영상 및 기타 콘텐츠는 DOMTEKNIKA SA의 소유이거나 각 권리자의 허가를 받아 사용됩니다. 해당 콘텐츠는 스위스 및 국제 지식재산권법의 보호를 받습니다.",
            "전체 또는 일부를 복제, 수정, 배포하거나 상업적으로 이용하려면 DOMTEKNIKA SA의 사전 서면 허가가 필요합니다. 저작권 및 소유권 표시를 유지하는 경우에 한해 순수한 개인적·비상업적 목적의 다운로드와 인쇄는 허용됩니다.",
          ],
        },
        {
          title: "책임 및 외부 링크",
          paragraphs: [
            "DOMTEKNIKA SA는 정확하고 최신의 정보를 제공하기 위해 합리적인 주의를 기울입니다. 다만 콘텐츠의 완전성, 웹사이트의 상시 이용 가능성 또는 무오류를 보장하지는 않습니다. 강행 법규가 적용되는 경우를 제외하고, 웹사이트와 그 정보의 이용은 방문자의 책임입니다.",
            "제3자 웹사이트 링크는 편의를 위해 제공됩니다. DOMTEKNIKA SA는 해당 사이트의 콘텐츠, 이용 가능성 또는 개인정보 보호 관행을 통제하지 않으며 이에 대한 책임을 지지 않습니다.",
          ],
        },
        {
          title: "준거법",
          paragraphs: [
            "본 웹사이트와 법적 고지에는 스위스 법이 적용됩니다. 강행 관할 규정이 없는 한 DOMTEKNIKA SA 본점 소재지의 법원을 관할 법원으로 합니다.",
          ],
        },
      ],
    },
    privacyPolicy: {
      intro:
        "본 방침은 웹사이트 방문 또는 문의 과정에서 DOMTEKNIKA SA가 개인정보를 처리하는 방식을 설명합니다. 스위스 연방 개인정보보호법(FADP)과, 적용되는 경우 유럽 일반개인정보보호법(GDPR)을 기준으로 합니다.",
      updatedLabel: "최종 업데이트",
      updated: "2026년 7월",
      sections: [
        {
          title: "개인정보처리자",
          paragraphs: [
            "DOMTEKNIKA SA\nChemin de Saint-Joux 16B\n2520 La Neuveville\nSwitzerland",
            "개인정보 보호 관련 문의 또는 본인 데이터에 관한 요청은 아래 연락처로 보내주시기 바랍니다.",
          ],
          links: companyContact,
        },
        {
          title: "웹사이트 방문 시 처리되는 데이터",
          paragraphs: [
            "웹사이트에 접속하면 호스팅 제공업체가 서비스 제공과 보안에 필요한 기술 정보를 자동으로 기록할 수 있습니다. 여기에는 IP 주소, 접속 일시, 요청한 페이지 또는 파일, 유입 경로, 브라우저, 운영체제 및 응답 상태가 포함될 수 있습니다.",
            "이 서버 로그는 웹사이트 운영, 오류 탐지, 오용 방지 및 보안을 위해 사용됩니다. DOMTEKNIKA SA는 이를 광고 프로필 작성에 사용하지 않습니다.",
          ],
        },
        {
          title: "문의 데이터",
          paragraphs: [
            "이메일, 전화 또는 문의 양식을 통해 연락하는 경우, 이름, 회사명, 이메일 주소, 전화번호 및 메시지 등 제공된 정보를 처리합니다. 해당 정보는 문의 답변, 잠재적인 비즈니스 관계 준비 및 필요한 경우 연락 기록 보관에 사용됩니다.",
            "사전에 합의하지 않은 기밀 기술 정보나 민감한 개인정보는 문의 양식을 통해 보내지 마십시오.",
          ],
        },
        {
          title: "처리 목적",
          items: [
            "웹사이트 제공, 유지관리 및 보안.",
            "문의 응대와 비즈니스 관계의 준비 또는 관리.",
            "법적 의무 준수 및 법적 청구의 제기·방어.",
            "디지털 서비스의 안정성과 사용성 개선.",
          ],
        },
        {
          title: "쿠키 및 방문 분석",
          paragraphs: [
            "현재 웹사이트는 선택한 언어를 유지하기 위한 기능성 언어 설정 쿠키(NEXT_LOCALE)만 사용합니다. DOMTEKNIKA SA는 현재 본 웹사이트에서 광고 쿠키, 행동 추적 또는 방문자 분석 서비스를 사용하지 않습니다.",
            "향후 선택형 분석 또는 마케팅 기술을 도입하는 경우, 활성화 전에 본 방침과 필요한 동의 절차를 업데이트합니다.",
          ],
        },
        {
          title: "지도 및 제3자 콘텐츠",
          paragraphs: [
            "대화형 지도는 CARTO와 OpenStreetMap의 지도 데이터 및 타일을 사용합니다. 지도가 표시될 때 IP 주소와 브라우저 요청 등의 기술 데이터가 해당 제공업체로 전송될 수 있으며, 각 제공업체의 개인정보 보호정책이 적용됩니다.",
          ],
          links: [
            { label: "CARTO 개인정보 보호정책", href: "https://carto.com/privacy" },
            {
              label: "OpenStreetMap 개인정보 보호정책",
              href: "https://osmfoundation.org/wiki/Privacy_Policy",
            },
          ],
        },
        {
          title: "수신자 및 해외 이전",
          paragraphs: [
            "개인정보는 업무에 필요한 범위에서 권한을 가진 직원과 호스팅, IT 운영, 지도 또는 전문 자문을 지원하는 서비스 제공업체에 제공될 수 있습니다. 당사는 개인정보를 판매하지 않습니다.",
            "일부 제공업체는 스위스 외부에서 데이터를 처리할 수 있습니다. 목적지가 적절한 보호 수준을 제공하지 않는 경우, 계약상 보호조치 등 인정된 보호수단 또는 법률상 예외에 근거합니다.",
          ],
        },
        {
          title: "보관 기간",
          paragraphs: [
            "개인정보는 위 목적에 필요한 기간, 비즈니스 관계가 유지되는 기간 및 이후 법정 보관 의무, 증명 필요성 또는 정당한 이익이 존재하는 기간에만 보관합니다. 기술 로그는 호스팅 제공업체의 운영 및 보안 설정에 따라 보관됩니다.",
          ],
        },
        {
          title: "이용자의 권리",
          paragraphs: [
            "관련 개인정보 보호법에 따라 본인 개인정보에 대한 정보 제공을 요청할 수 있으며, 법적 요건이 충족되는 경우 정정, 제공, 삭제, 처리 제한 또는 특정 처리에 대한 이의를 요청할 수 있습니다. 또한 관할 개인정보 보호기관에 민원을 제기할 수 있으며, 스위스의 관할 기관은 연방 데이터 보호 및 정보 위원회(FDPIC)입니다.",
            "요청 시 신원 확인 자료를 요구할 수 있습니다. 법률상 제한과 예외는 그대로 적용됩니다.",
          ],
          links: [
            {
              label: "스위스 연방 데이터 보호 및 정보 위원회",
              href: "https://www.edoeb.admin.ch/en",
            },
          ],
        },
        {
          title: "보안 및 방침 변경",
          paragraphs: [
            "DOMTEKNIKA SA는 개인정보를 무단 접근, 분실, 오용 또는 변경으로부터 보호하기 위해 적절한 조직적·기술적 조치를 적용합니다. 다만 어떠한 전송 또는 저장 방식도 완전한 보안을 보장할 수는 없습니다.",
            "서비스 또는 법적 요구사항이 변경되는 경우 본 방침을 개정할 수 있습니다. 이 페이지에 게시된 최신 버전이 적용됩니다.",
          ],
        },
      ],
    },
  },
  zh: {
    legalNotice: {
      intro:
        "本法律声明用于说明 DOMTEKNIKA 网站的责任主体以及适用于网站使用的相关条件。",
      updatedLabel: "最后更新",
      updated: "2026年7月",
      sections: [
        {
          title: "网站运营方",
          paragraphs: [
            "DOMTEKNIKA SA\nChemin de Saint-Joux 16B\n2520 La Neuveville\nSwitzerland",
            "DOMTEKNIKA SA 对本网站的编辑内容负责。",
          ],
          links: companyContact,
        },
        {
          title: "网站托管",
          paragraphs: [
            "本网站由 Infomaniak Network SA 在瑞士托管，地址：Rue Eugène Marziano 25, 1227 Les Acacias (GE), Switzerland。",
          ],
          links: [
            {
              label: "Infomaniak 法律信息",
              href: "https://www.infomaniak.com/en/legal/legal-notice",
            },
          ],
        },
        {
          title: "知识产权",
          paragraphs: [
            "除非另有说明，本网站的结构、文字、照片、插图、图纸、标志、视频及其他内容均归 DOMTEKNIKA SA 所有，或已获得相应权利人的授权使用。这些内容受瑞士及国际知识产权法律保护。",
            "对上述内容进行全部或部分复制、改编、传播或商业使用，须事先取得 DOMTEKNIKA SA 的书面许可。在保留著作权和所有权声明的前提下，可为纯粹私人且非商业的用途下载或打印。",
          ],
        },
        {
          title: "责任与外部链接",
          paragraphs: [
            "DOMTEKNIKA SA 会合理维护网站信息的准确性和时效性，但不保证内容完整、网站始终可用或完全无误。在强制性法律规定之外，访问者应自行承担使用网站及依赖其内容的责任。",
            "指向第三方网站的链接仅为方便访问而提供。DOMTEKNIKA SA 无法控制其内容、可用性或数据保护做法，也不对此承担责任。",
          ],
        },
        {
          title: "适用法律",
          paragraphs: [
            "本网站及本法律声明适用瑞士法律。除强制管辖规定外，由 DOMTEKNIKA SA 注册所在地的法院管辖。",
          ],
        },
      ],
    },
    privacyPolicy: {
      intro:
        "本政策说明您访问本网站或联系我们时，DOMTEKNIKA SA 如何处理个人数据。本政策依据瑞士《联邦数据保护法》（FADP），并在适用时遵循欧盟《通用数据保护条例》（GDPR）。",
      updatedLabel: "最后更新",
      updated: "2026年7月",
      sections: [
        {
          title: "数据控制者",
          paragraphs: [
            "DOMTEKNIKA SA\nChemin de Saint-Joux 16B\n2520 La Neuveville\nSwitzerland",
            "有关数据保护的问题或涉及您个人数据的请求，可通过以下方式联系我们：",
          ],
          links: companyContact,
        },
        {
          title: "访问网站时处理的数据",
          paragraphs: [
            "访问网站时，托管服务商可能会自动记录提供和保护服务所需的技术信息，包括 IP 地址、访问日期和时间、请求的页面或文件、来源页面、浏览器、操作系统及响应状态。",
            "这些服务器日志用于网站运行、故障排查、防止滥用和保障安全。DOMTEKNIKA SA 不会使用这些数据建立广告画像。",
          ],
        },
        {
          title: "联系信息",
          paragraphs: [
            "当您通过电子邮件、电话或联系表单与我们联系时，我们会处理您主动提供的信息，例如姓名、公司、电子邮箱、电话号码和留言。这些信息用于回复您的请求、筹备可能的业务合作，并在必要时记录沟通过程。",
            "未经事先协商，请勿通过联系表单发送机密技术信息或敏感个人数据。",
          ],
        },
        {
          title: "处理目的",
          items: [
            "提供、维护并保护网站。",
            "回复咨询并筹备或管理业务关系。",
            "履行法律义务以及提出或应对法律主张。",
            "提升数字服务的可靠性和易用性。",
          ],
        },
        {
          title: "Cookie 与访问统计",
          paragraphs: [
            "本网站目前仅使用功能性语言偏好 Cookie（NEXT_LOCALE），用于保留您选择的语言。DOMTEKNIKA SA 目前不会在本网站使用广告 Cookie、行为追踪或访问统计服务。",
            "如日后引入可选的分析或营销技术，我们会在启用前更新本政策以及必要的同意机制。",
          ],
        },
        {
          title: "地图与第三方内容",
          paragraphs: [
            "互动地图使用 CARTO 和 OpenStreetMap 提供的地图数据及图块。地图显示时，您的 IP 地址和浏览器请求等技术数据可能会传输给这些服务商，其数据处理适用各自的隐私政策。",
          ],
          links: [
            { label: "CARTO 隐私政策", href: "https://carto.com/privacy" },
            {
              label: "OpenStreetMap 隐私政策",
              href: "https://osmfoundation.org/wiki/Privacy_Policy",
            },
          ],
        },
        {
          title: "接收方与跨境传输",
          paragraphs: [
            "在履行职责所必需的范围内，个人数据可能会提供给经授权的员工，以及支持托管、IT 运维、地图或专业咨询的服务商。我们不会出售个人数据。",
            "部分服务商可能在瑞士境外处理数据。如果目的地无法提供充分的保护水平，我们会采用认可的保障措施，尤其是合同保障，或依据法律规定的例外情形。",
          ],
        },
        {
          title: "保存期限",
          paragraphs: [
            "我们仅在实现上述目的所必需的期限内、业务关系存续期间，以及此后因法定保存义务、举证需要或正当利益所要求的期限内保存个人数据。技术日志按照托管服务商的运行和安全设置保存。",
          ],
        },
        {
          title: "您的权利",
          paragraphs: [
            "根据适用的数据保护法律，您可请求了解我们处理的个人数据；在符合法律条件时，还可要求更正、提供、删除或限制处理，或反对特定处理。您也可以向主管数据保护机构投诉；瑞士的主管机构为联邦数据保护和信息专员（FDPIC）。",
            "提出请求时，我们可能要求您提供身份证明。法律规定的限制和例外仍然适用。",
          ],
          links: [
            {
              label: "瑞士联邦数据保护和信息专员",
              href: "https://www.edoeb.admin.ch/en",
            },
          ],
        },
        {
          title: "安全与政策更新",
          paragraphs: [
            "DOMTEKNIKA SA 采取适当的组织和技术措施，保护个人数据免遭未经授权的访问、丢失、滥用或篡改。但任何传输或存储方式都无法保证绝对安全。",
            "当服务或法律要求发生变化时，我们可能更新本政策。以本页面发布的最新版本为准。",
          ],
        },
      ],
    },
  },
};

export function getLegalPages(locale: string): LegalPages {
  const resolvedLocale = isLocale(locale) ? locale : "en";
  const pages = legalPages[resolvedLocale];
  const enhancements = legalEnhancements[resolvedLocale];
  const legalSections = pages.legalNotice.sections;
  const privacySections = pages.privacyPolicy.sections.map(section =>
    /Cookies|쿠키|Cookie 与/.test(section.title)
      ? { ...section, paragraphs: [getAnalyticsCopy(resolvedLocale).legal], links: [{ label: "Google — Privacy", href: "https://policies.google.com/privacy" }] }
      : section,
  );
  const publisher = legalSections[0]!;

  return {
    legalNotice: {
      ...pages.legalNotice,
      sections: [
        {
          ...publisher,
          paragraphs: [
            ...(publisher.paragraphs?.slice(0, 1) ?? []),
            enhancements.companyIdentity,
            ...(publisher.paragraphs?.slice(1) ?? []),
          ],
        },
        enhancements.legal.registry,
        enhancements.legal.scope,
        ...legalSections.slice(1, 3),
        enhancements.legal.submissions,
        enhancements.legal.acceptableUse,
        legalSections[3]!,
        enhancements.legal.privacy,
        enhancements.legal.changes,
        enhancements.legal.severability,
        legalSections[4]!,
      ],
    },
    privacyPolicy: {
      ...pages.privacyPolicy,
      updated: "2026-09-14",
      sections: [
        privacySections[0]!,
        enhancements.privacy.scope,
        ...privacySections.slice(1, 4),
        enhancements.privacy.legalBasis,
        ...privacySections.slice(4, 6),
        enhancements.privacy.emailProvider,
        ...privacySections.slice(6, 8),
        enhancements.privacy.automatedDecisions,
        enhancements.privacy.children,
        ...privacySections.slice(8),
      ],
    },
  };
}

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
