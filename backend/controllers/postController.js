const Post = require('../models/Post');

const createPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, image } = req.body;

        if (!title || !image) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        const newPost = new Post({
            user: id,
            title,
            image
        });

        await newPost.save();

        const postResponse = {
            id: newPost._id,
            user: newPost.user,
            title: newPost.title,
            image: newPost.image
        };

        res.status(200).json({ message: "Post created successfully", post: postResponse });
    } catch(error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};


const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        post.title = req.body.title;
        post.image = req.body.image;
        await post.save();
        res.json({ message: "Post updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};

module.exports = { createPost, deletePost, updatePost, getPosts };