import '../componentes/dropdownS.css'
import  Navbar  from "../componentes/topbar"
import '../componentes/inputEstiloGlobal.css'
import React, { useEffect, useState } from "react";
import "./areas.css"
import '../componentes/buttonS.css'
import { controller } from '../BackEnd/Controller/Controller';
import { Floor } from '../BackEnd/Model/Area';
import { NavLink, useNavigate } from "react-router-dom"


function Areas(): JSX.Element{

    const [selectedOption, setSelectedOption] = useState<string>('0');
    const navigate = useNavigate(); 

    const [form, setForm] = useState({
        code: '',
        description: '',
        address: '',
        PDF: '' 
    });
  
    const techCompanies = [
        { label: "Primer Piso", value: "0" },
        { label: "Segundo Piso", value: "1" },
        { label: "Tercer Piso", value: "2" },
        { label: "Cuarto Piso", value: "3" },
        { label: "Sótano", value:"4" },
        { label: "Atico", value: "5" },
      ];
  
      useEffect(() => {
        controller.loadAreas();
    }, []);

    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOption(value);
      };

      function importar (){
            console.log('hola')

      }

      function Volver (){
        navigate('/');

      }

      function setFormValues(idA: string, descriptionA: string, locationA: string, floorA: string, PDFA: string){
        setForm({
          code: idA,
          description: descriptionA,
          address: locationA,
          PDF: PDFA
        })
        setSelectedOption(floorA);
      }

      function Register (){
        let floor = Number(selectedOption);
        console.log(isNaN(floor));
        if( form.code.trim() !== '' && form.description.trim() !== '' && form.address.trim() !== '' &&
            !isNaN(floor)){
          controller.registerArea(form.code, form.description, [form.PDF], form.address, floor);
          setFormValues('','','', selectedOption,'');
          alert("Area agregada exitosamente")
        }else{
          console.log('No deben existir espacios en blanco');
        }
      }

      function Searh() {
        let areaS = controller.seeArea(form.code);
        if (areaS != null) {
          setFormValues(areaS.id, areaS.description, areaS.location, String(areaS.floor), areaS.images.at(0)?.toString() as string);
        } else {
          alert("No se ha encontrado area con ese código");
          setFormValues(form.code,'','', selectedOption,'');
        }
      }
      
      function Drop() {
        let deleteArea = controller.deleteArea(form.code);
        setFormValues('','','', selectedOption,'');
        // if (deleteAreA) {
        //   setFormValues('', '', '', selectedOption, '');
        //   alert("Area eliminada exitosamente")
        // } else {
        //   alert("No se ha encontado area con ese codigo")
        // }
      }

      function Modify(){
        let floor = Number(selectedOption);
        if( form.code.trim() !== '' && form.description.trim() !== '' && form.address.trim() !== '' &&
            floor !== NaN){
          controller.modifyArea(form.code, form.description, [form.PDF], form.address, floor);
          setFormValues('','','', selectedOption,'');
          alert("Editado exitosamente")
        }else{
          console.log('No deben existir espacios en blanco');
        }
      }

      const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value });
      }



    
    return (
        
        <div>
           <Navbar label="Areas"/>
            <label style = {{position: 'absolute', top: 200, left: 300, fontSize: 32, fontWeight: 'bold'}}> Código </label>
            <input name = 'code' value={form.code} id = 'code' onChange = {changeHandler} type="text"  className='input-global'  style = {{position: 'absolute', top: 150, left: 500, fontSize: 32}} />

            <label style = {{position: 'absolute', top: 400, left: 300, fontSize: 32, fontWeight: 'bold'}}> Descripción </label>
            <input name = 'description' value={form.description} id = 'description' onChange = {changeHandler} type="text"  className='input-global' style = {{position: 'absolute', top: 350, left: 500, fontSize: 23, fontWeight: 'bold'}} />
 
            <label style = {{position: 'absolute', top: 600, left: 300, fontSize: 32, fontWeight: 'bold'}}> Ubicación </label>
            <input name = 'address' value={form.address} id = 'address' onChange = {changeHandler} type="text"  className='input-global' style = {{position: 'absolute', top: 550, left: 500, fontSize: 23, fontWeight: 'bold'}} />

            <label style = {{position: 'absolute', top: 800, left: 300, fontSize: 32, fontWeight: 'bold'}}> Piso </label>
            <select onChange = {selectChange} value= {selectedOption as string}   className= 'dropdown' name= 'floor'  style = {{position: 'absolute', top: 750, left: 500, fontSize: 23, fontWeight: 'bold', color:'white'}}>
            {techCompanies.map((options) => (
            <option key={options.label} value={options.value}>
            {options.label}
            </option>
            ))}
            </select>

            <button  className='buttonS' onClick = {Volver}style = {{position: 'absolute', top: 1100, left: 100, fontSize: 23}}>Volver</button>
            <button  className='buttonS' onClick = {Searh} style = {{position: 'absolute', top: 180, left: 1150, fontSize: 23}}>Buscar</button>
            <button  className='buttonS' onClick= {Modify} style = {{position: 'absolute', top: 700, left: 1650, fontSize: 23}}> Editar</button>
            <button  className='buttonS' onClick = {Register} style = {{position: 'absolute', top: 780, left: 1650, fontSize: 23}}>Registrar Area</button>
            <button  className='buttonS' onClick= {Drop} style = {{position: 'absolute', top: 860, left: 1650, fontSize: 23}}>Eliminar Area</button>




            <div className='importPDF' style = {{position: 'absolute', top: 300, left: 1700}}  >
                
                <svg xmlns="http://www.w3.org/2000/svg" width="20%" height="20%" fill="currentColor" >
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                </svg>
                <label onClick={importar}>Adjuntar Imagen </label>
            </div>    
                
            <input type="text" value={form.PDF} style = {{position: 'absolute',  top: 270, left: 2000, fontSize: 23, fontWeight: 'bold' , height: 200}} />

         
            
        </div>
    )


    
}

export default Areas;