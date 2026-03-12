import favicon from "../../public/favicon.svg";

import "./Footer.css"

export const Footer = () => {
  return (
    <footer>
      <div className="footerInfo">
        <p><strong>Cheap Games</strong></p>
        <p>Externt API: <a href="https://www.freetogame.com/api-doc" title="Se dokumentationen" target="_blank">FreeToGame</a></p>
        <p>Eget API: <a href="https://github.com/kimdude/dt210g-project-backend-hapi.git" title="Se dokumentationen" target="_blank">Cheap Games-Backend</a></p>
      </div>
      <div className="footerLogo">
        <img src={favicon} alt="Cheap Games" width="60"/><br />
        <small>©Kim Dudenhöfer, 2026</small>
      </div>
    </footer>
  )
}
