import { MigrationInterface, QueryRunner } from "typeorm";

export class EsquemaInicial1791259851916 implements MigrationInterface {
    name = 'EsquemaInicial1791259851916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Los id son UUID y uuid_generate_v4() vive en esta extension,
        // que Postgres no trae activa por defecto. Sin esta linea la
        // migracion falla en una base recien creada.
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usuario" character varying(60) NOT NULL, "contrasena_hash" character varying NOT NULL, "nombre" character varying(120) NOT NULL, "activo" boolean NOT NULL DEFAULT true, "creado_en" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0790a401b9d234fa921e9aa1777" UNIQUE ("usuario"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "historias" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "visible" boolean NOT NULL DEFAULT true, "creado_en" TIMESTAMP NOT NULL DEFAULT now(), "actualizado_en" TIMESTAMP NOT NULL DEFAULT now(), "tipo" character varying(20) NOT NULL, "nombre" character varying(120) NOT NULL, "detalle" character varying(160) NOT NULL, "testimonio" text NOT NULL, "imagen_url" character varying(500), "orden" integer NOT NULL DEFAULT '0', "actualizado_por_id" uuid, CONSTRAINT "PK_c092d7d4e446c05b48856625d84" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "eventos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "visible" boolean NOT NULL DEFAULT true, "creado_en" TIMESTAMP NOT NULL DEFAULT now(), "actualizado_en" TIMESTAMP NOT NULL DEFAULT now(), "titulo" character varying(200) NOT NULL, "descripcion" text NOT NULL, "categoria" character varying(40) NOT NULL, "formato" character varying(20) NOT NULL, "fecha" date NOT NULL, "fecha_fin" date, "horario" character varying(60) NOT NULL, "sede" character varying(40) NOT NULL, "dirigido_a" character varying(200) NOT NULL, "enlace_registro" character varying(500), "en_inicio" boolean NOT NULL DEFAULT false, "actualizado_por_id" uuid, CONSTRAINT "PK_40d4a3c6a4bfd24280cb97a509e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e0653c190d0a013d605fd0b2d9" ON "eventos" ("categoria") `);
        await queryRunner.query(`CREATE INDEX "IDX_2ace6154323bc44ec760034cff" ON "eventos" ("en_inicio") `);
        await queryRunner.query(`CREATE TABLE "cifras" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "visible" boolean NOT NULL DEFAULT true, "creado_en" TIMESTAMP NOT NULL DEFAULT now(), "actualizado_en" TIMESTAMP NOT NULL DEFAULT now(), "texto" character varying(200) NOT NULL, "orden" integer NOT NULL DEFAULT '0', "actualizado_por_id" uuid, CONSTRAINT "PK_360a280d98e06e9fb2f696220a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "historias" ADD CONSTRAINT "FK_7cdb171745efc5866149e8da9af" FOREIGN KEY ("actualizado_por_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "eventos" ADD CONSTRAINT "FK_89d97eea2451cc597e9bd037ffb" FOREIGN KEY ("actualizado_por_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cifras" ADD CONSTRAINT "FK_9f6f265d57ed730af66a4a428c0" FOREIGN KEY ("actualizado_por_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cifras" DROP CONSTRAINT "FK_9f6f265d57ed730af66a4a428c0"`);
        await queryRunner.query(`ALTER TABLE "eventos" DROP CONSTRAINT "FK_89d97eea2451cc597e9bd037ffb"`);
        await queryRunner.query(`ALTER TABLE "historias" DROP CONSTRAINT "FK_7cdb171745efc5866149e8da9af"`);
        await queryRunner.query(`DROP TABLE "cifras"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2ace6154323bc44ec760034cff"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e0653c190d0a013d605fd0b2d9"`);
        await queryRunner.query(`DROP TABLE "eventos"`);
        await queryRunner.query(`DROP TABLE "historias"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
