import { Router } from 'express'
import ClienteController from '../controllers/ClienteController'

const routesCliente = Router()

routesCliente.get('/todosClientes', new ClienteController().todosClientes)
routesCliente.post('/salvarCliente', new ClienteController().salvarCliente)
routesCliente.get('/getCliente/:cnpj', new ClienteController().getCliente)
routesCliente.put('/atualizarCliente/:cnpj', new ClienteController().atualizarCliente)
routesCliente.delete('/excluirCliente/:cnpj', new ClienteController().excluirCliente)

export default routesCliente