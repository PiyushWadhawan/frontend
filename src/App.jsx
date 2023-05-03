import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Naavigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import { useCallback, useState } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(false)

  const login = useCallback((uid) => {
    setIsLoggedIn(true)
    setUserId(uid)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setUserId(null)
  }, [])

  let routes;

  if(isLoggedIn) {
    routes = (
      <>
        <Route path='/' element={<Users/>}/>
        <Route path='/:userId/places' element={<UserPlaces/>}/>
        <Route path='/places/new' element={<NewPlace/>}/>
        <Route path='/places/:placeId' element={<UpdatePlace/>}/>
        <Route path='*' element={<Users/>}/>
      </>
    )
  } else {
    routes = (
      <>
        <Route path='/' element={<Users/>}/>
        <Route path='/:userId/places' element={<UserPlaces/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='*' element={<Auth/>}/>
      </>
    )
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout }}>
      <Router>
        <MainNavigation/>
        <main>
          <Routes>
            {routes}
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
