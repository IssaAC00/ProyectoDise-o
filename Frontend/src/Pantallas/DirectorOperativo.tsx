import React, { useState , ReactNode } from "react";
import  Navbar  from "../componentes/TopbarDirector"
import { controller } from '../BackEnd/Controller/Controller'

import  GraficaEncargado  from "../componentes/SegmentChartGrandient"


function DirectorOperativo (  ): JSX.Element {

    controller.inspectionxState().then(data=> (console.log(data)));
    
    return (
        <div> 

          <Navbar label="Inspecciones por estado"/>
          <GraficaEncargado></GraficaEncargado>
          
        </div>
    )
}

export default DirectorOperativo;