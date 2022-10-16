import React, { useState } from "react";
import  Navbar  from "../componentes/topbar"
import "./areas.css"
import '../componentes/buttonS.css'
import '../componentes/inputEstiloGlobal.css'

function Deterioro (): JSX.Element {


    const [selectedOption, setSelectedOption] = useState<String>();
  
    const techCompanies = [
        { label: "Agente 1", value: '1' },
        { label: "Agente 2", value: '2' },
        { label: "Agente 3", value: '3' },
   
      ];
  


    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOption(value);
        console.log(value);
      };





    return(




        
        <div>
            <Navbar />

            <label style = {{position: 'absolute', top: 200, left: 300, fontSize: 32, fontWeight: 'bold'}}> Código </label>
            <input type="text"  className='input-global'  style = {{position: 'absolute', top: 150, left: 500, fontSize: 32}} />

            <label style = {{position: 'absolute', top: 400, left: 300, fontSize: 32, fontWeight: 'bold'}}> Descripción </label>
            <input type="text"  className='input-global' style = {{position: 'absolute', top: 350, left: 500, fontSize: 23, fontWeight: 'bold'}} />
 

            <label style = {{position: 'absolute', top: 600, left: 300, fontSize: 32, fontWeight: 'bold'}}> Tipo Deterioro </label>
            <select onChange = {selectChange} className= 'dropdown'  style = {{position: 'absolute', top: 578, left: 600, fontSize: 23, fontWeight: 'bold'}}>
            {techCompanies.map((options) => (
            <option key={options.label} value={options.value}>
            {options.label}
            </option>
            ))}
            </select>

            <button  className='buttonS' style = {{position: 'absolute', top: 1100, left: 100, fontSize: 23}}>Volver</button>
            <button  className='buttonS' style = {{position: 'absolute', top: 190, left: 1350, fontSize: 23}}>Buscar</button>

            <button  className='buttonS' style = {{position: 'absolute', top: 700, left: 1650, fontSize: 23}}> Editar</button>
            <button  className='buttonS' style = {{position: 'absolute', top: 780, left: 1650, fontSize: 23}}>Registrar Area</button>
            <button  className='buttonS' style = {{position: 'absolute', top: 860, left: 1650, fontSize: 23}}>Eliminar Area</button>

    
            
            
            
        </div>

    )


}

export default Deterioro;