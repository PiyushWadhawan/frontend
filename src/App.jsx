import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Naavigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';

function App() {
  return (
    <Router>
      <MainNavigation/>
      <main>
        <Routes>
          <Route path='/' element={<Users/>}/>
          <Route path='/:userId/places' element={<UserPlaces/>}/>
          <Route path='/places/new' element={<NewPlace/>}/>
          <Route path='*' element={<Users/>}/>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
