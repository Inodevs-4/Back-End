import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { CR } from "./CR"
import { Lancamento } from "./Lancamento"

export type Perfil = 'administrador' | 'gestor' | 'colaborador'

@Entity('colaboradores')
export class Colaborador {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 100, nullable: false})
    nome: string

    @Column({nullable: false, unique: true})
    matricula: number

    @Column({length: 50, nullable: false})
    turno: string

    @Column({length: 100, nullable:false})
    email: string

    @Column({length: 20, nullable:false})
    telefone: string

    @Column({type: "enum", enum:['administrador', 'gestor', 'colaborador'], default: 'colaborador', nullable: false})
    perfil: Perfil

    @OneToMany(() => Lancamento, lancamento => lancamento.colaborador)
	lancamentos_colaborador: Lancamento[]

    @ManyToOne(() => CR, CR => CR.colaboradores, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'cr_id' })
	cr: CR

    @OneToMany(() => Lancamento, lancamento=> lancamento.gestor)
	lancamentos_gestor: Lancamento[]

}