import { MigrationInterface, QueryRunner } from "typeorm";

export class default1664133095605 implements MigrationInterface {
    name = 'default1664133095605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "colaboradores" ADD "senha" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "colaboradores" DROP COLUMN "senha"`);
    }

}
