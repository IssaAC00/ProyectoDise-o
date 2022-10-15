import React, { useState } from "react";
import  Navbar  from "../componentes/topbar"




function Encargado (): JSX.Element {


        const [selectedOption, setSelectedOption] = useState<String>();

        const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
                setSelectedOption(event.target.value);
                console.log(selectedOption);
              };
              

        return (

            <div> 
                <Navbar />
                
                   <input
                        type="radio"
                        name="drink"
                        value="Coffee"
                        id="coffee"
                        onChange={radioHandler}
                        />
                <label htmlFor="coffee">Coffee</label>
               
               
               
               
               
               </div>


        )





}


export default Encargado;