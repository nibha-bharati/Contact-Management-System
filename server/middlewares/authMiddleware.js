const User = require("../models/user");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });
const jwt = require("jsonwebtoken");


const userVerification = async (req, res,next) => {
  
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
 
    try{
      token=req.headers.authorization.split(' ')[1]

      const decoded=jwt.verify(token,process.env.TOKEN_KEY)

      req.user=await User.findById(decoded.id).select('-password')
      
    }catch(error){
      console.log(error)
      res.status(401)
      // throw new Error('Not authorized')
    }
  }

  if(!token){
    res.status(401)
    // throw new Error('Not authorized, no token')
  }
  next()
  // // const token = req.cookies.token
  // // if (!token) {
  // //   return res.json({ status: false })
  // // }
  // const authHeader=req.headers['authorization']
  // const token=authHeader && authHeader.split(' ')[1]

  // if(token==null) return res.sendStatus(401)
  // // jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
  // //   if (err) {
  // //    return res.sendStatus(403)
  // //   } else {
  // //     const user = await User.findById(data.id)
  // //     if (user) return res.json({ status: true, user: user.username })
  // //     else return res.json({ status: false })
  // //   }
  // // })
  // jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
  //   console.log(err)

  //   if (err) return res.sendStatus(403)

  //   req.user = user

  //   next()
  // })
}

module.exports={userVerification}