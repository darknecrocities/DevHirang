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
    let score = 0;

    // 1. Contributions (Achievements array)
    developer.achievements?.forEach(ach => {
        switch (ach.type.toLowerCase()) {
            case 'hackathon': score += 100; break;
            case 'opensource': score += 150; break;
            case 'community': score += 200; break;
            case 'startup': score += 300; break;
            default: score += 50;
        }
    });

    // 2. Projects (from stats.projects_contributed)
    score += (developer.stats?.projects_contributed || 0) * 20;

    // 3. Certifications
    score += (developer.certifications?.length || 0) * 150;

    // 4. Baseline stats (hackathons won bonus)
    score += (developer.stats?.hackathons_won || 0) * 50;

    return score;
};

export const getRankingData = (developers) => {
    return developers
        .map(dev => ({
            ...dev,
            credibilityScore: calculateScore(dev)
        }))
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
