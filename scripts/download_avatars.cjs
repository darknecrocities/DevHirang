const fs = require('fs');
const https = require('https');
const path = require('path');
const { URL } = require('url');

const developersPath = path.join(__dirname, '../src/data/developers.json');
const assetsDir = path.join(__dirname, '../public/dev_img');

// Ensure assets directory exists
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

async function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        const request = https.get(url, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                // Handle redirects
                downloadImage(res.headers.location, filename).then(resolve).catch(reject);
                return;
            }

            if (res.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
                return;
            }

            const filePath = path.join(assetsDir, filename);
            const fileStream = fs.createWriteStream(filePath);
            res.pipe(fileStream);

            fileStream.on('finish', () => {
                fileStream.close();
                resolve(filePath);
            });

            fileStream.on('error', (err) => {
                fs.unlink(filePath, () => reject(err));
            });
        });

        request.on('error', (err) => {
            reject(err);
        });

        request.on('timeout', () => {
            request.destroy();
            reject(new Error(`Timeout downloading ${url}`));
        });

        request.setTimeout(10000); // 10 seconds timeout
    });
}

async function run() {
    let developers;
    try {
        developers = JSON.parse(fs.readFileSync(developersPath, 'utf8'));
    } catch (err) {
        console.error(`Error reading developers.json: ${err.message}`);
        return;
    }

    let updatedCount = 0;
    let failedCount = 0;

    for (const dev of developers) {
        if (dev.avatar && dev.avatar.startsWith('http')) {
            let extension = '';
            try {
                const urlObj = new URL(dev.avatar);
                const pathname = urlObj.pathname;
                const ext = path.extname(pathname);
                if (ext && ext.length > 1) {
                    extension = ext.split(/[?#]/)[0];
                }
            } catch (e) {
                // Ignore error
            }

            if (!extension) {
                extension = '.jpg'; // Default to .jpg if no extension found
            }

            const cleanName = dev.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            const filename = `${dev.id}_${cleanName}${extension}`;

            console.log(`Downloading avatar for ${dev.name}...`);
            try {
                await downloadImage(dev.avatar, filename);
                // Use absolute path from src for Vite to handle correctly if needed, 
                // but usually relative to the JSON file or root is better.
                // Given the requirement, I'll store it as /src/assets/dev_img/filename
                dev.avatar = `/dev_img/${filename}`;
                updatedCount++;
            } catch (err) {
                console.error(`Failed to download avatar for ${dev.name}: ${err.message}`);
                failedCount++;
            }
        }
    }

    try {
        fs.writeFileSync(developersPath, JSON.stringify(developers, null, 4), 'utf8');
        console.log(`\nFinished! Updated ${updatedCount} avatars. ${failedCount} failed.`);
    } catch (err) {
        console.error(`Error writing back to developers.json: ${err.message}`);
    }
}

run();
