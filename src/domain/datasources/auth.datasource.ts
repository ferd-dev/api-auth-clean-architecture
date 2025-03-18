import { RegisterUserDto } from '../dtos/auth/register-user.dto'
import { User } from '../entities/user'

export abstract class AuthDatasource {
  abstract register(registerUserDto: RegisterUserDto): Promise<User>
}
