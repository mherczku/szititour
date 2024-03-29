export const CONST_ROUTES = {

    admin: {
        path: "admin",
        call: "/admin/",
        home: {
            path: "",
            call: "/admin/"
        },
        active: {
            path: "active/:id",
            call: "/admin/active/"
        },
        place: {
            path: "place/:gameId/:placeId",
            call: "/admin/place/"
        },
        notification: {
            path: "notification",
            call: "/admin/notification/"
        }
    },

    user: {
        path: "user",
        call: "/user/",
        home: {
            path: "home",
            call: "/user/home"
        },
        active: {
            path: "active/:id",
            call: "/user/active/"
        },
        profile: {
            path: "profile",
            call: "/user/profile"
        },
        password: {
            path: "password/:token",
            call: "/user/password"
        },
        delete: {
            path: "delete/:token",
            call: "/user/delete"
        }
    },

    auth: {
        path: "auth",
        call: "auth/",
        register: {
            path: "register",
            call: "/auth/register"
        },
        login: {
            path: "login",
            call: "/auth/login"
        },
        verify: {
            path: "verify/:token",
            call: "/auth/verify/"
        },
        forgot: {
            path: "forgot",
            call: "/auth/forgot/"
        },
        password: {
            path: "password/:token",
            call: "/auth/password/"
        }
    }

};