import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import { io } from 'socket.io-client';
const socket = io('http://127.0.0.1:5000');
export default function Index() {
  useEffect(() => {
    navigate('/extra-components/accordion');
  }),
    [];
  return <div />;
}
