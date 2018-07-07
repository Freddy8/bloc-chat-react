import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

componentDidMount() {
  this.props.firebase.auth().onAuthStateChanged(user => {
    this.props.setUser(user);
    console.log(user);
    console.log(user.displayName);
  });
}

signIn() {
const provider = new this.props.firebase.auth.GoogleAuthProvider();
this.props.firebase.auth().signInWithPopup( provider );
}

signOut() {
  this.props.firebase.auth().signOut();
}




  render() {
    return(
      <div className="user-btn">
        <span> Logged in: {this.props.user ? this.props.user.displayName : 'Guest'} </span>
        <br />
        <span><button onClick={this.signOut}> Sign Out </button></span>
        <span><button onClick={this.signIn}> Sign In</button></span>

      </div>
    );
  }
}

export default User;
