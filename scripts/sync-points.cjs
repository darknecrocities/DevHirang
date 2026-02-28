const fs = require('fs');
const path = require('path');

const DEVELOPERS_PATH = path.join(__dirname, '../src/data/developers.json');

// --- SCORING LOGIC (Mirrored from ranking.js and badgeUtils.js) ---

const BADGE_CRITERIA = [
    {
        id: 'world_level',
        points: 20000,
        check: (dev) =>
            (dev.certifications?.length || 0) >= 40 &&
            dev.stats.hackathons_won >= 10 &&
            dev.stats.projects_contributed >= 100
    },
    {
        id: 'admin',
        points: 10000,
        check: (dev) => dev.isAdmin
    },
    {
        id: 'hackathon_hero',
        points: 15000,
        check: (dev) => dev.stats.hackathons_won > 5
    },
    {
        id: 'product_visionary',
        points: 10000,
        check: (dev) => dev.achievements.some(a => a.type === 'startup')
    },
    {
        id: 'elite_contributor',
        points: 10000,
        check: (dev) => dev.stats.projects_contributed > 50
    },
    {
        id: 'community_pillar',
        points: 8000,
        check: (dev) => dev.achievements.filter(a => a.type === 'community').length >= 3
    },
    {
        id: 'legacy_builder',
        points: 7000,
        check: (dev) => (dev.stats.projects_contributed || 0) >= 20 || (dev.stats.github_contributions || 0) >= 500
    },
    {
        id: 'rising_star',
        points: 5000,
        check: (dev) => (dev.stats.projects_contributed || 0) >= 5
    }
];

const calculateScore = (developer) => {
    let impactScore = 0;
    let trustScore = 0;

    // 0. Badge Points
    const badgePoints = BADGE_CRITERIA.reduce((sum, badge) => {
        return sum + (badge.check(developer) ? badge.points : 0);
    }, 0);
    impactScore += badgePoints;

    // 1. Contributions
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

    // 2. Projects
    impactScore += (developer.stats?.projects_contributed || 0) * 20;

    // 3. Certifications
    trustScore += (developer.certifications?.length || 0) * 150;

    // 4. Bonus Stats
    impactScore += (developer.stats?.hackathons_won || 0) * 50;
    impactScore += (developer.stats?.github_contributions || 0) * 50;

    return impactScore + trustScore;
};

// --- SYNC PROCESS ---

function sync() {
    console.log('🔄 Synchronizing Developer Points...');

    try {
        const rawData = fs.readFileSync(DEVELOPERS_PATH, 'utf8');
        const developers = JSON.parse(rawData);

        const updatedDevelopers = developers.map(dev => {
            const newPoints = calculateScore(dev);
            if (dev.points !== newPoints) {
                console.log(`✨ Updated ${dev.name}: ${dev.points} -> ${newPoints}`);
            }
            return {
                ...dev,
                points: newPoints
            };
        });

        fs.writeFileSync(DEVELOPERS_PATH, JSON.stringify(updatedDevelopers, null, 4), 'utf8');
        console.log('✅ Synchronization complete!');
    } catch (error) {
        console.error('❌ Error synchronizing points:', error.message);
        process.exit(1);
    }
}

sync();
