
import {BrowserRouter,Routes ,Route, Router} from 'react-router-dom';
import './App.css';
import Login from './Pantallas/Login';
import  Areas  from './Pantallas/Areas';
import  Elementos  from './Pantallas/Elementos';
import Contraseña from './Pantallas/Contraseña';
import SuperUsuario from './Pantallas/SuperUsuario';
import Deterioro from './Pantallas/Deterioro';
import Encargado from './Pantallas/Encargado';
import Consultas from './Pantallas/Consultas';
import TareasEncargado from './Pantallas/TareasEncargado';
import PlanInspeccion from './Pantallas/PlanInspeccion';
import { Component } from 'react';





export default function RoutesP() {
    

    return (
  
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/Area" element={<Areas />} />
                <Route path="/AreaElementos" element={<Elementos />} />
                <Route path="/Contraseña" element={<Contraseña />} />
                <Route path="/SuperUsuario" element={<SuperUsuario />} />
                <Route path="/Deterioro" element={<Deterioro />} />
                <Route path="/Encargado" element={<Encargado />} />
                <Route path="/PlanInspeccion" element={<PlanInspeccion />} />
                <Route path="/TareasEncarago" element={<TareasEncargado /> } />
                <Route path="/Consultas" element={<Consultas />} />
              
                
            </Routes>
            </BrowserRouter>
    )
  }
