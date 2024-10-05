import { useEffect, useState } from "react";
import DesktopView from "./-components/desktopView";
import MobileView from "./-components/mobileView";

function Landing() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    
    return (
        <>
          {isMobile ? <MobileView /> : <DesktopView />}
        </>
      );
}

export default Landing;