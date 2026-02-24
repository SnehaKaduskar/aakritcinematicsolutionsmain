import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import Lottie from 'lottie-react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import quickLinkAnimation from '../../assets/quick link.json';

import instaLogo from '../../assets/logo/insta.svg';
import youtubeLogo from '../../assets/logo/youtube.svg';
import behanceLogo from '../../assets/logo/behance.svg';
import gmailLogo from '../../assets/logo/gmail.svg';
import whatsappLogo from '../../assets/logo/whatsapp.svg';

type QuickLink = {
    label: string;
    href: string;
    openInNewTab: boolean;
    icon: string;
};

const QUICK_LINKS: QuickLink[] = [
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/aakritcinematicsolutions?igsh=NjJlN3JjbjR3ZDho&utm_source=qr',
        openInNewTab: true,
        icon: instaLogo,
    },
    {
        label: 'YouTube',
        href: 'https://www.youtube.com/@aakritcinematicsolutions',
        openInNewTab: true,
        icon: youtubeLogo,
    },
    {
        label: 'Behance',
        href: 'https://www.behance.net/aakritcinematics',
        openInNewTab: true,
        icon: behanceLogo,
    },
    {
        label: 'Email Studio',
        href: 'mailto:studio@aakritcinematic.in',
        openInNewTab: false,
        icon: gmailLogo,
    },
    {
        label: 'WhatsApp',
        href: 'https://wa.me/919819886633',
        openInNewTab: true,
        icon: whatsappLogo,
    },
];

const RAISIN_BLACK = '#282828';
const SITE_BACKGROUND = '#F2DD5E';

const FloatingContactMenu = ({ isVisible = true }: { isVisible?: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery('(max-width: 768px)');

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (!rootRef.current) return;
            if (!rootRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    if (typeof document === 'undefined' || !isVisible) {
        return null;
    }

    return createPortal(
        <div
            ref={rootRef}
            className="flex flex-col items-end gap-4"
            style={{
                position: 'fixed',
                right: isMobile ? '20px' : '40px',
                bottom: isMobile ? '20px' : '40px',
                zIndex: 2147483647,
            }}
        >
            <div
                className={[
                    'origin-bottom-right transition-all duration-300 ease-out',
                    isOpen ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto' : 'translate-y-8 opacity-0 scale-95 pointer-events-none',
                ].join(' ')}
            >
                <div
                    className="rounded-[32px] backdrop-blur-2xl"
                    style={{
                        width: '90px',
                        padding: '20px 16px',
                        backgroundColor: 'rgba(20, 20, 20, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow:
                            '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    }}
                >
                    <ul
                        className="list-none m-0 p-0 w-full"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '12px'
                        }}
                    >
                        {QUICK_LINKS.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    target={link.openInNewTab ? '_blank' : undefined}
                                    rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                                    onClick={() => setIsOpen(false)}
                                    aria-label={link.label}
                                    title={link.label}
                                    className="
                                        flex items-center justify-center
                                        rounded-full
                                        transition-all duration-200 ease-out
                                        hover:scale-110 active:scale-95
                                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50
                                    "
                                    style={{
                                        backgroundColor: '#ffffff',
                                        border: 'none',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                        textDecoration: 'none',
                                        width: '52px',
                                        height: '52px',
                                    }}
                                >
                                    <img src={link.icon} alt={link.label} style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <button
                type="button"
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Close contact links menu' : 'Open contact links menu'}
                onClick={() => setIsOpen((previous) => !previous)}
                className={`
                    group
                    relative
                    rounded-full
                    inline-flex items-center justify-center
                    transition-all duration-300 ease-out
                    hover:-translate-y-1 hover:shadow-lg
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50
                    p-0 rotate-0
                `}
                style={{
                    backgroundColor: isOpen ? RAISIN_BLACK : 'transparent',
                    border: isOpen ? `1px solid ${SITE_BACKGROUND}40` : 'none',
                    boxShadow: isOpen ? '0 15px 35px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)' : 'none',
                    width: isMobile ? '50px' : '60px',
                    height: isMobile ? '50px' : '60px',
                }}
            >
                {isOpen ? (
                    <X className="transition-transform duration-300 group-hover:rotate-90" style={{ width: isMobile ? '24px' : '30px', height: isMobile ? '24px' : '30px', color: '#ffffff' }} />
                ) : (
                    <div style={{ width: isMobile ? '60px' : '80px', height: isMobile ? '60px' : '80px', transform: 'scale(1.2)' }}>
                        <Lottie
                            animationData={quickLinkAnimation}
                            loop={true}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                )}
            </button>
        </div>,
        document.body
    );
};

export default FloatingContactMenu;
