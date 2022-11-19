import { Request, Response } from "express";
import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { AppDataSource } from "../data-source"
import { Colaborador } from "../entities/Colaborador";
import { Lancamento } from "../entities/Lancamento";

export default class DashboardController {

    async todosLancamentosColab(req: Request, res: Response) {
        const { matricula } = req.params
        
        try {
            const colaborador = await AppDataSource.manager.findOneBy(Colaborador, { matricula: Number(matricula) })

            const lancamentos = await AppDataSource.manager.find(Lancamento, {
                relations: {
                    colaborador: true,
                    projeto: true,
                    verbas: true,
                    gestor: true
                },
                where: { colaborador },
                order: {
                    id: "DESC"
                }
            })
            return res.json(lancamentos)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async todosLancamentosColabPeriodo(req: Request, res: Response) {
        const { matricula, data1, data2 } = req.params

        try {
            const colaborador = await AppDataSource.manager.findOneBy(Colaborador, { matricula: Number(matricula) })

            const lancamentos = await AppDataSource.manager.find(Lancamento, {
                relations: {
                    colaborador: true,
                    projeto: true,
                    verbas: true,
                    gestor: true
                },
                where: { 
                    colaborador,
                    data_inicio: MoreThanOrEqual(new Date(data1)),
                    data_fim: LessThanOrEqual(new Date(data2))
                },
                order: {
                    id: "DESC"
                }
            })
            console.log
            return res.json(lancamentos)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async todosLancamentosFiltro(req: Request, res: Response) {
        const { matricula, cnpj, numero } = req.params

        let queryLancamentos = `
        SELECT
            l.id, l.modalidade, l.data_inicio, l.data_fim, l.data_inicio2, l.data_fim2,
            co.matricula,
            cl.cnpj,
            cr.numero
        FROM 
            lancamentos l, colaboradores co, crs cr, clientes cl, projetos p 
        WHERE 
            l.colaborador_id = co.matricula AND
            l.projeto_id = p.id AND
            cr.numero = p.cr_id AND
            cl.cnpj = p.cliente_id
        `
        let queryCampos = []
        let count = 1

        if (matricula !== '*' || cnpj !== '*' || numero !== '*') {
            queryLancamentos += ' AND\n'
        }

        if (matricula !== '*') {
            if (cnpj === '*' && numero === '*'){
                queryLancamentos +=  `co.matricula = $${count}\n`
            } else {
                queryLancamentos +=  `co.matricula = $${count} AND\n` 
            }
            queryCampos.push(matricula)
            count += 1
        }

        if (cnpj !== '*') {
            if (numero === '*'){
                queryLancamentos +=  `cl.cnpj = $${count}\n`
            } else {
                queryLancamentos +=  `cl.cnpj = $${count} AND\n`
            }
            queryCampos.push(cnpj)
            count += 1
        }

        if (numero !== '*') {
            queryLancamentos += `cr.numero = $${count}`
            queryCampos.push(numero)
        }
        
        try {
            const lancamentos = await AppDataSource.query(queryLancamentos, queryCampos)
            return res.json(lancamentos)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

}