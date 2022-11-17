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

    public add(spolaige: Spolaige):boolean{
        this._spolaiges.push(spolaige);
        return true;
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

    public async dropSpolaige(){

    }

    public async updateSpolaige(){
        
    }

    
    public get ready() : boolean {
        return this._ready;
    }
}

export{ AdminSpolaige };