import React from "react";
import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import './TopBar.css'

export default function topBar(){



    return (
        <NavbarBs sticky="top" className='topbarContainer'>
        <Container>
          <Nav >
            <Nav.Link to="/Deterioro" as={NavLink} className = 'Deterioro'  style={{ position: "absolute"  ,top: 40, left: 1770 , color: 'white'}}> Deterioro</Nav.Link>
            <Nav.Link to="/Encargado" as={NavLink} className = 'Encargado'  style={{ position: "absolute"  ,top: 40, left: 1890 , color: 'white'}}> Encargado</Nav.Link>
            <Nav.Link to="/PlanInspeccion" as={NavLink} className = 'PlanInspeccion'  style={{ position: "absolute"  ,top: 40, left: 2020 , color: 'white'}}> Plan Inspeccion</Nav.Link>
            <Nav.Link to="/Consultas" as={NavLink} className = 'Consultas'  style={{ position: "absolute"  ,top: 40, left: 2200 , color: 'white'}}> Consultas</Nav.Link>
            <Nav.Link to="/TareasEncarago" as={NavLink} className = 'TareasEncarago' style={{ position: "absolute"  ,top: 40, left: 2320 , color: 'white'}}> Tareas Encargado</Nav.Link> 
            <Nav.Link to="/Area" as={NavLink} className = 'A' style={{ position: "absolute"  ,top: 40, left: 1560 , color: 'white'}}> Area </Nav.Link> 
            <Nav.Link to="/Elementos" as={NavLink} className = 'Elementos' style={{ position: "absolute"  ,top: 40, left: 1640 , color: 'white'}}> Elementos</Nav.Link>
          </Nav>

        </Container>
      </NavbarBs>
    );
      
    }
    





