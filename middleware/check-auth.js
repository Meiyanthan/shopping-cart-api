const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
  // console.log(req.headers.authorization)
  // console.log(jwt.verify(token, process.env.JWT_KEY))
  try{
      const token = req.headers.authorization;
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.userData = decoded;
      next();
  }catch (error){
    res.status(401).json({message:"Auth failed"});      
  }

};