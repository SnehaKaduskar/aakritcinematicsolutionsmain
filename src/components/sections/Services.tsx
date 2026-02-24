import { useEffect, useRef } from 'react';

import vfxIcon from '../../assets/Icons For_services/VFX-01.svg';
import animationIcon from '../../assets/Icons For_services/ANIMATION-01.svg';
import modellingIcon from '../../assets/Icons For_services/3D modeling-01.svg';
import walkthroughIcon from '../../assets/Icons For_services/WALKTHROUGH-01.svg';
import packshotIcon from '../../assets/Icons For_services/Product packshot-01.svg';
import dcFilmsIcon from '../../assets/Icons For_services/Digital Films-01.svg';
import editingIcon from '../../assets/Icons For_services/Editing-01.svg';
import preVisIcon from '../../assets/Icons For_services/Pre_visuals-01.svg';
import layoutAnimIcon from '../../assets/Icons For_services/Layout_anim-01.svg';
import storyBoardingIcon from '../../assets/Icons For_services/Storyboarding-01.svg';

interface ServicesProps {
    id?: string;
    className?: string;
}

const services = [
    {
        id: 'vfx',
        title: 'VFX',
        description: 'Cinematic visual effects that bring imagination to life.',
        icon: vfxIcon,
    },
    {
        id: 'animation',
        title: 'Animation',
        subtitle: <>2D <span style={{ fontFamily: 'Special_Gothic_Expanded_One, sans-serif' }}>&</span> 3D</>,
        description: <>Fluid 2D and immersive 3D animations crafted with precision.</>,
        icon: animationIcon,
    },
    {
        id: '3d-modelling',
        title: '3D Modelling',
        description: 'Hyper-realistic 3D models for any creative or commercial need.',
        icon: modellingIcon,
    },
    {
        id: 'arch-walkthrough',
        title: 'Architectural Walkthrough',
        description: 'Stunning virtual walkthroughs of architectural designs.',
        icon: walkthroughIcon,
    },
    {
        id: 'packshot',
        title: 'Product Packshot',
        description: 'High-impact product visualisation for brands and marketing.',
        icon: packshotIcon,
    },
    {
        id: 'dc-films',
        title: <>Digital <span style={{ fontFamily: 'Special_Gothic_Expanded_One, sans-serif' }}>&</span> Corporate Films</>,
        description: 'Compelling digital and corporate film productions.',
        icon: dcFilmsIcon,
    },
    {
        id: 'editing',
        title: 'Editing',
        description: 'Precise and creative post-production editing solutions.',
        icon: editingIcon,
    },
    {
        id: 'pre-vis',
        title: 'Pre-Visualisation',
        description: 'Detailed pre-vis to plan and perfect every shot.',
        icon: preVisIcon,
    },
    {
        id: 'layout-anim',
        title: 'Layout Animation',
        description: 'Dynamic layout animations that define visual storytelling.',
        icon: layoutAnimIcon,
    },
    {
        id: 'story-boarding',
        title: 'Story Boarding',
        subtitle: 'and Concept Art',
        description: 'Expressive storyboards and bold concept art creations.',
        icon: storyBoardingIcon,
    },
];

