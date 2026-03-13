import { useState } from "react"
import useGet from "../hooks/useGet"

//Components
import { Filters } from "../components/Filters"
import { GameItem } from "../components/GameItem"

//Interfaces
import type { GameOverview } from "../types/GameTypes"

import "./GamesPage.css"

export const GamesPage = () => {

  //Hooks
  const { fetchData, data, loading, error } = useGet<GameOverview[]>("https://dt210g-project-backend-hapi.onrender.com/games");


  //Statates
  const [ displayFilters, setDisplayFilters ] = useState<boolean>(false);
  return (
    <section>

      {/* Search bar */}
      <div className="gameSearchContainer">
        <label htmlFor="searchBar"></label>
        <input type="text" id="searchBar" placeholder="Sök spel" />
        <button className="btn">Sök</button>
      </div>

      {/* All games */}
      <div className="gameTitle">
        <h1>Datorspel</h1>
        <small onClick={() => setDisplayFilters(!displayFilters)}>Filtrera</small>
      </div>

      {/* Filters */}
      {displayFilters && <Filters />}

      {/* Displaying games */}
      <div className="gamesGrid">
        {data && data.map((game, index) => (
          <GameItem key={game.id} game={game} />
        ))}
      </div>

      
    </section>
  )
}
