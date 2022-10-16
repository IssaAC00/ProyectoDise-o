import '../componentes/dropdownS.css'
import  Navbar  from "../componentes/topbar"
import '../componentes/inputEstiloGlobal.css'
import React, { useState } from "react";
import "./areas.css"
import '../componentes/buttonS.css'


function TareasEncargado (): JSX.Element {


    const [selectedOption, setSelectedOption] = useState<String>();
    const [selectedOption2, setSelectedOption2] = useState<String>();
  
    const techCompanies = [
        { label: "Primer Piso", value: '1' },
        { label: "Segundo Piso", value: '2' },
        { label: "Tercer Piso", value: '3' },
        { label: "Cuarto Piso", value: '4' },
        { label: "Sótano", value: '5' },
        { label: "Atico", value: '6' },
      ];


      const techCompanie = [
        { label: "Primer Piso", value: '1' },
        { label: "Segundo Piso", value: '2' },
        { label: "Tercer Piso", value: '3' },
        { label: "Cuarto Piso", value: '4' },
        { label: "Sótano", value: '5' },
        { label: "Atico", value: '6' },
      ];
  
  


    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOption(value);
        console.log(value);
      };


      
    const selectChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOption2(value);
        console.log(value);
      };




    return (
    <div>
        <Navbar />
        
        
        <label style = {{position: 'absolute', top: 200, left: 300, fontSize: 32, fontWeight: 'bold'}}> Encargados </label>
            <select onChange = {selectChange} className= 'dropdown'  style = {{position: 'absolute', top: 250, left: 400, fontSize: 23, fontWeight: 'bold'}}>
            {techCompanies.map((options) => (
            <option key={options.label} value={options.value}>
            {options.label}
            </option>
            ))}
            </select>    

         
        <label style = {{position: 'absolute', top: 400, left: 300, fontSize: 32, fontWeight: 'bold'}}> Estado </label>
            <select onChange = {selectChange2} className= 'dropdown'  style = {{position: 'absolute', top: 450, left: 400, fontSize: 23, fontWeight: 'bold'}}>
            {techCompanie.map((options) => (
            <option key={options.label} value={options.value}>
            {options.label}
            </option>
            ))}
            </select>    
        
        
            <button  className='buttonS' style = {{position: 'absolute', top: 1100, left: 100, fontSize: 23}}>Volver</button>
    
    
    
    </div>
    )

}


export default TareasEncargado;