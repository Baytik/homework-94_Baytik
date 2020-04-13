const express = require('express');
const router = express.Router();
const config = require('../config');
const path = require('path');
const {nanoid} = require('nanoid');
const multer = require('multer');

const Post = require('../models/Post');
const auth = require('../middleware/auth');
const user = require('../models/User');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});
const upload = multer({storage});

router.get('/', auth, async (req, res) => {
    const user = req.user;
    const posts = await Post.find({user: user._id}).populate('user', {displayName: 1, avatar: 1});
    return res.send(posts)
});

router.post('/', upload.single('image'), auth, async (req, res) => {
    if (req.file) {
        req.body.image = req.file.filename;
    }

    const user = req.user;
    const object = {
        user: user._id,
        title: req.body.title,
        tags: JSON.parse(req.body.tags),
        image: req.body.image,
    };

    const post = new Post(object);

    try {
        await post.save();
        return res.send(post);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.get('/tags', async (req, res) => {
   const tags = await Post.distinct('tags');
   res.send(tags);
});

module.exports = router;