const Services = ({ id = 'services' }: ServicesProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cards = containerRef.current?.querySelectorAll<HTMLDivElement>('.service-card');
        if (!cards) return;

        const handleMouseMove = (e: MouseEvent, card: HTMLDivElement) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const dx = (x - cx) / cx;
            const dy = (y - cy) / cy;
            card.style.transform = `perspective(600px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg) scale(1.04)`;
            card.style.boxShadow = `${-dx * 8}px ${-dy * 8}px 28px rgba(255,140,0,0.10), 0 6px 22px rgba(0,0,0,0.22)`;
        };

        const handleMouseLeave = (card: HTMLDivElement) => {
            card.style.transform = '';
            card.style.boxShadow = '';
        };

        const listeners: [HTMLDivElement, (e: MouseEvent) => void, () => void][] = [];

        cards.forEach((card) => {
            const moveHandler = (e: MouseEvent) => handleMouseMove(e, card);
            const leaveHandler = () => handleMouseLeave(card);
            card.addEventListener('mousemove', moveHandler);
            card.addEventListener('mouseleave', leaveHandler);
            listeners.push([card, moveHandler, leaveHandler]);
        });

        return () => {
            listeners.forEach(([card, move, leave]) => {
                card.removeEventListener('mousemove', move);
                card.removeEventListener('mouseleave', leave);
            });
        };
    }, []);

    return (
        <section
            id={id}
            className="h-[100dvh] w-full flex flex-col items-center justify-start bg-background flex-shrink-0 relative overflow-hidden"
            style={{ paddingTop: '4rem' }}
        >
            {/* Inner wrapper — centers content in the remaining height below navbar */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: 'calc(100dvh - 4rem)', paddingBottom: '4vh', paddingTop: '1vh' }}>


                {/* Title */}
                <h2
                    className="font-display font-bold tracking-widest leading-none text-center flex-shrink-0"
                    style={{
                        fontSize: 'clamp(1.8rem, 5.5vw, 6rem)',
                        textShadow: '3px 3px 8px rgba(255, 100, 0, 0.5), 0 0 40px rgba(255, 140, 0, 0.7), 0 0 80px rgba(255, 140, 0, 0.35)',
                        color: '#ffffffff',
                        paddingBottom: 'clamp(0.3rem, 0.8vh, 0.8rem)',
                        letterSpacing: '0.12em',
                    }}
                >
                    our services.
                </h2>

                {/* Decorative accent line */}
                <div
                    className="flex-shrink-0"
                    style={{
                        width: 'clamp(200px, 38vw, 600px)',
                        height: '3px',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                        borderRadius: '9999px',
                        marginBottom: 'clamp(1.2rem, 3vh, 3rem)',
                    }}
                />

                {/* Cards grid */}
                <div
                    ref={containerRef}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(130px, 18vw, 200px), 1fr))',
                        gap: 'clamp(1rem, 2.5vw, 2.5rem)',
                        width: '100%',
                        maxWidth: '1300px',
                        padding: 'clamp(1rem, 2vh, 2rem) clamp(1rem, 4vw, 4rem) clamp(1.5rem, 3vh, 3rem)',
                        flex: 'none',
                        alignContent: 'center',
                    }}
                >
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="service-card"
                            style={{
                                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.16) 100%)',
                                backdropFilter: 'blur(8px) saturate(1.2)',
                                WebkitBackdropFilter: 'blur(8px) saturate(1.2)',
                                border: '1px solid rgba(255, 255, 255, 0.35)',
                                borderTop: '1.5px solid rgba(255, 255, 255, 0.5)',
                                borderLeft: '1px solid rgba(255, 255, 255, 0.4)',
                                borderRadius: 'clamp(10px, 1.5vw, 18px)',
                                padding: 'clamp(0.7rem, 1.5vw, 1.4rem) clamp(0.7rem, 1.2vw, 1.2rem)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: 'clamp(0.3rem, 0.6vw, 0.6rem)',
                                boxShadow: '0 0 12px rgba(255, 140, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
                                position: 'relative',
                                overflow: 'visible',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(254, 168, 0, 0.7)';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255, 255, 255, 0.35)';
                            }}
                        >
                            {/* Icon positioning half outside top-left */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 'clamp(-30px, -4vw, -45px)',
                                    left: 'clamp(5px, 1vw, 15px)',
                                    width: 'clamp(30px, 3.5vw, 50px)',
                                    height: 'clamp(30px, 3.5vw, 50px)',
                                    zIndex: 10,
                                    filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.3))',
                                }}
                            >
                                <img src={service.icon} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>

                            {/* Interior shine shimmer */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '40%',
                                    background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)',
                                    borderRadius: 'inherit',
                                    pointerEvents: 'none',
                                    overflow: 'hidden', // constrain inside radius
                                }}
                            />


                            {/* Title */}
                            <div>
                                <p
                                    style={{
                                        color: '#000000',
                                        fontFamily: 'Calisto, serif',
                                        fontWeight: 700,
                                        fontSize: 'clamp(0.65rem, 1.15vw, 1.1rem)',
                                        lineHeight: 1.25,
                                        letterSpacing: '0.04em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    {service.title}
                                </p>
                                {service.subtitle && (
                                    <p
                                        style={{
                                            color: '#000000ff',
                                            fontFamily: 'Calisto, serif',
                                            fontSize: 'clamp(0.55rem, 0.95vw, 0.9rem)',
                                            letterSpacing: '0.06em',
                                            marginTop: '1px',
                                        }}
                                    >
                                        {service.subtitle}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <p
                                style={{
                                    color: 'rgba(0,0,0,0.65)',
                                    fontFamily: 'Calisto, serif',
                                    fontSize: 'clamp(0.5rem, 0.8vw, 0.82rem)',
                                    lineHeight: 1.5,
                                    letterSpacing: '0.02em',
                                }}
                            >
                                {service.description}
                            </p>

                            {/* Bottom accent line */}
                            <div
                                style={{
                                    marginTop: 'auto',
                                    width: '30%',
                                    height: '2px',
                                    background: 'linear-gradient(90deg, #FEA800, transparent)',
                                    borderRadius: '9999px',
                                    opacity: 0.6,
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
