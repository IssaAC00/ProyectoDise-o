import '../componentes/dropdownS.css'
import  Navbar  from "../componentes/topbar"
import '../componentes/inputEstiloGlobal.css'
import React, { useState } from "react";
import "./areas.css"
import '../componentes/buttonS.css'



function Areas(): JSX.Element{

    const [selectedOption, setSelectedOption] = useState<String>();
  
    const techCompanies = [
        { label: "Apple", value: '1' },
        { label: "Facebook", value: '2' },
        { label: "Netflix", value: '3' },
        { label: "Tesla", value: '4' },
        { label: "Amazon", value: '5' },
        { label: "Alphabet", value: '6' },
      ];
  


    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOption(value);
        console.log(value);
      };

      function importar (){
            console.log('hola')

      }

    
    return (
        
        <div>
            <Navbar />
            <label> Código </label>
            <input type="text"  className='input-global' />

            <label> Descripción </label>
            <input type="text"  className='input-global' />

            <label> Ubicación </label>
            <input type="text"  className='input-global' />

            <select onChange = {selectChange} className= 'dropdown'>
            {techCompanies.map((options) => (
            <option key={options.label} value={options.value}>
            {options.label}
            </option>
            ))}
            </select>
            <button  className='buttonS' style = {{position: 'absolute', top: 410, left: 700, fontSize: 23, fontWeight: 'bold'}}>Buscar</button>
            <button  className='buttonS' style = {{position: 'absolute', top: 210, left: 700, fontSize: 23, fontWeight: 'bold'}}> Volver</button>
            <button  className='buttonS' style = {{position: 'absolute', top: 710, left: 700, fontSize: 23, fontWeight: 'bold'}}>Registrar Area</button>
            <button  className='buttonS' style = {{position: 'absolute', top: 810, left: 700, fontSize: 23, fontWeight: 'bold'}}>Eliminar Area</button>
            <button  className='buttonS' style = {{position: 'absolute', top: 610, left: 700, fontSize: 23, fontWeight: 'bold'}}>Volver</button>
            
           


            <div className='importPDF'>
                
                <svg xmlns="http://www.w3.org/2000/svg" width="20%" height="20%" fill="currentColor" >
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                </svg>
                <label onClick={importar}>Adjuntar Imagen </label>
            </div>    
                
            
         
            
        </div>
    )


    
}

export default Areas;