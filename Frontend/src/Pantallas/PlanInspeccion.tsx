import React, {useEffect, useState} from 'react';
import  Navbar  from "../componentes/topbar"
import {DatePicker} from '@material-ui/pickers'
import './planInspeccion.css'
import '../componentes/inputEstiloGlobal.css'
import {controller} from '../BackEnd/Controller/Controller'
import { NavLink, useNavigate } from "react-router-dom"
import { InspectionArea, InspectionElement, State } from '../BackEnd/Model/Inspection';

function PlanInspeccion (): JSX.Element {
    const navigate = useNavigate();
    const [value, setValue] = React.useState<Date | null>(new Date());
    const [fin, setFin] = React.useState<Date | null>(new Date());
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [SelectedResultado, setSelectedResultado] = useState<string>("3");
    const [SelectedArea, setSelectedArea] = useState<string>("");
    const [selectedOptionRadio, setSelectedOptionRadio] = useState<String>();
    const [file, setFile] = useState<File|null>();
    const [state, setState] = useState<string>("")
    var options = [{id:'Area',value:"0", topl: 290, leftl: 500, top: 7, left: -40 },
    {id:'Elemento',value:"1",top: 7, left: -40,topl: 290, leftl: 800}];

    const [Encargado, setEncargado] = useState(controller
      .seeAllDutyManager()
      .map((list) => ({ label: list.name, value: list.id })));

    const [Areas, setArea] = useState(
      controller
        .seeAllArea()
        .map((list) => ({ label: list.description, value: list.id }))
    );

    function Volver (){
      navigate('/');

    }
        //String(Encargado[0].value)
      const [form, setForm] = useState({
        duty: "",
        typeInspection: "0",
        codeAE: "",
        code: ""
      });

      const resultado = [
        { label: "Ninguno", value: "3" },
        { label: "Restauración", value: "0" },
        { label: "Conservación", value: "2" },
      ];

      useEffect(() => {
        controller.loadAreas()
        .then(response =>(
          response != undefined ? 
          setArea(controller.seeAllArea().map( 
            (list) => ({label: list.description, value: list.id}))) : ''
        ))
        .then(() => {
          setForm({...form, codeAE: controller.seeAllArea()[0].id});
          controller.loadElements()
          .then(()=>{
            controller.loadDutyManagers()
              .then(response => (
                response != undefined ? 
                setEncargado(
                  controller.seeAllDutyManager()
                    .map((list) => ({ label: list.name, value: list.id }))) : ''
              ))
              .then(() =>{
                setForm({...form, duty: String(controller.seeAllDutyManager()[0].id)});
                controller.loadInspection();
              });
          })
        });
      }, []);
      

      function setFormValues(idDuty: string, typeI: string, result: string, codeAEI: string, codeI: string, iDate: Date, eDate: Date){
        setForm({
          duty: idDuty,
          typeInspection: typeI,
          codeAE: codeAEI,
          code: codeI
        })
        setValue(iDate);
        setFin(eDate);
        setSelectedOption(idDuty);
        setSelectedResultado(result);
        setSelectedArea(codeAEI);
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
      };

      function selectionHandler(event: React.ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        console.log(value);
        setSelectedOptionRadio(value);
        form.typeInspection = value;
        if (Number(value) == 0) {
          setArea(
            controller
              .seeAllArea()
              .map((list) => ({ label: list.description, value: list.id }))
          );
          setForm({...form, codeAE: controller.seeAllArea()[0].id});
        } else {
          setArea(
            controller
              .seeAllElement()
              .map((list) => ({ label: `${list.description} (${list.area.description})`, value: list.id }))
          );
          setForm({...form, codeAE: controller.seeAllElement()[0].id});
        }
      }

      const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value });
        console.log(form);
      };

      const handlerFile = (event: any) => {
        const size = (event.target.files)?.length;
        if(size != 0){
          setFile(event.target.files[0]);
        }
      };

      function getState(typeState: number): string{
        if(typeState == 1){
            return "Por suceder";
        }else if(typeState == 0){
            return "En ejecución";
        }else if(typeState == 4){
            return "Ejecutada";
        }else if(typeState == 3){
            return "Ejecución con retraso";
        }else if(typeState == 2){
            return "Retrasada";
        }
        return "";
      };
      

      function importar() {
        console.log("hola");
      }

      function Register(){
        //Modificar todavia le falta refinar
        controller.registerInspection(Number(form.typeInspection), Number(form.code), value as Date, fin as Date, null!, Number(form.duty), null!, null!, null!, form.codeAE); 
        setFormValues(form.duty, form.typeInspection, '0', form.codeAE, '',value as Date, fin as Date);
        console.log(controller.seeInspection(Number(form.code)));
      }

      function Drop(){
        controller.deleteInspection(Number(form.code));
      }

      function Modify(){
        //Modificar todavia le falta refinar
        controller.modifyInspection(Number(form.typeInspection), Number(form.code), '', value as Date, fin as Date, null!, 
                                        Number(form.duty), null!, null!, null!, form.codeAE); 
        setFormValues(form.duty, form.typeInspection, '0', form.codeAE, '',value as Date, fin as Date);
        console.log(controller.seeInspection(Number(form.code)));
      }

      function Search(){
        let inspection = controller.seeInspection(Number(form.code));
        console.log(inspection);
        let idAE: string;
        console.log(form.typeInspection)
        if(inspection.constructor.name == "InspectionArea" && form.typeInspection == '0'){
          idAE = (inspection as InspectionArea).area.id
          setFormValues(String(inspection.dutyManager.id), form.typeInspection, String(inspection.result), idAE, String(inspection.id), inspection.initialDate, inspection.endDate);
          setState(getState(inspection.state));
        }else if(inspection.constructor.name == "InspectionElement" && form.typeInspection == '1'){
          idAE = (inspection as InspectionElement).element.id
          setFormValues(String(inspection.dutyManager.id), form.typeInspection, String(inspection.result), idAE, String(inspection.id), inspection.initialDate, inspection.endDate);
          setState(getState(inspection.state));
        }
        //mostrar en pantalla
      }
      


        return(

            <div>
               <Navbar label="Plan Inspección"/>

            <div style={{position: 'absolute', top: 200, left: 1700}}>
                <label style = {{ fontSize: 24, fontWeight: 'bold'}}> Fecha Inicio </label>
                <DatePicker format="dd/MM/yyyy" value={value} onChange={(newValue) => {setValue(newValue);}}/>
                <label style = {{ fontSize: 24, fontWeight: 'bold'}}> Fecha Final</label>
                <DatePicker format="dd/MM/yyyy" value={fin} onChange={(newValue) => {setFin(newValue);}}/>
            </div>

                <label style = {{position: 'absolute', top: 400, left: 300, fontSize: 32, fontWeight: 'bold'}}> Código </label>
                <input name = 'code'  id = 'code'  value= {form.code} onChange = {changeHandler} type="text"  className='input-global'  style = {{position: 'absolute', top: 350, left: 500, fontSize: 32}} />

                <label style = {{position: 'absolute', top: 730, left: 1600, fontSize: 32, fontWeight: 'bold'}}> Estado </label>
                <label style = {{position: 'absolute', top: 732 , left: 1800, fontSize: 30, fontWeight: 'bold'}} >{state}</label>

                <label style = {{position: 'absolute', top: 200, left: 300, fontSize: 32, fontWeight: 'bold'}}> Encargado </label>
                <select onChange = {selectChange} value={selectedOption} className= 'dropdown'  style = {{position: 'absolute', top: 170, left: 500, fontSize: 23, fontWeight: 'bold', color:'white'}}>
                {Encargado.map((options) => (
                <option key={options.label} value={options.value}>
                {options.label}
                </option>
                ))}
                </select>

                <label style = {{position: 'absolute', top: 500, left: 1600, fontSize: 32, fontWeight: 'bold'}}> Resultado </label>
                <select onChange = {selectChangeResultado} value={SelectedResultado} className= 'dropdown'  style = {{position: 'absolute', top: 470, left: 1790, fontSize: 23, fontWeight: 'bold', color:'white'}}>
                {resultado.map((options) => (
                <option key={options.label} value={options.value}>
                {options.label}
                </option>
                ))}
                </select>

                <label style = {{position: 'absolute', top: 550, left: 300, fontSize: 32, fontWeight: 'bold'}}> {form.typeInspection === '0' ? 'Area' : 'Elemento'} </label>
                <select onChange = {selectChangeArea} value={SelectedArea} className= 'dropdown'  style = {{position: 'absolute', top: 550, left: 500, fontSize: 23, fontWeight: 'bold', color:'white'}}>
                {Areas.map((options) => (
                <option key={options.label} value={options.value}>
                {options.label}
                </option>
                ))}
                </select>

                {options.map((item,i) => {
                return (
                <div key={item.id} >
                <label className="radio-inline" style={{position: 'absolute', top:item.topl, left:item.leftl , fontSize: 32 }} >
                <input style={{ position: 'absolute', top:item.top, left:item.left }} id= {item.id} type="radio" name="myRadio" onChange={selectionHandler} value={item.value} />{item.id}</label>
                </div>
                );
                })}


                <div className='importPDF'  >
                    <input type="file" onChange={handlerFile}></input>
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