import { useState } from "react"
import { LoginForm } from "../components/LoginForm"
import { RegisterForm } from "../components/RegisterForm"

import "./LoginPage.css"

export const LoginPage = () => {

  const [ form, setForm ] = useState<string>("login");

  return (
    <div className="loginContainer">

      {/* Login/register buttons */}
      <div className="loginNav">
        <button onClick={() => setForm("login")} style={{backgroundColor: form === "login" ? "#F2F1EF" : "#b9b8b6" }}>Login</button>
        <button onClick={() => setForm("register")} style={{backgroundColor: form === "login" ? "#b9b8b6" : "#F2F1EF" }}>Register</button>
      </div>

      {/* Form container */}
      <div className="loginForms">
        {form === "login" && <LoginForm />}
        {form === "register" && <RegisterForm />}
      </div>
    </div>
  )
}
