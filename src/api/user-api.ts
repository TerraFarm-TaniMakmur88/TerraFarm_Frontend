import axios from "axios";
import { LoginRequest, LoginResponse, SelfResponse } from "@/types";
import { API_URL } from "@/constant";

class UserApi {
    private static axios = axios.create({
        baseURL: import.meta.env.VITE_BE_URL || API_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    static async login(payload: LoginRequest): Promise<LoginResponse> {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await this.axios.post<LoginResponse>("/user/login", payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getSelf(token: string): Promise<SelfResponse> {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await this.axios.get<SelfResponse>("/user", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              } 
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default UserApi;