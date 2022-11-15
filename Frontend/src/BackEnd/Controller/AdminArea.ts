import { Area } from '../Model/Area'
import axios from "axios";

class AdminArea{
    private _areas: Area[];
    private daoArea: DAOArea; 

    constructor(){
        this._areas = [];
        this.daoArea = new DAOArea();
    }

    public async load(){
        if (this.daoArea.ready){
            this._areas = await this.daoArea.getAreas();
        }
        
    }

    public search(id: string): Area{
        for(const area of this._areas){
            if (area.id === id) {
                return area;
            }
        }
        return null!;
    }

    public add(area: Area):boolean{
        this._areas.push(area);
        return true;
    }

    public see(id: string): Area{
        return this.search(id);

    }

    public seeAll(): Area[]{
        return this._areas;
    }

    public modify(area: Area): boolean{
        this._areas.forEach((item, index, arr) => {
            if (item.id === area.id){
                arr[index] = area;
            }
        });
        return true;
    }

    public delete(id: string):boolean{
        let area = this.search(id);
        this._areas = this._areas.filter(item => item !== area);
        return true;
    }
}

class DAOArea{
    private _ready: boolean = true;
    private readonly url = "http://localhost:5001/Area";
    constructor(){

    }

    public async getAreas() {
        let result = await axios.get(this.url)
        .then(response => {
            this._ready = false;
            console.log(response.data[0]);
            return response.data[0].map((areaDB: any) => (
                new Area(areaDB.idArea, areaDB.description, [areaDB.image], areaDB.ubication, areaDB.floorA)
            ));
        })
        .catch(error => {
            console.log(error);
        })
        return result;
    }

    public async dropArea(){

    }

    public async updateArea(){
        
    }

    
    public get ready() : boolean {
        return this._ready;
    }
    
}

export {AdminArea};