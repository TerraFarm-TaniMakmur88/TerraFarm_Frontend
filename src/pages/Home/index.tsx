import React, { useEffect, useState } from "react";
import cloudy from '@/assets/images/cloudy.png';
import rainfall from '@/assets/images/rain.png';
import wind from '@/assets/images/wind.png';
import humidity from '@/assets/images/humidity.png';
import logoSquare from '@/assets/logos/logo_colored.svg';
import plantingIcon from '@/assets/images/planting.png';
import resourceBg from '@/assets/images/resource_bg.png';
import { ArrowRightCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/contexts/AuthContext";
import { getUsernameFromToken } from "@/utils/jwt-util";
import { toast } from "react-toastify";
import { UserApi } from "@/api";
import { WeatherData, WeatherResponse } from "@/types";
import loadingGif from "@/assets/images/loading.gif";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { token, isAuthenticated } = useAuth();
    const username = getUsernameFromToken(token as string);

    const [_, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [actionRecommendations, setActionRecommendations] = useState<string[]>([]);
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
    const [weatherIndex, setWeatherIndex] = useState(0);
    const [recommendationIndex, setRecommendationIndex] = useState(0);
    const [loading, setLoading] = useState(true); // Add loading state

    const [weatherInterval, setWeatherInterval] = useState<NodeJS.Timeout | null>(null);
    const [recommendationInterval, setRecommendationInterval] = useState<NodeJS.Timeout | null>(null);

    // Function to fetch weather data
    const fetchWeatherData = async (latitude: number, longitude: number) => {
        try {
            const weatherFetchData: WeatherResponse = await UserApi.weatherData(latitude, longitude);
            setWeatherData(weatherFetchData.listData);
            setActionRecommendations(weatherFetchData.insights);
            setLoading(false); // Data is fetched, set loading to false
        } catch (error) {
            console.error("Error fetching weather data:", error);
            toast.error("Failed to fetch weather data. Please try again later.");
        }
    };

    const handleNavigateResource = () => {
        navigate('/resource');
    };

    useEffect(() => {
        const handleGetLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ latitude, longitude });
                        fetchWeatherData(latitude, longitude); // Fetch the weather data
                    },
                    (error) => {
                        console.error("Error retrieving location:", error);
                        toast.error("Unable to retrieve location. Please check your location settings.");
                    }
                );
            } else {
                toast.error("Geolocation is not supported by this browser.");
            }
        };
        handleGetLocation();
    }, []);

    // Set up carousel intervals after data is fully loaded
    useEffect(() => {
        if (!loading && weatherData.length > 0 && actionRecommendations.length > 0) {
            // Start weather data carousel
            if (weatherInterval) clearInterval(weatherInterval); // Reset interval
            const weatherIntervalId = setInterval(() => {
                setWeatherIndex((prevIndex) => (prevIndex + 1) % weatherData.length);
            }, 10000); // Rotate every 10 seconds
            setWeatherInterval(weatherIntervalId);

            // Start recommendations carousel
            if (recommendationInterval) clearInterval(recommendationInterval); // Reset interval
            const recommendationIntervalId = setInterval(() => {
                setRecommendationIndex((prevIndex) => (prevIndex + 1) % actionRecommendations.length);
            }, 10000); // Rotate every 10 seconds
            setRecommendationInterval(recommendationIntervalId);
        }

        // Cleanup intervals on component unmount
        return () => {
            if (weatherInterval) clearInterval(weatherInterval);
            if (recommendationInterval) clearInterval(recommendationInterval);
        };
    }, [loading, weatherData, actionRecommendations]);

    // Redirect to login if unauthenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    // Helper function to format the date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <img id="loading-gif" src={loadingGif} className="h-32" />
            </div>
        );
    }

    return (
        <div className="w-screen h-screen bg-white flex flex-col px-7 py-8 items-center transform opacity-1 translate-y-2 transition-all duration-700 ease-in-out">
            <div className="flex flex-row w-full mb-7 justify-end">
                <img src={logoSquare} className="h-10" />
            </div>
            <p className="w-full mb-4 items-start font-figtree font-bold text-3xl text-black">Hello, {username}!</p>

            {/* Weather Data Carousel */}
            <div className="flex flex-col items-center w-full mb-5">
                {weatherData.length > 0 && (
                    <div className="flex flex-row w-full px-5 py-4 mb-3 gap-3 bg-weather-custom-gradient rounded-lg drop-shadow-md items-center">
                        <img src={cloudy} className="w-24 h-20 p-2 drop-shadow-md" />
                        <p className="mr-2 font-figtree font-bold text-5xl text-black">{Math.round(weatherData[weatherIndex].temperature)}°</p>
                        <div className="flex flex-col items-start">
                            <p className="font-figtree font-medium text-sm text-black">{formatDate(weatherData[weatherIndex].date)}</p>
                            <p className="font-figtree font-semibold text-2xl text-black">{weatherData[weatherIndex].location}</p>
                        </div>
                    </div>
                )}
                <div className="flex flex-row gap-1.5 w-full mb-3">
                    <div className="flex-1 flex flex-col items-center px-4 pt-4 pb-5 gap-0 bg-rain-custom-gradient rounded-lg drop-shadow-sm items-center">
                        <img src={rainfall} className="h-6 mb-0.5" />
                        <p className="mb-3 font-figtree font-bold text-sm text-gray-100">Rainfall</p>
                        <p className="font-figtree font-medium text-4xl text-white">{weatherData[weatherIndex]?.rainfall}</p>
                        <p className="font-figtree font-medium text-sm text-white text-center">mm / day</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center px-4 pt-4 pb-5 gap-0 bg-rain-custom-gradient rounded-lg drop-shadow-sm items-center">
                        <img src={wind} className="h-4 mb-2.5" />
                        <p className="mb-3 font-figtree font-bold text-sm text-gray-100">Wind</p>
                        <p className="font-figtree font-medium text-4xl text-white">{weatherData[weatherIndex]?.wind}</p>
                        <p className="font-figtree font-medium text-sm text-white text-center">m / s</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center px-4 pt-4 pb-5 gap-0 bg-rain-custom-gradient rounded-lg drop-shadow-sm items-center">
                        <img src={humidity} className="h-6 mb-0.5" />
                        <p className="mb-3 font-figtree font-bold text-sm text-gray-100">Humidity</p>
                        <p className="font-figtree font-medium text-4xl text-white">{weatherData[weatherIndex]?.humidity}</p>
                        <p className="font-figtree font-medium text-sm text-white text-center">percent</p>
                    </div>
                </div>
                {/* Carousel Dots */}
                <div className="flex flex-row gap-2 mt-1 justify-center">
                    {weatherData.map((_, idx) => (
                        <span
                            key={idx}
                            className={`h-2 w-2 rounded-full ${weatherIndex === idx ? 'bg-black' : 'bg-gray-400'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Action Recommendations */}
            <div className="w-full bg-action-custom-gradient p-5 mb-10 gap-3 rounded-lg drop-shadow-md items-center">
                <p className="font-figtree font-medium text-xl text-white text-center animate-scroll-up">
                    {actionRecommendations[recommendationIndex]}
                </p>
            </div>

            <p className="w-full mb-4 items-start font-figtree font-bold text-2xl text-black">Manage your field resources</p>
            <div 
                onClick={handleNavigateResource} 
                className="relative w-full mb-3 gap-3 rounded-lg drop-shadow-md items-center drop-shadow-lg"
            >
                <img src={resourceBg} className="w-full object-cover" />
                <div className="absolute inset-0 content-center items-center flex flex-row w-full p-6 gap-3">
                    <img src={plantingIcon} className="w-16 drop-shadow-md mr-2" />
                    <p className="font-figtree font-medium text-white text-xl text-start">Resource management tool</p>
                    <ArrowRightCircle className="text-white" style={{ height: '16px' }} />
                </div>
            </div>
        </div>
    );
};

export default Home;