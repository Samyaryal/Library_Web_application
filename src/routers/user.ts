import express, { Response, Request } from 'express'
import passport from 'passport'

import {
  createUser,
  findUserById,
  findAll,
  updateUserById,
  deleteUser,
} from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  passport.authenticate('jwt', { session: false }),
  findAll
)
router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  findUserById
)
router.post('/', passport.authenticate('jwt', { session: false }), createUser)
router.put('/:userId', updateUserById)
router.delete('/:userId', deleteUser)
router.post(
  '/login',
  passport.authenticate('google-id-token', { session: false }),
  (req: Request, res: Response) => {
    res.json(req.user)
  }
)

export default router
