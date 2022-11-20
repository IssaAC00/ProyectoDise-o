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
            return this._areas;
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

    private isArea(area: Area): boolean{
        return this.search(area.id) == null;
    }

    public add(area: Area):boolean{
        if(this.isArea(area)){
            this._areas.push(area);
            this.daoArea.createArea(area);
            return true;
        }
        return false;
    }

    public see(id: string): Area{
        return this.search(id);

    }

    public seeAll(): Area[]{
        return this._areas;
    }

    public modify(area: Area): boolean{
        let areaUpdate = this.isArea(area);
        if(!areaUpdate){
            this._areas.forEach((item, index, arr) => {
                if (item.id === area.id){
                    arr[index] = area;
                }
            });
            this.daoArea.updateArea(area);
            return true;
        }
        return false;
    }

    public delete(id: string):boolean{
        let area = this.search(id);
        if(area != null){
            this.daoArea.dropArea(area);
            this._areas = this._areas.filter(item => item !== area);
            return true;
        }
        return false;
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
            return response.data[0].map((areaDB: any) => (
                new Area(areaDB.idArea, areaDB.description, [areaDB.image], areaDB.ubication, areaDB.floorA)
            ));
        })
        .catch(error => {
            console.log(error);
        })
        return result;
    }

    private objectTOBD(area: Area){
        return {
            idArea: area.id,
            description: area.description,
            image: area.images[0],
            ubication: area.location,
            floorA: area.floor
        }
    }

    public async createArea(area: Area){
        const areaDB = this.objectTOBD(area);
        await axios.post(this.url, areaDB);
    }

    public async dropArea(area: Area){
        await axios.delete(this.url + `/${area.id}`);
    }

    public async updateArea(area: Area){
        let updateArea = this.objectTOBD(area);
        await axios.put(this.url + `/${area.id}`, updateArea);
    }

    
    public get ready() : boolean {
        return this._ready;
    }
    
}

export {AdminArea};