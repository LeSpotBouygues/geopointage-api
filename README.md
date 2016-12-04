# geopointage-api


#### Routes pour le controller Sites (site de construction)

`GET /sites` (affichier les sites de constructions)
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
 - Success Response: (code 200)
```
{
   "status": "success",
   "data": [... tableau de site ...]
}
```
`Delete /sites/:siteId` (supprimer un site de construction selon son Id) 

#### Routes pour le controller Workers (compagnon)

`GET /workers` (afficher les compagnons)
`GET /workers/:workerId` (affichier un compagnon selon son Id) 
- URL parametre(s)
  - workerId: String **[required]**

 `POST /worker` (Créer un compagnon)
- body parametre(s)
  - firstName: String **[required]**
  - lastName: String **[required]**
  - registrationNumber: String **[required]**

 `PUT /worker/:workerId` (Modifier un compagnon)
 - URL parametre(s)
   - workerId: String **[required]**
- body parametre(s)
  - firstName: String
  - lastName: String
  - registrationNumber: String

`Delete /workers/:workerId` (supprimer un worker selon son Id) 
