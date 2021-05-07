// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The application-list of file replacements can be found in `angular.json`.

// export const environment = {
// 	production: false,
// 	isMockEnabled: true, // You have to switch this, when your real back-end is done
// 	authTokenKey: 'authce9d77b308c149d5992a80073637e4d5'
// };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


export const environment = {
    production: false,
    isMockEnabled: true,
    authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
    api_host: 'http://stagls.loansimple.in',
    assets_root_host: 'https://assets.loansimple.in',
    hmr: false,
    firebaseConfig: {
        apiKey: 'AIzaSyAp6fShhBD7txIRZQ--V3OTNOQykpS8_3A',
        authDomain: 'llm-server.firebaseapp.com',
        databaseURL: 'https://llm-server.firebaseio.com',
        projectId: 'llm-server',
        storageBucket: 'llm-server.appspot.com',
        messagingSenderId: '404118400936',
        appId: '1:404118400936:web:c2b9246fdafc6deddcb79d',
        measurementId: 'G-JD6YDMSLLW'
    }
};
