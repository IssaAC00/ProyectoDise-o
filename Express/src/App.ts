import express, { Application } from 'express'


import usuario from './Routes/usuarios'




export class App {
    app: Application;

    constructor(
        private port?: number | string
    ) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
       
    }

    private settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    private middlewares() {
    
        this.app.use(express.json());
    }

    
    private routes() {
      
        this.app.use('/usuarios', usuario);
    }


    async listen(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

}