
import { createPool, Pool } from 'mysql2/promise'

export async function connect(): Promise<Pool> {
    const connection = createPool({
        host: "brt37bqvpt7iezzi5srw-mysql.services.clever-cloud.com",
        user: "uhvkendobxsvqakn",
        password: "BDVuvKqj6S5ruZRU5uBX",
        database: "brt37bqvpt7iezzi5srw"
    });

    console.log(connection);
    return connection;

}