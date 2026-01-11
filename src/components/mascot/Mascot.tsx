import { useEffect, useRef, useState } from 'react';
import lottie, { type AnimationItem } from 'lottie-web';
import walkData from '../../assets/walk.json';
import idleData from '../../assets/idle.json';

interface MascotProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
}

const Mascot = ({ containerRef }: MascotProps) => {
    const walkContainerRef = useRef<HTMLDivElement>(null);
    const idleContainerRef = useRef<HTMLDivElement>(null);
    const walkAnimRef = useRef<AnimationItem | null>(null);
    const idleAnimRef = useRef<AnimationItem | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // State to toggle between idle and walk
    const [isWalking, setIsWalking] = useState(false);

    // Debug State (console only now)
    const [debugInfo, setDebugInfo] = useState({ walkLoaded: false, idleLoaded: false });

    const scrollTimeout = useRef<number | null>(null);

    // Initialize animations
    useEffect(() => {
        // --- Walk Animation ---
        if (walkContainerRef.current) {
            try {
                if (walkAnimRef.current) walkAnimRef.current.destroy();
                walkAnimRef.current = lottie.loadAnimation({
                    container: walkContainerRef.current,
                    renderer: 'svg',
                    loop: true,
                    autoplay: false,
                    animationData: walkData,
                    rendererSettings: { preserveAspectRatio: 'xMidYMid meet' }
                });

                walkAnimRef.current.addEventListener('DOMLoaded', () => {
                    console.log("Mascot: Walk Loaded");
                    setDebugInfo(prev => ({ ...prev, walkLoaded: true }));
                });

            } catch (error) {
                console.error("Mascot: Failed to load walk animation", error);
            }
        }

        // --- Idle Animation ---
        if (idleContainerRef.current) {
            try {
                if (idleAnimRef.current) idleAnimRef.current.destroy();
                idleAnimRef.current = lottie.loadAnimation({
                    container: idleContainerRef.current,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: idleData,
                    rendererSettings: { preserveAspectRatio: 'xMidYMid meet' }
                });

                idleAnimRef.current.addEventListener('DOMLoaded', () => {
                    console.log("Mascot: Idle Loaded");
                    setDebugInfo(prev => ({ ...prev, idleLoaded: true }));
                });

            } catch (error) {
                console.error("Mascot: Failed to load idle animation", error);
            }
        }

        return () => {
            walkAnimRef.current?.destroy();
            idleAnimRef.current?.destroy();
        };
    }, []);

    // Scroll Handler
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = (isInitial = false) => {
            const scrollPos = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;
            const progress = maxScroll > 0 ? scrollPos / maxScroll : 0;

            // 1. Scrub Walk
            const walkAnim = walkAnimRef.current;
            if (walkAnim && walkAnim.isLoaded) {
                const totalFrames = walkAnim.totalFrames > 0 ? walkAnim.totalFrames : 60;
                const pixelsPerFrame = 15;
                const frame = (scrollPos / pixelsPerFrame) % totalFrames;
                walkAnim.goToAndStop(frame, true);
            }

            // 2. Lateral Movement
            const moveDistanceOfScreen = window.innerWidth * 0.88;
            const currentX = progress * moveDistanceOfScreen;

            if (wrapperRef.current) {
                wrapperRef.current.style.transform = `translateX(${currentX}px) translateZ(0)`;
            }

            // 3. State Switching (SKIP on initial load)
            if (!isInitial) {
                if (!isWalking) setIsWalking(true);

                if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
                // 500ms timeout to return to Idle
                scrollTimeout.current = window.setTimeout(() => {
                    setIsWalking(false);
                }, 500);
            }
        };

        // Initial update (pass true to skip state switching)
        handleScroll(true);

        // Event listener wrapper
        const onScroll = () => handleScroll(false);

        container.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            container.removeEventListener('scroll', onScroll);
            if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
        };
    }, [containerRef, isWalking]);

    return (
        <div
            ref={wrapperRef}
            className="absolute left-8 z-[9999] pointer-events-none transition-transform duration-75 ease-linear will-change-transform"
            style={{
                width: '180px',
                height: '180px',
                bottom: '20px',
            }}
        >
            {/* Walk Container */}
            <div
                ref={walkContainerRef}
                className={`w-full h-full absolute top-0 left-0 transition-opacity duration-300 ${isWalking ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Idle Container */}
            <div
                ref={idleContainerRef}
                className={`w-full h-full absolute top-0 left-0 transition-opacity duration-300 ${isWalking ? 'opacity-0' : 'opacity-100'}`}
            />
        </div>
    );
};

export default Mascot;
