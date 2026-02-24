import { useEffect } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import useMediaQuery from '../../hooks/useMediaQuery';
import RetroicaFont from '../../assets/fonts/Retroica.ttf';

const RETROICA = '"Retroica", Georgia, serif';

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

    useEffect(() => {
        // Inject Retroica font
        if (!document.getElementById('retroica-font-face')) {
            const s = document.createElement('style');
            s.id = 'retroica-font-face';
            s.textContent = `@font-face { font-family: 'Retroica'; src: url('${RetroicaFont}') format('truetype'); font-weight: normal; font-style: normal; font-display: swap; }`;
            document.head.appendChild(s);
        }
    }, []);

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
                'w-screen flex-shrink-0 flex justify-center bg-transparent relative overflow-hidden',
                isDesktop || isTablet ? 'min-h-screen items-center' : 'items-center',
                className
            )}
            style={{
                height: isDesktop ? undefined : '100vh',
                paddingBottom: isDesktop ? '8vh' : isTablet ? '6vh' : 'calc(100px + 2rem)',
                paddingTop: isDesktop ? '0' : isTablet ? '0' : 'calc(64px + 1rem)',
            }}
        >
            <div className="w-full mx-auto relative z-10 flex justify-center items-center" style={{ maxWidth: isDesktop ? 'min(700px, 50vw)' : '100%', padding: isDesktop ? '0 4rem' : isTablet ? '0 4rem' : '0 2rem', maxHeight: isDesktop ? undefined : isTablet ? undefined : '100%' }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={containerVariants}
                    className="flex flex-col items-center w-full"
                >
                    <motion.div
                        variants={itemVariants}
                        className="w-full relative flex items-center"
                    >
                        <div
                            className="flex flex-col items-center justify-center relative z-10 w-full"
                            style={{
                                paddingLeft: horizontalPadding,
                                paddingRight: horizontalPadding,
                                paddingTop: isDesktop ? '1.25rem' : isTablet ? '1.25rem' : '0.75rem',
                                paddingBottom: isDesktop ? '1.25rem' : isTablet ? '1.25rem' : '0.75rem',
                                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.16) 100%)',
                                backdropFilter: 'blur(8px) saturate(1.2)',
                                WebkitBackdropFilter: 'blur(8px) saturate(1.2)',
                                border: '1px solid rgba(255, 255, 255, 0.35)',
                                borderTop: '1.5px solid rgba(255, 255, 255, 0.5)',
                                borderLeft: '1px solid rgba(255, 255, 255, 0.4)',
                                borderRadius: isDesktop ? '24px' : isTablet ? '20px' : '16px',
                                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
                                maxHeight: isDesktop ? undefined : isTablet ? undefined : 'calc(100vh - 64px - 100px - 3rem)',
                                overflowY: isDesktop ? undefined : isTablet ? undefined : 'auto',
                            }}
                        >
                            {/* Heading - matching Team/Portfolio style */}
                            <motion.div variants={itemVariants} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '100%',
                                marginBottom: isDesktop ? '1.5rem' : isTablet ? '1.25rem' : '1rem',
                                gap: isDesktop ? '0.1rem' : isTablet ? '0.6rem' : '0.5rem',
                            }}>
                                <h2 style={{
                                    margin: 0,
                                    lineHeight: 1,
                                    fontWeight: 400,
                                    display: 'inline-block',
                                    whiteSpace: 'nowrap',
                                    position: 'relative',
                                }}>
                                    <span style={{
                                        fontFamily: RETROICA,
                                        fontSize: isDesktop ? 'clamp(2rem, 3.5vw, 4.5rem)' : isTablet ? 'clamp(1.8rem, 5vw, 3.5rem)' : 'clamp(1.5rem, 7vw, 2.8rem)',
                                        letterSpacing: '-0.02em',
                                        color: '#FFFFFF',
                                        textTransform: 'lowercase',
                                        fontWeight: 400,
                                        textShadow: `
                                            0 0 8px rgba(255, 165, 0, 0.5),
                                            0 0 16px rgba(255, 165, 0, 0.35),
                                            0 0 30px rgba(255, 165, 0, 0.25),
                                            0 0 50px rgba(255, 165, 0, 0.15),
                                            0 0 70px rgba(255, 165, 0, 0.08)
                                        `,
                                    }}>
                                        about us
                                    </span>
                                    <span style={{
                                        fontFamily: RETROICA,
                                        fontSize: isDesktop ? 'clamp(2rem, 3.5vw, 4.5rem)' : isTablet ? 'clamp(1.8rem, 5vw, 3.5rem)' : 'clamp(1.5rem, 7vw, 2.8rem)',
                                        color: '#FFFFFF',
                                        fontWeight: 400,
                                        textShadow: `
                                            0 0 8px rgba(255, 165, 0, 0.5),
                                            0 0 16px rgba(255, 165, 0, 0.35),
                                            0 0 30px rgba(255, 165, 0, 0.25),
                                            0 0 50px rgba(255, 165, 0, 0.15),
                                            0 0 70px rgba(255, 165, 0, 0.08)
                                        `,
                                    }}>
                                        .
                                    </span>
                                </h2>

                                {/* Gradient underline - matching Team/Portfolio style */}
                                <div style={{
                                    position: 'relative',
                                    width: '100%',
                                    maxWidth: '500px',
                                    height: '3px',
                                    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 15%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.5) 85%, rgba(255, 255, 255, 0) 100%)',
                                    borderRadius: '1px',
                                    boxShadow: '0 2px 8px rgba(255, 165, 0, 0.12)',
                                }} />
                            </motion.div>

                            {/* Body Text */}
                            <div
                                className={clsx(
                                    'flex flex-col leading-relaxed text-text/90 text-justify mx-auto w-full',
                                    bodySize
                                )}
                                style={{
                                    fontFamily: RETROICA,
                                    fontWeight: 100,
                                    letterSpacing: '0.02em',
                                    WebkitFontSmoothing: 'antialiased',
                                    ...(isDesktop ? {
                                        paintOrder: 'stroke fill',
                                        WebkitTextStroke: '0.5px rgba(250, 204, 21, 0.5)',
                                    } : {}),
                                    // One line gap between paragraphs
                                    gap: isDesktop ? '0.65rem' : isTablet ? '0.75rem' : '0.6rem'
                                }}
                            >
                                <motion.p variants={itemVariants}>
                                    Aakrit Cinematic Solutions was born from a simple yet powerful thought ΓÇö to contribute to India's animation and film industry and show the world its true creative strength. What began as a spark has now evolved into a mission: to build a full-spectrum production house that excels in movies, animation, VFX, 3D visualization, editing, and every craft that brings imagination to life.
                                </motion.p>

                                <motion.p variants={itemVariants}>
                                    The name Aakrit, rooted in Sanskrit, means "to create". It represents our cultural foundation and the belief that creation is the most transformative act. Staying grounded in our Sanskriti keeps us humble; our ambition pushes us to innovate, experiment, and deliver on global standards.
                                </motion.p>

                                <motion.p variants={itemVariants}>
                                    We are architects of imagination, designers of emotion, and creators of immersive experiences. Our vision is bold: To place Indian animation and production on the global map, proving that our industry is not just evolving ΓÇö it is roaring with potential and brilliance.
                                </motion.p>

                                <motion.p variants={itemVariants}>
                                    At Aakrit Cinematic Solutions, every frame is creation, every project is passion, and every story is a new possibility. From the smallest detail to the final output ΓÇö excellence is non-negotiable.
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
                                        style={{ fontFamily: RETROICA, color: '#000000' }}
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
