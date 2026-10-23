# Relecture des remarques d’Étienne — 22 octobre 2026

> Compte rendu historique, remplacé comme référence par [la relecture de la V2 du 23 octobre 2026](etienne-review-v2-2026-10-23.md). La décision électronique laissée en suspens ci-dessous a été confirmée dans la V2 et appliquée.

Source : « Remarques Etienne.pptx », 29 diapositives. Toutes les diapositives ont été rendues en images. Les captures annotées ont été examinées en grand et leur texte vérifié par OCR, en complément de l’extraction des zones de texte du PowerPoint.

La comparaison porte sur les six pages de prestation et leur FAQ partagée. Les remarques déjà intégrées ont été vérifiées dans le contenu actuel. Les modifications complémentaires ci-dessous s’appliquent aux sept langues.

| Diapositive | Remarque et cible observée | Prise en compte |
| --- | --- | --- |
| 1 | Titre des remarques générales. | Aucun changement demandé. |
| 2 | Trop de généralités, manque de compétences et de livrables propres à DOMTEKNIKA. | Les contenus actuels présentent les livrables concrets et un cas documenté par prestation. Les exemples Simulation et Prototypage ont été remplacés et les vignettes supplémentaires supprimées lors de cette relecture. |
| 3 | Titre Créativité. | Aucun changement demandé. |
| 4 | « Une bonne idée commence par une bonne question » jugé trop générique. | Déjà remplacé par « Des croquis aux concepts à vérifier », avec croquis, critères de comparaison et vérification ciblée. |
| 5 | Supprimer les petites vignettes de projets sous l’exemple, sur toutes les pages. | **Corrigé lors de cette relecture** : suppression du bloc « Autres réalisations liées à cette expertise » sur les six pages. Un seul cas développé reste visible par prestation. Les liens entre projets et compétences restent documentés dans les données. |
| 6 | Définir des critères pour évaluer les idées. | Déjà intégré dans l’approche, les étapes, le tableau de comparaison et la FAQ Créativité. |
| 7 | Livrables réels : idées dessinées à la main et tableau de notation. SWOT, POC, premiers calculs et recommandations selon le besoin. | Déjà intégré. Les compléments sont présentés comme des possibilités à convenir, pas comme des livrables systématiques. Aucun nouveau croquis client n’est inventé ou ajouté par cette relecture. |
| 8 | Employer et expliquer POC / prototype partiel pour vérifier une incertitude. | Déjà intégré dans la FAQ Créativité, reprise automatiquement dans la FAQ générale. La réponse définit POC et les critères de réussite du test. |
| 9 | Titre Design produit. | Aucun changement demandé. |
| 10 | Remplacer l’exposé élémentaire sur les tolérances par les contraintes de toute la vie de la pièce. | Déjà intégré : production et assemblage, utilisation et entretien, démontage et fin de vie. |
| 11 | Préciser le dossier technique : plans 2D tolérancés et nomenclature. | Déjà intégré aux livrables Design produit, avec adaptation au périmètre convenu. |
| 12 | Partir du stade réel du client, de la page blanche au produit existant. | Déjà intégré dans la première question de la FAQ Design produit. |
| 13 | Titre Prototypage. | Aucun changement demandé. |
| 14 | Structurer le prototypage autour de ce qu’on cherche à valider. | Déjà intégré : « Que doit valider votre prototype ? », principe, fonctionnement, usage, robustesse et durée de vie. |
| 15 | Exemple Aventor peu adapté ; envisager ZipFix pour montrer la progression du prototypage. | **Corrigé lors de cette relecture** : ZipFix remplace Aventor dans l’image, le lien et le récit. Le texte s’appuie sur les faits déjà documentés : concepts, prototypes fonctionnels, puis première série injectée. Il ne prétend pas connaître un nombre ou une chronologie détaillée de versions non documentés. |
| 16 | Retirer la question élémentaire « Comment choisir entre impression 3D et usinage ? ». | Déjà retirée des sept versions. Les questions actuelles portent sur la validation, les essais et l’évolution du prototype. |
| 17 | Titre Simulation. | Aucun changement demandé. |
| 18 | Présenter la simulation avant le prototypage. | Déjà intégré dans l’ordre partagé des six expertises, les cartes et les thèmes de FAQ. |
| 19 | Retirer l’explication de « zone rouge ». Mettre en avant le dimensionnement en assemblage et en usage, avec calculs non linéaires et grandes déformations. | Déjà intégré dans la description, l’approche et le tableau Simulation. La nouvelle illustration par la sécurité de kitesurf relie le calcul à une fonction mécanique identifiée. |
| 20 | Expliquer que le calcul évite des prototypes trop fragiles et réduit les itérations, tout en restant confronté à des essais réels. | Déjà intégré à la FAQ Simulation partagée avec la page Expertise. |
| 21 | Titre Polymères et injection. | Aucun changement demandé. |
| 22 | Page globalement cohérente, pas de remarque particulière. | Contenu conservé. Seules les vignettes supplémentaires sont retirées comme demandé en diapositive 5. |
| 23 | Titre Intégration électronique. | Aucun changement demandé. |
| 24 | Définir en interne le périmètre entre intégration et développement électronique complet. | **Décision interne encore nécessaire.** La remarque ne confirme pas un nouveau périmètre commercial. Aucun engagement de développement électronique complet ni nouvelle organisation d’équipe n’est annoncé à partir de cette seule remarque. |
| 25 à 29 | Répétition du même texte POC, sans autre capture ni cible distincte visible. | Traitée avec la remarque de la diapositive 8. Aucune nouvelle consigne n’a été déduite de ces répétitions. |

## Demande complémentaire de Mathis

L’exemple PEEK est retiré de la page Simulation, dans l’image, le lien et le texte. Il est remplacé par les sécurités de kitesurf et l’étude de leur effort de déclenchement. Les calculs mécaniques, rhéologiques et les prototypes sont documentés dans la fiche du projet existante. La fiche du porte-fraise en PEEK reste disponible dans le catalogue de projets.

## Fichiers concernés

- `src/app/[locale]/expertise/[slug]/page.tsx` : retrait du bloc de vignettes commun aux six prestations.
- `src/data/services.ts` : choix des deux nouveaux projets mis en avant.
- `src/data/services/{en,fr,de,es,ko,zh,ja}.json` : deux récits de cas et retrait du libellé inutilisé.

Les questions des pages de prestation alimentent la FAQ générale via `src/components/sections/expertise-faq.tsx`. Les corrections déjà présentes dans ces questions sont donc communes aux deux endroits.

## Vérifications effectuées

- TypeScript, audit de contenu et ESLint sur les fichiers de code modifiés : réussis.
- Build de production dans une copie isolée du projet : réussi, 776 routes statiques générées.
- Les 42 pages de prestation (six prestations dans sept langues) ont été chargées sur ce build : HTTP 200, un seul cas par page, image et liens cohérents avec le cas choisi, aucune vignette secondaire et aucune mention PEEK sur la page Simulation.
- Vérification visuelle en local des nouveaux exemples Simulation et Prototypage, sur ordinateur et téléphone. L’exemple ZipFix reste lisible sans débordement horizontal.

Ces vérifications portent sur le code local. La publication chez Infomaniak reste une opération distincte.
