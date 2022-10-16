import React, { useState } from "react";
import  Navbar  from "../componentes/topbar"
import Checkbox from "../componentes/Checkbox";




function Encargado (): JSX.Element {

        const [form, setForm] = useState({ 
                id: '',
                idtype: '',
                job: '',
                name: '',
                email: 'dsadsadas.pdf'
            });
        
        const [selectedOption, setSelectedOption] = useState<String>();
        var options = [{id:'Cedula Juridica',nm:"Cedula Juridica", topl: 200, leftl: 1340, top: 0, left: -40 },
        {id:'Cedula Fisica',nm:"Cedula Fisica",top: 0, left: -40,topl: 200, leftl: 1520}];
        

        const [isCheckedA, setIsCheckedA] = useState(false);
        const [Puesto, setPuesto] = useState<String>();
        const handleChangeA = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsCheckedA(e.target.checked);
        setPuesto(e.target.value);
        console.log(Puesto);

        };

        const [isCheckedB, setIsCheckedB] = useState(false);
        const [Puesto1, setPuesto1] = useState<String>();
        const handleChangeB = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsCheckedB(e.target.checked);
        setPuesto1(e.target.value);
        console.log(Puesto1);
        };

        const [isCheckedC, setIsCheckedC] = useState(false);
        const [Puesto2, setPuesto2] = useState<String>();
        const handleChangeC = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsCheckedC(e.target.checked);
        setPuesto2(e.target.value);
        console.log(Puesto2);
        };
     
     
        function cedulaSelectionHandler(event: React.ChangeEvent<HTMLInputElement>) {
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

                <label style = {{position: 'absolute', top: 200, left: 300, fontSize: 32, fontWeight: 'bold'}}> Cédula </label>
                <input name = 'id' id = 'id' onChange = {changeHandler} type="text"  className='input-global'  style = {{position: 'absolute', top: 150, left: 500, fontSize: 32}} />

                <label style = {{position: 'absolute', top: 400, left: 300, fontSize: 32, fontWeight: 'bold'}}> Nombre </label>
                <input name = 'name' id = 'name' onChange = {changeHandler} type="text"  className='input-global' style = {{position: 'absolute', top: 350, left: 500, fontSize: 23, fontWeight: 'bold'}} />
        
                <label style = {{position: 'absolute', top: 600, left: 300, fontSize: 32, fontWeight: 'bold'}}> Email </label>
                <input name = 'email' id = 'email' onChange = {changeHandler} type="text"  className='input-global' style = {{position: 'absolute', top: 550, left: 500, fontSize: 23, fontWeight: 'bold'}} />
                


                
                {options.map((item,i) => {
                return (
                <div key={item.id} >
                <label className="radio-inline" style={{position: 'absolute', top:item.topl, left:item.leftl , fontSize: 20 }} >
                <input style={{ position: 'absolute', top:item.top, left:item.left }} type="radio" name="myRadio"  value={item.id} onChange={cedulaSelectionHandler} />{item.nm}</label>
                </div>
                );
                })}

                
                <label style = {{position: 'absolute', top: 460, left: 1300, fontSize: 32, fontWeight: 'bold'}}> Labor:  </label>             
                <div style={{ position: 'absolute', top: 500, left: 1400, fontSize:28}}>
                <Checkbox
                handleChange={handleChangeA}
                isChecked={isCheckedA}
                label="Inspección"
                value="Inspección"
                />
                </div>

                <div style={{ position: 'absolute', top: 540, left: 1400, fontSize:28}}>
                <Checkbox
                handleChange={handleChangeB}
                isChecked={isCheckedB}
                label="Conservación"
                value="Conservación"
                />
                </div>

                <div style={{ position: 'absolute', top: 580, left: 1400, fontSize:28}}>
                <Checkbox
                handleChange={handleChangeC}
                isChecked={isCheckedC}
                label="Restauración"
                value="Restauración"
                />
                </div>

                <button  className='buttonS' style = {{position: 'absolute', top: 1100, left: 100, fontSize: 23}}>Volver</button>
                <button  className='buttonS' style = {{position: 'absolute', top: 700, left: 1650, fontSize: 23}}> Editar</button>
                <button  className='buttonS' style = {{position: 'absolute', top: 780, left: 1650, fontSize: 23}}>Registrar </button>
                <button  className='buttonS' style = {{position: 'absolute', top: 860, left: 1650, fontSize: 23}}>Eliminar </button>
        

               
               
               
               </div>


        )





}


export default Encargado;