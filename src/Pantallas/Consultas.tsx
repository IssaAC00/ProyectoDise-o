import React, { useState } from "react";
import Navbar  from "../componentes/topbar"
import Checkbox from "../componentes/Checkbox";
import "./consulta.css"


function Consultas (): JSX.Element {

    const [form, setForm] = useState({ 
        primeroDesde: '',
        segundoDesde: '',
        primeroHasta: '',
        consulta: ''
    });

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
            <Navbar />

            {optionsA.map((item,i) => {
                return (
                <div key={item.id} >
                <label className="radio-inline" style={{position: 'absolute', top:item.topl, left:item.leftl , fontSize: 20 }} >
                <input style={{ position: 'absolute', top:item.top, left:item.left }} type="radio" name="myRadio"  value={item.id} onChange={fechaCodigoSelectionHandler} />{item.nm}</label>
                </div>
                );
                })}
            
            <label style = {{position: 'absolute', top: 300, left: 300, fontSize: 32, fontWeight: 'bold'}}> Desde: </label>
            <input name = 'primeroDesde' id = 'primeroDesde' onChange = {changeHandler} type="text"  className='Input-container'  style = {{position: 'absolute', top: 280, left: 500, fontSize: 32}} />
            <input name = 'segundoDesde' id = 'segundoDesde' onChange = {changeHandler} type="text"  className='Input-container'  style = {{position: 'absolute', top: 280, left: 900, fontSize: 32}} />

            <label style = {{position: 'absolute', top: 400, left: 300, fontSize: 32, fontWeight: 'bold'}}> Hasta: </label>
            <input name = 'primeroHasta' id = 'primeroHasta' onChange = {changeHandler} type="text"  className='Input-container'  style = {{position: 'absolute', top: 380, left: 500, fontSize: 32}} />

            <input name = 'consulta' id = 'consulta' onChange = {changeHandler} type="text"  className='Input-consulta'  style = {{position: 'absolute', top: 280, left: 1400, fontSize: 32}} />

            <button  className='buttonS' style = {{position: 'absolute', top: 500, left: 500, fontSize: 23, fontWeight: 'bold'}}>Consultar Estado</button>

            <button  className='buttonS' style = {{position: 'absolute', top: 950, left: 1400, fontSize: 23, fontWeight: 'bold'}}>Agentes</button>

            <button  className='buttonS' style = {{position: 'absolute', top: 1050, left: 1400, fontSize: 23, fontWeight: 'bold'}}>Area y Elemento</button>

            <button  className='buttonS' style = {{position: 'absolute', top: 1150, left: 1400, fontSize: 23, fontWeight: 'bold'}}>Encargados</button>

            {optionsB.map((item,i) => {
                return (
                <div key={item.id} >
                <label className="radio-inline" style={{position: 'absolute', top:item.topl, left:item.leftl , fontSize: 20 }} >
                <input style={{ position: 'absolute', top:item.top, left:item.left }} type="radio" name="myRadio"  value={item.id} onChange={PersonalSelectionHandler} />{item.nm}</label>
                </div>
                );
                })}
            
            <button  className='buttonS' style = {{position: 'absolute', top: 1150, left: 500, fontSize: 23, fontWeight: 'bold'}}>Volver</button>

        </div>
    )


}

export default Consultas;