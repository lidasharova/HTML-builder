const fs = require('fs');
const path = require('path');
const pathDir = path.join(__dirname, 'styles');

let template = '';

//создаем новую папку project-dist
fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err;
  else {
    fs.mkdir(
      path.join(__dirname, 'project-dist', 'assets'),
      { recursive: true },
      (err) => {
        if (err) {
          throw err;
        } else {
          fs.readdir(
            path.join(__dirname, 'assets'),
            { withFileTypes: true },
            (err, files) => {
              if (err) throw err;
              files.forEach((file) => {
                if (file.isFile()) {
                  fs.copyFile(
                    path.join(__dirname, 'assets', file.name),
                    path.join(__dirname, 'project-dist', 'assets', file.name),
                    (err) => {
                      if (err) throw err;
                    }
                  );
                } else {
                  copyMkdir(
                    path.join(__dirname, 'assets', file.name),
                    path.join(__dirname, 'project-dist', 'assets', file.name)
                  );
                }
              });
            }
          );
        }
      }
    );
  }
});

//ф-ция копирования файлов и папок
function copyMkdir(fromDir, inDir) {
  fs.mkdir(inDir, { recursive: true }, () => {
    fs.readdir(fromDir, { withFileTypes: true }, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        const sourcePath = path.join(fromDir, file.name);
        const destPath = path.join(inDir, file.name);
        if (file.isFile()) {
          fs.copyFile(sourcePath, destPath, (err) => {
            if (err) throw err;
          });
        } else {
          copyMkdir(sourcePath, destPath);
        }
      });
    });
  });
}

//чтение и запись файла template.html в переменную;
const readableStream = fs.createReadStream(
  path.join(__dirname, 'template.html'),
  'utf-8'
);
readableStream.on('data', (data) => {
  template = data;
});

//заменa тегов на компоненты
fs.readdir(
  path.join(__dirname, 'components'),
  { withFileTypes: true },
  (err, files) => {
    files.forEach((file) => {
      if (file.isFile()) {
        let ext = file.name.toString().split('.')[1];
        if (ext === 'html') {
          let tag = file.name.split('.')[0];
          let name = file.name;
          fs.readFile(
            path.join(__dirname, 'components', name),
            'utf-8',
            (err, files) => {
              template = template.replace(`{{${tag}}}`, `${files}`);
              const WSHTML = fs.createWriteStream(
                path.join(__dirname, 'project-dist', 'index.html')
              );
              WSHTML.write(template);
              WSHTML.close();
            }
          );
        }
      }
    });
  }
);

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