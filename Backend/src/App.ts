import express, { Application } from 'express'
import cors from "cors" 
import morgan from "morgan";
import  path  from 'path';

import area from './Routes/Area'
import dutyManager from './Routes/DutyManager'
// import estado from './Routes/estado'
import floorType from './Routes/FloorType'
import inspection from './Routes/Inspection'
// import inspeccionArea from './Routes/inspeccionArea'
// import inspeccionElemento from './Routes/inspeccionElemento'
// import rol from './Routes/rol'
import spolaige from './Routes/Spolaige'
// import typeSpolaige from './Routes/typeSpolaige'
// import typeWork from './Routes/typeWork'
import user from './Routes/User'
import element from './Routes/Element'
import routeMongo from './Routes/RouteMongo';



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
        const options = {
            origin: 'http://localhost:3000',
        }
        this.app.use(cors(options))
        this.app.use(morgan('dev'))        
        this.app.use(express.json());
    }

    
    private routes() {
        this.app.use('/area', area);
        this.app.use('/dutymanager', dutyManager);
        this.app.use('/element', element);
        // this.app.use('/estado', estado);
        this.app.use('/floortype', floorType);
        this.app.use('/inspection', inspection);
        // this.app.use('/inspeccionArea', inspeccionArea);
        // this.app.use('/inspeccionElemento', inspeccionElemento);
        // this.app.use('/rol', rol);
        this.app.use('/spolaige', spolaige);
        // this.app.use('/typeSpolaige', typeSpolaige);
        // this.app.use('/typeWork', typeWork);
        this.app.use('/MongoDB', routeMongo);
        this.app.use('/user', user);
        this.app.use('/uploads', express.static(path.resolve('uploads')))
    }


    async listen(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

}