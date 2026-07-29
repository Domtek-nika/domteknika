# DOMTEKNIKA Design System

Ce document est la source de vérité de la direction artistique du site DOMTEKNIKA.
La référence active est la frame Figma `Main` du mockup DOMTEKNIKA Website Mockup, complétée par les screenshots dans `screen-page/Main Page`.

## Intention

DOMTEKNIKA doit paraître précis, suisse, industriel et premium. Le site ne cherche pas un effet startup ou décoratif. Il doit donner une impression de maîtrise technique, de confidentialité et de fabrication concrète.

Principes:

- Fond blanc, beaucoup d'air, alignements nets.
- Rouge DOMTEKNIKA utilisé comme ponctuation: traits, points, boutons, icônes.
- Dessins techniques rouges très pâles pour exprimer la conception.
- Imagerie réelle du Chasseral pour l'ancrage suisse.
- Aucune carte ou section inventée si elle n'existe pas dans le Figma.

## Couleurs

| Rôle | Valeur | Usage |
| --- | --- | --- |
| Rouge marque | `#E30613` | CTA, accents, points, traits, icônes |
| Texte principal | `#111111` | Titres et texte fort |
| Texte secondaire | `#565656` | Sous-textes et adresses |
| Fond | `#FFFFFF` | Page entière |
| Gris surface | `#F7F7F7` | Bande logos, fonds cartes projets |
| Bordures | `#E5E5E5` | Cartes, stats, séparateurs |
| Bleu Chasseral | `#004691` | Overlay gauche bannière Suisse à 49% |
| Bleu profond | `#00273D` | Fin de gradient à 0% |

Les composants doivent utiliser les tokens CSS de `src/app/globals.css` (`bg-brand`, `text-brand`, `text-foreground`, `text-muted-foreground`) plutôt que des hex directs dans le JSX.

## Typographie

Police: 42dot Sans DOMTEKNIKA, chargée localement via `next/font/local`.
Les fichiers webfont sont générés depuis 42dot Sans et patchés avec les
accents français manquants pour garder la même graisse et le même dessin sur
les versions FR et EN.

Règles:

- Héros: très grand, ombre courte noire, ponctuation rouge.
- La ligne finale du héros est plus lourde que les lignes `Engineering / Prototyping / Producing`.
- Corps: tailles généreuses, interlignage compact mais lisible.
- Labels et navigation: gras, simples, sans tracking décoratif excessif.

Ombre typographique de référence: `.domtek-text-shadow`.

## Rayons

- Rayon de base Figma: `7px`.
- Cartes expertise et stats du triptyque: `rounded-[15px]`.
- Boutons et petites cartes répétées: `rounded-[7px]`.
- Navbar: `50px` sur les coins bas, via `rounded-b-[50px]` en desktop.
- Aucun grand radius décoratif hors navbar.

## Structure de page

Ordre de la homepage:

1. Navbar fixed glass.
2. Hero avec dessin technique haut, flèches rouges, titre et deux CTA.
3. Projets avec carousel shadcn/Embla, cartes compactes autour de 274 x 286, image sur fond gris.
4. Expertise triptyque: `The idea`, panneau rouge `The process`, `The product` avec stats.
5. `Trusted by`, ruban de logos en scroll horizontal infini.
6. Bannière Suisse/Chasseral.
7. CTA final sur dessin technique bas.
8. Footer minimal: logo, adresse, copyright.

## Rythme Et Marges

- Les contenus principaux sont centrés dans un conteneur `wide` de 1160px maximum avec des gutters latéraux généreux.
- La page doit se lire plus petite et plus premium sans être compactée: réduire les grandes typographies, cartes et assets, puis préserver ou augmenter l'espacement vertical entre sections.
- Ne pas utiliser de `transform: scale()` global pour réduire l'interface; ajuster les tokens de layout, les tailles de composants et les paddings section par section.
- Les sections peuvent rendre la page plus longue verticalement si cela améliore la respiration et la hiérarchie.
- Éviter les traits de séparation horizontaux entre sections; conserver uniquement le trait final du footer.

## Navbar

La navbar est fixed en haut, hauteur 80px desktop, largeur maximale 1180px, glass liquide transparent, rayon 50 en bas et sans ombre portée. L'effet doit rester visible: blur élevé, saturation forte, reflets internes blancs et vraie réfraction des éléments qui passent dessous.

Règles:

- Le logo est l'image réelle haute définition `public/assets/logo_DOMTEKNIKA_2023-alpha.png`.
- Les items sont centrés: Home, Projects, Expertise, Patent, Our Story.
- `Patent` et `Our Story` restent désactivés tant que les pages ne sont pas créées.
- Le CTA pointe vers l'ancre `#contact`.
- Le rendu ne change pas au scroll.
- Le liquid glass de la navbar est rendu avec `liquid-glass-react`, chargé en client-only dans `Navbar` pour éviter les accès navigateur pendant le rendu serveur.
- Sur la navbar desktop, le `cornerRadius` interne de `liquid-glass-react` reste à `0`; le rayon vient uniquement du conteneur `rounded-b-[50px]`, pour éviter tout congé sur les coins supérieurs.
- Le glass de la navbar reste neutre, clair et translucide: aucun halo rouge ou bleu sur les bords (`aberrationIntensity={0}`), pas de voile gris opaque, seulement une réfraction SVG visible, des reflets blancs fins et une rim claire, sans ombre portée.
- L'indicateur rouge des liens de navigation est un élément animé réel. Il reste sous `Home` au repos et circule vers le lien survolé ou focusé.
- Le switch langue est un bouton glass plus visible que le fond navbar, avec un dropdown FR/EN en overlay afin de ne pas être coupé par le masque de la navbar.

