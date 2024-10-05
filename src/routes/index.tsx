import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import { Home, KYC, Login, Signup } from "@/pages";
import { Navbar } from "@/components";
import Landing from "@/pages/landing";
import Profile from "@/pages/Profile";
import { AuthProvider } from "@/contexts/AuthContext";
import ResourceManagement from "@/pages/ResourceManagement";
import VoiceAssistant from "@/pages/VoiceAssistant";

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
            },
            {
                path: "/assistant",
                element: <VoiceAssistant />,
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
                path: "/kyc/:id",
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
