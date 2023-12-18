import { useRef, useEffect, useState } from 'react';
import Host from "../../components/Host";
import Services from "../www.teymur.pro/admin/services/add";
import Icons from "../www.teymur.pro/admin/icons/add";

function Site() {
  const servicesSectionRef = useRef(null);
  const iconsSectionRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToServices = () => {
    setIsScrolling(true);
    scrollToSection(servicesSectionRef);
    setTimeout(() => {
      setIsScrolling(false);
    }, 1200); // Adjust this timeout to prevent continuous smooth scrolling
  };

  const scrollToIcons = () => {
    setIsScrolling(true);
    scrollToSection(iconsSectionRef);
    setTimeout(() => {
      setIsScrolling(false);
    }, 1200); // Adjust this timeout to prevent continuous smooth scrolling
  };
  
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (!isScrolling) {
        const container = e.currentTarget;
        const deltaY = e.deltaY;

        const scrollSpeed = 10; // Adjust this value to control the scroll speed

        container.scrollBy({
          top: deltaY * scrollSpeed,
          behavior: 'smooth',
        });
      }
    };

    const container = document.querySelector('.scroll-container');
    container.addEventListener('wheel', handleWheel);

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [isScrolling]);
  return (
    <main className="scroll-container">
      <div>
        <div className="w3-black">
          
            {/* Your common section content */}
          
            <div className="page-content">
              <Host scrollToServices={scrollToServices} />
            </div>
            <div className="page-content" ref={servicesSectionRef} id="servicesSection">
              <Services scrollToIcons={scrollToIcons} />
            </div>
            <div className="page-content" ref={iconsSectionRef} id="iconSection">
              <Icons />
            </div>
        </div>
      </div>
    </main>
  );
}

export default Site;
