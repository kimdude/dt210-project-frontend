import { NavLink, Link } from "react-router-dom"
import logo from "../assets/logo.svg"

import "./Header.css"

export const Header = () => {
  return (
    <header>

      {/* Logo */}
      <Link to="/"><img src={logo} width="150" alt="Cheap Games" title="Till startsidan" /></Link>

      {/* Min nav */}
      <nav className="mainNav">
        <ul>
          <li><NavLink to="/">Hem</NavLink></li>
          <li><NavLink to="/games">Spel</NavLink></li>
          <li><NavLink to="/profile">Din profil</NavLink></li>
          <li><NavLink to="/login">Logga in</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}
