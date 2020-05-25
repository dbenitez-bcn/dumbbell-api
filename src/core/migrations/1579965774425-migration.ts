import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1579965774425 implements MigrationInterface {
    name = 'migration1579965774425'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "exercises" ADD "difficulty" integer NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "difficulty"`, undefined);
    }

}
