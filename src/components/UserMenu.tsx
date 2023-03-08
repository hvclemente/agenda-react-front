import { useContext, useState } from 'react';
import { IconButton, Avatar, Icon, Menu, MenuItem } from '@mui/material';
import { signOutEndpoint } from '../helpers/backend';
import { authContext } from '../helpers/authContext';

const userMenuStyling = {
  padding: '16px',
  flexDirection: 'column' as 'column',
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  borderBottom: '1px solid rgb(224,224,224)',
  marginBottom: '8px',
};

export default function UserMenu() {
  const {user, onSignOut} = useContext(authContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function signOut() {
    signOutEndpoint();
    onSignOut();
  }

  return (
    <div>
      <IconButton
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        aria-label='Usuário'
        onClick={handleClick}
      >
        <Avatar>
          <Icon>person</Icon>
        </Avatar>
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div style={userMenuStyling}>
          <Avatar>
            <Icon>person</Icon>
          </Avatar>
          <div>{user.name}</div>
          <small>{user.email}</small>
        </div>
        <MenuItem onClick={signOut}>Sair</MenuItem>
      </Menu>
    </div>
  );
}
