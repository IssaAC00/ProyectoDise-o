import axios from "axios";
import React, {useState, useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom'
function graficos(props) {
    const url = "http://localhost:4000";
    //Gráficos
    const dataUnis = [
        { name: 'TEC', value: 62 },
        { name: 'UCR', value: 93 },
    ];
    const dataSells = [
        { name: 'Camisa', value: 5, desc: 'Es blanca con un logo' },
        { name: 'Camisa', value: 3, desc: 'Camisa de botones estampada' },
        { name: 'Tote bag', value: 4, desc: 'Bolso estampado' },
        { name: 'Camisa', value: 2, desc: 'Camisa blanca estampada' },
        { name: 'Gorra', value: 6, desc: 'Gris con gato amarillo' },
    ];

    const COLORSUNIS = ['#0088FE', '#6BBBFF'];
    const COLORSSELLS = ['#FFB4A4', '#EAA4FF', '#A4F2FF', '#A4FFD1', '#B3FFA4', '#E6FFA4', '#FFE8A4'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ value, cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="black" fontWeight='600' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {value + ` ~ ${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const renderCustomizedLabelUnis = ({ name, cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.4;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill={COLORSUNIS[index == 0 ? COLORSUNIS.length - 1 : index - 1]} fontWeight='700' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {name + ` ${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    //Tablas
    const columns = [
        { headerClassName: 'theme--header', cellClassName: 'theme--Rows', field: 'Autor', headerName: 'Autor', width: 400 },
        { headerClassName: 'theme--header', cellClassName: 'theme--Rows', field: 'Publicaciones', headerName: 'Publicaciones', width: 273 },
        { headerClassName: 'theme--header', cellClassName: 'theme--Rows', field: 'Calificacion', headerName: 'Calificacion', width: 273 }
    ];

    const rows = [
        { id: 1, Autor: 'Fernanda Cordero', Publicaciones: 30, Calificacion: 4.2 },
        { id: 2, Autor: 'Martin Centeno', Publicaciones: 26, Calificacion: 4.1 },
        { id: 3, Autor: 'Miguel Garcia', Publicaciones: 20, Calificacion: 4.6 },
        { id: 4, Autor: 'Debora Galvez', Publicaciones: 19, Calificacion: 4.5 },
    ];

    const columns2 = [
        { headerClassName: 'theme--header2', cellClassName: 'theme--Rows2', field: 'Autor', headerName: 'Autor', width: window.innerWidth * 0.15 },
        { headerClassName: 'theme--header2', cellClassName: 'theme--Rows2', field: 'Universidad', headerName: 'Publicaciones', width: window.innerWidth * 0.1 },
        { headerClassName: 'theme--header2', cellClassName: 'theme--Rows2', field: 'Genero', headerName: 'Género', width: window.innerWidth * 0.092 },
        { headerClassName: 'theme--header2', cellClassName: 'theme--Rows2', field: 'TipoDeNoticia', headerName: 'Tipo de Noticia', width: window.innerWidth * 0.15 }
    ];

    const rows2 = [
        { id: 1, Autor: 'Fernanda Cordero', Universidad: 'TEC', Genero: 'F', TipoDeNoticia: 'Evento' },
        { id: 2, Autor: 'Martin Centeno', Universidad: 'UCR', Genero: 'M', TipoDeNoticia: 'Emergencia' },
        { id: 3, Autor: 'Miguel Garcia', Universidad: 'UCR', Genero: 'M', TipoDeNoticia: 'Reseña' },
        { id: 4, Autor: 'Debora Galvez', Universidad: 'TEC', Genero: 'F', TipoDeNoticia: 'Empleos' },
    ];

    return (
        <div>
            <div className='header'>
                <Link className="linkfilters" to={`/news`}>
                    <img src='https://res.cloudinary.com/dy7ksc08o/image/upload/v1668335019/VisionAP/Captura_desde_2022-11-13_04-21-46_y8cgsx.png' alt='Logo de la página'></img>
                </Link>
            </div>


            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <div style={{ height: 45 }}><h1 style={{ color: "#0088FE" }}>Publicaciones</h1></div>
                    <Grid container direction="row" justifyContent="center" alignItems="stretch">
                        <PieChart width={300} height={250}>
                            <Pie
                                data={dataUnis}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabelUnis}
                                outerRadius={110}
                                nameKey="name"
                                dataKey="value">
                                {dataUnis.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORSUNIS[index % COLORSUNIS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                        <List>
                            {dataUnis.map((entry, index) => (
                                <ListItem>
                                    <ListItemText
                                        primaryTypographyProps={{ fontSize: '25px', fontWeight: 'bold' }}
                                        secondaryTypographyProps={{ fontSize: '20px', fontWeight: 900 }}
                                        style={{ color: COLORSUNIS[index % COLORSUNIS.length] }}
                                        primary={entry.name}
                                        secondary={entry.value} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <div style={{ height: 45 }}><h1 style={{ color: "#0088FE" }}>Ventas de productos</h1></div>
                    <Grid container direction="row" justifyContent="center" alignItems="stretch">
                        <PieChart width={300} height={300}>
                            <Pie
                                data={dataSells}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={150}
                                nameKey="name"
                                dataKey="value">
                                {dataSells.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORSSELLS[index % COLORSSELLS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                        <List>
                            {dataSells.map((entry, index) => (
                                <ListItem>
                                    <ListItemText
                                        primaryTypographyProps={{ color: 'black', backgroundColor: COLORSSELLS[index % COLORSSELLS.length], fontSize: '10px', fontWeight: 'bold' }}
                                        secondaryTypographyProps={{ fontSize: '10px', fontWeight: 600 }}
                                        primary={entry.name}
                                        secondary={entry.desc} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Box
                        sx={{
                            height: 530, width: '100%',
                            '& .theme--Rows': {
                                fontWeight: '100',
                                fontSize: 20
                            },
                            '& .theme--header': {
                                backgroundColor: '#36A2FF',
                                fontWeight: '500',
                                fontSize: 25
                            },
                        }}
                    >
                        <DataGrid rows={rows} columns={columns} />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <div style={{ height: 70 }} />
                    <Box
                        sx={{
                            height: 460, width: '100%',
                            '& .theme--Rows2': {
                                fontWeight: '100',
                                fontSize: 20
                            },
                            '& .theme--header2': {
                                backgroundColor: '#36A2FF',
                                fontWeight: '500',
                                fontSize: 25
                            },
                        }}
                    >
                        <DataGrid rows={rows2} columns={columns2} />
                    </Box>
                </Grid>
            </Grid>






        </div>

    );
}
/*<div style={{ height: 580, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={3}
                            rowsPerPageOptions={[5]}
                        />
                    </div>*/
export default graficos;