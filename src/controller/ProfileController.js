const ProfileModel = require('../models/ProfileModel');
const jwt =require('jsonwebtoken');

exports.CreateProfile=async(req,res)=>{
    try {
        let reqBody = req.body;
        const data = await ProfileModel.create(reqBody);
        if(data){
            res.status(200).json({status:"success",data:data})
        }
        else{
            res.status(400).json({status:"Fail",data:e})
        }
    } catch (error) {
        console.log(error);
    }
    
    
}

exports.UserLogin=(req,res)=>{
    let UserName=req.body.UserName;
    let Password=req.body.Password;

const query = ProfileModel.find({ UserName: UserName, Password: Password });

query.exec()
    .then(data => {
        if (data.length > 0) {
            //create auth token
            let Payload={exp:Math.floor(Date.now()/1000)+(24*60*60),data:data[0]}
            let token = jwt.sign(Payload,'SecretKey12345');
            res.status(200).json({ status: "success",token:token, data: data[0]});
        } else {
            res.status(401).json({ status: "unauthorized" });
        }
    })
    .catch(err => {
        res.status(400).json({ status: "fail", data: err });
    });

   
}


exports.SelectProfile = async (req, res) => {
    try {
        let UserName = req.headers.UserName;

        const response = await ProfileModel.find({ UserName });

        if (response && response.length > 0) {
            res.status(200).json({ status: "success", data: response });
        } else {
            res.status(404).json({ status: "fail", message: "Profile not found" });
        }
    } catch (error) {
        console.error("Error in SelectProfile:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }

};

exports.UpdateProfile=async(req,res)=>{
    try {
        let UserName = req.headers.UserName;
        let reqBody = req.body;
       const update =await ProfileModel.updateOne({UserName:UserName},{$set:reqBody},{upsert:true})
       if (update) {
        res.status(200).json({ status: "success", data: update });
    } else {
        res.status(404).json({ status: "fail", message: "Profile not found" });
    }
    } catch (e) {
        
    }
}

