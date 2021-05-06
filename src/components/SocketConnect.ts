import { Component } from 'react';
import { io } from 'socket.io-client';

export namespace socketConnector {
  function coinnect() {
    const socket = io('https//127.0.0.1:5000');
    socket.on('connect', () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
  }
}

class WebSocket extends Component {
  constructor(props: any) {
    super(props);
  }
}
