import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddBase64ToImages1583503226380 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.addColumn('images', new TableColumn({
            name: "image_base64",
            type: "text",
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.dropColumn('images', 'image_base64');
    }

}
