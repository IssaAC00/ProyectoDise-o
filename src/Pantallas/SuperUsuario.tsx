import './superUsuario.css'
import  Navbar  from "../componentes/TopBarSuperUsuario"
import fondo from '../imagenes/fondo.png';
import React, { useState } from "react";
import {controller} from '../BackEnd/Controller/Controller'



function SuperUsuario(): JSX.Element{
    
    const [selectedOption, setSelectedOption] = useState<String>();

    const [form, setForm] = useState({
        email: '',
        password: '',
        rol: '0',
    });

    const roles = [
        { label: "Administrador", value: '0' },
        { label: "Super Usuario", value: '1' },
        { label: "Operativo", value: '2' },
      ];
    
    
    
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
            setFormValues('','', form.rol);
            console.log(controller.seeUser(form.email));
        }else{
            console.log('Todos los campos deben ir llenos');
        }
    }

    return (
        

        <div style = {{backgroundImage:`url(${fondo})`, height: '800px'}}>
            <Navbar />
            <div>
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

                <button className='buttonS' onClick= {Register} style = {{position: 'absolute', top: 370, left: 190, fontSize: 15, fontWeight: 'bold'}}>Registrar</button>
            </div>
        </div>
    )


    
}

export default SuperUsuario;