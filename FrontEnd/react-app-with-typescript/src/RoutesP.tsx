
import {BrowserRouter,Routes ,Route} from 'react-router-dom';
import './App.css';
import Login from './Pantallas/login';
import  Areas  from './Pantallas/Areas';
import  Elementos  from './Pantallas/Elementos';

import { Component } from 'react';




export default function RoutesP() {
    

    return (
  
        <BrowserRouter>

            <Routes>
                <Route  path="/" element={<Login/>}/>
                <Route path="/Area" element={<Areas />} />
                <Route path="/Elementos" element={<Elementos />} />
              
                
            </Routes>
            </BrowserRouter>
    )
  }
