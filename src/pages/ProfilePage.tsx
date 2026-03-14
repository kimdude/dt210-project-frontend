import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

import "./ProfilePage.css"
import { PasswordForm } from "../components/PasswordForm";
import { useState } from "react";

export const ProfilePage = () => {

    //Userinfo
    const { user, logout } = useAuth();

    //Hooks
    const [ displaySettings, setDisplaySettings ] = useState<boolean>(false);

    return (
        <div>
            {/* Settings */}
            <nav className="profileSettings">
                <li className="spanBtn" onClick={() => setDisplaySettings(!displaySettings)}>Byt lösenord</li>
                <li className="spanBtn" onClick={() => logout()}>Logga ut</li>
            </nav>

            <div className="profileTitle">
                <h1>Välkommen { user?.displayName }!</h1>
                <p>Användarnamn: <strong>{ user?.username }</strong></p>
            </div>

            {/* List with saved games */}
            <section className="profileSaved">
                <h2>Sparade spel</h2>
                <Link to="/" className="btn">Se hela listan</Link>
            </section>

            {/* List with shared reviews */}
            <section className="profileReviews">
                <h2>Dina recensioner</h2>
                <Link to="/" className="btn">Se hela listan</Link>
            </section>

            {/* Editing password */}
            { displaySettings &&
                <section id="profilePassword">
                    <PasswordForm displayForm={setDisplaySettings} />
                </section>
            }
        </div>
    )
}
