import { spawn, spawnSync } from 'child_process';
import { Buffer } from 'node:buffer';
import fs from 'fs';
import unzipper from 'unzipper';
import { resolve } from 'path';

const PHP_EXEC = resolve(import.meta.dirname, './.php/php.exe');
const PHP_URL = 'https://windows.php.net/downloads/releases/php-8.4.5-Win32-vs17-x64.zip';
const PHP_ZIP = resolve(import.meta.dirname, './.php/php.zip');
const PHP_DIR = resolve(import.meta.dirname, './.php');

function checkPHPVersion() {
  try {
    const result = spawnSync(`"${PHP_EXEC}"`, ['--version'], {
      encoding: 'utf8',
      shell: true,
    });
    return result.stdout.includes('The PHP Group');
  } catch {
    return false;
  }
}

function ensurePHPDir() {
  if (!fs.existsSync(PHP_DIR)) {
    fs.mkdirSync(PHP_DIR, { recursive: true });
  }
}

async function downloadPHP() {
  console.log('PHP nem található vagy hibás verzió. Letöltés indul...');

  const response = await fetch(PHP_URL);
  if (!response.ok) {
    throw new Error(`Sikertelen letöltés: HTTP ${response.status} ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const data = Buffer.from(arrayBuffer);
  fs.writeFileSync(PHP_ZIP, data);

  const expectedLength = Number(response.headers.get('content-length'));
  const actualLength = data.length;

  if (expectedLength && actualLength < expectedLength * 0.95) {
    throw new Error(`Letöltés túl rövid: ${actualLength} / ${expectedLength} byte`);
  }
}

function unzipPHP() {
  return fs.createReadStream(PHP_ZIP)
    .pipe(unzipper.Extract({ path: PHP_DIR }))
    .promise();
}

function startPHPServer() {
  console.log('PHP szerver indítása...');
  spawn(PHP_EXEC, ['-S', 'localhost:8080'], { stdio: 'inherit' });
}

async function main() {
  ensurePHPDir();
  if (!checkPHPVersion()) {
    await downloadPHP();
    await unzipPHP();
    fs.unlinkSync(PHP_ZIP);
  }
  startPHPServer();
}

main();
