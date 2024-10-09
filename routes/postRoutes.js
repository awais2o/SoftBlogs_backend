const express = require('express')
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postController')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('', getPosts)
router.get('/:id', getPostById)
router.post('', auth('admin'), createPost)
router.put('/:id', auth('admin'), updatePost)
router.delete('/:id', auth('admin'), deletePost)

module.exports = router
//
