# Szititour - Haladási napló

Tájékozódási csapatverseny Fullstack webalkalmazás - Szititour - University Independent Project Laboratory



#### **1. hét:**

- Témajelentkezés
- Téma kitalálása.
- Használandó technológiák kiválasztása.

Először kitaláltam a témát, majd megtörtént a témajelentkezés.
Utána kiválasztottam a felhasználandó technológiákat. Backenden Kotlin Spring mellet döntöttem, mivel Java Spring-ben már van egy kis tapasztalatom, Kotlin-t pedig az Android fejlesztések által már ismerem. 
Frontenden mindenképp lesz elég új dolog, amit meg kell ismerjek.

#### **2. hét:**

- GitHub Repository létrehozása.
- Backend technológia megismerése.
- Backend Projekt létrehozása.
- Backend Specifikáció és ütemterv elkészítése

Létrehoztam egy GitHub Repository-t, tehát a projekthez verziókövetéshez a GitHub-ot fogom használni.
Utána olvastam a Kotlin Springnek, hogy a legfontosabb alapismeretek meglegyenek.
Ezután létrehoztam a backend projektet, hogy lássam, hogy fog kinézni, és fel tudjam tölteni Repository-ba.
Megírtam a specifikációt, ahol részletezem a felhasználandó technológiákat, és megírtam a féléves ütemtervet is nagyvonalakban.
Backendhez elkészítettem az UML diagramot, amely tartalmazza milyen adatmodellek lesznek, és azok milyen kapcsolatban lesznek egymással.

#### **3. hét:**

- UML diagram adatosztályok kiegészítése javítása
- Specifikáció javítása, funkcionális specifikáció kiegészítése
- Backend adatmodellek létrehozása
- Backend DTO-k és hozzá tartozó konverterek elkészítése
- JWT Token authentikáció megismerése

Megbeszéltek szerint kibővítettem az UML diagramot a megfelelő kapcsolatokkal / tulajdonságokkal és a funkcionális specifikációt is kiegészítettem a hiányzó adatokkal.
Ezek után létrehoztam az adatmodelleket (Entitásokat) az UML diagram alapján. Az adatmodellekhez készítettem DTO-kat is, melyek körkörös függőség mentesek és így tud kommunikálni majd a Frontend-el. Az elkészített adatmodellek és hozzájuk tartozó DTO-khoz implementálta a converter/mapper függvényeket.
Utána olvastam és megismerkedtem a Jwt Token authentikációval és működésével 

#### **4. hét:**

- Backend Repository-k elkészítése
- Backend Service-k elkészítése
- Backend Authentikáció implementálása - AuthUtils
- Backend DTO-k és hozzá tartozó konverterek elkészítése
- Backend Utils komponens létrehozása - validációk
- Backend / Java app dockerizálásának megismerése

A hét során implementáltam a backend nagy részét, így már csak a kontrollerek maradtak. Elkészítettem a Repository oszályokat, és Service osztályokat, valamint a még hiányzó Dto-kat / extra adat modelleket. Az előző héten szerzett információk alapján elkészítettem egy AuthUtils osztály mely a Jwt authentikációt fogja biztosítani.
Emellete elkészült egy Utils osztály is, amely az email / password validációhoz szolgáltat függvényeket.
A maradék időben utána olvastam, hogyan lehet dockerizálni egy java applikációt, mivel Google ingyenes tervét már előző félévben felhasználtam, mint kiderült, és arra jutottam, hogy hosszútávon érdemesebb lenne saját környezetet biztosítsak a projekt futtatásához, és ártani sem árt, ha tudom, hogy kell ilyet. A folyamatot egy fokkal nehezíti, hogy Arm architektúrára szeretném buildelni az image-t.

#### **5. hét:**

- Backend Controllerek implementálása
- Backend / Java app dockerizálása

