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
        ? 'text-[clamp(11px,0.75vw,14px)]'
        : isTablet
            ? 'text-xs'
            : 'text-[11px] leading-snug';
    const taglineSize = isDesktop
        ? 'text-xs'
        : isTablet
            ? 'text-sm'
            : 'text-sm';

    return (
        <section
            id={id}
            className={clsx(
                'min-h-screen w-screen flex-shrink-0 flex justify-center items-center bg-transparent relative overflow-visible',
                className
            )}
        >
            <div className="w-full h-full min-h-screen mx-auto relative z-10 flex justify-center items-center" style={{ maxWidth: isDesktop ? 'min(700px, 50vw)' : '100%', padding: isDesktop ? '0 4rem' : isTablet ? '0 4rem' : '0 2rem' }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={containerVariants}
                    className="flex flex-col items-center w-full"
                >
                    {/* Heading - outside the box */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col items-center w-full"
                        style={{ marginBottom: 'clamp(1.5rem, 4vh, 4rem)' }}
                    >
                        <h2
                            className="font-display font-bold tracking-widest leading-none text-center flex-shrink-0"
                            style={{
                                fontSize: 'clamp(1.8rem, 5.5vw, 6rem)',
                                textShadow: '3px 3px 8px rgba(255, 100, 0, 0.5), 0 0 40px rgba(255, 140, 0, 0.7), 0 0 80px rgba(255, 140, 0, 0.35)',
                                color: '#ffffffff',
                                paddingBottom: 'clamp(0.4rem, 1vh, 1rem)',
                                letterSpacing: '0.12em',
                                fontFamily: 'Retroica, sans-serif',
                            }}
                        >
                            about us.
                        </h2>
                        <div
                            className="flex-shrink-0 mt-2"
                            style={{
                                width: 'clamp(200px, 38vw, 600px)',
                                height: '3px',
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                                borderRadius: '9999px',
                            }}
                        />
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="w-full relative flex items-center"
                    >
                        <div
                            className="flex flex-col items-center justify-center relative z-10 w-full"
                            style={{
                                paddingLeft: horizontalPadding,
                                paddingRight: horizontalPadding,
                                paddingTop: isDesktop ? '1.25rem' : isTablet ? '1.25rem' : '1.25rem',
                                paddingBottom: isDesktop ? '1.25rem' : isTablet ? '1.25rem' : '1.25rem',
                                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.16) 100%)',
                                backdropFilter: 'blur(8px) saturate(1.2)',
                                WebkitBackdropFilter: 'blur(8px) saturate(1.2)',
                                border: '1px solid rgba(255, 255, 255, 0.35)',
                                borderTop: '1.5px solid rgba(255, 255, 255, 0.5)',
                                borderLeft: '1px solid rgba(255, 255, 255, 0.4)',
                                borderRadius: isDesktop ? '24px' : isTablet ? '20px' : '16px',
                                boxShadow: '0 0 30px rgba(255, 140, 0, 0.25), 0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
                            }}
                        >

                            {/* Body Text */}
                            <div
                                className={clsx(
                                    'flex flex-col leading-relaxed text-text/90 font-light text-justify mx-auto w-full',
                                    bodySize
                                )}
                                style={{
                                    fontFamily: 'Retroica, sans-serif',
                                    // One line gap between paragraphs
                                    gap: isDesktop ? '0.65rem' : isTablet ? '0.75rem' : '0.6rem'
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
                                        isDesktop ? "mt-[40px]" : isTablet ? "mt-[30px]" : "mt-[16px]"
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