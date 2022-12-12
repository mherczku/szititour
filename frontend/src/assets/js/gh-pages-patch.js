const fs = require('fs');

fs.copyFile('dist/szititour/index.html', 'dist/szititour/404.html', (err) => {
  if (err) {
    console.error('index.html -> 404.html copy failed:');
    throw err;
  }
});
