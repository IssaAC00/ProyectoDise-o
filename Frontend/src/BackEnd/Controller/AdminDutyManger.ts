import { DutyManager, ExternalPerson, FactoryDutyManager, LegalPerson, TypeWork } from '../Model/DutyManager'
import axios from "axios";

class AdminDutyManager{
    private _dutyManagers: DutyManager[] = [];
    private daoDutyManager: DAODutyManager;

    constructor(){
        this._dutyManagers = [];
        this.daoDutyManager =  new DAODutyManager();
    }

    public async load(){
        if (this.daoDutyManager.ready){
            this._dutyManagers = await this.daoDutyManager.getDutyManager();
            return this._dutyManagers;
        }
    }

    public search(id: number): DutyManager{
        for(const dutyManager of this._dutyManagers){
            if (dutyManager.id === id) {
                return dutyManager;
            }
        }
        return null!;
    }

    private isDutyManager(duty: DutyManager){
        return this.search(duty.id) == null;
    }

    public add(dutyManager: DutyManager):boolean{
        if(this.isDutyManager(dutyManager)){
            this._dutyManagers.push(dutyManager);
            this.daoDutyManager.createDuty(dutyManager);
            return true;
        }
        return false;
    }

    public see(id: number): DutyManager{
        return this.search(id);

    }

    public seeAll(): DutyManager[]{
        return this._dutyManagers;

    }

    public modify(dutyManager: DutyManager): boolean{
        this._dutyManagers.forEach((item, index, arr) => {
            if (item.id === dutyManager.id){
                arr[index] = dutyManager;
            }
        });
        return true;
    }

    public delete(id: number):boolean{
        let dutyManager = this.search(id);
        this._dutyManagers = this._dutyManagers.filter(item => item !== dutyManager);
        return true;
    }
}

class DAODutyManager{
    private _ready: boolean = true;
    private readonly url = "http://localhost:5001/Dutymanager";
    private factory: FactoryDutyManager = new FactoryDutyManager();
    constructor(){

    }
    
    private  obtenerSetDuty(setDB: any): Set<TypeWork>{
        let setLabor: Set<TypeWork> = new Set();
        if (setDB.inspection == 1){
            setLabor.add(TypeWork.Inspeccion);
        }
        if (setDB.conservation == 1){
            setLabor.add(TypeWork.Conservacion);
        }
        if(setDB.restauration == 1){
            setLabor.add(TypeWork.Restauracion);
        }
        return setLabor; 
    }

    private async getDutyInternal() {
        let result = await axios.get(this.url+"/internal")
        .then(response => {
            this._ready = false;
            return response.data[0].map((dutyDB: any) => (
                this.factory.getInspection(0, dutyDB.DNIManager, dutyDB.name, dutyDB.email, this.obtenerSetDuty(dutyDB))
            ));
        })
        .catch(error => {
            console.log(error);
        })
        return result;
    }

    private async getDutyExternal() {
        let result = await axios.get(this.url+"/legal")
        .then(response => {
            this._ready = false;
            return response.data[0].map((dutyDB: any) => (
                this.factory.getInspection(1, dutyDB.DNIManager, dutyDB.name, dutyDB.email, this.obtenerSetDuty(dutyDB), dutyDB.DNILegalManager, dutyDB.nameLegal)
            ));
        })
        .catch(error => {
            console.log(error);
        })
        return result;
    }

    public async getDutyManager() {
        let dutyInternals: DutyManager[];
        let dutyExternal: DutyManager[];
        dutyInternals = await this.getDutyInternal();
        dutyExternal = await this.getDutyExternal();
        let dutymanagers = dutyInternals.concat(dutyExternal);
        return dutymanagers;
    }

    private internalTOBD(dutyManager: DutyManager){
        return {
            General: {
                DNIManager: dutyManager.id,
                name: dutyManager.name,
                email: dutyManager.email,
                inspection: dutyManager.labor.has(1),
                conservation: dutyManager.labor.has(2),
                restauration: dutyManager.labor.has(0)},
            Specific: {
                DNIManager: dutyManager.id
            }
        }
    }

    private externalTOBD(dutyManager: DutyManager){
        return {
            General: {
                DNIManager: dutyManager.id,
                name: dutyManager.name,
                email: dutyManager.email,
                inspection: dutyManager.labor.has(1),
                conservation: dutyManager.labor.has(2),
                restauration: dutyManager.labor.has(0)},
            Specific: {
                DNIManager: dutyManager.id,
                DNILegalManager: (dutyManager as LegalPerson).idManager,
                nameLegal: (dutyManager as LegalPerson).managerName
            }
        }
    }

    public async createDuty(dutyManager: DutyManager){
        if (dutyManager.constructor.name == "InternalPerson"){
            const internal = this.internalTOBD(dutyManager );
            await axios.post(this.url + "/internal", internal);
        }else{
            const legal = this.externalTOBD(dutyManager);
            await axios.post(this.url + "/legal", legal);
        }
    }

    public async dropDutyManager(){

    }

    public async updateDutyManager(){
        
    }

    
    public get ready() : boolean {
        return this._ready;
    }
    
}

export{ AdminDutyManager };