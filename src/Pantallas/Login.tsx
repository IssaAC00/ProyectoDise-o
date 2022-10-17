import React, {useState} from 'react';
import './Login.css'
import '../componentes/buttonS.css'
import  Navbar  from "../componentes/TopBarLogin"
import imagenM from '../imagenes/img_2827_002.jpg';
import fondo from '../imagenes/fondo.png';
import {   Nav, Navbar as NavbarBs } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import {controller} from '../BackEnd/Controller/Controller'
import '../componentes/ajustePaginas.css'
import { Rol, User } from '../BackEnd/Model/User';

function Login (): JSX.Element {

    const navigate = useNavigate(); 

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    function Prueba(){
       
    };
    
    function Ingresar(){
        //let pass = controller.login(form.email, form.password);
        // if(pass){
            
        //     let user = controller.seeUser(form.email)
        //     switch (user.rol) {
        //         case Rol.Adminitrador:
        //             navigate('/Area');
        //             break;
        //         case Rol.Super:
        //             navigate('/SuperUsuario');
        //             break;
        //         default:
        //             break;
        //     }
        // }else{
        //     alert('Revise bien los datos');
        // }
        navigate('/Area');
      };

      const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value });
      }

        return (
            <div  style = {{backgroundImage:`url(${fondo})`, height: '1200px'}}>
                <Navbar />
                <div className='login-container' >
                <label style = {{color: 'white', position: 'absolute', top: 70, left: 65, fontSize: 23, fontWeight: 'bold'}}>Usuario</label>
                <input name = 'email' value= {form.email} id = 'email' type="text"  onChange = {changeHandler} placeholder="_________________" className='Input-container' style={{ width: 300 , height: 60, color: 'black' }}/>
                <label style = {{color: 'white', position: 'absolute', top: 230, left: 65, fontSize: 23, fontWeight: 'bold'}}>Contraseña</label>
                <input name = 'password' value= {form.password} id = 'password' type="password"  onChange = {changeHandler} placeholder="_________________" className='Input-Clave' style={{ width: 300 , height: 60, color: 'black' }} />
                </div>
                <button onClick={Ingresar} className='buttonS' style = {{position: 'absolute', top: 710, left: 600, fontSize: 23, fontWeight: 'bold'}}>Ingresar</button>
                <Nav >
                 <Nav.Link to="/Contraseña" as={NavLink}  className = 'Contraseña '>Olvidaste tu contraseña</Nav.Link>
                </Nav>
                <img src={imagenM}  style = {{position: 'absolute', top: 210, left: 1500, fontSize: 23, fontWeight: 'bold'}}/>
            </div>
        )

}

export default Login;