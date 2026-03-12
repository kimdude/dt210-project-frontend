import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { GamesPage } from "./pages/GamesPage";
import { LoginPage } from "./pages/LoginPage";
import { Layout } from "./components/layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/games",
                element: <GamesPage />
            },
            {
                path: "/login",
                element: <LoginPage />
            }
        ]
    }
]);

export default router;