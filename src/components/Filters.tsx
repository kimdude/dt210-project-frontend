import { useState, type Dispatch, type SetStateAction } from "react";
import "./Filter.css"

export const Filters = ({setQuery, toggleFilter}: {setQuery: any, toggleFilter: Dispatch<SetStateAction<boolean>> }) => {

    const allCategories: string[] = ["mmorpg", "shooter", "strategy", "moba", "racing", "sports", "social", "sandbox", "open-world", "survival", "pvp", "pve", "pixel", "voxel", "zombie", "turn-based", "first-person", "third-Person", "top-down", "tank", "space", "sailing", "side-scroller", "superhero", "permadeath", "card", "battle-royale", "mmo", "mmofps", "mmotps", "3d", "2d", "anime", "fantasy", "sci-fi", "fighting", "action-rpg", "action", "military", "martial-arts", "flight", "low-spec", "tower-defense", "horror", "mmorts"];
    const allPlatforms: string[] = ["pc", "browser"];

    //States
    const [ filterCat, setFilterCat ] = useState<string>("all");
    const [ filterPlat, setFilterPlat ] = useState<string>("all");

    //Setting filters
    const setFilters = async(e: any) => {
        e.preventDefault();

        //Setting queries
        if(filterCat !== "all" && filterPlat !== "all") {
            setQuery("?platform=" + filterPlat + "&category=" + filterCat);

        } else if(filterPlat !== "all") {
            setQuery("?platform=" + filterPlat);

        } else if(filterCat !== "all") {
            setQuery("?category=" + filterCat);
            
        } else {
            setQuery("");
        }

        toggleFilter(false);
    }
  
    return (
        <form className="filterContainer">
                {/* Categories */}
                <div>
                    <label htmlFor="categoryInp">Category</label>
                    <select name="categoryInp" id="categoryInp" defaultValue="all" onChange={(e) => setFilterCat(e.target.value)}>
                        <option value="all">all</option>
                        {
                            allCategories.map((category: string, index) => (
                                <option key={index} value={category}>{ category }</option>
                            ))
                        }
                    </select>
                </div>

                {/* Platforms */}
                <div>
                    <label htmlFor="platformInp">Platform</label>
                    <select name="platformInp" id="platformInp" defaultValue="all" onChange={(e) => setFilterPlat(e.target.value)}>
                        <option value="all">all</option>
                        {
                            allPlatforms.map((platform: string, index) => (
                                <option key={index} value={platform}>{ platform }</option>
                            ))
                        }
                    </select>
                </div>

            <input type="submit" value="Filter" className="btn submitBtn" onClick={setFilters}/>
        </form>
    )
}
