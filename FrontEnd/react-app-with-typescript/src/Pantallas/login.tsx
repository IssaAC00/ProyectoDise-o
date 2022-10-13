import React, {useState} from 'react';
import './Login.css'
import  Navbar  from "../componentes/TopBarLogin"



   

function login (): JSX.Element {

        return (
            <div>
                <Navbar />
                <div className='login-container' >
                <label style = {{color: 'white', position: 'absolute', top: 70, left: 65, fontSize: 23, fontWeight: 'bold'}}>Usuario</label>
                <input type="text" placeholder="Correo" className='Input-container' />
                <label style = {{color: 'white', position: 'absolute', top: 230, left: 65, fontSize: 23, fontWeight: 'bold'}}>Contraseña</label>
                <input type="text" placeholder="Contraseña" className='Input-Clave' />
                </div>
            
            </div>



        )

}


export default login;