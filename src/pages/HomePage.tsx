import { Banner } from "../components/Banner"
import { Link } from "react-router-dom"

export const HomePage = () => {
  return (
    <div>
      <Banner />
      <section>
        <h1>Populära spel</h1>
      </section>
      <section>
        <h1>Kommande spela</h1>
      </section>
      <Link to ="/games" className="btn">Se alla spel</Link>
    </div>
  )
}
