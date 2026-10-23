# Remarques d’Étienne V2 — 23 octobre 2026

## Référence et méthode

« Remarques Etienne V2.pptx » est désormais l’unique référence pour cette relecture. Les 24 diapositives ont été rendues en images et examinées avec leurs captures et annotations. La dernière diapositive a aussi été vérifiée en grand et par OCR. Le fichier de présentation précédent n’était plus présent dans Téléchargements. Le compte rendu du 22 octobre reste conservé uniquement comme historique.

## Décision confirmée : développement électronique

La diapositive 24 confirme que DOMTEKNIKA développe l’électronique des produits et prototypes qu’elle conçoit, du montage simple en boîtier aux cartes compactes sur circuit imprimé (PCB). La page ne doit donc plus se limiter à l’intégration mécanique de composants électroniques.

Application dans les sept langues (français, anglais, allemand, espagnol, coréen, chinois, japonais) :

- Libellé visible : « Développement électronique » et équivalents localisés.
- Réécriture de toute la prestation : introduction, besoins, approche, étapes, livrables, vérifications, tableau technique et appel au contact.
- Réécriture des sept questions électroniques, reprises automatiquement dans la FAQ générale : développement propre, choix d’un premier montage, besoin de PCB, compacité, collaboration avec une équipe existante, informations de départ et validation. La dernière réponse distingue le prototype de sa préparation à la série.
- Harmonisation de la carte Expertise, de la présentation sur l’accueil et des métadonnées de la page Expertise. Les titres et descriptions SEO des pages de prestation utilisent les nouvelles données.
- Conservation du cas documenté de l’horloge à fond transparent, avec un récit centré sur son développement électrique et mécanique. Aucune carte PCB particulière n’est attribuée à ce projet sans preuve.
- Conservation de l’URL `electronics-integration` et des liens existants.

Le périmètre annoncé reste celui confirmé dans la V2. Aucune compétence supplémentaire de logiciel embarqué, radio, certification ou production en série n’a été ajoutée par déduction.

## Contrôle diapositive par diapositive

| Diapositive | Observation | État après relecture V2 |
| --- | --- | --- |
| 1 | Titre des remarques générales. | Pas de modification de contenu demandée. |
| 2 | Mettre en avant les compétences et livrables réels. | Les six pages présentent des livrables concrets et un seul cas documenté ; la page électronique est réécrite selon le périmètre confirmé. |
| 3 | Titre Créativité. | Pas de modification de contenu demandée. |
| 4 | Introduction trop générique. | « Des croquis aux concepts à vérifier » déjà présent. |
| 5 | Retirer les petites vignettes supplémentaires sur toutes les pages. | Bloc déjà retiré des six pages ; un seul cas développé par prestation. |
| 6 | Définir des critères de comparaison des idées. | Présents dans l’approche, les étapes, le tableau et la FAQ Créativité. |
| 7 | Croquis à la main, tableau de notation et compléments selon besoin. | Livrables déjà présents ; SWOT, POC et premiers calculs ne sont pas présentés comme systématiques. |
| 8 | Expliquer POC et prototype partiel. | Définition et critères de réussite présents dans la FAQ partagée. |
| 9 | Titre Design produit. | Pas de modification de contenu demandée. |
| 10 | Contraintes sur toute la vie de la pièce. | Production, assemblage, utilisation, entretien et fin de vie présents. |
| 11 | Dossier technique : plans 2D tolérancés et nomenclature. | Présents dans les livrables Design produit. |
| 12 | Intervenir du stade de l’idée au produit existant. | Première question de la FAQ Design produit déjà adaptée. |
| 13 | Titre Prototypage. | Pas de modification de contenu demandée. |
| 14 | Structurer autour des fonctions à valider. | « Que doit valider votre prototype ? » et tableau de validation déjà présents. |
| 15 | Choisir un exemple plus adapté, notamment ZipFix. | ZipFix est déjà le cas mis en avant, avec son image, son lien et ses faits documentés. |
| 16 | Retirer la question élémentaire impression 3D / usinage. | Déjà retirée des sept langues. |
| 17 | Titre Simulation. | Pas de modification de contenu demandée. |
| 18 | Simulation avant prototypage. | Ordre déjà correct dans les six expertises et la FAQ ; ordre également corrigé dans la présentation sur l’accueil lors de cette V2. |
| 19 | Dimensionnement en assemblage et usage, calculs non linéaires, grandes déformations. | Déjà présents ; explication générique de la zone rouge retirée. Le cas reste la sécurité de kitesurf, conformément à la demande de Mathis d’éviter le PEEK. |
| 20 | Réduire les prototypes fragiles et les itérations, confronter aux essais. | Déjà présent dans la FAQ Simulation partagée. |
| 21 | Titre Polymères et injection. | Pas de modification de contenu demandée. |
| 22 | Page cohérente, sans autre remarque. | Contenu conservé. |
| 23 | Titre Électronique. | Le libellé est harmonisé avec la décision suivante. |
| 24 | Développer l’électronique des prototypes, du boîtier aux PCB compacts. | Réécriture complète décrite ci-dessus, dans les sept langues et les textes associés. |

## Vérifications

- Comparaison structurée des JSON avec la version précédente : seules les données de la prestation électronique et les quatre textes associés changent dans chaque langue. Les cinq autres prestations restent identiques.
- TypeScript, audit de contenu, ESLint ciblé et contrôle des différences : réussis.
- Build de production dans une copie isolée : réussi, 778 routes statiques générées. Aucune dépendance ajoutée ou mise à jour.
- Chargement HTTP des pages Électronique, Expertise et Accueil dans les sept langues : 21 réponses 200. Titres, descriptions, sept questions/réponses, présentation d’accueil et URL canonique vérifiés.
- Contrôle dans Chrome du rendu sur ordinateur et sur téléphone de 390 px. Titre français et titre allemand lisibles sans débordement horizontal ; ouverture d’une réponse et filtre électronique de la FAQ générale vérifiés.

Ces vérifications portent sur le build local. La publication chez Infomaniak reste une opération distincte du push GitHub.
