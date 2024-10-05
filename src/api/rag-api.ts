import axios from "axios";

class RagApi {
    // Use this.axios to ensure the correct baseURL
    private static readonly axios = axios.create({
        baseURL: import.meta.env.VITE_RAG_URL || "http://localhost:8000/api", // RAG URL
        headers: {
            "Content-Type": "multipart/form-data",
        },
        responseType: 'blob',
    });

    static async postSpeechToSpeech(audioBlob) {
        try {
            const formData = new FormData();
            formData.append("audio", audioBlob, "recording.mp3");

            // Use the axios instance created above
            const response = await this.axios.post(
                "/speech-to-speech/",
                formData
            );
            return response.data;
        } catch (error) {
            console.error("Error uploading audio:", error);
            throw error;
        }
    }
}

export default RagApi;
