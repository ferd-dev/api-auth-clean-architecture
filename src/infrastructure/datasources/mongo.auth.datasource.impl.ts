import { UserModel } from '../../data/mongodb'
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
      const emailExists = await UserModel.findOne({ email })
      if (emailExists) throw CustomError.badRequest('Email already exists')

      const user = new UserModel({
        name,
        email,
        password,
      })

      await user.save()

      return new User(
        user.id,
        name,
        email,
        password,
        user.roles,
        'https://example.com/user.jpg'
      )
    } catch (error) {
      if (error instanceof CustomError) throw error
      throw CustomError.internalServer()
    }
  }
}
