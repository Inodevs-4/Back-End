import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany } from "typeorm"
import { Colaborador } from "./Colaborador"
import { Projeto } from "./Projeto"
import { Verba } from "./Verba"

export type Status = 'aprovado' | 'pendente' | 'reprovado'
export type Modalidade = 'hora extra' | 'sobreaviso'
export type Acionado = 'sim' | 'nao'

@Entity('lancamentos')
export class Lancamento {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "enum", enum:['hora extra', 'sobreaviso'], nullable: false})
    modalidade: Modalidade

    @Column({nullable: false})
    data_inicio: Date

    @Column({nullable: false})
    data_fim: Date

    @Column({nullable: true, type: "text"})
    observacoes: string

    @Column({type: "enum", enum:['sim', 'nao'], default:'nao', nullable: false})
    acionado: Acionado

    @Column({nullable: true})
    data_inicio2: Date

    @Column({nullable: true})
    data_fim2: Date

    @Column({type: "enum", enum:['aprovado', 'pendente', 'reprovado'], default: 'pendente', nullable: false})
    status: Status

	@ManyToOne(() => Colaborador, colaborador => colaborador.lancamentos_colaborador, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'colaborador_id' })
	colaborador: Colaborador

    @ManyToOne(() => Projeto, projeto => projeto.lancamentos, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'projeto_id' })
	projeto: Projeto

	@ManyToMany(() => Verba, verba => verba.lancamentos)
	verbas: Verba[]

    @ManyToOne(() => Colaborador, gestor => gestor.lancamentos_gestor, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'gestor_id' })
	gestor: Colaborador

}