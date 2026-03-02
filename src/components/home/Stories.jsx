import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Quote, Calendar, ArrowRight, Star } from 'lucide-react';
import { cn } from '../../lib/utils';

const StoryModal = ({ developer, isOpen, onClose }) => {
    if (!developer) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glassmorphism rounded-[2.5rem] border border-white/10 shadow-2xl hide-scrollbar"
                    >
                        {/* Header Image/Background */}
                        <div className="relative h-64 md:h-80 w-full overflow-hidden">
                            <img
                                src={developer.avatar}
                                alt={developer.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-all z-10"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="px-6 md:px-12 pb-12 -mt-20 relative z-10">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                                <div>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="flex items-center gap-2 mb-2"
                                    >
                                        <div className="h-px w-8 bg-secondary" />
                                        <span className="text-secondary font-mono text-xs uppercase tracking-[0.3em] font-bold">Hinirang Story</span>
                                    </motion.div>
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-4xl md:text-5xl font-black text-white tracking-tight"
                                    >
                                        {developer.name}
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-lg text-text-muted font-mono mt-2"
                                    >
                                        {developer.role.join(' • ')}
                                    </motion.p>
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="prose prose-invert max-w-none"
                            >
                                <div className="relative">
                                    <Quote className="absolute -left-8 -top-4 w-12 h-12 text-secondary/20 rotate-180" />
                                    <p className="text-xl md:text-2xl leading-relaxed text-white font-serif italic mb-8 border-l-4 border-secondary pl-6 py-2 bg-secondary/5 rounded-r-xl">
                                        "Technology becomes truly powerful when guided by empathy and purpose."
                                    </p>
                                </div>

                                <div className="space-y-6 text-text-muted leading-relaxed text-lg whitespace-pre-wrap font-sans">
                                    {developer.stories}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-4"
                            >
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                    <Star className="w-4 h-4 text-secondary fill-secondary" />
                                    <span className="text-xs font-bold uppercase tracking-wider text-white">Featured Story</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                    <Calendar className="w-4 h-4 text-text-muted" />
                                    <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Captured in 2025</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const StoryCard = ({ developer, onClick }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            onClick={onClick}
            className="group relative cursor-pointer overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-secondary/50 transition-all duration-500 flex flex-col h-[500px]"
        >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 z-10" />

            {/* Image container */}
            <div className="relative h-full w-full overflow-hidden">
                <img
                    src={developer.avatar}
                    alt={developer.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <div className="h-px w-6 bg-secondary" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Read Journey</span>
                </div>

                <h3 className="text-3xl font-black text-white mb-2 leading-none group-hover:text-secondary transition-colors duration-300">
                    {developer.name}
                </h3>

                <p className="text-sm text-text-muted font-mono mb-4 line-clamp-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    {developer.role[0]}
                </p>

                <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10 overflow-hidden">
                    <p className="text-xs text-text-muted font-serif italic line-clamp-1 flex-1 pr-4">
                        {developer.stories.substring(0, 60)}...
                    </p>
                    <div className="bg-secondary p-3 rounded-full text-background shadow-lg shadow-secondary/20 translate-x-12 group-hover:translate-x-0 transition-transform duration-500 delay-150">
                        <BookOpen className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-6 right-6 z-20">
                <div className="p-2 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                    <Quote className="w-5 h-5 text-secondary" />
                </div>
            </div>
        </motion.div>
    );
};

const Stories = ({ developers }) => {
    const [selectedStory, setSelectedStory] = useState(null);
    const storyDevs = developers.filter(dev => dev.stories);

    return (
        <section id="stories" className="py-12 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-2 mb-2"
                >
                    <div className="h-px w-8 bg-secondary" />
                    <span className="text-secondary font-mono text-xs uppercase tracking-[0.4em] font-bold">Inspiration Library</span>
                    <div className="h-px w-8 bg-secondary" />
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-black text-white tracking-tight"
                >
                    Hinirang <span className="text-secondary">Stories</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg md:text-xl text-text-muted leading-relaxed font-mono"
                >
                    Journeys of persistence, innovation, and community impact from Pampanga's brightest minds.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-4"
                >
                    <a
                        href="https://forms.gle/v938hmFvbB9aV2Fy6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-background hover:bg-white rounded-2xl font-bold transition-all glow-secondary group"
                    >
                        <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Submit Your Story
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 px-4">
                <AnimatePresence>
                    {storyDevs.map((dev, index) => (
                        <StoryCard
                            key={dev.id}
                            developer={dev}
                            onClick={() => setSelectedStory(dev)}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {storyDevs.length === 0 && (
                <div className="text-center py-20 text-text-muted glassmorphism rounded-3xl border border-white/5">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p className="text-lg font-mono">Our library of stories is being curated. Stay tuned!</p>
                </div>
            )}

            <StoryModal
                developer={selectedStory}
                isOpen={!!selectedStory}
                onClose={() => setSelectedStory(null)}
            />
        </section>
    );
};

export default Stories;
