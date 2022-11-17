import { FactoryInspections, Inspection, State} from '../Model/Inspection'
import axios from "axios";
import { AdminDutyManager } from './AdminDutyManger';
import { AdminArea } from './AdminArea';
import { AdminElement } from './AdminElement';
import { DutyManager } from '../Model/DutyManager';

class AdminInspection{
    private _inspections: Inspection[];
    private daoInspection: DAOInspection;

    constructor(){
        this._inspections = [];
        this.daoInspection = new DAOInspection();
    }

    public async load(adminDutyManager: AdminDutyManager, adminArea: AdminArea, adminElement: AdminElement){
        this.daoInspection.adminArea = adminArea;
        this.daoInspection.adminDutyManger = adminDutyManager;
        this.daoInspection.adminElement = adminElement;
        if (this.daoInspection.ready){
            // this._inspections = await this.daoInspection.getDutyManager();
            // console.log(this._inspections);

            this._inspections = await this.daoInspection.getDutyManager();
            console.log(this._inspections);
        }
    }

    public search(id: number): Inspection{
        for(const inspection of this._inspections){
            if (inspection.id === id) {
                return inspection;
            }
        }
        return null!;
    }

    public add(inspection: Inspection):boolean{
        this._inspections.push(inspection);
        return true;
    }

    public see(id: number): Inspection{
        return this.search(id);

    }

    public modify(inspection: Inspection): boolean{
        this._inspections.forEach((item, index, arr) => {
            if (item.id === inspection.id){
                arr[index] = inspection;
            }
        });
        return true;
    }

    public delete(id: number): boolean{
        let inspection = this.search(id);
        this._inspections = this._inspections.filter(item => item !== inspection);
        return true;
    }
}

class DAOInspection{
    private _ready: boolean = true;
    private readonly url = "http://localhost:5001/Inspection";
    private factory: FactoryInspections = new FactoryInspections();
    private _adminArea: AdminArea = null!; 
    private _adminDutyManager: AdminDutyManager = null!;
    private _adminElement: AdminElement = null!;

    constructor(){

    }
    
    // private  obtenerSetDuty(setDB: any): Set<TypeWork>{
    //     let setLabor: Set<TypeWork> = new Set();
    //     if (setDB.inspection == 1){
    //         setLabor.add(TypeWork.Inspeccion);
    //     }
    //     if (setDB.conservation == 1){
    //         setLabor.add(TypeWork.Conservacion);
    //     }
    //     if(setDB.restauration == 1){
    //         setLabor.add(TypeWork.Restauracion);
    //     }
    //     return setLabor; 
    // }

    private async getInspecArea() {
        let result = await axios.get(this.url+"/Area")
        .then(response => {
            this._ready = false;
            return response.data[0].map((iAreaDB: any) => 
                this.factory.getInspection(0, iAreaDB.idInspection, iAreaDB.InitialDate, iAreaDB.endDate, iAreaDB.deliveryDate, this._adminDutyManager.search(iAreaDB.dutyManager), iAreaDB.pdf, iAreaDB.result, iAreaDB.state, this._adminArea.search(iAreaDB.idArea))
            );
        })
        .catch(error => {
            console.log(error);
        })
        return result;
    }

    private async getInspecElement() {
        let result = await axios.get(this.url+"/Element")
        .then(response => {
            this._ready = false;
            return response.data[0].map((iElementDB: any) => 
                this.factory.getInspection(1, iElementDB.idInspection, iElementDB.InitialDate, iElementDB.endDate, iElementDB.deliveryDate, this._adminDutyManager.search(iElementDB.dutyManager), iElementDB.pdf, iElementDB.result, iElementDB.state, this._adminElement.search(iElementDB.idElement))
            );
        })
        .catch(error => {
            console.log(error);
        })
        return result;
    }

    public async getDutyManager() {
        let inspArea: Inspection[];
        let inspElement: Inspection[];
        inspArea = await this.getInspecArea();
        inspElement = await this.getInspecElement();
        let dutymanagers = inspArea.concat(inspElement);
        return dutymanagers;
    }

    public async dropDutyManager(){

    }

    public async updateDutyManager(){
        
    }

    
    public get ready() : boolean {
        return this._ready;
    }

    
    public set adminArea(adminArea : AdminArea) {
        this._adminArea = adminArea;
    }

    
    public set adminElement(adminElement : AdminElement) {
        this._adminElement = adminElement;
    }
    
    
    public set adminDutyManger(adminDutyManager : AdminDutyManager) {
        this._adminDutyManager = adminDutyManager;
    }
    
    
}

export{ AdminInspection };