import { Router } from 'express'
import LancamentoController from '../controllers/LancamentoController'

const routesLancamento = Router()

routesLancamento.post('/salvarLancamento', new LancamentoController().salvarLancamento)
routesLancamento.get('/meusLancamentos/:id', new LancamentoController().meusLancamentos)
routesLancamento.get('/todosLancamentos', new LancamentoController().todosLancamentos)
routesLancamento.put('/atualizarLancamento/:id', new LancamentoController().atualizarLancamento)
routesLancamento.get('/getLancamento/:id', new LancamentoController().getLancamento)
routesLancamento.delete('/excluirLancamento/:id', new LancamentoController().excluirLancamento)

export default routesLancamento