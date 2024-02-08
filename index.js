const app = require("./app");
// const dotenv =require('dotenv');
// dotenv.config();
require('dotenv').config({path:"./.env"})


const PORT = process.env.RUNNING_PORT

app.listen(process.env.RUNNING_PORT,function(){
    console.log(`Success from ${PORT}`);
});