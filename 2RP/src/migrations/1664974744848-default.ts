import { MigrationInterface, QueryRunner } from "typeorm";

export class default1664974744848 implements MigrationInterface {
    name = 'default1664974744848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lancamentos" RENAME COLUMN "tipo" TO "acionado"`);
        await queryRunner.query(`ALTER TYPE "public"."lancamentos_tipo_enum" RENAME TO "lancamentos_acionado_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."lancamentos_acionado_enum" RENAME TO "lancamentos_tipo_enum"`);
        await queryRunner.query(`ALTER TABLE "lancamentos" RENAME COLUMN "acionado" TO "tipo"`);
    }

}
