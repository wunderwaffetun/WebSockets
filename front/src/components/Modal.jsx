import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const BasicModal = React.forwardRef(function BasicModalIn(props, ref) {
  const [open, setOpen] = React.useState(false);
  const [ isErr, setIsErr ] = React.useState(false)
  const [ message, setMessage ] = React.useState('')

  const handleClose = () => setOpen(false);

  React.useImperativeHandle(ref, () => { // Возвращает функцию в родительский компонент, которая менет state в дочернем
    // отличается от обновления пропсов большей производительностью
    return {
      handleOpen: () => {setOpen(true)},
      isErr: (value) => { setIsErr(value) },
      message: (value) => { setMessage(value) },
    }
  })

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography 
            id="modal-modal-title" 
            variant="h6" 
            component="h2">
              Status
          </Typography>
          <Typography 
            id="modal-modal-description" 
            sx={{ mt: 2, color: `${isErr? 'red': 'green'}` }}>
              {message}  
          </Typography>
        </Box>
      </Modal>
    </div>
  );
})
