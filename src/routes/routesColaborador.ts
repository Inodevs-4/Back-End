import { Router } from 'express'
import ColaboradorController from '../controllers/ColaboradorController'

const routesColaborador = Router()

routesColaborador.get('/selectColaboradores', new ColaboradorController().selectColaboradores)
routesColaborador.get('/selectGestores', new ColaboradorController().selectGestores)
routesColaborador.post('/salvarColaborador', new ColaboradorController().salvarColaborador)
routesColaborador.get('/getColaborador/:id', new ColaboradorController().getColaborador)
routesColaborador.get('/getColaboradorByEmail/:email/', new ColaboradorController().getColaboradorByEmail)
routesColaborador.put('/atualizarColaborador/:id', new ColaboradorController().atualizarColaborador)
routesColaborador.delete('/excluirColaborador/:id', new ColaboradorController().excluirColaborador)

export default routesColaborador