const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 7979 
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');


// middlware
app.use(cors())
app.use(express())

// 69-car
// 70oM5J90m6jkZB4C



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.njebycd.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

const serviceCollection = client.db('69-carDB').collection('69-car')


app.get('/services' , async (req, res)=>{
    const cursor = serviceCollection.find()
    const result = await cursor.toArray() 
    res.send(result)

})























    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



















app.get('/', (req,res)=>{
    res.send('our server is running')
})



app.listen(port, ()=>{
    console.log(`car doctor is douracche ${port}`)
})