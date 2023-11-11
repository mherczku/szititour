// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//! dont forget to change http / https - localhost: http
const url = "dolphin-casual-deer.ngrok-free.app/szititour"; //https

export const environment = {
  production: false,

  apiBaseUrl: `https://${url}`,

  apiWebsocketUrlAdmin: `wss://${url}/ws/admin`,
  apiWebsocketUrlUser: `wss://${url}/ws/user`,

  //optional:
  MAP_KEY: "",
  googleClientId: "",
  firebaseConfig: {},
  vpKey: ""
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
