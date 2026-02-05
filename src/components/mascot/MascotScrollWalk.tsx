import { useEffect, useRef } from 'react';
import lottie, { type AnimationItem } from 'lottie-web';
import walkData from '../../assets/walk.json';

interface MascotScrollWalkProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
}

const MascotScrollWalk = ({ containerRef }: MascotScrollWalkProps) => {
    const walkContainerRef = useRef<HTMLDivElement>(null);
    const walkAnimRef = useRef<AnimationItem | null>(null);
    const lastScrollPos = useRef(0);

    // Initialize walk animation
    useEffect(() => {
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
            } catch (error) {
                console.error("MascotScrollWalk: Failed to load walk animation", error);
            }
        }

        return () => {
            walkAnimRef.current?.destroy();
        };
    }, []);

    // Handle horizontal container scroll
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollPos = container.scrollLeft;
            const diff = Math.abs(scrollPos - lastScrollPos.current);

            if (diff > 0.5) {
                lastScrollPos.current = scrollPos;

                const walkAnim = walkAnimRef.current;
                if (walkAnim && walkAnim.isLoaded) {
                    const totalFrames = walkAnim.totalFrames > 0 ? walkAnim.totalFrames : 60;
                    const pixelsPerFrame = 15;
                    const frame = (scrollPos / pixelsPerFrame) % totalFrames;
                    walkAnim.goToAndStop(frame, true);
                }
            }
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [containerRef]);

    return (
        <div
            className="fixed z-[9998] pointer-events-none"
            style={{
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)',
                width: '180px',
                height: '180px'
            }}
        >
            <div ref={walkContainerRef} className="w-full h-full" />
        </div>
    );
};

export default MascotScrollWalk;
