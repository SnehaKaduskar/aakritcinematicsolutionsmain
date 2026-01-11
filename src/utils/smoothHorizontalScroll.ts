/**
 * Creates a smooth horizontal scroller using requestAnimationFrame
 * Maps vertical wheel/touch to horizontal scroll with interpolation
 */
export function createSmoothHorizontalScroller(container: HTMLElement) {
    let target = container.scrollLeft;
    let current = container.scrollLeft;
    const ease = 0.12; // Adjust for snappier (higher) vs smoother (lower)
    let rafId: number;

    function lerp(a: number, b: number, t: number) {
        return a + (b - a) * t;
    }

    // Wheel handler - non-passive so we can preventDefault
    function onWheel(e: WheelEvent) {
        // Map vertical wheel to horizontal scroll
        if (Math.abs(e.deltaY) > 0) {
            e.preventDefault();
            target += e.deltaY;
            // Clamp target to valid scroll range
            target = Math.max(0, Math.min(container.scrollWidth - container.clientWidth, target));
        }
    }

    // Touch handlers for mobile
    let touchStartY = 0;
    let touchStartX = 0;

    function onTouchStart(e: TouchEvent) {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    }

    function onTouchMove(e: TouchEvent) {
        const currentY = e.touches[0].clientY;
        const currentX = e.touches[0].clientX;
        const deltaY = touchStartY - currentY;
        const deltaX = touchStartX - currentX;

        // If vertical swipe is more dominant, map to horizontal
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            e.preventDefault();
            target += deltaY;
            target = Math.max(0, Math.min(container.scrollWidth - container.clientWidth, target));
            touchStartY = currentY;
        }
    }

    // RAF loop for smooth interpolation
    function update() {
        current = lerp(current, target, ease);
        container.scrollLeft = Math.round(current);
        rafId = requestAnimationFrame(update);
    }

    // Start RAF loop
    rafId = requestAnimationFrame(update);

    // Attach listeners (passive: false for preventDefault)
    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: false });

    // Cleanup function
    return () => {
        cancelAnimationFrame(rafId);
        container.removeEventListener('wheel', onWheel);
        container.removeEventListener('touchstart', onTouchStart);
        container.removeEventListener('touchmove', onTouchMove);
    };
}

// Export target/current for external access (e.g., for mascot sync)
export function getScrollState(container: HTMLElement) {
    return {
        current: container.scrollLeft,
        max: container.scrollWidth - container.clientWidth
    };
}
