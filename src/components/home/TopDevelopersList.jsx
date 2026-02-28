import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, ChevronRight, Star, Info } from 'lucide-react';
import { cn } from '../../lib/utils';
import { calculateScore } from '../../utils/ranking';
import RankingCriteriaModal from './RankingCriteriaModal';

const TopDevelopersList = ({ developers, onSelect }) => {
    const [isCriteriaOpen, setIsCriteriaOpen] = useState(false);

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

            <div className="space-y-4">
                {sortedDevs.map((dev, index) => (
                    <motion.div
                        key={dev.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => onSelect(dev)}
                        className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 md:p-6 bg-background border border-dashed border-white/20 hover:border-white transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-6">
                            <div className={cn(
                                "flex items-center justify-center w-12 h-12 rounded-full border font-mono text-xl font-bold transition-all",
                                index === 0 ? "bg-secondary border-secondary text-background" :
                                    index === 1 ? "bg-white/20 border-white/30 text-white" :
                                        index === 2 ? "bg-white/10 border-white/20 text-white/80" : "bg-white/5 border-white/20 text-white/50"
                            )}>
                                #{index + 1}
                            </div>

                            <div className="flex items-center gap-4">
                                <img
                                    src={dev.avatar}
                                    alt={dev.name}
                                    className="w-14 h-14 rounded-full border border-white/20 grayscale group-hover:grayscale-0 transition-all object-cover"
                                />
                                <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-secondary flex items-center gap-2">
                                        {dev.name}
                                        {index < 3 && <Star className="w-4 h-4 text-secondary fill-secondary" />}
                                    </h3>
                                    <p className="text-sm text-text-muted font-mono">{dev.role.join(' • ')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-4 md:gap-8 min-w-fit">
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
            </div>

            <RankingCriteriaModal
                isOpen={isCriteriaOpen}
                onClose={() => setIsCriteriaOpen(false)}
            />
        </div>
    );
};

export default TopDevelopersList;
