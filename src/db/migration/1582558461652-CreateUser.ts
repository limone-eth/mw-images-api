import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUser1582558461652 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "first_name",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "last_name",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "email",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "seed",
                    type: "varchar"
                },
                {
                    name: "revoked_tokens",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "role",
                    type: "varchar",
                    isNullable: true
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
        return await queryRunner.dropTable("users");
    }

}
