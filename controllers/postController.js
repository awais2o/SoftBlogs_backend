const Post = require('../models/Post')

exports.getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10

  try {
    const skip = (page - 1) * limit

    const posts = await Post.find().skip(skip).limit(limit)

    const totalPosts = await Post.countDocuments()

    res.json({
      totalPosts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      posts
    })
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving posts' })
  }
}

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ error: 'Post not found' })
    res.json(post)
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving post' })
  }
}

exports.createPost = async (req, res) => {
  const { title, content } = req.body
  const author = req.user.userId

  try {
    const post = new Post({ title, content, author })
    await post.save()
    res.status(201).json(post)
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' })
  }
}

exports.updatePost = async (req, res) => {
  const { title, content } = req.body

  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    )
    if (!post) return res.status(404).json({ error: 'Post not found' })
    res.json(post)
  } catch (error) {
    res.status(500).json({ error: 'Error updating post' })
  }
}

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    if (!post) return res.status(404).json({ error: 'Post not found' })
    res.json({ message: 'Post deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting post' })
  }
}
