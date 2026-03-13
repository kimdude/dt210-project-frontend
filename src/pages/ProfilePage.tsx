import { Link } from "react-router-dom"

export const ProfilePage = () => {
  return (
    <div>
        <div style={{textAlign: "center", margin: "50px 0px" }}>
            <h1>Välkommen!</h1>
            <p>Användarnamn: </p>
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
