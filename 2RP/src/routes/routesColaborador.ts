import { Router } from 'express'
import ColaboradorController from '../controllers/ColaboradorController'

const routesColaborador = Router()

routesColaborador.get('/selectColaboradores', new ColaboradorController().selectColaboradores)
routesColaborador.get('/selectGestores', new ColaboradorController().selectGestores )
routesColaborador.post('/salvarColaborador', new ColaboradorController().salvarColaborador )
routesColaborador.put('/atualizarColaborador/:id', new ColaboradorController().atualizarColaborador )
routesColaborador.delete('/excluirColaborador/:id', new ColaboradorController().excluirColaborador )

export default routesColaborador