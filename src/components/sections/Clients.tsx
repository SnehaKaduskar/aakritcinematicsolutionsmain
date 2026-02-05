import { motion } from 'framer-motion';
import clsx from 'clsx';

interface ClientsProps {
    id?: string;
    className?: string;
}

const clientLogos = [
    { name: 'Aperture Labs', industry: 'Tech', impact: 'Global product launch films' },
    { name: 'Helios Resorts', industry: 'Hospitality', impact: 'Immersive destination series' },
    { name: 'Nova Audio', industry: 'Consumer', impact: 'Live experience visuals' },
    { name: 'Verve Motors', industry: 'Automotive', impact: 'Next-gen launch content' },
];

const testimonials = [
    {
        quote: '“Aarkit translated our product narrative into a culture-moving film franchise.”',
        author: 'Maya L., Creative Director, Apex Labs',
    },
    {
        quote: '“They operate like an internal team—zero friction, all precision.”',
        author: 'Jerome K., VP Marketing, Helios Group',
    },
];

const Clients = ({ id = 'clients', className }: ClientsProps) => {
    return (
        <section
            id={id}
            className={clsx(
                'h-[100dvh] w-screen flex items-center justify-center bg-primary flex-shrink-0 relative overflow-hidden',
                className
            )}
        >
            <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,0.8),transparent_70%)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#00ff8899,transparent_50%)]" />
            </div>

            <div className="relative z-10 w-full max-w-6xl px-8">
                <div className="flex flex-col gap-12 lg:flex-row">
                    <div className="flex-1 space-y-6">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-xs font-mono uppercase tracking-[0.35em] text-muted"
                        >
                            Trusted Collaborations
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="font-display text-[clamp(2.5rem,4vw,4.5rem)] font-bold leading-tight text-text"
                        >
                            Global brands choose Aarkit to architect cinematic systems that convert attention.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-muted"
                        >
                            From IPO-bound tech giants to storied luxury houses, we embed with leadership teams to craft
                            visual platforms that drive launches, press, and lasting fandom.
                        </motion.p>

                        <div className="space-y-5">
                            {testimonials.map((item, index) => (
                                <motion.blockquote
                                    key={item.author}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-6 text-base text-text/90 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur"
                                >
                                    <p className="mb-4 text-lg leading-relaxed text-text/90">{item.quote}</p>
                                    <footer className="text-xs uppercase tracking-[0.3em] text-muted">{item.author}</footer>
                                </motion.blockquote>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="grid gap-4">
                            {clientLogos.map((client, index) => (
                                <motion.div
                                    key={client.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.08 }}
                                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-surface/80 px-6 py-5 backdrop-blur transition hover:border-accent/60"
                                >
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.45em] text-muted">{client.industry}</p>
                                        <p className="text-2xl font-semibold text-text">{client.name}</p>
                                    </div>
                                    <p className="max-w-[45%] text-sm text-muted group-hover:text-text">
                                        {client.impact}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Clients;




