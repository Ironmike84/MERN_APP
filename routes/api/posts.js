const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const auth = require('../../Middleware/auth')
const Post = require('../../Models/Post')
const Profile = require('../../Models/Profile')
const User = require('../../Models/User')


// @Route  Posts api/posts
// @Desc   Create A Post
// @Access Private
router.post('/posts',[auth, [
    check('text', 'Text is required').not().isEmpty
]],
async (req, res) => {
const error = validationResult(req)
if(!error.isEmpty()){
    return res.status(400).json({errors: error.array()})    
}
try{
    const user = await User.findById(req.user.id).select('-password')

    const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
    })

    const post = await newPost.save();
    res.json(post)
}catch(err){
    console.error(error.message)
    res.status(400).send('Server-Error')
}

});


module.exports = router;
