const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/auth')
const Profile = require('../../Models/Profile')
const User = require('../../Models/User')

const { check, validationResult } = require('express-validator');


// @Route  GET api/profile/me
// @Desc   Get current users profile
// @Access Private
router.get('/me',auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar'])
    if(!profile){
        return res.status(400).json({msg: 'There is no profile for this user'})
    }
    res.json(profile)
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

// @Route  POST api/profile
// @Desc   Create or Update user profile.
// @Access Private
router.post('/',[auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]], async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body

    // Build Profile Object
    const profileFields = {}

    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills){
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }

    profileFields.social = {}

    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;

    try {
        let profile = await Profile.findOne({user: req.user.id})
        
        if(profile){
            //Update
            profile = await Profile.findOneAndUpdate({user: req.user.id},
                {$set: profileFields},
                {new: true})
        
                return res.json(profile)
            }
            // Create Profile
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile)

    }catch(err){
        console.error(err.message)
        res.status(500).send('Server-Error')
    }
})  

// @Route  GET api/profile/
// @Desc   Get all profiles
// @Access Public

router.get('/', async (req,res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    } catch (err) {
        console.error(err.message);
        res.status.send('Server-Error')
    }

})

// @Route  GET api/profile/user/:user_id
// @Desc   Get profile by user ID
// @Access Public

router.get('/user/:user_id', async (req,res) => {
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar'])
        
        if(!profile) return res.status(400).json({msg: "There is no profile for this user"})

        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status.send('Server-Error')
    }

})


module.exports = router;