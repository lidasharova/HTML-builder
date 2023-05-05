const fs = require('fs');
const path = require('path');

//создаем новую папку
fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) throw err;
});

//очищаем папку
fs.readdir(
  path.join(__dirname, 'files-copy'),
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;
    else {
      files.forEach((file) => {
        fs.unlink(path.join(__dirname, 'files-copy', file.name), (err) => {
          if (err) throw err;
        });
      });
    }
  }
);

//копируем файлы
fs.readdir(
  path.join(__dirname, 'files'),
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;
    else {
      files.forEach((file) => {
        fs.copyFile(
          path.join(__dirname, 'files', file.name),
          path.join(__dirname, 'files-copy', file.name),
          (err) => {
            if (err) throw err;
          }
        );
      });
    }
  }
);
