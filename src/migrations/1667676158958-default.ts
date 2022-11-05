import { MigrationInterface, QueryRunner } from "typeorm";

export class default1667676158958 implements MigrationInterface {
    name = 'default1667676158958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "verbas" DROP COLUMN "quantidadehoras"`);
        await queryRunner.query(`ALTER TABLE "verbas" ALTER COLUMN "evento" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "verbas" ALTER COLUMN "evento" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "verbas" ADD "quantidadehoras" integer NOT NULL`);
    }

}
