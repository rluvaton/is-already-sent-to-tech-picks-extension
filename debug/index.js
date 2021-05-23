#!/usr/bin/env node

const path = require('path');
const puppeteer = require('puppeteer');

const run = async () => {
    // Path to extension folder
    const paths = path.join(__dirname, '..', 'dist');
    try {
        console.log('==>Open Browser');
        const browser = await puppeteer.launch({
            headless: false,
            // Pass the options to install the extension
            args: [
                `--disable-extensions-except=${paths}`,
                `--load-extension=${paths}`,
                // `--window-size=800,600`
            ]
        });

        console.log('==>Navigate to Extension');
        const page = await browser.newPage();
        // Navigate to extension page
        await page.goto('https://google.com');
        // Take a screenshot of the extension page
    }
    catch (err) {
        console.error(err);
    }
};

run();
