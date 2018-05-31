import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: "",
      activeMessage: ""
    };
    this.changeRoom = this.changeRoom.bind(this);
  }

  changeRoom(room) {
    this.setState({ activeRoom: room });
  }

  changeMessage(msg) {
    this.setSate({ activeMessage: msg });
  }

  render() {
    return (
      <div className="App">
        <div className="sidenav">
          <div className="header"> Bloc Chat </div>
          <RoomList
            firebase={firebase}
            activeRoom={this.changeRoom}
            changeRoom={this.changeRoom.bind(this)}
          />
        </div>
        <div className="message">
          <MessageList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            activeMessage={this.state.activeMessage}
            newMessage={this.changeMessage}
            changeMessage={this.changeMessage.bind(this)}
            />
          </div>
      </div>
    );
  }
}

export default App;
