import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Code, Award, BookOpen, Info } from 'lucide-react';
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
                        <p className="text-text-muted text-sm leading-relaxed">
                            The DevHirang Ranking Algorithm automatically calculates a "Credibility Score" for each developer based on their verified profile data. Points are distributed across four key categories:
                        </p>

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
