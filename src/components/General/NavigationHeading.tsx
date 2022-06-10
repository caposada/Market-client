import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Online from './Online';
import Market from './Market';

export default function NavigationHeading() {

  return (
    <Navbar sticky="top" bg="dark" variant="dark" expand="lg" className="mb-1">
      <Container>
        <Navbar.Brand href="#home">Market Analyser</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">  
          <NavDropdown title={<span style={{ color: "white" }} >Market</span>} menuVariant="dark">
            <NavDropdown.Item style={{width:'300px'}} href="#action/3.1"></NavDropdown.Item> 
            <Market />
          </NavDropdown>
          <Nav className="me-auto"></Nav>  
          <Online />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};