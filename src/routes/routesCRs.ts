import { Router } from "express"
import CRController from "../controllers/CRController"

const routesCR = Router()

routesCR.get('/todosCRs', new CRController().todosCRs)
routesCR.post('/salvarCR', new CRController().salvarCR)
routesCR.get('/getCR/:numero', new CRController().getCR)
routesCR.put('/atualizarCR/:numero', new CRController().atualizarCR)
routesCR.delete('/excluirCR/:numero', new CRController().excluirCR)

export default routesCR