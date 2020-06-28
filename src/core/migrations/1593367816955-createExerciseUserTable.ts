import {MigrationInterface, QueryRunner} from "typeorm";

export class createExerciseUserTable1593367816955 implements MigrationInterface {
    name = 'createExerciseUserTable1593367816955'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "exercise_users_role_enum" AS ENUM('user', 'operator')`, undefined);
        await queryRunner.query(`CREATE TABLE "exercise_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "role" "exercise_users_role_enum" NOT NULL DEFAULT 'user', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6dfa343ede3818d8d7b4f67ebe5" UNIQUE ("username"), CONSTRAINT "PK_1e6d52a8357ed102c238b8a1421" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "exercise_users"`, undefined);
        await queryRunner.query(`DROP TYPE "exercise_users_role_enum"`, undefined);
    }

}
