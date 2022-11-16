import { Element } from '../Model/Element'
import { AdminArea } from './AdminArea';
import axios from "axios";

class AdminElement{
    private _elements: Element[];
    private daoElement: DAOElement;

    constructor(){
        this._elements = []
        this.daoElement = new DAOElement();
    }

    public async load(adminArea: AdminArea){
        this.daoElement.adminArea = adminArea;
        if (this.daoElement.ready){
            this._elements = await this.daoElement.getElements();
            return this._elements;
        }
    }

    public search(id: string): Element{
        for(const element of this._elements){
            if (element.id === id) {
                return element;
            }
        }
        return null!;
    }

    public add(element: Element):boolean{
        this._elements.push(element);
        return true;
    }

    public see(id: string): Element{
        return this.search(id);

    }

    public seeAll(): Element[]{
        return this._elements;

    }

    public modify(element: Element):boolean{
        this._elements.forEach((item, index, arr) => {
            if (item.id === element.id){
                arr[index] = element;
            }
        });
        return true;
    }

    public delete(id: string):boolean{
        let element = this.search(id);
        this._elements = this._elements.filter(item => item !== element);
        return true;
    }
}

class DAOElement{
    private _ready: boolean = true;
    private readonly url = "http://localhost:5001/Element";
    private _adminArea: AdminArea = null!;

    constructor(){
    }

    public async getElements() {
        let result = await axios.get(this.url)
        .then(response => {
            this._ready = false;
            return response.data[0].map((elementDB: any) => (
                new Element(elementDB.idElement, elementDB.description, [elementDB.image], elementDB.ubication, this._adminArea.search(elementDB.areaID))
            ));
        })
        .catch(error => {
            console.log(error);
        })
        return result;
    }
    
    public set adminArea(adminArea : AdminArea) {
        this._adminArea = adminArea;
    }
    

    public async dropElement(){

    }

    public async updateElement(){
        
    }

    
    public get ready() : boolean {
        return this._ready;
    }
    
}

export{ AdminElement };