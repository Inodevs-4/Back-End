import { Router } from 'express'
import LancamentoController from '../controllers/LancamentoController'

const routesLancamento = Router()

routesLancamento.post('/salvarLancamento', new LancamentoController().salvarLancamento)
routesLancamento.get('/meusLancamentos', new LancamentoController().meusLancamentos)
routesLancamento.put('/atualizarLancamento/:id', new LancamentoController().atualizarLancamento)
routesLancamento.get('/todosLancamentos', new LancamentoController().todosLancamentos)
routesLancamento.delete('/excluirLancamento/:id', new LancamentoController().excluirLancamento)

export default routesLancamento