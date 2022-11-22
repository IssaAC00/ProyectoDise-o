import React, {useState} from 'react';
import  Navbar  from "../componentes/TopBarSuperUsuario"
import fondo from '../imagenes/fondo.png';
import './Login.css'
import {  useNavigate } from "react-router-dom";
import imagenM from '../imagenes/img_2827_002.jpg';



function Registrarse (): JSX.Element {
    const [selectedOption, setSelectedOption] = useState<string>('0');
    const [form, setForm] = useState({
        email: '',
        password : ' '
       
    });
    const navigate = useNavigate(); 

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value });
        console.log(form);
      }

      const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOption(value);
      };

      function Volver (){
        navigate('/');

      }

      function registrarse (){


      }

      
    const rol = [
        { label: "Administrador", value: "0" },
        { label: "Usuario Operativo", value: "1" },
        { label: "Director", value: "2" },
  
      ];


        return (
            
            <div  style = {{backgroundImage:`url(${fondo})`, height: '1200px'}}> 
                 <Navbar label="Registro"/>
                    <div className='login-container' >
                    <label style = {{color: 'white', position: 'absolute', top: 61, left: 65, fontSize: 32, fontWeight: 'bold'}}>Usuario</label>
                    <input name = 'email' value= {form.email} id = 'email' type="text"  onChange = {changeHandler} placeholder="_________________" className='Input-container' style={{ width: 300 , height: 60, color: 'black' }}/>
                    <label style = {{color: 'white', position: 'absolute', top: 230, left: 65, fontSize: 32, fontWeight: 'bold'}}>Contraseña</label>
                    <input name = 'password' value= {form.password} id = 'password' type="password"  onChange = {changeHandler} placeholder="_________________" className='Input-Clave' style={{ width: 300 , height: 60, color: 'black' }} />
                    <label style = {{position: 'absolute', top: 370, left: 65, fontSize: 32, fontWeight: 'bold', color: 'white'}}> Piso </label>
                    <select onChange = {selectChange} value= {selectedOption as string}   className= 'dropdown' name= 'floor'  style = {{position: 'absolute', top: 370  , fontSize: 23, fontWeight: 'bold', color:'black', width: 280}}>
                    {rol.map((options) => (
                    <option key={options.label} value={options.value}>
                    {options.label}
                    </option>
                    ))}
                    </select>
                </div>
                <button  className='buttonS' onClick = {Volver}style = {{position: 'absolute', fontSize: 23, top: 900, left: 350}}>Volver</button>
                <button  className='buttonS' onClick = {Registrarse}style = {{position: 'absolute', fontSize: 23, top: 900, left: 650}}>Registrarse</button>
                <img src={imagenM}  style = {{position: 'absolute', top: 210, left: 1300, fontSize: 23, fontWeight: 'bold'}}/>

            </div>
        )




}

export default Registrarse ;