import { Router } from 'express'
import ProjetoController from '../controllers/ProjetoController'

const routesProjeto = Router()

routesProjeto.get('/selectProjetos', new ProjetoController().selectProjetos)
routesProjeto.get('/todosProjetos', new ProjetoController().todosProjetos)
routesProjeto.post('/salvarProjeto', new ProjetoController().salvarProjeto)
routesProjeto.get('/getProjeto/:id', new ProjetoController().getProjeto)
routesProjeto.put('/atualizarProjeto/:id', new ProjetoController().atualizarProjeto)
routesProjeto.delete('/excluirProjeto/:id', new ProjetoController().excluirProjeto)

export default routesProjeto