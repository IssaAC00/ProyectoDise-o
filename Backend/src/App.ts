import express, { Application } from 'express'


import area from './Routes/Area'
// import dutyManager from './Routes/DutyManager'
// import estado from './Routes/estado'
import floorType from './Routes/FloorType'
// import inspeccion from './Routes/inspeccion'
// import inspeccionArea from './Routes/inspeccionArea'
// import inspeccionElemento from './Routes/inspeccionElemento'
// import rol from './Routes/rol'
import spolaige from './Routes/Spolaige'
// import typeSpolaige from './Routes/typeSpolaige'
// import typeWork from './Routes/typeWork'
import usuario from './Routes/User'
import element from './Routes/Element'



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
        this.app.use('/area', area);
        // this.app.use('/dutymanager', dutyManager);
        this.app.use('/elemento', element);
        // this.app.use('/estado', estado);
        this.app.use('/floortype', floorType);
        // this.app.use('/inspeccion', inspeccion);
        // this.app.use('/inspeccionArea', inspeccionArea);
        // this.app.use('/inspeccionElemento', inspeccionElemento);
        // this.app.use('/rol', rol);
        this.app.use('/spolaige', spolaige);
        // this.app.use('/typeSpolaige', typeSpolaige);
        // this.app.use('/typeWork', typeWork);
        this.app.use('/usuarios', usuario);
    }


    async listen(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

}