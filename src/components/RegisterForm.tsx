import { useEffect, useState } from "react"

import type { LoginCredentials, PasswordResponse, UserFormErrors } from "../types/UserTypes"
import usePost from "../hooks/usePost";

export const RegisterForm = () => {

  //hooks
  const { postData, error, data, loading } = usePost<PasswordResponse>("https://dt210g-project-backend-hapi.onrender.com/user/register");

  //states
  const [ formData, setFormData ] = useState<LoginCredentials>({ username: "", displayName: "", password: ""});
  const [ errors, setErrors ] = useState<UserFormErrors>({});
  const [ message, setMessage ] = useState<string>("");

  //Updating message
  useEffect(() => {
    if(data?.message) {
      setMessage("You're registerd!");
      setFormData({ username: "", displayName: "", password: ""});
    }

  }, [data]);

  //Validating inputs
  const validate = () => {
    const validationErrors: UserFormErrors = {};

    if(formData.username.length < 4 || formData.username.length > 15 ) {
      validationErrors.usernameErr = "Username must be between 4-15 characters long.";
    }

    if(!formData.displayName || formData.displayName.length < 4 || formData.displayName.length >15 ) {
      validationErrors.displayNameErr = "Your visible name must be between 4-15 characters long.";
    }

    if(formData.password.length < 8) {
      validationErrors.passwordErr = "Password must be atleast 8 characters long.";
    }

    return validationErrors;
  }

  //Adding user
  const registerUser = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    //Validating
    const validationErrors = validate();

    if(Object.keys(validationErrors).length > 0) {
      return setErrors(validationErrors);
    }

    //Registering user
    await postData({username: formData.username, displayName: formData.displayName, password: formData.password});
    
  }

  return (
    <form className="loginContainer" onSubmit={registerUser}>
        <h1>Register</h1>
        <input type="text" name="usernameInp" id="usernameInp" aria-label="Username" placeholder="Username" value={ formData.username } onChange={(e) => setFormData({...formData, username: e.target.value})} />
        {errors.usernameErr && <span className="error">{ errors.usernameErr }</span>}

        <input type="text" name="displayNameInp" id="displayNameInp" aria-label="Visible name" placeholder="Visible name" value={ formData.displayName } onChange={(e) => setFormData({...formData, displayName: e.target.value})} />
        {errors.displayNameErr && <span className="error">{ errors.displayNameErr }</span>}

        <input type="password" name="passwordInp" id="passwordInp" aria-label="Password" placeholder="Password" value={ formData.password } onChange={(e) => setFormData({...formData, password: e.target.value})} />
        {errors.passwordErr && <span className="error">{ errors.passwordErr }</span>}

        { error && <span className="error">{ error }</span>}
        { message && <span className="confirm">{ message }</span>}
        <input type="submit" value="Register" className="btn" disabled={loading} />
    </form>
  )
}
