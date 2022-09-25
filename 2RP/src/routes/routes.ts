import { Router } from 'express'
import routesColaborador from './routesColaborador'
import routesLancamento from './routesLancamento'
import routesProjeto from './routesProjeto'
import routesLogin from './routesLogin'

const routes = Router()

routes.use('/', routesLancamento)
routes.use('/', routesProjeto)
routes.use('/', routesColaborador)
routes.use('/', routesLogin)

export default routes