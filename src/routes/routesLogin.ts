import { Router } from 'express'
import LoginController from '../controllers/LoginController'

const routesLogin = Router()

routesLogin.post('/login', new LoginController().login)
routesLogin.get('/validateToken', new LoginController().validateToken)

export default routesLogin