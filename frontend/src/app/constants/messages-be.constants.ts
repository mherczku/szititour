export type CONST_MESSAGE_KEY = keyof typeof CONST_MESSAGES;

export const CONST_MESSAGES = {

    //* SUCCESS MESSAGES:
    //! Make them short! - comment to disable
    // AUTH_SUCCESS: "Sikeres authentikáció",
    DELETE_TEAM_REQUESTED: "Fiók törléséhez megerősítő E-mail kiküldve",
    DIRECT_NOTIFICATION_SENT: "Direkt push értesítés sikeresen kiküldve",
    EMAIL_VERIFIED: "Sikeres E-mail aktiválás",
    LOGIN_SUCCESS: "Sikeres bejelentkezés",
    LOGOUT_SUCCESS: "Sikeres kijelentkezés",
    PASSWORD_CHANGED: "Jelszó sikeresen módosítva",
    PASSWORD_CHANGE_EMAIL_SENT: "Jelszó módosításához E-mail kiküldve",
    REGISTER_SUCCESS: "Sikeres regisztráció, Aktiváló E-mail kiküldve",
    REGISTER_SUCCESS_GOOGLE: "Üdvözlünk a Szititournál",
    SUCCESS: "Siker", // never comes to frontend
    TEAM_DELETE_SUCCESS: "Csapat sikeresen törölve",
    TOPIC_NOTIFICATION_SENT: "Push értesítés sikeresen kiküldve",


    //* ERROR MESSAGES:
    ANSWER_NOT_FOUND: "Válasz nem található",
    APPLICATION_NOT_ACCEPTED: "Jelentkezés nincs elfogadva",
    APPLICATION_NOT_FOUND: "Jelentkezés nem található",
    AUTH_EMPTY_TOKENID: "Authentikációs hiba történt",
    AUTH_INVALID_TOKEN_TYPE: "Authentikációs hiba történt",
    AUTH_TOKEN_BAD_RESOURCE_ID: "Authentikációs hiba történt",
    AUTH_TOKEN_EMPTY: "Authentikációs hiba történt - Token nem lehet üres",
    AUTH_TOKEN_EXPIRED: "Bejelentkezési idő lejárt",
    AUTH_TOKEN_INVALID: "Authentikációs hiba történt",
    AUTH_TOKENID_NOT_FOUND: "Bejelentkezés visszavonva, kérlek jelentkezz be újra!",
    BAD_CREDENTIALS: "Helytelen E-mail vagy Jelszó",
    CANNOT_ACTIVATE_RIDDLE: "Nem aktiválható! Minden helyszínnek pontosan egy rejtvénynek kell lennie!",
    CANNOT_APPLY_ACTIVE_GAME: "Aktív játékra nem lehet jelentkezni",
    CANNOT_CANCEL_ACTIVE: "Aktív játékról a jelentkezést nem lehet visszavonni",
    CANNOT_CANCEL_REFUSED: "A jelentkezést már elutasították",
    EMAIL_EMPTY: "Üres E-mail cím",
    EMAIL_INVALID: "Hibás E-mail cím",
    EMAIL_INVALID_TOKEN_TYPE: "E-mail cím módosító link már érvénytelen",
    EMAIL_NOT_VERIFIED: "E-mail cím nem aktivált",
    EMAIL_NOT_VERIFIED_DELETE: "Fiók nem törölhető, amíg az új E-mail nincs aktiválva",
    EMAIL_SEND_FAILED_TEMPLATE_NULL: "E-mail kiküldése sikertelen",
    EMAIL_TAKEN: "E-mail cím már foglalt",
    EMAIL_TOKEN_EXPIRED: "E-mail módosító link felhasználási ideje lejárt",
    EMPTY_CREDENTIALS: "Üres bejelentkezési adatok",
    GAME_GAMEID_QUESTIONID_NULL: "GAME_GAMEID_QUESTIONID_NULL",
    GAME_INACTIVE: "Játék nem aktív",
    GAME_NOT_FOUND: "Játék nem található",
    GAME_TITLE_TAKEN: "Játék neve már foglalt",
    GOOGLE_NOT_VERIFIED: "Google E-mail cím nem verifikált",
    GOOGLE_VALIDATION_FAILED: "Authentikációs hiba történt - Google validációs hiba",
    IMG_COMPRESSION_NOT_SUPPORTED: "Kép tömörítése nem támogatott",
    IMG_FORMAT_NOT_SUPPORTED: "Kép formátuma nem támogatott",
    INVALID_GOOGLE_TOKEN: "Authentikációs hiba történt - Google hiba",
    INVALID_NOTIFICATION: "Hibás értesítés paraméterek",
    MISSING_REQUEST_VALUE: "Hiányzó paraméter",
    PASSWORD_EMPTY: "Üres jelszó",
    PASSWORD_INVALID: "Hibás jelsző - komplexitás",
    PASSWORD_TOKEN_INVALID: "Jelszó módosító link már nem érvényes",
    PASSWORD_INVALID_TOKEN_TYPE: "Jelszó módosítása meghiúsult",
    PASSWORD_TOKEN_EXPIRED: "Jelszó módosító link felhasználási ideje lejárt",
    PLACE_NOT_FOUND_CONVERT: "Helyszín nem található",
    PLACE_NOT_FOUND: "Helyszín nem található",
    QUESTION_NOT_FOUND: "Kérdés nem található",
    REQUEST_METHOD_NOT_SUPPORTED: "A kérés nem támogatott",
    RESOURCE_DIRECTORY_NOT_FOUND: "Keresett kép nem található",
    RESOURCE_IMG_NOT_FOUND: "Keresett kép nem található",
    TEAM_ALREADY_APPLIED: "A csapat már jelentkezett a játékra",
    TEAM_DELETE_INVALID_TOKEN_TYPE: "Fiók törlése link már nem érvényes",
    TEAM_DELETE_TOKEN_EXPIRED: "Foók törlése meghiúsult",
    TEAM_DELETE_TOKEN_INVALID: "Fiók törlése link felhasználási ideje lejárt",
    TEAM_INACTIVE: "Csapat nem aktivált",
    TEAM_NOT_FOUND: "Csapat nem található",
    UNKNOWN: "Ismeretlen hiba történt",
    UPLOAD_SIZE_LIMIT: "Feltöltendő kép mérete maximum 5 MB",
    VERIFICATION_FAILED: "Authentikációs hiba történt",

};

export const CONST_MESSAGES_FE = {
    UNKNOWN_AUTH: "Ismeretlen authentkációs hiba történt",
};