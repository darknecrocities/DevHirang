/**
 * Ranking Algorithm for DevHirang
 * 
 * Logic:
 * - Contributions: (hackathon: 100, opensource: 150, community: 200, startup: 300)
 * - Projects: 20 pts per project contributed (from stats)
 * - Certifications: 150 pts per certification
 * - Achievements count: 50 pts each (baseline multiplier)
 */

import { getDeveloperBadges } from './badgeUtils';

const calculateScore = (developer) => {
    let impactScore = 0;
    let trustScore = 0;

    // 0. Badge-Based Base Points (v2 Scaling)
    const earnedBadges = getDeveloperBadges(developer);
    const badgePoints = earnedBadges.reduce((sum, badge) => sum + (badge.points || 0), 0);
    impactScore += badgePoints;

    // 1. Contributions (Achievements array)
    developer.achievements?.forEach(ach => {
        const type = ach.type.toLowerCase();
        switch (type) {
            case 'hackathon': impactScore += 100; break;
            case 'opensource': impactScore += 150; break;
            case 'startup': impactScore += 300; break;
            case 'community': trustScore += 200; break;
            default: impactScore += 50;
        }
    });

    // 2. Projects (Impact)
    impactScore += (developer.stats?.projects_contributed || 0) * 20;

    // 3. Certifications (Trust)
    trustScore += (developer.certifications?.length || 0) * 150;

    // 4. Bonus Stats (Impact)
    impactScore += (developer.stats?.hackathons_won || 0) * 50;
    impactScore += (developer.stats?.github_contributions || 0) * 50;

    // 5. Status Bonuses (Trust) - Now handled via badges, but keeping for backward compatibility if needed, 
    // though the badge system already covers isAdmin and featured.
    // To avoid double counting, we'll keep only what's not in badges or adjust.
    // Actually, Admin and Featured are badges now (15k and 1k/8k).
    // Let's remove them here to avoid double counting.

    return {
        impact: impactScore,
        trust: trustScore,
        total: impactScore + trustScore
    };
};

export const getRankingData = (developers) => {
    return developers
        .map(dev => {
            const badges = getDeveloperBadges(dev);
            return {
                ...dev,
                badgeCount: badges.length
            };
        })
        .sort((a, b) => {
            // 1. Admin Status
            if (a.isAdmin !== b.isAdmin) return b.isAdmin ? 1 : -1;

            // 2. Featured Status
            if (a.featured !== b.featured) return b.featured ? 1 : -1;

            // 3. Badge count (Activity)
            if (a.badgeCount !== b.badgeCount) return b.badgeCount - a.badgeCount;

            // 4. Alphabetical (for stable sorting)
            return a.name.localeCompare(b.name);
        });
};

export const RANKING_WEIGHTS = {
    contributions: {
        'Hackathon': 100,
        'Open Source': 150,
        'Community': 200,
        'Startup': 300
    },
    projects: '20 pts per contribution',
    github_contributions: '50 pts each',
    certifications: '150 pts per certificate',
    achievements: '50 pts per win'
};
