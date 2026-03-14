import { useState } from "react"
import usePut from "../hooks/usePut";

import type { PasswordResponse } from "../types/UserTypes";
import type { PasswordFormErrors } from "../types/UserTypes";

export const PasswordForm = ({displayForm}: {displayForm: any}) => {

    //Hooks
    const { putData, error, data } = usePut<PasswordResponse>("https://dt210g-project-backend-hapi.onrender.com/profile");

    //States
    const [ password, setPassword ] = useState<string>("");
    const [ newPassword, setNewPassword ] = useState<string>("");
    const [ confirmPassword, setConfirmPassword ] = useState<string>("");
    const [ inputErrors, setInputErrors ] = useState<PasswordFormErrors>({});

    //Validate inputs
    const validate = () => {
        const validationErrors: PasswordFormErrors = {};

        if(password === "" || password.length < 8) {
            validationErrors.passwordErr = "Ange ditt nuvarande lösenord.";
        }

        if(newPassword.length < 8) {
            validationErrors.newPasswordErr = "Lösenordet måste vara över 8 tecken.";
        }

        if(confirmPassword !== newPassword) {
            validationErrors.confirmPasswordErr = "Lösenordet stämmer inte överens.";
        }

        return validationErrors;
    }

    //Changing password
    const changePassword = async(e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInputErrors({});

        //Validating inputs
        const validationErrors: PasswordFormErrors = validate();

        if(Object.keys(validationErrors).length > 0) {
            return setInputErrors(validationErrors);
        }

        await putData({ password: password, newPassword: newPassword });

        if(data) {
            setPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }

        console.log(data)

    }

    return (
        <form className="passwordForm" onSubmit={changePassword}>

            {/* Title */}
            <div className="passwordTitle">
                <h2>Byt lösenord</h2>
                <button type="button" onClick={() => displayForm(false)}>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <div>
                <label htmlFor="password"></label>
                <input type="password" name="password" id="password" placeholder="Ditt lösenord" value={password} onChange={(e) => setPassword(e.target.value)} />
                {inputErrors.passwordErr && <span className="error">{ inputErrors.passwordErr }</span>}
            </div>

            <div>
                <label htmlFor="newPassword"></label>
                <input type="password" name="newPassword" id="newPassword" placeholder="Nytt lösenord" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                {inputErrors.newPasswordErr && <span className="error">{ inputErrors.newPasswordErr }</span>}
            </div>

            <div>
                <label htmlFor="confirmPassword"></label>
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Bekräfta lösenord" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                {inputErrors.confirmPasswordErr && <span className="error">{ inputErrors.confirmPasswordErr }</span>}
            </div>

            {/* Submit button */}
            {error && <span className="error" style={{marginTop: "20px"}}>{ error }</span>}
            <input type="submit" className="btn" value="Byt lösenord" />
        </form>
    )
}
