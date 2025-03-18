import { Request, Response } from 'express'
import { AuthRepository, RegisterUserDto } from '../../domain'

export class AuthController {
  // Aplicando de Inyeccion de Dependencias
  constructor(private readonly _authRepository: AuthRepository) {}

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body)
    if (error) res.status(400).json({ error })

    this._authRepository
      .register(registerUserDto!)
      .then((user) => res.json(user))
      .catch((error) => {
        res.status(500).json(error)
      })
  }

  loginUser = (req: Request, res: Response) => {
    res.json('login user controller')
  }
}
