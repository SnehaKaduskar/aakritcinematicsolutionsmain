import clsx from 'clsx';
import { type WheelEvent, useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface Video {
    id: number;
    youtube_url?: string;
    link?: string;
    url?: string;
    video_link?: string;
    video_url?: string;
    Title?: string;
    [key: string]: unknown;
}

const PORTFOLIO_SLOTS = 6;
const EMBED_PARAMS = 'rel=0&modestbranding=1&playsinline=1';

const portfolioStyles = `
.portfolio-section {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
  --portfolio-gap-x: 1.25rem;
  --portfolio-gap-y: 2.5rem;
}

.portfolio-layout {
  width: min(100%, 88rem);
  flex: 1;
  margin-inline: auto;
  padding-inline: clamp(1rem, 2.1vw, 2.5rem);
  padding-top: clamp(4rem, 7vh, 5rem);
  padding-bottom: clamp(2.5rem, 7vh, 4.5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  --frame-white: rgba(255, 255, 255, 0.9);
  --frame-white-soft: rgba(255, 255, 255, 0.66);
  --frame-highlight: rgba(255, 255, 255, 0.22);
  --divider-white-edge: rgba(255, 255, 255, 0.08);
  --divider-white-mid: rgba(255, 255, 255, 0.9);
  --divider-white-strong: rgba(255, 255, 255, 1);
  --card-radius: clamp(0.75rem, 1vw, 1.15rem);
}

.portfolio-title {
  margin: 0;
  white-space: nowrap;
  font-family: 'Retroica', system-ui, sans-serif !important;
  font-size: clamp(1.8rem, 5.5vw, 6rem);
  line-height: 1.04;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #ffffffff !important;
  text-transform: lowercase;
  text-shadow: 3px 3px 8px rgba(255, 100, 0, 0.5), 0 0 40px rgba(255, 140, 0, 0.7), 0 0 80px rgba(255, 140, 0, 0.35) !important;
}

.portfolio-title-block {
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  margin-bottom: clamp(1.2rem, 3vh, 3rem);
}

.portfolio-divider {
  width: 100%;
  height: 3px;
  margin-top: 0.35rem;
  border-radius: 9999px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
}

.portfolio-grid {
  width: min(100%, 52rem);
  margin-inline: auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: var(--portfolio-gap-x);
  row-gap: var(--portfolio-gap-y);
  align-content: start;
}

.portfolio-card {
  position: relative;
  aspect-ratio: 4 / 3;
  width: 100%;
  border: 0.125rem solid var(--frame-white);
  border-radius: var(--card-radius);
  box-shadow:
    0 0.2rem 0.5rem rgba(0, 0, 0, 0.08),
    0 0 0.2rem var(--frame-highlight),
    0 0 0.5rem rgba(255, 255, 255, 0.08);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  isolation: isolate;
  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, background-color 220ms ease;
}

.portfolio-card:hover {
  transform: translateY(-0.1rem);
  border-color: var(--divider-white-strong);
  box-shadow:
    0 0.3rem 0.6rem rgba(0, 0, 0, 0.12),
    0 0 0.25rem rgba(255, 255, 255, 0.15),
    0 0 0.65rem rgba(255, 255, 255, 0.12);
}

.portfolio-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 2;
  border: 0.09rem solid var(--frame-white-soft);
  box-shadow:
    inset 0 0 0.1rem rgba(255, 255, 255, 0.2),
    inset 0 0 0.4rem rgba(255, 255, 255, 0.07),
    0 0 0.4rem rgba(255, 255, 255, 0.1);
}

.portfolio-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 2;
  background:
    linear-gradient(150deg,
      rgba(255, 255, 255, 0.26) 0%,
      rgba(255, 255, 255, 0.12) 18%,
      rgba(255, 255, 255, 0.02) 36%,
      rgba(255, 255, 255, 0) 58%),
    radial-gradient(120% 85% at 50% -18%,
      rgba(255, 255, 255, 0.24) 0%,
      rgba(255, 255, 255, 0) 62%),
    radial-gradient(110% 92% at 50% 118%,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0) 68%);
  opacity: 0.82;
}

.portfolio-card iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  z-index: 1;
}

.portfolio-card-placeholder {
  width: 100%;
  height: 100%;
}

@media (max-width: 63.9375rem) {
  .portfolio-section {
    --portfolio-gap-x: clamp(0.85rem, 1.9vw, 1.125rem);
    --portfolio-gap-y: clamp(1.4rem, 3vh, 2rem);
  }

  .portfolio-layout {
    width: min(100%, 74rem);
    padding-top: clamp(3.5rem, 6vh, 4.5rem);
    min-height: 100vh;
  }

  .portfolio-title {
    font-size: clamp(1.8rem, 5.5vw, 6rem);
  }

  .portfolio-divider {
    width: 100%;
  }

  .portfolio-grid {
    width: min(100%, 40rem);
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 47.9375rem) {
  .portfolio-section {
    --portfolio-gap-x: clamp(0.7rem, 2.8vw, 0.95rem);
    --portfolio-gap-y: clamp(1.05rem, 2.6vh, 1.55rem);
  }

  .portfolio-layout {
    width: min(100%, 36rem);
    padding-inline: clamp(0.75rem, 4vw, 1rem);
    padding-top: clamp(3rem, 5vh, 4rem);
    padding-bottom: clamp(2rem, 5vh, 3rem);
    min-height: 100vh;
  }

  .portfolio-title {
    font-size: clamp(1.8rem, 5.5vw, 6rem);
  }

  .portfolio-divider {
    width: 100%;
  }

  .portfolio-grid {
    width: min(100%, 17.75rem);
    padding-inline: 0.125rem;
    grid-template-columns: 1fr;
  }
}

/* Small laptop target: 1280x720 */
@media (max-height: 46rem) and (min-width: 80rem) {
  .portfolio-section {
    --portfolio-gap-x: clamp(0.95rem, 1vw, 1.2rem);
    --portfolio-gap-y: clamp(1.5rem, 2.6vh, 2.2rem);
  }

  .portfolio-layout {
    padding-top: clamp(3rem, 5vh, 4rem);
    min-height: 100vh;
  }

  .portfolio-grid {
    width: min(100%, 48rem);
  }
}

/* Ultrawide target: 2560x1080 */
@media (min-width: 160rem) and (max-width: 239.9375rem) {
  .portfolio-section {
    --portfolio-gap-x: clamp(1.1rem, 0.95vw, 1.35rem);
    --portfolio-gap-y: clamp(2rem, 2.7vh, 2.8rem);
  }

  .portfolio-layout {
    width: min(100%, 120rem);
    padding-top: clamp(3.5rem, 5vh, 5rem);
    min-height: 100vh;
  }

  .portfolio-title {
    font-size: clamp(1.8rem, 5.5vw, 6rem);
  }

  .portfolio-divider {
    width: 100%;
  }

  .portfolio-grid {
    width: min(100%, 74rem);
  }
}

/* 4K target: 3840x2160 */
@media (min-width: 240rem) {
  .portfolio-section {
    --portfolio-gap-x: clamp(1.2rem, 0.85vw, 1.5rem);
    --portfolio-gap-y: clamp(2.25rem, 2.4vh, 3.3rem);
  }

  .portfolio-layout {
    width: min(100%, 150rem);
    padding-top: clamp(3.5rem, 5vh, 5rem);
    min-height: 100vh;
  }

  .portfolio-title {
    font-size: clamp(1.8rem, 5.5vw, 6rem);
  }

  .portfolio-divider {
    width: 100%;
  }

  .portfolio-grid {
    width: min(100%, 88rem);
  }

}
`;

const DUMMY_PORTFOLIO: Video[] = [
    { id: 1, youtube_url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ' },
    { id: 2, youtube_url: 'https://www.youtube.com/watch?v=ysz5S6P_z-U' },
    { id: 3, youtube_url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw' },
    { id: 4, youtube_url: 'https://www.youtube.com/watch?v=ScMzIvxBSi4' },
    { id: 5, youtube_url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ' },
    { id: 6, youtube_url: 'https://www.youtube.com/watch?v=tgbNymZ7vqY' },
];

function Portfolio({ id = 'portfolio', className }: { id?: string; className?: string }) {
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const { data, error } = await supabase.from('portfolio').select('*').limit(PORTFOLIO_SLOTS);

            if (error || !data || data.length === 0) {
                setVideos(DUMMY_PORTFOLIO);
                return;
            }

            setVideos(data);
        };

        fetchVideos();
    }, []);

    const getYoutubeId = (url: string) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    const slots = useMemo(() => {
        return Array.from({ length: PORTFOLIO_SLOTS }, (_, index) => videos[index] ?? null);
    }, [videos]);

    const handleSectionWheelCapture = (event: WheelEvent<HTMLElement>) => {
        const section = event.currentTarget;
        const hasVerticalOverflow = section.scrollHeight > section.clientHeight;
        if (!hasVerticalOverflow) return;

        const atTop = section.scrollTop <= 0;
        const atBottom = Math.ceil(section.scrollTop + section.clientHeight) >= section.scrollHeight;
        const scrollingUp = event.deltaY < 0;
        const scrollingDown = event.deltaY > 0;
        const handoffToHorizontal = (atTop && scrollingUp) || (atBottom && scrollingDown);

        if (!handoffToHorizontal) {
            event.stopPropagation();
        }
    };

    return (
        <section
            id={id}
            className={clsx('portfolio-section h-screen w-screen bg-background flex-shrink-0 relative', className)}
            onWheelCapture={handleSectionWheelCapture}
        >
            <style>{portfolioStyles}</style>

            <div className="portfolio-layout">
                <div className="portfolio-title-block">
                    <h2 className="portfolio-title">our portfolio.</h2>
                    <div className="portfolio-divider" aria-hidden="true" />
                </div>

                <div className="portfolio-grid">
                    {slots.map((video, index) => {
                        const source = String(
                            video?.youtube_url ??
                            video?.link ??
                            video?.url ??
                            video?.video_link ??
                            video?.video_url ??
                            ''
                        );
                        const videoId = getYoutubeId(source);

                        return (
                            <div className="portfolio-card" key={video?.id ?? `portfolio-slot-${index}`}>
                                {videoId ? (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${videoId}?${EMBED_PARAMS}`}
                                        title={video?.Title || `Portfolio Video ${index + 1}`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div className="portfolio-card-placeholder" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Portfolio;
