import { Request, Response } from "express";
import { AppDataSource } from "../data-source"
import { Lancamento } from "../entities/Lancamento";

export default class LancamentoController {

    async salvarLancamento(req: Request, res: Response) {
        const { modalidade, inicio, fim, justificativa, colaborador, gestor, projeto } = req.body

        try {
            const novoLancamento = AppDataSource.manager.create(Lancamento, { modalidade, inicio, fim, justificativa, colaborador, gestor, projeto })
            await AppDataSource.manager.save(Lancamento, novoLancamento)

            return res.json(novoLancamento)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

}