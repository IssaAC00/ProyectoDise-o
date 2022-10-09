import {Area} from './Area'

class Element { 
    private _id: string;
    private _description: string;
    private _images: string[];
    private _location: string;
    private _area: Area;

    constructor(id: string, description: string, images: string[], location: string, area: Area){
        this._id = id;
        this._description =description;
        this._images = images;
        this._location = location;
        this._area = area;

    }

    public get id(){
        return this._id;
    }

    public get description(){
        return this._description;
    }

    public get images(){
        return this._images;
    }

    public get location(){
        return this._location;
    }

    public get area(){
        return this._area as Area;
    }

    public set id(id: string){
        this.id = id;
    }

    public set description(description: string){
        this.description = description;
    }

    public set images(images: string[]){
        this._images = images;
    }

    public set location(location: string){
        this._location = location;
    }

    public set area(area: Area){
        this._area = area;
    }
}

export { Element };