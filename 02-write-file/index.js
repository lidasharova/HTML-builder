const { stdin: input, stdout: output } = require('node:process');
const fs = require('fs');
const path = require('path');
const readline = require('node:readline/promises');

const pathFile = path.join(__dirname, 'new.txt');
const WS = fs.createWriteStream(pathFile, 'utf-8');
const RL = readline.createInterface({ input, output });

RL.write('Привет! Как твои дела? :)\n');
RL.on('line', (answer) => {
  if (answer !== 'exit') {
    WS.write(`${answer}\n`);
  } else {
    RL.close();
  }
});

RL.on('SIGINT', () => {
  RL.close();
});

RL.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    RL.close();
  }
});

process.on('exit', () => {
  console.log('\nВсе будет отлично! Ты только не опускай руки!))');
});