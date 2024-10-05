import axios from "axios";
import { API_URL } from "@/constant";
import Cookies from "js-cookie";

class CalculatorApi{
    private static readonly token = Cookies.get("tf-token") ?? "";
    private static readonly axios = axios.create({
        baseURL: import.meta.env.VITE_BE_URL || API_URL,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`,
        },
    });

    static async calculateProfit(revenue: number, cost: number): Promise<{ profit: number }> {
        // eslint-disable-next-line no-useless-catch
        try {
          const response = await this.axios.post<{ profit: number }>(`/calculator/calculate`, {
            revenue,
            cost,
          });
          return response.data;
        } catch (error) {
          throw error;
        }
      }
}

export default CalculatorApi;