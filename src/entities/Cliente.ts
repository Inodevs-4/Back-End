import { Entity, Column, OneToMany, PrimaryColumn } from "typeorm"
import { Projeto } from "./Projeto"
export type Status = 'ativo' | 'inativo'

@Entity('clientes')
export class Cliente {

    @PrimaryColumn()
    cnpj: string

    @Column({length: 100, nullable: false})
    nome: string

    @Column({nullable: true, type: "text"})
    contato: string

    @OneToMany(() => Projeto, projeto => projeto.cliente)
	projetos: Projeto[]

    @Column({type: "enum", enum:['ativo', 'inativo'], default: 'ativo', nullable: false})
    status: Status

}