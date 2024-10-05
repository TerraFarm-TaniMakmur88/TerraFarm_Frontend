import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import { Home, KYC, Login, Signup } from "@/pages";
import { Navbar } from "@/components";
import Landing from "@/pages/landing";
import Profile from "@/pages/Profile";
import ResourceManagement from "@/pages/ResourceManagement";
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
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/resource",
                element: <ResourceManagement />,
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
                path: "/register",
                element: <Signup />,
            },
            {
                path: "/kyc",
                element: <KYC />,
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
