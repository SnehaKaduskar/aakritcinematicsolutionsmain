import { useEffect, useRef } from 'react';

interface ConveyorBeltProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
}

const ConveyorBelt = ({ containerRef }: ConveyorBeltProps) => {
    const beltRef = useRef<HTMLDivElement | null>(null);
    const currentOffset = useRef(0);

    useEffect(() => {
        const containerElement = containerRef.current;
        if (!containerElement) return;
        const resolvedContainer: HTMLDivElement = containerElement;

        let rafId: number;

        function update() {
            const beltElement = beltRef.current;
            if (!beltElement) return;
            const scrollLeft = resolvedContainer.scrollLeft;

            // Map scroll to belt offset for seamless loop effect
            currentOffset.current = -(scrollLeft * 0.5) % 100;
            beltElement.style.transform = `translateX(${currentOffset.current}%)`;

            rafId = requestAnimationFrame(update);
        }

        rafId = requestAnimationFrame(update);

        return () => {
            cancelAnimationFrame(rafId);
        };
    }, [containerRef]);

    return (
        <div className="absolute bottom-0 left-0 w-full h-16 bg-surface border-t-2 border-border z-10 overflow-hidden">
            <div ref={beltRef} className="w-full h-full flex items-center will-change-transform">
                {/* Repeating pattern for the belt */}
                <div className="flex w-[200%]">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="flex-shrink-0 w-[5%] h-full border-r border-muted/30 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-muted/50"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConveyorBelt;
