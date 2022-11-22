import React, { useEffect, useState } from "react";
import  Navbar  from "../componentes/topbar"
import "./areas.css"
import '../componentes/buttonS.css'
import '../componentes/inputEstiloGlobal.css'
import { controller } from '../BackEnd/Controller/Controller'
import { Spolaige } from '../BackEnd/Model/Spolaige'
import { NavLink, useNavigate } from "react-router-dom"



import  GraficaEncargado  from "../componentes/SegmentChartGrandient"


function Deterioro (): JSX.Element {


    const [selectedOption, setSelectedOption] = useState<string>('0');
    const navigate = useNavigate(); 
    const techCompanies = [
        { label: "Natural", value: '0' },
        { label: "Circunstancial", value: '1' },
   
      ];

      const [form, setForm] = useState({
        code: '',
        description: ''
      });
  
    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOption(value);
    };

    function setFormValues(idS: string, descriptionS: string, rolS: string){
      setForm({
        code: idS,
        description: descriptionS
      })
      setSelectedOption(rolS);
    }

  useEffect(() => {
    controller.loadSpolaige();
  }, []);

    function Volver (){
      navigate('/');

    }

    function Register(){
      let type = Number(selectedOption);
      if( form.code.trim() !== '' && form.description.trim() !== ''){
          controller.registerPolaige(form.code, form.description, type);
          setFormValues('','', selectedOption);
        }else{
          alert('No deben existir espacios en blanco');
        }
    }

    function Modify(){
      let type = Number(selectedOption);
      if(form.description.trim() !== ''){
        controller.modifyPolaige(form.code, form.description, type);
        setFormValues('','', selectedOption);
        alert("Deterioro actulizado exitosamente")
      }else{
        alert('No deben existir espacios en blanco'); 
      }
    }

    function Drop(){
      let deleteS = controller.deleteSpolaige(form.code);
      if (deleteS) {
        setFormValues('','', selectedOption);
        alert("Area eliminada exitosamente")
      } else {
        alert("No se ha encontado area con ese codigo")
      }  
    }

    function Search(){
      let spolaigeS = controller.seePolaige(form.code);
      if (spolaigeS != null) {
        setFormValues(spolaigeS.id , spolaigeS.description, String(spolaigeS.type));
      } else {
        alert("No se ha encontrado area con ese código");
        setFormValues(form.code, '', selectedOption);
      }
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [event.target.name]: event.target.value });
    }

    return(




        
        <div>
           <Navbar label="Deterioro"/>

            <label style = {{position: 'absolute', top: 200, left: 300, fontSize: 32, fontWeight: 'bold'}}> Código </label>
            <input type="text"  name = 'code' value={form.code} id = 'code' onChange = {changeHandler} className='input-global'  style = {{position: 'absolute', top: 150, left: 500, fontSize: 32}} />

            <label style = {{position: 'absolute', top: 400, left: 300, fontSize: 32, fontWeight: 'bold'}}> Descripción </label>
            <input type="text"  name = 'description' value={form.description} id = 'description' onChange = {changeHandler} className='input-global' style = {{position: 'absolute', top: 350, left: 500, fontSize: 23, fontWeight: 'bold'}} />
 

            <label style = {{position: 'absolute', top: 600, left: 300, fontSize: 32, fontWeight: 'bold'}}> Tipo Deterioro </label>
            <select onChange = {selectChange} value={selectedOption} className= 'dropdown'  style = {{position: 'absolute', top: 578, left: 600, fontSize: 23, fontWeight: 'bold', color:'white'}}>
            {techCompanies.map((options) => (
            <option key={options.label} value={options.value}>
            {options.label}
            </option>
            ))}
            </select>

            <button onClick={Volver} className='buttonS' style = {{position: 'absolute', top: 1100, left: 100, fontSize: 23}}>Volver</button>
            <button  className='buttonS' onClick= {Search} style = {{position: 'absolute', top: 190, left: 1350, fontSize: 23}}>Buscar</button>

            <button  className='buttonS' onClick= {Modify} style = {{position: 'absolute', top: 700, left: 1650, fontSize: 23}}> Editar</button>
            <button  className='buttonS' onClick= {Register} style = {{position: 'absolute', top: 780, left: 1650, fontSize: 23}}>Registrar Deterioro</button>
            <button  className='buttonS' onClick= {Drop} style = {{position: 'absolute', top: 860, left: 1650, fontSize: 23}}>Eliminar Deterioro</button>

            <GraficaEncargado></GraficaEncargado> // esto
            

            
        </div>

    )


}

export default Deterioro;