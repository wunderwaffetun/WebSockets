import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

function findDublicates ( arr ) {
  arr = arr.map( obj => obj.innStr )
  const setArr = new Set( arr )
  const dubles = arr.filter( item => {
    if ( setArr.has(item) ) {
      setArr.delete( item )
    } else {
      return item
    }
  })
  return dubles
}

export default function BasicList( {INNs, removeInn} ) {
  console.log(INNs)
  const [ duples, setDuples ] = React.useState([])

  React.useEffect( ( ) => {
    console.log(INNs)
    setDuples( findDublicates(INNs) )
  }, [INNs])

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    
      <nav aria-label="secondary mailbox folders">
        <div>Inn</div>
        <List sx={{
          overflowY: 'scroll',
          maxHeight: 300
        }}>
          
          {
            INNs.map( (obj, index) => {
              return (
                <ListItem disablePadding key={Math.random()}>
                  <ListItemButton
                    focusVisibleClassName={false}
                    selected={false}
                    dense={false}
                  >

                    <ListItemText primary={`${obj.innStr}`} sx={{
                      color: `${ duples.indexOf(obj.innStr) !== -1 ? 'red': 'black' }`
                    }} />
                    <IconButton>
                      <DeleteIcon onClick={
                        () => {
                          removeInn(obj._id, obj.innStr)
                        }
                      } />
                    </IconButton>
                  </ListItemButton>
                </ListItem>
              )
            } )
          }
        </List>
      </nav>
    </Box>
  );
}

