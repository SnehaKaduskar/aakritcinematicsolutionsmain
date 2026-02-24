import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useMediaQuery from '../../hooks/useMediaQuery';
import UrviSvg from '../../assets/Team/URvi-01.svg';
import ChiragSvg from '../../assets/Team/CHIRAG-01.svg';
import ParasSvg from '../../assets/Team/PARAS-01.svg';
import RupeshSvg from '../../assets/Team/RUPESH-01.svg';
import RetroicaFont from '../../assets/fonts/Retroica.ttf';

const teamMembers = [
    {
        id: 1,
        name: 'URvi SHAH',
        role: 'Founder & Studio Head',
        description: "Urvi leads the studio with a focus on cross-disciplinary innovation and creative strategy. She orchestrates complex projects from concept to delivery, ensuring every piece reflects Aakrit's core artistic values.",
        image: UrviSvg,
    },
    {
        id: 2,
        name: 'CHIRAG K. MALI',
        role: 'Creative Head',
        description: 'Chirag specializes in visual narrative and aesthetic direction. He works closely with our artists to refine the visual language of our productions, pushing the boundaries of cinematic storytelling through meticulous art direction.',
        image: ChiragSvg,
    },
    {
        id: 3,
        name: 'PARAS SHARMA',
        role: '3D Generalist',
        description: 'Paras bridges the gap between technical execution and artistic vision. He masters lighting, texturing, and character design to build immersive 3D environments that feel alive and emotionally resonant within the frame.',
        image: ParasSvg,
    },
    {
        id: 4,
        name: 'RUPESH GUPTA',
        role: 'Multimedia Artist',
        description: 'Rupesh explores the intersection of digital media and traditional art. He leverages cutting-edge technology to create dynamic multimedia experiences, focusing on interactivity and high-impact visual effects for our global audience.',
        image: RupeshSvg,
    },
];

const RETROICA = '"Retroica", Georgia, serif';

