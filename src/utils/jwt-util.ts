import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    id: number;
    name: string;
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

export const getUsernameFromToken = (token: string): string | null => {
    try {
        const decoded: JwtPayload = jwtDecode(token);
        return decoded.name;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};
