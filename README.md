# Szititour
Tájékozódási csapatverseny Fullstack webalkalmazás - Szititour - University Independent Project Laboratory

## Prototípus:
A projekt prototípusa megtekinthető az alábbi oldalon:
https://mherczku.github.io/szititour/



## Lokális futtatás:
Amennyiben lokálisan szeretnéd kiprobálni a projektet a lentebb leirtak szerinti lépéseket kövesd.

0. Lépés klónozd le a projektet!

### Backend:
    A Backend futtatásához biztosítanod kell egy adatbázist is, ehhez két lehetőséged van:
        1. Vagy futtatsz egy PostgreSQL adatbázist, amit a késöbbiekben leírtak szerint összekötsz a Backenddel.
        2. Vagy Beépített egyszerhasználatos "embeded" adatbázist használsz a késöbbiekben leírtak szerint.

    A Backend futtatásához generálnod kell egy RSA nyilvános és privát kulcspárt:
        1. Terminálban: openssl genrsa --out private.pem
        2: Terminálban: openssl rsa -in private.pem -pubout -out public.pem
        3. A létrejött két pem fájlt helyezed el a Backend projekt resources mappájában

    Továbbá a Backend megfelelő működéséhez be kell állíts egy Email szolgáltatást és a Firebase Messaging szolgáltatását, valamint a GoogleSign-hoz szükség van egy Google clientID-ra:
        1. Email fiókhoz generálj egy alkalmazás jelszót, amihez hozzá tud férni SMTP kapcsolattal.
        2. Készíts egy Firebase projektet és a messaging szolgáltatást bekapcsolva tölts le a firebase.json konfigurációs fájlt és helyezd el a már említett resources mappába.
        3. Google Client ID szerzése a GoogleSignIn-hoz

    Az alkalmazás futtatásához java 11 szükséges


#### Saját adatbázis futtatása:

Amennyiben a saját adatbázis opciót választottad, akkor az alábbi kódot helyezd el egy application.properties nevezetű fájlban. Ezt a fájlt a többihez hasonlóan helyezd el a resources mappában.

port -> Futtatott adatbázis portja
db -> adatbázis neve
username -> adatbázis hozzáféréséhez szükséges felhasználónév
password -> adatbázis hozzáféréséhez szükséges jelszó

Az Email és GoogleSigIn rész username password és clientId részét logikusan töltsd ki.


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

Amennyiben a beépített adatbázis opciót választottad, akkor az alábbi kódot helyezd el egy application.properties nevezetű fájlban. Ezt a fájlt a többihez hasonlóan helyezd el a resources mappában.

Az Email és GoogleSigIn rész username password és clientId részét logikusan töltsd ki.


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
Annak érdekében, hogy legyen felhasználó akivel be tudsz lépni és kiprobálni a funkciókat a SzititourBackendApplication.kt fájlban van egy kikommentezett rész. Amennyiben ezt a részt vissza teszed a kódba és importálod a megfeleő osztályokat, akkor induláskor az alkalmazás automatikusa létrehoz egy teszt szervezőt és egy teszt játékost.
    
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
        1. A frontend/src/environments mappában lévő environment.ts fájl-t kell bekonfiguráld.
    (Itt figyelj, ha lokálisan futtatod a Backendet, akkor HTTP kell, valamint ha a térkép, push értesítések, googleSignIn funckiókat is ki szeretnéd próbálni akkor, ahhoz az opcionális rész megfelelő mezőit is ki kell töltsed. Egyébként push értesítések és googleSignIn csak HTTPS kapcsolaton keresztül engedélyezettek a Google által.)
        2. A kész environment.ts fájl-t másold le és a másoltat nevezd el environment.local.ts nevűre. (előző megmarad)
        3. npm run start parancs kiadásával futtathatod az alkalmazást (szükséges nodejs*, npm*, ng)
