import { Request, Response } from "express";
import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { AppDataSource } from "../data-source"
import { Cliente } from "../entities/Cliente";
import { Colaborador } from "../entities/Colaborador";
import { CR } from "../entities/CR";
import { Lancamento, Modalidade } from "../entities/Lancamento";
import { Projeto } from "../entities/Projeto";
import { Verba } from "../entities/Verba";

function verificarDadoGrafico1(l: Lancamento, mes: number, ano: number, modalidade: String) {
    let totalMinutos = 0

    if (l.modalidade == modalidade && l.data_fim.getMonth() == mes && l.data_fim.getFullYear() == ano) {
        totalMinutos += Math.round((l.data_fim.getTime() - l.data_inicio.getTime()) / 60000)
        if (l.acionado == 'sim'){
            totalMinutos += Math.round((l.data_fim2.getTime() - l.data_inicio2.getTime()) / 60000)
        }
    }
    return totalMinutos
}

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
        const { matricula, data1, data2, modalidade } = req.params

        let _modalidade = null
        if (modalidade === "hora extra" || modalidade == "sobreaviso") {
            _modalidade = modalidade as Modalidade 
        }

        try {
            const colaborador = await AppDataSource.manager.findOneBy(Colaborador, { matricula: Number(matricula) })

            if (data1 === "*" && data2 === "*") {
                const lancamentos = await AppDataSource.manager.find(Lancamento, {
                    relations: {
                        colaborador: true,
                        projeto: true,
                        verbas: true,
                        gestor: true
                    },
                    where: { 
                        colaborador,
                        modalidade: _modalidade,
                    },
                    order: {
                        id: "DESC"
                    }
                })
                return res.json(lancamentos)
            }
            
            if (data2 === "*") {
                const lancamentos = await AppDataSource.manager.find(Lancamento, {
                    relations: {
                        colaborador: true,
                        projeto: true,
                        verbas: true,
                        gestor: true
                    },
                    where: { 
                        colaborador,
                        modalidade: _modalidade,
                        data_inicio: MoreThanOrEqual(new Date(data1)),
                    },
                    order: {
                        id: "DESC"
                    }
                })
                return res.json(lancamentos)
            }

            if (data1 === "*") {
                const lancamentos = await AppDataSource.manager.find(Lancamento, {
                    relations: {
                        colaborador: true,
                        projeto: true,
                        verbas: true,
                        gestor: true
                    },
                    where: { 
                        colaborador,
                        modalidade: _modalidade,
                        data_fim: LessThanOrEqual(new Date(data2)),
                    },
                    order: {
                        id: "DESC"
                    }
                })
                return res.json(lancamentos)
            }

            const lancamentos = await AppDataSource.manager.find(Lancamento, {
                relations: {
                    colaborador: true,
                    projeto: true,
                    verbas: true,
                    gestor: true
                },
                where: { 
                    colaborador,
                    modalidade: _modalidade,
                    data_inicio: MoreThanOrEqual(new Date(data1)),
                    data_fim: LessThanOrEqual(new Date(data2))
                },
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

    async todosLancamentosFiltro(req: Request, res: Response) {
        const { matricula, cnpj, numero } = req.params

        try {
            let colaborador = {}
            let cliente = {}
            let cr = {}

            if (matricula !== "*") {
                colaborador = await AppDataSource.manager.findOneBy(Colaborador, { matricula: Number(matricula) })
            }
            if (cnpj !== "*") {
                cliente = await AppDataSource.manager.findOneBy(Cliente, { cnpj })
            }
            if (numero !== "*") {
                cr = await AppDataSource.manager.findOneBy(CR, { numero: Number(numero) })
            }

            const lancamentos = await AppDataSource.manager.find(Lancamento, {
                relations: {
                    colaborador: true,
                    projeto: true,
                    verbas: true,
                    gestor: true
                },
                where: { 
                    colaborador,
                    projeto: {cliente: cliente, cr: cr},
                },
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

    async graficoIndividual(req: Request, res: Response) {
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
                where: {
                    colaborador
                },
                order: {
                    id: "DESC"
                }
            })

            let grafico = []
            const meses = {
                0: "jan",
                1: "fev",
                2: "mar",
                3: "abr",
                4: "mai",
                5: "jun",
                6: "jul",
                7: "ago",
                8: "set",
                9: "out",
                10: "nov",
                11: "dez"
            }

            for (let i=0; i < 12; i++){

                let ano = (new Date(Date.now())).getFullYear()
                let dadosMes = {name: `${meses[i]}/${ano}`, horaextra: 0, sobreaviso: 0}

                let totalMinutosHE = 0
                lancamentos.forEach(
                    (l) => {
                        totalMinutosHE += verificarDadoGrafico1(l, i, ano, "hora extra")
                    }
                )

                dadosMes.horaextra = Math.floor(totalMinutosHE/60)

                let totalMinutosS = 0
                lancamentos.forEach(
                    (l) => {
                        totalMinutosS += verificarDadoGrafico1(l, i, ano, "sobreaviso")
                    }
                )

                dadosMes.sobreaviso = Math.floor(totalMinutosS/60)

                grafico.push(dadosMes)
            }

            return res.json(grafico)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async graficoGeral(req: Request, res: Response) {
        
        try {
            const lancamentos = await AppDataSource.manager.find(Lancamento, {
                relations: {
                    colaborador: true,
                    projeto: true,
                    verbas: true,
                    gestor: true
                },
                order: {
                    id: "DESC"
                }
            })

            let grafico = []
            const meses = {
                0: "jan",
                1: "fev",
                2: "mar",
                3: "abr",
                4: "mai",
                5: "jun",
                6: "jul",
                7: "ago",
                8: "set",
                9: "out",
                10: "nov",
                11: "dez"
            }

            for (let i=0; i < 12; i++){

                let ano = (new Date(Date.now())).getFullYear()
                let dadosMes = {name: `${meses[i]}/${ano}`, horaextra: 0, sobreaviso: 0}

                let totalMinutosHE = 0
                lancamentos.forEach(
                    (l) => {
                        totalMinutosHE += verificarDadoGrafico1(l, i, ano, "hora extra")
                    }
                )

                dadosMes.horaextra = Math.floor(totalMinutosHE/60)

                let totalMinutosS = 0
                lancamentos.forEach(
                    (l) => {
                        totalMinutosS += verificarDadoGrafico1(l, i, ano, "sobreaviso")
                    }
                )

                dadosMes.sobreaviso = Math.floor(totalMinutosS/60)

                grafico.push(dadosMes)
            }

            return res.json(grafico)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async horasTrabalhadasProjeto(req: Request, res: Response){
        const { id, modalidade } = req.params

        try {

            const projeto = await AppDataSource.manager.findOneBy(Projeto, { id: Number(id) })

            const lancamentos = await AppDataSource.manager.find(Lancamento, {
                where: { projeto: projeto },
            })
            
            let totalMinutos = 0
            lancamentos.forEach(
                (l) => {
                    if (l.modalidade.replace(' ', '') == modalidade) {
                        totalMinutos += Math.round((l.data_fim.getTime() - l.data_inicio.getTime()) / 60000)
                        if (l.acionado == 'sim'){
                            totalMinutos += Math.round((l.data_fim2.getTime() - l.data_inicio2.getTime()) / 60000)
                        }
                    }
                }
            )

            const horas = Math.floor(totalMinutos/60)

            return res.json({horas})
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async horasLancamentoVerba(req: Request, res: Response){
        const { matricula, modalidade, numero } = req.params

        try {

            const colaborador = await AppDataSource.manager.findOneBy(Colaborador, { matricula: Number(matricula) })

            const lancamentos = await AppDataSource.manager.find(Lancamento, {
                where: { colaborador: colaborador },
                relations: {verbas: true}
            })

            const verba = await AppDataSource.manager.findOneBy(Verba, { numero: Number(numero) })

            let totalMinutos = 0
            lancamentos.forEach(
                (l) => {
                    const todasVerbas = []
                    l.verbas.forEach(
                        (v) => {
                            todasVerbas.push(v.numero)
                        }
                    )
                    if (todasVerbas.includes(verba.numero)) {
                        if (l.modalidade.replace(' ', '') == modalidade) {
                            totalMinutos += Math.round((l.data_fim.getTime() - l.data_inicio.getTime()) / 60000)
                            if (l.acionado == 'sim'){
                                totalMinutos += Math.round((l.data_fim2.getTime() - l.data_inicio2.getTime()) / 60000)
                            }
                        }
                    }
                }
            )
            const horas = Math.floor(totalMinutos/60)
        
            return res.json({horas})
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

}