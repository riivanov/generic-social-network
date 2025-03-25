import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeUserIDUUID1742905972100 implements MigrationInterface {
    name = 'MakeUserIDUUID1742905972100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" DROP DEFAULT`);
    }

}
