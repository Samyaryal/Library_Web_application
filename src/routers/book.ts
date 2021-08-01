import express from 'express'

import {
  createBook,
  findBookById,
  deleteBook,
  findAll,
  updateBookById,
} from '../controllers/book'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get('/', findAll)
router.get('/:bookId', findBookById)
router.put('/:bookId', updateBookById)
router.delete('/:bookId', deleteBook)
router.post('/', createBook)

export default router
