const express = require("express");
const app = express();
const medicine = require("./api/medicines");
// const db = require("./dbConnection");
require('dotenv').config();

app.use(express.json({ extended: false }));
// console.log(db.collection("Medicines").insertOne({ item: "tea", qty: 10 } ))

app.use("/api/medicine", medicine);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));