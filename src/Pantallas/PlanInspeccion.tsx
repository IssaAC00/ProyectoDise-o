import React, {useState} from 'react';
import  Navbar  from "../componentes/topbar"
import {DatePicker} from '@material-ui/pickers'
import './planInspeccion.css'
import '../componentes/inputEstiloGlobal.css'
import {controller} from '../BackEnd/Controller/Controller'
import { NavLink, useNavigate } from "react-router-dom"

function PlanInspeccion (): JSX.Element {
    const navigate = useNavigate();
    const [value, setValue] = React.useState<Date | null>(new Date());
    const [fin, setFin] = React.useState<Date | null>(new Date());
    const [selectedOption, setSelectedOption] = useState<String>();
    const [SelectedResultado, setSelectedResultado] = useState<String>();
    const [SelectedArea, setSelectedArea] = useState<String>();
    const [selectedOptionRadio, setSelectedOptionRadio] = useState<String>();
    var options = [{id:'Area',value:"0", topl: 290, leftl: 500, top: 0, left: -40 },
    {id:'Elemento',value:"1",top: 0, left: -40,topl: 290, leftl: 800}];

    const Encargado = controller
      .seeAllDutyManager()
      .map((list) => ({ label: list.name, value: list.id }));

    const [Areas, setArea] = useState(
      controller
        .seeAllArea()
        .map((list) => ({ label: list.description, value: list.id }))
    );

    function Volver (){
      navigate('/');

    }
        
      const [form, setForm] = useState({
        duty: String(Encargado[0].value),
        typeInspection: "0",
        codeAE: String(Areas[0].value),
        code: ""
      });

      const resultado = [
        { label: "Terminado", value: "0" },
        { label: "En Proceso", value: "1" },
        { label: "Finalizado", value: "2" },
      ];

      function setFormValues(idDuty: string, typeI: string, codeAEI: string, codeI: string, iDate: Date,
                              eDate: Date){
        setForm({
          duty: idDuty,
          typeInspection: typeI,
          codeAE: codeAEI,
          code: codeI
        })
        setValue(iDate);
        setFin(eDate);
      }

      const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOption(value);
        form.duty = value;
        console.log(value);
      };

      const selectChangeResultado = (
        event: React.ChangeEvent<HTMLSelectElement>
      ) => {
        const value = event.target.value;
        setSelectedResultado(value);
        console.log(value);
      };

      const selectChangeArea = (
        event: React.ChangeEvent<HTMLSelectElement>
      ) => {
        const value = event.target.value;
        setSelectedArea(value);
        form.codeAE = value;
        console.log(value);
      };

      function selectionHandler(event: React.ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        setSelectedOptionRadio(value);
        form.typeInspection = value;
        if (Number(value) === 0) {
          setArea(
            controller
              .seeAllArea()
              .map((list) => ({ label: list.description, value: list.id }))
          );
        } else {
          setArea(
            controller
              .seeAllElement()
              .map((list) => ({ label: list.description, value: list.id }))
          );
        }
      }

      const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value });
        console.log(form);
      };

      function importar() {
        console.log("hola");
      }

      function Register(){
        //Modificar todavia le falta refinar
        controller.registerInspection(Number(form.typeInspection), Number(form.code), value as Date, fin as Date, null!, 
                                        Number(form.duty), null!, null!, null!, form.codeAE); 
        setFormValues(form.duty, form.typeInspection, form.codeAE, '',value as Date, fin as Date);
        console.log(controller.seeInspection(Number(form.code)));
      }

      function Drop(){
        controller.deleteInspection(Number(form.code));
      }

      function Modify(){
        //Modificar todavia le falta refinar
        controller.modifyInspection(Number(form.typeInspection), Number(form.code), '', value as Date, fin as Date, null!, 
                                        Number(form.duty), null!, null!, null!, form.codeAE); 
        setFormValues(form.duty, form.typeInspection, form.codeAE, '',value as Date, fin as Date);
        console.log(controller.seeInspection(Number(form.code)));
      }

      function Search(){
        let inspection = controller.seeInspection(Number(form.code));
        console.log(inspection);
        setFormValues(String(inspection.dutyManager.id), form.typeInspection, '' , String(inspection.id), inspection.initialDate
                      , inspection.endDate);
        //mostrar en pantalla
      }
      


        return(

            <div>
               <Navbar />

            <div style={{position: 'absolute', top: 200, left: 1700}}>
                <label style = {{ fontSize: 24, fontWeight: 'bold'}}> Fecha Inicio </label>
                <DatePicker format="dd/MM/yyyy" value={value} onChange={(newValue) => {setValue(newValue);}}/>
                <label style = {{ fontSize: 24, fontWeight: 'bold'}}> Fecha Final</label>
                <DatePicker format="dd/MM/yyyy" value={fin} onChange={(newValue) => {setFin(newValue);}}/>
            </div>

                <label style = {{position: 'absolute', top: 400, left: 300, fontSize: 32, fontWeight: 'bold'}}> Código </label>
                <input name = 'code'  id = 'code'  value= {form.code} onChange = {changeHandler} type="text"  className='input-global'  style = {{position: 'absolute', top: 350, left: 500, fontSize: 32}} />

                <label style = {{position: 'absolute', top: 730, left: 1600, fontSize: 32, fontWeight: 'bold'}}> Estado </label>
                <input name = 'Estado'  id = 'Estado'  type="text"  className='input-global' style = {{position: 'absolute', top: 700 , left: 1850, fontSize: 23, fontWeight: 'bold'}} />

                <label style = {{position: 'absolute', top: 200, left: 300, fontSize: 32, fontWeight: 'bold'}}> Encargado </label>
                <select onChange = {selectChange} className= 'dropdown'  style = {{position: 'absolute', top: 170, left: 500, fontSize: 23, fontWeight: 'bold', color:'white'}}>
                {Encargado.map((options) => (
                <option key={options.label} value={options.value}>
                {options.label}
                </option>
                ))}
                </select>

                <label style = {{position: 'absolute', top: 500, left: 1600, fontSize: 32, fontWeight: 'bold'}}> Resultado </label>
                <select onChange = {selectChangeResultado} className= 'dropdown'  style = {{position: 'absolute', top: 470, left: 1790, fontSize: 23, fontWeight: 'bold', color:'white'}}>
                {resultado.map((options) => (
                <option key={options.label} value={options.value}>
                {options.label}
                </option>
                ))}
                </select>

                <label style = {{position: 'absolute', top: 550, left: 300, fontSize: 32, fontWeight: 'bold'}}> {form.typeInspection === '0' ? 'Area' : 'Elemento'} </label>
                <select onChange = {selectChangeArea} className= 'dropdown'  style = {{position: 'absolute', top: 550, left: 500, fontSize: 23, fontWeight: 'bold', color:'white'}}>
                {Areas.map((options) => (
                <option key={options.label} value={options.value}>
                {options.label}
                </option>
                ))}
                </select>

                {options.map((item,i) => {
                return (
                <div key={item.id} >
                <label className="radio-inline" style={{position: 'absolute', top:item.topl, left:item.leftl , fontSize: 20 }} >
                <input style={{ position: 'absolute', top:item.top, left:item.left }} id= {item.id} type="radio" name="myRadio" onChange={selectionHandler} value={item.value} />{item.id}</label>
                </div>
                );
                })}


                <div className='importPDF'  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20%" height="20%" fill="currentColor" >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                    </svg>
                    <label onClick={importar}>Adjuntar Imagen </label>
                </div>    

                <button  onClick= {Search} className='buttonS' style = {{position: 'absolute', top: 380, left: 1100, fontSize: 23}}>Buscar</button>
                <button onClick={Volver} className='buttonS' style = {{position: 'absolute', top: 1100, left: 100, fontSize: 23}}>Volver</button>
                <button  onClick= {Modify} className='buttonS' style = {{position: 'absolute', top: 780, left: 500, fontSize: 23}}> Editar</button>
                <button  onClick= {Register} className='buttonS' style = {{position: 'absolute', top: 780, left: 790, fontSize: 23}}>Registrar </button>
               

            </div>
        )

}


export default PlanInspeccion;