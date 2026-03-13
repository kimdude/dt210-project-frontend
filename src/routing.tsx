import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { GamesPage } from "./pages/GamesPage";
import { LoginPage } from "./pages/LoginPage";
import { Layout } from "./components/layout";
import { ProfilePage } from "./pages/ProfilePage";

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
            },
            {
                path: "/profile",
                element: <ProfilePage />
            }
        ]
    }
]);

export default router;