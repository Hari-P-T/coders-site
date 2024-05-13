const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/compile', (req, res) => {
  const { code, extension } = req.body;
  console.log(extension);
  const fileName = 'new' + extension;
  const filePath = `./my-compiler/src/${fileName}`;
  console.log(filePath);
  const compiledFileName = fileName.replace(/\..*/, '');

  fs.writeFile(filePath, code, (err) => {
    if (err) {
      console.error('Error writing code to file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    exec(`g++ ${filePath} -o ${compiledFileName}`, (compileError, compileStdout, compileStderr) => {
      if (compileError || compileStderr) {
        console.error('Compilation Error:', compileError || compileStderr);
        res.status(400).send(`Compilation Error: ${compileError || compileStderr}`);
        cleanUpFiles(filePath, compiledFileName);
        return;
      }



        exec(`./${compiledFileName}`, (runError, runStdout, runStderr) => {
          if (runError || runStderr) {
            console.error('Run Error:', runError || runStderr);
            res.status(400).send(`Run Error: ${runError || runStderr}`);
          } else {
            res.status(200).send(runStdout);
          }
        });

    });
  });
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
