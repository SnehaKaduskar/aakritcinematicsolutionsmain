import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/Loading.json';

interface LoaderProps {
    onLoadingComplete: () => void;
}

const Loader = ({ onLoadingComplete }: LoaderProps) => {

    useEffect(() => {
        // Set loading duration to match the animation (approximately 1.5 seconds)
        const completeTimer = setTimeout(() => {
            onLoadingComplete();
        }, 1500);

        return () => {
            clearTimeout(completeTimer);
        };
    }, [onLoadingComplete]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-screen h-[100dvh] z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm overflow-hidden"
            initial={{ y: 0 }}
            exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
            <div className="relative z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-24 h-24 md:w-32 md:h-32"
                >
                    <Lottie
                        animationData={loadingAnimation}
                        loop={true}
                        autoplay={true}
                        style={{ maxWidth: '300px', maxHeight: '300px' }}
                    />
                </motion.div>
            </div>

            {/* Background Grid Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-20" />
        </motion.div>
    );
};

export default Loader;
