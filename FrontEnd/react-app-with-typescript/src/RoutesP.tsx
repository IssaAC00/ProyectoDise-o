
import {BrowserRouter,Routes ,Route} from 'react-router-dom';
import './App.css';
import Login from './Pantallas/Login';
import  Areas  from './Pantallas/Areas';
import  Elementos  from './Pantallas/Elementos';
import Contraseña from './Pantallas/Contraseña';
import { Component } from 'react';




export default function RoutesP() {
    

    return (
  
        <BrowserRouter>

            <Routes>
                <Route  path="/" element={<Login/>}/>
                <Route path="/Area" element={<Areas />} />
                <Route path="/Elementos" element={<Elementos />} />
                <Route path="/Contraseña" element={<Contraseña />} />
              
                
            </Routes>
            </BrowserRouter>
    )
  }
