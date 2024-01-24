const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserexpModel = require("./models/userexp.js");
const UserreportModel = require("./models/userreport.js");
const ProductModel = require("./models/products.js");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://VinayagaMoorthy27:Vinayaga2709@vinayagadb.o991msv.mongodb.net/Mern_Project?retryWrites=true&w=majority");

// -----------------------------------------Experience--------------------------------------

app.get("/getUserexp", (req, res)=>{
  UserexpModel.find().
  then(e => res.json(e))
  .catch(err => res.json(err))
});
app.post("/createExperience", (req, res)=>{
  UserexpModel.create(req.body)
  .then(e=>res.json(e))
  .catch(err=>res.json(err))
});
app.delete("/deleteExp/:id", (req, res)=>{
  const id = req.params.id;
  UserexpModel.findByIdAndDelete({_id: id})
  .then(e=>res.json(e))
  .catch(err=>res.json(err))
})

// -----------------------------------------Report--------------------------------------

app.get("/getUserreport", (req, res)=>{
  UserreportModel.find().
  then(e => res.json(e))
  .catch(err => res.json(err))
});
app.delete("/deleteReport/:id", (req, res)=>{
  const id = req.params.id;
  UserreportModel.findByIdAndDelete({_id: id})
  .then(e=>res.json(e))
  .catch(err=>res.json(err))
})
app.post("/createReport", (req, res)=>{
  UserreportModel.create(req.body)
  .then(e=>res.json(e))
  .catch(err=>res.json(err))
});

// -----------------------------------------Product list--------------------------------------

app.get("/getProduct", (req, res)=>{
  ProductModel.find().
  then(e => res.json(e))
  .catch(err => res.json(err))
});
app.post("/createProduct", (req, res)=>{
  ProductModel.create(req.body)
  .then(e=>res.json(e))
  .catch(err=>res.json(err))
});
app.delete("/deleteProduct/:id", (req, res)=>{
  const id = req.params.id;
  ProductModel.findByIdAndDelete({_id: id})
  .then(e=>res.json(e))
  .catch(err=>res.json(err))
})
app.put("/updateProduct/:id", (req, res)=>{
  const id = req.params.id;
  ProductModel.findByIdAndUpdate({_id: id}, {proname: req.body.proname, prorate: req.body.prorate, 
    desc: req.body.desc, overview: req.body.overview, avail: req.body.avail, category: req.body.category, imgurl: req.body.imgurl
  })
  .then(e=>res.json(e))
  .catch(err=>res.json(err))
})
app.get("/getUp/:id", (req, res)=>{
  const id = req.params.id;
  ProductModel.findById({_id:id})
  .then(e=>res.json(e))
  .catch(err=>res.json(err))
})


// -----------------------------------------Product list--------------------------------------

app.listen(3002, ()=>{
  console.log("server is running");
})

