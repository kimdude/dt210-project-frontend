# DT210G - Projekt
## Cheap Games

Repot innehåller källkod för en React + Vite webapplikation, [Cheap Games](https://dt210g-cheap-games.netlify.app/). 
Webbapplikationen använder två stycken API:n. Ett eget [backend API](https://github.com/kimdude/dt210g-lab3-api.git) som hanterar användare, spelrecensioner med betyg samt listor med användares sparade spel. Detta används tillsammans med [FreeToGame](https://www.freetogame.com/api-doc) för att hämta data om kostnadsfria spel.

För routing används Browser Router. Autentisering i frontenden görs med Context API, för att ge global tillgång till autentisering och användarinfo. Vid inloggning genom backenden tas ett webtoken emot som lagras i localstorage. Egna hooks används för varje fetch-anrop. 

Applikationen använder även npm paktet _Yet Another React Lightbox_ för att visa upp bilder. Utöver det används även React-spinners för att visa upp spinners medan data hämtas.

_Kim Dudenhöfer, 2026-03-18_