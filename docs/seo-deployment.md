# Publication et mise à jour du site

## Sur le serveur Infomaniak

Depuis le dossier du site (celui qui contient `package.json`), sur la branche `main` :

```sh
git pull --ff-only origin main &&
npm ci --include=dev --include=optional &&
npm run build
```

Les `&&` interrompent la séquence en cas d'erreur. `npm ci` réinstalle exactement les versions de `package-lock.json`, y compris les outils nécessaires au build et les binaires natifs Sharp/SWC adaptés au serveur. Cette étape est nécessaire quand les dépendances changent ; un build seul ne les met pas à jour. Garder les fichiers d'environnement du serveur ; ne pas transférer les `node_modules` du Mac.

Redémarrer ensuite l'application avec le mécanisme déjà configuré sur cet hébergement. Si le site utilise l'offre Node.js du Manager Infomaniak, utiliser **Redémarrer** dans le tableau de bord et conserver `npm start` comme commande de lancement ainsi que le port existant. Si un gestionnaire comme PM2 est utilisé, redémarrer seulement le processus du site avec son nom réel. Le nom du processus et le gestionnaire de cette installation ne sont pas documentés dans le dépôt.

Le push Git ne déploie pas automatiquement cette installation. La version publiée n'est corrigée qu'après installation, build et redémarrage réussis. Pour une mise à jour manuelle dans le dossier actif, prévoir une courte interruption : `npm ci` remplace les modules et le build remplace `.next`. Utiliser la construction du Manager si disponible, ou arrêter l'application avant de modifier son dossier actif, puis la relancer une fois la construction terminée.

Documentation officielle : [configuration et construction Node.js Infomaniak](https://www.infomaniak.com/fr/support/faq/2535/modifier-la-configuration-dun-site-nodejs-infomaniak).

### Mise à jour de sécurité du 22 octobre 2026

- Next.js et eslint-config-next : `16.4.2`.
- Sharp : `0.35.5` ; binaires précompilés avec librsvg corrigé.
- source-map-js : `1.2.2`, via le verrou des dépendances.
- Node.js minimal demandé par ces paquets : `20.9.0`, inchangé ; utiliser une version LTS encore maintenue. Vérifier que le terminal de build et l'application emploient la même version de Node.

Vérifications après installation, depuis le même environnement Node que l'application :

```sh
node --version
npm ls next sharp source-map-js
node -p 'JSON.stringify(require("sharp").versions)'
npm audit --omit=dev
```

Avec les binaires Sharp précompilés, la version `rsvg` doit inclure le correctif `2.63.2` ou ultérieur. Si Sharp utilise une bibliothèque système différente, vérifier aussi sa version côté hébergeur. Le dépôt n'établit pas la version Linux/libc de l'hôte. Les correctifs amont sont documentés dans [l'avis Next.js](https://github.com/advisories/GHSA-2464-fhr4-w9xw) et [l'avis Sharp](https://github.com/advisories/GHSA-wq5f-xc86-pv6w).

Avant publication, `npm test` exécute les tests du formulaire et du consentement Analytics avec transport email simulé. `npm run build` inclut les contrôles TypeScript et de contenu.

## Vérifier la version publique

- L’accueil français a pour titre Google « Ingénierie et prototypage en Suisse | DOMTEKNIKA ». Le titre de partage reste « DOMTEKNIKA — Shape your dream ».
- `/projets` mène à `/fr/projects`, `/brevets` à `/fr/patents`, et les anciennes adresses de prestations à leurs équivalents. Les variantes anglaises gardent l’anglais.
- `www.domteknika.ch` redirige vers `domteknika.ch`.
- Les fichiers image et PDF répondent avec `X-Robots-Tag: noindex`, y compris `/_next/image` et `/social-image`. Les pages HTML restent indexables.
- Le sitemap contient uniquement les 630 pages utiles, réparties dans les sept langues.
- Sur téléphone, vérifier le menu, le bouton Contact, les six cartes Expertise et la FAQ avec recherche. La FAQ affiche jusqu'à sept questions par page.

Quelques réponses HTTP à contrôler :

```sh
curl -sSI https://domteknika.ch/projets
curl -sSI https://domteknika.ch/assets/contact-bubble-button-mask.png
curl -sSI https://domteknika.ch/social-image
curl -sSI https://www.domteknika.ch/fr
```

## Search Console et demandes de contact

Dans la propriété `https://domteknika.ch/`, envoyer `sitemap.xml` dans **Sitemaps**. Le sitemap est déjà déclaré dans `robots.txt` ; l’envoi permet de suivre sa lecture. Aucun sitemap d’images n’est ajouté.

Après déploiement, refaire une mesure PageSpeed mobile et ordinateur et noter la date de publication. Les mesures locales ne constituent pas un nouveau score du site public.

L’événement Analytics `generate_lead` est envoyé uniquement après succès du formulaire, avec consentement valide. Vérifier sa réception et son éventuelle définition comme événement clé dans Analytics. Aucun nom, email, téléphone ni message n’est envoyé dans cet événement.

Comparer ensuite deux périodes de 28 jours dans Search Console : clics et impressions des prestations, recherches sans le nom DOMTEKNIKA et pays ciblés. Confronter ces chiffres aux demandes réellement reçues.

## Fiche Google Maps

La fiche existante « Domteknika S.A. » a été retrouvée à la même adresse que le site. Lors de la vérification publique du 7 octobre 2026, elle affiche le numéro `+41 32 751 71 41` et le lien `http://www.domteknika.ch/`. Le site utilise `+41 32 751 71 46` et `https://domteknika.ch/`.

Le bon téléphone doit être confirmé par DOMTEKNIKA avant modification. Mettre ensuite à jour la fiche existante depuis son compte gestionnaire : téléphone confirmé, URL HTTPS, services réellement proposés et horaires validés. Aucune nouvelle fiche, aucun horaire et aucun avis ne sont créés dans cette mise à jour.
