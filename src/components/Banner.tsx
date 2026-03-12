import { Link } from "react-router-dom"
import logo from "../assets/logo.svg"

import "./Banner.css"

export const Banner = () => {
  return (
    <div className="banner">

        {/* Logo */}
        <div className="bannerLogo">
            <img src={logo} alt="Cheap Games" />
        </div>

        {/* Intro text */}
        <div>
            <p>Hitta kostnadsfria datorspel som passar dig.</p>
            <p><strong>Eller var med och rekommendera spel!</strong></p>
            <Link to="/login" className="btn">Registrera dig</Link>
        </div>
    </div>
  )
}
