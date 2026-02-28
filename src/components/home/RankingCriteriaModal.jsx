import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Code, Award, BookOpen, Info, Star } from 'lucide-react';
import { RANKING_WEIGHTS } from '../../utils/ranking';

const RankingCriteriaModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const criteria = [
        {
            icon: Award,
            title: "Contributions",
            description: "Points earned for hackathons, open-source work, community leadership, and startup ventures.",
            details: RANKING_WEIGHTS.contributions
        },
        {
            icon: Code,
            title: "Projects",
            description: "Calculated based on the total number of verified projects and applications contributed to.",
            points: RANKING_WEIGHTS.projects
        },
        {
            icon: BookOpen,
            title: "Certifications",
            description: "Points awarded for professional certifications from recognized institutions (Google, Meta, AWS, etc.).",
            points: RANKING_WEIGHTS.certifications
        },
        {
            icon: Trophy,
            title: "Achievements",
            description: "Direct bonus points for hackathon wins and verified technical awards.",
            points: RANKING_WEIGHTS.achievements
        }
    ];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-2xl bg-black border border-white/20 rounded-3xl shadow-2xl overflow-hidden font-mono"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                        <div className="flex items-center gap-3">
                            <Info className="w-6 h-6 text-white" />
                            <h2 className="text-xl font-bold uppercase tracking-wider">Ranking System</h2>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                        <section className="space-y-4">
                            <h3 className="text-secondary font-bold uppercase tracking-widest text-xs">Score Breakdown</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                    <p className="text-blue-400 font-bold text-sm uppercase">Impact Score</p>
                                    <p className="text-xs text-text-muted mt-1">Measures performance: projects, hackathon wins, and open-source contributions.</p>
                                </div>
                                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                                    <p className="text-green-400 font-bold text-sm uppercase">Trust Score</p>
                                    <p className="text-xs text-text-muted mt-1">Measures status: certifications, community leadership, and verified platform roles.</p>
                                </div>
                            </div>
                        </section>

                        <div className="grid gap-6">
                            {criteria.map((item, i) => (
                                <div key={i} className="group p-4 rounded-xl border border-white/5 bg-white/5 hover:border-white/20 transition-all">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-lg bg-black border border-white/10 group-hover:border-white/30 transition-all">
                                            <item.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">{item.title}</h3>
                                            <p className="text-sm text-text-muted mb-4">{item.description}</p>

                                            <div className="text-[11px] font-bold py-2 px-3 bg-white text-black inline-block rounded">
                                                {typeof item.points === 'string' ? item.points :
                                                    Object.entries(item.details).map(([key, val]) => `${key}: ${val}pts`).join(' | ')
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Status Bonuses */}
                            <div className="p-4 rounded-xl border border-secondary/20 bg-secondary/5">
                                <h3 className="text-secondary font-bold text-sm uppercase mb-3 tracking-widest flex items-center gap-2">
                                    <Star className="w-4 h-4 fill-secondary" />
                                    Platform Status Bonuses
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-white/70">Admin Verified Status</span>
                                        <span className="font-bold text-secondary">+5,000 pts</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-white/70">Featured Developer</span>
                                        <span className="font-bold text-secondary">+1,000 pts</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-white/5 border border-dashed border-white/20 text-center">
                            <p className="text-xs text-text-muted">
                                Ranking is updated in real-time as developers contribute to the ecosystem.
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-white/10 bg-white/5 text-center">
                        <button
                            onClick={onClose}
                            className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-all active:scale-95"
                        >
                            Understood
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default RankingCriteriaModal;
