//Creates Auth token

//creates user

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route        GET api/auth
//@description  Test route
//@access       Private
router.get('/', auth, async (req, res)=> {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route        POST api/auth
//@description  LogiIn User and get token
//@access       Public


router.post('/',[
    check('email','Please Include Correct Email').isEmail(),
    check('password','Password Should be min of 5').exists(),

], async (req, res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { email, password } = req.body;
    try{
    // see if user exist
        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({error: [{msg: 'Invalid Credentials'}]});
        }

        //check password correct
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({error: [{msg: 'Invalid Credentials'}]});
        }

    //return jsonWebToken

    const payload = {
        user: {
            id: user.id
        }
    };

    jwt.sign(
        payload,
         config.get('jwtSecret'),
         {expiresIn: 36000},
         (err, token)=>{
             if(err) throw err;
             return res.json({token});
         });

   // res.send('User Registered');
    } catch(err) {
        res.status(500).send(err.message);
    }
});


module.exports = router;