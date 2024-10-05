import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import { Home, Login } from "@/pages";
import { Navbar, Footer } from "@/components";
import Landing from "@/pages/landing";
// import { AuthProvider } from "@/contexts/AuthContext";

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
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
