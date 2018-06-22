import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.createRoom = this.createRoom.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      rooms: [],
      newRoomName: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.roomsRef.on('child_removed', snapshot => {
      this.setState({ rooms: this.state.rooms.filter( room => room.key !== snapshot.key ) })
    });
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
      console.log(room);
    });
  }

  createRoom(e) {
     e.preventDefault();
    if (this.state.newRoomName === ''){
      alert('Name of New Room cannot be empty');
    } else {
      this.roomsRef.push({
        name: this.state.newRoomName
      });
      this.setState({newRoomName: ''})

    }
  }

  setRoom(room, e) {
    //e.preventDefault();
    this.props.changeRoom(room);
  }


  handleChange(e) {
    this.setState({newRoomName: e.target.value});
  }

  removeRoom(room) {
    this.roomsRef.child(room.key).remove();
  }

  render() {
    return (
      <div>
        <ul className="list_of_room_names">
          {this.state.rooms.map( (room, index) => (
            <li key={index}>  </li>
          ))}
          <div>

            <input
              type="text"
              placeholder="Lair"
              value={this.props.createRoom}
              onChange={this.handleChange}
             />
             <br />
             <button onClick={this.createRoom} >
               Create room
              </button>
          </div>
          {this.state.rooms.map ( (room, index) => (

            <div key={index} >
              <button onClick={ () => this.setRoom(room) }>{ room.name }</button>
              <button onClick={ () => this.removeRoom(room) }>x</button>
            </div>
          )


        )}
        </ul>
      </div>
    );
  }
}

export default RoomList;
