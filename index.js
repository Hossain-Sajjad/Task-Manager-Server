const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.avl0z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log('uri:  ', uri, 'client', client)

async function run() {
    try {
        await client.connect();
        const tasksCollection = client.db('express').collection('task');
        const completedTaskCollection = client.db('express').collection('completed');

        app.get('/task', async (req, res) => {
            const tasks = await tasksCollection.find().toArray();
            res.send(tasks);
        });
        app.get('/completedtask', async (req, res) => {
            const tasks = await completedTaskCollection.find().toArray();
            res.send(tasks);
        });

        app.post('/task', async (req, res) => {
            const data = req.body;
            const result = await tasksCollection.insertOne(data);
            res.send(result);
        })

        app.post('/completedtask', async (req, res) => {
            const data = req.body;
            const result = await completedTaskCollection.insertOne(data);
            res.send(result);
        })

        app.delete('/task/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await tasksCollection.deleteOne(query);
            res.send(result);
        })

        app.put('/task/:id', async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: ObjectId(id) };
            console.log(filter, data, id)
            const options = { upsert: true };
            const updateDoc = {
                $set: data,
            };
            const result = await tasksCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        });

    }
    finally {

    }
}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Server working correctly');
})

app.listen(port, () => console.log('server working correctly', port));