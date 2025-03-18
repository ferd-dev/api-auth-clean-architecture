import {
  AuthDatasource,
  AuthRepository,
  RegisterUserDto,
  User,
} from '../../domain'

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly _authDatasource: AuthDatasource) {}

  register(registerUserDto: RegisterUserDto): Promise<User> {
    return this._authDatasource.register(registerUserDto)
  }
}
