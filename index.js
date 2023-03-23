const express = require('express');
const cors = require('cors');
const app = express();
const port =  process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://tourApp:fUKwMZ1oXALKJ1tn@cluster0.spurzgo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const dbCollection = client.db("tourApp").collection("packages");
        //  read data
        app.get('/packages', async(req, res)=>{
            const query = {};
            const cursor = dbCollection.find(query);
            const pack = await cursor.toArray();
            res.send(pack);
        } )
        // dynamic route create api
        app.get('/packages/:id', async(req, res)=>{
            const id = req.params.id;
            const query = { _id: new ObjectId(id)};
            const result = await dbCollection.findOne(query);
            res.send(result);
        } )
        // search api
        app.get('/search/:name', async(req, res)=>{
            let regex = new RegExp(req.params.name, "i");
            let result = await dbCollection.find({name:regex}).toArray();
            console.log(result);
            res.send(result);
        })



    }
    finally{

    }

}



app.get('/', (req, res)=>{
    res.send(" hi from tour app");
})

app.listen(port, ()=>{
    console.log(`listen from port ${port}`);
})

run().catch(err => console.log(err));