const Team = ({ id = 'our team' }: { id?: string }) => {
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const isTablet = useMediaQuery('(min-width: 600px) and (max-width: 1023px)');
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [cardPointer, setCardPointer] = useState<Record<number, { x: number; y: number }>>({});

    useEffect(() => {
        // Inject Retroica font
        if (!document.getElementById('retroica-font-face')) {
            const s = document.createElement('style');
            s.id = 'retroica-font-face';
            s.textContent = `@font-face { font-family: 'Retroica'; src: url('${RetroicaFont}') format('truetype'); font-weight: normal; font-style: normal; font-display: swap; }`;
            document.head.appendChild(s);
        }
    }, []);

    return (
        <section
            id={id}
            style={{
                height: '100vh',
                width: '100%',
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxSizing: 'border-box',
                padding: isDesktop ? '0 5vw 2vh' : isTablet ? '4vh 6vw' : '4vh 7vw',
                flexShrink: 0,
            }}
            className="bg-background text-text"
        >
            {/* ── Header with Retroica font, intense glow, gradient underline ── */}
            <header style={{
                position: 'relative',
                zIndex: 20,
                marginTop: isDesktop ? '-20px' : '0',
                marginBottom: isDesktop ? '3vh' : isTablet ? '4vh' : '4vh',
                width: '100%',
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: isDesktop ? '0.1rem' : isTablet ? '1rem' : '0.8rem',
            }}>
                <h1 style={{
                    margin: 0,
                    lineHeight: 1,
                    fontWeight: 400,
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    position: 'relative',
                }}>
                    <span style={{
                        fontFamily: RETROICA,
                        fontSize: isDesktop ? 'clamp(3rem, 5.5vw, 7rem)' : isTablet ? 'clamp(2.5rem, 7vw, 5rem)' : 'clamp(2rem, 9vw, 4rem)',
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
                        our team
                    </span>
                    <span style={{
                        fontFamily: RETROICA,
                        fontSize: isDesktop ? 'clamp(3rem, 5.5vw, 7rem)' : isTablet ? 'clamp(2.5rem, 7vw, 5rem)' : 'clamp(2rem, 9vw, 4rem)',
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
                </h1>


                {/* Clean underline with subtle warm glow - matching portfolio style */}
                <div style={{
                    position: 'relative',
                    width: isDesktop ? '80%' : isTablet ? '70%' : '60%',
                    maxWidth: '900px',
                    height: '3px',
                    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 15%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.5) 85%, rgba(255, 255, 255, 0) 100%)',
                    borderRadius: '1px',
                    boxShadow: '0 2px 8px rgba(255, 165, 0, 0.12)',
                }} />
            </header>

            {/* ── Cards grid ── */}
            <div style={{
                width: '100%',
                maxWidth: isDesktop ? '1050px' : isTablet ? '420px' : '320px',
                position: 'relative',
                zIndex: 30,
                boxSizing: 'border-box',
                margin: '0 auto',
            }}>
                <div ref={containerRef} style={{
                    position: 'relative',
                    width: '100%',
                    overflow: 'visible',
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isDesktop ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)',
                        gap: isDesktop ? '1.5rem' : isTablet ? '1rem' : '0.8rem',
                        width: '100%',
                        boxSizing: 'border-box',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {teamMembers.map((member, index) => {
                            const isHovered = hoveredIndex === index;

                            return (
                                <motion.div
                                    key={`${member.name}-${index}`}
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        aspectRatio: '1080 / 1350',
                                        height: 'auto',
                                        borderRadius: isDesktop ? '12px' : '10px',
                                        overflow: 'visible',
                                        cursor: isDesktop ? 'pointer' : 'default',
                                        margin: '0 auto',
                                    }}
                                    onMouseMove={isDesktop ? (e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        setCardPointer((prev) => ({
                                            ...prev,
                                            [index]: {
                                                x: e.clientX - rect.left,
                                                y: e.clientY - rect.top
                                            }
                                        }));
                                    } : undefined}
                                    onMouseEnter={isDesktop ? () => setHoveredIndex(index) : undefined}
                                    onMouseLeave={isDesktop ? () => setHoveredIndex(null) : undefined}
                                    whileHover={isDesktop ? {
                                        scale: 1.05,
                                        zIndex: 50,
                                    } : {}}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                >
                                    {/* Card container with overflow hidden */}
                                    <div style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: isDesktop ? '12px' : '10px',
                                        overflow: 'hidden',
                                        boxShadow: isHovered
                                            ? '0 10px 40px rgba(255, 165, 0, 0.4), 0 0 60px rgba(255, 165, 0, 0.2)'
                                            : '0 4px 12px rgba(0, 0, 0, 0.1)',
                                        transition: 'box-shadow 0.3s ease',
                                    }}>
                                        {/* SVG Image */}
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            overflow: 'hidden',
                                        }}>
                                            {/* Base grayscale image for desktop, colored for mobile/tablet */}
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    filter: isDesktop
                                                        ? 'grayscale(1) brightness(0.8)'
                                                        : 'grayscale(0) brightness(1)',
                                                    transition: 'filter 0.5s ease',
                                                }}
                                            />

                                            {/* Desktop only: Color reveal on hover with radial gradient mask */}
                                            {isDesktop && (
                                                <div style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    backgroundImage: `url(${member.image})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    maskImage: isHovered
                                                        ? `radial-gradient(circle 200px at ${cardPointer[index]?.x ?? 0}px ${cardPointer[index]?.y ?? 0}px, black 0%, rgba(0,0,0,0.5) 50%, transparent 100%)`
                                                        : 'none',
                                                    WebkitMaskImage: isHovered
                                                        ? `radial-gradient(circle 200px at ${cardPointer[index]?.x ?? 0}px ${cardPointer[index]?.y ?? 0}px, black 0%, rgba(0,0,0,0.5) 50%, transparent 100%)`
                                                        : 'none',
                                                    opacity: isHovered ? 1 : 0,
                                                    transition: 'opacity 0.4s ease-out',
                                                    pointerEvents: 'none',
                                                }} />
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Team;