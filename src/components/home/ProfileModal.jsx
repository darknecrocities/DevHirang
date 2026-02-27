import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Briefcase, Code, Users, ExternalLink, Github, Route } from 'lucide-react';
import { cn } from '../../lib/utils';

const ProfileModal = ({ developer, isOpen, onClose }) => {
    if (!developer) return null;

    const statItems = [
        { label: 'Hackathons', value: developer.stats.hackathons_won, icon: Award },
        { label: 'Projects', value: developer.stats.projects_contributed, icon: Code },
        { label: 'Community', value: 12, icon: Users }, // Mocked extra stat
        { label: 'Impact', value: developer.points, icon: Briefcase },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
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
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background/40 glassmorphism border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="grid md:grid-cols-12 gap-0">
                            {/* Left Column - Profile Sticky */}
                            <div className="md:col-span-12 lg:col-span-5 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10 space-y-8">
                                <div className="space-y-6 text-center lg:text-left">
                                    <div className="relative inline-block">
                                        <div className="w-40 h-40 rounded-3xl overflow-hidden border-2 border-secondary/50 glow-secondary mx-auto lg:mx-0">
                                            <img src={developer.avatar} alt={developer.name} className="w-full h-full object-cover" />
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-4xl font-bold mb-2">{developer.name}</h2>
                                        <p className="text-secondary text-lg font-medium">{developer.role.join(' • ')}</p>
                                    </div>

                                    <p className="text-text-muted leading-relaxed">
                                        {developer.bio}
                                    </p>

                                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                        {developer.github && (
                                            <a href={developer.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl font-bold transition-all border border-white/10">
                                                <Github className="w-5 h-5" />
                                                GitHub
                                            </a>
                                        )}
                                        {developer.website && (
                                            <a href={developer.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-secondary text-background hover:bg-white rounded-2xl font-bold transition-all glow-secondary">
                                                <ExternalLink className="w-5 h-5" />
                                                Website
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Animated Stats Bar */}
                                <div className="grid grid-cols-2 gap-4">
                                    {statItems.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.2 + (i * 0.1) }}
                                            className="p-4 bg-white/5 rounded-[1.5rem] border border-white/10 text-center"
                                        >
                                            <item.icon className="w-5 h-5 text-secondary mx-auto mb-2" />
                                            <p className="text-2xl font-black text-white">{item.value}</p>
                                            <p className="text-[10px] uppercase tracking-widest text-text-muted">{item.label}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column - Achievements Timeline */}
                            <div className="md:col-span-12 lg:col-span-7 p-8 lg:p-12 space-y-10">
                                <section className="space-y-6">
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <Award className="w-5 h-5 text-secondary" />
                                        Achievements Timeline
                                    </h3>

                                    <div className="space-y-4">
                                        {developer.achievements.map((ach, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.4 + (i * 0.1) }}
                                                className="group flex gap-4 p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                                            >
                                                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-secondary font-bold text-xs">
                                                    {ach.year}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h4 className="font-bold text-white group-hover:text-secondary transition-colors">{ach.title}</h4>
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-2 py-0.5 bg-white/5 rounded-full">
                                                            {ach.type}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-text-muted leading-relaxed">
                                                        {ach.description}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </section>

                                {developer.roadmap && developer.roadmap.length > 0 && (
                                    <section className="space-y-6 pt-6 border-t border-white/5">
                                        <h3 className="text-xl font-bold flex items-center gap-2">
                                            <Route className="w-5 h-5 text-secondary" />
                                            Achievement Highlights
                                        </h3>

                                        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-secondary/50 before:via-white/10 before:to-transparent">
                                            {developer.roadmap.map((step, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                                    className="relative flex gap-6 items-start group"
                                                >
                                                    <div className={cn(
                                                        "w-12 h-12 rounded-full border-4 border-background flex items-center justify-center z-10 shrink-0 transition-colors",
                                                        step.status === 'Completed' ? "bg-secondary text-background" :
                                                            step.status === 'In Progress' ? "bg-primary border-secondary/50" : "bg-white/10"
                                                    )}>
                                                        <span className="text-[10px] font-bold">
                                                            {step.status === 'Completed' ? '✓' : step.year}
                                                        </span>
                                                    </div>

                                                    <div className="flex-1 pb-6">
                                                        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl group-hover:border-secondary/30 transition-all">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <h4 className="font-bold text-white group-hover:text-secondary transition-colors">{step.title}</h4>
                                                                <span className={cn(
                                                                    "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
                                                                    step.status === 'Completed' ? "bg-secondary/20 text-secondary" :
                                                                        step.status === 'In Progress' ? "bg-primary/50 text-white" : "bg-white/10 text-text-muted"
                                                                )}>
                                                                    {step.status}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                <div className="p-8 rounded-xl bg-background border border-dashed border-white/20 font-mono">
                                    <h4 className="font-bold mb-2 text-white">Want to work with {developer.name.split(' ')[0]}?</h4>
                                    <p className="text-sm text-text-muted mb-6">
                                        Professional inquiries and community collaborations are always welcome.
                                        Reach out via the buttons on the left profile card.
                                    </p>
                                    {developer.email ? (
                                        <a
                                            href={`mailto:${developer.email}`}
                                            className="w-full py-4 bg-white text-black hover:bg-gray-200 rounded-lg font-bold transition-all inline-block text-center"
                                        >
                                            Send a Message
                                        </a>
                                    ) : (
                                        <button disabled className="w-full py-4 bg-white/50 text-black/50 rounded-lg font-bold cursor-not-allowed text-center">
                                            Email Not Available
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProfileModal;
