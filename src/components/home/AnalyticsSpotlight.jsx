import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, Rocket, Globe } from 'lucide-react';

const AnalyticsSpotlight = ({ developers }) => {
    const stats = useMemo(() => {
        const totalDevs = developers.length;

        // Calculate unique organizations/communities
        const orgs = new Set();
        developers.forEach(dev => {
            if (dev.community_affiliation?.organization) {
                orgs.add(dev.community_affiliation.organization);
            }
            dev.achievements?.forEach(ach => {
                const type = ach.type?.toLowerCase();
                if ((type === 'community' || type === 'work' || type === 'intern') && ach.title.includes('-')) {
                    const orgName = ach.title.split('-')[0].trim();
                    if (orgName.length > 2) orgs.add(orgName);
                }
            });
            dev.certifications?.forEach(cert => {
                if (cert.issuer) orgs.add(cert.issuer);
            });
        });

        const totalProjects = developers.reduce((sum, dev) => sum + (dev.stats?.projects_contributed || 0), 0);

        return [
            {
                label: 'Developers Joined',
                value: totalDevs,
                icon: Users,
                color: 'text-secondary',
                bgColor: 'bg-secondary/10',
                borderColor: 'border-secondary/20'
            },
            {
                label: 'Network Reach',
                value: orgs.size,
                icon: Building2,
                detail: 'Communities & Partners',
                color: 'text-secondary',
                bgColor: 'bg-secondary/10',
                borderColor: 'border-secondary/20'
            },
            {
                label: 'Impact Factor',
                value: totalProjects.toLocaleString(),
                icon: Rocket,
                detail: 'Projects Contributed',
                color: 'text-secondary',
                bgColor: 'bg-secondary/10',
                borderColor: 'border-secondary/20'
            }
        ];
    }, [developers]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="relative group h-full"
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative h-full glassmorphism p-8 rounded-[2rem] border border-white/10 hover:border-secondary/30 transition-all flex flex-col items-center text-center cursor-pointer active:scale-95 group/card">
                        <div className={`w-14 h-14 rounded-2xl ${stat.bgColor} ${stat.borderColor} border flex items-center justify-center mb-6 group-hover/card:scale-110 group-hover/card:border-secondary/50 transition-all shadow-lg shadow-black/20`}>
                            <stat.icon className={`w-7 h-7 ${stat.color}`} />
                        </div>
                        <h4 className="text-4xl font-black text-white mb-2 tracking-tighter group-hover/card:text-secondary transition-colors">
                            {stat.value}
                            {index === 2 && <span className="text-secondary">+</span>}
                        </h4>
                        <p className="text-secondary font-mono text-xs uppercase tracking-[0.2em] font-bold mb-2">
                            {stat.label}
                        </p>
                        {stat.detail && (
                            <p className="text-[10px] text-text-muted uppercase tracking-widest font-medium opacity-60">
                                {stat.detail}
                            </p>
                        )}
                        <div className="absolute bottom-4 opacity-0 group-hover/card:opacity-100 transition-opacity">
                            <div className="w-8 h-1 bg-secondary rounded-full" />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default AnalyticsSpotlight;
