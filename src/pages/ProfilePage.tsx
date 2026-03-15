import { useAuth } from "../context/AuthContext"
import useGet from "../hooks/useGet";
import { useState } from "react";

import { Link } from "react-router-dom"
import PacmanLoader from "react-spinners/PacmanLoader"

import { ReviewItem } from "../components/ReviewItem";
import { PasswordForm } from "../components/PasswordForm";

import "./ProfilePage.css"
import type { ProfileReview } from "../types/ReviewTypes";
import type { List } from "../types/GameTypes";

export const ProfilePage = () => {

    //Hooks
    const { user, logout } = useAuth();
    const { fetchData: fetchReviews, error: reviewError, data: reviews, loading: loadingReviews } = useGet<ProfileReview[]>("https://dt210g-project-backend-hapi.onrender.com/profile/reviews", true);
    const { fetchData: fetchGames, error: gamesError, data: games, loading: loadingGames } = useGet<List>("https://dt210g-project-backend-hapi.onrender.com/saved", true);

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
                { games?.list ? 
                    games.list.map((game: any) => (
                        <p key={game.gameId}>{ game.name }</p>
                    )) 
                    : loadingGames ? <PacmanLoader color="#FEDE5D" className="spinner" />
                    : <small>Inga sparade spel</small>
                }
                <Link to="/" className="btn">Se hela listan</Link>
            </section>

            {/* List with shared reviews */}
            <section className="profileReviews">
                <h2>Dina recensioner</h2>
                { reviews.length > 0 ?
                    reviews.slice(0,3).map((review: any) => (
                        <ReviewItem key={review._id} review={review} />
                    )) 
                    : loadingReviews ?  <PacmanLoader color="#FEDE5D" className="spinner" />
                    : <small>Inga delade recensioner</small>
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
