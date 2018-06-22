import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props) {
    super(props);


      this.state = {
        username: "",
        content: "",
        sentAt: "",
        updatedTime: "",
        messages: [],
        newMessage: "",
      };
      this.enter = this.enter.bind(this);
      this.handleChanges = this.handleChanges.bind(this);

      this.messagesRef = this.props.firebase.database().ref('Messages');

         this.messagesRef.on('child_removed', snapshot => {
         this.setState({ messages: this.state.messages.filter( message => message.key !== snapshot.key ) })
       })
      };

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      let msg = snapshot.val();
      msg.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(msg)});
    });

  }

  enter(e) {
    //e.preventDefault();
    if (this.state.newMessage === ''){
      alert('Name of New Room cannot be empty');
    } else {
      this.messagesRef.push({
        content: this.state.newMessage,
        room: this.props.activeRoom.key,
      });
      this.setState({newMessage: ''})
    }
  }

    setMessage(msg) {
      this.props.changeMessage(msg);
    }

    handleChanges(e) {
      this.setState({newMessage: e.target.value});

    }

    removeMessage(msg) {
      this.messagesRef.child(msg.key).remove();

    }

  render() {
    return(
      <div>
        <ul>
          {this.state.messages.map( (message, index) =>
          <li key={index}>
            <p >{message.username}</p>
          </li>
        )}
        {this.state.messages.map ( (msg, index) => (
          <div key={index}>
            <button
            onClick={ () => this.setMessage(msg)}>{msg.content}</button>
            <button onClick={ () => this.removeMessage(msg)}></button>
            </div>
          )
      )}
          <div >
            <input
              type="text"
              placeholder="Chat"
              value={this.props.enter}
              onChange={this.handleChanges}
            />
            <br />
            <button onClick={this.enter}>Send</button>
            </div>
        </ul>
      </div>
    )
  }
}

export default MessageList;
