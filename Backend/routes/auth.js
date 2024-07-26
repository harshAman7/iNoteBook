const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator')
const JWT_SECRET = 'Infinity@0000'
// ROUTE 1 : create a user using : POST "/api/auth/createuser". no login required
router.post('/createUser', [
    body('name', 'Enter valid name').isLength({ min: 3 }),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Enter valid password').isLength({ min: 8 }),
], async (req, res) => {
    // IF THERE ARE ERRORS,RETURN BAD REQUEST AND THE ERRORS
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({success:success, errors: errors.array() });
    }
    //Check where users with same email exit already
    try {
        let user = await User.findOne({ email: req.body.email })
        console.log(user)
        if (user) {
            return res.status(400).json({ success:success,error: "Sorry,user with this email exists" })
        }
        // genSalt returns a promis,so we should await
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        // create a new user wtho request sent by api
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data = {
            id: user.id
        }
        
        // .then(user=>res.json(user))
        // catch(err=>{console.log(err)
        // res.json({error:"Please enter unique value for email",message:err.message})});
        const authToken = jwt.sign(data, JWT_SECRET);
        success= true;
        res.json({ success,authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(success,"SOME INTERNAL SERVER ERROR OCCURED")
    }

})

// ROUTE 2 :Authenticate a user using POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Password cant be blank').exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success,error: "Login with correct credentials..." })
        }

        //compare function returns boolean
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({success, error: "Login with correct credentials..." })
        }
        else {
            const data = {
                id: user.id
            }
            
            const authToken = jwt.sign(data, JWT_SECRET);
            success=true;
            res.json({success,authToken });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send(success,"SOME INTERNAL SERVER ERROR OCCURED")
    }
})

// ROUTE 3 : Get a user's details using POST "/api/auth/getUser". Login required
router.post('/getUser', fetchUser,
async (req, res) => {
    // const { email, password } = req.body;
    try {
        userId = req.id;
        console.log(userId);
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("SOME INTERNAL SERVER ERROR OCCURED")
    }
})

module.exports = router