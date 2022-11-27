import { Router } from 'express'
import DashboardController from '../controllers/DashboardController'

const routesDashboard = Router()

routesDashboard.get('/todosLancamentosColab/:matricula', new DashboardController().todosLancamentosColab)
routesDashboard.get('/todosLancamentosColabPeriodo/:matricula/:data1/:data2/:modalidade', new DashboardController().todosLancamentosColabPeriodo)
routesDashboard.get('/todosLancamentosFiltro/:matricula/:cnpj/:numero', new DashboardController().todosLancamentosFiltro)
routesDashboard.get('/graficoGeral', new DashboardController().graficoGeral)
routesDashboard.get('/graficoIndividual/:matricula', new DashboardController().graficoIndividual)
routesDashboard.get('/horasTrabalhadasProjeto/:id/:modalidade', new DashboardController().horasTrabalhadasProjeto)
routesDashboard.get('/horasLancamentoVerba/:matricula/:modalidade/:numero', new DashboardController().horasLancamentoVerba)

export default routesDashboard