import { Request, Response } from 'express'
import {
  AuthRepository,
  CustomError,
  RegisterUserDto,
  RegisterUser,
} from '../../domain'
import { JwtAdapter } from '../../config'
import { UserModel } from '../../data/mongodb'

export class AuthController {
  // Aplicando de Inyeccion de Dependencias
  constructor(private readonly _authRepository: AuthRepository) {}

  private _handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message })

    return res.status(500).json({
      error: 'Internal Server Error',
    })
  }

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body)
    if (error) res.status(400).json({ error })

    new RegisterUser(this._authRepository)
      .execute(registerUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this._handleError(error, res))
  }

  loginUser = (req: Request, res: Response) => {
    res.json('login user controller')
  }

  getUsers = (req: Request, res: Response) => {
    UserModel.find()
      .then((users) => {
        res.json({
          // users,
          user: req.body.user,
        })
      })
      .catch((error) =>
        res.status(500).json({ error: 'Internal Server Error' })
      )
  }
}
