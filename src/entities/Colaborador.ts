import { Entity, Column, OneToMany, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm"
import { CR } from "./CR"
import { Lancamento } from "./Lancamento"

export type Perfil = 'administrador' | 'gestor' | 'colaborador'
export type Status = 'ativo' | 'inativo'

@Entity('colaboradores')
export class Colaborador {

    @PrimaryColumn()
    matricula: number

    @Column({length: 100, nullable: false})
    nome: string

    @Column({length: 50, nullable: false})
    turno: string

    @Column({length: 100, nullable: false})
    email: string

    @Column({length: 20, nullable: false})
    telefone: string

    @Column({length: 255, nullable: false})
    senha: string

    @Column({type: "enum", enum:['administrador', 'gestor', 'colaborador'], default: 'colaborador', nullable: false})
    perfil: Perfil
    
    @Column({type: "enum", enum:['ativo', 'inativo'], default: 'ativo', nullable: false})
    status: Status

    @OneToMany(() => Lancamento, lancamento => lancamento.colaborador)
	lancamentos_colaborador: Lancamento[]

    @ManyToOne(() => CR, CR => CR.colaboradores, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'cr_id' })
	cr: CR

    @OneToMany(() => Lancamento, lancamento=> lancamento.gestor)
	lancamentos_gestor: Lancamento[]

}