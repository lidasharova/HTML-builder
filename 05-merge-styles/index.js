const fs = require('fs');
const path = require('path');
const pathDir = path.join(__dirname, 'styles');
const pathNewFile = path.join(__dirname, 'project-dist', 'bundle.css');


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
