import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    id: number;
    email: string;
    iat: number;
    exp: number;
}

export const getUserIdFromToken = (token: string): number | null => {
    try {
        const decoded: JwtPayload = jwtDecode(token);
        return decoded.id;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};
