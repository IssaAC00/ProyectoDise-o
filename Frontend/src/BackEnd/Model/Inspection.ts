import { DutyManager, TypeWork } from './DutyManager';
import { Area } from './Area';
import { Element } from './Element';
import { Spolaige } from './Spolaige';

abstract class Inspection{
    protected _id: number;
    protected _initialDate: Date;
    protected _endDate: Date;
    protected _deliveryDate: Date;
    protected _dutyManager: DutyManager;
    protected _PDF: PDF;
    protected _result: TypeWork;
    protected _state: State;

    constructor(id: number, initialDate:Date,
                    endDate: Date, deliveryDate: Date, dutymanager: DutyManager,
                    PDF: PDF, result: TypeWork, state: State){

        this._id = id;
        this._initialDate = initialDate;
        this._endDate = endDate;
        this._deliveryDate = deliveryDate;
        this._dutyManager = dutymanager;
        this._PDF = PDF;
        this._result = result;
        this._state = state;
    }

    public get id(){
        return this._id;
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

    public get result(){
        return this._result;
    }

    public get state(){
        return this._state;
    }

    public set id(id: number){
        this._id = id;
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

    public set PDF(pdf: PDF){
        this._PDF = pdf;
    }

    public set result(result: TypeWork){
        this._result = result;
    }

    public set state(state: State){
        this._state = state;
    }

    public updateState(){
        const dateNow = new Date(Date.now());
        if(dateNow < this.initialDate){
            this.state = State.PorSuceder;
        }else if(this.initialDate <= dateNow && this._endDate >= dateNow && this._deliveryDate == null){
            this.state = State.EnEjecucion;
        }else if(this.initialDate <= dateNow && this._endDate >= dateNow && this._deliveryDate != null){
            this.state = State.Ejecutada;
        }else if(this._endDate < dateNow && this._deliveryDate != null){
            this._state = State.EjecucionConRetraso;
        }else if(this._endDate < dateNow && this._deliveryDate == null){
            this._state = State.Retrasada;
        }
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

    constructor(id: number, initialDate:Date,
                    endDate: Date, deliveryDate: Date, dutymanager: DutyManager,
                    PDF: PDF, result: TypeWork, state: State, area: Area){
        super(id, initialDate,endDate, deliveryDate, dutymanager,
                PDF, result, state);

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

    constructor(id: number, initialDate:Date,
                    endDate: Date, deliveryDate: Date, dutymanager: DutyManager,
                    PDF: PDF, result: TypeWork, state: State, element: Element){
        super(id, initialDate,endDate, deliveryDate, dutymanager,
                PDF, result, state);

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
    public getInspection(choiceInspection: number, id: number, iDate:Date,
        eDate: Date, dDate: Date, dutymanager: DutyManager,
        PDF: PDF, result: TypeWork, state: State, objectInspect: Element|Area): Inspection{
        switch (choiceInspection) {
            case 0:
                return new InspectionArea(id, iDate, eDate, dDate, dutymanager, PDF, result, state, objectInspect as Area);
            case 1:
                return new InspectionElement(id, iDate, eDate, dDate, dutymanager, PDF, result, state, objectInspect as Element);
            default:
                return null!;
        }
    }
}

interface PDF{
    attachPDF(): String;
}

class UploadPDF implements PDF{
    attachPDF(): String {
        return '';
    }
}

class Form implements PDF{
    private _register: Register[] = [];

    constructor(){
    }

    public attachPDF(): String {
        return '';
    }

    public addRegister(register: Register){
        this._register.push(register);
    }
}

class Register{
    private _spolaige: Spolaige;
    private _image: string;
    private _observation: string;
    private _description: string;

    constructor(spolaige: Spolaige, image: string, observation: string, description: string){
        this._spolaige = spolaige;
        this._image = image;
        this._observation = observation;
        this._description = description;
    }

    public get spolaige() : Spolaige {
        return this._spolaige;
    }

    
    public get image() : string {
        return this._image;
    }

    
    public get observation() : string {
        return this._observation;
    }

    
    public get description() : string {
        return this._description;
    }
}

export type{PDF};
export { Inspection, State, InspectionArea, InspectionElement, FactoryInspections, Form, Register};