import { DutyManager } from './DutyManager'
import { Area } from './Area'
import { Element } from './Element'

abstract class Inspection{
    protected _id: number;
    protected _description: string;
    protected _initialDate: Date;
    protected _endDate: Date;
    protected _deliveryDate: Date;
    protected _dutyManager: DutyManager;
    protected _PDF: string;
    protected _state: State;

    constructor(id: number, description: string, initialDate:Date,
                    endDate: Date, deliveryDate: Date, dutymanager: DutyManager,
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

    public set dutyManager(dutyManager: DutyManager){
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


class InspectionArea extends Inspection{
    private _area: Area;

    constructor(id: number, description: string, initialDate:Date,
                    endDate: Date, deliveryDate: Date, dutymanager: DutyManager,
                    PDF: string, state: State, area: Area){
        super(id, description, initialDate,endDate, deliveryDate, dutymanager,
                PDF, state);

        this._area = area;
            
    }

    public get area(){
        return this._area;
    }

    public set area(area: Area){
        this._area = this.area;
    }
}

class InspectionElement extends Inspection{
    private _element: Element;

    constructor(id: number, description: string, initialDate:Date,
                    endDate: Date, deliveryDate: Date, dutymanager: DutyManager,
                    PDF: string, state: State, element: Element){
        super(id, description, initialDate,endDate, deliveryDate, dutymanager,
                PDF, state);

        this._element = element;
            
    }

    public get element(){
        return this._element;
    }

    public set element(element: Element){
        this._element = this.element;
    }


}


class FactoryInspections{
    public getInspection(choiceInspection: number, id: number, description: string, iDate:Date,
        eDate: Date, dDate: Date, dutymanager: DutyManager,
        PDF: string, state: State, objectInspect: Element|Area): Inspection{
        switch (choiceInspection) {
            case 1:
                return new InspectionArea(id, description, iDate, eDate, dDate, dutymanager, PDF, state, objectInspect as Area);
            case 2:
                return new InspectionElement(id, description, iDate, eDate, dDate, dutymanager, PDF, state, objectInspect as Element);
            default:
                return null!;
        }
    }
}

export { Inspection, State, InspectionArea, InspectionElement, FactoryInspections};