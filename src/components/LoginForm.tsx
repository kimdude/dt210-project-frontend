import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import type { UserFormErrors } from "../types/UserTypes";

export const LoginForm = () => {

  //States
  const [ username, setUsername ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ errors, setErrors ] = useState<UserFormErrors>({});

  //Hooks
  const { login, user } = useAuth();
  const navigate = useNavigate();

  //Validating user
  useEffect(() => {
    if(user) {
      navigate("/profile");
    }
  }, [user]);


  //Validating inputs
  const validateInputs = () => {
    let validationErrors: UserFormErrors = {};

    if(username === "" || username.length < 4) {
      validationErrors.usernameErr = "Ange användarnamn.";
    }

    if(password === "" || password.length < 8) {
      validationErrors.passwordErr = "Ange lösenord.";
    }

    return validationErrors;

  }

  //Submitting
  const submit = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    //Validating inputs
    const validationErrors: UserFormErrors = validateInputs();

    if(Object.keys(validationErrors).length > 0) {
      return setErrors(validationErrors);
    }

    //Logging in
    try {
      await login({username, password});
    } catch(error) {
      setErrors(prev => ({...prev, loginErr: "Inloggning misslyckades. Kontrollera användarnamn och lösenord."}));
      console.log(errors)
    }
  }

  return (
    <form className="loginContainer" onSubmit={submit}>
        <h1>Logga in</h1>
        <label htmlFor="usernameInp"></label>
        <input type="text" name="usernameInp" id="usernameInp" placeholder="Användarnamn" value={username} onChange={(e) => setUsername(e.target.value)} />
        { errors.usernameErr && <span className="error">{errors.usernameErr}</span>}

        <label htmlFor="passwordInp"></label>
        <input type="password" name="passwordInp" id="passwordInp" placeholder="Lösenord" value={password} onChange={(e) => setPassword(e.target.value)} />
        { errors.passwordErr && <span className="error">{errors.passwordErr}</span>}

        { errors.loginErr && <span className="error">{errors.loginErr}</span>}
        <input type="submit" value="Logga in" className="btn" />
    </form>
  )
}
