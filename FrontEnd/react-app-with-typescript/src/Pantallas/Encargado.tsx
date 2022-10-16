import React, { useState } from "react";
import  Navbar  from "../componentes/topbar"




function Encargado (): JSX.Element {

        const [form, setForm] = useState({
                id: '',
                idtype: '',
                job: '',
                name: '',
                email: 'dsadsadas.pdf'
            });
        
        const [selectedOption, setSelectedOption] = useState<String>();


     
        function cedulaSelectionHandler(event: React.ChangeEvent<HTMLInputElement>) {
                setSelectedOption(event.target.value);
                console.log(selectedOption)
        }

        
        const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
                setForm({ ...form, [event.target.name]: event.target.value })
                console.log(form);
              }
        
        

              

        return (

            <div> 
                <Navbar />

                <label style = {{position: 'absolute', top: 200, left: 300, fontSize: 32, fontWeight: 'bold'}}> Cédula </label>
                <input name = 'id' id = 'id' onChange = {changeHandler} type="text"  className='input-global'  style = {{position: 'absolute', top: 150, left: 500, fontSize: 32}} />

                <label style = {{position: 'absolute', top: 400, left: 300, fontSize: 32, fontWeight: 'bold'}}> Nombre </label>
                <input name = 'name' id = 'name' onChange = {changeHandler} type="text"  className='input-global' style = {{position: 'absolute', top: 350, left: 500, fontSize: 23, fontWeight: 'bold'}} />
        
                <label style = {{position: 'absolute', top: 600, left: 300, fontSize: 32, fontWeight: 'bold'}}> Email </label>
                <input name = 'email' id = 'email' onChange = {changeHandler} type="text"  className='input-global' style = {{position: 'absolute', top: 550, left: 500, fontSize: 23, fontWeight: 'bold'}} />
                
                
                <input
                        type="radio"
                        name="CédulaJ"
                        value="Cédula Juridica"
                        id="CédulaJuridica"
                        onChange={cedulaSelectionHandler}
                        style = {{position: 'absolute', top: 200, left: 1200, fontSize: 32, fontWeight: 'bold'}}
                        />

                <label 
                        htmlFor="cedulaJ"
                        style = {{position: 'absolute', top: 196, left: 1240, fontSize: 23, fontWeight: 'bold'}}
                        >
                        Cédula Juridica</label>

                        <input
                        type="radio"
                        name="CédulaF"
                        value="Cédula Física"
                        id="CédulaFísica"
                        onChange={cedulaSelectionHandler}
                        style = {{position: 'absolute', top: 200, left: 1500, fontSize: 32, fontWeight: 'bold'}}
                        />

                <label 
                        htmlFor="cedulaF"
                        style = {{position: 'absolute', top: 196, left: 1540, fontSize: 23, fontWeight: 'bold'}}
                        >
                        Cédula Física</label>
               
               
               
               
               
               </div>


        )





}


export default Encargado;