import { JwtAdapter } from '../../../config'
import { RegisterUserDto } from '../../dtos/auth/register-user.dto'
import { CustomError } from '../../errors/custom.error'
import { AuthRepository } from '../../repositories/auth.repository'

interface UserToken {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>
}

export class RegisterUser implements RegisterUserUseCase {
  private readonly _authRepository: AuthRepository
  private readonly _signToken: SignToken

  constructor(authRepository: AuthRepository) {
    ;(this._authRepository = authRepository),
      (this._signToken = JwtAdapter.generateToken)
  }

  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
    const user = await this._authRepository.register(registerUserDto)

    const token = await this._signToken({ id: user.id }, '2h')
    if (!token) throw CustomError.internalServer('Error generating token')

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }
  }
}
