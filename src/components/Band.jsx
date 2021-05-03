import React,{ useEffect, useState } from 'react';
import { useHistory, Redirect} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import BandDescription from '../pages/BandDescription';

 function Band() {
   //States.
  const [vis, setVis] = useState(null);
  const handleBand = (e) => setVis(e.target.value);
  const [memb, setMemb] = useState(false);
  const handleClick = () => setMemb(!memb);
  const [ord, setOrd] = useState('');
  const handleSort = (e) => setOrd(e.target.value);
  const [bands,setBands] = useState([]);
  const history = useHistory();

  //Function Logout.
  const user = JSON.parse(localStorage.getItem('user-info'));
  function logout(){
    localStorage.clear();
    history.push('/');
  };

  //Get API Data.
  const obtenerDatos = async () => {
     const data = await fetch('https://my-json-server.typicode.com/improvein/dev-challenge/bands');
     const bandas = await data.json();
     setBands(bandas);
  };

  useEffect(() => {
    obtenerDatos()
   }, []);
  
  //Function Sort Bands for Country.
  bands.sort((a,b)=>{
    if(ord === 'Newest'){
      return parseInt(b.year) - parseInt(a.year);
    }
    else if( ord === 'Oldest'){
      return parseInt(a.year) - parseInt(b.year);
    }
  });

  //Redirect to Component Band-Detail.
  const handleLink = (e) =>{
    history.push(`/${e.target.value}`);
  } 
    return(
        <div>
          <Container>
            <Row>
              <Col sm={6} xs={6} md={4} lg={4}>
                  <Image style={{maxWidth: '5rem'}} src="https://i2.wp.com/a33revoluciones.com/wp-content/uploads/2019/01/canciones-sobre-depresi%C3%B3n.jpg?resize=750%2C410" roundedCircle />
              </Col>
              <Col sm={0} xs={0} md={4} lg={4}>
                <Nav justify variant="tabs">
                        <Nav.Item >
                          <Nav.Link style={{color: 'black'}} href='/home'><strong>Bandas</strong></Nav.Link>
                        </Nav.Item>
                        <Nav.Item >
                          <Nav.Link style={{color: 'black'}} href="/home/1"><strong>Ficha de Banda</strong></Nav.Link>
                        </Nav.Item>
                      </Nav>
                </Col>
                <Col sm={6} xs={6} md={4} lg={4} >
                <NavDropdown title={<strong style={{color: 'black'}}>{user.username}</strong>} id="nav-dropdown">
                      <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item >Profile</NavDropdown.Item>
                      <NavDropdown.Divider />
                      </NavDropdown>
                    </Col>
              </Row>
          </Container>

          <Container>
              <h1 className="container display-6"><strong>Descubrí todas las Bandas</strong></h1>
          </Container>

          <Container>
              <Nav variant="tabs" style={{flexWrap:'nowrap', justifyContent:'flex-start'}}>
              <Navbar bg="light" expand="md">
              <Navbar.Brand>Filtrar por</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
              <button className="btn btn-light" value={null} onClick={handleBand}>Todos</button>
              <button className="btn btn-light" value="United States" onClick={handleBand}>United States</button>
              <button className="btn btn-light" value="Italy" onClick={handleBand}>Italy</button>
              <button className="btn btn-light" value="Brazil" onClick={handleBand}>Brazil</button>
              <button className="btn btn-light" value="United Kingdom" onClick={handleBand}>United Kingdom</button>
              <button className="btn btn-light" value="Netherlands" onClick={handleBand}>Netherlands</button>
              </Nav>
              </Navbar.Collapse>
              </Navbar>
                <select defaultValue="Sort" onChange={handleSort} className="form-select form-select-lg mb-3" aria-label=".form-select-lg default example">
                <option value="Sort">Ordenar por</option>
                <option value="Sort">Nada</option>
                <option value="Newest">De menor a mayor antigüedad</option>
                <option  value="Oldest">De mayor a menor antigüedad</option>
                </select>
            </Nav>
          </Container>
          
        {vis ? <Container>
            <CardDeck>
              <Row>
              {bands.map(item => item.country === vis ? (
                <Col sm={12} xs={12} md={3} lg={3} key={item.id}>
                <Card >
                  <Card.Body style={{textAlign: "center"}}>
                    <Card.Title style={{textAlign: "center"}}><strong>{item.name}</strong></Card.Title>
                    <Card.Text style={{textAlign: "center"}}>{item.year} | {item.genreCode}</Card.Text>
                    <Card.Text style={{textAlign: "center"}}>{item.country}</Card.Text>
                    <Button onClick={handleClick} style={{textAlign: "center"}} variant="dark" type="button">Conocer Miembros</Button>
                    {memb ? item.members.map(member => <p key={item.id} className="card-text mt-2" style={{textAlign: "center"}}><strong>{member.name}</strong></p>) : null}                  
                  </Card.Body>
                </Card> 
              </Col>
              ): null)}
          </Row>
          </CardDeck>
          </Container> :
        <Container>
            <CardDeck>
              <Row>
              {bands.map(item => (
                <Col sm={12} xs={12} md={3} lg={3} key={item.id}>
                <Card >
                  <Card.Body style={{textAlign: "center"}}>
                    <Card.Title style={{textAlign: "center"}}><strong>{item.name}</strong></Card.Title>
                    <Card.Text style={{textAlign: "center"}}>{item.year} | {item.genreCode}</Card.Text>
                    <Card.Text style={{textAlign: "center"}}>{item.country}</Card.Text>
                    <Button onClick={handleClick} style={{textAlign: "center"}} variant="outline-secondary" type="button">Conocer Miembros</Button>
                    {memb ? item.members.map(member => <p key={item.id} className="card-text mt-2" style={{textAlign: "center"}}><strong>{member.name}</strong></p>) : null}                  
                    <Button value={item.id} onClick={handleLink} style={{textAlign: "center"}} variant="outline-secondary" type="button">Conocer sus Álbumes</Button>
                  </Card.Body>
                </Card> 
              </Col>
              ))}
          </Row>
          </CardDeck>
          </Container>}
          
        
        </div>
    )
}
export default Band;