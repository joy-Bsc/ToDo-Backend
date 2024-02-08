//basic lib import
const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const bodyParser = require('body-parser');

//security middleware lib import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');

//database lib import
const mongoose = require('mongoose');

//security middleware implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

//body parser implement
app.use(bodyParser.json());

//request rate limit
const limiter = rateLimit({windowMs:15*60*60,max:3000})
app.use(limiter)

//mongodb database connection


main().catch(err => console.log(err));

async function main() {
    let URI ='mongodb://127.0.0.1:27017/Todo';
    let OPTION={user:'',pass:'',autoIndex:true}
  await mongoose.connect(URI,OPTION);
  console.log("connected successfully");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//routing implement
app.use("/api/v1",router)

//undefined route implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not found"})

})

module.exports=app;