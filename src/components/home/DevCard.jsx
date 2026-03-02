import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Award, Scroll } from 'lucide-react';
import { cn } from '../../lib/utils';
import { getDeveloperBadges } from '../../utils/badgeUtils';

const DevCard = ({ developer, onClick }) => {
    const badges = getDeveloperBadges(developer);

    return (
        <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            onClick={onClick}
            className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-secondary/30 transition-all hover:bg-white/8 glow-primary"
        >
            <div className="p-1">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                    <img
                        src={developer.avatar}
                        alt={developer.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                        {developer.featured && (
                            <div className="p-1.5 bg-secondary text-background rounded-lg glow-secondary">
                                <Award className="w-4 h-4" />
                            </div>
                        )}
                        {developer.certifications && developer.certifications.length > 0 && (
                            <div className="relative group/cert-pop">
                                <div className="p-1.5 bg-background/60 backdrop-blur-md border border-secondary/30 text-secondary rounded-lg cursor-help transition-all hover:bg-secondary hover:text-background">
                                    <Scroll className="w-4 h-4" />
                                </div>
                                <div className="absolute top-0 right-full mr-3 w-48 p-3 bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl opacity-0 translate-x-4 pointer-events-none group-hover/cert-pop:opacity-100 group-hover/cert-pop:translate-x-0 transition-all z-50 shadow-2xl">
                                    <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2 px-1">Certifications</p>
                                    <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                                        {developer.certifications.map((cert, i) => (
                                            <div key={i} className="px-2 py-1.5 bg-white/5 rounded-lg border border-white/5">
                                                <p className="text-[10px] font-bold text-white leading-tight mb-0.5">{cert.title}</p>
                                                <p className="text-[9px] text-text-muted">{cert.issuer}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {badges.slice(0, 3).map((badge, i) => (
                            <div
                                key={badge.id}
                                className={cn(
                                    "p-1.5 rounded-lg border backdrop-blur-md transition-all",
                                    badge.bgColor,
                                    badge.borderColor
                                )}
                                title={badge.label}
                            >
                                <badge.icon className={cn("w-4 h-4", badge.color)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-5 space-y-3">
                <div>
                    <h3 className="text-xl font-bold line-clamp-1">{developer.name}</h3>
                    <p className="text-secondary text-sm font-medium">{developer.role.join(' • ')}</p>
                </div>

                <p className="text-text-muted text-sm line-clamp-2 min-h-[2.5rem]">
                    {developer.bio}
                </p>

                <div className="flex flex-wrap gap-2">
                    {[...developer.achievements].sort((a, b) => b.year - a.year).slice(0, 3).map((ach, i) => (
                        <span
                            key={i}
                            className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-wider text-text-muted"
                        >
                            {ach.type}
                        </span>
                    ))}
                    {developer.achievements.length > 3 && (
                        <span className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] font-bold text-text-muted">
                            +{developer.achievements.length - 3}
                        </span>
                    )}
                </div>

                {developer.roadmap && developer.roadmap.length > 0 && (
                    <div className="pt-3 border-t border-white/5">
                        <p className="text-xs font-bold text-secondary mb-1 uppercase tracking-wider">Current Focus</p>
                        <p className="text-sm text-text-muted line-clamp-1">
                            {developer.roadmap.find(r => r.status === 'Current Focus')?.title ||
                                developer.roadmap.find(r => r.status === 'In Progress')?.title ||
                                developer.roadmap[0].title}
                        </p>
                    </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="text-center group-hover:scale-105 transition-transform">
                            <p className="text-[8px] text-text-muted uppercase font-bold tracking-tighter">Joined</p>
                            <p className="text-sm font-bold text-white font-mono">{Math.min(...developer.achievements.map(a => a.year), 2026)}</p>
                        </div>
                        <div className="w-px h-6 bg-white/10" />
                        <div className="text-center group-hover:scale-105 transition-transform">
                            <p className="text-[8px] text-text-muted uppercase font-bold tracking-tighter">Wins</p>
                            <p className="text-sm font-bold text-secondary font-mono">{developer.stats?.hackathons_won || 0}</p>
                        </div>
                        <div className="w-px h-6 bg-white/10" />
                        <div className="text-center group-hover:scale-105 transition-transform">
                            <p className="text-[8px] text-text-muted uppercase font-bold tracking-tighter">Projects</p>
                            <p className="text-sm font-bold text-blue-400 font-mono">{developer.stats?.projects_contributed || 0}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {developer.github && (
                            <a href={developer.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 bg-white/5 rounded-lg group-hover:bg-secondary group-hover:text-background transition-colors">
                                <Github className="w-4 h-4" />
                            </a>
                        )}
                        {developer.website && (
                            <a href={developer.website} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 bg-white/5 rounded-lg group-hover:bg-secondary group-hover:text-background transition-colors">
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DevCard;
