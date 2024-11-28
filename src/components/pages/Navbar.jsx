import React, { useState } from 'react';
import { Navbar, Nav, Dropdown, Image, Container } from 'react-bootstrap';
import { ChevronDown, ChevronUp } from 'lucide-react';

const MovieNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Navbar expand="lg" style={{ backgroundColor: '#282c34' , height: '80px'}} fixed="top">
      <Container>
        <Navbar.Brand href="/" style={{ color: '#CBAE81', fontSize : '24px', fontWeight : 'bold', paddingRight : "3" }}>BINUSKOP</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbar-nav"
          style={{ backgroundColor: '#CBAE81', borderColor: '#CBAE81' , }} 
        />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" style={{ color: '#CBAE81',fontSize : '18px' }}>Home</Nav.Link>
            <Nav.Link href="/history" style={{ color: '#CBAE81' ,fontSize : '18px'}}>History</Nav.Link>
          </Nav>

          <Dropdown
            className="d-none d-lg-flex" 
            show={isDropdownOpen}
            onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Dropdown.Toggle
              as="div"
              id="dropdown-basic"
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
              <Image
                src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
                roundedCircle
                style={{ width: '40px', height: '40px', marginRight: '10px' }}
              />
              <span style={{ color: '#CBAE81' }}>User</span>
              {isDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </Dropdown.Toggle>

            <Dropdown.Menu align="end" style={{ backgroundColor: '#CBAE81', borderRadius: '8px',}}>
              <Dropdown.Item href="/login" >Sign Up</Dropdown.Item>
              <Dropdown.Item href="/">Keluar</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MovieNavbar;
