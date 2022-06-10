//creates user

const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
//@route        POST api/users
//@description  Register User
//@access       Public
router.post('/',[
    check('name','Name is Required').not().isEmpty(),
    check('email','Please Include Correct Email').isEmail(),
    check('password','Password Should be min of 5').isLength({min: 6}),

], async (req, res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { name, email, password } = req.body;
    try{
    // see if user exist
        let user = await User.findOne({email: email});
        
        

        if(user){
            return res.status(400).json({error: [{msg: 'User Already Exists'}]});
        }
    //Get users gravatar

    const avatar = gravatar.url(email,{
        s:'200',//size
        r:'pg',
        d:'mm' //default avatar
    });

    user = new User({
        name,
        email,
        avatar,
        password
    });

    //Encrypt password

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);
    
    await user.save();
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
         })

   // res.send('User Registered');
    } catch(err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;