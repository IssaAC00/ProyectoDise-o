import { connect, createConnection } from 'mongoose'


export async function startTConnection(){
    await createConnection('mongodb+srv://admin:admin@cluster0.cw4inmx.mongodb.net/ImageDesign?retryWrites=true&w=majority').asPromise();
    console.log('database is connected')
    
}

