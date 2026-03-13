import type { GameOverview } from "../types/GameTypes"
import { useNavigate } from "react-router-dom"

import platformIcon from "../assets/platformIcon.svg"
import devIcon from "../assets/devIcon.svg"

import "./GameItem.css"

export const GameItem = ({game}: {game: GameOverview}) => {

  const navigate = useNavigate();

  return (
    <article className="gameOverview" style={{ backgroundImage: `url(${game.thumbnail})` }} onClick={() => navigate("/details/" + game.id)}>
      <div>

        {/* Category */}
        <div className="gameOverviewCategory">
          <p>{ game.genre }</p>
        </div>

        {/* Short description of game */}
        <div className="gameOverviewDescr">
            <h2>{ game.title }</h2>
            <p className="gameOverviewDate">Utgivningsår: { game.release_date }</p>
            <p>{ game.short_description }</p>
        </div>

        {/* Game info */}
        <div className="gameOverviewDev">
          <div>
            <img src={platformIcon} alt="Plattform" width="15" />
            <p>{ game.platform }</p>
          </div>

          <div>
            <img src={devIcon} alt="Utvecklare" width="15" />
            <p>{ game.developer }</p>
          </div>
        </div>
      </div>
    </article>
  )
}
