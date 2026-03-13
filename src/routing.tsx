import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { GamesPage } from "./pages/GamesPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";

import { Layout } from "./components/Layout";
import { LayoutSubPage } from "./components/LayoutSubPage"
import { SinglePage } from "./pages/SinglePage";

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
    },
    {
        path: "/details",
        element: <LayoutSubPage />,
        children: [
            {
                path: "/details/:title/:_id",
                element: <SinglePage />
            }
        ]
    }
]);

export default router;