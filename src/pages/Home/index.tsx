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

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { token, isAuthenticated } = useAuth();
    
    const handleNavigateResource = () => {
        navigate('/resource');
    };

    // Dummy weather data
    const weatherData = [
        {
            temperature: 25,
            date: "05/10/2024",
            location: "Bandung",
            rainfall: 1.88,
            wind: 1.3,
            humidity: 50.4,
            image: cloudy
        },
        {
            temperature: 29,
            date: "06/10/2024",
            location: "Jakarta",
            rainfall: 2.4,
            wind: 1.5,
            humidity: 60.3,
            image: rainfall
        },
        {
            temperature: 22,
            date: "07/10/2024",
            location: "Surabaya",
            rainfall: 0.5,
            wind: 2.0,
            humidity: 45.8,
            image: wind
        },
        {
            temperature: 25,
            date: "05/10/2024",
            location: "Bandung",
            rainfall: 1.88,
            wind: 1.3,
            humidity: 50.4,
            image: cloudy
        },
        {
            temperature: 29,
            date: "06/10/2024",
            location: "Jakarta",
            rainfall: 2.4,
            wind: 1.5,
            humidity: 60.3,
            image: rainfall
        }
    ];

    // Dummy action recommendations
    const actionRecommendations = [
        'Harvest your cassavas before raining in 5 days!',
        'Start replanting your rice fields today!',
        'Plant your empty field with rice in 7 days!'
    ];

    const [weatherIndex, setWeatherIndex] = useState(0);
    const [recommendationIndex, setRecommendationIndex] = useState(0);
    const username = getUsernameFromToken(token as string);

    // Carousel effect for weather data
    useEffect(() => {
        const interval = setInterval(() => {
            setWeatherIndex((prevIndex) => (prevIndex + 1) % weatherData.length);
        }, 10000); // Rotate every 10 seconds
        return () => clearInterval(interval);
    }, []);

    // Carousel effect for action recommendations
    useEffect(() => {
        const interval = setInterval(() => {
            setRecommendationIndex((prevIndex) => (prevIndex + 1) % actionRecommendations.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    // Redirect to login if unauthenticated
    useEffect(() => {
        if (!isAuthenticated) {
            console.log("User is unauthenticated, navigating to login");
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="w-screen h-screen bg-white flex flex-col px-7 py-8 items-center">
            <div className="flex flex-row w-full mb-7 justify-end">
                <img src={logoSquare} className="h-10" />
            </div>
            <p className="w-full mb-4 items-start font-figtree font-bold text-3xl text-black">Hello, {username}!</p>

            {/* Weather Data Carousel */}
            <div className="flex flex-col items-center w-full mb-5">
                <div className="flex flex-row w-full px-5 py-4 mb-3 gap-3 bg-weather-custom-gradient rounded-lg drop-shadow-md items-center">
                    <img src={weatherData[weatherIndex].image} className="w-24 h-20 p-2 drop-shadow-md" />
                    <p className="mr-2 font-figtree font-bold text-5xl text-black">{weatherData[weatherIndex].temperature}°</p>
                    <div className="flex flex-col items-start">
                        <p className="font-figtree font-medium text-sm text-black">{weatherData[weatherIndex].date}</p>
                        <p className="font-figtree font-semibold text-2xl text-black">{weatherData[weatherIndex].location}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-1.5 w-full mb-3">
                    <div className="flex-1 flex flex-col items-center px-4 pt-4 pb-5 gap-0 bg-rain-custom-gradient rounded-lg drop-shadow-sm items-center">
                        <img src={rainfall} className="h-6 mb-0.5" />
                        <p className="mb-3 font-figtree font-bold text-sm text-gray-100">Rainfall</p>
                        <p className="font-figtree font-medium text-4xl text-white">{weatherData[weatherIndex].rainfall}</p>
                        <p className="font-figtree font-medium text-sm text-white text-center">mm / day</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center px-4 pt-4 pb-5 gap-0 bg-rain-custom-gradient rounded-lg drop-shadow-sm items-center">
                        <img src={wind} className="h-4 mb-2.5" />
                        <p className="mb-3 font-figtree font-bold text-sm text-gray-100">Wind</p>
                        <p className="font-figtree font-medium text-4xl text-white">{weatherData[weatherIndex].wind}</p>
                        <p className="font-figtree font-medium text-sm text-white text-center">m / s</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center px-4 pt-4 pb-5 gap-0 bg-rain-custom-gradient rounded-lg drop-shadow-sm items-center">
                        <img src={humidity} className="h-6 mb-0.5" />
                        <p className="mb-3 font-figtree font-bold text-sm text-gray-100">Humidity</p>
                        <p className="font-figtree font-medium text-4xl text-white">{weatherData[weatherIndex].humidity}</p>
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