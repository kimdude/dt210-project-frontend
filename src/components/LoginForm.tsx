
export const LoginForm = () => {
  return (
    <form className="loginContainer">
        <h1>Logga in</h1>
        <label htmlFor="usernameInp"></label>
        <input type="text" name="usernameInp" id="usernameInp" placeholder="Användarnamn" />

        <label htmlFor="passwordInp"></label>
        <input type="password" name="passwordInp" id="passwordInp" placeholder="Lösenord" />

        <input type="submit" value="Logga in" className="btn" />
    </form>
  )
}
