import React, { useState } from 'react';
import { Calendar, User, ArrowUpRight, Trophy, Code, Users, Rocket, ChevronDown, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DevDiaries = ({ developers }) => {
    const [visibleCount, setVisibleCount] = useState(5);

    // Extract all achievements into a chronological list
    const allLogs = developers.flatMap(dev =>
        dev.achievements.map(ach => ({
            ...ach,
            devName: dev.name,
            devRole: dev.role.join(' • '),
            devId: dev.id,
            devAvatar: dev.avatar
        }))
    ).sort((a, b) => b.year - a.year);

    const getAchievementIcon = (type) => {
        switch (type) {
            case 'hackathon': return <Trophy className="w-4 h-4 text-yellow-500" />;
            case 'opensource': return <Code className="w-4 h-4 text-blue-500" />;
            case 'community': return <Users className="w-4 h-4 text-green-500" />;
            case 'startup': return <Rocket className="w-4 h-4 text-purple-500" />;
            case 'work': return <Briefcase className="w-4 h-4 text-orange-500" />;
            case 'intern': return <Briefcase className="w-4 h-4 text-orange-400" />;
            default: return <Trophy className="w-4 h-4 text-secondary" />;
        }
    };

    const getAchievementColor = (type) => {
        switch (type) {
            case 'hackathon': return 'from-yellow-500/10 to-transparent border-yellow-500/20';
            case 'opensource': return 'from-blue-500/10 to-transparent border-blue-500/20';
            case 'community': return 'from-green-500/10 to-transparent border-green-500/20';
            case 'startup': return 'from-purple-500/10 to-transparent border-purple-500/20';
            case 'work': return 'from-orange-500/10 to-transparent border-orange-500/20';
            case 'intern': return 'from-orange-400/10 to-transparent border-orange-400/20';
            default: return 'from-white/5 to-transparent border-white/10';
        }
    };

    const handleSeeMore = () => {
        setVisibleCount(prev => prev + 5);
    };

    return (
        <div className="space-y-12">
            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 md:before:ml-0 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                <AnimatePresence>
                    {allLogs.slice(0, visibleCount).map((log, index) => (
                        <motion.div
                            key={`${log.devId}-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: (index % 5) * 0.1 }}
                            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                        >
                            {/* Dot */}
                            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/10 bg-background group-hover:bg-secondary group-hover:border-white transition-all absolute left-1 md:left-1/2 md:-translate-x-1/2 z-10">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-secondary group-hover:bg-primary animate-pulse" />
                            </div>

                            {/* Content */}
                            <div className={`w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] glassmorphism p-5 sm:p-6 rounded-2xl sm:rounded-3xl border group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all bg-gradient-to-br ${getAchievementColor(log.type)} ml-auto md:ml-0`}>
                                <div className="flex items-center justify-between mb-4">
                                    <time className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-widest">
                                        <Calendar className="w-3 h-3" />
                                        {log.year}
                                    </time>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-white/70 border border-white/10">
                                        {getAchievementIcon(log.type)}
                                        <span className="uppercase">{log.type}</span>
                                    </div>
                                </div>

                                <h4 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-secondary transition-colors line-clamp-1">{log.title}</h4>
                                <p className="text-text-muted text-xs sm:text-sm mb-4 line-clamp-2 leading-relaxed">
                                    {log.description}
                                </p>

                                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden bg-primary/20">
                                                <img src={log.devAvatar} alt={log.devName} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-secondary rounded-full flex items-center justify-center border border-background">
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] sm:text-xs font-bold text-white">{log.devName}</p>
                                            <p className="text-[9px] sm:text-[10px] text-text-muted font-medium uppercase tracking-tighter">{log.devRole}</p>
                                        </div>
                                    </div>
                                    <button className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 text-secondary hover:bg-secondary hover:text-primary transition-all group-hover:scale-110">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {visibleCount < allLogs.length && (
                <div className="flex justify-center pt-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSeeMore}
                        className="group relative flex items-center gap-3 px-8 py-4 rounded-full glassmorphism border-white/10 hover:border-secondary transition-all overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-secondary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative text-sm font-bold uppercase tracking-widest text-secondary group-hover:text-white">
                            See More Achievements
                        </span>
                        <ChevronDown className="relative w-4 h-4 text-secondary group-hover:text-white group-hover:translate-y-1 transition-all" />
                    </motion.button>
                </div>
            )}
        </div>
    );
};

export default DevDiaries;

