import { useRef, useEffect, useState } from 'react';
import { createSmoothHorizontalScroller } from '../../utils/smoothHorizontalScroll';
import Mascot from '../mascot/Mascot';
import ConveyorBelt from '../mascot/ConveyorBelt';

interface HorizontalScrollContainerProps {
    children: React.ReactNode;
    scrollerRef?: React.RefObject<HTMLDivElement | null>;
    isDesktop?: boolean;
    onLandingComplete?: () => void;
}

const HorizontalScrollContainer = ({
    children,
    scrollerRef: externalScrollerRef,
    isDesktop = true,
    onLandingComplete
}: HorizontalScrollContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const internalScrollerRef = useRef<HTMLDivElement>(null);
    // Use external ref if provided, otherwise use internal
    const scrollerRef = (externalScrollerRef || internalScrollerRef) as React.RefObject<HTMLDivElement>;

    // State to track mascot landing animation
    const [isMascotLanding, setIsMascotLanding] = useState(true);

    useEffect(() => {
        // Only enable smooth horizontal scroll on desktop
        if (!isDesktop) return;

        const container = scrollerRef.current;
        if (!container) return;

        // Initialize smooth horizontal scroller
        const cleanup = createSmoothHorizontalScroller(container);

        return cleanup;
    }, [isDesktop, scrollerRef]);

    return (
        <div ref={containerRef} className={`relative ${isDesktop ? 'h-screen overflow-hidden' : 'min-h-screen overflow-x-hidden'}`}>
            <div
                ref={scrollerRef}
                className={`
                    flex h-full 
                    ${isDesktop
                        ? 'overflow-x-auto overflow-y-hidden scroll-smooth flex-row'
                        : 'flex-col overflow-y-auto overflow-x-hidden'
                    }
                    transition-opacity duration-1000 ease-in-out
                    ${isMascotLanding ? 'opacity-0' : 'opacity-100'}
                `}
                style={isDesktop ? {
                    scrollBehavior: 'auto', // Let JS handle smoothing
                    willChange: 'transform, scroll-position',
                    transform: 'translateZ(0)' // GPU acceleration
                } : undefined}
            >
                {children}
            </div>

            <Mascot
                containerRef={scrollerRef}
                onLandingComplete={() => {
                    setIsMascotLanding(false);
                    onLandingComplete?.();
                }}
            />
            {isDesktop && <ConveyorBelt containerRef={scrollerRef} />}
        </div>
    );
};

export default HorizontalScrollContainer;
