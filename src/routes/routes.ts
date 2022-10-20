import { Router } from 'express'
import routesColaborador from './routesColaborador'
import routesLancamento from './routesLancamento'
import routesProjeto from './routesProjeto'
import routesLogin from './routesLogin'
import routesCliente from './routesCliente'

const routes = Router()

routes.use(routesLogin)
routes.use(routesLancamento)
routes.use(routesProjeto)
routes.use(routesColaborador)
routes.use(routesCliente)

export default routes