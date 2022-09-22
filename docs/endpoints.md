# Endpoints:

#### Anonymus:

- Login (email, password)

- Register (email{unique}, password)

  

#### LoggedIn:

- User:

  - updateProfile(name, img, members[string])

  - getAllGames() - [id, dateStart, dateEnd, title, img, hasUserApplied, isUserApplicationAccepted]

  - applyForGame (GameID)

  - cancelApplicationForGame (GameID)

  - logout()

    

- User - active game: - if has valid application

  - GetGameData (GameID) - [id, dateStart, dateEnd, title, img, places[+questions]]

  - answerQuestion (QuestionID, Answer) - if has valid application

    

- Admin: + functions

  - CRUD for every class
    - CREATE - POST mapping
    - READ - GET(id), GET(all) mapping
    - UPDATE - PUT mapping (e.g. accept team applications)
    - DELETE - DELETE mapping

