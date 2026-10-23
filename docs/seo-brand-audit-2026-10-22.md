# Identité Google et priorités SEO — 22 octobre 2026

## Périmètre du contrôle

Contrôle du site public `https://domteknika.ch`, du code actuel et d'un build de production isolé. Échantillon public : les sept accueils, les six expertises en français et en anglais, Contact, Projets, Brevets et Notre histoire en français, soit 23 pages. Contrôle complémentaire du favicon, du logo, de robots.txt, du sitemap, des redirections de domaine et d'une URL inexistante.

Les rapports privés Search Console, Google Business Profile et GA4 n'ont pas été consultés. Les visites réelles, la couverture d'indexation et les conversions reçues dans ces outils restent donc à contrôler.

## Problèmes trouvés et corrections dans le code

| Élément | Constat sur le site en ligne | Correction validée en production locale |
| --- | --- | --- |
| Favicon | Le fichier est bien présent et répond en HTTP 200. Il reçoit `X-Robots-Tag: noindex`, y compris avec un agent Googlebot-Image. Son poids est de 370 070 octets. | Exception d'indexation pour les icônes d'identité. ICO avec six résolutions compressées, 21 329 octets, soit environ 94 % de moins. Ajout d'un PNG 96 × 96 et d'une icône Apple 180 × 180. |
| Logo Organization | Le JSON-LD référence une image de 176 × 67 px qui reçoit également `noindex`. | Image carrée de 600 × 600 px issue du logo original, accessible à l'indexation et déclarée avec ses dimensions. |
| Nom du site | Le nom DOMTEKNIKA existe déjà, mais l'URL WebSite varie entre les accueils linguistiques. | URL WebSite harmonisée sur `https://domteknika.ch/`, nom DOMTEKNIKA et nom alternatif DOMTEKNIKA SA. Nom commercial et raison sociale distingués dans Organization. |

