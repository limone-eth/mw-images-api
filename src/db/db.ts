import {createConnection} from "typeorm";

export let connect = async () => {
    const connection = await createConnection(process.env.NODE_ENV);
};
