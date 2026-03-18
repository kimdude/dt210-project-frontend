import { NavLink, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import logo from "../assets/logo.svg"

import "./Header.css"
import { useEffect, useState } from "react"

export const Header = () => {

  const screenWidth = screen.width;

  //States
  const [ smallScreen, setSmallScreen ] = useState<boolean>(false);
  const [ displayNav, setDisplayNav ] = useState<boolean>(true);

  //Hooks
  const { user } = useAuth();

  //Listening to screensize
  useEffect(() => {

    if(screenWidth < 640) {
      setSmallScreen(true);
      setDisplayNav(false);
    } else {
      setSmallScreen(false);
      setDisplayNav(true);
    }

  }, [screenWidth]);

  return (
    <header>

      {/* Logo */}
      <Link to="/"><img src={logo} width="150" alt="Cheap Games" title="Till startsidan" /></Link>

      {/* Responsive nav-open button */}
      <button className="openBtn white" aria-label="Open navigation" style={{display: !displayNav ? "block" : "none"}} onClick={() => setDisplayNav(!displayNav)}>
        <span className="span1"></span>
        <span className="span2"></span>
        <span className="span3"></span>
      </button>

      {/* Responsive nav-close button */}
      <button className="crossBtn white" aria-label="Close navigation" style={{display: displayNav && smallScreen  ? "block" : "none"}} onClick={() => setDisplayNav(!displayNav)}>
        <span className="span1"></span>
        <span className="span2"></span>
      </button>

      {/* Min nav */}
      {
        displayNav &&
        <nav className="mainNav">
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/games">Games</NavLink></li>

            {
              user ? <li><NavLink to="/profile">Your profile</NavLink></li> : <li><NavLink to="/login">Login</NavLink></li>
            }
          </ul>
        </nav>
      }

    </header>
  )
}
