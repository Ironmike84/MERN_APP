const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/auth')
const {check, validationResult} = require('express-validator')
const User = require('../../Models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

// @Route  GET api/auth
// @Desc   Test Route
// @Access Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }    catch (err){
        console.log(err.message)
        res.status(500).send('Server Error')
    }
});

// @Route  GET api/auth
// @Desc   Register User
// @Access Public
router.post('/', [
    check('email', 'Please Include a valid Email').isEmail(),
    check('password', 'Password is required.').exists()
],
async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

const { email, password } = req.body    

try{
// See if user exists
let user = await User.findOne({email})

    if(!user){
        res.status(400).json({errors: [{msg:'Invalid Credentials'}]})
    }

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch){
    res.status(400).json({errors: [{msg:'Invalid Credentials'}]})
}

const payload = {
    user: {
        id: user.id
    }
}
jwt.sign(payload,
    config.get('jwtSecret'),
    {expiresIn: 360000},
    (err, token)=>{
        if(err) throw err;
        res.json({token})
    })
}catch(err){
console.log(err.message)
res.status(500).send('Server-Error')
}
});


module.exports = router;



module.exports = router;
