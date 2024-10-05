import React, { useState, useEffect, useRef } from 'react';
import micIcon from '@/assets/icons/mic_assist.svg';
import waveform from '@/assets/images/waveform.gif';
import { Button } from '@/components/ui/button';

function VoiceAssistant() {
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false); // State to track if audio is playing
    const [audioUrl, setAudioUrl] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const audioPlaybackRef = useRef(null);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        
        mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
            const url = URL.createObjectURL(audioBlob);
            setAudioUrl(url);
            audioChunksRef.current = []; // Reset chunks for next recording
            
            // Play audio after 2 seconds
            setTimeout(() => {
                handlePlayback(url);
            }, 2000);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
    };

    const handlePlayback = (url) => {
        if (url) {
            audioPlaybackRef.current = new Audio(url);
            audioPlaybackRef.current.play();
            setIsPlaying(true); // Set playing state to true
    
            // Attach event listener to reset `isPlaying` after the audio finishes
            audioPlaybackRef.current.addEventListener('ended', () => {
                setIsPlaying(false); // Set playing state to false when playback finishes
            });
        }
    };
    

    useEffect(() => {
        if (audioPlaybackRef.current) {
            audioPlaybackRef.current.addEventListener('ended', () => {
                setIsPlaying(false); // Reset playing state when audio ends
                const waveformElement = document.getElementById('waveform-gif');
                if (waveformElement) {
                    waveformElement.src = waveform; // Reset the GIF
                }
            });

            return () => {
                audioPlaybackRef.current.pause();
                audioPlaybackRef.current = null; // Clean up
            };
        }
    }, [audioUrl]);

    return (
        <div className="w-screen h-screen bg-bg-custom-gradient flex flex-col px-10 pt-28 py-48 items-center">
            <div className="w-screen flex flex-col items-center">
                <p className="font-figtree font-medium text-black text-3xl">Talk to your</p>
                <p className="font-figtree font-bold text-black text-4xl">agro-assistant</p>
            </div>
            <div className='grow flex flex-col space-y-1 justify-center items-center'>
                <Button
                    className='w-fit h-fit'
                    onMouseDown={startRecording} // Start recording on mouse down
                    onMouseUp={stopRecording} // Stop recording on mouse up
                    onTouchStart={startRecording} // Start recording on touch
                    onTouchEnd={stopRecording} // Stop recording on touch end
                >
                    <img src={micIcon} className='h-40' />
                </Button>
                {isRecording || isPlaying ? (
                    <img
                        id="waveform-gif"
                        src={waveform}
                        className='h-20'
                    />
                ) : (
                    <div className='pt-10 pb-9'>
                        <div className="w-48 h-0.5 bg-primary-default"></div>
                    </div>
                )}
            </div>
            <p className="font-figtree font-semibold text-black text-xl text-center">
                Try asking <span className='text-primary-default'>"When is the best time to harvest carrots?"</span>
            </p>
        </div>
    );
}

export default VoiceAssistant;
