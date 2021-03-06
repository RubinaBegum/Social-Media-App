const express = require('express');
const router = express.Router();
const auth=require("../../middleware/auth");
const bcrypt=require('bcryptjs');
const config=require("config");
const jwt =require('jsonwebtoken');
const {check,validationResult}=require('express-validator');

const User=require('../../Models/User');

//@route    POST api/Auth
// @desc    authenticate user and get token 
// @access  public
router.get('/',auth,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('server error')
    }
});
router.post('/',[
    
    check('email','please include a valid email').isEmail(),
    check(
        'password','password is required'
    ).exists()
],async(req,res)=>{
    console.log(req.body)
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body;
    try{
        // if user exist 
        let user=await User.findOne({email});
        if(!user){
            res.status(400).json({errors:[{msg:'invalid credentials'}]});
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res
            .status(400)
            .json({errors:[{msg:'Invalid credentials'}]});
        }
        const payload = {
            user:{
                id:user.id
            }
        }

        // res.send('User registration');
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn:360000},
            (err,token)=>{
                if(err) throw err;
                res.json({token});
            });
    }catch(err){
        console.error(err.message);
        res.status(500).send('server error');

    }

  }
);


module.exports=router;