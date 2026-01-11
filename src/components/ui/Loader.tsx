import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
    onLoadingComplete: () => void;
}

const Loader = ({ onLoadingComplete }: LoaderProps) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000; // 2 seconds loading time
        const interval = 20;
        const steps = duration / interval;
        const increment = 100 / steps;

        const timer = setInterval(() => {
            setCount((prev) => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return next;
            });
        }, interval);

        const completeTimer = setTimeout(() => {
            onLoadingComplete();
        }, duration + 500); // Slight delay after 100%

        return () => {
            clearInterval(timer);
            clearTimeout(completeTimer);
        };
    }, [onLoadingComplete]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-screen h-[100dvh] z-[9999] flex items-center justify-center bg-black overflow-hidden"
            initial={{ y: 0 }}
            exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
            <div className="relative z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-baseline justify-center relative z-20"
                >
                    <span className="text-8xl md:text-9xl font-display font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                        {Math.round(count)}
                    </span>
                    <span className="text-4xl md:text-5xl font-display font-bold text-accent ml-2 drop-shadow-[0_0_10px_rgba(0,255,136,0.8)]">
                        %
                    </span>
                </motion.div>

                <motion.div
                    className="mt-4 h-1 w-48 bg-surface overflow-hidden rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <motion.div
                        className="h-full bg-accent"
                        style={{ width: `${count}%` }}
                    />
                </motion.div>

                <motion.p
                    className="mt-4 text-muted font-mono text-xs uppercase tracking-[0.2em]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Initializing System
                </motion.p>
            </div>

            {/* Background Grid Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-20" />
        </motion.div>
    );
};

export default Loader;
