const exec = require('child_process').exec;
const chokidar = require('chokidar');

const watch = Object(require('./package').watch);

Object.keys(watch).forEach((script) => {
  const tree = watch[script];

  chokidar.watch(tree, { ignoreInitial: true }).on('all', () => {
    exec(`npm run ${script}`, (err, stdout) => {
      if (!err) {
        console.log(stdout);
      }
    });
  });
});
