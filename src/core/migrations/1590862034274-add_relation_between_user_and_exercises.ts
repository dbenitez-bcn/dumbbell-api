import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationBetweenUserAndExercises1590862034274 implements MigrationInterface {
    name = 'addRelationBetweenUserAndExercises1590862034274'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "exercises" ADD "createdById" uuid`, undefined);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "FK_9f847dfd076ba00bb1f22d454f3" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_9f847dfd076ba00bb1f22d454f3"`, undefined);
        await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "createdById"`, undefined);
    }

}
