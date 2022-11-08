import { Entity, Column, OneToMany, PrimaryColumn, OneToOne } from "typeorm"
import { Colaborador } from "./Colaborador"
import { Projeto } from "./Projeto"
export type Status = 'ativo' | 'inativo'

@Entity('crs')
export class CR {

    @PrimaryColumn()
    numero: number
    
    @Column({length: 100,nullable: false})
    nome: string

    @OneToMany(() => Colaborador, colaborador => colaborador.cr)
	colaboradores: Colaborador[]

    @Column({type: "enum", enum:['ativo', 'inativo'], default: 'ativo', nullable: false})
    status: Status

    @OneToOne(() => Projeto, projeto => projeto.cr, { onDelete: 'CASCADE' })
	projeto: Projeto
}