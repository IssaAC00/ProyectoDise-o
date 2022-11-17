import { App } from './App'




async function main() {
    const app = new App(5001);
    await app.listen();
    
}

main();