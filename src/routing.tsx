import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"
import { HomePage } from "./pages/HomePage";
import { GamesPage } from "./pages/GamesPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";

import { Layout } from "./components/Layout";
import { LayoutSubPage } from "./components/LayoutSubPage"
import { SinglePage } from "./pages/SinglePage";
import { ListGamesPage } from "./pages/ListGamesPage";
import { ListReviewsPage } from "./pages/ListReviewsPage";

//Browser router
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
                path: "games",
                element: <GamesPage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "profile",
                element: ( 
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                )
            }
        ]
    },
    {
        path: "/details",
        element: <LayoutSubPage />,
        children: [
            {
                path: ":title/:_id",
                element: <SinglePage />
            },
            {
                path: "saved-games",
                element: ( 
                    <ProtectedRoute>
                        <ListGamesPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "shared-reviews",
                element: ( 
                    <ProtectedRoute>
                        <ListReviewsPage />
                    </ProtectedRoute>
                )
            }
        ]
    }
]);

export default router;