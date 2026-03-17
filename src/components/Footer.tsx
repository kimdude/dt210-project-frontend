
import "./Footer.css"

export const Footer = () => {
  return (
    <footer>
      <div className="footerInfo">
        <p><strong>Cheap Games</strong></p>
        <p>External API: <a href="https://www.freetogame.com/api-doc" title="Se dokumentationen" target="_blank">FreeToGame</a></p>
        <p>Backend API: <a href="https://github.com/kimdude/dt210g-project-backend-hapi.git" title="Se dokumentationen" target="_blank">Cheap Games-Backend</a></p>
      </div>
      <div className="footerLogo">
        <img src="/favicon.svg" alt="Cheap Games" width="60"/><br />
        <small>©Kim Dudenhöfer, 2026</small>
      </div>
    </footer>
  )
}
