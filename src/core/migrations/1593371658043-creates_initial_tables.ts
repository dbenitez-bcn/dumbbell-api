import {MigrationInterface, QueryRunner} from "typeorm";

export class createsInitialTables1593371658043 implements MigrationInterface {
    name = 'createsInitialTables1593371658043'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "users_account_role_enum" AS ENUM('user', 'operator')`, undefined);
        await queryRunner.query(`CREATE TABLE "users_account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "users_account_role_enum" NOT NULL DEFAULT 'user', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d21c241b703bfa5d860264f1b55" UNIQUE ("username"), CONSTRAINT "UQ_3c04938ce79ae7c4c8246dc92fa" UNIQUE ("email"), CONSTRAINT "PK_17a709b8b6146c491e6615c29d7" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "exercises" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" text NOT NULL, "difficulty" integer NOT NULL, "createdById" uuid, CONSTRAINT "PK_c4c46f5fa89a58ba7c2d894e3c3" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('user', 'operator')`, undefined);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "role" "users_role_enum" NOT NULL DEFAULT 'user', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "FK_9f847dfd076ba00bb1f22d454f3" FOREIGN KEY ("createdById") REFERENCES "users_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_9f847dfd076ba00bb1f22d454f3"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
        await queryRunner.query(`DROP TYPE "users_role_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "exercises"`, undefined);
        await queryRunner.query(`DROP TABLE "users_account"`, undefined);
        await queryRunner.query(`DROP TYPE "users_account_role_enum"`, undefined);
    }

}
