import { BcryptAdapter } from '../../config'
import { UserModel } from '../../data/mongodb'
import {
  AuthDatasource,
  CustomError,
  RegisterUserDto,
  User,
} from '../../domain'
import { UserMapper } from '../mappers/user.mapper'

type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashed: string) => boolean

export class MongoAuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly _hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly _comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { name, email, password } = registerUserDto

    try {
      const emailExists = await UserModel.findOne({ email })
      if (emailExists) throw CustomError.badRequest('Email already exists')

      const user = new UserModel({
        name,
        email,
        password: this._hashPassword(password),
      })

      await user.save()

      return UserMapper.userEntityFromObject(user)
    } catch (error) {
      if (error instanceof CustomError) throw error
      throw CustomError.internalServer()
    }
  }
}
