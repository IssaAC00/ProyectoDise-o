import { FactoryInspections, Inspection, InspectionArea, InspectionElement, State, Form, Register, UploadPDF, PDF} from '../Model/Inspection'
import axios from "axios";
import { AdminDutyManager } from './AdminDutyManger';
import { AdminArea } from './AdminArea';
import { AdminElement } from './AdminElement';
import { DutyManager } from '../Model/DutyManager';

class AdminInspection{
    private _inspections: Inspection[];
    private daoInspection: DAOInspection;

    constructor(){
        this._inspections = [];
        this.daoInspection = new DAOInspection();
    }

    public isForm(inspection: Inspection){
    }

    public createForm(idInspection: number): boolean{
        let inspectForm =  this.search(idInspection);
        if(inspectForm != null && inspectForm.PDF == null){
            inspectForm.PDF = new Form();
            return true;
        }
        return false;
    }

    public addRegister(idInspection: number, register: Register): boolean{
        let inspectForm = this.search(idInspection);
        if(inspectForm != null){
            (inspectForm.PDF as Form).addRegister(register);
        }
        return false;
    }

    public async load(adminDutyManager: AdminDutyManager, adminArea: AdminArea, adminElement: AdminElement){
        this.daoInspection.adminArea = adminArea;
        this.daoInspection.adminDutyManger = adminDutyManager;
        this.daoInspection.adminElement = adminElement;
        if (this.daoInspection.ready){
            // this._inspections = await this.daoInspection.getDutyManager();
            // console.log(this._inspections);

            this._inspections = await this.daoInspection.getDutyManager();
            console.log(this._inspections);
        }
    }

    public search(id: number): Inspection{
        for(const inspection of this._inspections){
            if (inspection.id === id) {
                return inspection;
            }
        }
        return null!;
    }

    private isInspection(inspection: Inspection): boolean{
        return this.search(inspection.id) == null;
    }

    public add(inspection: Inspection):boolean{
        if(this.isInspection(inspection)){
            inspection.updateState();
            this._inspections.push(inspection);
            this.daoInspection.createInspection(inspection);
            return true;
        }
        return false;
    }

    public see(id: number): Inspection{
        let inspection =  this.search(id);
        inspection.updateState();
        return inspection;
    }

    public modify(inspection: Inspection): boolean{
        inspection.updateState();
        console.log(inspection);
        this._inspections.forEach((item, index, arr) => {
            if (item.id === inspection.id){
                arr[index] = inspection;
            }
        });
        this.daoInspection.updateDutyManager(inspection);
        return true;
    }

    public delete(id: number): boolean{
        let inspection = this.search(id);
        this._inspections = this._inspections.filter(item => item !== inspection);
        return true;
    }
    
    public async queryIxS(){
        return this.daoInspection.queryInspectionXState();
    }
}

class DAOInspection{
    private _ready: boolean = true;
    private readonly url = "http://localhost:5001/Inspection";
    private factory: FactoryInspections = new FactoryInspections();
    private _adminArea: AdminArea = null!; 
    private _adminDutyManager: AdminDutyManager = null!;
    private _adminElement: AdminElement = null!;

    constructor(){

    }

    private makeGeneralPdf(nameFile: string): PDF{
        if (nameFile != null!){
            return new UploadPDF(nameFile);
        }
        return null!;
    }

    private async getInspecArea() {
        let result = await axios.get(this.url+"/Area")
        .then(response => {
            this._ready = false;
            return response.data[0].map((iAreaDB: any) => 
                this.factory.getInspection(0, iAreaDB.idInspection, new Date(iAreaDB.InitialDate), new Date(iAreaDB.endDate), new Date(iAreaDB.deliveryDate), this._adminDutyManager.search(iAreaDB.dutyManager), this.makeGeneralPdf(iAreaDB.pdf), iAreaDB.result, iAreaDB.state, this._adminArea.search(iAreaDB.idArea))
            );
        })
        .catch(error => {
            console.log(error);
        })
        return result;
    }

    private async getInspecElement() {
        let result = await axios.get(this.url+"/Element")
        .then(response => {
            this._ready = false;
            return response.data[0].map((iElementDB: any) => 
                this.factory.getInspection(1, iElementDB.idInspection, new Date(iElementDB.InitialDate), new Date(iElementDB.endDate), new Date(iElementDB.deliveryDate), this._adminDutyManager.search(iElementDB.dutyManager), this.makeGeneralPdf(iElementDB.pdf), iElementDB.result, iElementDB.state, this._adminElement.search(iElementDB.idElement))
            );
        })
        .catch(error => {
            console.log(error);
        })
        return result;
    }

