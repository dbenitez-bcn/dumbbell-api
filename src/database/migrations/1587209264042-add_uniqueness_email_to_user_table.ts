import {MigrationInterface, QueryRunner} from "typeorm";

export class addUniquenessEmailToUserTable1587209264042 implements MigrationInterface {
    name = 'addUniquenessEmailToUserTable1587209264042'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_772886e2f1f47b9ceb04a06e203" UNIQUE ("username", "email")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_772886e2f1f47b9ceb04a06e203"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`, undefined);
    }

}
