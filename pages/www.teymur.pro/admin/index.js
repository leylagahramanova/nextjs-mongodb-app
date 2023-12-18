// /pages/www.teymur.pro/admin/index.js

import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Host from "../../../components/Host";
import Services from "../admin/services/add";
import Icons from "../admin/icons/add";
import Login from "@/components/Login";

function Site() {
  const router = useRouter();
  const servicesSectionRef = useRef(null);
  const iconsSectionRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    }, 1500); // Adjust this timeout to prevent continuous smooth scrolling
  };

  const scrollToIcons = () => {
    setIsScrolling(true);
    scrollToSection(iconsSectionRef);
    setTimeout(() => {
      setIsScrolling(false);
    }, 1500); // Adjust this timeout to prevent continuous smooth scrolling
  };

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (!isScrolling) {
        const container = e.currentTarget;
        const deltaY = e.deltaY;

        const scrollSpeed = 5; // Adjust this value to control the scroll speed

        container.scrollBy({
          top: deltaY * scrollSpeed,
          behavior: 'smooth',
        });
      }
    };

    const container = document.querySelector('.scroll-container');
    if (container) {
      container.addEventListener('wheel', handleWheel);

      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [isScrolling]);

  const handleLogin = (password) => {
    if (password === 'p') {
      setIsLoggedIn(true);
    } else {
      alert('Incorrect password!');
    }
  };

  if (!isLoggedIn) {
    return <Login handleLogin={handleLogin} />;
  }

  return (
    <main className="scroll-container">
      <div className="w3-black">
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
    </main>
  );
}

export default Site;