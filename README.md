# geopointage-api

Ajouter l'extention de version devant les routes pour chaques call fait à l'api (ex: GET /v0/sites).

La version actuelle est la version v0.
Le port d'accès à l'api est 8081.
l'URL est http://geopointage.lespot-bouygues.com/

#### Routes pour le controller Sites (site de construction)

`GET /sites` (affichier les sites de constructions)
- Success Response: (code 200)
```
{
   "status": "success",
   "data": [... tableau de site ...]
}
```

`GET /sites/:siteId` (affichier un site de construction selon son Id) 
- URL parametre(s)
  - siteId: String **[required]**
- Success Response: (code 200)
```
{
   "status": "success",
   "data": {
    "_id": "58443935988d8c165e1cf94b",
    "address": "14 Boulevard Paul Vaillant Couturier 94200 Ivry-sur-Seine France ",
    "latitude": 48.8202056,
    "login": "id002",
    "longitude": 2.3952589,
    "comments": [...tableau des commentaires...]
  }
}
```

`POST /sites` (Créer un site de constuction)
- body parametre(s)
  - address: String **[required]**
  - login: String **[required]**  (login == iotp)
- Success Response: (code 201)
```
{
  "status": "success",
  "data": {
    "message": "Site created!"
  }
}
```

`DELETE /sites/:siteId` (supprimer un site de construction selon son Id) 
- URL parametre(s)
  - siteId: String **[required]**
- Success Response: (code 204)
```
{
  "status": "success",
  "data": {
    "message": {
       "Site deleted!"
    }
  }
}
```

#### Routes pour le controller Workers (compagnon)

`GET /workers` (afficher les compagnons)
- Success Response: (code 200)
```
{
   "status": "success",
   "data": [... tableau de compagnon ...]
}
```

`GET /workers/:workerId` (affichier un compagnon selon son Id) 
- URL parametre(s)
  - workerId: String **[required]**
- Success Response: (code 200)
```
{
  "status": "success",
  "data": {
    "registrationNumber": "121d5f4dfd7df54",
    "lastName": "Gonzales",
    "firstName": "Paulo",
    "_id": "5845bebb3eeee71cf56abf0c",
    "__v": 0
  }
}
```


`POST /worker` (Créer un compagnon)
- body parametre(s)
  - firstName: String **[required]**
  - lastName: String **[required]**
  - registrationNumber: String **[required]**
- Success Response: (code 201)
```
{
  "status": "success",
  "data": {
    "message": "Worker created!"
  }
}
```

`PUT /worker/:workerId` (Modifier un compagnon)
 - URL parametre(s)
   - workerId: String **[required]**
 - body parametre(s)
  - firstName: String **[required]**
  - lastName: String **[required]**
  - registrationNumber: String **[required]**
 - Success Response: (code 204)
```
{
   "status": "success",
   "data": "Worker updated!"
}
```

`DELETE /workers/:workerId` (supprimer un worker selon son Id) 
 - URL parametre(s)
   - workerId: String **[required]**
 - Success Response: (code 204)
```
{
   "status": "success",
   "data": "Worker deleted!"
}
```

#### Routes pour le controller Comments (coommentaires)
Un site de construction est associé à plusieurs commentaires.

`GET /sites/:siteId/comments` (afficher les commentaires d'un site de construction)
- Success Response: (code 200)
```
{
   "status": "success",
   "data": [... tableau de commentaires ...]
}
```

`GET /sites/:siteId/comments/:commentId` (affichier un commentaire selon son Id) 
- URL parametre(s)
  - siteId: String **[required]**
  - commentId: String **[required]**
- Success Response: (code 200)
```
{
   "status": "success",
   "data": {
  }
}
```

`POST /sites/siteId/comments` (Créer un commentaire)
- URL parametre(s)
  - siteId: String **[required]**
- body parametre(s)
  - body: String **[required]**
  - firstName: String **[required]**  (prénom auteur)
  - lastName: String **[required]**  (nom auteur)
- Success Response: (code 201)
```
{
   "status": "success",
   "data": {
      "Comment created!"
   /}
}
```

`PUT /sites/siteId/comments/:commentId` (Update un commentaire)
- URL parametre(s)
  - siteId: String **[required]**
  - commentId: String **[required]**
- body parametre(s)
  - body: String **[required]**
  - firstName: String **[required]**  (prénom auteur)
  - lastName: String **[required]**  (nom auteur)
- Success Response: (code 200)
```
{
   "status": "success",
   "data": {
      "Comment updated!"
   }
}
```

`DELETE /sites/siteId/comments/:commentId` (Supprimer un commentaire)
- URL parametre(s)
  - siteId: String **[required]**
  - commentId: String **[required]**
- Success Response: (code 201)
```
{
   "status": "success",
   "data": {
      "Comment deleted!"
   }
}
```
