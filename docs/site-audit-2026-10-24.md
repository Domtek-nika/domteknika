# Audit du site — 24 octobre 2026

Audit du site public puis vérification des correctifs dans une compilation de production isolée. Les contrôles visuels utilisent le navigateur de test intégré, aux formats 1440 × 900, 390 × 844 et 844 × 320. Ils ne constituent pas une certification de tous les appareils ni une mesure terrain de tous les visiteurs.

## Corrections

| Point constaté | Correction | Vérification |
| --- | --- | --- |
| Le carrousel d’accueil rendait deux fois les 27 projets. | Suppression des copies ; maintien de la boucle native Embla, de l’ordre et de l’autoplay. | 27 cartes dans le DOM ; passage première → dernière → première, ouverture au clavier et affichage mobile vérifiés. |
| Les miniatures des dessins de brevets demandaient les fichiers complets. | Images responsive via Next, chargement différé et priorité basse, qualité 100. | Miniatures servies en 256 px sur le scénario desktop ; changement de dessin fonctionnel. Grandes images, zoom, PDF et originaux inchangés. |
| Le carrousel déclarait 274 px pour des cartes mobiles pouvant atteindre 340 px. | Attribut `sizes` aligné sur les dimensions réelles. | Rendu mobile et source responsive contrôlés. |
| La navigation et la bulle Contact mobiles restaient focalisables lorsqu’elles étaient masquées. | Conteneurs rendus `inert` selon leur état de visibilité. | Menu mobile, fermeture Échap et restitution du focus contrôlés. |
| Les dernières langues pouvaient sortir d’un écran bas. | Hauteur maximale liée à l’espace disponible, avec défilement interne. | À 844 × 320, la dernière langue reste accessible et visible au clavier. |
| Les champs de contact utilisaient une police inférieure à 16 px sur mobile. | 16 px sur mobile pour éviter le déclencheur courant d’autozoom iOS ; email sans capitalisation automatique. | Styles calculés contrôlés à 390 px, erreurs inline et focus sur le premier champ invalide. Pas d’envoi réel de formulaire. |
| Le bouton d’envoi gardait un survol actif lorsqu’il était désactivé. | Survol réservé à l’état actif, curseurs explicites. | Revue des états et ESLint. |
| La recherche des brevets n’avait pas de nom accessible. | Ajout d’un libellé accessible utilisant la traduction existante. | Contrôle du champ dans le navigateur. |
| Les fiches complètes projet/brevet imbriquaient deux zones de contenu principal. | Conservation d’un seul repère `main`, fourni par la mise en page commune. | Structure HTML contrôlée ; classes et contenu identiques. |
| Les titres SEO des pages Expertise et Projets étaient génériques. | Titres descriptifs dans les sept langues, sans changer les titres visibles. | Compilation et métadonnées des routes localisées. |
| Le JSON-LD d’organisation conservait « Electronics integration ». | Alignement sur le développement électronique confirmé par Étienne V2. | Revue des données structurées. |
| Les métadonnées Open Graph imposaient 1200 × 630 à toutes les images. | Dimensions fixes uniquement pour le visuel social commun qui possède ce format. | Les visuels personnalisés conservent leur source et leur ratio réel. |
| L’ancienne URL `/projets-2` (« Compétences » dans le snapshot historique) redirigeait vers Projets. | Redirection vers Expertise, en FR et EN. `/projets` reste dirigé vers Projets. | Redirections de production locales vérifiées. |

Mesure d’encodage locale sur un échantillon de sept dessins US11950725B2 : 482 323 octets pour les originaux contre 129 290 octets en AVIF et 95 420 en WebP à 256 px, qualité 100. Cela représente environ 73 à 80 % de moins pour ces miniatures ; ce n’est pas un gain mesuré sur l’ensemble du site ou sur tous les appareils. Un réglage de qualité 100 ne signifie pas un encodage mathématiquement sans perte.

## Éléments déjà satisfaisants, conservés

- Images sous la ligne de flottaison chargées progressivement ; visuels importants prioritaires et dimensions réservées.
- Animations lourdes et carrousel suspendus hors de leur zone utile. Aucun ajout de bibliothèque ni de traqueur.
- Parcours principaux de contact dirigés vers le formulaire ; liens téléphone/email du pied de page conservés.
- Recherche des projets, ouverture des fiches, retour à l’accueil et bouton Contact fonctionnels dans les parcours testés.
- FAQ mobile : filtrage, sept questions, ouverture/fermeture et mise en page sans débordement dans le scénario testé.
- Remarques V2 visibles en ligne : développement électronique, PCB et ordre simulation/prototypage. Les textes techniques validés n’ont pas été réécrits pendant cet audit.
- Les consentements Analytics et la mesure des demandes envoyées disposent déjà de tests. Aucun envoi réel ni modification du compte Analytics effectués.

## Référencement public vérifié

- 42 sous-pages Expertise publiques (six prestations × sept langues) : réponse HTTP 200, canonical exact, huit variantes linguistiques, sans interdiction d’indexation HTML.
- Sitemap public : 630 URL uniques, sept langues, exclusion du projet temporairement désactivé.
- Robots, favicon ICO/PNG, icône Apple et logo d’organisation accessibles ; les images d’identité sont indexables.
- Politique volontaire de non-indexation des autres médias conservée.
- Une URL inexistante renvoie une véritable 404.

Ces contrôles prouvent la configuration et l’accessibilité publiques observées. Ils ne prouvent pas que chaque page est actuellement indexée ou bien classée. Google décide de l’affichage du favicon, des titres et des extraits.

## Validation avant livraison

- 32 tests automatisés réussis : consentement, mesure de conversion, validation et API de contact avec transport email simulé.
- TypeScript, audit de contenu et ESLint ciblé réussis.
- Compilation de production réussie ; aucune dépendance ajoutée ou mise à jour.
- 70 routes locales vérifiées : HTTP 200, canonical correct et un seul H1, dans les sept langues.
- `npm audit --omit=dev` : aucune vulnérabilité connue signalée au moment du contrôle. Cette vérification n’est pas un audit de sécurité exhaustif.
- Revue indépendante des corrections et vérifications visuelles des principales interactions modifiées.

## Priorités pour gagner des visites qualifiées

1. Utiliser un export Search Console récent pour choisir les requêtes de prestations ayant des impressions sans clics, puis mesurer l’évolution des pages concernées. Les titres affinés ici sont une amélioration de pertinence, pas une promesse de positionnement.
2. Diffuser les réalisations approuvées avec un lien vers la prestation correspondante : publications LinkedIn, références clients autorisées et liens de partenaires. Ne pas inventer de témoignages ni de résultats chiffrés.
3. Vérifier et entretenir la fiche Google Business Profile, puis rapprocher les visites des demandes réellement envoyées dans Analytics (`generate_lead`, déjà prévu après consentement).

Aucune campagne, publication, prise de contact ou modification de compte tiers n’a été effectuée. Le déploiement Infomaniak reste une étape distincte du push GitHub.

Sources : [titres Google](https://developers.google.com/search/docs/appearance/title-link), [favicon](https://developers.google.com/search/docs/appearance/favicon-in-search), [rapport Performance Search Console](https://support.google.com/webmasters/answer/10268906), [visibilité locale](https://support.google.com/business/answer/7091), [Open Graph](https://ogp.me/).
