import './Login.css'
import  Navbar  from "../componentes/TopBarSuperUsuario"
import fondo from '../imagenes/fondo.png';
import React, { useRef, useState } from "react";
import {controller} from '../BackEnd/Controller/Controller'
import {  useNavigate } from "react-router-dom"
import emailjs from '@emailjs/browser';




function SuperUsuario(): JSX.Element{
    
    const [selectedOption, setSelectedOption] = useState<String>();
    const [input, setSelecteInput] = useState<String>();
    const navigate = useNavigate(); 
    
    const formEmail = useRef(null);

    const [form, setForm] = useState({
        email: '',
        password: '',
        rol: '0',
    });

    const roles = [
        { label: "Administrador", value: '0' },
        { label: "Super Usuario", value: '1' },
        { label: "Operativo", value: '2' },
        { label: "Dirección", value: '3' }
      ];
  
      function Volver (){
        navigate('/');

      }
    
    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOption(value);
        console.log(value);
        form.rol = value;
      };

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value });
        console.log(form);
    }

    function setFormValues(idU: string, passwordU: string, rolU: string){
        setForm({
          email: idU,
          password: passwordU,
          rol: rolU,
        })
      }

    function Register(){
        if(form.email.trim() !== '' && form.password.trim() !== ''){
            controller.registerUser(form.email, form.password, Number(form.rol));
            alert('Usuario registrado correctamente');
            
            console.log(controller.seeUser(form.email));
        }else{
            console.log('Todos los campos deben ir llenos');
        }
    }

    function Procesar (){


    }
    

    function sendEmail(e: any) {

        const nombre = form.email;

        var templateParams = {
            email: nombre,
            password: form.password
        };
        // Strategy
        e.preventDefault();
        console.log(templateParams)
        console.log(form)
        emailjs.send(
            'service_k8aso0l', 
            'template_4cdby7c', 
            templateParams,
            'TRjrmP7S5sC7IoxwD'
            ). then((res: any) => {
                console.log(res.text); 
                setFormValues('','', form.rol);
        }).catch((err: any) =>console.log(err));
    }

    return (
        

        <div  style = {{backgroundImage:`url(${fondo})`, height: '1200px'}}> 
            <Navbar  label="Super Usuario"/>
            <div className='login-container' >
            <form ref={formEmail} onSubmit={sendEmail}>
                <label style = {{color: 'white', position: 'absolute', top: 61, left: 65, fontSize: 32, fontWeight: 'bold'}}>Usuario</label>
                <input name = 'email' value= {form.email} id = 'email' type="text"  onChange = {changeHandler} placeholder="_________________" className='Input-container' style={{left: 60 ,width: 300 , height: 60, color: 'black' }}/>
                <label style = {{color: 'white', position: 'absolute', top: 190, left: 65, fontSize: 32, fontWeight: 'bold'}}>Contraseña</label>
                <input name = 'password' value= {form.password} id = 'password' type="password"  onChange = {changeHandler} placeholder="_________________" className='Input-Clave' style={{top: -10,left: 60 , width: 300 , height: 60, color: 'black' }} />
                <label style = {{position: 'absolute', top: 370, left: 65, fontSize: 32, fontWeight: 'bold', color: 'white'}}> Rol </label>
                <select onChange = {selectChange} value= {form.rol} className= 'dropdown' style = {{position: 'absolute', top: 370  , fontSize: 23, fontWeight: 'bold', color:'black', width: 280, left: 150}}>
                {roles.map((options) => (
                <option style = {{color: 'black', fontWeight: 'bold'}} key={options.label} value={options.value}>
                {options.label}
                </option>
                ))}
                </select>
                </form>
            </div>
            <div className='login-container2'>
            <label style = {{color: 'white', position: 'absolute', top: 61, left: 65, fontSize: 32, fontWeight: 'bold'}}>Solicitudes Pendientes</label>
            <input type="text"style = {{position: 'absolute', fontSize: 23, fontWeight: 'bold' , height: 200}} />
            <button  className='buttonS' onClick = {Procesar}style = {{position: 'absolute', fontSize: 23,  top: 400, left: 65,}}>Procesar</button>
            </div>

            <button  className='buttonS' onClick = {Volver}style = {{position: 'absolute', fontSize: 23, top: 900, left: 350}}>Volver</button>
            <button  className='buttonS' onClick = {Register}style = {{position: 'absolute', fontSize: 23, top: 900, left: 650}}>Registrarse</button>
        </div>
    )


    
}

export default SuperUsuario;