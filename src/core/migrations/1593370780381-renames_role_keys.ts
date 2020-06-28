import {MigrationInterface, QueryRunner} from "typeorm";

export class renamesRoleKeys1593370780381 implements MigrationInterface {
    name = 'renamesRoleKeys1593370780381'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum" RENAME TO "users_account_role_enum_old"`, undefined);
        await queryRunner.query(`CREATE TYPE "users_account_role_enum" AS ENUM('user', 'operator')`, undefined);
        await queryRunner.query(`ALTER TABLE "users_account" ALTER COLUMN "role" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "users_account" ALTER COLUMN "role" TYPE "users_account_role_enum" USING "role"::"text"::"users_account_role_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "users_account" ALTER COLUMN "role" SET DEFAULT 'user'`, undefined);
        await queryRunner.query(`DROP TYPE "users_account_role_enum_old"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "users_account_role_enum_old" AS ENUM()`, undefined);
        await queryRunner.query(`ALTER TABLE "users_account" ALTER COLUMN "role" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "users_account" ALTER COLUMN "role" TYPE "users_account_role_enum_old" USING "role"::"text"::"users_account_role_enum_old"`, undefined);
        await queryRunner.query(`ALTER TABLE "users_account" ALTER COLUMN "role" SET DEFAULT 'user'`, undefined);
        await queryRunner.query(`DROP TYPE "users_account_role_enum"`, undefined);
        await queryRunner.query(`ALTER TYPE "users_account_role_enum_old" RENAME TO  "users_role_enum"`, undefined);
    }

}
