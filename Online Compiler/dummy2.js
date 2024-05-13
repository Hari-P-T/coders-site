const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/compile', (req, res) => {
    const { code } = req.body;

    let capturedOutput = '';
    const originalLog = console.log;
    console.log = (message) => {
        capturedOutput += message + '\n';
    };
    try {
        eval(code); // Execute the code
        console.log = originalLog; // Restore original console.log
        console.log("solution : " + capturedOutput); // Log the captured output
        res.status(200).send(capturedOutput); // Send the captured output as response
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
