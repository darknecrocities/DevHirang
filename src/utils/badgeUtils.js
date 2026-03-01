import { Trophy, Rocket, Code, Users, Star, Award, ShieldCheck, Globe } from 'lucide-react';

export const BADGE_CRITERIA = [
    {
        id: 'knight_lead',
        label: 'Knight Lead',
        description: 'Elite platform leader and administrator',
        icon: ShieldCheck,
        points: 20000,
        color: 'text-red-500',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/20',
        check: (dev) => dev.isAdmin
    },
    {
        id: 'featured_dev',
        label: 'Featured Developer',
        description: 'Recognized as an outstanding contributor to the community',
        icon: Star,
        points: 10000,
        color: 'text-secondary',
        bgColor: 'bg-secondary/10',
        borderColor: 'border-secondary/20',
        check: (dev) => dev.featured === 'monthly' || dev.featured === 'yearly' || dev.featured === true
    },
    {
        id: 'hackathon_heroes',
        label: 'Hackathons Heroes',
        description: 'Proven track record in national/international hackathons or CTFs',
        icon: Trophy,
        points: 15000,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/20',
        check: (dev) => dev.achievements.some(a => a.type === 'hackathon' || a.type === 'ctf') || dev.stats.hackathons_won > 0
    },
    {
        id: 'startups_tycoons',
        label: 'Startups Tycoons',
        description: 'Founded or led innovative tech startups and products',
        icon: Rocket,
        points: 12000,
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10',
        borderColor: 'border-purple-500/20',
        check: (dev) => dev.achievements.some(a => a.type === 'startup') || dev.role.some(r => r.includes('Founder') || r.includes('CEO'))
    },
    {
        id: 'open_source_master',
        label: 'Open Source Master',
        description: 'Significant contributions to open source projects and tools',
        icon: Code,
        points: 10000,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/20',
        check: (dev) => dev.achievements.some(a => a.type === 'opensource') || dev.stats.projects_contributed > 20
    },
    {
        id: 'community_leader',
        label: 'Community Leader',
        description: 'Driving growth and impact through tech communities',
        icon: Users,
        points: 8000,
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/20',
        check: (dev) => dev.achievements.some(a => a.type === 'community')
    },
    {
        id: 'academic',
        label: 'Academic',
        description: 'Scholarship and excellence in academic pursuits',
        icon: Award,
        points: 7000,
        color: 'text-indigo-400',
        bgColor: 'bg-indigo-500/10',
        borderColor: 'border-indigo-500/20',
        check: (dev) => dev.achievements.some(a => a.type === 'academic') || dev.role.some(r => r.includes('Student'))
    },
    {
        id: 'mentors',
        label: 'Mentors',
        description: 'Guiding and teaching the next generation of developers',
        icon: Globe,
        points: 9000,
        color: 'text-cyan-500',
        bgColor: 'bg-cyan-500/10',
        borderColor: 'border-cyan-500/20',
        check: (dev) => dev.role.some(r => r.toLowerCase().includes('mentor') || r.toLowerCase().includes('lead') || r.toLowerCase().includes('expert'))
    }
];

export const getDeveloperBadges = (developer) => {
    return BADGE_CRITERIA.filter(badge => badge.check(developer));
};
