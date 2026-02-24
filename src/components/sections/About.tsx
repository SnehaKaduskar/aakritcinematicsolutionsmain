import { motion } from 'framer-motion';
import clsx from 'clsx';
import useMediaQuery from '../../hooks/useMediaQuery';

interface AboutProps {
    id?: string;
    className?: string;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

const About = ({ id = 'about', className }: AboutProps) => {
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)');

    // Derive padding and font sizes per breakpoint
    const horizontalPadding = isDesktop ? '6%' : isTablet ? '6%' : '5%';
    const bodySize = isDesktop
        ? 'text-[min(0.85vw,1.5vh)] text-justify leading-[min(1.4vw,2.6vh)]'
        : isTablet
            ? 'text-[min(1.8vw,2vh)] text-justify leading-relaxed'
            : 'text-[min(3.5vw,2.5vh)] text-justify leading-snug';

    const taglineSize = isDesktop
        ? 'text-[min(0.95vw,1.6vh)]'
        : isTablet
            ? 'text-[min(2vw,2.2vh)]'
            : 'text-[min(4vw,2.8vh)]';

    return (
        <section
            id={id}
            className={clsx(
                'min-h-[100dvh] w-screen flex-shrink-0 flex flex-col items-center justify-center bg-transparent relative overflow-visible',
                className
            )}
            style={{
                boxSizing: 'border-box',
                paddingTop: isDesktop ? '100px' : '80px',
                paddingBottom: isDesktop ? '160px' : isTablet ? '130px' : '110px',
                paddingLeft: isDesktop ? '4rem' : isTablet ? '4rem' : '1.5rem',
                paddingRight: isDesktop ? '4rem' : isTablet ? '4rem' : '1.5rem',
            }}
        >
            <div
                className="w-full mx-auto relative z-10 flex flex-col items-center justify-center"
                style={{
                    maxWidth: isDesktop ? 'min(35vw, 75vh)' : isTablet ? '65vw' : '85vw',
                    height: '100%',
                    maxHeight: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={containerVariants}
                    className="flex flex-col items-center w-full"
                    style={{
                        height: '100%',
                        maxHeight: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* Heading - outside the box */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col items-center w-full flex-shrink-0"
                        style={{ marginBottom: isDesktop ? 'min(1.5vh, 1.5vw)' : 'clamp(0.5rem, 2vh, 2rem)' }}
                    >
                        <h2
                            className="font-display font-bold tracking-widest leading-none text-center flex-shrink-0"
                            style={{
                                fontSize: isDesktop ? 'min(5vw, 8vh)' : 'clamp(1.5rem, 5vw, 6rem)',
                                textShadow: '3px 3px 8px rgba(255, 100, 0, 0.5), 0 0 40px rgba(255, 140, 0, 0.7), 0 0 80px rgba(255, 140, 0, 0.35)',
                                color: '#ffffffff',
                                paddingBottom: 'clamp(0.2rem, 1dvh, 1rem)',
                                letterSpacing: '0.12em',
                                fontFamily: 'Retroica, sans-serif',
                            }}
                        >
                            about us.
                        </h2>
                        <div
                            className="flex-shrink-0 mt-2"
                            style={{
                                width: isDesktop ? 'min(18vw, 30vh)' : 'clamp(180px, 35vw, 600px)',
                                height: '3px',
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                                borderRadius: '9999px',
                            }}
                        />
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="w-full relative flex items-center justify-center flex-1 min-h-0"
                    >
                        <div
                            className="flex flex-col items-center justify-center relative z-10 w-full h-full max-h-full"
                            style={{
                                paddingLeft: horizontalPadding,
                                paddingRight: horizontalPadding,
                                paddingTop: isDesktop ? 'min(2vh, 2vw)' : '1rem',
                                paddingBottom: isDesktop ? 'min(2vh, 2vw)' : '1rem',
                                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.16) 100%)',
                                backdropFilter: 'blur(8px) saturate(1.2)',
                                WebkitBackdropFilter: 'blur(8px) saturate(1.2)',
                                border: '1.5px solid rgba(255, 255, 255, 0.4)',
                                borderRadius: isDesktop ? '32px' : isTablet ? '28px' : '22px',
                                boxShadow: '0 0 30px rgba(255, 140, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
                                overflowY: 'auto',
                            }}
                        >

                            {/* Body Text */}
                            <div
                                className={clsx(
                                    'flex flex-col font-light text-text/90 mx-auto w-full h-full justify-center',
                                    bodySize
                                )}
                                style={{
                                    fontFamily: 'Retroica, sans-serif',
                                    gap: isDesktop ? 'min(1.2vh, 1vw)' : '0.6rem'
                                }}
                            >
                                <motion.p variants={itemVariants}>
                                    Aakrit Cinematic Solutions was born from a simple yet powerful thought — to contribute to India's animation and film industry and show the world its true creative strength. What began as a spark has now evolved into a mission: to build a full-spectrum production house that excels in movies, animation, VFX, 3D visualization, editing, and every craft that brings imagination to life.
                                </motion.p>

                                <motion.p variants={itemVariants}>
                                    The name Aakrit, rooted in Sanskrit, means "to create". It represents our cultural foundation and the belief that creation is the most transformative act. Staying grounded in our Sanskriti keeps us humble; our ambition pushes us to innovate, experiment, and deliver on global standards.
                                </motion.p>

                                <motion.p variants={itemVariants}>
                                    We are architects of imagination, designers of emotion, and creators of immersive experiences. Our vision is bold: To place Indian animation and production on the global map, proving that our industry is not just evolving — it is roaring with potential and brilliance.
                                </motion.p>

                                <motion.p variants={itemVariants}>
                                    At Aakrit Cinematic Solutions, every frame is creation, every project is passion, and every story is a new possibility. From the smallest detail to the final output — excellence is non-negotiable.
                                </motion.p>

                                {/* Taglines - Extra spacing to differentiate */}
                                <motion.div
                                    variants={itemVariants}
                                    className={clsx(
                                        "text-center w-full",
                                        isDesktop ? "mt-[min(3vh,2vw)]" : isTablet ? "mt-[30px]" : "mt-[16px]"
                                    )}
                                >
                                    <div
                                        className={clsx(
                                            'flex flex-col text-tagline font-normal italic items-center',
                                            taglineSize,
                                            isTablet ? 'gap-y-4' : 'gap-y-1'
                                        )}
                                    >
                                        <p>This is Aakrit.</p>
                                        <p>Bringing ideas to life.</p>
                                        <p>Pure Cinematic Creation.</p>
                                    </div>
                                    <div className="h-[2px] w-full max-w-[300px] mx-auto bg-[#FEA800]/20 mt-4 md:mt-8" />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
export default About;