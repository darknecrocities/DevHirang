import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ChevronRight, Star, Info } from 'lucide-react';
import { cn } from '../../lib/utils';
import { getDeveloperBadges } from '../../utils/badgeUtils';

const TopDevelopersList = ({ developers, onSelect }) => {
    const [expandedSections, setExpandedSections] = useState({ yearly: true, monthly: true, pro: true });
    const [activeFilter, setActiveFilter] = useState('all');

    const toggleSection = (section) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    // Qualitative Sorting System
    const sortedDevs = [...developers]
        .map(dev => {
            const badges = getDeveloperBadges(dev);
            return {
                ...dev,
                badges,
                badgeCount: badges.length
            };
        })
        .sort((a, b) => {
            if (a.isAdmin !== b.isAdmin) return b.isAdmin ? -1 : 1;
            if (a.featured !== b.featured) return b.featured ? -1 : 1;
            if (a.badgeCount !== b.badgeCount) return b.badgeCount - a.badgeCount;
            return a.name.localeCompare(b.name);
        });

    return (
        <div className="w-full max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/20">
                <div className="flex items-center gap-3">
                    <Trophy className="w-8 h-8 text-secondary" />
                    <h2 className="text-3xl font-bold font-mono uppercase tracking-widest text-white">100 Hinirang</h2>
                </div>
            </div>

            <div className="space-y-12">
                {/* Yearly Featured Division */}
                <div className="space-y-6">
                    <div
                        onClick={() => toggleSection('yearly')}
                        className="flex items-center gap-4 px-2 cursor-pointer group/header"
                    >
                        <div className="flex -space-x-2">
                            {[...Array(3)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-secondary fill-secondary animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                            ))}
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-secondary group-hover/header:text-white transition-colors">Yearly Featured Developers</h3>
                        <div className="flex-1 h-px bg-gradient-to-r from-secondary/50 to-transparent" />
                    </div>

                    <AnimatePresence>
                        {expandedSections.yearly && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="space-y-4 overflow-hidden"
                            >
                                {sortedDevs.filter(d => d.featured === 'yearly' || d.featured === true).map((dev, index) => (
                                    <motion.div
                                        key={dev.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => onSelect(dev)}
                                        className={cn(
                                            "group relative flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 md:p-6 transition-all cursor-pointer overflow-hidden",
                                            "bg-background border border-white/20 hover:border-secondary/50",
                                            "border-l-4 border-l-secondary bg-white/[0.02]"
                                        )}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent pointer-events-none" />

                                        <div className="flex items-center gap-6 relative z-10">
                                            <div className="flex items-center justify-center w-12 h-12 rounded-full border transition-all shrink-0 bg-secondary border-secondary text-background shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                                                <Trophy className="w-6 h-6" />
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <img
                                                        src={dev.avatar}
                                                        alt={dev.name}
                                                        className="w-14 h-14 rounded-full border border-white/20 grayscale group-hover:grayscale-0 transition-all object-cover"
                                                    />
                                                    <div className="absolute -top-1 -right-1 bg-secondary text-background p-1 rounded-full">
                                                        <Trophy className="w-3 h-3" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-white group-hover:text-secondary flex items-center gap-2">
                                                        {dev.name}
                                                        <Star className="w-4 h-4 text-secondary fill-secondary" />
                                                    </h3>
                                                    <p className="text-sm text-text-muted font-mono">{dev.role.join(' • ')}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-4 md:gap-8 min-w-fit relative z-10">
                                            <div className="flex items-center gap-3">
                                                {dev.badges.map((badge) => (
                                                    <div
                                                        key={badge.id}
                                                        className={cn(
                                                            "p-2 rounded-lg border backdrop-blur-md transition-all",
                                                            badge.bgColor,
                                                            badge.borderColor
                                                        )}
                                                        title={badge.label}
                                                    >
                                                        <badge.icon className={cn("w-4 h-4", badge.color)} />
                                                    </div>
                                                ))}
                                            </div>
                                            <ChevronRight className="hidden md:block w-5 h-5 text-white/30 group-hover:text-white transition-colors" />
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Monthly Featured Division */}
                <div className="space-y-6">
                    <div
                        onClick={() => toggleSection('monthly')}
                        className="flex items-center gap-4 px-2 cursor-pointer group/header"
                    >
                        <div className="flex -space-x-2">
                            {[...Array(2)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-blue-400 fill-blue-400 animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                            ))}
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-blue-400 group-hover/header:text-blue-300 transition-colors">Monthly Featured Developers</h3>
                        <div className="flex-1 h-px bg-gradient-to-r from-blue-400/50 to-transparent" />
                    </div>

                    <AnimatePresence>
                        {expandedSections.monthly && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="space-y-4 overflow-hidden"
                            >
                                {sortedDevs.filter(d => d.featured === 'monthly').map((dev, index) => (
                                    <motion.div
                                        key={dev.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => onSelect(dev)}
                                        className={cn(
                                            "group relative flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 md:p-6 transition-all cursor-pointer overflow-hidden",
                                            "bg-background border border-white/20 hover:border-blue-400/50",
                                            "border-l-4 border-l-blue-400 bg-white/[0.02]"
                                        )}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-transparent pointer-events-none" />

                                        <div className="flex items-center gap-6 relative z-10">
                                            <div className="flex items-center justify-center w-12 h-12 rounded-full border transition-all shrink-0 bg-blue-400/20 border-blue-400/30 text-blue-400">
                                                <Trophy className="w-6 h-6" />
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <img
                                                        src={dev.avatar}
                                                        alt={dev.name}
                                                        className="w-14 h-14 rounded-full border border-white/20 grayscale group-hover:grayscale-0 transition-all object-cover"
                                                    />
                                                    <div className="absolute -top-1 -right-1 bg-blue-400 text-background p-1 rounded-full">
                                                        <Trophy className="w-3 h-3" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 flex items-center gap-2">
                                                        {dev.name}
                                                    </h3>
                                                    <p className="text-sm text-text-muted font-mono">{dev.role.join(' • ')}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-4 md:gap-8 min-w-fit relative z-10">
                                            <div className="flex items-center gap-3">
                                                {dev.badges.map((badge) => (
                                                    <div
                                                        key={badge.id}
                                                        className={cn(
                                                            "p-2 rounded-lg border backdrop-blur-md transition-all",
                                                            badge.bgColor,
                                                            badge.borderColor
                                                        )}
                                                        title={badge.label}
                                                    >
                                                        <badge.icon className={cn("w-4 h-4", badge.color)} />
                                                    </div>
                                                ))}
                                            </div>
                                            <ChevronRight className="hidden md:block w-5 h-5 text-white/30 group-hover:text-white transition-colors" />
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Contributors Section */}
                <div className="space-y-12">
                    <div className="px-2">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6">
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/40">Contributors Section</h3>

                            {/* Filter Bar */}
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { id: 'all', label: 'All' },
                                    { id: 'Hackathons Heroes', label: 'Hackathons' },
                                    { id: 'Startups Tycoons', label: 'Start up' },
                                    { id: 'Mentors', label: 'Mentors' },
                                    { id: 'Academic', label: 'Academe' },
                                    { id: 'Community Leader', label: 'Community Leader' },
                                    { id: 'Open Source Master', label: 'Open Source' }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveFilter(tab.id)}
                                        className={cn(
                                            "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border",
                                            activeFilter === tab.id
                                                ? "bg-secondary border-secondary text-background shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                                                : "bg-white/5 border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                                        )}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Grouping by Badge Category */}
                        {activeFilter === 'all' ? (
                            <motion.div
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                                {sortedDevs.map((dev) => (
                                    <motion.div
                                        key={dev.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        onClick={() => onSelect(dev)}
                                        className="group flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all cursor-pointer rounded-xl"
                                    >
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={dev.avatar}
                                                alt={dev.name}
                                                className="w-10 h-10 rounded-full border border-white/10 grayscale group-hover:grayscale-0 transition-all object-cover"
                                            />
                                            <div>
                                                <h4 className="font-bold text-white group-hover:text-secondary transition-colors text-sm">
                                                    {dev.name}
                                                </h4>
                                                <p className="text-[10px] text-text-muted font-mono">{dev.role[0]}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1.5">
                                                {dev.badges.slice(0, 3).map((badge) => (
                                                    <div
                                                        key={badge.id}
                                                        className={cn(
                                                            "p-1.5 rounded-lg border backdrop-blur-md",
                                                            badge.bgColor,
                                                            badge.borderColor
                                                        )}
                                                    >
                                                        <badge.icon className={cn("w-3 h-3", badge.color)} />
                                                    </div>
                                                ))}
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            ['Knight Lead', 'Hackathons Heroes', 'Startups Tycoons', 'Open Source Master', 'Community Leader', 'Academic', 'Mentors']
                                .filter(category => activeFilter === category)
                                .map((category) => {
                                    const devsInCategory = sortedDevs.filter(dev =>
                                        dev.badges.some(b => b.label === category)
                                    ).slice(0, 10); // Limit to top 10 per category

                                    if (devsInCategory.length === 0) return null;

                                    return (
                                        <motion.div
                                            key={category}
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mb-12"
                                        >
                                            <div className="flex items-center gap-4 mb-6">
                                                <h4 className="text-xs font-bold text-secondary uppercase tracking-widest">{category}</h4>
                                                <div className="flex-1 h-px bg-white/5" />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {devsInCategory.map((dev) => (
                                                    <motion.div
                                                        key={dev.id}
                                                        layout
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        onClick={() => onSelect(dev)}
                                                        className="group flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all cursor-pointer rounded-xl"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <img
                                                                src={dev.avatar}
                                                                alt={dev.name}
                                                                className="w-10 h-10 rounded-full border border-white/10 grayscale group-hover:grayscale-0 transition-all object-cover"
                                                            />
                                                            <div>
                                                                <h4 className="font-bold text-white group-hover:text-secondary transition-colors text-sm">
                                                                    {dev.name}
                                                                </h4>
                                                                <p className="text-[10px] text-text-muted font-mono">{dev.role[0]}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex items-center gap-1.5">
                                                                {dev.badges.slice(0, 3).map((badge) => (
                                                                    <div
                                                                        key={badge.id}
                                                                        className={cn(
                                                                            "p-1.5 rounded-lg border backdrop-blur-md",
                                                                            badge.bgColor,
                                                                            badge.borderColor
                                                                        )}
                                                                    >
                                                                        <badge.icon className={cn("w-3 h-3", badge.color)} />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    );
                                })
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TopDevelopersList;