Elkészítettem a hiányzó controller osztályokat, implementáltam authentikáció ellenőrzést (Jwt Token Cookie). Az authentikációs endpointok az AuthController-ben kaptak helyet. A bejelentkezett felhasználó számára elérhető összes funkció pedig a LoggedInController-ben található. A többi controller által szolgáltatott funkciók csak az admin felhasználóknak elérhetőek. (ezek közül lehet lesz majd pár eltávolítva miután kiderül, hogy biztosan feleslegesek)
Sikerült az appot dockerizálni Arm architekúrára így a legfrissebb verziót bármikor tudom használni és tesztelni.



#### **6. hét:**

- Cross-Origin Resource Sharing (CORS) - Kotlin implementálása
- Token utazásának cseréje Cookieről Header Bearer Authorization
- Frontend
  - Környezet létrehozása
  - Authentikáció teszt

Frontend környezet létrehozása, után szembesültem vele, hogy hiányzik a backend implementációból a Cross Origin Resource Sharing. Ennek utána olvasása közben megtudtam, hogy van elterjedtebb / biztonságosabb mondja Token utaztatásának (Authorization Bearer Header), így következő lépésben átírtam a backend controllereket erre a módszerre. (Postmanben is könnyebb így tesztelni, token-t megjegyzi). Létrehoztam egy bejelentkező felületet és kipróbáltam  a bejelentkezést, próba adat lekérést. Miután ezek működtek a következő feladatok az admin felületek elkészítése lesz.



#### **7. hét:**

- Backend: Spring Security megismerése
- Frontend
  - AuthService implementálása - token kezelés
  - AuthInterceptor implementálása
  - Login, Register felület
  - Login összekötése Backend-el

Backenden Spring Security megismerkedésével és kipróbálásával túl sok idő elment, így arra jutottam nem fogom most átírni a Backend Security logikát, hanem majd leközelebb, amikor újra amúgy is nagyobb módosítást kell rajta végezni, inkább elkezdek haladni a Frontendel.
Frontenden elkészítettem a Login és Register felületet, valamint ezeket összekötöttem Backendel is. A Token elkapásához / beillesztéséhez elkészítettem az AuthInterceptort és a Token (bejelentkezés) kezeléséhez pedig az AuthService-t implementáltam.




#### **8. hét:**

- Frontend

  - AuthService implementálása2 - token kezelés remove token
  - UnauthorizedInterceptor implementálása
  - Model Interface-ek elkészítése
  - Buttons, GameCard, Navbar komponensek felületek elkészítése
  - TextInput componensek implementálása
  

Elkészítettem az UnauthorizedInterceptor-t, ami a bejelentkezés felülethez navigál, ha ilyen elkap egy ilyen HttpErrorResponse-t. AuthService-t kiegészítettem a Token eltávolítása függvénnyel (kijelentkezéshez). Elkészítettem pár model Interface-t, hogy megfelelő adat modelleket használjon a Frontend is. A felületi komponensek közül megcsináltam a Buttons-t, GameCard-ot, Navbar-t, és a TextInputot.



#### **9. hét:**

- Frontend:

  - ErrorInterceptor implementálása
  - HotToast Notification Library telepítése, bekötése loginnál, interceptoroknál
  - Dropdown, EditGame, List(team, place) komponens felületek elkészítése
  - Modal komponens implementálása

Elkészítettem az ErrorInterceptor-t, ami a ErrorResponse esetén értesíti a felhasználót a hibáról. Ehhez telepítettem egy külső könyvtárat (HotToastAngular), mely használatával testreszabható értesítéseket küldhetek a felhasználónak. Ezt bekötöttem bejelentkezésnél és az Interceptoroknál.
A felületi komponensek közül elkészítettem a Dropdown-t, EditGame-t, ListTeam-et és a ListPlace-t. Ezen kívül implementáltam egy sajátkészítésű Modal komponens-t, mely segítségével bármilyen popup/modal-t megtudok jeleníteni.



#### **10. hét:**

- Backend:
  - SSL tesztelés, implementálás: cors fura ssl-en? + self signed certificate nem jó !
  - Docker elérhetővé tétele távolról
  - Update CORS policies
