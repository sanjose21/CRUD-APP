const { spawn } = require('child_process');
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

let ora;

// Function to execute shell command and return as Promise
async function checkDatabaseConnection() {
    let isConnected = false;
    const spinner = ora('Connecting to DB...').start();

    while (!isConnected) {
        const client = new Client({
            host: process.env.DBHOST,
            port: 5432,
            user: process.env.DATABASEUSER,
            password: process.env.DATABASEPASSWORD,
            database: process.env.DATABASENAME,
            connectTimeoutMS: 5000,
        });

        try {
            await client.connect();
            isConnected = true;
            spinner.succeed("DB is ready.");
        } catch (error) {
            spinner.text = "DB is not ready yet, retrying...";
            console.error("DB connection error: ", error);
            await new Promise(resolve => setTimeout(resolve, 5000));
        } finally {
            await client.end();
        }
    }
}

async function main() {
    try {
        // import ora dynamically
        ora = (await import('ora')).default;

        // Create .env file with environment variables
        const envFileContent = `
DATABASENAME=inventory
DATABASEUSER=admin
DATABASEPASSWORD=password
APIPORT=3000
DBHOST=localhost
UIPORT=3001
        `;

        fs.writeFileSync('./.env', envFileContent);

        require('dotenv').config();

        // Start Docker service
        const spinnerDocker = ora('Starting Docker service...').start();
        const dockerCompose = spawn('docker-compose', ['up', '-d']);
        dockerCompose.stdout.on('data', (data) => {
            console.log(`Docker Compose: ${data}`);
            spinnerDocker.succeed('Docker service started');
        });
        dockerCompose.stderr.on('data', (data) => {
            console.error(`Docker Compose Error: ${data}`);
            spinnerDocker.fail('Failed to start Docker service');
        });

        // Check if the DB is ready
        await checkDatabaseConnection();

        // Start API server
        const spinnerApi = ora('Starting API server...').start();
        const apiServer = spawn('npm', ['start'], { cwd: './api' });
        apiServer.stdout.on('data', (data) => {
            console.log(`API server: ${data}`);
            spinnerApi.succeed('API server started');
        });
        apiServer.stderr.on('data', (data) => {
            console.error(`API Server Error: ${data}`);
            spinnerApi.fail('Failed to start API server');
        });

        // Wait a bit for API server to initialize
        await new Promise((resolve) => setTimeout(resolve, 5000));

        // Start UI server
        const spinnerUi = ora('Starting UI server...').start();
        const uiServer = spawn('npm', ['run', 'dev'], { cwd: './ui' });
        uiServer.stdout.on('data', (data) => {
            console.log(`UI server: ${data}`);
            spinnerUi.succeed('UI server started');
        });
        uiServer.stderr.on('data', (data) => {
            console.error(`UI Server Error: ${data}`);
            spinnerUi.fail('Failed to start UI server');
        });
    } catch (err) {
        console.error('Error in main: ', err);
    }
}

main();
