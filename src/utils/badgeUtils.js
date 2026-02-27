import { Trophy, Rocket, Code, Users, Star, Award, ShieldCheck, Globe } from 'lucide-react';

export const BADGE_CRITERIA = [
    {
        id: 'world_level',
        label: 'World Level Developer',
        description: '40+ certifications, 10+ hackathon wins, and 100+ projects',
        icon: Globe,
        color: 'text-indigo-400',
        bgColor: 'bg-indigo-500/10',
        borderColor: 'border-indigo-500/20',
        check: (dev) =>
            (dev.certifications?.length || 0) >= 40 &&
            dev.stats.hackathons_won >= 10 &&
            dev.stats.projects_contributed >= 100
    },
    {
        id: 'hackathon_hero',
        label: 'Hackathon Hero',
        description: 'Won more than 5 hackathons',
        icon: Trophy,
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
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/20',
        check: (dev) => dev.achievements.filter(a => a.type === 'community').length >= 3
    },
    {
        id: 'admin',
        label: 'Platform Admin',
        description: 'Exclusive badge for platform administrators',
        icon: ShieldCheck,
        color: 'text-red-500',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/20',
        check: (dev) => dev.isAdmin
    },
    {
        id: 'rising_star',
        label: 'Rising Star',
        description: 'Earned at least 1,000 points',
        icon: Star,
        color: 'text-orange-500',
        bgColor: 'bg-orange-500/10',
        borderColor: 'border-orange-500/20',
        check: (dev) => dev.points >= 1000
    },
    {
        id: 'legacy_builder',
        label: 'Legacy Builder',
        description: 'Reached legendary status with over 5,000 points',
        icon: Award,
        color: 'text-cyan-500',
        bgColor: 'bg-cyan-500/10',
        borderColor: 'border-cyan-500/20',
        check: (dev) => dev.points >= 5000
    }
];

export const getDeveloperBadges = (developer) => {
    return BADGE_CRITERIA.filter(badge => badge.check(developer));
};