Google exige un favicon carré et accessible à son robot d'images. Le respect des conditions ne garantit pas son affichage ; une nouvelle exploration peut prendre plusieurs jours ou semaines. L'absence dans le résultat fourni ne permet pas de connaître la décision ni la date de la dernière exploration de Google. [Consignes officielles favicon](https://developers.google.com/search/docs/appearance/favicon-in-search).

Pour le logo Organization, Google demande une image d'au moins 112 × 112 px, explorable et indexable. L'ancien logo ne respecte pas ces conditions. [Consignes officielles Organization](https://developers.google.com/search/docs/appearance/structured-data/organization).

La présence dans un onglet Chrome et la présence dans les résultats Google sont deux comportements distincts. L'en-tête noindex vise les moteurs de recherche ; il n'interdit pas l'affichage du fichier par Chrome. Le favicon public était téléchargeable pendant le contrôle. Un éventuel ancien affichage dans Chrome peut provenir de son cache et doit être revérifié après déploiement.

## Bases déjà vérifiées sur le site public

- Les 23 pages de l'échantillon répondent en HTTP 200 ; les pages analysées possèdent un titre et un H1.
- Les accueils utilisent des titres et descriptions dans les sept langues.
- Les métadonnées analysées comportent une URL canonique et les sept variantes linguistiques avec `x-default`.
- robots.txt autorise l'exploration publique et exclut `/api/`.
- Le sitemap répond en HTTP 200 et contient 630 URL avec leurs variantes linguistiques. La présence dans le sitemap ne prouve pas l'indexation de chacune.
- Les variantes HTTP et www rejoignent la version HTTPS sans www.
- L'URL inexistante testée renvoie un vrai HTTP 404.
- La compression gzip fonctionne : accueil anglais 391 516 → 47 455 octets ; catalogue français des brevets 882 853 → 82 678 octets pour les requêtes testées. Ces tailles ne sont pas une mesure de vitesse chez les visiteurs.

## Actions suivantes, par priorité

| Priorité | Action concrète | Décision ou résultat attendu |
| --- | --- | --- |
| 1 | Déployer le correctif sur Infomaniak, puis contrôler les fichiers d'icônes et le logo sur le domaine public. | Les nouveaux fichiers doivent répondre en 200, avec le bon type MIME et sans noindex. Le push GitHub seul ne met pas à jour le serveur. |
| 1 | Dans Search Console, inspecter la racine et les accueils français/anglais, effectuer le test en direct puis demander une indexation. | Faire découvrir la nouvelle identité à Google et connaître la dernière exploration. [Favicon et nouvelle exploration](https://developers.google.com/search/docs/appearance/favicon-in-search). |
| 1 | Vérifier le rapport d'indexation et le traitement de `https://domteknika.ch/sitemap.xml`. | Identifier les pages importantes exclues, les erreurs ou une canonique choisie différente. Ce diagnostic nécessite les données Search Console. |
| 1 | Contrôler les performances mobiles réelles : LCP, INP et CLS, puis examiner les pages défaillantes avec PageSpeed Insights. | Corriger les problèmes mesurés de chargement, de réactivité ou de décalage. Aucun score terrain n'est confirmé par le présent contrôle. [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals). |
| 2 | Trier les requêtes/pages Search Console par impressions et taux de clics, en séparant les langues et les pays utiles. | Choisir les pages à améliorer d'après les recherches réelles. [Rapport de performances](https://support.google.com/webmasters/answer/17010961). |
| 2 | Rendre certains titres de résultats plus descriptifs. Exemples français : « Projets d'ingénierie et prototypes — DOMTEKNIKA », « Brevets et innovations techniques — DOMTEKNIKA », « Contact — DOMTEKNIKA, La Neuveville ». | Les titres actuels « DOMTEKNIKA - Projets/Brevets/Contact » sont valides, mais génériques. Tester les nouveaux titres en suivant le taux de clics ; les titres visibles dans les pages peuvent rester identiques. [Titres Google](https://developers.google.com/search/docs/appearance/title-link). |
| 2 | Auditer la fiche Google Business Profile : catégorie, description, coordonnées, site, logo, photos et avis authentiques. | Renforcer la présentation locale et la cohérence avec le site. L'état privé de la fiche n'a pas été vérifié. [Recommandations locales Google](https://support.google.com/business/answer/7091). |
| 2 | Enrichir les fiches projet qui manquent de contexte avec le problème initial, le rôle exact de DOMTEKNIKA, les contraintes et le résultat documenté. | Aider un prospect à reconnaître son besoin et apporter des preuves techniques. Utiliser uniquement des résultats vérifiables. |
| 2 | Vérifier dans GA4 qu'un envoi de formulaire réussi remonte effectivement comme conversion, avec le consentement prévu. | Mesurer les contacts obtenus, en complément des clics Google. Le code contient déjà un événement de contact ; sa réception réelle n'a pas été testée ici. |
| 3 | Profiler la quantité de données initiales des pages Accueil et Brevets, avant de modifier les carrousels ou les données du catalogue. | Chercher une réduction mesurable du HTML/JavaScript initial tout en conservant les interactions approuvées. Gzip est déjà actif. |
| 3 | Obtenir des liens éditoriaux pertinents depuis des partenaires, projets ou publications professionnelles réels. | Renforcer la découverte et la notoriété du bureau auprès d'un public qualifié. [Facteurs locaux Google](https://support.google.com/business/answer/7091). |
| 3 | Évaluer une déclinaison compacte du logo pour les très petites icônes, si la marque en possède une. | Un logo horizontal complet reste petit à 16 ou 32 px. Le correctif actuel conserve le logo approuvé. |

## Vérifications du correctif

- Build de production réussi, 778 pages statiques générées ; TypeScript et audit de contenu inclus.
- ESLint sur les fichiers modifiés et vérification du diff.
- Contrôle HTTP des trois icônes dans les sept langues et du logo Organization.
- Contrôle du JSON-LD WebSite/Organization généré dans les sept langues.
- Les cartes email/téléphone copient désormais la valeur depuis toute leur surface, avec confirmation et accès clavier. Vérification sur ordinateur et en largeur téléphone.

Les corrections décrites nécessitent le déploiement Infomaniak. Le choix final du favicon, du nom et des extraits dans Google appartient au moteur. [Nom du site dans Google](https://developers.google.com/search/docs/appearance/site-names).
