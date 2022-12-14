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
  - csapat jelentkezést elfogadni / elutasítani (amennyiben a jelentkezés helyes, jelentkezési díj be lett fizetve)
  - Csapatok által beküldött válaszokat helyesnek vagy helytelennek ítélni
- Általános felhasználónak (résztvevőnek) lehetősége lesz:
  - Jelentkezni / lejelentkezni játékra
  - Játék helyszíneinek kérdéseire válaszolni
    - A kérdés típusától függ, hogy a válasz melyik tulajdonságába kerül mentésre a megadott válasz. Mivel egy válaszról mindig tudni, hogy milyen típusú kérdéshez tartozik, így egyértelműen kiszedhető belőle a szükséges adat.
    - Egy játék aktív időszaka a "dateStart"-tól "dateEnd"-ig tart. A kérdésekre ebben az időszakon belül tudnak válaszolni a jelentkezett (elfogadott) csapatok.



## Backend:

- Kotlin Spring backend

- Postgresql adatbázis

- Backend architektúra / rétegek:

  ![szititour-backend](https://raw.githubusercontent.com/mherczku/szititour/main/images/backend-layers.png)

  

- UML - adatmodellek és kapcsolataik:

  - Helyszíneknek lesz koordinátái (longitude, latitude) és címe (address), viszont ezek csak később lesz jelentősége.
  - A Team osztály reprezentál egy felhasználót
    - ("user" nem lehetett a neve, mivel postgresql adabázis nem szeretné)
    - A szervezőket is ez az osztály reprezentálja azzal a különbséggel, hogy az ő esetükben az "isAdmin" változó  értéke "true".


![szititour-backend](https://raw.githubusercontent.com/mherczku/szititour/main/images/szititour-backend.jpg)





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

    - Játékok:

      ![szititour-backend](https://raw.githubusercontent.com/mherczku/szititour/main/images/mockup-games.png)

    - Játék hozzáadása / szerkesztése:

      ![szititour-backend](https://raw.githubusercontent.com/mherczku/szititour/main/images/mockup-edit.png)

      

    - Helyszínek + hozzáadása / szerkesztése:

      ![szititour-backend](https://raw.githubusercontent.com/mherczku/szititour/main/images/mockup-places.png)
  
    - Kérdések + hozzáadása / szerkesztése:
  
      ![szititour-backend](https://raw.githubusercontent.com/mherczku/szititour/main/images/mockup-questions.png)
  
    - Játékra jelentkező csapatok listája (jelentkezők elfogadása / elutasítása):
  
      ![szititour-backend](https://raw.githubusercontent.com/mherczku/szititour/main/images/mockup-teams.png)
  
  
  
  
  
  
  - Felhasználó felület:
    - Bejelentkezés
    - Regisztráció
    - Elfelejtett jelszó
    - Profil
    - Leendő játékok + Jelentkezés / Lejelentkezés
    - Aktív játék - Helyszínek
    - Aktív játék kérdések + Válasz beküldése
    - 






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
