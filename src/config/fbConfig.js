import firebase from 'firebase'
import * as firebaseui from 'firebaseui'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDhoOhUvQ3iwLfpJ3KYRu_htqMRA7PH_gc",
  authDomain: "schoolprotectorsoftwaresystem.firebaseapp.com",
  databaseURL: "https://schoolprotectorsoftwaresystem.firebaseio.com",
  projectId: "schoolprotectorsoftwaresystem",
  storageBucket: "schoolprotectorsoftwaresystem.appspot.com",
  messagingSenderId: "228406926247"
};
firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: '<http://localhost:3000/>',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  // Terms of service url/callback.
  tosUrl: '<your-tos-url>',
  // Privacy policy url/callback.
  privacyPolicyUrl: function() {
    window.location.assign('<your-privacy-policy-url>');
  }
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
