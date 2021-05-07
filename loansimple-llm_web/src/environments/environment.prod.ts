// export const environment = {
// 	production: true,
// 	isMockEnabled: true, // You have to switch this, when your real back-end is done
// 	authTokenKey: 'authce9d77b308c149d5992a80073637e4d5'
// };


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
