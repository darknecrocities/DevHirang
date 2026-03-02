import { getDeveloperBadges } from './badgeUtils';

/**
 * Ranking Logic for DevHirang
 * 
 * Logic:
 * 1. Admin Status (Top priority)
 * 2. Featured Status (Second priority)
 * 3. Badge count (Activity/Contribution level)
 * 4. Alphabetical (Stable tie-breaker)
 */
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
