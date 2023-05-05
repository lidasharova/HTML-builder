const { stdin: input, stdout: output } = require('node:process');
const fs = require('fs');
const path = require('path');
const readline = require('node:readline/promises');

//путь к файлу
const pathFile = path.join(__dirname, 'new.txt');
//поток на запись/ создание файла
const WS = fs.createWriteStream(pathFile, 'utf-8');
//поток на чтение
// const RS = fs.createReadStream(pathFile);
//создание интерфейса для чтения данных из потока Readable
const RL = readline.createInterface({ input, output });

//предлагаем записать текст
RL.write('Привет! Как твои дела? :)\n');

RL.on('line', (answer) => {
  if (answer !== 'exit') {
    WS.write(`${answer}\n`);
  } else {
    RL.close();
  }
});

//событие на клавиши Ctrl+C
RL.on('SIGINT', () => {
  RL.close();
});

//событие на ввод exit
RL.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    RL.close();
  }
});

//прощальное сообщение
process.on('exit', () => {
  console.log('\nВсе будет отлично! Ты только не опускай руки!))');
});
