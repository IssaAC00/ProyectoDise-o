class Area {
    private _id: string;
    private _description: string;
    private _images: string[];
    private _location: string;
    private _floor: Floor;

    constructor(id: string, description: string, images: string[], location: string, floor: Floor){
        this._id = id;
        this._description =description;
        this._images = images;
        this._location = location;
        this._floor = floor; 
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

    public get floor(){
        return this._floor;
    }

    public set id(id: string){
        this._id = id;
    }

    public set description(description: string){
        this._description = description;
    }

    public set images(images: string[]){
        this._images = images;
    }

    public set location(location: string){
        this._location = location;
    }

    public set floor(floor: Floor){
        this._floor = floor;
    }

    // public toString(): string{
    //     return `id = ${this._id} , description = ${this._description}, 
    //                 images = ${this._images}, location = ${this._location}`;
    // }
}

enum Floor{
    Primer, Segundo, Tercer,
    Cuarto, Sotano, Atico
}

export { Area, Floor };