import { useState, useRef } from "react";
import micIcon from "@/assets/icons/mic_assist.svg";
import waveform from "@/assets/images/waveform.gif";
import loadingGif from "@/assets/images/loading.gif";
import { Button } from "@/components/ui/button";
import RagApi from "@/api/rag-api";

function VoiceAssistant() {
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [loading, setLoading] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioPlaybackRef = useRef<HTMLAudioElement | null>(null);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, {
                type: "audio/mp3",
            });
            audioChunksRef.current = []; // Reset chunks for next recording
            await sendAudioToRagApi(audioBlob); // Send to RAG API
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const sendAudioToRagApi = async (audioBlob: Blob) => {
        setLoading(true);
        try {
            const responseBlob = await RagApi.postSpeechToSpeech(audioBlob);
            playResponseAudio(responseBlob); // Play the response MP3
        } catch (error) {
            console.error("Error uploading audio:", error);
        } finally {
            setLoading(false); // Stop loading when done
        }
    };

    const playResponseAudio = (blob: Blob) => {
        const responseUrl = URL.createObjectURL(blob);
        if (audioPlaybackRef.current) {
            audioPlaybackRef.current.src = responseUrl;
            audioPlaybackRef.current.play();
            setIsPlaying(true);

            audioPlaybackRef.current.addEventListener("ended", () => {
                setIsPlaying(false);
                URL.revokeObjectURL(responseUrl);
            });
        } else {
            audioPlaybackRef.current = new Audio(responseUrl);
            audioPlaybackRef.current.play();
            setIsPlaying(true);

            audioPlaybackRef.current.addEventListener("ended", () => {
                setIsPlaying(false);
                URL.revokeObjectURL(responseUrl);
            });
        }
    };

    return (
        <div className="w-screen h-screen bg-bg-custom-gradient flex flex-col px-10 pt-28 py-48 items-center">
            <div className="w-screen flex flex-col items-center">
                <p className="font-figtree font-medium text-black text-3xl">
                    Talk to your
                </p>
                <p className="font-figtree font-bold text-black text-4xl">
                    agro-assistant
                </p>
            </div>
            <div className="grow flex flex-col space-y-1 justify-center items-center">
                <Button
                    className="w-fit h-fit"
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onTouchStart={startRecording}
                    onTouchEnd={stopRecording}
                >
                    <img src={micIcon} className="h-40" />
                </Button>
                {loading ? (
                    <img id="loading-gif" src={loadingGif} className="h-20" />
                ) : isRecording || isPlaying ? (
                    <img id="waveform-gif" src={waveform} className="h-20" />
                ) : (
                    <div className="pt-10 pb-9">
                        <div className="w-48 h-0.5 bg-primary-default"></div>
                    </div>
                )}
            </div>
            <p className="font-figtree font-semibold text-black text-xl text-center">
                Try asking{" "}
                <span className="text-primary-default">
                    "When is the best time to harvest carrots?"
                </span>
            </p>
        </div>
    );
}

export default VoiceAssistant;