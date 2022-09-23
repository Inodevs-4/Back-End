import { Router } from 'express'
import ColaboradorController from '../controllers/ColaboradorController'

const routesColaborador = Router()

routesColaborador.get('/selectColaboradores', new ColaboradorController().selectColaboradores)
routesColaborador.get('/selectGestores', new ColaboradorController().selectGestores )

export default routesColaborador