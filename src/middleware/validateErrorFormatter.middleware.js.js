
// const jwt =  require("jsonwebtoken");
// require("dotenv").config();

// const Tokengenerator = (user)=>{
//   const SECRET = process.env.JWT_SECRET;
//   const expiresIn = 60 * 60;
//     const Token = jwt.sign({
//         _id: user._id,
//         username: user.username,
//         email: user.email
       
//     },
//     SECRET,
//     {expiresIn: expiresIn}

   
        
//     );
//     return Token
// }


const jwt = require("jsonwebtoken")
const UserModel = require("../models/user.model")
require("dotenv").config()


const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded._id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    req.userid = decoded._id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({ message: "Unauthorized!" });
  }
  return res.status(500).send({ message: error.message });

  }

}

module.exports = verifyToken;

