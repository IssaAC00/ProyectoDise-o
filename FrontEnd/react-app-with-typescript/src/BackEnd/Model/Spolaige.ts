class Spolaige{
    private _id: string;
    private _description: string;
    private _type: TypeSpolaige;

    constructor(id: string, description: string, type: TypeSpolaige){
        this._id = id;
        this._description = description;
        this._type = type;
    }

    public get id(){
        return this._id;
    }

    public get description(){
        return this._description;
    }
    
    public get type(){
        return this._type;
    }
}

enum TypeSpolaige{
    Natural,
    Circunstancial
}

export{ Spolaige, TypeSpolaige};