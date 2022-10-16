import  Navbar  from "../componentes/topbar"
import "./elementos.css"
import React, { useState } from "react";
import { controller } from "../BackEnd/Controller/Controller";
import '../componentes/inputEstiloGlobal.css'
import '../componentes/buttonS.css'



function Elementos(): JSX.Element{

    const [selectedOption, setSelectedOption] = useState<String>();


    const [form, setForm] = useState({
        code: '',
        description: '',
        location: '',
        area: controller.seeAllArea()[0].id,
        PDF: '' 
      });

    const roles = controller.seeAllArea().map( 
      (list) => ({label: list.description, value: list.id}));

    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOption(value);
        console.log(value);
        form.area = value;
      };
    
    function importar (){
      console.log('hola')
    }

    function setFormValues(idE: string, descriptionE: string, locationE: string, areaE: string, PDFE: string){
      setForm({
        code: idE,
        description: descriptionE,
        location: locationE,
        area: areaE,
        PDF: PDFE
      })
    }

    function Register(){
      if( form.code.trim() !== '' && form.description.trim() !== '' && form.location !== ''){
          controller.registerElement(form.code, form.description, [form.PDF], form.location, form.area);
          console.log(form.area);
          setFormValues('','', '', '', form.area);
          alert("Agregado exitosamente")
        }else{
          console.log('No deben existir espacios en blanco');
        }
    }

    function Modify(){
      if( form.code.trim() !== '' && form.description.trim() !== ''){
        controller.modifyElement(form.code, form.description, [form.PDF], form.location, form.area);
        
        setFormValues('','', '', '', form.area);
        alert("Modificado exitosamente")
      }else{
        console.log('No deben existir espacios en blanco');
      }
    }

    function Drop(){
      controller.deleteElement(form.code);
      setFormValues('','', '', '', form.area);
      alert("Eliminado exitosamente")      
    }

    function Search(){
      let element = controller.seeElement(form.code);
      setFormValues(element.id , element.description, element.location,element.images.at(0)?.toString() as string, element.area.id);
      console.log(element);
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [event.target.name]: event.target.value });
    }

    return (

        <div>
            <Navbar/>
            <label style = {{position: 'absolute', top: 200, left: 300, fontSize: 32, fontWeight: 'bold'}}> Código </label>
            <input name = 'code' value={form.code} id = 'code' onChange = {changeHandler}  className='input-global'  style = {{position: 'absolute', top: 150, left: 500, fontSize: 23}} type="text" placeholder="Digite el código"  />

            <label style = {{position: 'absolute', top: 400, left: 300, fontSize: 32, fontWeight: 'bold'}}> Descripción </label>
            <input name = 'description' value={form.description} id = 'description' onChange = {changeHandler}  className='input-global' style = {{position: 'absolute', top: 350, left: 500, fontSize: 23}} type="text" placeholder="Digite la descripción"  />

            <label style = {{position: 'absolute', top: 600, left: 300, fontSize: 32, fontWeight: 'bold'}}> Ubicación </label>
            <input name = 'location' value={form.location} id = 'location' onChange = {changeHandler}  className='input-global' style = {{position: 'absolute', top: 550, left: 500, fontSize: 23}} type="text" placeholder="Digite la ubicacion"  />

            <label style = {{position: 'absolute', top: 800, left: 300, fontSize: 32, fontWeight: 'bold'}}> Area </label>
            <select onChange = {selectChange} value= {form.area} className= 'dropdown'  style = {{position: 'absolute', top: 750, left: 500, fontSize: 23, fontWeight: 'bold'}}>
                {roles.map((options) => (
                <option style = {{color: 'black', fontWeight: 'bold'}} key={options.label} value={options.value}>
                {options.label}
                </option>
                ))}
                </select>
                
                <button  className='buttonS' onClick = {Search} style = {{position: 'absolute', top: 180, left: 1150, fontSize: 23}}>Buscar</button>
                <button  className='buttonS' onClick= {Modify} style = {{position: 'absolute', top: 700, left: 1650, fontSize: 23}}> Editar</button>
                <button  className='buttonS' onClick = {Register} style = {{position: 'absolute', top: 780, left: 1650, fontSize: 23}}>Registrar Area</button>
                <button  className='buttonS' onClick= {Drop} style = {{position: 'absolute', top: 860, left: 1650, fontSize: 23}}>Eliminar Area</button>
                <button  className='buttonS' style = {{position: 'absolute', top: 1100, left: 100, fontSize: 23}}>Volver</button>
                
                <div className='importPDF'  style = {{position: 'absolute', top: 300, left: 1700}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20%" height="40%" fill="currentColor" >
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                </svg>
                <label onClick={importar}>Adjuntar Imagen </label>
                </div>

                <div className='imagenesAdjuntadas' style = {{position: 'absolute', top: 250, left: 1950}}>
                <label style = {{position: 'absolute', top: 15, left: 20, fontSize: 15, fontWeight: 'bold'}}>Imagenes Adjuntadas </label>
                </div>

            
        </div>
    )


    
}

export default Elementos;