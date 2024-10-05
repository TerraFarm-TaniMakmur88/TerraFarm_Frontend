import axios from "axios";
import { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from "@/types";
import { API_URL } from "@/constant";

class AuthApi {
    private static readonly axios = axios.create({
        baseURL: import.meta.env.VITE_BE_URL || API_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    static async login(payload: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await this.axios.post<LoginResponse>("/user/login", payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async register(payload: SignupRequest): Promise<SignupResponse> {
        try {
            const response = await this.axios.post<SignupResponse>("/user", payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default AuthApi;