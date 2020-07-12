import {createConnection} from "typeorm";

export let connect = async () => {
    const connection = await createConnection({
        "type": "sqlite",
        "database": "database.sqlite",
        "name": "default",
        "synchronize": false,
        "logging": true,
        "migrationsTableName": "custom_migration_table",
        "entities": [
            "src/db/models/*.ts"
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
