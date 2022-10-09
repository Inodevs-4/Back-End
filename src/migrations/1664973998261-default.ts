import { MigrationInterface, QueryRunner } from "typeorm";

export class default1664973998261 implements MigrationInterface {
    name = 'default1664973998261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."lancamentos_tipo_enum" RENAME TO "lancamentos_tipo_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."lancamentos_tipo_enum" AS ENUM('sim', 'nao')`);
        await queryRunner.query(`ALTER TABLE "lancamentos" ALTER COLUMN "tipo" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "lancamentos" ALTER COLUMN "tipo" TYPE "public"."lancamentos_tipo_enum" USING "tipo"::"text"::"public"."lancamentos_tipo_enum"`);
        await queryRunner.query(`ALTER TABLE "lancamentos" ALTER COLUMN "tipo" SET DEFAULT 'nao'`);
        await queryRunner.query(`DROP TYPE "public"."lancamentos_tipo_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."lancamentos_tipo_enum_old" AS ENUM('continuo', 'escalonado')`);
        await queryRunner.query(`ALTER TABLE "lancamentos" ALTER COLUMN "tipo" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "lancamentos" ALTER COLUMN "tipo" TYPE "public"."lancamentos_tipo_enum_old" USING "tipo"::"text"::"public"."lancamentos_tipo_enum_old"`);
        await queryRunner.query(`ALTER TABLE "lancamentos" ALTER COLUMN "tipo" SET DEFAULT 'continuo'`);
        await queryRunner.query(`DROP TYPE "public"."lancamentos_tipo_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."lancamentos_tipo_enum_old" RENAME TO "lancamentos_tipo_enum"`);
    }

}
