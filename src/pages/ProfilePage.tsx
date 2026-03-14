import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import useGet from "../hooks/useGet";
import { PasswordForm } from "../components/PasswordForm";
import { useState } from "react";

import "./ProfilePage.css"
import { ReviewItem } from "../components/ReviewItem";
import type { Review } from "../types/ReviewTypes";
import type { List } from "../types/GameTypes";

export const ProfilePage = () => {

    //Hooks
    const { user, logout } = useAuth();
    const { fetchData: fetchReviews, error: reviewError, data: reviews } = useGet<Review[]>("https://dt210g-project-backend-hapi.onrender.com/profile/reviews", true);
    const { fetchData: fetchGames, error: gamesError, data: games } = useGet<List>("https://dt210g-project-backend-hapi.onrender.com/saved", true);

    //States
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
                { games?.list && 
                    games.list.map((game: any) => (
                        <p key={game.gameId}>{ game.name }</p>
                    ))
                }
                <Link to="/" className="btn">Se hela listan</Link>
            </section>

            {/* List with shared reviews */}
            <section className="profileReviews">
                <h2>Dina recensioner</h2>
                { reviews && 
                    reviews.map((review: any) => (
                        <p key={review.id}>{ review.title }</p>
                    ))
                }
          
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
