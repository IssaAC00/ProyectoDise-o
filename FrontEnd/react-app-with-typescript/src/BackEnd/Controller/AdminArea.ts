import { Area } from '../Model/Area'

class AdminArea{
    private _areas: Area[] = [];

    constructor(){}

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

export {AdminArea};