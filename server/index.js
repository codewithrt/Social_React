const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const multer = require("multer");
const path = require("path");
const cors = require('cors');
app.use(cors());
require("dotenv").config();

const port = process.env.PORT || 8800

const uri = process.env.MONGO_URL
// console.log(process.env.MONGO_URL)
// ur1 = process.env.MONGO_URL;
// console.log(ur1);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
  
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("Vibe").command({ ping: 1 });
//     const db = client.db('Vibe');
//     const collection = db.collection('Users');
//     const first = await collection.findOne();
//     console.log(first);
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
  
//   // finally {
//   //   // Ensures that the client will close when you finish/error
//   //   await client.close();
//   // }
// }
// run().catch(console.dir);


// dotenv.config();
mongoose.set('strictQuery', false);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

var path3 = (path.join(__dirname, "public/images"));
//  
app.use('/images', express.static(path.join(__dirname, 'public/images')))
//middleware
app.use(express.json());
app.use(helmet()); 
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file,cb)=>{
    cb(null, req.body.name);
  }
})
const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res)=>{
  try {
    return res.status(200).json("File uploaded successfully.");
  } catch (err) {
      console.log(err);
  }
})

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(port, ()=>{
    console.log("Backend server is running.")
});

