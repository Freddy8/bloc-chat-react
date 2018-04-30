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
      e.target.reset()
    }
  }

  handleChange(e) {
    this.setState({newRoomName: e.target.value});
  }

  render() {
    return (
      <div>
        <ul className="list_of_room_names">
          {this.state.rooms.map( (room, index) => (
            <li key={index}> {room.name} </li>
          ))}
          <form onSubmit={this.createRoom}>

            <input
              type="text"
              placeholder="Lair"
              onChange={this.handleChange}
             />
             <br />
             <input
               type='submit'
               value='Create room'
              />
          </form>

        </ul>
      </div>
    );
  }
}

export default RoomList;
