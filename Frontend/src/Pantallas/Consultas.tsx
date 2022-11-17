import React, { useState } from "react";
import Navbar  from "../componentes/topbar"
import Checkbox from "../componentes/Checkbox";
import "./consulta.css"
import {DatePicker} from '@material-ui/pickers'
import { NavLink, useNavigate } from "react-router-dom"
import path from 'path';
import createPDF from '../componentes/PDFService';

const filePath = path.join(__dirname, '..', 'pdfFiles', 'something.pdf');

function crearPDF(){
    createPDF(filePath);
}

function Consultas (): JSX.Element {
    const [value, setValue] = React.useState<Date | null>(new Date());
    const [fin, setFin] = React.useState<Date | null>(new Date());
    const navigate = useNavigate(); 

    const [form, setForm] = useState({ 
        primeroDesde: '',
        segundoDesde: '',
        primeroHasta: '',
        consulta: ''
    });

    function Volver (){
        navigate('/');

      }

    const [selectedOption, setSelectedOption] = useState<String>();
    
    var optionsA = [{id:'Seleccion Fecha',nm:"Seleccion Fecha", topl: 200, leftl: 340, top: 0, left: -40 },
        {id:'Seleccion Codigo',nm:"Seleccion Codigo",top: 0, left: -40,topl: 200, leftl: 620}];
    
    var optionsB = [{id:'Personal externo',nm:"Personal externo", topl: 950, leftl: 1200, top: 0, left: -40 },
        {id:'Personal Interno',nm:"Personal Interno",top: 0, left: -40,topl: 1000, leftl: 1200}];
    
    const [isCheckedA, setIsCheckedA] = useState(false);

    const [isCheckedB, setIsCheckedB] = useState(false);

    function fechaCodigoSelectionHandler(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(selectedOption)
        setSelectedOption(event.target.value);   
    }

    function PersonalSelectionHandler(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(selectedOption)
        setSelectedOption(event.target.value);   
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value })
        console.log(form);
      }



    return (

        <div>
            <Navbar label="Consulta"/>

            {optionsA.map((item,i) => {
                return (
                <div key={item.id} >
                <label className="radio-inline" style={{position: 'absolute', top:item.topl, left:item.leftl , fontSize: 32 }} >
                <input style={{ position: 'absolute', top:item.top, left:item.left }} type="radio" name="myRadio"  value={item.id} onChange={fechaCodigoSelectionHandler} />{item.nm}</label>
                </div>
                );
                })}
            
            <label style = {{position: 'absolute', top: 300, left: 300, fontSize: 32, fontWeight: 'bold'}}> Desde: </label>
            <div style = {{position: 'absolute', top: 300, left: 450, fontSize: 32, fontWeight: 'bold'}}>
            <DatePicker value={value} onChange={(newValue) => setValue(newValue)}/>
            </div>

           
            <label style = {{position: 'absolute', top: 400, left: 300, fontSize: 32, fontWeight: 'bold'}}> Hasta: </label>
            <div style = {{position: 'absolute', top: 400, left: 450, fontSize: 32, fontWeight: 'bold'}}>
            <DatePicker value={fin} onChange={(newValue) => setFin(newValue)}/>
            </div>

            <label style = {{position: 'absolute', top: 300, left: 770, fontSize: 23, fontWeight: 'bold'}}> Código </label>
            <input name = 'code' id = 'code'  type="text"  className='Input-consulta'  style = {{position: 'absolute', top: 280, left: 850, fontSize: 23}} />

            <button onClick={crearPDF} className='buttonS' style = {{position: 'absolute', top: 500, left: 500, fontSize: 23}}>Consultar Estado</button>
            <button  className='buttonS' style = {{position: 'absolute', top: 850, left: 1400, fontSize: 23}}>Agentes</button>
            <button  className='buttonS' style = {{position: 'absolute', top: 950, left: 1400, fontSize: 23}}>Area y Elemento</button>
            <button  className='buttonS' style = {{position: 'absolute', top: 1050, left: 1400, fontSize: 23}}>Encargados</button>

            <div className="table-wrapper" style = {{position: 'absolute', top: 200, right: 200, fontSize: 23, }}>
                <table id="ConsultasInspeccion">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha Inicial</th>
                            <th>Fecha Final</th>
                            <th>Fecha Entrega</th>
                            <th>Encargado</th>
                            <th>Estado</th>
                            <th>Resultado</th>
                            <th>Area / Elemento</th>
                        </tr>
                    </thead>
                    <tbody id="content_table">
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {optionsB.map((item,i) => {
                return (
                <div key={item.id} >
                <label className="radio-inline" style={{position: 'absolute', top:item.topl, left:item.leftl , fontSize: 20 }} >
                <input style={{ position: 'absolute', top:item.top, left:item.left }} type="radio" name="myRadio"  value={item.id} onChange={PersonalSelectionHandler} />{item.nm}</label>
                </div>
                );
                })}
            
          
            <button onClick={Volver} className='buttonS' style = {{position: 'absolute', top: 950, left: 500, fontSize: 23}}>Volver</button>

        </div>
    )


}

export default Consultas;