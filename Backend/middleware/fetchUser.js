const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Infinity@0000'
const fetchUser=(req,res,next)=>{
    //GET THE USER FROM JWT_TOKEN AND ADD ID TO REQ OBJECT.
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using valid token.."})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        // console.log(data.id);
        req.id = data.id;
        uid = req.id;
        // console.log(uid)
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using valid token.."})
    }
}
module.exports = fetchUser;
// MIDDLEWARE ARE USED AT ENDPOINTS WHERE LOGIN IS REQUIRED