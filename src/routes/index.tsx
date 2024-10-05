import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import { Home, KYC, Login, Signup } from "@/pages";
import { Navbar } from "@/components";
import Landing from "@/pages/landing";
import Profile from "@/pages/Profile";
import { AuthProvider } from "@/contexts/AuthContext";
import ResourceManagement from "@/pages/ResourceManagement";

const MainLayout = () => {
    return (
        <AuthProvider>
            <div className="flex flex-col min-h-screen">
                <div className="flex-grow">
                    <Outlet />
                </div>
                <Navbar />
            </div>
        </AuthProvider>
    );
};

const AuthLayout = () => {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
};

const routes: RouteObject[] = [
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/",
                element: <Landing />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Signup />,
            },
            {
                path: "/kyc/:id",
                element: <KYC />,
            }
        ],
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/home",
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
    }
];

const router = createBrowserRouter(routes);

export default router;
