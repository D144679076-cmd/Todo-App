import express, { Request, Response } from 'express'
import {
  loginByEmail,
  registerByEmail,
  logoutByEmail,
  githubLogin,
  githubCallback,
  googleLogin,
  googleCallback,
} from './auth.controller.ts'

const authRouter = express.Router()

authRouter.route('/login').post(async (req: Request, res: Response) => {
  await loginByEmail(req, res)
})

authRouter.route('/register').post(async (req: Request, res: Response) => {
  await registerByEmail(req, res)
})

authRouter.route('/logout').post(async (req: Request, res: Response) => {
  await logoutByEmail(req, res)
})

authRouter.post('/password-reset', (req: Request, res: Response) => {
  // Add your password reset logic here
  res.status(200).json({ message: 'Password reset endpoint not implemented yet' })
})

// GitHub OAuth routes
authRouter.get('/github', async (req: Request, res: Response) => {
  await githubLogin(req, res)
})

authRouter.get('/github/callback', async (req: Request, res: Response) => {
  await githubCallback(req, res)
})

// Google OAuth routes
authRouter.get('/google', async (req: Request, res: Response) => {
  await googleLogin(req, res)
})

authRouter.get('/google/callback', async (req: Request, res: Response) => {
  await googleCallback(req, res)
})

export default authRouter
