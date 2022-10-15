import React from "react";
import  Navbar  from "../componentes/topbar"



function Elementos(): JSX.Element{
    return (

        <div>
            <Navbar/>
            <label style = {{color: 'black', position: 'absolute', top: 160, left: 70, fontSize: 15, fontWeight: 'bold'}}>Código</label>
            <input style = {{backgroundColor: '#D9D9D9', borderColor: '#D9D9D9', position: 'absolute', top: 150, left: 150, fontSize: 15}} type="text" placeholder="Digite el código" className='Input-container' />

            <label style = {{color: 'black', position: 'absolute', top: 227, left: 39, fontSize: 15, fontWeight: 'bold'}}>Descripción</label>
            <input style = {{backgroundColor: '#D9D9D9', borderColor: '#D9D9D9', position: 'absolute', top: 220, left: 150, fontSize: 15}} type="text" placeholder="Digite la descripción" className='Input-container' />

            <label style = {{color: 'black', position: 'absolute', top: 287, left: 47, fontSize: 15, fontWeight: 'bold'}}>Ubicación</label>
            <input style = {{backgroundColor: '#D9D9D9', borderColor: '#D9D9D9', position: 'absolute', top: 280, left: 150, fontSize: 15}} type="text" placeholder="Digite la ubicación" className='Input-container' />

            <label style = {{color: 'black', position: 'absolute', top: 347, left: 70, fontSize: 15, fontWeight: 'bold'}}>Área</label>
        </div>
    )


    
}

export default Elementos;