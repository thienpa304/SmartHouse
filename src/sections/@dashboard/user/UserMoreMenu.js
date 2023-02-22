import { useRef, useState } from 'react'
// material
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
// component
import Iconify from '../../../components/Iconify'

// ----------------------------------------------------------------------

export default function UserMoreMenu(props) {

  const {onEdit, onDelete, onDeleted, onEdited} = props;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOnClick = (callback) => event =>{
    onDeleted()
    setIsOpen(false)
    callback(event)
     
  }
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleOnClick(onDelete?onDelete:()=>{})}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={onEdited} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
