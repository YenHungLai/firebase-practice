import React, { Component } from 'react';
import './App.css';
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
  signInSuccessUrl: '/',
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

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: ''
    }

    const citiesRef = db.collection("cities");
    citiesRef.doc("SF").set({
        name: "San Francisco", state: "CA", country: "USA",
        capital: false, population: 860000,
        regions: ["west_coast", "norcal"] });
    citiesRef.doc("LA").set({
        name: "Los Angeles", state: "CA", country: "USA",
        capital: false, population: 3900000,
        regions: ["west_coast", "socal"] });
    citiesRef.doc("DC").set({
        name: "Washington, D.C.", state: null, country: "USA",
        capital: true, population: 680000,
        regions: ["east_coast"] });
    citiesRef.doc("TOK").set({
        name: "Tokyo", state: null, country: "Japan",
        capital: true, population: 9000000,
        regions: ["kanto", "honshu"] });
    citiesRef.doc("BJ").set({
        name: "Beijing", state: null, country: "China",
        capital: true, population: 21500000,
        regions: ["jingjinji", "hebei"] });

    const docRef = db.collection("cities").doc("TOK");
    docRef.get().then(doc => {
      this.setState({data: doc.data()})
    })
  }

  componentDidMount = () => {

  }

  handleChange = (event) => {
    var ageRef = db.collection("test").doc("stuff");
    // Set the "capital" field of the city 'DC'
    return ageRef.update({
        age: event.target.value
    })
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
  }

  render() {
    const Fire = <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>

    return (
      <div className="App">
        <h1>Hello World</h1>
        <h1>{this.state.data['name']}</h1>
        <select onChange={this.handleChange}>
          <option value='21'>21</option>
          <option value='22'>22</option>
          <option value='23'>23</option>
        </select>
        {Fire}
      </div>
    );
  }
}

export default App;
