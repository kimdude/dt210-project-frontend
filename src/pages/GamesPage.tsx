import { Filters } from "../components/Filters"

import "./GamesPage.css"

export const GamesPage = () => {
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
        <small>Filtrera</small>
      </div>

      {/* Filters */}
      <Filters />
      
    </section>
  )
}
