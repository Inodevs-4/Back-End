import { MigrationInterface, QueryRunner } from "typeorm";

export class default1667675807887 implements MigrationInterface {
    name = 'default1667675807887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "verbas" ADD "evento" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "verbas" ADD "periodo" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "verbas" DROP COLUMN "inicio"`);
        await queryRunner.query(`ALTER TABLE "verbas" ADD "inicio" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "verbas" DROP COLUMN "fim"`);
        await queryRunner.query(`ALTER TABLE "verbas" ADD "fim" TIME NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "verbas" DROP COLUMN "fim"`);
        await queryRunner.query(`ALTER TABLE "verbas" ADD "fim" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "verbas" DROP COLUMN "inicio"`);
        await queryRunner.query(`ALTER TABLE "verbas" ADD "inicio" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "verbas" DROP COLUMN "periodo"`);
        await queryRunner.query(`ALTER TABLE "verbas" DROP COLUMN "evento"`);
    }

}
