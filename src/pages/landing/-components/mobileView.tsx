import banner from "@/assets/images/landing_banner_mobile.png"
import logo from "@/assets/logos/logo_white.svg"
import landingFeat1 from "@/assets/images/landing_feat_1.png"
import landingFeat2 from "@/assets/images/landing_feat_2.png"
import landingFeat3 from "@/assets/images/landing_feat_3.png"
import landingFeat4 from "@/assets/images/landing_feat_4.png"
import landingFooter from "@/assets/images/landing_footer.png"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"

function MobileView() {
    const navigate = useNavigate();

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
                <div className="absolute inset-0 flex flex-col items-center text-white px-4 py-28">
                    <div className="flex flex-row font-figtree gap-2">
                        <p className="font-bold text-4xl drop-shadow-lg">Cultivating </p>
                        <p className="font-bold italic text-4xl drop-shadow-lg">Smarter</p>
                    </div>
                    <div className="flex flex-row font-figtree gap-2">
                        <p className="font-bold text-4xl drop-shadow-lg">Growing </p>
                        <p className="font-bold italic text-4xl drop-shadow-lg">Stronger</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center bg-landing-custom-gradient px-10 py-14 mb-20">
                <img src={logo} className="w-50 mb-6" alt="TerraFarm Logo" />
                <Button onClick={handleLogin} className="bg-white px-8 py-7 mb-32 text-secondary-default rounded-full font-figtree text-2xl font-bold drop-shadow-lg">
                    Start Cultivating
                </Button>
                <p className="mb-32 font-figtree text-xl font-medium text-start text-white"> {/* font figtree 16 medium  */}
                    TerraFarm is your personal agro-assistant designed to make farming smarter and easier. TerraFarm helps you make the best decisions for your farm by providing clear, useful advice based on real-time data. 
                </p>
                <p className="font-figtree text-2xl font-bold text-white text-start w-full mb-4 drop-shadow-lg">What TerraFarm can do</p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative drop-shadow-lg">
                        <img src={landingFeat1} className="w-40" />
                        <p className="absolute inset-0 p-2 content-end font-figtree font-semibold text-white text-base text-start">
                            Monitor real-time field condition
                        </p>
                    </div>
                    <div className="relative drop-shadow-lg">
                        <img src={landingFeat2} className="w-40" />
                        <p className="absolute inset-0 p-2 content-end font-figtree font-semibold text-white text-base text-start">
                            Get informed for potential damage
                        </p>
                    </div>
                    <div className="relative drop-shadow-lg">
                        <img src={landingFeat3} className="w-40" />
                        <p className="absolute inset-0 p-2 content-end font-figtree font-semibold text-white text-base text-start">
                            AI-driven crop health assessment
                        </p>
                    </div>
                    <div className="relative drop-shadow-lg">
                        <img src={landingFeat4} className="w-40" />
                        <p className="absolute inset-0 p-2 content-end font-figtree font-semibold text-white text-base text-start">
                            Smart resource management system
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative">
                <img src={landingFooter} className="w-screen" />
                <div className="absolute inset-0 py-24 content-start items-center flex flex-col gap-4">
                    <p className="mb-1 font-figtree font-semibold text-2xl text-white">
                        Ready to cultivate smarter?
                    </p>
                    <Button onClick={handleLogin} className="bg-white px-4 py-5 mb-32 text-secondary-default rounded-full font-figtree text-lg font-bold drop-shadow-lg">
                        Join us
                    </Button>
                </div>
                <div className="absolute inset-0 px-10 py-12 content-end justify-end items-start flex flex-col gap-4">
                    <img src={logo} className="w-28 mb-2" alt="TerraFarm Logo" />
                    <div className="flex flex-row w-full">
                        <div className="flex flex-col w-1/2">
                            <p className="font-figtree font-semibold text-base text-white">Team</p>
                            <p className="font-figtree font-light text-sm text-white">TaniMakmur88</p>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <p className="font-figtree font-semibold text-base text-white">Location</p>
                            <p className="font-figtree font-light text-sm text-white">Bandung, Indonesia</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MobileView;