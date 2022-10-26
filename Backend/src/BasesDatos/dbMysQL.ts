
import { createPool, Pool } from 'mysql2/promise'


class MySQL{
    private static instance: MySQL;
    private conn: Pool = null!;
    
    constructor(){
        this.connect();
    }

    public static getInstance(): MySQL{
        if(!MySQL.instance){
            MySQL.instance = new MySQL();
            console.log('Se ha creado singleton MySQL');
        }
        return MySQL.instance;
    }

    private async connect(){
        try{
            const connection = createPool({
                host: "brt37bqvpt7iezzi5srw-mysql.services.clever-cloud.com",
                user: "uhvkendobxsvqakn",
                password: "BDVuvKqj6S5ruZRU5uBX",
                database: "brt37bqvpt7iezzi5srw"
            });
        
            //console.log(connection);
            this.conn = connection;
        }catch(e){
            console.log(e);
        }
    }

    getConnect(): Pool {
        return this.conn;
    }  
}

export {MySQL}

