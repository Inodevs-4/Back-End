import { MigrationInterface, QueryRunner } from "typeorm";

export class default1667523428024 implements MigrationInterface {
    name = 'default1667523428024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."clientes_status_enum" AS ENUM('ativo', 'inativo')`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD "status" "public"."clientes_status_enum" NOT NULL DEFAULT 'ativo'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."clientes_status_enum"`);
    }

}
