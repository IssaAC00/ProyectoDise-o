import { Form } from '../Model/Form';
import axios from "axios";


class AdminForm{
    private _forms: Form[];
    private daoForm: DAOForm; 

    constructor(){
        this._forms = [];
        this.daoForm = new DAOForm();
    }

    public async load(){
        if (this.daoForm.ready){
            this._forms = await this.daoForm.getForms();
            return this._forms;
        }
        
    }

    public search(id: number): Form{
        for(const form of this._forms){
            if (form.idInspection === id) {
                return form;
            }
        }
        return null!;
    }

    private isForm(form: Form): boolean{
        return this.search(form.idInspection) == null;
    }

    public add(form: Form):boolean{
        if(this.isForm(form)){
            this._forms.push(form);
            this.daoForm.createForm(form);
            return true;
        }
        return false;
    }

    public see(id: number): Form{
        return this.search(id);

    }

    public seeAll(): Form[]{
        return this._forms;
    }

    public modify(form: Form): boolean{
        let areaUpdate = this.isForm(form);
        if(!areaUpdate){
            this._forms.forEach((item, index, arr) => {
                if (item.idInspection === form.idInspection){
                    arr[index] = form;
                }
            });
            this.daoForm.updateForm(form);
            return true;
        }
        return false;
    }


}

class DAOForm{
    private _ready: boolean = true;
    private readonly url = "http://localhost:5001/form";
    constructor(){

    }

    public async getForms() {
        let result = await axios.get(this.url)
        .then(response => {
            this._ready = false;
            return response.data[0].map((formBD: any) => (
                new Form(formBD.idInspection, formBD.idSpolaige, formBD.image, formBD.observation, formBD.recomendation)
            ));
        })
        .catch(error => {
            console.log(error);
        })
        return result;
    }

    private objectTOBD(form: Form){
        return {
            idInspection: form.idInspection,
            idSpolaige: form.idSpolaige,
            image: form.image,
            observation: form.observation,
            recomendation: form.recomendation
        }
    }

    public async createForm(form: Form){
        const formBD = this.objectTOBD(form);
        await axios.post(this.url, formBD);
    }


    public async updateForm(form: Form){
        let updateForm = this.objectTOBD(form);
        await axios.put(this.url + `/${form.idInspection}`, updateForm);
    }

    
    public get ready() : boolean {
        return this._ready;
    }
    
}

export {AdminForm};

