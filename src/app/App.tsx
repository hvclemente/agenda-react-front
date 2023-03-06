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
import { getUserEndpoint } from '../helpers/backend';

function App() {
  const month = getToday().substring(0, 7);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    getUserEndpoint().then(
      () => setHasSession(true),
      () => setHasSession(false)
    );
  }, []);

  if (hasSession) {
    return (
      <Router>
        <Routes>
          <Route path='/calendar/:month' element={<CalendarScreen />} />
          <Route
            path='/'
            element={
              <Navigate replace to={{ pathname: '/calendar/' + month }} />
            }
          />
        </Routes>
      </Router>
    );
  } else {
    return <LoginScreen />;
  }
}

export default App;
