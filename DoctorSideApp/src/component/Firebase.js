import firebase from 'firebase'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyByY7FlkavET-mJaAd9GWEedqsIx2GELqI",
    authDomain: "dscdata-c56fb.firebaseapp.com",
    databaseURL: "https://dscdata-c56fb.firebaseio.com",
    projectId: "dscdata-c56fb",
    storageBucket: "dscdata-c56fb.appspot.com",
    messagingSenderId: "593791274872",
    appId: "1:593791274872:web:497aaeb848e55be5fd828d",
    measurementId: "G-MK0Q504VJF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase