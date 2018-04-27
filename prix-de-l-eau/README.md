# Prix de l'eau en France

À partir des sources de données disponibles, l'application propose une carte indiquant les prix et le mode de gestion pour les 40 plus grandes villes de France.

https://umap.openstreetmap.fr/fr/map/prix-de-l-eau_214128

## Pour démarrer

L'installation en local permet de changer les données et de générer un fichier exploitable par [umap](http://umap.openstreetmap.fr) - merci [https://github.com/yohanboniface](yohanboniface).

### Prerequis

Vous devriez avoir une version de node >= v7 installée.

Et aussi, une version de Git. 

### Installation

Vous pouvez commencer par cloner le dépôt qui au passage contient d'autres petits projets liées aux data.

Dans un terminal, ou avec [github desktop](https://desktop.github.com/)

```
$ git clone git@github.com:pointbar/sds.git
$ cd sds/prix-de-l-eau
```

C'est le bon moment pour installer les dépendances :

```
$ npm install
```

Et, maintenant vous pouvez en lançant :

```
$ node something.js
```

Le script parcourt le fichier *cities-water-prices.csv* et génère le fichier *umap.geojson*.

Ce fichier est exploitable par *umap*, il représente les données géolocalisés et prends en charge la mise en forme des marqueurs.

## Réalisé avec

* [papaparse](https://www.papaparse.com) - Convertit les fichiers sources de csv => json
* [geojson](https://github.com/caseycesari/geojson.js) - Convertit les fichiers json en geojson


## Auteur·e·s

- [Sabine Safi](https://github.com/sabinesafi) & [Stéphane Langlois](https://github.com/pointbar)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

Ce projet est sous licence MIT - [LICENSE.md](LICENSE.md)

## Source des données

http://www.services.eaufrance.fr/donnees/recherche
