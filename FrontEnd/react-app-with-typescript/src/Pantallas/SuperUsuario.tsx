import React from "react";
import './superUsuario.css'
import  Navbar  from "../componentes/TopBarSuperUsuario"



function SuperUsuario(): JSX.Element{
    return (

        <div>
            <Navbar />
            <div>
                <label style = {{color: 'black', position: 'absolute', top: 160, left: 70, fontSize: 15, fontWeight: 'bold'}}>Email</label>
                <input style = {{backgroundColor: '#D9D9D9', borderColor: '#D9D9D9', position: 'absolute', top: 150, left: 150, fontSize: 15}} type="text" placeholder="Digite su Email" className='Input-container' />

                <label style = {{color: 'black', position: 'absolute', top: 220, left: 60, fontSize: 15, fontWeight: 'bold'}}>Nombre</label>
                <input style = {{backgroundColor: '#D9D9D9', borderColor: '#D9D9D9', position: 'absolute', top: 210, left: 150, fontSize: 15}} type="text" placeholder="Digite su nombre" className='Input-container' />

                <label style = {{color: 'black', position: 'absolute', top: 280, left: 40, fontSize: 15, fontWeight: 'bold'}}>Contraseña</label>
                <input style = {{backgroundColor: '#D9D9D9', borderColor: '#D9D9D9', position: 'absolute', top: 270, left: 150, fontSize: 15}} type="text" placeholder="Digite su contraseña" className='Input-Clave' />

                <button className='buttonS' style = {{position: 'absolute', top: 400, left: 180, fontSize: 15, fontWeight: 'bold'}}>Registrar</button>
            </div>
        </div>
    )


    
}

export default SuperUsuario;