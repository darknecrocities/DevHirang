import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ChevronRight, Star, Info } from 'lucide-react';
import { cn } from '../../lib/utils';
import { calculateScore } from '../../utils/ranking';
import RankingCriteriaModal from './RankingCriteriaModal';

const TopDevelopersList = ({ developers, onSelect }) => {
    const [isCriteriaOpen, setIsCriteriaOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState({ elite: true, pro: true });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    // Dynamic Ranking System Algorithm
    const sortedDevs = [...developers]
        .map(dev => {
            const scores = calculateScore(dev);
            return {
                ...dev,
                credibilityScore: scores.total,
                impactScore: scores.impact,
                trustScore: scores.trust
            };
        })
        .sort((a, b) => b.credibilityScore - a.credibilityScore);

    return (
        <div className="w-full max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/20">
                <div className="flex items-center gap-3">
                    <Trophy className="w-8 h-8 text-secondary" />
                    <h2 className="text-3xl font-bold font-mono uppercase tracking-widest text-white">Top Developers</h2>
                </div>

                <button
                    onClick={() => setIsCriteriaOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white text-text-muted hover:text-black border border-white/10 rounded-lg transition-all font-mono text-sm font-bold uppercase tracking-tighter"
                >
                    <Info className="w-4 h-4" />
                    Ranking Criteria
                </button>
            </div>

            <div className="space-y-12">
                {/* Elite Division */}
                <div className="space-y-6">
                    <div
                        onClick={() => toggleSection('elite')}
                        className="flex items-center gap-4 px-2 cursor-pointer group/header"
                    >
                        <div className="flex -space-x-2">
                            {[...Array(3)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-secondary fill-secondary animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                            ))}
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-secondary group-hover/header:text-white transition-colors">Elite Division <span className="text-white/30 ml-2">// Top 3</span></h3>
                        <div className="flex-1 h-px bg-gradient-to-r from-secondary/50 to-transparent" />
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsCriteriaOpen(true); }}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                            <Info className="w-4 h-4 text-secondary/50 hover:text-secondary" />
                        </button>
                    </div>

                    <AnimatePresence>
                        {expandedSections.elite && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="space-y-4 overflow-hidden"
                            >
                                {sortedDevs.slice(0, 3).map((dev, index) => (
                                    <motion.div
                                        key={dev.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => onSelect(dev)}
                                        className={cn(
                                            "group relative flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 md:p-6 transition-all cursor-pointer overflow-hidden",
                                            "bg-background border border-white/20 hover:border-secondary/50",
                                            index < 3 && "border-l-4 border-l-secondary bg-white/[0.02]"
                                        )}
                                    >
                                        {/* Elite Glow Effect */}
                                        {index < 3 && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent pointer-events-none" />
                                        )}

                                        <div className="flex items-center gap-6 relative z-10">
                                            <div className={cn(
                                                "flex items-center justify-center w-12 h-12 rounded-full border font-mono text-xl font-bold transition-all shrink-0",
                                                index === 0 ? "bg-secondary border-secondary text-background shadow-[0_0_20px_rgba(212,175,55,0.3)]" :
                                                    index === 1 ? "bg-white/20 border-white/30 text-white" :
                                                        index === 2 ? "bg-white/10 border-white/20 text-white/80" : "bg-white/5 border-white/20 text-white/50"
                                            )}>
                                                #{index + 1}
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <img
                                                        src={dev.avatar}
                                                        alt={dev.name}
                                                        className="w-14 h-14 rounded-full border border-white/20 grayscale group-hover:grayscale-0 transition-all object-cover"
                                                    />
                                                    {index < 3 && (
                                                        <div className="absolute -top-1 -right-1 bg-secondary text-background p-1 rounded-full">
                                                            <Trophy className="w-3 h-3" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-white group-hover:text-secondary flex items-center gap-2">
                                                        {dev.name}
                                                        {index < 3 && <Star className="w-4 h-4 text-secondary fill-secondary" />}
                                                    </h3>
                                                    <p className="text-sm text-text-muted font-mono">{dev.role.join(' • ')}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-4 md:gap-8 min-w-fit relative z-10">
                                            <div className="flex items-center gap-4 text-right">
                                                <div className="hidden sm:block">
                                                    <p className="text-[10px] text-blue-400 font-mono uppercase tracking-tighter">Impact</p>
                                                    <p className="text-sm font-bold text-blue-200">{dev.impactScore.toLocaleString()}</p>
                                                </div>
                                                <div className="hidden sm:block w-px h-8 bg-white/10" />
                                                <div className="hidden sm:block">
                                                    <p className="text-[10px] text-green-400 font-mono uppercase tracking-tighter">Trust</p>
                                                    <p className="text-sm font-bold text-green-200">{dev.trustScore.toLocaleString()}</p>
                                                </div>
                                                <div className="hidden sm:block w-px h-8 bg-white/10" />
                                                <div>
                                                    <p className="text-[10px] text-secondary font-mono uppercase tracking-widest">Total</p>
                                                    <p className="text-2xl font-bold text-white tracking-tight">{dev.credibilityScore.toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <ChevronRight className="hidden md:block w-5 h-5 text-white/30 group-hover:text-white transition-colors" />
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Professional Division */}
                {sortedDevs.length > 3 && (
                    <div className="space-y-6 pt-8">
                        <div
                            onClick={() => toggleSection('pro')}
                            className="flex items-center gap-4 px-2 cursor-pointer group/header"
                        >
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-colors">Professional Division <span className="text-white/20 ml-2">// Top 100</span></h3>
                            <div className="flex-1 h-px bg-white/10" />
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsCriteriaOpen(true); }}
                                className="p-1 hover:bg-white/10 rounded transition-colors"
                            >
                                <Info className="w-4 h-4 text-white/20 hover:text-white/50" />
                            </button>
                        </div>

                        <AnimatePresence>
                            {expandedSections.pro && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="space-y-3 overflow-hidden"
                                >
                                    {sortedDevs.slice(3, 100).map((dev, index) => (
                                        <motion.div
                                            key={dev.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            onClick={() => onSelect(dev)}
                                            className="group flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all cursor-pointer rounded-lg"
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="w-8 font-mono text-sm text-white/30 text-center">#{index + 4}</span>
                                                <img
                                                    src={dev.avatar}
                                                    alt={dev.name}
                                                    className="w-10 h-10 rounded-full border border-white/10 grayscale group-hover:grayscale-0 transition-all object-cover"
                                                />
                                                <div>
                                                    <h4 className="font-bold text-white group-hover:text-secondary transition-colors truncate max-w-[150px] sm:max-w-none">
                                                        {dev.name}
                                                    </h4>
                                                    <p className="text-[10px] text-text-muted font-mono truncate max-w-[150px] sm:max-w-none">{dev.role[0]}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div className="hidden sm:block text-right">
                                                    <p className="text-[8px] text-text-muted font-mono uppercase tracking-tighter">Credibility</p>
                                                    <p className="text-sm font-bold text-white/60">{dev.credibilityScore.toLocaleString()}</p>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            <RankingCriteriaModal
                isOpen={isCriteriaOpen}
                onClose={() => setIsCriteriaOpen(false)}
            />
        </div>
    );
};

export default TopDevelopersList;
