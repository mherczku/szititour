export type CONST_MESSAGE_KEY = keyof typeof CONST_MESSAGES;

export const CONST_MESSAGES = {

    //* SUCCESS MESSAGES:
    //! Make them short!
    TOPIC_NOTIFICATION_SENT: "Push értesítés sikeresen kiküldve",
    DIRECT_NOTIFICATION_SENT: "Direkt push értesítés sikeresen kiküldve",
    TEAM_DELETE_SUCCESS: "Csapat sikeresen törölve",
    LOGOUT_SUCCESS: "Sikeres kijelentkezés",
    EMAIL_VERIFIED: "Sikeres E-mail aktiválás",
    REGISTER_SUCCESS: "Sikeres regisztráció",
    LOGIN_SUCCESS: "Sikeres bejelentkezés",


    //* ERROR MESSAGES:
    EMAIL_VERIFICATION_FAILED: "Sikertelen E-mail aktiválás",
    TEAM_NOT_VERIFIED: "Csapat nem aktivált", //TODO DELETED
    REQUEST_METHOD_NOT_SUPPORTED: "A kérés nem támogatott",
    MISSING_REQUEST_VALUE: "Hiányzó paraméter",
    GAME_TITLE_TAKEN: "Játék neve már foglalt",

    EMAIL_EMPTY: "Üres E-mail cím",
    GOOGLE_NOT_VERIFIED: "Google E-mail cím nem verifikált",
    PASSWORD_EMPTY: "Üres jelszó",
    WRONG_PASSWORD: "Hibás jelszó",
    EMAIL_NOT_VERIFIED: "E-mail cím nem aktivált",
    IMG_FORMAT_NOT_SUPPORTED: "Kép formátuma nem támogatott",
    IMG_COMPRESSION_NOT_SUPPORTED: "Kép tömörítése nem támogatott",
    GAME_GAMEID_QUESTIONID_NULL: "GAME_GAMEID_QUESTIONID_NULL",
    GAME_NOT_FOUND: "Játék nem található",
    INVALID_NOTIFICATION: "Hibás értesítés paraméterek",
    EMAIL_SEND_FAILED_TEMPLATE_NULL: "E-mail kiküldése sikertelen",

    AUTH_TOKENID_NOT_FOUND: "Authentikációs hiba történt",
    AUTH_TOKEN_BAD_RESOURCE_ID: "Authentikációs hiba történt",
    GOOGLE_VALIDATION_FAILED: "Authentikációs hiba történt - Google validációs hiba",
    INVALID_GOOGLE_TOKEN: "Authentikációs hiba történt - Google hiba",
    AUTH_EMPTY_TOKENID: "Authentikációs hiba történt",
    AUTH_TOKEN_INVALID: "Authentikációs hiba történt",
    EMAIL_INVALID: "Hibás E-mail cím",
    PASSWORD_INVALID: "Hibás jelsző - komplexitás",
    EMAIL_TAKEN: "E-mail cím már foglalt",
    EMPTY_CREDENTIALS: "Üres bejelentkezési adatok",
    TEAM_INACTIVE: "Csapat nem aktivált",
    AUTH_TOKEN_EXPIRED: "Bejelentkezés idő lejárt",
    AUTH_INVALID_TOKEN_TYPE: "Authentikációs hiba történt",
    PLACE_NOT_FOUND_CONVERT: "Helyszín nem található",

    VERIFICATION_FAILED: "Authentikációs hiba történt",
    RESOURCE_IMG_NOT_FOUND: "Keresett kép nem található",
    RESOURCE_DIRECTORY_NOT_FOUND: "Keresett kép nem található",
    QUESTION_NOT_FOUND: "Kérdés nem található",

    PLACE_NOT_FOUND: "Helyszín nem található",
    GAME_INACTIVE: "Játék nem aktív",
    APPLICATION_NOT_ACCEPTED: "Jelentkezés nincs elfogadva",
    TEAM_NOT_FOUND: "Csapat nem található",
    CANNOT_CANCEL_REFUSED: "A jelentkezést már elutasították",
    CANNOT_CANCEL_ACTIVE: "Aktív játékról a jelentkezést nem lehet visszavonni",
    TEAM_ALREADY_APPLIED: "A csapat már jelentkezett a játékra",
    CANNOT_APPLY_ACTIVE_GAME: "Aktív játékra nem lehet jelentkezni",
    APPLICATION_NOT_FOUND: "Jelentkezés nem található",
    ANSWER_NOT_FOUND: "Válasz nem található",
    UNKNOWN: "Ismeretlen hiba történt",
    UNKNOWN_AUTH: "Ismeretlen authentkációs hiba történt"

};