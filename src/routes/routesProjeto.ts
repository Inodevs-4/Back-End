import { Router } from 'express'
import ProjetoController from '../controllers/ProjetoController'

const routesProjeto = Router()

routesProjeto.get('/selectProjetos', new ProjetoController().selectProjetos)

export default routesProjeto