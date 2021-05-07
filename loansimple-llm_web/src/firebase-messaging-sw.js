importScripts('https://www.gstatic.com/firebasejs/7.6.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.2/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyAp6fShhBD7txIRZQ--V3OTNOQykpS8_3A",
    authDomain: "llm-server.firebaseapp.com",
    databaseURL: "https://llm-server.firebaseio.com",
    projectId: "llm-server",
    storageBucket: "llm-server.appspot.com",
    messagingSenderId: "404118400936",
    appId: "1:404118400936:web:c2b9246fdafc6deddcb79d",
    measurementId: "G-JD6YDMSLLW"
});

const messaging = firebase.messaging();