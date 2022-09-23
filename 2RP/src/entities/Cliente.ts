import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Projeto } from "./Projeto"

@Entity('clientes')
export class Cliente {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 100, nullable: false})
    nome: string

    @Column({length: 20, nullable: false, unique: true})
    cnpj: string

    @Column({nullable: true, type: "text"})
    contato: string

    @OneToMany(() => Projeto, projeto => projeto.cliente)
	projetos: Projeto[]

}