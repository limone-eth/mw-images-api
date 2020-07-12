import {createConnection} from "typeorm";
import {User} from "./models/User.model";
import {Google} from "./models/Google.model";
import {Image} from "./models/Image.model";

export let connect = async () => {
    const connection = await createConnection({
        "type": "sqlite",
        "database": "database.sqlite",
        "name": "default",
        "synchronize": false,
        "logging": true,
        "migrationsTableName": "custom_migration_table",
        "entities": [
            User, Google, Image
        ],
        "migrations": [
            "src/db/migration/*.ts"
        ],
        "cli": {
            "entitiesDir": "src/db/models",
            "migrationsDir": "src/db/migration"
        }
    });
    connection.driver.afterConnect().then(()=>{
        console.log('connected..')
    });
};
