import React, { useState , ReactNode } from "react";
import  Navbar  from "../componentes/TopbarUsuarioOperativo"
import '../componentes/inputEstiloGlobal.css'
import  { Modal } from "../componentes/Modal"




function UsuarioOperativo (  ): JSX.Element {
    const [form, setForm] = useState({
        code: '',
        observaciones: '',
        recomendaciones: '',
       
    });

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
        { label: "Primer Piso", value: "0" },
        { label: "Segundo Piso", value: "1" },
        { label: "Tercer Piso", value: "2" }
      ];

      const cerrar = [
        { label: "Conservación", value: "0" },
        { label: "Restauración", value: "1" },
      
      ];


    return (
        <div> 
            <Navbar />
            <label style = {{position: 'absolute', top: 200, left: 300, fontSize: 32, fontWeight: 'bold'}}> Código </label>
            <input name = 'code' value={form.code} id = 'code' onChange = {changeHandler} type="text"  className='input-global'  style = {{position: 'absolute', top: 150, left: 500, fontSize: 32}} />

            <label style = {{position: 'absolute', top: 400, left: 300, fontSize: 32, fontWeight: 'bold'}}> Observaciones </label>
            <input name = 'description' value={form.observaciones} id = 'observaciones' onChange = {changeHandler} type="text"  className='input-global' style = {{position: 'absolute', top: 350, left: 500, fontSize: 23, fontWeight: 'bold'}} />
 
            <label style = {{position: 'absolute', top: 600, left: 300, fontSize: 32, fontWeight: 'bold'}}> Recomendaciones  </label>
            <input name = 'address' value={form.recomendaciones} id = 'recomendaciones' onChange = {changeHandler} type="text"  className='input-global' style = {{position: 'absolute', top: 550, left: 500, fontSize: 23, fontWeight: 'bold'}} />


            <label style = {{position: 'absolute', top: 800, left: 300, fontSize: 32, fontWeight: 'bold'}}> Inspecciones </label>
            <select onChange = {selectChange} value= {selectedOption} className= 'dropdown'  style = {{position: 'absolute', top: 750, left: 500, fontSize: 23, fontWeight: 'bold', color:'brown'}}>
            {temporal.map((options) => (
            <option key={options.label} value={options.value}>
            {options.label}
            </option>
                ))}
                </select>
            <button
              className={'app__btn'}
              onClick={toggleModal}
            >
              Start now!
            </button>
            <Modal
              title={'This is my modal'}
              isOpen={isModalOpen}
              onClose={toggleModal}
            >
              <select onChange = {selectChange1} value= {selectedOption} className= 'dropdown'  style = {{position: 'absolute', top: 750, left: 500, fontSize: 23, fontWeight: 'bold', color:'brown'}}>
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