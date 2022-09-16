# Szititour - Specifikáció
Tájékozódási csapatverseny Fullstack webalkalmazás - Szititour - University Independent Project Laboratory



## Backend:

- Kotlin Spring backend

- Postgresql adatbázis

- Backend architektúra / rétegek:

  ![szititour-backend](https://raw.githubusercontent.com/mherczku/szititour/main/images/backend-layers.png)

  

- UML - adatmodellek és kapcsolataik:

![szititour-backend](https://raw.githubusercontent.com/mherczku/szititour/main/images/szititour-backend.png)





## Frontend:

- Web applikáció

- Angular framework (Typescript)

- Tailwind CSS framework (https://tailwindcss.com/)

- Angular architektúra:

  ![szititour-backend](https://raw.githubusercontent.com/mherczku/szititour/main/images/angular-architecture.png)

  Tehát az oldal és a komponensek kinézetét html template-k fogják leírni (+CSS).
  Ezeket komponensek tartalmazzák, hogy újra felhasználhatóak legyenek és az egyes komponensek a saját logikájukat / feladataikat el tudják végezni önmaguk.
  A Backend-el a Service-ek fognak kommunikálni, melyet az Injector segítségével bárhol könnyen felhasználhatunk.

  

- MockUp tervek: (elkészítés alatt)





## Ütemterv:

1. Specifikáció
2. Backend UML
3. Frontend MockUps (tervek)
4. Backend Implementáció
   1. Adatmodellek
   2. Skeleton
   3. Repository
   4. Service
   5. Controller
5. Frontend Implementáció
   1. SiteBuild
   2. Frontend Logika implementálása - összekötés Backend-el
