import { motion, useScroll, useTransform } from 'framer-motion';
import bgSvg from '../../assets/website_bg-01.svg';

interface SeamlessBackgroundProps {
    scrollerRef: React.RefObject<HTMLDivElement | null>;
    isVisible: boolean;
}

const SeamlessBackground = ({ scrollerRef, isVisible }: SeamlessBackgroundProps) => {
    // We expect scrollerRef to be mounted when this component is rendered
    const { scrollXProgress } = useScroll({ container: scrollerRef });
    const backgroundX = useTransform(scrollXProgress, [0, 1], ["0vw", "-200vw"]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 1 }}
            style={{
                backgroundImage: `url(${bgSvg})`,
                backgroundRepeat: 'repeat-x',
                backgroundSize: 'auto 100%',
                backgroundPositionX: backgroundX
            }}
        />
    );
};

export default SeamlessBackground;
