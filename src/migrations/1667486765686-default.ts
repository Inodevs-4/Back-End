import { MigrationInterface, QueryRunner } from "typeorm";

export class default1667486765686 implements MigrationInterface {
    name = 'default1667486765686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."crs_status_enum" AS ENUM('ativo', 'inativo')`);
        await queryRunner.query(`ALTER TABLE "crs" ADD "status" "public"."crs_status_enum" NOT NULL DEFAULT 'ativo'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "crs" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."crs_status_enum"`);
    }

}
