import { DutyManager, LegalPerson } from '../Model/DutyManager'

class AdminDutyManager{
    private _dutyManagers: DutyManager[] = [];

    constructor(){}

    public search(id: number): DutyManager{
        for(const dutyManager of this._dutyManagers){
            if (dutyManager.id === id) {
                return dutyManager;
            }
        }
        return null!;
    }

    public add(dutyManager: DutyManager):boolean{
        this._dutyManagers.push(dutyManager);
        return true;
    }

    public see(id: number): DutyManager{
        return this.search(id);

    }

    public modify(dutyManager: DutyManager): boolean{
        this._dutyManagers.forEach((item, index, arr) => {
            if (item.id === dutyManager.id){
                arr[index] = dutyManager;
            }
        });
        return true;
    }

    public delete(id: number):boolean{
        let dutyManager = this.search(id);
        this._dutyManagers = this._dutyManagers.filter(item => item !== dutyManager);
        return true;
    }
}

export{ AdminDutyManager };