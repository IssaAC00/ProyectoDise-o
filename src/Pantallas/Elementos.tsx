import  Navbar  from "../componentes/topbar"
import "./elementos.css"
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
    
    function importar (){
      console.log('hola')
    }

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
                
                <div className='importPDF' style = {{position: 'absolute', top: 430, left: 100, fontSize: 15, fontWeight: 'bold'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20%" height="40%" fill="currentColor" >
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                </svg>
                <label onClick={importar}>Adjuntar Imagen </label>
                </div>

                <div className='imagenesAdjuntadas' style = {{position: 'absolute', top: 430, left: 350, fontSize: 15, fontWeight: 'bold'}}>
                <label style = {{position: 'absolute', top: 15, left: 20, fontSize: 15, fontWeight: 'bold'}}>Imagenes Adjuntadas </label>
                </div>

                <button className='buttonS' style = {{position: 'absolute', top: 550, left: 100, fontSize: 15, fontWeight: 'bold'}}>Volver</button>
        </div>
    )


    
}

export default Elementos;