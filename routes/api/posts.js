//Form area which can add post Call to the Application

//creates user

const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

//@route       POST api/posts
//@description  Create a post
//@access       Private

router.post('/',[
    auth,
    [
        check('text', 'text is required').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty())
        return res.status(400).json({error: errors.array()});
    
    try {

        const user = await User.findById(req.user.id).select('-password');

        if(!user){
            return res.status(500).json({msg: 'User Not Found'});
        }
        const text = req.body.text;
        const createPost = new Post({
            text,            
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });
        await createPost.save();
        res.json(createPost);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
    }
    
});

//@route       GET api/posts
//@description  get all posts
//@access       Private

router.get('/', auth, async (req, res) => {

    try {
        const posts = await Post.find().sort({date: -1});
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route       GET api/posts/:post_id
//@description  get all posts by User ID
//@access       Private

router.get('/:post_id', auth, async (req, res) => {

    try {
        const posts = await Post.findById(req.params.post_id);
        if(!posts){
            return res.status(400).json({msg: 'No such Post Exists'});
        }
        return res.json(posts);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'Invalid Post Id'});
        }
        res.status(500).send('Server Error');
    }
});

//@route       DELETE api/posts/:post_id
//@description  get all posts by User ID
//@access       Private

router.delete('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if(!post) {
            return res.status(404).json({msg: 'Post Not Found'});
        }

        if(post.user.toString() !== req.user.id)
            return res.status(500).json({msg: 'User Not Authorized'});

        await post.remove();
        post.text = 'post Removed';
        return res.json(post);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'Invalid Post Id'});
        }
        res.status(500).send('Server Error');
    }
});

//@route       PUT api/posts/like/:post_id
//@description  Like Post Using Post ID
//@access       Private

router.put('/like/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg: 'Post Already Liked'});
        }
        const user_liked = req.user.id;
        post.likes.push({user: req.user.id});
        await post.save()
        return res.status(200).json(post.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route       PUT api/posts/unlike/:post_id
//@description  Like Post Using Post ID
//@access       Private

router.put('/unlike/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        const user = await User.findById(req.user.id);
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg: `Post Not Yet Liked by ${user.name} for ${post.name}`});
        }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);
        await post.save()
        return res.status(200).json(post.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;