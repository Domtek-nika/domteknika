# Publication des optimisations SEO

## Sur le serveur Infomaniak

Depuis le dossier du site, sur la branche `main` :

```sh
git pull --ff-only origin main
npm run build
```

Redémarrer ensuite l’application avec la procédure Infomaniak habituelle. Le push Git ne déploie pas automatiquement cette installation. Les fichiers `package.json` et le verrou de dépendances ne changent pas dans cette mise à jour.

## Vérifier la version publique

- L’accueil français a pour titre Google « Ingénierie et prototypage en Suisse | DOMTEKNIKA ». Le titre de partage reste « DOMTEKNIKA — Shape your dream ».
- `/projets` mène à `/fr/projects`, `/brevets` à `/fr/patents`, et les anciennes adresses de prestations à leurs équivalents. Les variantes anglaises gardent l’anglais.
- `www.domteknika.ch` redirige vers `domteknika.ch`.
- Les fichiers image et PDF répondent avec `X-Robots-Tag: noindex`, y compris `/_next/image` et `/social-image`. Les pages HTML restent indexables.
- Le sitemap contient uniquement les 630 pages utiles, réparties dans les sept langues.
- Sur téléphone, vérifier le menu, le bouton Contact, les six cartes Expertise et la FAQ avec recherche. La FAQ garde six questions affichées par page.

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
