import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const DroneShowcase = () => {
    return (
        <div className="min-h-screen w-full text-text">
            <header className="flex items-center justify-between px-8 py-6">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-muted transition hover:border-accent hover:text-accent"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Studio
                </Link>
                <span className="text-xs uppercase tracking-[0.5em] text-muted">Interactive Lab</span>
            </header>

            <main className="flex flex-col gap-8 px-8 pb-16 lg:flex-row">
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 lg:w-1/3"
                >
                    <p className="text-xs font-mono uppercase tracking-[0.35em] text-muted">Systems</p>
                    <h1 className="font-display text-5xl font-bold leading-tight">
                        Autonomous Drone
                        <span className="block text-accent">Feature Overview</span>
                    </h1>
                    <p className="text-lg text-muted">
                        Detailed overview of our autonomous systems and motion language used in on-set deployments.
                    </p>
                    <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                        <p className="text-xs uppercase tracking-[0.4em] text-muted">Lab Notes</p>
                        <ul className="space-y-2 text-sm text-text/80">
                            <li>— Autonomous Pathfinding</li>
                            <li>— Real-time telemetry</li>
                            <li>— On-set deployment ready</li>
                        </ul>
                    </div>
                </motion.section>

                <div className="relative h-[50vh] lg:h-[70vh] flex-1 overflow-hidden rounded-[2.5rem] border border-black/10 bg-black/5 flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <div className="text-accent/50 text-6xl">🚁</div>
                        <p className="text-muted text-sm uppercase tracking-widest">Visual System Offline</p>
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
                </div>
            </main>
        </div>
    );
};

export default DroneShowcase;


