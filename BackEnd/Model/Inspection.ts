import { _DutyManager } from './DutyManager'
import { _Area } from './Area'
import { _Element } from './Element'

abstract class _Inspection{
    protected _id: number;
    protected _description: string;
    protected _initialDate: Date;
    protected _endDate: Date;
    protected _deliveryDate: Date;
    protected _dutyManager: _DutyManager;
    protected _PDF: string;
    protected _state: State;

    constructor(id: number, description: string, initialDate:Date,
                    endDate: Date, deliveryDate: Date, dutymanager: _DutyManager,
                    PDF: string, state: State){

        this._id = id;
        this._description = description;
        this._initialDate = initialDate;
        this._endDate = endDate;
        this._deliveryDate = deliveryDate;
        this._dutyManager = dutymanager;
        this._PDF = PDF;
        this._state = state;
    }

    public get id(){
        return this._id;
    }

    public get description(){
        return this._description;
    }

    public get initialDate(){
        return this._initialDate;
    }

    public get endDate(){
        return this._endDate;
    }

    public get deliveryDate(){
        return this._deliveryDate;
    }

    public get dutyManager(){
        return this._dutyManager;
    }

    public get PDF(){
        return this._PDF;
    }

    public get state(){
        return this._state;
    }

    public set id(id: number){
        this._id = id;
    }

    public set description(description: string){
        this._description = description;
    }

    public set initialDate(initialDate: Date){
        this._initialDate = initialDate;
    }

    public set endDate(endDate: Date){
        this._endDate = endDate;
    }

    public set deliveryDate(deliveryDate: Date){
        this._deliveryDate = deliveryDate;
    }

    public set dutyManager(dutyManager: _DutyManager){
        this._dutyManager = dutyManager;
    }

    public set PDF(pdf: string){
        this._PDF = pdf;
    }

    public set state(state: State){
        this._state = state;
    }
}

enum State{
    EnEjecucion,
    PorSuceder,
    Retrasada,
    EjecucionConRetraso,
    Ejecutada
}


class InspectionArea extends _Inspection{
    private area: _Area;

    constructor(id: number, description: string, initialDate:Date,
                    endDate: Date, deliveryDate: Date, dutymanager: _DutyManager,
                    PDF: string, state: State, area: _Area){
        super(id, description, initialDate,endDate, deliveryDate, dutymanager,
                PDF, state);

        this.area = area;
            
    }
}

class InspectionElement extends _Inspection{
    private _element: _Element;

    constructor(id: number, description: string, initialDate:Date,
                    endDate: Date, deliveryDate: Date, dutymanager: _DutyManager,
                    PDF: string, state: State, element: _Element){
        super(id, description, initialDate,endDate, deliveryDate, dutymanager,
                PDF, state);

        this._element = element;
            
    }
}


class FactoryInspections{
    public getInspection(): _Inspection{
        //Codigo de la fabrica
        return null!;
    }
}

export { _Inspection, State, InspectionArea, InspectionElement, FactoryInspections};