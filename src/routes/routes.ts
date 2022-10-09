import { Router } from 'express'
import routesColaborador from './routesColaborador'
import routesLancamento from './routesLancamento'
import routesProjeto from './routesProjeto'
import routesLogin from './routesLogin'

const routes = Router()

routes.use('/', routesLogin)
routes.use('/', routesLancamento)
routes.use('/', routesProjeto)
routes.use('/', routesColaborador)

export default routes