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
        const [selectedLaboro, setSelectLaboro] = useState<String>();

        var options = [{id:'Cedula Juridica',nm:"Cedula Juridica", topl: 200, leftl: 1340, top: 0, left: -40 },
        {id:'Cedula Fisica',nm:"Cedula Fisica",top: 0, left: -40,topl: 200, leftl: 1500}];


     
        function cedulaSelectionHandler(event: React.ChangeEvent<HTMLInputElement>) {
                console.log(selectedOption)
                setSelectedOption(event.target.value);
               
        }

        
        const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
                setForm({ ...form, [event.target.name]: event.target.value })
                console.log(form);
              }
        
        
        function set(){

                console.log('tontera')
                console.log('tontera')
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
                


                
                {options.map((item,i) => {
                return (
                <div key={item.id} >
                <label className="radio-inline" style={{position: 'absolute', top:item.topl, left:item.leftl}} >
                <input style={{ position: 'absolute', top:item.top, left:item.left}} type="radio" name="myRadio"  value={item.id} onChange={cedulaSelectionHandler} />{item.nm}</label>
                </div>
                );
                })}

               
               
               
               </div>


        )





}


export default Encargado;