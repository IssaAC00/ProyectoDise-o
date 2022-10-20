import '../componentes/dropdownS.css'
import  Navbar  from "../componentes/topbar"
import '../componentes/inputEstiloGlobal.css'
import React, { useState } from "react";
import "./areas.css"
import '../componentes/buttonS.css'
import { NavLink, useNavigate } from "react-router-dom"


function Contraseña (): JSX.Element{
    const navigate = useNavigate(); 

    function Volver (){
        navigate('/');

      }
        
        return (


            <div>
                

            <label style = {{position: 'absolute', top: 200, left: 300, fontSize: 32, fontWeight: 'bold'}}> Correo  </label>
            <input type="text"  className='input-global'  style = {{position: 'absolute', top: 150, left: 500, fontSize: 32}} />

            <label style = {{position: 'absolute', top: 400, left: 300, fontSize: 32, fontWeight: 'bold'}}> Nueva Contraseña </label>
            <input type="text"  className='input-global' style = {{position: 'absolute', top: 350, left: 600, fontSize: 23, fontWeight: 'bold'}} />

            <button onClick={Volver} className='buttonS' style = {{position: 'absolute', top: 700, left: 100, fontSize: 23}}>Volver</button>
              
            </div>
            
        )



}


export default Contraseña;