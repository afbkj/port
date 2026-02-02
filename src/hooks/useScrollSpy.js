import { useEffect, useState } from "react";

export const useScrollSpy = (sectionsIds, offset = 100) => {
    const [activateSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + offset;

            //Find the current section
            for(let i = sectionsIds.length -1; i >= 0; i--){
                const section = document.getElementById(sectionsIds[i]);
                if (section){
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;

                    if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight){
                        setActiveSection(sectionsIds[i]);
                        break;
                    }
                }
            }
        };
        
        handleScroll();

        window.addEventListener('scroll', handleScroll, {passive: true});

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [sectionsIds, offset]);

    return activateSection;
};

//Smooth scroll to a section
export const scrollToSection = (sectionId, offset = 80) => {
    const section = document.getElementById(sectionId);
    if (section){
        const top = section.offsetTop - offset;
        window.scrollTo({
            top,
            behavior: 'smooth'
        });
    }
};