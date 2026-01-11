import { motion } from 'framer-motion';
import { Award, Users, Film } from 'lucide-react';
import clsx from 'clsx';
import CookingLoop from '../visuals/CookingLoop';

interface AboutProps {
    id?: string;
    className?: string;
}

const About = ({ id = "about", className }: AboutProps) => {
    const stats = [
        { number: "150+", label: "Projects Delivered" },
        { number: "12", label: "Years Experience" },
        { number: "40+", label: "Industry Awards" },
    ];

    const expertise = [
        {
            icon: <Film className="w-6 h-6" />,
            title: "Commercial Production",
            desc: "Brand films, advertisements, and promotional content that drives engagement."
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Creative Direction",
            desc: "Art direction, visual strategy, and concept development from inception to delivery."
        },
        {
            icon: <Award className="w-6 h-6" />,
            title: "Post-Production",
            desc: "Color grading, VFX, sound design, and editorial services at the highest level."
        },
    ];

    return (
        <section
            id={id}
            className={clsx(
                "h-[100dvh] w-screen flex items-center justify-center bg-primary flex-shrink-0 relative overflow-hidden",
                className
            )}
        >
            {/* Cooking Loop in top right */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 0.35 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute top-8 right-8 z-10"
            >
                <div className="rounded-2xl  bg-white/5 p-3 backdrop-blur-lg">
                    <div className="h-20 w-20">
                        <CookingLoop className="h-full w-full" />
                    </div>
                </div>
            </motion.div>

            <div className="max-w-7xl px-8 w-full grid md:grid-cols-12 gap-16 items-start">
                {/* Left: Title & Description */}
                <div className="md:col-span-5">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-accent text-xs uppercase tracking-[0.3em] font-mono mb-8 block">About Us</span>
                        <h2 className="text-display-md font-display font-bold text-text mb-6 leading-tight">
                            Crafting Visual<br />
                            <span className="text-accent">Narratives</span>
                        </h2>
                        <p className="text-lg text-muted leading-relaxed mb-8">
                            Aarkit Cinematic Solutions is a full-service production studio specializing in
                            high-caliber visual storytelling. We merge technical precision with artistic vision
                            to create work that resonates across platforms.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 mt-12">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                >
                                    <div className="text-3xl font-bold text-accent mb-1">{stat.number}</div>
                                    <div className="text-xs uppercase tracking-wider text-muted">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right: Expertise List */}
                <div className="md:col-span-7 space-y-6">
                    {expertise.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.6 }}
                            className="border-l-2 border-border pl-6 py-4 group hover:border-accent transition-colors duration-300"
                        >
                            <div className="flex items-start gap-4">
                                <div className="text-accent mt-1 group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-text mb-2">{item.title}</h3>
                                    <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
