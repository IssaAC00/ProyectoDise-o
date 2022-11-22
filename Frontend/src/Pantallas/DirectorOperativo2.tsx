import React, { useState , ReactNode } from "react";
import  Navbar  from "../componentes/TopbarDirector"


import  GraficaEncargado  from "../componentes/SegmentChartGrandient2"


function DirectorOperativo2 (  ): JSX.Element {

    

    return (
        <div> 
          <Navbar label="Encargado de inspeccion"/>
          <GraficaEncargado></GraficaEncargado>
          
        </div>
    )
}

export default DirectorOperativo2;