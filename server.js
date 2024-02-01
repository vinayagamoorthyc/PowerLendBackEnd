const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserexpModel = require("./models/userexp.js");
const UserreportModel = require("./models/userreport.js");
const ProductModel = require("./models/products.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const UserModel = require("./models/users.js");

const app = express();
app.use(cors({
  origin: ["https://powertoolsrental.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

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

// -----------------------------------------Cart details--------------------------------------

app.post("/createCart/:userid",(req, res)=>{
  const id=req.params.userid;
  const cartbody = {
    proname: req.body.proname,
    prorate: req.body.prorate,
    days: req.body.days,
    imgurl: req.body.imgurl
  };
  UserModel.findByIdAndUpdate({_id:id}, {
    $push: {cart: {...cartbody}}
  })
  .then(e=>res.json(e))
  .catch(err=>res.json(err))
});
app.get("/getCart/:userid",(req,res)=>{
  const id = req.params.userid;
  UserModel.findById({_id:id})
  .then((e)=>res.json(e.cart))
  .catch(err=>res.json(err))
});
app.post("/deleteCart/:id", (req,res)=>{
  const id = req.params.id;
  const {userid} = req.body;
  UserModel.findByIdAndUpdate({_id:userid},{
    $pull: {cart: {_id:id}}
  })
  .then(e=>res.json(e))
  .catch(err=>res.json(err))
})

// -----------------------------------------login register--------------------------------------

app.post("/register",(req, res)=>{
  const {username, email, phone, password}=req.body;
  bcrypt.hash(password, 10)
  .then(hash=>{
    UserModel.create({username, email, phone, password: hash})
    .then(e=>res.json("Success!"))
    .catch(err=>res.json(err))
  }).catch(err=>res.json(err))
});
app.post("/login", (req, res)=>{
  const {email, password}=req.body;
  UserModel.findOne({email: email})
  .then(user =>{
    if(user){
      bcrypt.compare(password, user.password, (err, response)=>{
        if(response){
          const token = jwt.sign({email: user.email, role: user.role},
            "jwt-secret-key", {expiresIn: "1d"});
            return res.json({Status: "success", role: user.role, id: user._id, tok: token});
        }else{
          return res.json("incorrect password!");
        }
      })
    }else{
      return res.json("no record exist");
    }
  })
})
app.get("/getUser/:id", (req, res)=>{
  const id=req.params.id;
  UserModel.findById({_id:id})
  .then(e=>res.json(e))
  .catch(err=>console.log(err));
})
app.get("/getUpUser/:id", (req, res)=>{
  const id = req.params.id;
  UserModel.findById({_id:id})
  .then(e=>res.json(e))
  .catch(err=>res.json(err))
})
app.put("/updateUser/:id", (req, res)=>{
  const id = req.params.id;
  UserModel.findByIdAndUpdate({_id: id}, {username: req.body.username, email: req.body.email, 
    phone: req.body.phone, address: req.body.address
  })
  .then(e=>res.json(e))
  .catch(err=>res.json(err))
})
app.get("/getUserDetails", (req, res)=>{
  UserModel.find().
  then(e => res.json(e))
  .catch(err => res.json(err))
});
app.delete("/deleteUser/:id", (req,res)=>{
  const id = req.params.id;
  UserModel.findByIdAndDelete({_id:id})
  .then(e=>res.json(e))
  .catch(err=>res.json(err))
});

app.listen(3002, ()=>{
  console.log("server is running");
})

