import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668893355371 implements MigrationInterface {
    name = 'default1668893355371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lancamentos" DROP CONSTRAINT "FK_32f2192fa29c9f2c5b28000268d"`);
        await queryRunner.query(`ALTER TABLE "lancamentos" DROP CONSTRAINT "FK_10a929b9af5684c83ae32ae52fd"`);
        await queryRunner.query(`ALTER TABLE "lancamentos" DROP COLUMN "colaborador_id"`);
        await queryRunner.query(`ALTER TABLE "lancamentos" ADD "colaborador_id" bigint`);
        await queryRunner.query(`ALTER TABLE "lancamentos" DROP COLUMN "gestor_id"`);
        await queryRunner.query(`ALTER TABLE "lancamentos" ADD "gestor_id" bigint`);
        await queryRunner.query(`ALTER TABLE "colaboradores" DROP CONSTRAINT "PK_043b711e86a0002c24ad3abac79"`);
        await queryRunner.query(`ALTER TABLE "colaboradores" DROP COLUMN "matricula"`);
        await queryRunner.query(`ALTER TABLE "colaboradores" ADD "matricula" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "colaboradores" ADD CONSTRAINT "PK_043b711e86a0002c24ad3abac79" PRIMARY KEY ("matricula")`);
        await queryRunner.query(`ALTER TABLE "lancamentos" ADD CONSTRAINT "FK_32f2192fa29c9f2c5b28000268d" FOREIGN KEY ("colaborador_id") REFERENCES "colaboradores"("matricula") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lancamentos" ADD CONSTRAINT "FK_10a929b9af5684c83ae32ae52fd" FOREIGN KEY ("gestor_id") REFERENCES "colaboradores"("matricula") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lancamentos" DROP CONSTRAINT "FK_10a929b9af5684c83ae32ae52fd"`);
        await queryRunner.query(`ALTER TABLE "lancamentos" DROP CONSTRAINT "FK_32f2192fa29c9f2c5b28000268d"`);
        await queryRunner.query(`ALTER TABLE "colaboradores" DROP CONSTRAINT "PK_043b711e86a0002c24ad3abac79"`);
        await queryRunner.query(`ALTER TABLE "colaboradores" DROP COLUMN "matricula"`);
        await queryRunner.query(`ALTER TABLE "colaboradores" ADD "matricula" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "colaboradores" ADD CONSTRAINT "PK_043b711e86a0002c24ad3abac79" PRIMARY KEY ("matricula")`);
        await queryRunner.query(`ALTER TABLE "lancamentos" DROP COLUMN "gestor_id"`);
        await queryRunner.query(`ALTER TABLE "lancamentos" ADD "gestor_id" integer`);
        await queryRunner.query(`ALTER TABLE "lancamentos" DROP COLUMN "colaborador_id"`);
        await queryRunner.query(`ALTER TABLE "lancamentos" ADD "colaborador_id" integer`);
        await queryRunner.query(`ALTER TABLE "lancamentos" ADD CONSTRAINT "FK_10a929b9af5684c83ae32ae52fd" FOREIGN KEY ("gestor_id") REFERENCES "colaboradores"("matricula") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lancamentos" ADD CONSTRAINT "FK_32f2192fa29c9f2c5b28000268d" FOREIGN KEY ("colaborador_id") REFERENCES "colaboradores"("matricula") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
