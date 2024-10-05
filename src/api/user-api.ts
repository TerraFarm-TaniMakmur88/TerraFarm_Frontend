import axios from "axios";
import { SelfResponse } from "@/types";
import { API_URL } from "@/constant";
import Cookies from "js-cookie";

class UserApi {
    private static readonly token = Cookies.get("tf-token") ?? "";
    private static readonly axios = axios.create({
        baseURL: import.meta.env.VITE_BE_URL || API_URL,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`
        },
    });

    static async getSelf(): Promise<SelfResponse> {
        try {
            const response = await this.axios.post<SelfResponse>("/user");
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default UserApi;