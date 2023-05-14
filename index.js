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


// collection  
const serviceCollection = client.db('69-carDB').collection('69-car')
const bookingCollection = client.db('69-carDB').collection('bookings')
// ........................................ 



// JWT 
app.post('/jwt', (req, res)=>{
  const user = req.body 
  console.log(user)
  // 3ta value, 1.ami kar jnne access token baanacchi, 2.access token 3. accesss token kotokkkhn thakbe
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET , {expiresIn : '1h'})
  res.send({token})
})











// homepage services data load 
app.get('/services' , async (req, res)=>{
    const cursor = serviceCollection.find()
    const result = await cursor.toArray() 
    res.send(result)
})
//.......................................



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
//.....................................




// bookings /checkout
app.get('/bookings', async(req, res)=>{
  console.log(req.query.email)
  let query = {}
  if(req.query?.email){
    query = {email : req.query.email} 
  }
  const result = await bookingCollection.find(query).toArray()
  res.send(result)
})
//.................................




// to save the data we recived from the ui 
 app.post('/bookings', async(req, res)=>{
  const booking = req.body ;
  console.log(booking)
  const result = await bookingCollection.insertOne(booking)
  res.send(result)
})
//................................


// update  information 
// by gettting customer information 
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
// ..................................


// for delete the data  we have on our ui 
// if any customer want to delete some of their order 
 app.delete('/bookings/:id', async(req, res)=>{
  const id = req.params.id 
  const query = { _id: new ObjectId(id)}
  const result = await bookingCollection.deleteOne(query)
  res.send(result)
 })
// ..................................


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// basic setup
app.get('/', (req,res)=>{
    res.send('our server is running')
})



app.listen(port, ()=>{
    console.log(`car doctor is douracche ${port}`)
})