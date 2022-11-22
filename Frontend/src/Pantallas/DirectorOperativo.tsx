import React, { useState , ReactNode } from "react";
import  Navbar  from "../componentes/TopbarDirector"


import  GraficaEncargado  from "../componentes/SegmentChartGrandient"


function DirectorOperativo (  ): JSX.Element {

    

    return (
        <div> 
          <Navbar label="Director Operativo"/>
          <GraficaEncargado></GraficaEncargado>
          
        </div>
    )
}

export default DirectorOperativo;