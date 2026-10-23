# Apparition des sections — 23 octobre 2026

## Ajustement après retour visuel

La première variante douce a été écartée. Les nouveaux blocs utilisent désormais exactement le `Reveal initiallyHidden` de l’accueil : même déplacement de 24 px, même transition et même déclenchement. Les trois cartes reprennent les délais de `ProcessSection` : 0, 80 et 160 ms. Aucun réglage de l’accueil n’a été modifié.

## Vérification publique avant modification

- `https://domteknika.ch/fr` affiche à nouveau le site, en HTTP 200.
- Le nouveau logo est présent dans les données structurées de l'accueil.
- `/favicon.ico` répond en HTTP 200 avec `X-Robots-Tag: index, follow`.
- Les nouvelles recommandations éditoriales sont visibles sur la page Design produit publiée.
- Les six pages de prestations n'avaient pas d'apparition au défilement pour leurs blocs de contenu.

## Modifications

- Réemploi de `Reveal initiallyHidden`, déjà utilisé sur l’accueil, une fois par bloc. Suppression complète de la variante `subtle`.
- Six pages Expertise : introduction technique, tableau, réalisation, trois cartes, FAQ, appel au contact et autres expertises.
- Pages détaillées Projets : présentation, périmètre, galerie, liens associés et contact.
- Pages détaillées Brevets : informations, famille, projets liés, galerie, description, revendications et sources.
- Mentions légales et confidentialité : apparition des sections au défilement.
- Accueil, listes Projets/Brevets, Expertise principale, Notre histoire et Contact possèdent déjà leurs animations. Leurs effets et les transitions de navigation sont conservés. Les écrans d'erreur restent immédiatement lisibles.

## Chargement et accessibilité

- Aucune dépendance ajoutée ; Framer Motion était déjà chargé par la navigation commune.
- Animation limitée à l'opacité et à la transformation, sans animation de la hauteur ni boucle permanente.
- Comme sur l’accueil, les blocs commencent masqués pour déclencher leur apparition même lorsqu’ils sont déjà proches de la zone visible au chargement. Les textes restent présents dans le HTML ; le composant existant gère le défilement, le rechargement et les retours de navigation.
- Les titres et images principaux ne sont pas masqués au chargement ; qualités, tailles et priorités de téléchargement des images conservées.
- Identifiants d'ancrage et attributs ARIA transmis aux éléments animés.
- Réduction des animations respectée, y compris lorsqu'elle est activée après chargement.
- Impression : tous les blocs restent visibles même s'ils n'ont pas encore été parcourus.

## Contrôles

- ESLint ciblé, TypeScript et compilation de production réussis (778 pages générées).
- Les composants partagés couvrent les 42 prestations localisées et les pages détaillées Projets/Brevets et légales. Le contenu, les balises de titres, les liens et les données structurées restent inchangés.
- Chrome après l’ajustement : apparition progressive mesurée sur ordinateur et à 390 × 844 ; même déplacement de 24 px et décalage des cartes que sur l’accueil ; retour final à opacité 1 et transformation nulle.
- 16 blocs vérifiés sur les pages de prestations représentatives, tous visibles après défilement.
- Passage d'une expertise à une autre, retour arrière, rechargement en milieu de page, accès direct à la FAQ et ouverture d'une réponse vérifiés.
- Pages détaillées projet/brevet/confidentialité : apparition mesurée, pas de débordement horizontal observé.
- Aucun message d'erreur JavaScript relevé sur les parcours contrôlés. L'avertissement Next sur l'image décorative devenue LCP lors d'un accès direct en bas de page ne justifie pas de la charger prioritairement sur tous les accès.
- Vérification d'impression : 9 blocs encore masqués avant le correctif CSS, aucun après ; aucun bloc masqué en mode réduction des animations.

Les animations de cette modification sont vérifiées localement. Leur publication nécessite le déploiement Infomaniak du nouveau commit ; les mesures navigateur ne constituent pas une nouvelle mesure de performance terrain.
