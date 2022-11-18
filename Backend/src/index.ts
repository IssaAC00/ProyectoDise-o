import { App } from './App'
import { startConnection } from './BasesDatos/dbMongo'



async function main() {
    startConnection();
    const app = new App(5001);
    await app.listen();
    
}

main();