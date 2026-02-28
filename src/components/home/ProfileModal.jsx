import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Briefcase, Code, Users, ExternalLink, Github, Route, Trophy, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';
import { getDeveloperBadges, BADGE_CRITERIA } from '../../utils/badgeUtils';

const ProfileModal = ({ developer, isOpen, onClose }) => {
    const [showBadgeGuide, setShowBadgeGuide] = useState(false);
    const [showAllCerts, setShowAllCerts] = useState(false);
    const [showAllAchievements, setShowAllAchievements] = useState(false);
    if (!developer) return null;

    const statItems = [
        { label: 'Wins', value: developer.stats.hackathons_won, icon: Award },
        { label: 'Projects', value: developer.stats.projects_contributed, icon: Code },
        { label: 'Contributions', value: developer.stats.github_contributions?.toLocaleString() || 0, icon: Github },
        { label: 'Certs', value: developer.certifications?.length || 0, icon: Briefcase },
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

                        <div className="grid md:grid-cols-12 gap-0 h-full overflow-y-auto">
                            {/* Left Column - Profile Sticky */}
                            <div className="md:col-span-12 lg:col-span-5 p-6 sm:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10 space-y-8">
                                <div className="space-y-6 text-center lg:text-left">
                                    <div className="relative inline-block">
                                        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-2 border-secondary/50 glow-secondary mx-auto lg:mx-0">
                                            <img src={developer.avatar} alt={developer.name} className="w-full h-full object-cover" />
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-3xl sm:text-4xl font-bold mb-2">{developer.name}</h2>
                                        <p className="text-secondary text-sm sm:text-lg font-medium">{developer.role.join(' • ')}</p>
                                    </div>

                                    <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                                        {developer.bio}
                                    </p>

                                    <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
                                        {developer.github && (
                                            <a href={developer.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3 bg-white/5 hover:bg-white/10 rounded-2xl font-bold transition-all border border-white/10 text-sm">
                                                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                                                GitHub
                                            </a>
                                        )}
                                        {developer.website && (
                                            <a href={developer.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3 bg-secondary text-background hover:bg-white rounded-2xl font-bold transition-all glow-secondary text-sm">
                                                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                                                Website
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Animated Stats Bar */}
                                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                    {statItems.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.2 + (i * 0.1) }}
                                            className="p-3 sm:p-4 bg-white/5 rounded-[1.25rem] sm:rounded-[1.5rem] border border-white/10 text-center"
                                        >
                                            <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-secondary mx-auto mb-2" />
                                            <p className="text-xl sm:text-2xl font-black text-white">{item.value}</p>
                                            <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-text-muted">{item.label}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Earned Badges Tray */}
                                <div className="space-y-4">
                                    <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
                                        <Award className="w-3 h-3" />
                                        Earned Badges
                                    </h4>
                                    <div className="flex flex-wrap gap-2.5 sm:gap-3">
                                        {getDeveloperBadges(developer).map((badge) => (
                                            <motion.div
                                                key={badge.id}
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                className={cn(
                                                    "p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border flex items-center justify-center relative group/badge",
                                                    badge.bgColor,
                                                    badge.borderColor
                                                )}
                                            >
                                                <badge.icon className={cn("w-5 h-5 sm:w-6 sm:h-6", badge.color)} />
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-[9px] sm:text-[10px] font-bold rounded opacity-0 lg:group-hover/badge:opacity-100 transition-opacity whitespace-nowrap z-20">
                                                    {badge.label}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Achievements Timeline */}
                            <div className="md:col-span-12 lg:col-span-7 p-6 sm:p-8 lg:p-12 space-y-10">
                                <section className="space-y-6">
                                    <div className="flex items-baseline justify-between">
                                        <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                                            <Award className="w-5 h-5 text-secondary" />
                                            Achievements Timeline
                                        </h3>
                                        {developer.achievements.length > 3 && (
                                            <button
                                                onClick={() => setShowAllAchievements(!showAllAchievements)}
                                                className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-white transition-colors"
                                            >
                                                {showAllAchievements ? 'Show Less' : `+${developer.achievements.length - 3} More`}
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        {(showAllAchievements ? [...developer.achievements].sort((a, b) => b.year - a.year) : [...developer.achievements].sort((a, b) => b.year - a.year).slice(0, 3)).map((ach, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.4 + (i * 0.1) }}
                                                className="group flex flex-col sm:flex-row gap-4 p-4 rounded-2xl sm:hover:bg-white/5 border border-white/5 sm:border-transparent sm:hover:border-white/10 transition-all bg-white/[0.02] sm:bg-transparent"
                                            >
                                                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-xl flex items-center justify-center text-secondary font-bold text-[10px] sm:text-xs">
                                                    {ach.year}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2 sm:mb-1">
                                                        <h4 className="font-bold text-white group-hover:text-secondary transition-colors text-sm sm:text-base">{ach.title}</h4>
                                                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-text-muted px-2 py-0.5 bg-white/5 rounded-full whitespace-nowrap border border-white/5">
                                                            {ach.type}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                                                        {ach.description}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </section>

                                {developer.roadmap && developer.roadmap.length > 0 && (
                                    <section className="space-y-6 pt-6 border-t border-white/5">
                                        <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                                            <Route className="w-5 h-5 text-secondary" />
                                            Achievement Highlights
                                        </h3>

                                        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[1.25rem] sm:before:ml-[1.4rem] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-secondary/50 before:via-white/10 before:to-transparent">
                                            {[...developer.roadmap].sort((a, b) => b.year - a.year).map((step, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                                    className="relative flex gap-4 sm:gap-6 items-start group"
                                                >
                                                    <div className={cn(
                                                        "w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-background flex items-center justify-center z-10 shrink-0 transition-colors",
                                                        step.status === 'Completed' ? "bg-secondary text-background" :
                                                            step.status === 'In Progress' ? "bg-primary border-secondary/50" : "bg-white/10"
                                                    )}>
                                                        <span className="text-[9px] sm:text-[10px] font-bold">
                                                            {step.status === 'Completed' ? '✓' : step.year}
                                                        </span>
                                                    </div>

                                                    <div className="flex-1 pb-6">
                                                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl sm:rounded-2xl group-hover:border-secondary/30 transition-all">
                                                            <div className="flex justify-between items-start mb-1 gap-4">
                                                                <div className="space-y-1">
                                                                    <h4 className="font-bold text-white group-hover:text-secondary transition-colors text-sm sm:text-base">{step.title}</h4>
                                                                    {step.type && (
                                                                        <span className="inline-block text-[7px] sm:text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-text-muted">
                                                                            {step.type}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <span className={cn(
                                                                    "text-[8px] sm:text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full whitespace-nowrap shrink-0",
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

                                {developer.certifications && developer.certifications.length > 0 && (
                                    <section className="space-y-6 pt-6 border-t border-white/5">
                                        <div className="flex items-baseline justify-between">
                                            <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                                                <Briefcase className="w-5 h-5 text-secondary" />
                                                Professional Certifications
                                            </h3>
                                            {developer.certifications.length > 4 && (
                                                <button
                                                    onClick={() => setShowAllCerts(!showAllCerts)}
                                                    className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-white transition-colors"
                                                >
                                                    {showAllCerts ? 'Show Less' : `+${developer.certifications.length - 4} More`}
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {(showAllCerts ? [...developer.certifications].sort((a, b) => b.year - a.year) : [...developer.certifications].sort((a, b) => b.year - a.year).slice(0, 4)).map((cert, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.1 + (i * 0.05) }}
                                                    className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-secondary/30 transition-all group/cert"
                                                >
                                                    <h4 className="font-bold text-white group-hover/cert:text-secondary transition-colors text-sm sm:text-base leading-tight mb-1">
                                                        {cert.title}
                                                    </h4>
                                                    <div className="flex justify-between items-center text-[10px] sm:text-xs">
                                                        <span className="text-text-muted">{cert.issuer}</span>
                                                        <span className="font-mono text-secondary/70">{cert.year}</span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Badge Guide Section - Expandable */}
                                <section className="pt-6 border-t border-white/5">
                                    <button
                                        onClick={() => setShowBadgeGuide(!showBadgeGuide)}
                                        className="w-full flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group/guide"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-secondary/10 rounded-lg">
                                                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="text-base sm:text-lg font-bold text-white group-hover/guide:text-secondary transition-colors">Badge Achievement Guide</h3>
                                                <p className="text-[10px] text-text-muted">Learn how to earn exclusive community badges</p>
                                            </div>
                                        </div>
                                        {showBadgeGuide ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-text-muted" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-text-muted" />}
                                    </button>

                                    <AnimatePresence>
                                        {showBadgeGuide && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-6">
                                                    {BADGE_CRITERIA.map((badge) => {
                                                        const isEarned = getDeveloperBadges(developer).some(b => b.id === badge.id);
                                                        return (
                                                            <div
                                                                key={badge.id}
                                                                className={cn(
                                                                    "p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all flex items-start gap-3",
                                                                    isEarned ? "bg-white/5 border-secondary/30" : "bg-black/20 border-white/5 opacity-60"
                                                                )}
                                                            >
                                                                <div className={cn("p-1.5 sm:p-2 rounded-lg shrink-0", badge.bgColor, badge.borderColor)}>
                                                                    <badge.icon className={cn("w-4 h-4 sm:w-5 sm:h-5", badge.color)} />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                                                        <h5 className="font-bold text-xs sm:text-sm text-white">{badge.label}</h5>
                                                                        {isEarned && <span className="text-[8px] sm:text-[10px] bg-secondary text-background px-1.5 py-0.5 rounded-md font-black shrink-0">EARNED</span>}
                                                                    </div>
                                                                    <p className="text-[9px] sm:text-[10px] text-text-muted leading-tight">{badge.description}</p>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </section>


                                <div className="p-6 sm:p-8 rounded-2xl bg-background border border-dashed border-white/20 font-mono">
                                    <h4 className="font-bold mb-2 text-white text-base sm:text-lg">Want to work with {developer.name.split(' ')[0]}?</h4>
                                    <p className="text-xs sm:text-sm text-text-muted mb-6">
                                        Professional inquiries and community collaborations are always welcome.
                                        Reach out via the buttons on the left profile card.
                                    </p>
                                    {developer.email ? (
                                        <a
                                            href={`mailto:${developer.email}`}
                                            className="w-full py-4 bg-white text-black hover:bg-gray-200 rounded-xl font-bold transition-all inline-block text-center text-sm"
                                        >
                                            Send a Message
                                        </a>
                                    ) : (
                                        <button disabled className="w-full py-4 bg-white/50 text-black/50 rounded-xl font-bold cursor-not-allowed text-center text-sm">
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
