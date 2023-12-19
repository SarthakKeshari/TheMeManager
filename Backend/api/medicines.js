const express = require("express");
const router = express.Router();
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Sarthak:"+process.env.DB_PASSWORD+"@cluster-the-me-manager.pohzhgt.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const db = client.db("DB-the-me-manager");
// const db = require("../dbConnection")
const collection = db.collection("Medicines")

router.get("/", (req, res) => {
  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = "mongodb+srv://Sarthak:"+process.env.DB_PASSWORD+"@cluster-the-me-manager.pohzhgt.mongodb.net/?retryWrites=true&w=majority";

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  const db = client.db("DB-the-me-manager");
  // const db = require("../dbConnection")
  const collection = db.collection("Medicines")
  try {
    collection.find()
    .toArray().then((results) => {
        res.send(results);
    }).catch((err) => {
      console.log(err)
    });

    // OR 
    
    // Not-recommended - lot of overhead is involved in looping
    // const response = []
    // const cursor = db.collection("Medicines").find()
    // await cursor.forEach((document) => {
    //   response.push(document);
    // });
    // res.send(response)
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

router.post("/", (req, res) => {
  try {
    collection.find({name: req.body.name}).toArray().then((result) => {
        if(result.length > 0) {
          res.status(200).send("Kindly Update. Data already exists")
        }
        else{
          collection.insertOne(req.body)
          res.status(200).send("Data Inserted")
        }
    })
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

router.put("/", (req, res) => {
  try {
    console.log(req.body)
    collection.find({name: req.body.name}).toArray().then((result) => {
        if(result.length > 0) {
          collection.updateOne({name: req.body.name},
            {$set: { mfd: req.body.mfd,
                     exp: req.body.exp
              }})
          res.status(200).send("Data Updated")
        }
        else{
          res.status(200).send("No Data found that matches the provided details")
        }
    })
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;