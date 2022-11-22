import React, { useState , ReactNode } from "react";
import  Navbar  from "../componentes/TopbarDirector"
import { Doughnut } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';




function DirectorOperativo (  ): JSX.Element {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const [data, setData] = useState({
      labels: labels,
      datasets: [{
        label: 'Expenses by Month',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgb(153, 102, 255)'
        ],
        borderColor: [
          'rgb(153, 102, 255)'
        ],
        borderWidth: 1
      }]
    });
   
    return (
        <div> 
          <Navbar label="Director Operativo"/>
          <Doughnut data={data}  /> 


        </div>
    )




}

export default DirectorOperativo;