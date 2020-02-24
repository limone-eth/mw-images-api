import {createConnection} from "typeorm";

export let connect = async () => {
    const connection = await createConnection();
};
