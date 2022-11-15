import { Spolaige} from '../Model/Spolaige'

class AdminSpolaige{
    private _spolaiges: Spolaige[] = [];

    constructor(){}

    private search(id: string): Spolaige{
        for(const spolaige of this._spolaiges){
            if (spolaige.id === id) {
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

export{ AdminSpolaige };