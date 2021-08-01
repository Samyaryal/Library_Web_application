import express from 'express'

import {
  createAuthor,
  findAuthorById,
  deleteAuthor,
  findAll,
  updateAuthorById,
} from '../controllers/author'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get('/', findAll)
router.get('/:authorId', findAuthorById)
router.put('/:authorId', updateAuthorById)
router.delete('/:authorId', deleteAuthor)
router.post('/', createAuthor)

export default router
