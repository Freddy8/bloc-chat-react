import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
      activeMessage: "",
    };
    this.changeRoom = this.changeRoom.bind(this);
    this.changeMessage = this.changeMessage.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setUser(user) {
    this.setState({ currentUser: user });
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
          <User
            firebase={firebase}
            setUser={this.setUser}
            user={this.state.currentUser}
            />
          <RoomList
            firebase={firebase}
            activeRoom={this.state.changeRoom}
            changeRoom={this.changeRoom}
          />
        </div>
        <div className="message">
          <MessageList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            activeMessage={this.state.activeMessage}
            newMessage={this.changeMessage}
            changeMessage={this.changeMessage.bind(this)}
            user={this.state.currentUser}
            />
          </div>
      </div>
    );
  }
}

export default App;
