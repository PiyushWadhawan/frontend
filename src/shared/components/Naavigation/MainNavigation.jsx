import React, { useState } from 'react'
import "./MainNavigation.css"
import MainHeader from './MainHeader'
import { Link } from 'react-router-dom'
import NavLinks from './NavLinks'
import SideDrawer from './SideDrawer'
import Backdrop from '../UIElements/Backdrop'

const MainNavigation = (props) => {

    const [drawerIsOpen, setDrawerIsOper] = useState(false)

    const openDrawerHandler = () => {
        setDrawerIsOper(true)
    }

    const closeDrawerHandler = () => {
        setDrawerIsOper(false)
    }

  return (
    <>
    {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}
        <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
            <nav className="main-navigation__drawer-nav">
                <NavLinks/>
            </nav>
        </SideDrawer>

    <MainHeader>
        <button className='main-navigation__menu-btn' onClick={openDrawerHandler}>
            <span/>
            <span/>
            <span/>
        </button>
        <h1 className="main-navigation__title">
            <Link to="/">PlaceKeep</Link>
        </h1>
        <nav className='main-navigation__header-nav'>
            <NavLinks/>
        </nav>
    </MainHeader>
    </>
  )
}

export default MainNavigation
