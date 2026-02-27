import React from 'react';
import { Calendar, User, ArrowUpRight } from 'lucide-react';

const DevDiaries = ({ developers }) => {
    // Extract all achievements into a chronological list
    const allLogs = developers.flatMap(dev =>
        dev.achievements.map(ach => ({
            ...ach,
            devName: dev.name,
            devRole: dev.role.join(' • '),
            devId: dev.id
        }))
    ).sort((a, b) => b.year - a.year);

    return (
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {allLogs.slice(0, 5).map((log, index) => (
                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    {/* Dot */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-background group-hover:bg-primary group-hover:border-secondary transition-all absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                        <div className="w-2 h-2 rounded-full bg-secondary group-hover:bg-white animate-pulse" />
                    </div>

                    {/* Content */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glassmorphism p-6 rounded-3xl border border-white/10 group-hover:border-secondary/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <time className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-widest">
                                <Calendar className="w-3 h-3" />
                                {log.year}
                            </time>
                            <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-text-muted border border-white/10">
                                {log.type}
                            </span>
                        </div>

                        <h4 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors line-clamp-1">{log.title}</h4>
                        <p className="text-text-muted text-sm mb-4 line-clamp-2">
                            {log.description}
                        </p>

                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                    <User className="w-3 h-3 text-secondary" />
                                </div>
                                <span className="text-xs font-semibold">{log.devName}</span>
                            </div>
                            <button className="text-secondary hover:text-white transition-colors">
                                <ArrowUpRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DevDiaries;
