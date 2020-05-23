import {MigrationInterface, QueryRunner} from "typeorm";

export class addsRoleToUser1590236561987 implements MigrationInterface {
    name = 'addsRoleToUser1590236561987'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('user', 'operator')`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" "users_role_enum" NOT NULL DEFAULT 'user'`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`, undefined);
        await queryRunner.query(`DROP TYPE "users_role_enum"`, undefined);
    }

}
