import  Navbar  from "../componentes/topbar"
import React, { useState } from "react";



function Elementos(): JSX.Element{

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

        <div>
            <Navbar/>
            <label style = {{color: 'black', position: 'absolute', top: 160, left: 70, fontSize: 15, fontWeight: 'bold'}}>Código</label>
            <input style = {{backgroundColor: '#D9D9D9', borderColor: '#D9D9D9', position: 'absolute', top: 150, left: 150, fontSize: 15}} type="text" placeholder="Digite el código" className='Input-container' />

            <button className='buttonS' style = {{position: 'absolute', top: 150, left: 600, fontSize: 15, fontWeight: 'bold'}}>Buscar</button>

            <label style = {{color: 'black', position: 'absolute', top: 227, left: 39, fontSize: 15, fontWeight: 'bold'}}>Descripción</label>
            <input style = {{backgroundColor: '#D9D9D9', borderColor: '#D9D9D9', position: 'absolute', top: 220, left: 150, fontSize: 15}} type="text" placeholder="Digite la descripción" className='Input-container' />

            <label style = {{color: 'black', position: 'absolute', top: 287, left: 47, fontSize: 15, fontWeight: 'bold'}}>Ubicación</label>
            <input style = {{backgroundColor: '#D9D9D9', borderColor: '#D9D9D9', position: 'absolute', top: 280, left: 150, fontSize: 15}} type="text" placeholder="Digite la ubicación" className='Input-container' />

            <label style = {{color: 'black', position: 'absolute', top: 347, left: 70, fontSize: 15, fontWeight: 'bold'}}>Área</label>

            <select onChange = {selectChange} className= 'dropdown' style = {{color: 'white', position: 'absolute', top: 340, left: 150, fontSize: 12, fontWeight: 'bold'}}>
                {roles.map((options) => (
                <option style = {{color: 'black', fontWeight: 'bold'}} key={options.label} value={options.value}>
                {options.label}
                </option>
                ))}
                </select>
            
                <button className='buttonS' style = {{position: 'absolute', top: 280, left: 600, fontSize: 15, fontWeight: 'bold'}}>Registrar Elemento</button>

                <button className='buttonS' style = {{position: 'absolute', top: 340, left: 600, fontSize: 15, fontWeight: 'bold'}}>Editar Elemento</button>

                <button className='buttonS' style = {{position: 'absolute', top: 400, left: 600, fontSize: 15, fontWeight: 'bold'}}>Eliminar Elemento</button>

                <button className='buttonS' style = {{position: 'absolute', top: 550, left: 100, fontSize: 15, fontWeight: 'bold'}}>Volver</button>
        </div>
    )


    
}

export default Elementos;