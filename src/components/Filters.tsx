import "./Filter.css"

export const Filters = () => {

    const allCategories: string[] = ["mmorpg", "shooter", "strategy", "moba", "racing", "sports", "social", "sandbox", "open-world", "survival", "pvp", "pve", "pixel", "voxel", "zombie", "turn-based", "first-person", "third-Person", "top-down", "tank", "space", "sailing", "side-scroller", "superhero", "permadeath", "card", "battle-royale", "mmo", "mmofps", "mmotps", "3d", "2d", "anime", "fantasy", "sci-fi", "fighting", "action-rpg", "action", "military", "martial-arts", "flight", "low-spec", "tower-defense", "horror", "mmorts"];
    const allPlatforms: string[] = ["pc", "browser"];
  
  
    return (
        <form className="filterContainer">
            <h2>Filter</h2>

            {/* Categories */}
            <p><strong>Kategorier</strong></p>
            <div>
                {
                    allCategories.map((category: string) => (
                        <div key={category}>
                            <input type="checkbox" name="categoryInp" id={category} value={category} />
                            <label htmlFor={category}>{category}</label>
                        </div>
                    ))
                }
            </div>

            {/* Platforms */}
            <p><strong>Plattformer</strong></p>
            <div>
                {
                    allPlatforms.map((platform: string) => (
                        <div key={platform}>
                            <input type="checkbox" name="platformInp" id={platform} value={platform} />
                            <label htmlFor={platform}>{platform}</label>
                        </div>
                    ))
                }
            </div>

            <input type="submit" value="Filtrera" className="btn"/>
        </form>
    )
}
