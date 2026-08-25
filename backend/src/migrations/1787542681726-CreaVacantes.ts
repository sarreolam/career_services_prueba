import { MigrationInterface, QueryRunner } from "typeorm";

export class CreaVacantes1787542681726 implements MigrationInterface {
    name = 'CreaVacantes1787542681726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vacantes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "titulo" character varying(200) NOT NULL, "empresa" character varying(200) NOT NULL, "descripcion" text, "creadaEn" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a1273f72e3834a05f87ba514ec2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "vacantes"`);
    }

}
