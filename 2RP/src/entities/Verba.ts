import { Entity, Column, ManyToMany, JoinTable, PrimaryColumn } from "typeorm"
import { Lancamento } from './Lancamento'

@Entity('verbas')
export class Verba {

	@PrimaryColumn()
    numero: number

    @Column({nullable: false, type: "decimal"})
    adicional: number

    @Column({nullable: false})
    quantidadehoras: number

    @Column({nullable: false})
    inicio: Date

    @Column({nullable: false})
    fim: Date

    @ManyToMany(() => Lancamento, lancamento => lancamento.verbas)
	@JoinTable({
		name: 'lancamento_verba',
		joinColumn: {
			name: 'verba_numero',
			referencedColumnName: 'numero',
		},
		inverseJoinColumn: {
			name: 'lancamento_id',
			referencedColumnName: 'id',
		},
	})
	lancamentos: Lancamento[]

}