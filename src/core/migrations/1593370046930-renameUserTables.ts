import {MigrationInterface, QueryRunner} from "typeorm";

export class renameUserTables1593370046930 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "users_account";`, undefined);
        await queryRunner.query(`ALTER TABLE "exercise_users" RENAME TO "users";`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "exercise_users";`, undefined);
        await queryRunner.query(`ALTER TABLE "users_account" RENAME TO "users";`, undefined);
    }

}
