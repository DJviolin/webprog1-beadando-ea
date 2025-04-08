import { spawn, spawnSync } from 'child_process';
import { Buffer } from 'node:buffer';
import fs from 'fs';
import unzipper from 'unzipper';
import { resolve } from 'path';
import { pipeline } from 'stream/promises';
import got from 'got';

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

async function downloadPHPWithProgress() {
  console.log('Letöltés elindult...');
  const downloadStream = got.stream(PHP_URL);
  const fileWriterStream = fs.createWriteStream(PHP_ZIP);
  let lastPercent = 0;
  downloadStream.on('downloadProgress', ({ transferred, total, percent }) => {
    const percentage = Math.floor(percent * 100);
    if (percentage !== lastPercent) {
      lastPercent = percentage;
      console.clear();
      console.log(`Letöltés: ${percentage}% (${transferred} / ${total || '??'} byte)`);
    }
  });
  await pipeline(downloadStream, fileWriterStream);
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
    await downloadPHPWithProgress();
    await unzipPHP();
    fs.unlinkSync(PHP_ZIP);
  }
  startPHPServer();
}

main();
