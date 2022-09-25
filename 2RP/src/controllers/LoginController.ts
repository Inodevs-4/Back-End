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

        const verificarSenha = await bcrypt.compare(senha, usuario.senha)
    
        if (!verificarSenha){
            return res.json({message: "Senha inválida!"})
        }

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_PASS ?? '', {expiresIn: "8h"})

        const { senha: _, ...usuarioLogin } = usuario

		return res.json({
			usuario: usuarioLogin,
			token: token,
		})
    }   

    async validateToken(req: Request, res: Response) {
        const { authorization } = req.headers

        if (!authorization) {
            return res.json({message: "Autorização negada!"})
        }
    
        const token = authorization.split(' ')[1]

        try {
            const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as { id: number }
    
            const usuario: any = await AppDataSource.manager.findOneBy(Colaborador, { id })
         
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
