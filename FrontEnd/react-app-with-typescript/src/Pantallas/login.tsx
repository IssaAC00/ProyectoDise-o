import React, {useState} from 'react';
import './Login.css'
import  Navbar  from "../componentes/TopBarLogin"



   

function login (): JSX.Element {

        return (
            <div>
                <Navbar />
                <div className='login-container' >
                <label>Usuario</label>
                <input type="text" placeholder="Correo" className='Input-container' />
                <label>Contraseña</label>
                <input type="text" placeholder="Contraseña" className='Input-Clave' />
                </div>
            
            </div>



        )

}


export default login;