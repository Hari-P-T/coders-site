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

    if (extension === ".java") {
        const javaFilePath = `./HelloWorld${extension}`;
        let capturedOutput = '';
        const originalLog = console.log;

        console.log = (message) => {
            capturedOutput += message + '\n';
        };

        try {
            fs.writeFile(javaFilePath, code, (writeError) => {
                if (writeError) {
                    console.error('Error writing Java file:', writeError);
                    res.status(500).send('Internal Server Error');
                    return;
                }

                exec(`javac ${javaFilePath}`, (compileError, stdout, stderr) => {
                    if (compileError) {
                        console.error(`Compilation failed: ${compileError.message}`);
                        res.status(400).send(`Compilation failed: ${compileError.message}`);
                        return;
                    }
                    if (stderr) {
                        console.error(`Compilation error: ${stderr}`);
                        res.status(400).send(`Compilation error: ${stderr}`);
                        return;
                    }
                    console.log('Compilation successful');

                    exec(`java ${javaFilePath}`, (runError, stdout, stderr) => {
                        if (runError) {
                            console.error(`Execution failed: ${runError.message}`);
                            res.status(400).send(`Execution failed: ${runError.message}`);
                            return;
                        }
                        if (stderr) {
                            console.error(`Execution error: ${stderr}`);
                            res.status(400).send(`Execution error: ${stderr}`);
                            return;
                        }
                        console.log('Execution successful');
                        console.log('Output:', stdout);
                        res.status(200).send(stdout);
                    });
                });
            });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send('Internal Server Error');
        } finally {
            console.log = originalLog;
            console.log("solution : " + capturedOutput);
        }
    } else if (extension === ".js") {
        let capturedOutput = '';
        const originalLog = console.log;
        console.log = (message) => {
            capturedOutput += message + '\n';
        };
        try {
            eval(code);
            console.log = originalLog;
            console.log("solution : " + capturedOutput);
            res.status(200).send(capturedOutput);
        } catch (error) {
            
            console.error("Error:", error);
            res.status(500).send('Internal Server Error');
        }
    }
    else if(extension==".cpp"){
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
    }

    else if(extension==".py"){
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
            console.log = originalLog;
            console.log("solution : " + capturedOutput);
        }
    
        function cleanup() {
            fs.unlink(pythonFilePath, (err) => {
                if (err) {
                    console.error('Error deleting python file:', err);
                }
            });
        }
    }
    else {
        res.status(400).send('Unsupported file extension');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
