import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props) {
    super(props);
    this.enter = this.enter.bind(this);
    this.handleChange = this.handleChange.bind(this);

      this.state = {
        username: "",
        content: "",
        sentAt: "",
        updatedTime: "",
        messages: [],
        newMessage: ""
      };
      this.messagesRef = this.props.firebase.database().ref('messages');//.orderByChild("roomID").equalTo(this.props.activeRoom());
      this.messagesRef.on('child_removed', snapshot => {
        this.setState({ messages: this.state.messages.filter( message => message.key !== snapshot.key ) })
      });
    }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      console.log(snapshot.val());
      let msg = snapshot.val();
      msg.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(msg)});
    });
  }

  enter(e) {
    e.preventDefault();
    if (this.state.newMessage === ''){
      alert('Name of New Room cannot be empty');
    } else {
      this.messagesRef.push({
        content: this.state.newMessage
      });
      this.setState({newMessage: ''})
      e.target.reset()
    }
  }

    setMessage(msg, e) {
      e.preventDefault();
      this.props.activeMessage(msg);
    }

    handleChange(e) {
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
            <p className="message-username">{message.username}</p>
          </li>
        )}
        {this.state.messages.map ( (msg, index) =>
        <a href={msg.content} key={index}>
          <li key={index}>
            <button onClick={ (e) => this.setMessage(msg, e)} onClick={ (e) => this.removeMessage(msg, e)}>{msg.content}&times;</button>
          </li>
        </a>
      )}
          <form onSubmit={this.enter}>
            <input
              type="text"
              placeholder="Chat"
              value={this.props.enter}
              onChange={this.handleChange}
            />
            <br />
            <input
              type='submit'
              value='Send'
             />
            </form>
        </ul>
      </div>
    )
  }
}

export default MessageList;
