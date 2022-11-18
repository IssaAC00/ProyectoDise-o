import { Spolaige} from '../Model/Spolaige'
import axios from "axios";

class AdminSpolaige{
    private _spolaiges: Spolaige[];
    private daoSpolaige: DAOSpolaige;

    constructor(){
        this._spolaiges = [];
        this.daoSpolaige = new DAOSpolaige(); 
    }

    public async load(){
        if (this.daoSpolaige.ready){
            this._spolaiges = await this.daoSpolaige.getSpolaige();
            return this._spolaiges;
        }
        
    }

    private search(id: string): Spolaige{
        for(const spolaige of this._spolaiges){
            if (spolaige.id == id) {
                return spolaige;
            }
        }
        return null!;
    }

    private isSpolaige(spolaige: Spolaige): boolean{
        return this.search(spolaige.id) == null;
    }

    public add(spolaige: Spolaige): boolean{
        if(this.isSpolaige(spolaige)){
            this._spolaiges.push(spolaige);
            this.daoSpolaige.createSpolaige(spolaige);
            console.log("Se ha agregado Spolaige")
            return true;
        }
        console.log("No se ha agregado");
        return false;
    }

    public see(id: string): Spolaige{
        return this.search(id);
    }

    public modify(spolaige: Spolaige):boolean{
        this._spolaiges.forEach((item, index, arr) => {
            if (item.id === spolaige.id){
                arr[index] = spolaige;
            }
        });
        return true;
    }

    public delete(id: string):boolean{
        let spolaige = this.search(id);
        this._spolaiges = this._spolaiges.filter(item => item !== spolaige);
        return true;
    }
}

class DAOSpolaige{
    private _ready: boolean = true;
    private readonly url = "http://localhost:5001/spolaige";

    constructor(){
    }

    public async getSpolaige() {
        let result = await axios.get(this.url)
        .then(response => {
            this._ready = false;
            return response.data[0].map((spolaigeDB: any) => (
                new Spolaige(spolaigeDB.id, spolaigeDB.description, spolaigeDB.type_typespolaige)
            ));
        })
        .catch(error => {
            console.log(error);
        })
        return result;
    }

    private objectTOBD(spolaige: Spolaige){
        return {
            id: spolaige.id,
            description: spolaige.description,
            type_typespolaige: spolaige.type
        }
    }

    public async createSpolaige(spolaige: Spolaige){
        const spolaigeDB = this.objectTOBD(spolaige);
        console.log(spolaigeDB)
        await axios.post(this.url, spolaigeDB);
    }

    public async dropSpolaige(){

    }

    public async updateSpolaige(){
        
    }

    
    public get ready() : boolean {
        return this._ready;
    }
}

export{ AdminSpolaige };