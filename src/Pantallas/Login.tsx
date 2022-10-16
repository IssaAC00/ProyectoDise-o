import React, {useState} from 'react';
import './Login.css'
import '../componentes/buttonS.css'
import  Navbar  from "../componentes/TopBarLogin"
import imagenM from '../imagenes/img_2827_002.jpg';
import fondo from '../imagenes/fondo.png';
import {   Nav, Navbar as NavbarBs } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import {controller} from '../BackEnd/Controller/Controller'

function Login (): JSX.Element {

    const navigate = useNavigate(); 

    function Prueba(){
        controller.registerPolaige('1', 'Prueba', null!);
    };
    
    function Ingresar(){
        navigate('/Area');
      };

        return (
            <div style = {{backgroundImage:`url(${fondo})`, height: '1200px'}}>
                <Navbar />
                <div className='login-container' >
                <label style = {{color: 'white', position: 'absolute', top: 70, left: 65, fontSize: 23, fontWeight: 'bold'}}>Usuario</label>
                <input type="text" placeholder="_________________" className='Input-container' />
                <label style = {{color: 'white', position: 'absolute', top: 230, left: 65, fontSize: 23, fontWeight: 'bold'}}>Contraseña</label>
                <input type="text" placeholder="_________________" className='Input-Clave' />
                </div>
                <button onClick={Ingresar} className='buttonS' style = {{position: 'absolute', top: 710, left: 700, fontSize: 23, fontWeight: 'bold'}}>Ingresar</button>
                <Nav >
                 <Nav.Link to="/Contraseña" as={NavLink}  className = 'Contraseña '>Olvidaste tu contraseña</Nav.Link>
                </Nav>
                <img src={imagenM}  style = {{position: 'absolute', top: 210, left: 1500, fontSize: 23, fontWeight: 'bold'}}/>
            </div>
        )

}

export default Login;