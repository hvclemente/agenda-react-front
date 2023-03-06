import { Box, Button, Container, TextField } from '@mui/material';
import { useState } from 'react';

function signIn(evt: React.FormEvent) {
  evt.preventDefault();
}

export default function LoginScreen() {
  const [email, setEmail] = useState('danilo@mail.com');
  const [password, setPassword] = useState('1234');

  return (
    <Container maxWidth='sm'>
      <h1>Agenda React</h1>
      <p>
        Digite e-mail e senha para entrar no sistema. Para testar, use o e-mail{' '}
        <kbd>danilo@mail.com</kbd> e a senha <kbd>1234</kbd>.
      </p>
      <form onSubmit={signIn}>
        <TextField
          margin='normal'
          label='E-mail'
          fullWidth
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <TextField
          margin='normal'
          type='password'
          label='Senha'
          fullWidth
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <Box textAlign='right' marginTop='16px'>
          <Button variant='contained'>Entrar</Button>
        </Box>
      </form>
    </Container>
  );
}

// value={event.date}
