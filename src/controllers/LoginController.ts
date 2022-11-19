import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Colaborador } from "../entities/Colaborador"
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

export default class LoginController {
    
    async login(req: Request, res: Response) {
        const { email, senha } = req.body;
      
        const usuario: any = await AppDataSource.manager.findOneBy(Colaborador, { email })

        if (!usuario) {
            return res.json({message: "Email inválido!"})
        }

        if (!usuario.senha) {
            return res.json({message: "Email inválido!"})
        }

        const verificarSenha = await bcrypt.compare(senha, usuario.senha)
    
        if (!verificarSenha){
            return res.json({message: "Senha inválida!"})
        }

        const token = jwt.sign({ matricula: usuario.matricula }, process.env.JWT_PASS ?? '', {expiresIn: "8h"})

        const { senha: _, ...usuarioLogin } = usuario

		return res.json({
			usuario: usuarioLogin,
			token: token,
		})
    }

    async loginOauth(req: Request, res: Response) {
        const { email, id, nome } = req.body;

        const newId = id.slice(0,18)
      
        try {
            const usuario: any = await AppDataSource.manager.findOneBy(Colaborador, { email })

            if (!usuario) {
                const novoUsuario = AppDataSource.manager.create(Colaborador, { nome, matricula: Number(newId), email, perfil: 'colaborador'})
                await AppDataSource.manager.save(Colaborador, novoUsuario)
                
                return res.json(novoUsuario)
            }

            return res.json(usuario)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }

    }

    async validateToken(req: Request, res: Response) {
        const { authorization } = req.headers

        if (!authorization) {
            return res.json({message: "Autorização negada!"})
        }
    
        const token = authorization.split(' ')[1]

        try {
            const { matricula } = jwt.verify(token, process.env.JWT_PASS ?? '') as { matricula: number }
    
            const usuario: any = await AppDataSource.manager.findOneBy(Colaborador, { matricula })
         
            if (!usuario) {
                return res.json({message: "Internal Server Error"})
            }
        
            const { senha: _, ...usuarioLogado } = usuario
    
            return res.json(usuarioLogado)
        } catch {
            return res.json({message: "Autorização negada!"})     
        }
    }
}
