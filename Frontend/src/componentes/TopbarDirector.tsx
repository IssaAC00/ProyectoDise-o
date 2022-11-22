import React, { useState } from "react";
import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import './TopBar.css'


interface Props {
  label: string;
} 

export default function topBar(props: Props){
  



    return (
        
        <NavbarBs sticky="top" className='topbarContainer'>
        <label htmlFor={props.label} style={{ position: "absolute"  ,top: 30, left: 1000 , color: 'Black', fontSize: 50}} >{props.label}</label>
        <Container>
          <Nav >
            <Nav.Link to="/PlanInspeccion" as={NavLink} className = 'PlanInspeccion'  style={{ position: "absolute"  ,top: 40, left: 2020 , color: 'white'}}> Plan Inspección</Nav.Link>
            <Nav.Link to="/Consultas" as={NavLink} className = 'Consultas'  style={{ position: "absolute"  ,top: 40, left: 2200 , color: 'white'}}> Consultas</Nav.Link>
          </Nav>



        </Container>
      </NavbarBs>
    );
      
    }
    

