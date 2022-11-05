import { Entity, Column, ManyToMany, JoinTable, PrimaryColumn } from "typeorm"
import { Lancamento } from './Lancamento'

@Entity('verbas')
export class Verba {

	@PrimaryColumn()
    numero: number

    @Column({nullable: false, type: "decimal"})
    adicional: number

    @Column("time",{nullable: false})
    inicio: Date

    @Column("time",{nullable: false})
    fim: Date

	@Column({nullable: false, default:0 })
    evento: number

	@Column({nullable: false})
    periodo: string

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