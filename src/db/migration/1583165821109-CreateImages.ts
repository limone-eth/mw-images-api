import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateImages1583165821109 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.createTable(new Table({
            name: "images",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "key",
                    type: "varchar",
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: "title",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "users_id",
                    type: "bigint",
                    isNullable: false
                },
                {
                    name: "view",
                    type: "boolean",
                    isNullable: true,
                    default: 1
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.dropTable("images");
    }

}