    public async getDutyManager() {
        let inspArea: Inspection[];
        let inspElement: Inspection[];
        inspArea = await this.getInspecArea();
        inspElement = await this.getInspecElement();
        let dutymanagers = inspArea.concat(inspElement);
        return dutymanagers;
    }

    private transformeDate(date: Date){
        return date == null ? null 
        : `${date.getFullYear()}/${date.getMonth()+1}/${date.getDay()}`
    }

    private iAreaTOBD(iArea: Inspection){
        return {
            General: {
                idInspection: iArea.id,
                initialDate: this.transformeDate(iArea.initialDate),
                endDate: this.transformeDate(iArea.endDate),
                deliveryDate: this.transformeDate(iArea.deliveryDate),
                pdf: iArea.PDF,
                DutyManager: iArea.dutyManager.id,
                state: iArea.state,
                result: iArea.result},
            Specific: {
                inspeccion_id: iArea.id,
                idArea: (iArea as InspectionArea).area.id
            }
        }
    }

    private iElementTOBD(iElement: Inspection){
        return {
            General: {
                idInspection: iElement.id,
                initialDate: this.transformeDate(iElement.initialDate),
                endDate: this.transformeDate(iElement.endDate),
                deliveryDate: this.transformeDate(iElement.deliveryDate),
                pdf: iElement.PDF,
                DutyManager: iElement.dutyManager.id,
                state: iElement.state,
                result: iElement.result},
            Specific: {
                inspeccion_id: iElement.id,
                idElement: (iElement as InspectionElement).element.id
            }
        }
    }

    public async createInspection(inspection: Inspection){
        if (inspection.constructor.name == "InspectionArea"){
            const inspArea = this.iAreaTOBD(inspection);
            await axios.post(this.url + "/Area", inspArea);
        }else{
            const inspElement = this.iElementTOBD(inspection);
            await axios.post(this.url + "/Element", inspElement);
        }
    }

    public async dropDutyManager(inspection: Inspection){
        if (inspection.constructor.name == "InspectionArea"){
            await axios.delete(this.url + "/Area");
        }else{
            await axios.delete(this.url + "/Element");
        }
    }

    private iAreaTOBDUpdate(iArea: Inspection){
        return {
            General: {
                idInspection: iArea.id,
                initialDate: this.transformeDate(iArea.initialDate),
                endDate: this.transformeDate(iArea.endDate),
                deliveryDate: this.transformeDate(iArea.deliveryDate),
                pdf: iArea.PDF.constructor.name == 'UploadPDF'? (iArea.PDF as UploadPDF).nameFile:
                (iArea.PDF as Form).nameFile,
                DutyManager: iArea.dutyManager.id,
                state: iArea.state,
                result: iArea.result},
            Specific: {
                inspeccion_id: iArea.id,
                idArea: (iArea as InspectionArea).area.id
            }
        }
    }

    private iElementTOBDUpdate(iElement: Inspection){
        return {
            General: {
                idInspection: iElement.id,
                initialDate: this.transformeDate(iElement.initialDate),
                endDate: this.transformeDate(iElement.endDate),
                deliveryDate: this.transformeDate(iElement.deliveryDate),
                pdf: iElement.PDF.constructor.name == 'UploadPDF'? (iElement.PDF as UploadPDF).nameFile:
                (iElement.PDF as Form).nameFile,
                DutyManager: iElement.dutyManager.id,
                state: iElement.state,
                result: iElement.result},
            Specific: {
                inspeccion_id: iElement.id,
                idElement: (iElement as InspectionElement).element.id
            }
        }
    }

    public async updateDutyManager(inspection: Inspection){
        if (inspection.constructor.name == "InspectionArea"){
            const updateInspArea = this.iAreaTOBDUpdate(inspection);
            await axios.put(this.url + `/Area/${inspection.id}`, updateInspArea);
        }else{
            const updateInspElement = this.iElementTOBDUpdate(inspection);
            await axios.put(this.url + `/Element/${inspection.id}`, updateInspElement);
        }
    }

    public async queryInspectionXState(){
        let result = await axios.get(this.url+"/QueryState")
        .then(query => {
            return query.data[0].map((data: any) =>({count: data.count, state: data.state}));
        });
        return result;
    }

    
    public get ready() : boolean {
        return this._ready;
    }

    
    public set adminArea(adminArea : AdminArea) {
        this._adminArea = adminArea;
    }

    
    public set adminElement(adminElement : AdminElement) {
        this._adminElement = adminElement;
    }
    
    
    public set adminDutyManger(adminDutyManager : AdminDutyManager) {
        this._adminDutyManager = adminDutyManager;
    }
    
    
}

export{ AdminInspection };