import CalendarScreen from '../components/CalendarScreen';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { getToday } from '../helpers/dateFunctions';

function App() {
  const month = getToday().substring(0, 7);
  return (
    <Router>
      <Routes>
        <Route path='/calendar/:month' element={<CalendarScreen />} />
        <Route
          path='/'
          element={<Navigate replace to={{ pathname: '/calendar/' + month }} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
