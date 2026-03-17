import { NavLink, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import logo from "../assets/logo.svg"

import "./Header.css"

export const Header = () => {
  const { user } = useAuth();

  return (
    <header>

      {/* Logo */}
      <Link to="/"><img src={logo} width="150" alt="Cheap Games" title="Till startsidan" /></Link>

      {/* Min nav */}
      <nav className="mainNav">
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/games">Games</NavLink></li>

          {
            user ? <li><NavLink to="/profile">Your profile</NavLink></li> : <li><NavLink to="/login">Login</NavLink></li>
          }
        </ul>
      </nav>
    </header>
  )
}
