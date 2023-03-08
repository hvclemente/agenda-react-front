import CalendarScreen from '../components/CalendarScreen';
import LoginScreen from '../components/LoginScreen';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { getToday } from '../helpers/dateFunctions';
import { useEffect, useState } from 'react';
import { getUserEndpoint, IUser } from '../helpers/backend';
import { userContext, signOutContext } from '../helpers/authContext';

function App() {
  const month = getToday().substring(0, 7);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserEndpoint().then(setUser, () => setUser(null));
  }, []);

  if (user) {
    return (
      <userContext.Provider value={user}>
        <signOutContext.Provider value={() => setUser(null)}>
      <Router>
        <Routes>
          <Route
            path='/calendar/:month'
            element={
              <CalendarScreen />
            }
          />
          <Route
            path='/'
            element={
              <Navigate replace to={{ pathname: '/calendar/' + month }} />
            }
          />
        </Routes>
      </Router>
      </signOutContext.Provider>
      </userContext.Provider>
    );
  } else {
    return <LoginScreen onSignIn={setUser} />;
  }
}

export default App;
