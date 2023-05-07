const fs = require('fs');
const path = require('path');
const pathDir = path.join(__dirname, 'styles');

let template;

//создаем новую папку project-dist
fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err;
});

//создаем новую папку assets
fs.mkdir(
  path.join(__dirname, 'project-dist', 'assets'),
  { recursive: true },
  (err) => {
    if (err) throw err;
  }
);
//создаем новые папки внутри assets
fs.mkdir(
  path.join(__dirname, 'project-dist', 'assets', 'fonts'),
  { recursive: true },
  (err) => {
    if (err) throw err;
  }
);
fs.mkdir(
  path.join(__dirname, 'project-dist', 'assets', 'img'),
  { recursive: true },
  (err) => {
    if (err) throw err;
  }
);
fs.mkdir(
  path.join(__dirname, 'project-dist', 'assets', 'svg'),
  { recursive: true },
  (err) => {
    if (err) throw err;
  }
);

//копируем папку 'fonts'
fs.readdir(
  path.join(__dirname, 'assets', 'fonts'),
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;
    else {
      files.forEach((file) => {
        fs.copyFile(
          path.join(__dirname, 'assets', 'fonts', file.name),
          path.join(__dirname, 'project-dist', 'assets', 'fonts', file.name),
          (err) => {
            if (err) throw err;
          }
        );
      });
    }
  }
);

//копируем папку 'img'
fs.readdir(
  path.join(__dirname, 'assets', 'img'),
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;
    else {
      files.forEach((file) => {
        fs.copyFile(
          path.join(__dirname, 'assets', 'img', file.name),
          path.join(__dirname, 'project-dist', 'assets', 'img', file.name),
          (err) => {
            if (err) throw err;
          }
        );
      });
    }
  }
);

//копируем папку 'svg'
fs.readdir(
  path.join(__dirname, 'assets', 'svg'),
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;
    else {
      files.forEach((file) => {
        fs.copyFile(
          path.join(__dirname, 'assets', 'svg', file.name),
          path.join(__dirname, 'project-dist', 'assets', 'svg', file.name),
          (err) => {
            if (err) throw err;
          }
        );
      });
    }
  }
);

//чтение и запись файла template.html в переменную;
const readableStream = fs.createReadStream(
  path.join(__dirname, 'template.html'),
  'utf-8'
);
readableStream.on('data', (data) => {
  template = data;
  // console.log(template);
});

//создаем и запись в файл index.html
const WRSHTML = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'index.html'),
  'utf-8'
);
const RSHTML = fs.createReadStream(
  path.join(__dirname, 'project-dist', 'index.html'),
  'utf-8'
);
RSHTML.on('data', (template) => {
  WRSHTML.write(template);
});

//файл стилей
const pathNewFile = path.join(__dirname, 'project-dist', 'style.css');
//создаем новый файл со стилями в папке project-dist
const WS = fs.createWriteStream(pathNewFile, 'utf-8');
fs.readdir(pathDir, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      if (file.isFile() && file.name.toString().split('.')[1] == 'css') {
        const RS = fs.createReadStream(
          path.join(__dirname, 'styles', file.name),
          'utf-8'
        );
        RS.on('data', (data) => {
          WS.write(data);
        });
      }
    });
  }
});
