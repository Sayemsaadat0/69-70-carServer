const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const app = express()
const port = process.env.PORT || 7979 
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// middlware
app.use(cors())
app.use(express.json())

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
const bookingCollection = client.db('69-carDB').collection('bookings')

// homepage services data load 
app.get('/services' , async (req, res)=>{
    const cursor = serviceCollection.find()
    const result = await cursor.toArray() 
    res.send(result)

})

// specific data load for checkout page
// to show data to the ui we use 'APP.GET'
app.get('/services/:id', async(req , res)=>{
  const id = req.params.id 
  const query = { _id: new ObjectId(id) }

  const options = {
    // Include only the `title` and `imdb` fields in the returned document
    projection: { title: 1, service_id: 1 , price: 1 , img: 1},
  };

  const result = await serviceCollection.findOne(query , options)
  res.send(result)
})


// bookings 

app.get('/bookings', async(req, res)=>{
  console.log(req.query.email)
  let query = {}
  if(req.query?.email){
    query = {email : req.query.email} 
  }
  const result = await bookingCollection.find(query).toArray()
  res.send(result)
})


// to save the data we recived from the ui 
 app.post('/bookings', async(req, res)=>{
  const booking = req.body ;
  console.log(booking)
  const result = await bookingCollection.insertOne(booking)
  res.send(result)
  
})
// update 
app.patch('/bookings/:id', async(req, res)=>{
   const id = req.params.id 
   const filter = { _id: new ObjectId(id)}
   const updateBooking = req.body
   const updateDoc = {
    $set: {
    status : updateBooking.status
    },
  };

   console.log(updateBooking)
   const result = await bookingCollection.updateOne(filter,updateDoc)
   res.send(result)
})

// for delete the data  we have on our ui 
 app.delete('/bookings/:id', async(req, res)=>{
  const id = req.params.id 
  const query = { _id: new ObjectId(id)}
  const result = await bookingCollection.deleteOne(query)
  res.send(result)
 })

/* app.post('/bookings', async(req,res)=>{
const booking = req.body 
console.log(booking)
})

 */


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