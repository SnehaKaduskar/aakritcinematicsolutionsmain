import { useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import HorizontalScrollContainer from '../components/layout/HorizontalScrollContainer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Gallery from '../components/sections/Gallery';
import Projects from '../components/sections/Projects';
import Clients from '../components/sections/Clients';
import Contact from '../components/sections/Contact';
import CanvasCursor from '../components/ui/CanvasCursor';
import Loader from '../components/ui/Loader';
import ProgressHUD from '../components/layout/ProgressHUD';
import useMediaQuery from '../hooks/useMediaQuery';

const HomeExperience = () => {
    const [isLoading, setIsLoading] = useState(true);
    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    const sections = useMemo(
        () => [
            { id: 'hero', label: 'Home' },
            { id: 'services', label: 'Services' },
            { id: 'projects', label: 'Portfolio' }, // Projects mapped to Portfolio
            { id: 'gallery', label: 'Gallery' },
            { id: 'clients', label: 'Clients' },
            { id: 'about', label: 'About Us' },
            { id: 'contact', label: 'Contact' },
        ],
        []
    );

    return (
        <div className="bg-background text-text antialiased overflow-hidden">
            <CanvasCursor />

            <AnimatePresence mode="wait">
                {isLoading && (
                    <Loader onLoadingComplete={() => setIsLoading(false)} />
                )}
            </AnimatePresence>

            {!isLoading && (
                <>
                    {isDesktop && (
                        <ProgressHUD containerRef={scrollerRef} sections={sections} />
                    )}

                    <HorizontalScrollContainer
                        scrollerRef={scrollerRef}
                        isDesktop={isDesktop}
                    >
                        <Hero id="hero" />
                        <Services id="services" />
                        <Projects id="projects" />
                        <Gallery id="gallery" />
                        <Clients id="clients" />
                        <About id="about" />
                        <Contact id="contact" />
                    </HorizontalScrollContainer>
                </>
            )}
        </div>
    );
};

export default HomeExperience;



