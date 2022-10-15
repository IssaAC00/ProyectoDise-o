import { FactoryInspections, Inspection, State} from '../Model/Inspection'

class AdminInspection{
    private _inspections: Inspection[] = [];
    private _factory:FactoryInspections =  new FactoryInspections();

    constructor(){}

    public search(id: number): Inspection{
        for(const inspection of this._inspections){
            if (inspection.id === id) {
                return inspection;
            }
        }
        return null!;
    }

    public add(inspection: Inspection):boolean{
        this._inspections.push(inspection);
        return true;
    }

    public see(id: number): Inspection{
        return this.search(id);

    }

    public modify(inspection: Inspection): boolean{
        this._inspections.forEach((item, index, arr) => {
            if (item.id === inspection.id){
                arr[index] = inspection;
            }
        });
        return true;
    }

    public delete(id: number): boolean{
        let inspection = this.search(id);
        this._inspections = this._inspections.filter(item => item !== inspection);
        return true;
    }
}

export{ AdminInspection };