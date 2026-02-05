import { useEffect, useRef } from 'react';
import lottie, { type AnimationItem } from 'lottie-web';
import walkData from '../../assets/walk.json';

const MascotWalkLooping = () => {
    const walkContainerRef = useRef<HTMLDivElement>(null);
    const walkAnimRef = useRef<AnimationItem | null>(null);

    // Initialize walk animation
    useEffect(() => {
        if (walkContainerRef.current) {
            try {
                if (walkAnimRef.current) walkAnimRef.current.destroy();
                walkAnimRef.current = lottie.loadAnimation({
                    container: walkContainerRef.current,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: walkData,
                    rendererSettings: { preserveAspectRatio: 'xMidYMid meet' }
                });
            } catch (error) {
                console.error("MascotWalkLooping: Failed to load walk animation", error);
            }
        }

        return () => {
            walkAnimRef.current?.destroy();
        };
    }, []);

    return (
        <div
            className="fixed z-[9998] pointer-events-none"
            style={{
                bottom: '10px',
                right: '10px',
                width: '180px',
                height: '180px'
            }}
        >
            <div ref={walkContainerRef} className="w-full h-full" />
        </div>
    );
};

export default MascotWalkLooping;
