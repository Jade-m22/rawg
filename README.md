# The Hyper Program

**The Hyper Program** est une application web permettant de rechercher, de visualiser et de découvrir des jeux vidéo, avec des informations détaillées telles que les studios de développement, les genres, les plateformes, et plus encore. Cette application utilise l'API [RAWG](https://rawg.io/apidocs) pour récupérer des informations sur les jeux vidéo.

---

## Fonctionnalités

* **Page d'accueil** : Affiche une liste de jeux vidéo avec une possibilité de filtrer par plateforme.
* **Page de détails** : Permet de consulter les détails d'un jeu, y compris les captures d'écran, la vidéo de gameplay, les informations sur les développeurs, et les plateformes.
* **Recherche** : Fonction de recherche permettant de trouver des jeux.
* **Jeux similaires** : Affiche des jeux similaires en fonction des genres et des éditeurs du jeu sélectionné.

---

## Prérequis

Avant de commencer, assurez-vous d'avoir installé [Node.js](https://nodejs.org/), ainsi que [npm](https://www.npmjs.com/), le gestionnaire de paquets pour JavaScript.

---

## Installation

1. **Clonez ce repository** :

   ```bash
   git clone https://votre-repository-url.git
   ```

2. **Installez les dépendances** :
   Rendez-vous dans le dossier de votre projet et exécutez la commande suivante pour installer les dépendances nécessaires :

   ```bash
   cd votre-dossier
   npm install
   ```

3. **Ajoutez votre clé API RAWG** :
   Pour que l'application fonctionne correctement, vous devez obtenir une clé API depuis [RAWG API](https://rawg.io/apidocs). Une fois que vous avez la clé API, ajoutez-la à votre environnement sous forme de variable `RAWG_API_KEY`.

   Si vous utilisez un fichier `.env`, créez un fichier à la racine du projet et ajoutez la ligne suivante :

   ```bash
   RAWG_API_KEY=your-api-key
   ```

4. **Lancez le serveur de développement** :
   Après avoir installé les dépendances et configuré votre clé API, lancez l'application en mode développement :

   ```bash
   npm start
   ```

   Vous pourrez accéder à l'application via [http://localhost:3000](http://localhost:3000).

---

## Technologies utilisées

* **HTML5** : Structure de base de l'application
* **CSS3/SCSS** : Mise en forme de l'application
* **JavaScript (ES6+)** : Logiciel dynamique, gestion de la logique de l'application
* **API RAWG** : Source des données sur les jeux vidéo
* **Node.js** : Environnement d'exécution JavaScript côté serveur pour le développement
* **npm** : Gestionnaire de dépendances

---

## Contribuer

Si vous souhaitez contribuer au projet, voici les étapes à suivre :

1. **Forkez** le projet.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalite`).
3. Commitez vos changements (`git commit -am 'Ajout de ma fonctionnalité'`).
4. Poussez votre branche (`git push origin feature/ma-fonctionnalite`).
5. Ouvrez une Pull Request pour la fusion dans la branche `main`.

---

## Auteurs

* **\[Votre Nom]** - Développeur principal

---

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## Remerciements

* Merci à [RAWG API](https://rawg.io/apidocs) pour la fourniture des données de jeux vidéo.

---
