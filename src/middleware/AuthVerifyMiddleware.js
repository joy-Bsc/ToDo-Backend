const jwt = require('jsonwebtoken');
module.exports=(req,res,next)=>{
    let Token = req.headers['token-key']
    jwt.verify(Token,"SecretKey12345",function(e,decoded){
        if(e){
            res.status(401).json({status:"unauthorized"})
        }
        else{
            //get user name from decoded
            let userName=decoded['data']['UserName'];
            req.headers.UserName=userName
            console.log(req.headers.UserName    );
            next();
        }
    })
}