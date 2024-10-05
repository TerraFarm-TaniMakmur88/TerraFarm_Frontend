import axios from "axios";
import { SelfResponse, WeatherResponse } from "@/types";
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
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await this.axios.get<SelfResponse>("/user");
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async weatherData(latitude: number, longitude: number): Promise<WeatherResponse> {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await this.axios.get<WeatherResponse>(`/weather/dashboard?coordX=${latitude}&coordY=${longitude}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default UserApi;