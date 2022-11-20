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

    private isElement(element: Element): boolean{
        return this.search(element.id) == null;
    }

    public add(element: Element):boolean{
        if(this.isElement(element)){
            this._elements.push(element);
            this.daoElement.createElement(element);
            console.log("Se ha agregado element")
            return true;
        }
        console.log("No se ha agregado elemento");
        return false;
    }

    public see(id: string): Element{
        return this.search(id);

    }

    public seeAll(): Element[]{
        return this._elements;

    }

    public modify(element: Element):boolean{
        let elementUpdate = this.isElement(element);
        console.log(elementUpdate);
        if(!elementUpdate){
            this._elements.forEach((item, index, arr) => {
                if (item.id === element.id){
                    arr[index] = element;
                }
            });
            this.daoElement.updateElement(element);
            return true;
        }
        return false;
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

    public async queryAreaxElement() {
        let result = await axios.get(this.url+'/Query')
        .then(response => {
            this._ready = false;
            return response.data[0].map((query: any) => ({idArea: query.idArea, idElement: query.idElement}));
        })
        .catch(error => {
            console.log(error);
        })
        return result;
    }
    
    public set adminArea(adminArea : AdminArea) {
        this._adminArea = adminArea;
    }

    private objectTOBD(element: Element){
        return {
            idElement: element.id,
            description: element.description,
            image: element.images[0],
            ubication: element.location,
            areaID: element.area.id
        }
    }

    public async createElement(element: Element){
        const elementDB = this.objectTOBD(element);
        await axios.post(this.url, elementDB);
    }
    

    public async dropElement(element: Element){
        await axios.delete(this.url + `/${element.id}`)
    }

    public async updateElement(element: Element){
        let updateElement =  this.objectTOBD(element);
        await axios.put(this.url + `/${element.id}`, updateElement);
    }

    
    public get ready() : boolean {
        return this._ready;
    }
    
}

export{ AdminElement };