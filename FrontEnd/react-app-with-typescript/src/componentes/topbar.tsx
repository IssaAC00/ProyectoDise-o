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

          </Nav>

        </Container>
      </NavbarBs>
    );
      
    }
    





