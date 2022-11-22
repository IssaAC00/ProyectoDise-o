import React, { useState , ReactNode } from "react";
import  Navbar  from "../componentes/TopbarDirector"
import { controller } from '../BackEnd/Controller/Controller'


import  GraficaEncargado  from "../componentes/SegmentChartGrandient"


function DirectorOperativo (  ): JSX.Element {

    
    controller.inspectionxState();
    
    return (
        <div> 
          <Navbar label="Director Operativo"/>
          <GraficaEncargado></GraficaEncargado>
          
        </div>
    )
}

export default DirectorOperativo;