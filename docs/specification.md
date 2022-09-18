# Szititour - Specifikáció
Tájékozódási csapatverseny Fullstack webalkalmazás - Szititour - University Independent Project Laboratory



## Funkcionális specifikáció:

- Két fajta felhasználó:
  - Átalános Felhasználó(csapat/résztvevő)
  - Szervező (admin)
- Szervezőnek lehetősége lesz:
  - új játékot / versenyt létrehozni
  - játékot módosítani
  - játékhoz új helyszínt létrehozni
  - helyszínhez új kérdést létrehozni
  - helyszínt / kérdést módosítani / törölni
  - csapat jelentkezést elfogadni / elutasítani
- Általános felhasználónak (résztvevőnek) lehetősége lesz:
  - Jelentkezni / lejelentkezni játékra
  - Játék helyszíneinek kérdéseire válaszolni



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

  

- MockUp tervek: 

  - Admin felület:

  ![szititour-backend](https://raw.githubusercontent.com/mherczku/szititour/main/images/mockup-games.png)

  ![szititour-backend](https://raw.githubusercontent.com/mherczku/szititour/main/images/mockup-edit.png)

  ![szititour-backend](https://raw.githubusercontent.com/mherczku/szititour/main/images/mockup-places.png)

  ![szititour-backend](https://raw.githubusercontent.com/mherczku/szititour/main/images/mockup-questions.png)

  ![szititour-backend](https://raw.githubusercontent.com/mherczku/szititour/main/images/mockup-teams.png)

  

  - Felhasználó felület:






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
