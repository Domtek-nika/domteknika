# Vérification du site publié, de Google et des remarques d’Étienne

Contrôle du 22 octobre 2026. Domaine public : https://domteknika.ch. La version GitHub au début du contrôle est `620c662` ; le site Infomaniak n’a pas encore reçu les dernières mises à jour. Le contrôle précédent portait sur 23 pages. Celui-ci couvre les 630 URL du sitemap public.

## Résultat technique du contrôle public

| Contrôle | Résultat observé |
| --- | --- |
| URL du sitemap | 630 URL distinctes, toutes en HTTP 200, sans redirection sur ces URL canoniques. |
| Indexabilité des pages | Aucune interdiction `noindex` ou `robots.txt` sur ces 630 pages. `noimageindex` protège les images, conformément au choix du site ; ce n’est pas une exclusion des pages Web. |
| URL canoniques | Les 630 pages déclarent leur propre URL canonique. |
| Langues | Sept variantes et `x-default` ; correspondance avec le sitemap et réciprocité contrôlées, sans anomalie. `zh-Hans` est la déclaration correcte de la version chinoise simplifiée. |
| Titres et H1 | Un titre et un H1 par page. Aucun doublon de titre entre pages différentes dans une même langue. Les noms de marque identiques entre langues sont attendus. |
| Données structurées | JSON-LD présent et syntaxiquement lisible. Ce contrôle ne prouve pas l’éligibilité à tous les résultats enrichis. |
| Anciennes références de brevets | Échantillon de 24 alias français : 24 redirections permanentes HTTP 308 vers des pages canoniques déjà contrôlées en 200. Les milliers de liens d’alias hors sitemap ne sont donc pas, en eux-mêmes, des pages manquantes. Les autres alias n’ont pas tous été demandés. |
| Domaine | HTTP et www aboutissent à HTTPS sans www. La barre oblique finale de `/fr/` est normalisée. |
| Page inexistante | L’URL d’essai renvoie HTTP 404. |
| Descriptions | **84 descriptions manquantes**, correspondant à 12 brevets dans les sept langues. Correction ajoutée pendant cet audit. |

