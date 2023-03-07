import { IconButton, Avatar, Icon } from '@mui/material';

export default function UserMenu() {
  return (
    <IconButton aria-label='Avatar do usuário'>
      <Avatar>
        <Icon>person</Icon>
      </Avatar>
    </IconButton>
  );
}
