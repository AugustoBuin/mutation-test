const { exec } = require('child_process');
const path = require('path');

// Absolute path to the report
const reportPath = path.join(__dirname, 'reports', 'mutation', 'mutation.html');

// Detect OS and use appropriate open command
const platform = process.platform;
const command = platform === 'win32'
    ? `start "" "${reportPath}"`
    : platform === 'darwin'
        ? `open "${reportPath}"`
        : `xdg-open "${reportPath}"`;

exec(command, (err) => {
    if (err) {
        console.error('Failed to open report:', err);
    } else {
        console.log('Opening mutation report...');
    }
});
