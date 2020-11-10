// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyD0Fq-6U89Mjc8_t8hnAvN8UseYP36M0s8",
    authDomain: "portfolio-web-f7399.firebaseapp.com",
    databaseURL: "https://portfolio-web-f7399.firebaseio.com",
    projectId: "portfolio-web-f7399",
    storageBucket: "portfolio-web-f7399.appspot.com",
    messagingSenderId: "492367414075",
    appId: "1:492367414075:web:0d399f48ec7c26fad6ad1e",
    measurementId: "G-SJ9NLBC3QC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});
