import React, { useState  } from "react";
import  Navbar  from "../componentes/TopbarUsuarioOperativo"
import '../componentes/inputEstiloGlobal.css'
import  { Modal } from "../componentes/Modal"
import '../componentes/buttonS.css'
import {  useNavigate } from "react-router-dom"

function UsuarioOperativo (  ): JSX.Element {
    const [form, setForm] = useState({
        code: '',
        observaciones: '',
        recomendaciones: '',
        Pdf: ''
       
    });
    const navigate = useNavigate(); 

    const [isModalOpen, setModalState] = React.useState(false);
    const toggleModal = () => setModalState(!isModalOpen);

    const [selectedOption, setSelectedOption] = useState<string>();
    const [cerrarDefinitivo, setCerrarDefinitivo] = useState<string>();

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value });
      }

    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOption(value);
      };
      const selectChange1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setCerrarDefinitivo(value);
      };
    

      const temporal = [
        { label: "Agente 1", value: "0" },
        { label: "Agente 2", value: "1" },
        { label: "Agente 3", value: "2" }
      ];

      const cerrar = [
        { label: "Conservación", value: "0" },
        { label: "Restauración", value: "1" },
      
      ];

      function Volver (){
        navigate('/');

      }

      function Search(){



      };


      function Registrar (){


      }


    return (
        <div> 
            <Navbar />
            <label style = {{position: 'absolute', top: 200, left: 300, fontSize: 32, fontWeight: 'bold'}}> Inspecciones </label>
            <input name = 'code' value={form.code} id = 'code' onChange = {changeHandler} type="text"  className='input-global'  style = {{position: 'absolute', top: 150, left: 550, fontSize: 32}} />
            <label style = {{position: 'absolute', top: 400, left: 300, fontSize: 32, fontWeight: 'bold'}}> Registro de daño de :  </label>
            <label style = {{position: 'absolute', top: 600, left: 300, fontSize: 32, fontWeight: 'bold'}}> Observaciones </label>
            <input name = 'description' value={form.observaciones} id = 'observaciones' onChange = {changeHandler} type="text"  className='input-global' style = {{position: 'absolute', top: 550, left: 550, fontSize: 23, fontWeight: 'bold'}} />
            <label style = {{position: 'absolute', top: 800, left: 300, fontSize: 32, fontWeight: 'bold'}}> Recomendaciones  </label>
            <input name = 'address' value={form.recomendaciones} id = 'recomendaciones' onChange = {changeHandler} type="text"  className='input-global' style = {{position: 'absolute', top: 750, left: 550, fontSize: 23, fontWeight: 'bold'}} />


            <div className='importPDF' style = {{position: 'absolute', top: 700, left: 1300}}  >
                
                <svg xmlns="http://www.w3.org/2000/svg" width="20%" height="20%" fill="currentColor" >
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                </svg>
                <label>Imagenes</label>
            </div>                    
            <input type="text" value={form.Pdf} style = {{position: 'absolute',  top: 670, left: 1700, fontSize: 23, fontWeight: 'bold' , height: 200}} />

            <label  style = {{position: 'absolute',  top: 180, left: 1500, fontSize: 32, fontWeight: 'bold' , height: 200}}>Formularios Asociados</label>
                               
            <input type="text"  style = {{position: 'absolute',  top: 180, left: 1850, fontSize: 23, fontWeight: 'bold' , height: 200}} />


            <label style = {{position: 'absolute', top: 1000, left: 300, fontSize: 32, fontWeight: 'bold'}}> Agente Deterioro </label>
            <select onChange = {selectChange} value= {selectedOption} className= 'dropdown'  style = {{position: 'absolute', top: 950, left: 600, fontSize: 23, fontWeight: 'bold', color:'black'}}>
            {temporal.map((options) => (
            <option key={options.label} value={options.value}>
            {options.label}
            </option>
                ))}
                </select>

            <button onClick={Volver} className='buttonS' style = {{position: 'absolute', top: 1100, left: 100, fontSize: 23}}>Volver</button>
            <button  onClick= {Search} className='buttonS' style = {{position: 'absolute', top: 180, left: 1100, fontSize: 23}}>Buscar</button>
            <button  onClick= {Registrar} className='buttonS' style = {{position: 'absolute', top: 1100, left: 1100, fontSize: 23}}>Registrar</button>

            <button
              className= 'buttonS'
              onClick={toggleModal}
              style = {{position: 'absolute', top: 960, left: 1100, fontSize: 23, fontWeight: 'bold'}}
            >
             Cerrar Definitivo
            </button>
            <Modal
              title={'Cerrado definitivo'}
              isOpen={isModalOpen}
              onClose={toggleModal}
            >

              <label style = {{position: 'relative', fontSize: 23, fontWeight: 'bold'}}>Seleccione una opción: </label>
              <select onChange = {selectChange1} value= {selectedOption} className= 'dropdown'  style = {{position: 'relative' , fontSize: 23, color:'black' , width: 210 }}>
              {cerrar.map((options) => (
              <option key={options.label} value={options.value}>
              {options.label}
              </option>
                  ))}
              </select>
     

            </Modal>

            

        </div>
   
    )




}

export default UsuarioOperativo;