## Hero

- `technical-drawing-top.png` doit rester plus petit que le hero et aligné vers la droite; ne pas utiliser `object-cover` plein écran sur desktop.
- Les flèches rouges restent visibles et légèrement plus grandes que la première passe, autour de 126px sur desktop.
- Le dessin technique sert de contexte discret: il ne doit pas dominer le titre.
- Dans le paragraphe d'introduction, `DOMTEKNIKA` est souligné en rouge. Les autres strong restent en gras sans soulignement.

## Expertise Et Logos

- Le triptyque expertise utilise un conteneur plus large que le `wide` standard (`max-w-[1560px]`) et un vrai espacement entre les cartes (`gap` desktop autour de 24px). Éviter les chevauchements latéraux: la carte rouge `The process` reste au premier plan par sa shadow noire et son `z-index`, pas en mordant sur les cartes blanches.
- La carte `The product` est la plus longue horizontalement afin que son texte respire et wrap le moins possible. Rééquilibrer les ratios de colonnes avant de réduire la typographie.
- Les cartes expertise reprennent le hover des cartes de la page Expertise: shadow douce en `duration-300` et ligne d'accent qui s'allonge réellement (`width`) au hover, sans scale, grossissement ni déplacement global de la carte.
- Le schéma vectoriel `schema-process.svg` dans la carte rouge ne contient que le tracé et les pictogrammes. Ses libellés restent du vrai texte HTML en 42dot Sans DOMTEKNIKA afin de conserver exactement la typographie du site. Le schéma doit être généreux et lisible, avec une carte au ratio 1.75:1 dès le breakpoint `md` et environ 24px de respiration minimum entre la barre séparatrice et le diagramme.
- Dans `The product`, les stats sont compactes et peuvent rester en 3 colonnes desktop, mais le drapeau suisse ne doit pas être positionné en absolu au-dessus du texte. Utiliser un petit layout flex pour garder `100%` et le drapeau séparés sans chevauchement.
- Les logos `Trusted by` doivent être lisibles dans le marquee, pas réduits à des pictogrammes. Le bandeau gris reste compact, avec des logos visuellement plus grands et rapprochés sans chevauchement. Le défilement ne s'arrête pas au hover et les bords gauche/droite utilisent un fondu flouté modéré avec `mask-image`, afin que le blur disparaisse progressivement sans bord visible ni apparition trop précoce.
- Le bloc `The idea` reste discret mais doit avoir un contour gris clair pour équilibrer les trois colonnes de la section expertise.
- Le bouton CTA final utilise une shadow noire, pas une shadow rouge.
- Les projets utilisent le carousel shadcn/Embla avec `loop`, slides dupliquées et Autoplay Embla. Le rendu doit se lire comme un carousel infini, pas comme une rangée statique.
- Les cartes projets gardent un gutter visible entre elles; éviter l'effet de grille serrée.
- Le rail projets peut dépasser légèrement le conteneur de contenu: la largeur ajoutée sert de zone de fondu/flou progressif sur les bords afin que les cartes entrent et sortent sans apparition brusque.
- Les boutons rouges principaux (`Contact Us`, `Start your project`) utilisent une ombre noire douce, aucun contour blanc visible, et gardent seulement un focus ring rouge accessible.

## Bannière Suisse

Image: `public/assets/alps-background.png`.

Effets obligatoires:

- Rectangle de blur de gauche à 2/3 de l'image.
- `backdrop-filter: blur(14px)`.
- Masque linéaire pour que le blur disparaisse vers la droite.
- Gradient par-dessus: `rgba(0,70,145,0.49) 0%` vers `rgba(0,39,61,0) 100%`.

Le texte et les icônes restent dans la zone gauche lisible. La partie droite de la photo doit rester nette.
Le contenu de la bannière est plus proche du bord gauche que les autres sections afin de renforcer l'effet drapeau/label suisse.

## Assets

Assets principaux dans `public/assets`:

- `logo_DOMTEKNIKA_2023-alpha.png`
- `technical-drawing-top.png`
- `technical-drawing-bottom.png`
- `product-1.png` à `product-4.png`
- `schema-process.svg` (asset vectoriel actif)
- `schema-process.png` (source raster historique)
- `expertise-value-agile.svg` (icône vectorielle active pour « Agilité & réactivité »)
- `expertise-value-agile.png` (source Figma raster historique)
- `logo-aventor.png`, `logo-logitech.png`, `logo-nestle.png`, `logo-nespresso.png`, `logo-softcar.png`, `logo-total.png`, `logo-stagvelo.png`, `logo-gin.png`
- `alps-background.png`
- `flag-switzerland.webp`
- `swiss-quality.png`, `end-to-end.png`, `agile.png`, `confidential.png`

Utiliser `next/image` pour tous les visuels bitmap.
Pour `technical-drawing-bottom.png`, conserver l'asset original via `unoptimized` et `quality={100}` afin d'éviter une sensation de compression ou de flou sur le line-art.

## Motion

Motion acceptée:

- Entrées douces sur hero et CTA final: opacity + translateY uniquement.
- Hover léger sur boutons et cartes projets.
- Un seul marquee sur la page: la section `Trusted by`.
- Smooth scrolling via Lenis.

Accessibilité:

- `prefers-reduced-motion` désactive les animations longues.
- `prefers-reduced-transparency` désactive le glass.

## Réutilisation

Composants de base:

- `Navbar`
- `Footer`
- `Container`
- `Logo`
- `LanguageSwitcher`
- `TrustedBy`
- `SwissBannerSection`
- `CtaSection`

Ne pas créer de nouvelles sections marketing génériques sans une page Figma ou une demande explicite.
