import { useEffect, useState } from "react"
import { GameItem } from "./GameItem";

import type { GameOverview } from "../types/GameTypes";

import "./pagination.css";

export const Pagination = ({data}: {data: GameOverview[]}) => {

    //States
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const contentPerPage: number = 15;

    //Resetting to page one after filtering
    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    //Go to next page
    const nextPage = () => {
        setCurrentPage(prevPage => prevPage +1);
    }

    //Go to previous page
    const previousPage = () => {
        setCurrentPage(prevPage => prevPage -1);
    }

    //Rendering games with pagination
    const renderGames = () => {
        const startIndex = (currentPage -1) * contentPerPage;
        const endIndex = startIndex + contentPerPage;
        const currentGames = data.slice(startIndex,endIndex);

        //Displaying games
        return (
            <div className="gamesGrid">
                {currentGames.map((game) => (
                    <GameItem key={game.id} game={game} />
                ))}
            </div>
        )
    }

    //Go to specific page
    const specificPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    // Rendering pagination controls
    const paginationControls = () => {

        const totalPages = Math.ceil(data.length / contentPerPage);

        return (
            <div className="paginationContainer">
                {/* Previous-button */}
                <button onClick={previousPage} disabled={currentPage === 1}>Previous</button>

                {/* Pages */}
                <ul>
                    {
                        Array.from({length: totalPages},
                            (_, index) => (
                                <li key={index} onClick={() => specificPage(index +1)} className={index +1 === currentPage ? "activePage" : "page"}>{ index +1 }</li>
                            )
                        )
                    }
                </ul>

                {/* Next button */}
                <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        )

    }
  return (
    <div>
        {renderGames()}
        {paginationControls()}
    </div>
  )
}
