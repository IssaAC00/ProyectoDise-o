import '../componentes/dropdownS.css'
import  Navbar  from "../componentes/topbar"
import '../componentes/inputEstiloGlobal.css'
import Dropdown from "../componentes/DropdownGlobal"
import React, { useState } from "react";



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
         
            
        </div>
    )


    
}

export default Areas;