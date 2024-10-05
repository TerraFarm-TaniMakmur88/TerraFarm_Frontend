import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import { Home, Login } from "@/pages";
import { Navbar } from "@/components";
import Landing from "@/pages/landing";
// import { AuthProvider } from "@/contexts/AuthContext";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Outlet />
            </div>
            <Navbar />
        </div>
    );
};

const AuthLayout = () => {
    return <Outlet />;
};

const routes: RouteObject[] = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            }
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/landing",
                element: <Landing />,
            }
        ],
    },
];

const router = createBrowserRouter(routes);

export default router;
