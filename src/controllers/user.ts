import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import UserService from '../services/user'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

// GET /users
export const findAll = async (req: Request, res: Response) => {
  const allUser = await UserService.findAllUser()
  res.json(allUser)
}

// GET /users/:userId
export const findUserById = async (req: Request, res: Response) => {
  const userId = req.params['userId']
  const user = await UserService.findOne(userId)
  res.json(user)
}

// POST /users
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email} = req.body

    const user = new User({
      firstName,
      lastName,
      email
    })
    const createdUser = await UserService.create(user)
    res.json(createdUser)
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', e))
    } else {
      next(new InternalServerError('Internal Server Error', e))
    }
  }
}

// PUT /users/:userId
export const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const userId = req.params.userId
    const updatedUser = await UserService.update(userId, update)
    res.json(updatedUser)
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

// DELETE /users/:userId
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserService.deleteUser(req.params.userId)
    res.status(204).end()
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}
