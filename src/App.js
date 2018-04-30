import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyATutye9nGMcaVdRS6SRDzE2HX1vVfbc9c",
    authDomain: "bloc-chat-react8.firebaseapp.com",
    databaseURL: "https://bloc-chat-react8.firebaseio.com",
    projectId: "bloc-chat-react8",
    storageBucket: "bloc-chat-react8.appspot.com",
    messagingSenderId: "1013439698726"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="sidenav">
          <RoomList
            firebase={firebase}
          />
        </div>
      </div>
    );
  }
}

export default App;
