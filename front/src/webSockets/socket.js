import { io } from 'socket.io-client';
export const socket = io('ws://localhost:8080');

export const removeSocketValue = ( id, inn ) => {
  const value = {
    "type": "delete",
    "payload": {
        "innStr": inn,
        "id": id
    }
  }
  socket.timeout(5000).emit('message', value, () => {
    console.log('somet')
  });
}

export const addSocketValue = ( str ) => {
  const value = {
    "type": "create",
    "payload": {
        "innStr": str
    }
  }
  socket.timeout(5000).emit('message', value, () => {
    console.log('somet')
  });
}