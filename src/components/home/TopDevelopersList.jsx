import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ChevronRight, Star } from 'lucide-react';
import { cn } from '../../lib/utils';

const TopDevelopersList = ({ developers, onSelect }) => {
    // Sort developers by points descending
    const sortedDevs = [...developers].sort((a, b) => b.points - a.points);

    return (
        <div className="w-full max-w-5xl mx-auto space-y-6">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/20">
                <Trophy className="w-8 h-8 text-secondary" />
                <h2 className="text-3xl font-bold font-mono uppercase tracking-widest text-white">Top Developers in Pampanga</h2>
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
                            <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/5 font-mono text-xl font-bold text-white group-hover:bg-white group-hover:text-black transition-colors">
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

                        <div className="flex items-center justify-between md:justify-end gap-8 md:w-1/3">
                            <div className="text-left md:text-right">
                                <p className="text-xs text-text-muted font-mono uppercase tracking-widest">Impact Score</p>
                                <p className="text-2xl font-bold text-white">{dev.points.toLocaleString()}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white transition-colors" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TopDevelopersList;
