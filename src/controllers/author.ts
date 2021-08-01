import { Request, Response, NextFunction } from 'express'
import Author from '../models/Authors'
import AuthorService from '../services/author'

import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

// GET /authors
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await AuthorService.findAllAuthor())
  } catch (error) {
    next(new NotFoundError('Author not found', error))
  }
}

// GET /users/:authorId
export const findAuthorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await AuthorService.findOne(req.params.authorId))
  } catch (error) {
    next(new NotFoundError('Author not found', error))
  }
}

// POST /authors
export const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const author = new Author({
      ...req.body,
    })
    const createdAuthor = await AuthorService.create(author)
    res.json(createdAuthor)
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', e))
    } else {
      next(new InternalServerError('Internal Server Error', e))
    }
  }
}

// PUT /authors/:authorId
export const updateAuthorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const authorId = req.params.authorId
    const updatedAuthor = await AuthorService.update(authorId, update)
    res.json(updatedAuthor)
  } catch (error) {
    next(new NotFoundError('Author not found', error))
  }
}

// DELETE /authors/:authorId
export const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await AuthorService.deleteAuthor(req.params.authorId)
    res.status(204).end()
  } catch (error) {
    next(new NotFoundError('Author not found', error))
  }
}
