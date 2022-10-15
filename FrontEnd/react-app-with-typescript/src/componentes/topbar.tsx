import React from "react";
import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import './TopBar.css'

export default function topBar(){









    return (
        <NavbarBs sticky="top" className='topbarContainer'>
        <Container>
          <Nav >
            <Nav.Link to="/Area" as={NavLink}  className = 'Areas'>Areas</Nav.Link>
            <Nav.Link to="/Elementos" as={NavLink} className = 'Elementos'> Elementos</Nav.Link>
            <Nav.Link to="/Deterioro" as={NavLink} className = 'Deterioro'> Deterioro</Nav.Link>
       {/*         <Nav.Link to="/Encargado" as={NavLink} className = 'Encargado'> Encargado</Nav.Link>
            <Nav.Link to="/PlanInspeccion" as={NavLink} className = 'PlanInspeccion'> PlanInspeccion</Nav.Link>
            <Nav.Link to="/Consultas" as={NavLink} className = 'Consultas'> Consultas</Nav.Link>
            <Nav.Link to="/TareasEncarago" as={NavLink} className = 'TareasEncarago'> TareasEncarago</Nav.Link> */}
          </Nav>

        </Container>
      </NavbarBs>
    );
      
    }
    