Ces contrôles établissent l’accessibilité et les signaux techniques envoyés à Google. Ils ne prouvent pas que les 630 pages sont indexées. Un sitemap facilite leur découverte, sans garantir leur indexation ni leur classement. [Documentation Google](https://developers.google.com/search/help/crawling-index-faq).

## Google et Chrome

La recherche de marque « domteknika » a été ouverte dans le véritable Chrome de l’utilisateur. L’accueil, des liens vers plusieurs expertises et des fiches projet apparaissent dans les résultats. Le site est donc déjà découvert par Google. La session étant connectée et personnalisée, son ordre de résultats ne constitue pas une mesure de positionnement indépendante.

Le favicon est encore remplacé par un globe dans le résultat observé. Les fichiers publics du favicon et de l’ancien logo reçoivent toujours `X-Robots-Tag: noindex`. Le correctif `620c662`, déjà validé, attend le déploiement. Ce constat ne permet pas d’attribuer avec certitude le choix du globe à une seule cause. Après déploiement, Google doit retraiter les fichiers ; l’affichage reste à sa discrétion. [Consignes favicon](https://developers.google.com/search/docs/appearance/favicon-in-search).

Autre incohérence concrète : la fiche Google publique indique **+41 32 751 71 41**, tandis que le site et ses données structurées indiquent **+41 32 751 71 46**. Il faut confirmer le numéro voulu et harmoniser la fiche. Elle affiche aussi un seul avis et propose l’ajout des horaires. Aucun changement n’a été soumis à Google Business Profile pendant ce contrôle. [Conseils officiels pour la fiche locale](https://support.google.com/business/answer/7091).

Le sélecteur de propriétés du compte Search Console accessible dans Chrome ne contient pas DOMTEKNIKA. Il n’a donc pas été possible de consulter ses rapports Pages, Sitemaps, Actions manuelles, impressions, clics ou requêtes. Aucune conclusion sur une pénalité ou sur le nombre exact de pages indexées n’est tirée.

## Mesure PageSpeed indépendante

Mesure de l’accueil français public, réalisée dans PageSpeed Insights. [Rapport mobile](https://pagespeed.web.dev/analysis/https-domteknika-ch-fr/p7ane8e9jg?form_factor=mobile) et [rapport ordinateur](https://pagespeed.web.dev/analysis/https-domteknika-ch-fr/p7ane8e9jg?form_factor=desktop).

| Mesure | Mobile, 4G lente simulée | Ordinateur |
| --- | --- | --- |
| Performances | 78 / 100 | 95 / 100 |
| Accessibilité automatisée | 100 / 100 | 100 / 100 |
| Bonnes pratiques automatisées | 100 / 100 | 100 / 100 |
| SEO de base | 100 / 100 | 100 / 100 |
| Premier contenu, FCP | 1,8 s | 0,4 s |
| Élément principal, LCP | 4,9 s | 1,0 s |
| Blocage total, TBT | 20 ms | 90 ms |
| Décalages, CLS arrondi | 0 | 0 |

Il s’agit d’un test de laboratoire unique, variable selon les conditions, sur la version actuellement publiée. Aucune donnée terrain CrUX n’est disponible dans ce rapport. Le score SEO de 100 ne mesure ni le classement ni le trafic et ne couvre pas tous les défauts de métadonnées : les 84 descriptions manquantes ont été trouvées sur d’autres pages.

Le dessin de fond `technical-drawing-top-2x.webp` est l’élément LCP détecté sur mobile. PageSpeed signale également les ressources CSS qui bloquent le rendu et des possibilités de mieux dimensionner certaines images. Les dimensions doivent être confrontées à la densité de pixels des téléphones avant toute réduction : l’objectif est de conserver la qualité approuvée. Aucun changement de qualité d’image ni d’animation n’est effectué dans cet audit.

## Étienne : comparaison entre le site public et la version à déployer

Source : `/Users/mathis/Downloads/Remarques Etienne.pptx`, 29 diapositives. Relecture des rendus et de leur texte/OCR ; les diapositives 25 à 29 répètent le point POC. Le suivi détaillé, diapositive par diapositive, figure dans [la relecture existante](etienne-review-2026-10-22.md).

| Page / remarque | Encore en ligne | Version vérifiée à déployer |
| --- | --- | --- |
| Créativité | Introduction générique, anciens livrables et FAQ. | Croquis, critères, tableau de notation ; POC expliqué comme test ciblé, compléments SWOT/calculs selon le besoin. |
| Design produit | Mise en avant des tolérances élémentaires. | Cycle de vie de la pièce : production, usage, entretien, démontage/recyclage ; plans 2D tolérancés et nomenclature ; prise en charge dès la page blanche. |
| Simulation | « Zone rouge » et exemple PEEK. | Efforts d’assemblage et d’usage, non-linéaire/grandes déformations, réduction des itérations avec validation réelle ; cas sécurité de kitesurf. |
| Prototypage | Exemple Aventor et ancienne approche. | Validation du principe, fonctionnement, ergonomie et durée de vie ; cas ZipFix ; question impression 3D/usinage retirée. |
| Polymères | Contenu globalement approuvé par Étienne. | Contenu conservé. |
| Électronique | Intégration électrique/électronique dans le produit. | Périmètre conservé ; le développement électronique complet reste à trancher en interne, comme demandé diapositive 24. |
| Six pages | Vignettes « Autres réalisations liées à cette expertise » encore présentes. | Bloc supprimé ; un cas développé par expertise. |
| Ordre et FAQ | Ancienne version. | Simulation avant Prototypage ; FAQ générale alimentée par les mêmes questions corrigées que les sous-pages. |

Les six pages françaises publiques ont été ouvertes dans Chrome. Les **42 pages produites par le build** ont ensuite été contrôlées : introduction, titre du point technique, cas, approche, livrables et questions correspondent aux fichiers de contenu corrigés. Cela confirme leur présence dans la version prête à déployer, pas leur publication actuelle.

La remarque générale d’Étienne sur le caractère différenciant du contenu reste un travail éditorial continu : des résultats chiffrés et des contraintes propres à chaque projet peuvent encore enrichir les pages, à condition d’être documentés. Son message ne fournit pas à lui seul ces nouveaux chiffres ou preuves.

## Correction supplémentaire réalisée

Les sources de 12 brevets ne fournissent pas de résumé. Leur champ vide était repris tel quel dans les métadonnées. Un texte de remplacement dans les sept langues décrit désormais la fiche à partir du **titre, du numéro de publication et des documents disponibles**. Les résumés existants sont conservés. Aucun résumé technique, statut juridique ou résultat commercial n’est inventé.

Le même texte alimente la meta description, Open Graph, Twitter et la description JSON-LD. Validation : ESLint et diff propres ; build de production réussi avec 778 pages ; **336 pages de brevets contrôlées, 336 descriptions présentes et cohérentes entre ces quatre emplacements**. Google peut choisir un autre extrait suivant la recherche. [Documentation sur les descriptions](https://developers.google.com/search/docs/appearance/snippet).

Brevets concernés, dans les sept langues : EP1744653A1, EP2129582A1, EP3185821A1, EP3215454A1, EP3261867A2, EP3393889A1, EP3399891A1, EP3399892A1, EP4680511A1, EP4705115A1, USD560092S et USD568097S.

Point éditorial mineur également repéré : le résumé d’EP4488027A1 est en français sur la page anglaise, car il reprend la source disponible. Ce contenu visible n’a pas été traduit pendant cet audit technique.

## Priorités pour obtenir davantage de visites qualifiées

1. **Déployer les corrections déjà préparées**, puis vérifier sur le domaine les icônes, descriptions et nouvelles expertises. Un push GitHub ne met pas Infomaniak à jour.
2. **Accéder à la propriété DOMTEKNIKA dans Search Console**, vérifier l’indexation et le sitemap, puis analyser les clics et impressions par page, requête, pays et langue sur plusieurs mois. Cela permettra de distinguer manque d’exposition, positions basses et faible taux de clic.
3. **Harmoniser le téléphone de la fiche Google**, compléter ses informations exactes et entretenir des avis authentiques. Ne pas publier des horaires ou coordonnées supposés.
4. **Améliorer le chargement mobile mesuré**, en ciblant le dessin initial et le CSS ; comparer avant/après après déploiement sans dégrader le rendu.
5. **Renforcer les six pages commerciales et leurs cas réels**, avec les problèmes clients, livrables et résultats documentés propres à DOMTEKNIKA. Donner priorité à ces pages pour les demandes entrantes, plutôt qu’à l’augmentation du seul nombre de fiches brevet.
6. **Mesurer les demandes reçues et leur origine**. L’événement de contact existe dans le code ; la réception effective dans GA4 et le taux de consentement n’ont pas été contrôlés ici.

L’absence de favicon constitue un défaut de présentation, mais les observations ne permettent pas d’en faire la cause principale du faible trafic. Sans Search Console et statistiques de conversion, attribuer ce manque de visites à une cause unique serait spéculatif.
