import { CustomError, User } from '../../domain'

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { id, _id, name, email, password, roles } = object

    if (!id || !_id) throw CustomError.badRequest('Missing id')
    if (!name) throw CustomError.badRequest('Missing name')
    if (!email) throw CustomError.badRequest('Missing email')
    if (!password) throw CustomError.badRequest('Missing password')
    if (!roles) throw CustomError.badRequest('Missing roles')

    return new User(id || _id, name, email, password, roles)
  }
}
