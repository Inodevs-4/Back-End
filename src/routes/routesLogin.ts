import { Router } from 'express'
import LoginController from '../controllers/LoginController'

const routesLogin = Router()

routesLogin.post('/login', new LoginController().login)
routesLogin.get('/validateToken', new LoginController().validateToken)
routesLogin.post('/loginOauth', new LoginController().loginOauth)

export default routesLogin