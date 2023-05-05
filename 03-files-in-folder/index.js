const fs = require('fs');
const path = require('path');
const pathDir = path.join(__dirname, 'secret-folder');

fs.readdir(pathDir, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      if (file.isFile()) {
        let name = file.name.split('.')[0];
        let ext = file.name.toString().split('.')[1];

        const pathFile = path.join(pathDir, file.name);
        fs.promises.stat(pathFile).then((file) => {
          let size = (file.size / 1024).toFixed(3);
          console.log(`${name} - ${ext} - ${size}kb`);
        });
      }
    });
  }
});
