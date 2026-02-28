import { Trophy, Rocket, Code, Users, Star, Award, ShieldCheck, Globe } from 'lucide-react';

export const BADGE_CRITERIA = [
    {
        id: 'world_level',
        label: 'World Level Developer',
        description: '40+ certifications, 10+ hackathon wins, 100+ projects, and 2,000+ GitHub contributions',
        icon: Globe,
        points: 20000,
        color: 'text-indigo-400',
        bgColor: 'bg-indigo-500/10',
        borderColor: 'border-indigo-500/20',
        check: (dev) =>
            (dev.certifications?.length || 0) >= 40 &&
            dev.stats.hackathons_won >= 10 &&
            dev.stats.projects_contributed >= 100 &&
            (dev.stats.github_contributions || 0) >= 2000
    },
    {
        id: 'admin',
        label: 'Platform Admin',
        description: 'Exclusive badge for platform administrators',
        icon: ShieldCheck,
        points: 10000,
        color: 'text-red-500',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/20',
        check: (dev) => dev.isAdmin
    },
    {
        id: 'hackathon_hero',
        label: 'Hackathon Hero',
        description: 'Won more than 5 hackathons',
        icon: Trophy,
        points: 15000,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/20',
        check: (dev) => dev.stats.hackathons_won > 5
    },
    {
        id: 'product_visionary',
        label: 'Product Visionary',
        description: 'Founded or led a startup project',
        icon: Rocket,
        points: 10000,
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10',
        borderColor: 'border-purple-500/20',
        check: (dev) => dev.achievements.some(a => a.type === 'startup')
    },
    {
        id: 'elite_contributor',
        label: 'Elite Contributor',
        description: 'Contributed to over 50 projects',
        icon: Code,
        points: 10000,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/20',
        check: (dev) => dev.stats.projects_contributed > 50
    },
    {
        id: 'community_pillar',
        label: 'Community Pillar',
        description: 'High impact in 3 or more community initiatives',
        icon: Users,
        points: 8000,
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/20',
        check: (dev) => dev.achievements.filter(a => a.type === 'community').length >= 3
    },
    {
        id: 'legacy_builder',
        label: 'Legacy Builder',
        description: 'Proven impact with 20+ projects or 500+ GitHub contributions',
        icon: Award,
        points: 7000,
        color: 'text-cyan-500',
        bgColor: 'bg-cyan-500/10',
        borderColor: 'border-cyan-500/20',
        check: (dev) => (dev.stats.projects_contributed || 0) >= 20 || (dev.stats.github_contributions || 0) >= 500
    },
    {
        id: 'rising_star',
        label: 'Rising Star',
        description: 'Active contributor with at least 5 projects',
        icon: Star,
        points: 5000,
        color: 'text-orange-500',
        bgColor: 'bg-orange-500/10',
        borderColor: 'border-orange-500/20',
        check: (dev) => (dev.stats.projects_contributed || 0) >= 5
    }
];

export const getDeveloperBadges = (developer) => {
    return BADGE_CRITERIA.filter(badge => badge.check(developer));
};
