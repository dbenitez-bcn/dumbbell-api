import {MigrationInterface, QueryRunner} from "typeorm";

export class addsEmailToUsersTable1586980029674 implements MigrationInterface {
    name = 'addsEmailToUsersTable1586980029674'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`, undefined);
    }

}
