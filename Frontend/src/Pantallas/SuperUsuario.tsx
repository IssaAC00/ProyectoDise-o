import './superUsuario.css'
import  Navbar  from "../componentes/TopBarSuperUsuario"
import fondo from '../imagenes/fondo.png';
import React, { useRef, useState } from "react";
import {controller} from '../BackEnd/Controller/Controller'
import { NavLink, useNavigate } from "react-router-dom"
import emailjs from '@emailjs/browser';



function SuperUsuario(): JSX.Element{
    
    const [selectedOption, setSelectedOption] = useState<String>();
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
        

        <div style = {{backgroundImage:`url(${fondo})`, height: '800px'}}>
            <Navbar  label="Super Usuario"/>

            <form ref={formEmail} onSubmit={sendEmail}>
                <label style = {{color: 'black', position: 'absolute', top: 160, left: 70, fontSize: 15, fontWeight: 'bold'}}>Email</label>
                <input name = 'email' value={form.email} id = 'email'  onChange = {changeHandler} style = {{backgroundColor: '#D9D9D9', borderColor: '#D9D9D9', position: 'absolute', top: 150, left: 150, fontSize: 15}} type="text" placeholder="Digite su Email" className='Input-container' />

                <label style = {{color: 'black', position: 'absolute', top: 220, left: 40, fontSize: 15, fontWeight: 'bold'}}>Contraseña</label>
                <input name = 'password' value={form.password} id = 'password' onChange = {changeHandler} style = {{backgroundColor: '#D9D9D9', borderColor: '#D9D9D9', position: 'absolute', top: 220, left: 150, fontSize: 15}} type="password" placeholder="Digite su contraseña" className='Input-Clave' />

                <select onChange = {selectChange} value= {form.rol} className= 'dropdown' style = {{color: 'white', position: 'absolute', top: 300, left: 170, fontSize: 12, fontWeight: 'bold'}}>
                {roles.map((options) => (
                <option style = {{color: 'black', fontWeight: 'bold'}} key={options.label} value={options.value}>
                {options.label}
                </option>
                ))}
                </select>
                <button onClick={Volver} className='buttonS' style = {{position: 'absolute', top: 1100, left: 100, fontSize: 23}}>Volver</button>
                <button className='buttonS' onClick= {Register} style = {{position: 'absolute', top: 370, left: 190, fontSize: 15, fontWeight: 'bold'}}>Registrar</button>
                </form>
        </div>
    )


    
}

export default SuperUsuario;