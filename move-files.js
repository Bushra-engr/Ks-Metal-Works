const fs = require('fs');
const path = require('path');

const dest = '_legacy';
if (!fs.existsSync(dest)) fs.mkdirSync(dest);

const files = fs.readdirSync('.').filter(f => 
    (f.endsWith('.html') || f.endsWith('.css') || f.endsWith('.js') || f.endsWith('.bat')) 
    && f !== 'move-files.js'
);

console.log('Moving files:', files);

files.forEach(f => {
    try {
        fs.renameSync(f, path.join(dest, f));
        console.log(`Moved ${f}`);
    } catch (e) {
        console.error(`Failed to move ${f}: ${e.message}`);
    }
});
