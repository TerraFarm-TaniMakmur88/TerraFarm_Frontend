import axios from "axios";
import { CropResponse, CropData } from "@/types";
import { API_URL } from "@/constant";
import Cookies from "js-cookie";

class FieldApi{
    private static readonly token = Cookies.get("tf-token") ?? "";
    private static readonly axios = axios.create({
        baseURL: import.meta.env.VITE_BE_URL || API_URL,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`,
        },
    });

    static async getFieldById(userId: number): Promise<CropResponse[]> {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await this.axios.get<CropResponse[]>(`/field`, {
                params: { userId }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async updateFieldStatus(id: number, status: string): Promise<void> {
        // eslint-disable-next-line no-useless-catch
        try {
            await this.axios.put(`/field/status`, { id, status });
        } catch (error) {
            throw error;
        }
    }

    static async updatePlantDate(id: number, plantDate: string): Promise<void> {
        // eslint-disable-next-line no-useless-catch
        try {
            await this.axios.put(`/field/plant_date`, { id, plantDate });
        } catch (error) {
            throw error;
        }
    }

    static async createFields(userId: number, location: string, fields: CropData[]): Promise<void> {
        // eslint-disable-next-line no-useless-catch
        try {
            await this.axios.post(`/field`, { userId, location, fields });
        } catch (error) {
            throw error;
        }
    }
}

export default FieldApi;