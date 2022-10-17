import React, { useState } from "react";
import  Navbar  from "../componentes/topbar"
import Checkbox from "../componentes/Checkbox";
import { ExternalPerson, LegalPerson, TypeWork } from "../BackEnd/Model/DutyManager";
import { convertCompilerOptionsFromJson } from "typescript";
import { controller } from "../BackEnd/Controller/Controller";
import id from "date-fns/esm/locale/id/index.js";




function Encargado (): JSX.Element {
        const [disabled, setDisabled] = useState(true);


        const [form, setForm] = useState({ 
                id: '',
                idtype: '0',
                name: '',
                email: '',
                managerName: '',
                managerId: ''

            });

        
        function setFormValues(idD: string, typeD: string, nameD: string, emailD: string, managerD: string, managerND: string){
                setForm({
                  id: idD,
                  idtype: typeD,
                  name: nameD,
                  email:emailD,
                  managerId: managerD,
                  managerName: managerND
        
                })
        }

        function checkButtonChange(list: Set<TypeWork>){
                if(list.has(0)){
                        setIsCheckedA(true);
                }else{
                        setIsCheckedA(false);
                }

                if(list.has(1)){
                        setIsCheckedB(true);
                }else{
                        setIsCheckedB(false);
                }

                if(list.has(2)){
                        setIsCheckedC(true);
                }else{
                        setIsCheckedC(false);
                }
        }

        function saveCheckButton(listType: Set<TypeWork>){
                if(isCheckedA){
                        listType.add(Number(Puesto));
                }else{
                        listType.delete(Number(Puesto));
                }

                if(isCheckedB){
                        listType.add(Number(Puesto1));
                }else{
                        listType.delete(Number(Puesto1));
                }

                if(isCheckedC){
                        listType.add(Number(Puesto2));
                }else{
                        listType.delete(Number(Puesto2));
                }
        }
            
        const [selectedOption, setSelectedOption] = useState<String>();
        var options = [{id:'Cedula Juridica',nm:"Cedula Fisica", value:"0", topl: 200, leftl: 1540, top: 0, left: -40 },
        {id:'Cedula Fisica',nm:"Cedula Juridica", value:"1",top: 0, left: -40,topl: 200, leftl: 1720}];
        

        const [isCheckedA, setIsCheckedA] = useState(false);
        const [Puesto, setPuesto] = useState<String>();
        const handleChangeA = (e: React.ChangeEvent<HTMLInputElement>) => {
                setIsCheckedA(e.target.checked);
                setPuesto(e.target.value);

        };

        const [isCheckedB, setIsCheckedB] = useState(false);
        const [Puesto1, setPuesto1] = useState<String>();
        const handleChangeB = (e: React.ChangeEvent<HTMLInputElement>) => {
                setIsCheckedB(e.target.checked);
                setPuesto1(e.target.value);
                
        };

        const [isCheckedC, setIsCheckedC] = useState(false);
        const [Puesto2, setPuesto2] = useState<String>();
        const handleChangeC = (e: React.ChangeEvent<HTMLInputElement>) => {
                setIsCheckedC(e.target.checked);
                setPuesto2(e.target.value);
        };
     
     
        function cedulaSelectionHandler(event: React.ChangeEvent<HTMLInputElement>) {
                let value = event.target.value
                setSelectedOption(value);
                if ( value == '1'){
                  setDisabled(false);
                  form.idtype = value;}
                else{
                        setDisabled(true);
                        form.idtype = value;
                        console.log('aqui'+ value);
                }      
         }

        
        const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
                setForm({ ...form, [event.target.name]: event.target.value })
                console.log(form);
        }

        function Register(){
                let listType: Set<TypeWork> = new Set();
                saveCheckButton(listType);
                controller.registerDutyManager(Number(selectedOption), Number(form.id), form.name, form.email, listType, 
                                                form.managerName, Number(form.managerId));
                
                setFormValues('', form.idtype, '','','','');
        }

        function Search(){
                let duty = controller.seeDutyManager(Number(form.id));
                console.log(duty.constructor.name);
                console.log(form.idtype);
                if(duty.constructor.name === 'LegalPerson' && form.idtype == '1'){
                        setFormValues(String(duty.id), form.idtype, duty.name,duty.email, 
                                        String((duty as LegalPerson).idManager), (duty as LegalPerson).managerName);
                }else if(duty.constructor.name === 'InternalPerson' && form.idtype == '0'){
                        console.log('Entro 2');
                        setFormValues(String(duty.id), form.idtype, duty.name,duty.email, '', '');
                }
                checkButtonChange(duty.labor);
        }

        function Drop(){
                controller.deleteDutyManager(Number(form.id));
                setFormValues('', form.idtype, '','','','');
        }

        function Modify(){
                let listType: Set<TypeWork> = new Set();
                saveCheckButton(listType);
        
                controller.modifyDutyManager(Number(selectedOption), Number(form.id), form.name, form.email, listType, 
                                                form.managerName, Number(form.managerId));
                setFormValues('', form.idtype, '','','','');
                
        }


        
      

        return (

            <div> 
                <Navbar />

                <label style = {{position: 'absolute', top: 200, left: 300, fontSize: 32, fontWeight: 'bold'}}> Cédula </label>
                <input name = 'id' id = 'id' value= {form.id} onChange = {changeHandler} type="text"  className='input-global'  style = {{position: 'absolute', top: 150, left: 500, fontSize: 32}} />

                <label style = {{position: 'absolute', top: 400, left: 300, fontSize: 32, fontWeight: 'bold'}}> Nombre </label>
                <input name = 'name' id = 'name' value= {form.name} onChange = {changeHandler} type="text"  className='input-global' style = {{position: 'absolute', top: 350, left: 500, fontSize: 23, fontWeight: 'bold'}} />
        
                <label style = {{position: 'absolute', top: 600, left: 300, fontSize: 32, fontWeight: 'bold'}}> Email </label>
                <input name = 'email' id = 'email' value= {form.email}  onChange = {changeHandler} type="text"  className='input-global' style = {{position: 'absolute', top: 550, left: 500, fontSize: 23, fontWeight: 'bold'}} />
                
                <label style = {{position: 'absolute', top: 250, left: 1400, fontSize: 20, fontWeight: 'bold'}}> Cédula Encargado</label>
                <input  className='input-global'  name = 'managerId' id = 'managerId' value= {form.managerId} onChange = {changeHandler} disabled={disabled} style = {{position: 'absolute', top: 235, left: 1600, fontSize: 20 , height: 45, width: 250}}/>
                <label style = {{position: 'absolute', top: 350, left: 1400, fontSize: 20, fontWeight: 'bold'}}> Nombre Encargado</label>
                <input  className='input-global' name = 'managerName' id = 'managerName' value= {form.managerName} onChange = {changeHandler} style = {{position: 'absolute', top: 335, left: 1600, fontSize: 20 , height: 45, width: 250}}  disabled={disabled} />


                
                {options.map((item,i) => {
                return (
                <div key={item.id} >
                <label className="radio-inline" style={{position: 'absolute', top:item.topl, left:item.leftl , fontSize: 20 }} >
                <input style={{ position: 'absolute', top:item.top, left:item.left }} type="radio" name="myRadio" onChange={cedulaSelectionHandler} value={item.value} />{item.nm}</label>
                </div>
                );
                })}

                
                <label style = {{position: 'absolute', top: 460, left: 1300, fontSize: 32, fontWeight: 'bold'}}> Labor:  </label>             
                <div style={{ position: 'absolute', top: 500, left: 1400, fontSize:28}}>
                <Checkbox
                handleChange={handleChangeA}
                isChecked={isCheckedA}
                label="Restauración"
                value="0"
                />
                </div>

                <div style={{ position: 'absolute', top: 540, left: 1400, fontSize:28}}>
                <Checkbox
                handleChange={handleChangeB}
                isChecked={isCheckedB}
                label="Inspección"
                value="1"
                />
                </div>

                <div style={{ position: 'absolute', top: 580, left: 1400, fontSize:28}}>
                <Checkbox
                handleChange={handleChangeC}
                isChecked={isCheckedC}
                label="Conservación"
                value="2"
                />
                </div>

                <button  className='buttonS' style = {{position: 'absolute', top: 1100, left: 100, fontSize: 23}}>Volver</button>
                <button  className='buttonS' onClick= {Modify} style = {{position: 'absolute', top: 700, left: 1650, fontSize: 23}}> Editar</button>
                <button  className='buttonS' onClick= {Register} style = {{position: 'absolute', top: 780, left: 1650, fontSize: 23}}>Registrar </button>
                <button  className='buttonS' onClick= {Drop} style = {{position: 'absolute', top: 860, left: 1650, fontSize: 23}}>Eliminar </button>
                <button  className='buttonS' onClick= {Search} style = {{position: 'absolute', top: 180, left: 1050, fontSize: 23}}>Buscar</button>

               
               
               
               </div>


        )





}


export default Encargado;