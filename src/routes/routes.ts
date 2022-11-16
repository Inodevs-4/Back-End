import { Router } from 'express'
import routesColaborador from './routesColaborador'
import routesLancamento from './routesLancamento'
import routesProjeto from './routesProjeto'
import routesLogin from './routesLogin'
import routesCliente from './routesCliente'
import routesCR from './routesCRs'
import routesVerba from './routesVerba'
import routesDashboard from './routesDashboard'

const routes = Router()

routes.use(routesLogin)
routes.use(routesLancamento)
routes.use(routesProjeto)
routes.use(routesColaborador)
routes.use(routesCliente)
routes.use(routesCR)
routes.use(routesVerba)
routes.use(routesDashboard)

export default routes