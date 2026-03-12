
export const RegisterForm = () => {
  return (
    <form className="loginContainer">
        <h1>Registrera dig</h1>
        <label htmlFor="usernameInp"></label>
        <input type="text" name="usernameInp" id="usernameInp" placeholder="Användarnamn" />

        <label htmlFor="displayNameInp"></label>
        <input type="text" name="displayNameInp" id="displayNameInp" placeholder="Synligt namn" />

        <label htmlFor="passwordInp"></label>
        <input type="password" name="passwordInp" id="passwordInp" placeholder="Lösenord" />

        <input type="submit" value="Registrera dig" className="btn" />
    </form>
  )
}
