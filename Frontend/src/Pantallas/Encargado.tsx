import React, { useEffect, useState } from "react";
import  Navbar  from "../componentes/topbar"
import Checkbox from "../componentes/Checkbox";
import { ExternalPerson, LegalPerson, TypeWork } from "../BackEnd/Model/DutyManager";
import { convertCompilerOptionsFromJson } from "typescript";
import { controller } from "../BackEnd/Controller/Controller";
import id from "date-fns/esm/locale/id/index.js";
import { NavLink, useNavigate } from "react-router-dom"

import graficos  from "../componentes/SegmentChartGrandient";


function Encargado (): JSX.Element {
        const [disabled, setDisabled] = useState(true);
        const navigate = useNavigate(); 

        const [form, setForm] = useState({ 
                id: '',
                name: '',
                email: '',
                managerName: '',
                managerId: ''

            });
            function Volver (){
                navigate('/');
        
              }

        useEffect(() => {
                controller.loadDutyManagers();
        }, []);

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

        function saveCheckButton(){
                let listType: Set<TypeWork> = new Set();
                if(isCheckedA){
                        listType.add(Number(0));
                }else{
                        listType.delete(Number(0));
                }

                if(isCheckedB){
                        listType.add(Number(1));
                }else{
                        listType.delete(Number(1));
                }

                if(isCheckedC){
                        listType.add(Number(2));
                }else{
                        listType.delete(Number(2));
                }
                return listType;
        }
            
        const [selectedOption, setSelectedOption] = useState<string>();
        var options = [{id:'Cedula Juridica',nm:"Cedula Fisica", value:"0", topl: 200, leftl: 1540, top: 0, left: -40 , fontWeight: 'bold' },
        {id:'Cedula Fisica',nm:"Cedula Juridica", value:"1",top: 6 , left: -30,topl: 200, leftl: 1820, fontWeight: 'bold'}];

        function setFormValues(idD: string, typeD: string, nameD: string, emailD: string, managerD: string, managerND: string){
                setForm({
                  id: idD,
                  name: nameD,
                  email:emailD,
                  managerId: managerD,
                  managerName: managerND
        
                })
                setSelectedOption(typeD);
        }
        

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
                        setSelectedOption(value);
                }else{
                        setDisabled(true);
                        setSelectedOption(value);
                        console.log('aqui'+ value);
                }      
         }

        
        const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
                setForm({ ...form, [event.target.name]: event.target.value })
                console.log(form);
        }

        function validarLegal(type: number, id: number, name: string): boolean{
                if(type == 1){
                        if(!isNaN(id) && name !== ''){
                                return true;
                        }
                        return false;
                }
                return true;
        }

        function Register(){
                let listType: Set<TypeWork> = new Set();
                listType = saveCheckButton();
                let typeDuty = Number(selectedOption), idDuty = Number(form.id), managerId = Number(form.managerId);
                if(!isNaN(typeDuty) && !isNaN(idDuty) && form.name.trim() !== '' && validarLegal(typeDuty, managerId, form.name)){
                        controller.registerDutyManager(typeDuty, idDuty, form.name, form.email, listType, 
                                form.managerName, managerId);
                        setFormValues('', selectedOption as string, '','','','');
                        alert('Encargado agregado exitosamente');
                }else{
                        alert('No deben existir espacios en blanco');
                }
        }

        function Search(){
                let duty = controller.seeDutyManager(Number(form.id));
                if(duty !== null){
                        if(duty.constructor.name === 'LegalPerson' && selectedOption == '1'){
                                setFormValues(String(duty.id), selectedOption, duty.name,duty.email, 
                                                String((duty as LegalPerson).idManager), (duty as LegalPerson).managerName);
                        }else if(duty.constructor.name === 'InternalPerson' && selectedOption == '0'){
                                setFormValues(String(duty.id), selectedOption, duty.name,duty.email, '', '');
                        }
                        checkButtonChange(duty.labor);
                } else {
                        alert("No se ha encontrado encarago con esa cedula");
                        setFormValues(form.id, selectedOption as string, '','','', '');
                }
        }

        function Drop(){
                controller.deleteDutyManager(Number(form.id));
                setFormValues('', selectedOption as string, '','','','');
        }

        function Modify(){
                let listType: Set<TypeWork> = new Set();
                listType = saveCheckButton();
                let typeDuty = Number(selectedOption), idDuty = Number(form.id), managerId = Number(form.managerId);
                if(!isNaN(typeDuty) && !isNaN(idDuty) && form.name.trim() !== '' && validarLegal(typeDuty, managerId, form.name)){
                        controller.modifyDutyManager(typeDuty, idDuty, form.name, form.email, listType, 
                                                form.managerName, managerId);
                        setFormValues('', selectedOption as string, '','','','');
                        alert('Encargado modificado exitosamente');
                }else{
                        alert('No deben existir espacios en blanco');
                }
        }


        
      

        return (

            <div> 
                <Navbar label="Encargados"/>

                <label style = {{position: 'absolute', top: 200, left: 300, fontSize: 32, fontWeight: 'bold'}}> C??dula </label>
                <input name = 'id' id = 'id' value= {form.id} onChange = {changeHandler} type="text"  className='input-global'  style = {{position: 'absolute', top: 150, left: 500, fontSize: 32}} />

                <label style = {{position: 'absolute', top: 400, left: 300, fontSize: 32, fontWeight: 'bold'}}> Nombre </label>
                <input name = 'name' id = 'name' value= {form.name} onChange = {changeHandler} type="text"  className='input-global' style = {{position: 'absolute', top: 350, left: 500, fontSize: 23, fontWeight: 'bold'}} />
        
                <label style = {{position: 'absolute', top: 600, left: 300, fontSize: 32, fontWeight: 'bold'}}> Email </label>
                <input name = 'email' id = 'email' value= {form.email}  onChange = {changeHandler} type="text"  className='input-global' style = {{position: 'absolute', top: 550, left: 500, fontSize: 23, fontWeight: 'bold'}} />
                
                <label style = {{position: 'absolute', top: 290, left: 1400, fontSize: 32, fontWeight: 'bold'}}> C??dula Encargado</label>
                <input    name = 'managerId' id = 'managerId' value= {form.managerId} onChange = {changeHandler} disabled={disabled} style = {{position: 'absolute', top: 260, left: 1700, fontSize: 20 , height: 105, width:  400}}/>
                <label style = {{position: 'absolute', top: 438, left: 1400, fontSize: 32, fontWeight: 'bold'}}> Nombre Encargado</label>
                <input  name = 'managerName' id = 'managerName' value= {form.managerName} onChange = {changeHandler} style = {{position: 'absolute', top: 395, left: 1700, fontSize: 20 , height: 105, width: 400 }}  disabled={disabled} />


                
                {options.map((item,i) => {
                return (
                <div key={item.id} >
                <label className="radio-inline" style={{position: 'absolute', top:item.topl, left:item.leftl , fontSize: 32 }} >
                <input style={{ position: 'absolute', top:item.top, left:item.left }} type="radio" name="myRadio" onChange={cedulaSelectionHandler} value={item.value} />{item.nm}</label>
                </div>
                );
                })}

                
                <label style = {{position: 'absolute', top: 560, left: 1300, fontSize: 32, fontWeight: 'bold'}}> Labor:  </label>             
                <div style={{ position: 'absolute', top: 600, left: 1400, fontSize:28}}>
                <Checkbox
                handleChange={handleChangeA}
                isChecked={isCheckedA}
                label="Restauraci??n"
                value="0"
                />
                </div>

                <div style={{ position: 'absolute', top: 640, left: 1400, fontSize:28}}>
                <Checkbox
                handleChange={handleChangeB}
                isChecked={isCheckedB}
                label="Inspecci??n"
                value="1"
                />
                </div>

                <div style={{ position: 'absolute', top: 680, left: 1400, fontSize:28}}>
                <Checkbox
                handleChange={handleChangeC}
                isChecked={isCheckedC}
                label="Conservaci??n"
                value="2"
                />
                </div>
                <button onClick={Volver} className='buttonS' style = {{position: 'absolute', top: 1100, left: 100, fontSize: 23}}>Volver</button>
                <button  className='buttonS' onClick= {Modify} style = {{position: 'absolute', top: 700, left: 1650, fontSize: 23}}> Editar</button>
                <button  className='buttonS' onClick= {Register} style = {{position: 'absolute', top: 780, left: 1650, fontSize: 23}}>Registrar </button>
                <button  className='buttonS' onClick= {Drop} style = {{position: 'absolute', top: 860, left: 1650, fontSize: 23}}>Eliminar </button>
                <button  className='buttonS' onClick= {Search} style = {{position: 'absolute', top: 180, left: 1050, fontSize: 23}}>Buscar</button>

               
               
               
               </div>


        )





}


export default Encargado;