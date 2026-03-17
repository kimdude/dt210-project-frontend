import { useAuth } from "../context/AuthContext"
import useGet from "../hooks/useGet";
import { useState } from "react";

import { useNavigate } from "react-router-dom"
import PacmanLoader from "react-spinners/PacmanLoader"

import { ReviewItem } from "../components/ReviewItem";
import { PasswordForm } from "../components/PasswordForm";

import "./ProfilePage.css"
import type { ProfileReview } from "../types/ReviewTypes";
import type { List } from "../types/GameTypes";
import { ListItem } from "../components/ListItem";

export const ProfilePage = () => {

    //Hooks
    const { user, logout } = useAuth();
    const { fetchData: fetchReviews, error: reviewError, data: reviews, loading: loadingReviews } = useGet<ProfileReview[]>("https://dt210g-project-backend-hapi.onrender.com/profile/reviews", true);
    const { fetchData: fetchGames, error: gamesError, data: games, loading: loadingGames } = useGet<List>("https://dt210g-project-backend-hapi.onrender.com/saved", true);
    const navigate = useNavigate();

    //States
    const [ displaySettings, setDisplaySettings ] = useState<boolean>(false);

    return (
        <div>
            {/* Settings */}
            <nav className="profileSettings">
                <li className="spanBtn" onClick={() => setDisplaySettings(!displaySettings)}>Change password</li>
                <li className="spanBtn" onClick={() => logout()}>Log out</li>
            </nav>

            <div className="profileTitle">
                <h1>Welcome { user?.displayName }!</h1>
                <p>Username: <strong>{ user?.username }</strong></p>
            </div>

            {/* List with saved games */}
            <section className="profileSaved">
                <div>
                    <h2>Saved games</h2>
                    <small>Total: { games?.list ? games?.list?.length : 0 }</small>
                </div>
                { games?.list ? 
                    games.list.slice(0,3).map((game: any) => (
                        <ListItem key={game.gameId} game={game} updateList={fetchGames} />
                    )) 
                    : loadingGames ? <PacmanLoader color="#FEDE5D" className="spinner" />
                    : <small>No saved games</small>
                }

                {/* Navigating to list-page and sending title + type */}
                <button className="btn" onClick={() => navigate("/details/saved-games",{ state: { title: "Saved games", type: "Your profile" }})}>See all</button>
            </section>

            {/* List with shared reviews */}
            <section className="profileReviews">
                <div>
                    <h2>Your reviews</h2>
                    <small>Total: { reviews?.length }</small>
                </div>
                { reviews.length > 0 ?
                    reviews.slice(0,3).map((review: any) => (
                        <ReviewItem key={review._id} review={review} updateList={fetchReviews} />
                    )) 
                    : loadingReviews ?  <PacmanLoader color="#FEDE5D" className="spinner" />
                    : <small>No shared reviews</small>
                }
          
                {/* Navigating to list-page and sending title + type */}
                <button className="btn" onClick={() => navigate("/details/shared-reviews",{ state: { title: "Your reviews", type: "Your profile" }})}>See all</button>
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
