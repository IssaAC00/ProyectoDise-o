import { DutyManager, ExternalPerson, FactoryDutyManager, LegalPerson, TypeWork } from '../Model/DutyManager'
import axios from "axios";
import { Resquest } from '../Model/User';

class AdminDutyManager{
    private _dutyManagers: DutyManager[] = [];
    private daoDutyManager: DAODutyManager;
    private requests: Resquest[];

    constructor(){
        this._dutyManagers = [];
        this.daoDutyManager =  new DAODutyManager();
        this.requests = [];
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

    private searchRequest(request: Resquest){
        for(const requestList of this.requests){
            if (requestList == request) {
                return requestList;
            }
        }
        return null!;
    }

    public registerRequest(request: Resquest){
        this.requests.push(request);
    }

    public acceptRequest(){
        let voidList = this.requests.length;
        if(voidList != 0){
            this.requests.forEach(data =>{
                data.processRequest();
            });
        }
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
        let updateDuty = this.isDutyManager(dutyManager);
        if(!updateDuty){
            this._dutyManagers.forEach((item, index, arr) => {
                if (item.id === dutyManager.id){
                    arr[index] = dutyManager;
                }
            });
            this.daoDutyManager.updateDutyManager(dutyManager);
            return true;
        }
        return false;
    }

    public delete(id: number):boolean{
        let dutyManager = this.search(id);
        if(dutyManager != null){
            this.daoDutyManager.dropDutyManager(dutyManager);
            this._dutyManagers = this._dutyManagers.filter(item => item !== dutyManager);
            return true;
        }
        return false;
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

    public async dropDutyManager(dutyManager: DutyManager){
        if (dutyManager.constructor.name == "InternalPerson"){
            await axios.delete(this.url + "/internal" + `/${dutyManager.id}`);
        }else{
            await axios.delete(this.url + "/legal"+ `/${dutyManager.id}`);
        }
    }

    public async updateDutyManager(dutyManager: DutyManager){
        if (dutyManager.constructor.name == "InternalPerson"){
            const updateInternal = this.internalTOBD(dutyManager);
            await axios.put(this.url + "/internal" + `/${dutyManager.id}`, updateInternal);
        }else{
            const updateLegal = this.externalTOBD(dutyManager);
            await axios.put(this.url + "/legal" + `/${dutyManager.id}`, updateLegal);
        }
    }

    
    public get ready() : boolean {
        return this._ready;
    }
    
}

export{ AdminDutyManager };