
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 4000;

// const uri = "mongodb+srv://e1haript:Rspwc10540@nem.moc8h6q.mongodb.net/?retryWrites=true&w=majority&appName=NEM";
const uri = "mongodb://localhost:27017";

async function getUserByEmail(email) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const database = client.db('CodingSite');
        const usersCollection = database.collection('users');
        const user = await usersCollection.findOne({ email });

        return user;
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    } finally {
        await client.close();
    }
}

async function updateCompletedProblems(email, problemId, difficulty) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const database = client.db('CodingSite');
        const usersCollection = database.collection('users');

        // Update the completed problems array
        const result = await usersCollection.updateOne(
            { email },
            { $addToSet: { completed: problemId }, $inc: { [difficulty]: 1 } } // Add problemId to completed array if not already present
        );

        console.log(`Updated ${result.modifiedCount} document.`);
    } catch (error) {
        console.error('Error updating completed problems:', error);
        throw error;
    } finally {
        await client.close();
    }
}

app.use(express.json());
app.use(cors());

app.post('/api/insertUser', async (req, res) => {
    try {
        const { email } = req.body;

        const document = { email, completed: [], easy: 0, medium: 0, hard: 0 };

        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        try {
            await client.connect();

            const database = client.db('CodingSite');
            const usersCollection = database.collection('users');
            const result = await usersCollection.insertOne(document);

            console.log(`Inserted ${result.insertedCount} document.`);

            res.status(201).json({ message: 'User inserted successfully.' });
        } catch (error) {
            console.error('Error inserting user:', error);
            res.status(500).json({ error: 'Internal server error.' });
        } finally {
            await client.close();
        }
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


app.get('/api/getUserByEmail/:email', async (req, res) => {
    try {
        const { email } = req.params;

        const user = await getUserByEmail(email);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (error) {
        console.error('Error getting user by email:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.post('/api/updateCompletedProblems', async (req, res) => {
    try {
        const { email, problemId , difficulty} = req.body;

        await updateCompletedProblems(email, problemId, difficulty);

        res.status(200).json({ message: 'Completed problems array updated successfully.' });
    } catch (error) {
        console.error('Error updating completed problems:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});








// Add route to increase count by 1 for a specific email ID
app.post('/api/incrementCount', async (req, res) => {
    try {
        const { email } = req.body;
        console.log("recieved : "+email)

        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        try {
            await client.connect();

            const database = client.db('CodingSite');
            const leaderboardCollection = database.collection('leaderboard');

            // Find the document with the given email
            const query = { email };
            const update = { $inc: { count: 1 } }; // Increment the count by 1
            const options = { returnOriginal: false };
            const result = await leaderboardCollection.findOneAndUpdate(query, update, options);

            if (result.value) {
                res.status(200).json({ message: 'Count incremented successfully.' });
            } else {
                res.status(404).json({ error: 'Email not found.' });
            }
        } catch (error) {
            console.error('Error incrementing count:', error);
            res.status(500).json({ error: 'Internal server error.' });
        } finally {
            await client.close();
        }
    } catch (error) {
        console.error('Error incrementing count:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});






// Add route to insert a new entity
app.post('/api/insertEntity', async (req, res) => {
    try {
        const { email, count, name } = req.body;

        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        try {
            await client.connect();

            const database = client.db('CodingSite');
            const leaderboardCollection = database.collection('leaderboard');

            // Create a new entity document
            const newEntity = { email, count, name };

            // Insert the new entity document into the leaderboard collection
            const result = await leaderboardCollection.insertOne(newEntity);

            console.log(`Inserted ${result.insertedCount} document.`);

            res.status(201).json({ message: 'Entity inserted successfully.' });
        } catch (error) {
            console.error('Error inserting entity:', error);
            res.status(500).json({ error: 'Internal server error.' });
        } finally {
            await client.close();
        }
    } catch (error) {
        console.error('Error inserting entity:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});










async function getLeaderboardSorted() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const database = client.db('CodingSite');
        const leaderboardCollection = database.collection('leaderboard');
        const leaderboard = await leaderboardCollection.find().sort({ count: -1 }).toArray();

        return leaderboard;
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        throw error;
    } finally {
        await client.close();
    }
}

// Update route to serve sorted leaderboard data
app.get('/api/leaderboard', async (req, res) => {
    try {
        const leaderboard = await getLeaderboardSorted();
        res.status(200).json(leaderboard);
    } catch (error) {
        console.error('Error getting leaderboard:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});






app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
