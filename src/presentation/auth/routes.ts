import { Router } from 'express'
import { AuthController } from './controller'
import {
  AuthRepositoryImpl,
  MongoAuthDatasourceImpl,
} from '../../infrastructure'
import { AuthMiddleware } from '../middlewares/auth.middleware'

export class AuthRoutes {
  static get routes(): Router {
    const router = Router()

    const datasource = new MongoAuthDatasourceImpl()
    const authRepository = new AuthRepositoryImpl(datasource)
    const controller = new AuthController(authRepository)

    router.post('/login', controller.loginUser)

    router.post('/register', controller.registerUser)

    router.get(
      '/',
      AuthMiddleware.validateJWT as unknown as Router,
      controller.getUsers
    )

    return router
  }
}
