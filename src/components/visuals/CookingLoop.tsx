import { useEffect, useRef } from 'react';
import lottie, { type AnimationItem } from 'lottie-web';
import animationData from '../../assets/Cooking.json';

interface CookingLoopProps {
    className?: string;
}

const CookingLoop = ({ className }: CookingLoopProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const instance: AnimationItem = lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData,
        });

        // Force scale and constrain the SVG
        let cleanup: (() => void) | undefined;
        const resizeObserver = new MutationObserver(() => {
            if (!containerRef.current) return;
            const svg = containerRef.current.querySelector('svg');
            if (svg) {
                svg.style.width = '100%';
                svg.style.height = '100%';
                svg.style.transformOrigin = 'top left';
                svg.style.transform = 'scale(0.4)'; // 40% size
            }
        });
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current, { childList: true, subtree: true });
        }
        cleanup = () => resizeObserver.disconnect();

        return () => {
            instance.destroy();
            if (cleanup) cleanup();
        };
    }, []);

    return <div ref={containerRef} className={`overflow-hidden relative ${className || ''}`} />;
};

export default CookingLoop;

