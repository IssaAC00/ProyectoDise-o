import './superUsuario.css'
import  Navbar  from "../componentes/TopBarSuperUsuario"
import fondo from '../imagenes/fondo.png';
import React, { useState } from "react";



function SuperUsuario(): JSX.Element{
    
    const [selectedOption, setSelectedOption] = useState<String>();

    const roles = [
        { label: "Administrador", value: '1' },
        { label: "Super", value: '2' },
        { label: "Operativo", value: '3' },
      ];
    
    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOption(value);
        console.log(value);
      };

    return (
        

        <div style = {{backgroundImage:`url(${fondo})`, height: '800px'}}>
            <Navbar />
            <div>
                <label style = {{color: 'black', position: 'absolute', top: 160, left: 70, fontSize: 15, fontWeight: 'bold'}}>Email</label>
                <input style = {{backgroundColor: '#D9D9D9', borderColor: '#D9D9D9', position: 'absolute', top: 150, left: 150, fontSize: 15}} type="text" placeholder="Digite su Email" className='Input-container' />

                <label style = {{color: 'black', position: 'absolute', top: 220, left: 40, fontSize: 15, fontWeight: 'bold'}}>Contraseña</label>
                <input style = {{backgroundColor: '#D9D9D9', borderColor: '#D9D9D9', position: 'absolute', top: 220, left: 150, fontSize: 15}} type="text" placeholder="Digite su contraseña" className='Input-Clave' />

                <select onChange = {selectChange} className= 'dropdown' style = {{color: 'white', position: 'absolute', top: 300, left: 170, fontSize: 12, fontWeight: 'bold'}}>
                {roles.map((options) => (
                <option style = {{color: 'black', fontWeight: 'bold'}} key={options.label} value={options.value}>
                {options.label}
                </option>
                ))}
                </select>

                <button className='buttonS' style = {{position: 'absolute', top: 370, left: 190, fontSize: 15, fontWeight: 'bold'}}>Registrar</button>
            </div>
        </div>
    )


    
}

export default SuperUsuario;