import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface GalleryProps {
    id?: string;
    className?: string;
}

interface Video {
    id: number;
    youtube_url: string;
    [key: string]: unknown;
}

const galleryStyles = `
.gallery-layout {
  width: min(100%, 88rem);
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-inline: clamp(1rem, 2.1vw, 2.5rem);
  padding-block: clamp(1.25rem, 3vh, 2rem);
  --frame-white: rgba(255, 255, 255, 0.9);
  --frame-white-soft: rgba(255, 255, 255, 0.66);
  --frame-highlight: rgba(255, 255, 255, 0.22);
  --divider-white-edge: rgba(255, 255, 255, 0.08);
  --divider-white-mid: rgba(255, 255, 255, 0.9);
  --divider-white-strong: rgba(255, 255, 255, 1);
  --card-radius: clamp(0.75rem, 1vw, 1.15rem);
}

.gallery-title {
  display: block;
  white-space: nowrap;
  font-family: 'Retroica', system-ui, sans-serif !important;
  font-size: clamp(1.8rem, 5.5vw, 6rem);
  line-height: 1.04;
  color: #FEFEFA !important;
  text-shadow: 0 0.125rem 0 #FFA500, 0 0.375rem 0.75rem rgba(255, 165, 0, 0.62), 0 0 1.125rem rgba(255, 165, 0, 0.48) !important;
  filter: drop-shadow(0 0.125rem 0.3125rem rgba(0, 0, 0, 0.2)) drop-shadow(0 0.3125rem 0.5rem rgba(255, 165, 0, 0.42));
}

.gallery-divider {
  width: clamp(200px, 38vw, 600px);
  margin-top: 0;
  margin-bottom: clamp(1.2rem, 3vh, 3rem);
  height: 3px;
  border-radius: 9999px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
}

.gallery-video-grid {
  width: min(100%, 75rem);
  margin-inline: auto;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: clamp(1.125rem, 2.25vh, 1.625rem);
}

.gallery-video-row {
  width: min(100%, 49rem);
  display: flex;
  justify-content: center;
  gap: clamp(0.9rem, 1.5vw, 1.25rem);
}

.gallery-video-card {
  flex-shrink: 0;
  border: 0.125rem solid var(--frame-white);
  border-radius: var(--card-radius);
  box-shadow:
    0 0.2rem 0.5rem rgba(0, 0, 0, 0.08),
    0 0 0.2rem var(--frame-highlight),
    0 0 0.5rem rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  isolation: isolate;
  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, background-color 220ms ease;
}

.gallery-video-card:hover {
  transform: translateY(-0.1rem);
  border-color: var(--divider-white-strong);
  box-shadow:
    0 0.3rem 0.6rem rgba(0, 0, 0, 0.12),
    0 0 0.25rem rgba(255, 255, 255, 0.15),
    0 0 0.65rem rgba(255, 255, 255, 0.12);
}

.gallery-video-card::before {
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

.gallery-video-card::after {
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

.gallery-video-card iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  z-index: 1;
  filter: none !important;
}

.gallery-video-card--top {
  width: min(70vw, 30rem);
  height: auto;
  aspect-ratio: 16 / 10;
}

.gallery-video-card--small {
  width: min(42vw, 22rem);
  height: auto;
  aspect-ratio: 16 / 10;
}

@media (max-width: 1023px) {
  .gallery-layout {
    width: min(100%, 74rem);
    padding-block: clamp(1rem, 2.5vh, 2rem);
  }


  .gallery-divider {
    width: clamp(200px, 38vw, 600px);
  }

  .gallery-video-grid {
    gap: clamp(1.125rem, 2.1vh, 1.5rem);
  }

  .gallery-video-card--top {
    width: min(86vw, 36rem);
  }

  .gallery-video-row {
    width: min(92vw, 46rem);
    gap: clamp(0.9rem, 1.8vw, 1.125rem);
  }

  .gallery-video-card--small {
    width: min(44vw, 20rem);
  }
}

@media (max-width: 767px) {
  .gallery-layout {
    padding-inline: clamp(0.75rem, 4vw, 1rem);
    padding-block: clamp(0.75rem, 2vh, 1.5rem);
  }


  .gallery-divider {
    width: clamp(200px, 80vw, 600px);
  }

  .gallery-video-row {
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 1.125rem;
  }

  .gallery-video-card--top {
    width: min(88vw, 32rem);
  }

  .gallery-video-card--small {
    width: min(82vw, 28rem);
  }
}

/* Small laptop target: 1280x720 */
@media (max-height: 46rem) and (min-width: 64rem) {
  .gallery-layout {
    padding-block: clamp(0.75rem, 1.5vh, 1.5rem);
  }

  .gallery-video-grid {
    gap: clamp(0.9rem, 1.6vh, 1.25rem);
  }

  .gallery-video-card--top {
    width: min(52vw, 26rem);
  }

  .gallery-video-card--small {
    width: min(31vw, 17.5rem);
  }
}

/* Ultrawide target: 2560x1080 */
@media (min-width: 160rem) and (max-width: 239.9375rem) {
  .gallery-layout {
    width: min(100%, 120rem);
    padding-top: clamp(3.5rem, 5vh, 5rem);
  }


  .gallery-divider {
    width: clamp(200px, 38vw, 600px);
  }

  .gallery-video-grid {
    width: min(100%, 92rem);
    gap: clamp(1.2rem, 2vh, 1.9rem);
  }

  .gallery-video-card--top {
    width: min(33vw, 38rem);
  }

  .gallery-video-row {
    width: min(58vw, 62rem);
    gap: clamp(1rem, 1.2vw, 1.6rem);
  }

  .gallery-video-card--small {
    width: min(27vw, 24rem);
  }
}

/* 4K target: 3840x2160 */
@media (min-width: 240rem) {
  .gallery-layout {
    width: min(100%, 150rem);
    padding-top: clamp(3.5rem, 5vh, 5rem);
  }


  .gallery-divider {
    width: clamp(200px, 38vw, 600px);
  }

  .gallery-video-grid {
    width: min(100%, 116rem);
    gap: clamp(1.4rem, 1.8vh, 2.2rem);
  }

  .gallery-video-card--top {
    width: min(29vw, 50rem);
  }

  .gallery-video-row {
    width: min(52vw, 74rem);
    gap: clamp(1.2rem, 1vw, 2rem);
  }

  .gallery-video-card--small {
    width: min(24vw, 32rem);
  }
}
`;

