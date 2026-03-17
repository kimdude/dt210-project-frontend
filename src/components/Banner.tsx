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
            <p>Find free computer games to enjoy playing.</p>
            <p><strong>Or help us recommend games!</strong></p>
            <Link to="/login" className="btn">Register</Link>
        </div>
    </div>
  )
}
