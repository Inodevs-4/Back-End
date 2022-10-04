import { Entity, Column, OneToMany, PrimaryColumn } from "typeorm"
import { Colaborador } from "./Colaborador"

@Entity('crs')
export class CR {

    @PrimaryColumn()
    numero: number
    
    @Column({length: 100,nullable: false})
    nome: string

    @OneToMany(() => Colaborador, colaborador => colaborador.cr)
	colaboradores: Colaborador[]

}