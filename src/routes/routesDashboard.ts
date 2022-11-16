import { Router } from 'express'
import DashboardController from '../controllers/DashboardController'

const routesDashboard = Router()

routesDashboard.get('/todosLancamentosColab/:matricula', new DashboardController().todosLancamentosColab)
routesDashboard.get('/todosLancamentosColabPeriodo/:matricula/:data1/:data2', new DashboardController().todosLancamentosColabPeriodo)
routesDashboard.get('/todosLancamentosFiltro/:matricula/:cnpj/:numero', new DashboardController().todosLancamentosFiltro)

export default routesDashboard