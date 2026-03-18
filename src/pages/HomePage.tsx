import { Banner } from "../components/Banner"
import { Link } from "react-router-dom"
import useGet from "../hooks/useGet"
import type { GameOverview } from "../types/GameTypes";
import { GameItem } from "../components/GameItem";
import { PacmanLoader } from "react-spinners";

export const HomePage = () => {

  const { data: popularGames, error: errorPopularGames, loading: loadingPopularGames } = useGet<GameOverview[]>("https://dt210g-project-backend-hapi.onrender.com/games?sortBy=popularity");
  const { data: releasedGames, error: errorReleasedGames, loading: loadingReleasedGames } = useGet<GameOverview[]>("https://dt210g-project-backend-hapi.onrender.com/games?sortBy=release-date");

  return (
    <div>
      <Banner />

      {/* Top 10 games */}
      <section>
        <h1>Top games</h1>

        {/* Listing games */}
        <div className="gamesGrid">
          { popularGames && popularGames.slice(0,6).map((game) => (
              <GameItem key={game.id} game={game} />
            ))
          }        
        </div>

        {/* Spinner */}
        {loadingPopularGames && <PacmanLoader color="#FEDE5D" className="spinner" />}

        {/* Error */}
        {errorPopularGames && <p>{ errorPopularGames }</p>}
      </section>

      {/* Latest released games */}
      <section>
        <h1>Latest releases</h1>

        {/* Listing games */}
        <div className="gamesGrid">
          { releasedGames && releasedGames.slice(0,6).map((game) => (
              <GameItem key={game.id} game={game} />
            ))
          }

          {/* Spinner */}
          {loadingReleasedGames && <PacmanLoader color="#FEDE5D" className="spinner" />}

          {/* Error */}
          {errorReleasedGames && <p>{ errorReleasedGames }</p>}
        </div>

      </section>
      <Link to ="/games" className="btn">All games</Link>
    </div>
  )
}
