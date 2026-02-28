/**
 * Ranking Algorithm for DevHirang
 * 
 * Logic:
 * - Contributions: (hackathon: 100, opensource: 150, community: 200, startup: 300)
 * - Projects: 20 pts per project contributed (from stats)
 * - Certifications: 150 pts per certification
 * - Achievements count: 50 pts each (baseline multiplier)
 */

export const calculateScore = (developer) => {
    let impactScore = developer.points || 0;
    let trustScore = 0;

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

    // 5. Status Bonuses (Trust)
    if (developer.isAdmin) trustScore += 5000;
    if (developer.featured) trustScore += 1000;

    return {
        impact: impactScore,
        trust: trustScore,
        total: impactScore + trustScore
    };
};

export const getRankingData = (developers) => {
    return developers
        .map(dev => {
            const scores = calculateScore(dev);
            return {
                ...dev,
                credibilityScore: scores.total,
                impactScore: scores.impact,
                trustScore: scores.trust
            };
        })
        .sort((a, b) => b.credibilityScore - a.credibilityScore);
};

export const RANKING_WEIGHTS = {
    contributions: {
        'Hackathon': 100,
        'Open Source': 150,
        'Community': 200,
        'Startup': 300
    },
    projects: '20 pts per contribution',
    certifications: '150 pts per certificate',
    achievements: '50 pts per win'
};
