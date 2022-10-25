import { Router } from "express"
import VerbaController from "../controllers/VerbaController"

const routesVerba = Router()

routesVerba.get('/todasVerbas', new VerbaController().todasVerbas)
routesVerba.post('/salvarVerba', new VerbaController().salvarVerba)
routesVerba.get('/getVerba/:numero', new VerbaController().getVerba)
routesVerba.put('/atualizarVerba/:numero', new VerbaController().atualizarVerba)
routesVerba.delete('/excluirVerba/:numero', new VerbaController().excluirVerba)

export default routesVerba