// Default dummy videos for testing/fallback
const DUMMY_VIDEOS: Video[] = [
    { id: 1, youtube_url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ' },
    { id: 2, youtube_url: 'https://www.youtube.com/watch?v=ysz5S6P_z-U' },
    { id: 3, youtube_url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw' }
];

const Gallery = ({ id = 'gallery', className }: GalleryProps) => {
    const [videos, setVideos] = useState<Video[]>([]);
    const embedParams = 'rel=0&modestbranding=1&vq=hd1080&playsinline=1';

    useEffect(() => {
        const fetchVideos = async () => {
            const { data, error } = await supabase
                .from('gallery')
                .select('*')
                .limit(3);

            if (error || !data || data.length === 0) {
                setVideos(DUMMY_VIDEOS);
                return;
            }

            setVideos(data);
        };

        fetchVideos();
    }, []);

    const getYouTubeId = (url: string) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const topVideo = videos.length > 1 ? videos[1] : null;
    const leftVideo = videos.length > 2 ? videos[2] : (videos.length > 0 ? videos[0] : null);
    const rightVideo = videos.length > 2 ? videos[0] : null;

    return (
        <section
            id={id}
            className={clsx(
                'h-screen w-screen flex flex-col items-center justify-center bg-primary flex-shrink-0 relative overflow-hidden',
                className
            )}
        >
            <style>{galleryStyles}</style>

            <div className="gallery-layout">
                <div className="text-center shrink-0">
                    <div className="inline-flex flex-col items-center">
                        <span className="gallery-title">visual diary.</span>
                        <div className="gallery-divider" aria-hidden="true" />
                    </div>
                </div>

                <div className="gallery-video-grid">
                    <div className="gallery-video-card gallery-video-card--top">
                        {topVideo?.youtube_url ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${getYouTubeId(topVideo.youtube_url)}?${embedParams}`}
                                title="Visual Diary Main"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-white/50 bg-neutral-900">
                                <span className="mb-2">Main Video Slot (Top)</span>
                                <span className="text-xs">Waiting for Content...</span>
                            </div>
                        )}
                    </div>

                    <div className="gallery-video-row">
                        <div className="gallery-video-card gallery-video-card--small">
                            {leftVideo?.youtube_url ? (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${getYouTubeId(leftVideo.youtube_url)}?${embedParams}`}
                                    title="Visual Diary Left"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-white/50 bg-neutral-900">
                                    <span className="mb-2">Left Slot</span>
                                    <span className="text-xs">Add video to Supabase</span>
                                </div>
                            )}
                        </div>

                        <div className="gallery-video-card gallery-video-card--small">
                            {rightVideo?.youtube_url ? (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${getYouTubeId(rightVideo.youtube_url)}?${embedParams}`}
                                    title="Visual Diary Right"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-white/50 bg-neutral-900">
                                    <span className="mb-2">Right Slot</span>
                                    <span className="text-xs">Add video to Supabase</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
