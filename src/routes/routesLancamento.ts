import { Router } from 'express'
import LancamentoController from '../controllers/LancamentoController'

const routesLancamento = Router()

routesLancamento.post('/salvarLancamento', new LancamentoController().salvarLancamento)
routesLancamento.get('/meusLancamentos/:matricula', new LancamentoController().meusLancamentos)
routesLancamento.get('/todosLancamentos', new LancamentoController().todosLancamentos)
routesLancamento.put('/atualizarLancamento/:id', new LancamentoController().atualizarLancamento)
routesLancamento.get('/getLancamento/:id', new LancamentoController().getLancamento)
routesLancamento.delete('/excluirLancamento/:id', new LancamentoController().excluirLancamento)
routesLancamento.put('/aprovarLancamento/:id', new LancamentoController().aprovarLancamento)
routesLancamento.put('/reprovarLancamento/:id', new LancamentoController().reprovarLancamento)
routesLancamento.get('/horasTrabalhadas/:matricula', new LancamentoController().horasTrabalhadas)
routesLancamento.get('/gestorLancamentos/:matricula', new LancamentoController().gestorLancamentos)

export default routesLancamento