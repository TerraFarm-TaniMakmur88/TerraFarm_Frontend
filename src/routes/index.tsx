import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import { Home } from "@/pages";
import { Navbar, Footer } from "@/components";
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
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "/auth",
                element: <Home />,  // Change this to the correct auth-related component
            }
        ],
    },
];

const router = createBrowserRouter(routes);

export default router;
