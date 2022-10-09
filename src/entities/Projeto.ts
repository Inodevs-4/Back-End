import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, OneToOne } from "typeorm"
import { Cliente } from "./Cliente"
import { CR } from "./CR"
import { Lancamento } from "./Lancamento"

export type Status = 'ativo' | 'inativo'

@Entity('projetos')
export class Projeto {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 100, nullable: false})
    nome: string

    @Column({type: "enum", enum:['ativo', 'inativo'], default: 'ativo', nullable: false})
    status: Status
    
    @OneToMany(() => Lancamento, lancamento => lancamento.projeto)
	lancamentos: Lancamento[]

    @ManyToOne(() => Cliente, cliente => cliente.projetos, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'cliente_id' })
	cliente: Cliente

    @OneToOne(() => CR)
    @JoinColumn({ name: 'cr_id' })
    cr: CR
}