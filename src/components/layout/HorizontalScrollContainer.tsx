import { useRef, useEffect } from 'react';
import { createSmoothHorizontalScroller } from '../../utils/smoothHorizontalScroll';
import Mascot from '../mascot/Mascot';
import ConveyorBelt from '../mascot/ConveyorBelt';

interface HorizontalScrollContainerProps {
    children: React.ReactNode;
}

const HorizontalScrollContainer = ({ children }: HorizontalScrollContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = scrollerRef.current;
        if (!container) return;

        // Initialize smooth horizontal scroller
        const cleanup = createSmoothHorizontalScroller(container);

        return cleanup;
    }, []);

    return (
        <div ref={containerRef} className="relative h-screen overflow-hidden">
            <div
                ref={scrollerRef}
                className="flex h-full overflow-x-auto overflow-y-hidden scroll-smooth"
                style={{
                    scrollBehavior: 'auto', // Let JS handle smoothing
                    willChange: 'transform, scroll-position',
                    transform: 'translateZ(0)' // GPU acceleration
                }}
            >
                {children}
            </div>

            <Mascot containerRef={scrollerRef} />
            <ConveyorBelt containerRef={scrollerRef} />
        </div>
    );
};

export default HorizontalScrollContainer;
