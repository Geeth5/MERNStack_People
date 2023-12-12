import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaUserFriends, FaCog } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>People</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/people'>
                <Nav.Link>
                  <FaUserFriends /> People
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/settings'>
                <Nav.Link>
                  <FaCog /> Settings
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
