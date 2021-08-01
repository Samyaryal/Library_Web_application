import { Request, Response, NextFunction } from 'express'
import Book from '../models/Book'
import BookService from '../services/book'

import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

// POST /books
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = new Book({
      ...req.body,
    })
    const createdBook = await BookService.create(book)
    res.json(createdBook)
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', e))
    } else {
      next(new InternalServerError('Internal Server Error', e))
    }
  }
}

// PUT /books/:bookId
export const updateBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const bookId = req.params.bookId
    const updatedBook = await BookService.update(bookId, update)
    res.json(updatedBook)
  } catch (error) {
    next(new NotFoundError('Book not found', error))
  }
}

// DELETE /books/:bookId
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await BookService.deleteBook(req.params.bookId)
    res.status(204).end()
  } catch (error) {
    next(new NotFoundError('Book not found', error))
  }
}

// GET /users/:bookId
export const findBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BookService.findBookById(req.params.bookId))
  } catch (error) {
    next(new NotFoundError('Book not found', error))
  }
}

// GET /books
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BookService.findAllBook())
  } catch (error) {
    next(new NotFoundError('Books not found', error))
  }
}
