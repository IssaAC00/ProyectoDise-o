import React from 'react';
import './GraficaEstado.css';
import {Bar} from 'react-chartjs-2';

function GraficaEstado (): JSX.Element{
    const data={
        labls:['Por suceder', 'En ejecucion','Ejecutada','Ejecutada con Retraso','Retrasada'],
        datasets:[{ 
            label:'grafico1',
            backgroundColor:'rgba(0,255,0,0.2)',
            borderColor:'black',
            borderWidth:1,
            hoverBackgroundColor:'rgba(0,255,0,0.2)',
            hovBorderColor: '#FF0000',
            data:[5,20,50,10,15]
        }]
    };
    const opciones={
        maintainAspectRatio:false,
        responsive:true
    }
    return (
        <div className="APP" style ={{width:'100%',height:'500 px'}}>
        <h2>grafica Inspecciones Registradas por Estado</h2>
                <Bar data={data} options={opciones}/>
            </div>
    );
}

export default GraficaEstado;