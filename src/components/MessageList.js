import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props) {
    super(props);


      this.state = {
        messages: [],
        newMessage: "",
      };

      this.createNewMessage = this.createNewMessage.bind(this);
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
      console.log(msg);
      this.setState({ messages: this.state.messages.concat(msg)});
    });

  }

  createNewMessage(e) {
    //e.preventDefault();
    if (this.state.newMessage === ''){
      alert('Message cannot be empty');
    } else {
      this.messagesRef.push({
        content: this.state.newMessage,
        roomId: this.props.activeRoom.key,
        sentAt: "",
        userName: "",
      });
      this.setState({newMessage: ""})
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
        <h2>{this.props.activeRoom.name}</h2>
        <ul>
        {this.state.messages.filter((message)=>
          message.roomId === this.props.activeRoom.key
        ).map((msg, index) => (
          <div key={index}>
            <button>{msg.content}</button>
            <button onClick={ () => this.removeMessage(msg)}></button>
          </div>
          )
      )}
          <div>
            <input
              type="text"
              placeholder="Chat"
              value={this.state.newMessage}
              onChange={this.handleChanges}
            />
            <br />
            <button onClick={this.createNewMessage}>Send</button>
            </div>
        </ul>
      </div>
    )
  }
}

export default MessageList;
