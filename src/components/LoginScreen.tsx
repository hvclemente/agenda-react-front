import { Box, Button, Container, TextField } from '@mui/material';
import { useState } from 'react';
import { signInEndpoint, IUser } from '../helpers/backend';

const errorStyle = {
  backgroundColor: 'rgb(253, 236, 234)',
  borderRadius: '4px',
  padding: '16px',
  margin: '16px 0',
};

interface ILoginScreenProps {
  onSignIn: (user: IUser) => void;
}

export default function LoginScreen(props: ILoginScreenProps) {
  const [email, setEmail] = useState('danilo@email.com');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState('');

  function signIn(evt: React.FormEvent) {
    evt.preventDefault();
    signInEndpoint(email, password).then(props.onSignIn, () => {
      setError('E-mail não encontrado ou senha incorreta!');
    });
  }

  return (
    <Container maxWidth='sm'>
      <h1>Agenda React</h1>
      <p>
        Digite e-mail e senha para entrar no sistema. Para testar, use o e-mail{' '}
        <kbd>danilo@email.com</kbd> e a senha <kbd>1234</kbd>.
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
        {error && <div style={errorStyle}>{error}</div>}
        <Box textAlign='right' marginTop='16px'>
          <Button type='submit' variant='contained'>
            Entrar
          </Button>
        </Box>
      </form>
    </Container>
  );
}

// value={event.date}
