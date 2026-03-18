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
        
        //Calculating closest pages
        const startPage = Math.max(1, currentPage -3); //Returns 4 previous page numbers unless they're lower then 1
        const endPage = Math.min(totalPages, currentPage +3); //Returns next 4 page numbers unless they're over the total

        //Pushing 4 previous and 4 upcoming pages into array
        const pageOptions = [];
        for(let i= startPage; i <= endPage; i++) {
            pageOptions.push(i)
        }

        return (
            <div className="paginationContainer">
                {/* Previous-button */}
                <button onClick={previousPage} disabled={currentPage === 1}>Previous</button>

                {/* Pages */}
                <ul>
                    {
                        pageOptions.map((pageNumber) => (
                            <li key={pageNumber} onClick={() => specificPage(pageNumber)} className={pageNumber === currentPage ? "activePage" : "page"}>{pageNumber}</li>
                        ))
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
