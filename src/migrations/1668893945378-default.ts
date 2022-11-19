import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668893945378 implements MigrationInterface {
    name = 'default1668893945378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "colaboradores" ALTER COLUMN "turno" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "colaboradores" ALTER COLUMN "telefone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "colaboradores" ALTER COLUMN "senha" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "colaboradores" ALTER COLUMN "senha" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "colaboradores" ALTER COLUMN "telefone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "colaboradores" ALTER COLUMN "turno" SET NOT NULL`);
    }

}
