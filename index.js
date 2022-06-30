const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

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

        app.get('/task', async (req, res) => {
            // const users = await userCollection.find().toArray();
            res.send("kaj krtese................");
        });

        // app.put('/user/admin/:email', async (req, res) => {
        //     const email = req.params.email;
        //     const filter = { email: email };
        //     const updateDoc = {
        //         $set: { role: 'admin' },
        //     };
        //     const result = await userCollection.updateOne(filter, updateDoc);
        //     res.send(result);
        // });

        app.post('/task', async (req, res) => {
            const data = req.body;
            const result = await tasksCollection.insertOne(data);
            res.send(result);
        })

        // app.delete('/tool/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const result = await toolsCollection.deleteOne(query);
        //     res.send(result);
        // })

        // app.get('/tool/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const result = await toolsCollection.findOne(query);
        //     res.send(result);
        // })

    }
    finally {

    }
}

run().catch(console.dir)

// app.get('/task', async (req, res) => {
//     // const users = await userCollection.find().toArray();
//     res.send("kaj krtese");
// });

app.get('/', (req, res) => {
    res.send('Server working correctly');
})

app.listen(port, () => console.log('server working correctly', port));