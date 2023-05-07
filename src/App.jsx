import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Naavigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import { useCallback, useEffect, useState } from 'react';

let logoutTimer;

function App() {

  const [token, setToken] = useState(false)
  const [tokenExpirationDate, setTokenExpirationData] = useState();
  const [userId, setUserId] = useState(false)

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token)
    setUserId(uid)
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
    setTokenExpirationData(tokenExpirationDate)
    // storing on browser inbuilt storage called local storage so we don't loose authentication if we refresh the page
    localStorage.setItem('userData', JSON.stringify({
      userId: uid, 
      token: token, 
      expiration: tokenExpirationDate.toISOString()
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setTokenExpirationData(null)
    setUserId(null)
    // removing the data stored in browser storage so we stay logged out on refreshing the page
    localStorage.removeItem('userData')  
  }, [])

  useEffect(() => {
    if(token && tokenExpirationDate) {
      const remainingTine = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTine);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if(
      storedData && 
      storedData.token && 
      new Date(storedData.expiration) > new Date()
      ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration))
    }
  }, [login])

  let routes;

  if(token) {
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
    <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout }}>
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
