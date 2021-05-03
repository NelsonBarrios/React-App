import React,{useEffect, useState} from 'react';
import { useHistory} from 'react-router-dom';
import './BandDescription.css';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';


function BandDescription() {
  //States.
  const [albums,setAlbums] = useState([]);
  const history = useHistory();

  //Function Logout.
  const user = JSON.parse(localStorage.getItem('user-info'));
  function logout(){
    localStorage.clear();
    history.push('/');
  };

  //Get API Data
  const getData = async () => {
     const data = await fetch('https://my-json-server.typicode.com/improvein/dev-challenge/albums');
     const album = await data.json();
     setAlbums(album);
  };

  useEffect(() => {
    getData()
   }, []);
    return (
      <>
      <Container >
            <Row>
              <Col sm={6} xs={6} md={4} lg={4}>
                  <Image style={{maxWidth: '5rem'}} src="https://www.espectaculosbcn.com/wp-content/uploads/2019/05/mejores-grupos-de-rock-espa%C3%B1ol-1.jpg" roundedCircle />
              </Col>
              <Col sm={0} xs={0} md={4} lg={4}>
                <Nav justify variant="tabs">
                        <Nav.Item >
                          <Nav.Link style={{color: 'black'}} href='/home' active><strong>Bandas</strong></Nav.Link>
                        </Nav.Item>
                        <Nav.Item >
                          <Nav.Link style={{color: 'black'}} href="/home/1"><strong>Ficha de Banda</strong></Nav.Link>
                        </Nav.Item>
                      </Nav>
                </Col>
                <Col sm={6} xs={6} md={4} lg={4} left>
                <NavDropdown title={<strong style={{color: 'black'}}>{user.username}</strong>} id="nav-dropdown">
                      <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item >Profile</NavDropdown.Item>
                      <NavDropdown.Divider />
                      </NavDropdown>
                    </Col>
              </Row>
          </Container>
        <div key={albums.id} className="card mb-3 div">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src="https://www.espectaculosbcn.com/wp-content/uploads/2019/05/mejores-grupos-de-rock-espa%C3%B1ol-1.jpg"
                alt="..."
                className="img-fluid"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{albums[0].year}</h5>
                <p className="card-text">
                  {albums[0].name}
                </p>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}

export default BandDescription;