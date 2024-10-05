import banner from "@/assets/images/landing_banner.png"
import logo from "@/assets/logos/logo_white.svg"
import landingFeat1 from "@/assets/images/landing_feat_1.png"
import landingFeat2 from "@/assets/images/landing_feat_2.png"
import landingFeat3 from "@/assets/images/landing_feat_3.png"
import landingFeat4 from "@/assets/images/landing_feat_4.png"
import landingFooter from "@/assets/images/landing_footer_desktop.png"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"
import useAuth from "@/contexts/AuthContext"
import { useEffect } from "react"

function DesktopView() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    
    useEffect(() => {
        if (isAuthenticated) {
            console.log("User is authenticated, navigating to home");
            navigate("/home");
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="flex flex-col w-screen overflow-x-hidden p-0 gap-0">
            <div className="relative w-screen"> 
                <img 
                    src={banner} 
                    alt="Landing Banner" 
                    className="w-screen object-cover block"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-center text-white px-20 py-28 drop-shadow-xl">
                    <img src={logo} className="w-96 mb-2" alt="TerraFarm Logo" />
                    <div className="flex flex-row font-figtree gap-2 pl-6">
                        <p className="font-bold text-4xl drop-shadow-lg">Cultivating </p>
                        <p className="font-bold italic text-4xl drop-shadow-lg">Smarter</p>
                    </div>
                    <div className="flex flex-row font-figtree gap-2 pl-6">
                        <p className="font-bold text-4xl drop-shadow-lg">Growing </p>
                        <p className="font-bold italic text-4xl drop-shadow-lg">Stronger</p>
                    </div>
                    <Button onClick={handleLogin} className="ml-6 bg-white px-8 py-7 mt-8 mb-32 text-secondary-default rounded-full font-figtree text-2xl font-bold drop-shadow-lg transition-transform duration-300 transform hover:scale-105">
                        Start Cultivating
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-center bg-landing-custom-gradient px-20 py-24 mb-20">
                <p className="w-[60%] mb-40 font-figtree text-3xl font-medium text-center text-white"> {/* font figtree 16 medium  */}
                    TerraFarm is your personal agro-assistant designed to make farming smarter and easier. TerraFarm helps you make the best decisions for your farm by providing clear, useful advice based on real-time data. 
                </p>
                <p className="font-figtree text-4xl font-bold text-white text-start w-full mb-8 ml-60 drop-shadow-lg">What TerraFarm can do</p>
                <div className="grid grid-cols-4 gap-6 mb-10">
                    <div className="relative drop-shadow-lg">
                        <img src={landingFeat1} className="w-60" />
                        <p className="absolute inset-0 p-2 content-end font-figtree font-semibold text-white text-base text-start">
                            Monitor real-time field condition
                        </p>
                    </div>
                    <div className="relative drop-shadow-lg">
                        <img src={landingFeat2} className="w-60" />
                        <p className="absolute inset-0 p-2 content-end font-figtree font-semibold text-white text-base text-start">
                            Get informed for potential damage
                        </p>
                    </div>
                    <div className="relative drop-shadow-lg">
                        <img src={landingFeat3} className="w-60" />
                        <p className="absolute inset-0 p-2 content-end font-figtree font-semibold text-white text-base text-start">
                            AI-driven crop health assessment
                        </p>
                    </div>
                    <div className="relative drop-shadow-lg">
                        <img src={landingFeat4} className="w-60" />
                        <p className="absolute inset-0 p-2 content-end font-figtree font-semibold text-white text-base text-start">
                            Smart resource management system
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative">
                <img src={landingFooter} className="w-screen" />
                <div className="absolute inset-0 py-24 content-start items-center flex flex-col gap-4">
                    <p className="mt-8 mb-1 font-figtree font-semibold text-3xl text-white">
                        Ready to cultivate smarter?
                    </p>
                    <Button onClick={handleLogin} className="bg-white px-4 py-5 mb-32 text-secondary-default rounded-full font-figtree text-lg font-bold drop-shadow-lg">
                        Join us
                    </Button>
                </div>
                <div className="absolute inset-0 px-20 py-14 content-end justify-end items-start flex flex-col gap-4">
                    <img src={logo} className="w-40 mb-2" alt="TerraFarm Logo" />
                    <div className="flex flex-row w-full">
                        <div className="flex flex-col w-1/2 ml-2">
                            <p className="font-figtree font-semibold text-xl text-white">Team</p>
                            <p className="font-figtree font-light text-md text-white">TaniMakmur88</p>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <p className="font-figtree font-semibold text-xl text-white">Location</p>
                            <p className="font-figtree font-light text-md text-white">Bandung, Indonesia</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DesktopView;