# Szititour
Tájékozódási csapatverseny Fullstack webalkalmazás - Szititour - University Independent Project Laboratory

## Prototípus:
A projekt prototípusa megtekinthető az alábbi oldalon:
https://mherczku.github.io/szititour/



## Lokális futtatás:
A projekt lokális futtatásához a lentebb leírt lépéseket kell követni:

0. Lépés projekt leklónozása!

### Backend:
    *A Backend futtatásához biztosítani kell egy adatbázist is, ehhez két lehetőséged van:
        1. PostgreSQL adatbázis futtatása, és összekötése a Backenddel a késöbbiekben leírtak szerint.
        2. Vagy Beépített egyszerhasználatos "embeded" adatbázis használata a késöbbiekben leírtak szerint.

    *A Backend futtatásához generálni kell egy RSA nyilvános és privát kulcspárt:
        1. Terminálban: openssl genrsa --out private.pem
        2: Terminálban: openssl rsa -in private.pem -pubout -out public.pem
        3. A létrejött két pem fájlt el kell helyezni a Backend projekt resources mappájában

    (Opcionális) Továbbá a Backend megfelelő működéséhez be kell állítani egy Email szolgáltatást és a Firebase Messaging szolgáltatását, valamint a GoogleSign-hoz szükség van egy Google clientID-ra:
        1. Email fiókhoz generálni kell egy alkalmazás jelszót, amihez hozzá tud férni a Backend SMTP kapcsolattal.
        2. Készíteni kell egy Firebase projektet és a messaging szolgáltatást bekapcsolva le kell tölteni a firebase.json konfigurációs fájlt és azt elhelyezni a már említett resources mappába.
        3. Google Client ID szerzése a GoogleSignIn-hoz

    *Az alkalmazás futtatásához java 11 szükséges


#### Saját adatbázis futtatása:

A saját adatbázis opció választása esetén az alábbi kódot kell elhelyezni egy application.properties nevezetű fájlban. Ezt a fájlt a többihez hasonlóan el kell helyezni a resources mappában.

   - port -> Futtatott adatbázis portja
   - db -> adatbázis neve
   - username -> adatbázis hozzáféréséhez szükséges felhasználónév
   - password -> adatbázis hozzáféréséhez szükséges jelszó

Az Email és GoogleSigIn rész username password és clientId része opcionálisan kitölthető valós adatokkal.


```yml
server.port=8080
spring.datasource.url=jdbc:postgresql://localhost:port/db
spring.datasource.password=password
spring.datasource.username=username
spring.jpa.hibernate.ddl-auto=create
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
server.ssl.enabled=false
rsa.private-key=classpath:private.pem
rsa.public-key=classpath:public.pem

# Email:
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=email@gmail.com
spring.mail.password=password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# GoogleSignIn
google.clientId=CLIENTID.apps.googleusercontent.com
```

#### Beépített adatbázis futtatása:

A beépített adatbázis opció választása esetén az alábbi kódot kell elhelyezni egy application.properties nevezetű fájlban.

Ezt a fájlt a többihez hasonlóan el kell helyezni a resources mappában.

   - A build.gradle.ts fájlban ki kell kommentezni a runtimeOnly("org.postgresql:postgresql") sort
   - és le kell szedni a kommentezést a runtimeOnly("com.h2database:h2") sorrol.

Az Email és GoogleSigIn rész username password és clientId része opcionálisan kitölthető valós adatokkal.


```yml
server.port=8080
# Embeded DB:
spring.datasource.url=jdbc:h2:mem:szttestdb1;DB_CLOSE_DELAY=-1
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=username
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=create

server.ssl.enabled=false
rsa.private-key=classpath:private.pem
rsa.public-key=classpath:public.pem

# Email:
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=email@gmail.com
spring.mail.password=password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# GoogleSignIn
google.clientId=CLIENTID.apps.googleusercontent.com
```

#### Teszt adatok:
Annak érdekében, hogy legyen felhasználó, akivel be lehet lépni és ki lehet probálni a funkciókat a SzititourBackendApplication.kt fájlban van egy kikommentezett rész. Teszt felhasználók generálásához vissza kell tenni a kódba ezt a kikommentezett részt és be kell importálni a megfeleő osztályokat. Ezután induláskor az alkalmazás automatikusan létrehoz egy teszt szervezőt és egy teszt játékost.
    
```kotlin
import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.service.TeamService
import hu.hm.szititourbackend.util.PasswordUtils
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
```

### Frontend:
    A Frontent alkalmazás lokális futtatása egy fokkal egyszerűbb:
        1. A frontend/src/environments mappában lévő environment.ts fájl-t kell bekonfigurálni.
    (Itt figyelni kell, a Backend lokális futtatása esetén HTTP kell. Valamint a térkép, push értesítések, googleSignIn funkciók elérése érdekében az opcionális rész megfelelő mezőit is ki kell tölteni (Backend konfigurációnál is). Egyébként push értesítések és googleSignIn csak HTTPS kapcsolaton keresztül engedélyezettek a Google által.)
        2. A kész environment.ts fájl-t le kell másolni és a másoltat át kell nevezni environment.local.ts nevűre. (előző megmarad)
        3. npm run start parancs kiadásával lehet futtatni az alkalmazást (szükséges nodejs*, npm*, ng) (*elötte npm install szökséges)
