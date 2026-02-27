import React from 'react';
import { motion } from 'framer-motion';
import { Award, ChevronRight } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative py-20 overflow-hidden rounded-3xl border border-white/10 bg-primary/40">
            <div className="relative text-center space-y-8 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-secondary text-sm font-medium"
                >
                    <Award className="w-4 h-4" />
                    <span>Celebrating Pampanga's Finest Talents</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight"
                >
                    Dev<span className="text-secondary italic">Hirang</span> – Hall of <br className="hidden sm:block" />
                    <span className="bg-gradient-to-r from-white to-text-muted bg-clip-text text-transparent">Fame Developers</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-base sm:text-lg md:text-xl text-text-muted max-w-2xl mx-auto px-2"
                >
                    Discover and celebrate the developers, founders, and community leaders
                    shaping the tech ecosystem in Pampanga.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-4 px-6 sm:px-0"
                >
                    <a
                        href="#achievements"
                        className="group bg-secondary hover:bg-white text-background px-8 py-4 rounded-2xl sm:rounded-full font-bold transition-all flex items-center justify-center gap-2 glow-secondary"
                    >
                        View Achievements
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                        href="https://forms.gle/iTD6v4WoUQdRRD1R9"
                        target="_blank"
                        rel="noreferrer"
                        className="px-8 py-4 rounded-2xl sm:rounded-full border border-white/10 hover:bg-white/5 font-semibold transition-all inline-block"
                    >
                        Join the Hall of Fame
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
