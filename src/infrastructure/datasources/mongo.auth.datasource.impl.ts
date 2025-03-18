import {
  AuthDatasource,
  CustomError,
  RegisterUserDto,
  User,
} from '../../domain'

export class MongoAuthDatasourceImpl implements AuthDatasource {
  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { name, email, password } = registerUserDto

    try {
      return new User(
        '1',
        name,
        email,
        password,
        ['user'],
        'https://example.com/user.jpg'
      )
    } catch (error) {
      if (error instanceof CustomError) throw error
      throw CustomError.internalServer()
    }
  }
}