- Frontend
- Routing - LazyLoad
  - GitHub pages - GitHub workflow
- Docker elérhetővé tétele távolról
  - AdminService - első rész - admin felület bekötésének elkezdése


A héten Frontenden implementáltam a Routing-ot Login-Register-AdminFelület-PlaceEdit oldalak között. Ezután, hogy be tudjam mutatni elérhetővé szerettem volna tenni távolról is az oldalt. Ehhez egyik megoldásnak a Github Pages-t találtam, aminek segítségével minden push után egy workflow lefut és kiteszi az App-ot egy GitHub oldalra (https://mherczku.github.io/szititour).
Viszont ezzel a megoldással egyenlőre két probléma is van, egyik, hogy Https Secure backend kell hozzá, mivel az oldal is Secure. A másik, hogy Routing-ot nem ismeri fel ha Url-be kapja és nem találja meg úgy az oldalt.
Ezért saját Docker-t csináltam Frontendből is, és elérhetővé tettem távolról azt. (majd GitHub-osat is szeretném ha jól működne) http://wildfire.ddns.net:8080 (t@test.hu : 1234)
Azért, hogy Backendet elérje, azt is elérhetővé kellet tenni távolról, valamint frissíteni a CORS Policy-kat.
Ezek mellet elkezdtem az AdminService implementálását, így az admin felület a Game-eket már backendről kapja.



#### **11. hét:**

- Backend:
  - AuthorizeMe Endpoint elkészítése
  - SSL fix/implementálás, CORS frissítése
  - Frissítés/Fix docker java verzió problémák
- Frontend:
  - AuthActions, AuthState, AuthReducer Implementálása
  - Auth Guard Implementálása - CanActivateChild - Route-k védelméért
  - AuthorizeMe implementálása - AuthService frissítése- APP_INITIALIZER elkészítése (app.module)
  - Fix interfaces - eredeti backend modellek, és hiányzó attribútumok

A hét a Frontend biztonságossá tételével ment el. Ehhez Backenden kellet egy két módosítás, egy új endpoint, egy nem self signed certificate, cors frissítések. Docker implementáción is módosítottam, hogy újabb java verziójú image-t használjon, mivel a régivel lett pár probléma.
Frontenden elkészítettem az AuthAction-öket, AuthState-t, AuthReducer-t, AuthService-be megírtam az új authorizeMe függvényt. Ezeket felhasználva elkészítettem és bekötöttem az AuthGuard-ot, és az Initializer-t. Menet közben implentáltam a hiányzó Backendes modelekket, attribútumokat.

#### **12. hét:**

- Backend:
  - Fix CascadeType problémák (game-team, game-place, game-application, team-application)
  - Fix metódus applyForGame, updateApplication
- Frontend:
  - Fix interceptors, több hiba kezelés - alertek
  - Register bekötése + hibakezelés
  - Hiányzó Admin service metódusok implementálása 
    - Game (create, delete, update)
    - Application(Accept / Decline)
  - Felületi logikák bekötése bekötése Admin - Game page
  - PlaceEdit felület elkészítése, Place lekérés bekötése (new - új létrehozása), edittext

Folytattam az admin felület összekötését a Backend-el. Ehhez Backenden kisebb módosításokat kellett végeznem, mivel problémák voltak a CascadeType-okkal. Emellett Backenden javítottam a játékra jelentkezésen és a játék frissítésen is. Ezek után az admin oldalt jól be tudtam kötni.
Implementáltam a hiányzó regisztráció bekötést és az ehhez tartozó hibakezeléseket. Belépés után most már lehet felvenni / módosítani / törölni játékot, illetve a csapatok jelentkezését elutasítani vagy elfogadni. Ezenkívül befejeztem a helyszíneknek a szerkesztési felületét, és ehhez elkezdtem megírni a felületi logikáját, valamint elkezdtem összekötni a Backend végpontokkal.



#### **13. hét:**

#### **14. hét:**



