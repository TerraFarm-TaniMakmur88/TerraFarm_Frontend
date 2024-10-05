import { createContext, useContext, useState , useEffect } from "react";
import Cookies from "js-cookie";
// import { verifyToken } from "@/utils/util";
import { UserApi } from "@/api";
import { LoginRequest, LoginResponse, SelfResponse } from "@/types";
import { toast } from "react-toastify";

type AuthContext = {
    isAuthenticated: boolean;
    token: string | null;
    login: (payload: LoginRequest) => Promise<void>;
    logout: () => void;
    username: string;
    update: boolean;
    setUpdate: (prop: boolean) => void;
};

const AuthContext = createContext<AuthContext>({
    isAuthenticated: false,
    token: null,
    login: async () => {},
    logout: () => {},
    username: "",
    update: false,
    setUpdate: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState("user");
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const token = Cookies.get("tf-token");

            if (token) {
                try {
                    const user: SelfResponse = await UserApi.getSelf(token);

                    if (user) {
                        setIsAuthenticated(true);
                        setUsername(user.name || "user");
                        setToken(token);
                    }
                } catch (error) {
                    Cookies.remove("tf-token");
                    console.error(error);
                }
            }

            setIsLoading(false);
        };

        fetchUser();
    }, [token]);

    const login = async (payload: LoginRequest) => {
        console.log("Login");
        try {
            const auth: LoginResponse = await UserApi.login(payload);

            if (auth.token) {
                setIsAuthenticated(true);
                Cookies.set("tf-token", auth.token);
                setToken(auth.token);
                toast.success("Login successful");
                window.location.href = "/";
            } else {
                throw new Error("No token received");
            }
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        Cookies.remove("tf-token");
        setToken(null);
    };

    if (isLoading) return null;

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, token, login, logout, update, setUpdate, username }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default useAuth;