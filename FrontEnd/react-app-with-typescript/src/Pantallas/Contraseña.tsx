import React from 'react';
import '../componentes/buttonS.css'
import {controller} from '../BackEnd/Controller/Controller'


function Contraseña (): JSX.Element{

        function Ingresar(){
            controller.seePolaige('1');
        }
        return (


            <div> Hola soy contraseña

                <button onClick={Ingresar} className='buttonS' style = {{position: 'absolute', top: 710, left: 700, fontSize: 23, fontWeight: 'bold'}}>Prueba</button>
            </div>
            
        )



}


export default Contraseña;