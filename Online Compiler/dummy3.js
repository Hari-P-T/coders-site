const { exec } = require('child_process');
const fs = require('fs');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());


app.post('/compile', (req, res) => {
    const { code, extension } = req.body;
    const pythonFilePath = `./try${extension}`;

    let capturedOutput = '';
    const originalLog = console.log;

    console.log = (message) => {
        capturedOutput += message + '\n';
    };

    try {
        fs.writeFile(pythonFilePath, code, (writeError) => {
            if (writeError) {
                console.error('Error writing python file:', writeError);
                res.status(500).send('Internal Server Error');
                return;
            }

            exec(`python3 ${pythonFilePath}`, (runError, stdout, stderr) => {
                if (runError) {
                    console.error(`Execution failed: ${runError.message}`);
                    res.status(400).send(`Execution failed: ${runError.message}`);
                    cleanup();
                    return;
                }
                if (stderr) {
                    console.error(`Execution error: ${stderr}`);
                    res.status(400).send(`Execution error: ${stderr}`);
                    cleanup();
                    return;
                }
                console.log('Execution successful');
                console.log('Output:', stdout);
                res.status(200).send(stdout);
                cleanup();
            });
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send('Internal Server Error');
    } finally {
        console.log = originalLog; // Restore original console.log
        console.log("solution : " + capturedOutput); // Log the captured output
    }

    function cleanup() {
        fs.unlink(pythonFilePath, (err) => {
            if (err) {
                console.error('Error deleting python file:', err);
            }
        });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
