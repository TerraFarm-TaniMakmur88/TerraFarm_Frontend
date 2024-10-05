import React, { useState } from 'react';
import homeIcon from '@/assets/icons/home.svg';
import micIcon from '@/assets/icons/mic.svg';
import profileIcon from '@/assets/icons/profile.svg';
import homeIconActive from '@/assets/icons/home_active.svg';
import micIconActive from '@/assets/icons/mic_active.svg';
import profileIconActive from '@/assets/icons/profile_active.svg';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState<string>('');

    const handleTabProfile = () => {
        setActive('profile');
        navigate('/profile');
    };
    const handleTabDashboard = () => {
        setActive('dashboard');
        navigate('/home');
    };
    const handleTabAssistant = () => {
        setActive('assistant');
        navigate('/assistant');
    };

    return (
        <div className="flex flex-row gap-14 items-center justify-around bg-white pb-5 pt-6 px-8 sticky bottom-0 z-50 rounded-t-3xl shadow-[0px_6px_15px_3px_rgba(0,0,0,0.25)]">
            <div 
                className={`flex flex-col bg-red items-center cursor-pointer ${active === 'assistant' ? 'text-primary-default' : 'text-black'}`} 
                onClick={handleTabAssistant}
            >
                <img 
                    src={active === 'assistant' ? micIconActive : micIcon} 
                    alt="Assistant" 
                    className="w-10 h-10" 
                />
                <p className="text-sm mt-1">Assistant</p>
            </div>
            <div 
                className={`flex flex-col bg-red items-center cursor-pointer ${active === 'dashboard' ? 'text-primary-default' : 'text-black'}`} 
                onClick={handleTabDashboard}
            >
                <img 
                    src={active === 'dashboard' ? homeIconActive : homeIcon} 
                    alt="Dashboard" 
                    className="w-10 h-10" 
                />
                <p className="text-sm mt-1">Dashboard</p>
            </div>
            <div 
                className={`flex flex-col items-center cursor-pointer ${active === 'profile' ? 'text-primary-default' : 'text-black'}`} 
                onClick={handleTabProfile}
            >
                <img 
                    src={active === 'profile' ? profileIconActive : profileIcon} 
                    alt="Profile" 
                    className="w-10 h-10" 
                />
                <p className="text-sm mt-1">Profile</p>
            </div>
        </div>
    );
};

export default Navbar;
