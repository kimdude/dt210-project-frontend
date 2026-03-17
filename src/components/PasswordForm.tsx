import { useEffect, useState } from "react";
import usePut from "../hooks/usePut";

import type { PasswordResponse } from "../types/UserTypes";
import type { PasswordFormErrors } from "../types/UserTypes";

export const PasswordForm = ({displayForm}: {displayForm: any}) => {

    //Hooks
    const { putData, error, data, loading } = usePut<PasswordResponse>("https://dt210g-project-backend-hapi.onrender.com/profile");

    //States
    const [ password, setPassword ] = useState<string>("");
    const [ newPassword, setNewPassword ] = useState<string>("");
    const [ confirmPassword, setConfirmPassword ] = useState<string>("");
    const [ inputErrors, setInputErrors ] = useState<PasswordFormErrors>({});
    const [ message, setMessage ] = useState<string>("");

    //Resetting data on success
    useEffect(() => {

        if(data) {
            setMessage("Password has been updated!");

            setPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }

    }, [data]);

    //Validate inputs
    const validate = () => {
        const validationErrors: PasswordFormErrors = {};

        if(password === "" || password.length < 8) {
            validationErrors.passwordErr = "Current password required.";
        }

        if(newPassword.length < 8) {
            validationErrors.newPasswordErr = "New password must be atleast 8 characters long.";
        }

        if(confirmPassword !== newPassword) {
            validationErrors.confirmPasswordErr = "Password doesn't match new password.";
        }

        return validationErrors;
    }

    //Changing password
    const changePassword = async(e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInputErrors({});
        setMessage("");

        //Validating inputs
        const validationErrors: PasswordFormErrors = validate();

        if(Object.keys(validationErrors).length > 0) {
            return setInputErrors(validationErrors);
        }

        //Updating password
        await putData({ password: password, newPassword: newPassword });

    }

    return (
        <form className="passwordForm" onSubmit={changePassword}>

            {/* Title */}
            <div className="passwordTitle">
                <h2>Change password</h2>
                <button type="button" onClick={() => displayForm(false)} aria-label="Close" title="Close">
                    <span></span>
                    <span></span>
                </button>
            </div>

            <div>
                <input type="password" name="password" id="password" aria-label="Current password" placeholder="Current password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {inputErrors.passwordErr && <span className="error">{ inputErrors.passwordErr }</span>}
            </div>

            <div>
                <input type="password" name="newPassword" id="newPassword" aria-label="New password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                {inputErrors.newPasswordErr && <span className="error">{ inputErrors.newPasswordErr }</span>}
            </div>

            <div>
                <input type="password" name="confirmPassword" id="confirmPassword" aria-label="Confirm password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                {inputErrors.confirmPasswordErr && <span className="error">{ inputErrors.confirmPasswordErr }</span>}
            </div>

            {/* Submit button */}
            {error && <span className="error" style={{marginTop: "20px"}}>{ error }</span>}
            { message && <span className="confirm">{ message }</span>}
            <input type="submit" className="btn" value="Update" disabled={loading} />
        </form>
    )
}
