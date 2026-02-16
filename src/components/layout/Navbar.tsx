import { useCallback, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import useMediaQuery from '../../hooks/useMediaQuery';
import logo from '../../assets/Aakrit_logo_02-01.svg';

type SectionLink = {
    id: string;
    label: string;
};

interface NavbarProps {
    isVisible?: boolean;
}

const SECTION_LINKS: SectionLink[] = [
    { id: 'hero', label: 'Studio' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'clients', label: 'Clients' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
];

const Navbar = ({ isVisible = true }: NavbarProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSectionClick = useCallback(
        (sectionId: string) => {
            setIsMobileMenuOpen(false);

            if (location.pathname !== '/') {
                navigate('/', { state: { scrollTo: sectionId } });
                return;
            }

            document.getElementById(sectionId)?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center',
            });
        },
        [location.pathname, navigate]
    );

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ opacity: 0, y: -18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    aria-label="Primary"
                    className="
                    fixed top-0 left-0 right-0
                    w-screen
                    z-[10000]
                    h-16
                "
                    style={{
                        isolation: 'isolate',
                        fontFamily: 'var(--font-primary)',
                        background:
                            'linear-gradient(135deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.06))',
                        backdropFilter: 'saturate(120%) blur(18px)',
                        WebkitBackdropFilter: 'saturate(120%) blur(18px)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
                        boxShadow:
                            '0 16px 34px rgba(0, 0, 0, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.32)',
                    }}
                >
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.015) 58%, rgba(255,255,255,0) 100%)',
                        }}
                    />
                    <div
                        className="relative z-[1] flex h-full w-full items-center justify-between"
                        style={{
                            paddingInline: isDesktop ? '2.5rem' : '0',
                        }}
                    >
                        <Link to="/" className="z-[101] flex shrink-0 items-center">
                            <img
                                src={logo}
                                alt="Aarkit Cinematic Solutions"
                                className="h-10 w-auto max-w-[200px] object-contain"
                                loading="eager"
                                style={{ display: 'block', width: '350px', height: '64px' }}
                            />
                        </Link>

                        {isDesktop ? (
                            <div className="flex items-center whitespace-nowrap">
                                {SECTION_LINKS.map((section) => (
                                    <button
                                        key={section.id}
                                        type="button"
                                        onClick={() => handleSectionClick(section.id)}
                                        className="
                                        min-w-[78px]
                                        text-center
                                        transition-opacity
                                        focus:outline-none
                                    "
                                        style={{
                                            padding: '9px 10px',
                                            background: 'transparent',
                                            border: 'none',
                                            appearance: 'none',
                                            color: '#1a1a1a',
                                            fontWeight: 600,
                                            fontSize: '13px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.04em',
                                        }}
                                    >
                                        {section.label}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="relative z-[101]">
                                <button
                                    type="button"
                                    onClick={() => setIsMobileMenuOpen((open) => !open)}
                                    className="focus:outline-none"
                                    style={{
                                        padding: '8px',
                                        background: 'transparent',
                                        border: 'none',
                                        appearance: 'none',
                                        color: '#1a1a1a',
                                    }}
                                    aria-label="Toggle menu"
                                    aria-expanded={isMobileMenuOpen}
                                >
                                    {isMobileMenuOpen ? (
                                        <X className="h-6 w-6" />
                                    ) : (
                                        <Menu className="h-6 w-6" />
                                    )}
                                </button>

                                <AnimatePresence>
                                    {isMobileMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                            transition={{ duration: 0.2, ease: 'easeOut' }}
                                            className="absolute top-full mt-2 overflow-hidden rounded-2xl border border-white/30 bg-[#F2DD5E]/95 shadow-[0_16px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm"
                                            style={{
                                                right: '8px',
                                                width: 'min(220px, calc(100vw - 20px))',
                                            }}
                                        >
                                            <div className="flex flex-col p-2">
                                                {SECTION_LINKS.map((section) => (
                                                    <button
                                                        key={section.id}
                                                        type="button"
                                                        onClick={() => handleSectionClick(section.id)}
                                                        className="rounded-xl px-3 py-2.5 text-left text-base font-semibold uppercase tracking-[0.08em] text-[#1a1a1a] transition-colors"
                                                    >
                                                        {section.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default Navbar;
