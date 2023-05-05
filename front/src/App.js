import React, { useEffect } from 'react';
import { socket } from './webSockets/socket';
import {AutoComplete} from './components/AutoComplete';
import BasicList from './components/List';
import Button from '@mui/material/Button';  
import { BasicModal } from './components/Modal';
import { addSocketValue, removeSocketValue } from './webSockets/socket'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';





function App() {

  const [ INNs, setINNs ] = React.useState(initialINN)
  const [ isConnected, setIsConnected ] = React.useState( socket.connected );

  const ref = React.useRef(null)
  const modalRef = React.useRef(null)

  const removeInn = ( id, inn ) => {
    removeSocketValue( id, inn )
  }

  const updateRef = (str) => {
    ref.current = str
  }
  


  const addInn = (str) => {
    if( str.length ) {
      const cheArr = INNs.map( obj => obj.innStr )
      const isErr = Boolean(~cheArr.indexOf(+str))
      modalRef.current.isErr(isErr)
      modalRef.current.message( isErr ? 'Inn has already been declared': 'OK')
      addSocketValue( str )
      modalRef.current.handleOpen(true)
    }
  }
  
  React.useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessageEvent(value) {
      const newValue = JSON.parse(value)
      setINNs(newValue)
    }


    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessageEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessageEvent);
    };
  }, [])

  return (
    <main className='flex w-100 h-100 justify-between py-2'>
      <div className='search flex'>
        <AutoComplete 
          INNs={INNs} 
          updateRef={updateRef} />
        <Button 
          onClick={() => {addInn(ref.current)}}
          variant="contained" 
          sx={{
            maxHeight: 30,
            marginLeft: 3
          }}>Add</Button>
      </div>
      
      {
        isConnected ? <BasicList 
          INNs={INNs} 
          removeInn={removeInn} 
        /> : (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          )
        }
      <BasicModal 
        ref={modalRef} 
      />
    </main>
  );
}


const initialINN = [ // using for autocomplete ( for clarity )
  175601765422,   
  175601765422,   
  212279937981,   
  352119893737,   
  871688858942,   
  292186217387,   
  508658081779,   
  349391560270,   
  971159424841,   
  909766132012,   
  811798013812,   
  158084946182,   
  598703129612,   
  493993109742,   
  181394837188,   
  770019801230,   
  287050186153,   
  223613788714,   
  161897744138,   
  534166293503,   
  549562931722,   
  290488364812,   
  470866420894,   
  874799436390,   
  455964255927,   
  352596955608,   
  966746066214,   
  237740042714,   
  201011117744,   
  779510796931,   
  846170889634,
]

export default App;
