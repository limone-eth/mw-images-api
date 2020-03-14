import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateGoogleTable1584199275345 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.createTable(new Table({
            name: "googles",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isNullable: true
                },
                {
                    name: "alg",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "at_hash",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "aud",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "azp",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "google",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "iss",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "kid",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "sub",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "typ",
                    type: "varchar",
                    isNullable: true
                },
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.dropTable("googles");
    }

}
