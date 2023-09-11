# Endpoints:

#### Anonymus:

- Login(LoginData) - Response + TOKEN (if successful)

- Register(LoginData) - Reponse

  

#### LoggedIn: (Valid Token Required)

- User:

  - updateProfile(TeamUpdateProfileDto) - TeamDto - /user/update

  - getAllGames() - List[GameOnlyBasicDto] - /user/games

  - applyForGame (GameId) - Response - /user/apply

  - cancelApplicationForGame (GameId) - Response - /user/cancel

  - logout() - -

    

- User - active game: - **accepted application required**

  - getGameData (GameId) - GameActiveDto - /user/activegame

  - answerQuestion (QuestionId, Answer) - Response - /user/answer/{questionId}

    

- Admin: (**valid token with admin privileges required**)

  - CRUD for every class  - /games /teams /applications /places /questions /answers
    - CREATE - POST mapping
    - READ: 
      - GET(id) -  /{id}
      - GET(all) mapping
    - UPDATE - PUT mapping
    - DELETE - DELETE mapping

