import { exec } from 'child_process';

let ora;

// Function to execute shell command and return as Promise
function execShellCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(`Error executing ${cmd}`, error);
        return reject(error);
      }
      resolve(stdout || stderr);
    });
  });
}

async function closeServices() {
  const spinner = ora('Closing services...').start();
  try {
    console.log('Attempting to close services on port 3000 and 3001');
    const result1 = await execShellCommand('lsof -i tcp:3000 | grep LISTEN | awk \'{print $2}\' | xargs kill -9');
    const result2 = await execShellCommand('lsof -i tcp:3001 | grep LISTEN | awk \'{print $2}\' | xargs kill -9');
    spinner.succeed('Services on ports 3000 and 3001 have been closed');
  } catch (error) {
    spinner.fail(`Error while closing services: ${error}`);
  }
}

async function main() {
  ora = (await import('ora')).default;
  await closeServices();
}

main();
