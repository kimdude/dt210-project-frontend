import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export const ProfilePage = () => {

    const { user } = useAuth();

    return (
        <div>
            <div style={{textAlign: "center", margin: "50px 0px" }}>
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

        </div>
    )
}
