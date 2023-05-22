import React from 'react'
import "./NavLinks.css"
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth-context'

const NavLinks = () => {

    const auth = useContext(AuthContext)

  return (
    <ul className="nav-links" >
        <li>
            <NavLink to="/">ALL USERS</NavLink>
        </li>
        {auth.isLoggedIn && (
            <li>
                <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <NavLink to="/places/new">ADD PLACE</NavLink>
            </li>
        )}
        {!auth.isLoggedIn && (
            <li>
                <NavLink to="/auth">Sign Up</NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <button onClick={auth.logout}>LOGOUT</button>
            </li>
        )}
    </ul>
  )
}

export default NavLinks
