abstract class DutyManager{
    protected _id: number;
    protected _name: string;
    protected _email: string;
    protected _labor: Set<TypeWork> = new Set<TypeWork>();
    
    constructor(id: number, name: string, email: string, labor: Set<TypeWork>){
        this._id = id;
        this._email = email;
        this._name = name;
        this._labor = labor;
    }

    public get id(){
        return this._id;
    }

    public get email(){
        return this._email;
    }

    public get name(){
        return this._name;
    }

    public get labor(){
        return this._labor;
    }

    public set id(id: number){
        this._id = id;
    }

    public set email(email: string){
        this._email =  email;
    }

    public set name(name: string){
        this._name =  name;
    }

    public set labor(labor: Set<TypeWork>){
        this._labor =  labor;
    }
}

enum TypeWork{
    Restauracion,
    Inspeccion,
    Conservacion
}

class LegalPerson extends DutyManager{
    private _managerName: string;
    private _idManager: number;

    constructor(id: number, name: string, email: string, labor: Set<TypeWork>
                    , managerName: string, idManager: number){
                        super(id, name, email, labor);
                        this._managerName = managerName;
                        this._idManager =  idManager;
    }

    public get managerName(){
        return this._managerName;
    }

    public get idManager(){
        return this._idManager;
    }

    public set managerName(managerName: string){
        this._managerName = managerName;
    }

    public set idManager(idManager: number){
        this._idManager = idManager;
    }
}

class ExternalPerson extends DutyManager{

    constructor(id: number, name: string, email: string, labor: Set<TypeWork>){
                        super(id, name, email, labor);
    }
}

class InternalPerson extends DutyManager{

    constructor(id: number, name: string, email: string, labor: Set<TypeWork>){
                        super(id, name, email, labor);
    }
}

class FactoryDutyManager{
    public getInspection(choiceDuty: number, id: number, name: string, email: string, labor: Set<TypeWork>
                            , managerName?: string, idManager?: number): DutyManager{
        switch (choiceDuty) {
            case 1:
                return new InternalPerson(id, name, email, labor);
            case 2:
                return new ExternalPerson(id, name, email, labor);
            case 3:
                return new LegalPerson(id, name, email, labor, managerName!, idManager!);
            default:
                return null!;
        }
    }
}


export { DutyManager, TypeWork, LegalPerson, InternalPerson, ExternalPerson, FactoryDutyManager}