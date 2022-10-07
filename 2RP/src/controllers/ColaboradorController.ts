import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Colaborador } from "../entities/Colaborador"
import * as bcrypt from "bcrypt"

export default class ColaboradorController {

    async selectColaboradores(req: Request, res: Response) {
        try {
            const colaboradores = await AppDataSource.manager.find(Colaborador, {
                relations: {
                    cr: true,
                    lancamentos_colaborador: true,
                    lancamentos_gestor: true
                },
                order: {
                    nome: "ASC"
                },
                }
            )
            return res.json(colaboradores)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async selectGestores(req: Request, res: Response){
        try {
            const colaboradores = await AppDataSource.manager.find(Colaborador, {
                relations: {
                    cr: true,
                    lancamentos_colaborador: true,
                    lancamentos_gestor: true
                },
                order: {
                    nome: "ASC"
                },
                where: {
                    perfil: "gestor"
                }
                }
            )
            return res.json(colaboradores)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async salvarColaborador(req: Request, res: Response) {
        const { nome, matricula, turno, email, telefone, senha, perfil, cr } = req.body
        
        const hashSenha = await bcrypt.hash(senha, 10)

        try {
            const novoColaborador = AppDataSource.manager.create(Colaborador, { nome, matricula, turno, email, telefone, senha: hashSenha, perfil, cr })
            await AppDataSource.manager.save(Colaborador, novoColaborador)

            const { senha: _, ...colaborador } = novoColaborador 
            return res.json(colaborador)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async getColaborador(req: Request, res: Response) {
        const { id } = req.params

        try {
            const colaborador= await AppDataSource.manager.findOneBy(Colaborador, { matricula: Number(id) })

            return res.json(colaborador)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async atualizarColaborador(req: Request, res: Response) {
        const { id } = req.params
        const { nome, turno, email, telefone, perfil, cr, status, senha } = req.body

        try {
            const novoColaborador = AppDataSource.manager.create(Colaborador, { matricula: Number(id), nome, turno, email, telefone, perfil, cr, status, senha })
            await AppDataSource.manager.save(Colaborador, novoColaborador)

            return res.json(novoColaborador)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async excluirColaborador(req: Request, res: Response) {
        const { id } = req.params
        
        try {
            const colaborador = await AppDataSource.manager.findOneBy(Colaborador, { matricula: Number(id) })
            await AppDataSource.manager.delete(Colaborador, colaborador)

            return res.json(colaborador)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

}