import React, { useEffect } from 'react';

function ScrollHandler() {
  useEffect(() => {
    const handleMouseWheel = (e) => {
      // Replace these with your actual section IDs
      const sectionIds = ['#head', '#host', '#servicesSection', '#iconSection', '#panel5', '#panel6'];

      const currentPosition = window.scrollY;
      const deltaY = e.deltaY;

      // Find the current section index
      const currentIndex = sectionIds.findIndex((id) => currentPosition >= document.querySelector(id).offsetTop);

      // Calculate the target section based on scroll direction
      const targetIndex = deltaY > 0 ? Math.min(currentIndex + 1, sectionIds.length - 1) : Math.max(currentIndex - 1, 0);

      // Scroll smoothly to the target section
      scrollIntoView(sectionIds[targetIndex]);
    };

    const scrollIntoView = (targetId) => {
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('wheel', handleMouseWheel);

    return () => {
      window.removeEventListener('wheel', handleMouseWheel);
    };
  }, []);

  return null;
}

export default ScrollHandler;
