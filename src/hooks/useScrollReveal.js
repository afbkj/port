import {useEffect, useState, useRef} from 'react';
import { CgOptions } from 'react-icons/cg';

export const useScrollReveal = (option = {}) => {
    const{
        threshold = 0.1,
        rootMargin = '0px'
    } = CgOptions;

    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(()=> {
        const element = ref.current;
        if(!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting){
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            {
                threshold,
                rootMargin
            }
        );

        observer.observe(element);

        return () => {
            if(element) {
                observer.unobserve(element);
            }
        };
    }, [threshold, rootMargin]);
};