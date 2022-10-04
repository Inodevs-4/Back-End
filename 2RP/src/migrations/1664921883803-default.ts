import { MigrationInterface, QueryRunner } from "typeorm";

export class default1664921883803 implements MigrationInterface {
    name = 'default1664921883803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "crs" ("numero" integer NOT NULL, "nome" character varying(100) NOT NULL, CONSTRAINT "PK_32d43148cbf786624c69c7b5c67" PRIMARY KEY ("numero"))`);
        await queryRunner.query(`CREATE TABLE "clientes" ("cnpj" character varying NOT NULL, "nome" character varying(100) NOT NULL, "contato" text, CONSTRAINT "PK_bd9bd4df1ccf6f9d83a6f4b26cb" PRIMARY KEY ("cnpj"))`);
        await queryRunner.query(`CREATE TYPE "public"."projetos_status_enum" AS ENUM('ativo', 'inativo')`);
        await queryRunner.query(`CREATE TABLE "projetos" ("id" SERIAL NOT NULL, "nome" character varying(100) NOT NULL, "status" "public"."projetos_status_enum" NOT NULL DEFAULT 'ativo', "cliente_id" character varying, "cr_id" integer, CONSTRAINT "REL_38d6428cb62a75b4d9412d5421" UNIQUE ("cr_id"), CONSTRAINT "PK_fb6b6aed4b30e10b976fe8bdf5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "verbas" ("numero" integer NOT NULL, "adicional" numeric NOT NULL, "quantidadehoras" integer NOT NULL, "inicio" TIMESTAMP NOT NULL, "fim" TIMESTAMP NOT NULL, CONSTRAINT "PK_9bf68d6da4591461849bf278eff" PRIMARY KEY ("numero"))`);
        await queryRunner.query(`CREATE TYPE "public"."lancamentos_modalidade_enum" AS ENUM('hora extra', 'sobreaviso')`);
        await queryRunner.query(`CREATE TYPE "public"."lancamentos_tipo_enum" AS ENUM('continuo', 'escalonado')`);
        await queryRunner.query(`CREATE TYPE "public"."lancamentos_status_enum" AS ENUM('aprovado', 'pendente', 'reprovado')`);
        await queryRunner.query(`CREATE TABLE "lancamentos" ("id" SERIAL NOT NULL, "modalidade" "public"."lancamentos_modalidade_enum" NOT NULL, "data_inicio" TIMESTAMP NOT NULL, "data_fim" TIMESTAMP NOT NULL, "observacoes" text, "tipo" "public"."lancamentos_tipo_enum" NOT NULL DEFAULT 'continuo', "data_inicio2" TIMESTAMP, "data_fim2" TIMESTAMP, "status" "public"."lancamentos_status_enum" NOT NULL DEFAULT 'pendente', "colaborador_id" integer, "projeto_id" integer, "gestor_id" integer, CONSTRAINT "PK_863ece961e659a6e426dcff9d90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."colaboradores_perfil_enum" AS ENUM('administrador', 'gestor', 'colaborador')`);
        await queryRunner.query(`CREATE TYPE "public"."colaboradores_status_enum" AS ENUM('ativo', 'inativo')`);
        await queryRunner.query(`CREATE TABLE "colaboradores" ("matricula" integer NOT NULL, "nome" character varying(100) NOT NULL, "turno" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "telefone" character varying(20) NOT NULL, "senha" character varying(255) NOT NULL, "perfil" "public"."colaboradores_perfil_enum" NOT NULL DEFAULT 'colaborador', "status" "public"."colaboradores_status_enum" NOT NULL DEFAULT 'ativo', "cr_id" integer, CONSTRAINT "PK_043b711e86a0002c24ad3abac79" PRIMARY KEY ("matricula"))`);
        await queryRunner.query(`CREATE TABLE "lancamento_verba" ("verba_numero" integer NOT NULL, "lancamento_id" integer NOT NULL, CONSTRAINT "PK_e7537e79edb7c6920605c147063" PRIMARY KEY ("verba_numero", "lancamento_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bc3de46f90c8b901cbc8bf53aa" ON "lancamento_verba" ("verba_numero") `);
        await queryRunner.query(`CREATE INDEX "IDX_0c0a06a0412ab547510f96d744" ON "lancamento_verba" ("lancamento_id") `);
        await queryRunner.query(`ALTER TABLE "projetos" ADD CONSTRAINT "FK_9fecf68c32703585c72b8b8ed9f" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("cnpj") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projetos" ADD CONSTRAINT "FK_38d6428cb62a75b4d9412d54213" FOREIGN KEY ("cr_id") REFERENCES "crs"("numero") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lancamentos" ADD CONSTRAINT "FK_32f2192fa29c9f2c5b28000268d" FOREIGN KEY ("colaborador_id") REFERENCES "colaboradores"("matricula") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lancamentos" ADD CONSTRAINT "FK_92d224d27e4606b5836858bc0fb" FOREIGN KEY ("projeto_id") REFERENCES "projetos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lancamentos" ADD CONSTRAINT "FK_10a929b9af5684c83ae32ae52fd" FOREIGN KEY ("gestor_id") REFERENCES "colaboradores"("matricula") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "colaboradores" ADD CONSTRAINT "FK_0c7e100f44786fb282afaba112d" FOREIGN KEY ("cr_id") REFERENCES "crs"("numero") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lancamento_verba" ADD CONSTRAINT "FK_bc3de46f90c8b901cbc8bf53aa1" FOREIGN KEY ("verba_numero") REFERENCES "verbas"("numero") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lancamento_verba" ADD CONSTRAINT "FK_0c0a06a0412ab547510f96d7443" FOREIGN KEY ("lancamento_id") REFERENCES "lancamentos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lancamento_verba" DROP CONSTRAINT "FK_0c0a06a0412ab547510f96d7443"`);
        await queryRunner.query(`ALTER TABLE "lancamento_verba" DROP CONSTRAINT "FK_bc3de46f90c8b901cbc8bf53aa1"`);
        await queryRunner.query(`ALTER TABLE "colaboradores" DROP CONSTRAINT "FK_0c7e100f44786fb282afaba112d"`);
        await queryRunner.query(`ALTER TABLE "lancamentos" DROP CONSTRAINT "FK_10a929b9af5684c83ae32ae52fd"`);
        await queryRunner.query(`ALTER TABLE "lancamentos" DROP CONSTRAINT "FK_92d224d27e4606b5836858bc0fb"`);
        await queryRunner.query(`ALTER TABLE "lancamentos" DROP CONSTRAINT "FK_32f2192fa29c9f2c5b28000268d"`);
        await queryRunner.query(`ALTER TABLE "projetos" DROP CONSTRAINT "FK_38d6428cb62a75b4d9412d54213"`);
        await queryRunner.query(`ALTER TABLE "projetos" DROP CONSTRAINT "FK_9fecf68c32703585c72b8b8ed9f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0c0a06a0412ab547510f96d744"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bc3de46f90c8b901cbc8bf53aa"`);
        await queryRunner.query(`DROP TABLE "lancamento_verba"`);
        await queryRunner.query(`DROP TABLE "colaboradores"`);
        await queryRunner.query(`DROP TYPE "public"."colaboradores_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."colaboradores_perfil_enum"`);
        await queryRunner.query(`DROP TABLE "lancamentos"`);
        await queryRunner.query(`DROP TYPE "public"."lancamentos_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."lancamentos_tipo_enum"`);
        await queryRunner.query(`DROP TYPE "public"."lancamentos_modalidade_enum"`);
        await queryRunner.query(`DROP TABLE "verbas"`);
        await queryRunner.query(`DROP TABLE "projetos"`);
        await queryRunner.query(`DROP TYPE "public"."projetos_status_enum"`);
        await queryRunner.query(`DROP TABLE "clientes"`);
        await queryRunner.query(`DROP TABLE "crs"`);
    }

}
