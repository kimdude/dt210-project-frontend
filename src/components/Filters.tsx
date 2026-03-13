import { useState } from "react";
import "./Filter.css"

export const Filters = ({setQuery}: {setQuery: any }) => {

    const allCategories: string[] = ["mmorpg", "shooter", "strategy", "moba", "racing", "sports", "social", "sandbox", "open-world", "survival", "pvp", "pve", "pixel", "voxel", "zombie", "turn-based", "first-person", "third-Person", "top-down", "tank", "space", "sailing", "side-scroller", "superhero", "permadeath", "card", "battle-royale", "mmo", "mmofps", "mmotps", "3d", "2d", "anime", "fantasy", "sci-fi", "fighting", "action-rpg", "action", "military", "martial-arts", "flight", "low-spec", "tower-defense", "horror", "mmorts"];
    const allPlatforms: string[] = ["pc", "browser"];

    //States
    const [ filterCat, setFilterCat ] = useState<string>("alla");
    const [ filterPlat, setFilterPlat ] = useState<string>("alla");

    //Setting filters
    const setFilters = async(e: any) => {
        e.preventDefault();

        //Setting queries
        if(filterCat !== "alla" && filterPlat !== "alla") {
            setQuery("?platform=" + filterPlat + "&category=" + filterCat);

        } else if(filterPlat !== "alla") {
            setQuery("?platform=" + filterPlat);

        } else if(filterCat !== "alla") {
            setQuery("?category=" + filterCat);
            
        } else {
            setQuery("");
        }
    }
  
    return (
        <form className="filterContainer">
                {/* Categories */}
                <div>
                    <label htmlFor="categoryInp">Kategori</label>
                    <select name="categoryInp" id="categoryInp" defaultValue="alla" onChange={(e) => setFilterCat(e.target.value)}>
                        <option value="alla">alla</option>
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
                    <select name="platformInp" id="platformInp" defaultValue="alla" onChange={(e) => setFilterPlat(e.target.value)}>
                        <option value="alla">alla</option>
                        {
                            allPlatforms.map((platform: string, index) => (
                                <option key={index} value={platform}>{ platform }</option>
                            ))
                        }
                    </select>
                </div>

            <input type="submit" value="Filtrera" className="btn submitBtn" onClick={setFilters}/>
        </form>
    )
}
