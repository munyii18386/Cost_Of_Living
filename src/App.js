import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Home } from './home';
import { Cpi } from './cpi';
import { MapClass } from './map';
import { Button } from 'reactstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faMoneyBillAlt, faMapMarkerAlt, faAngleLeft, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from '@fortawesome/free-brands-svg-icons'
library.add(faHome, faMoneyBillAlt, faMapMarkerAlt, faAngleLeft, faEnvelope, faGithub)



let buttonStyle = {
  backgroundColor: "transparent",
  border: "none"
}

class App extends Component {

  render() {
    return (
      <>
        <Router>

          <Container className="box" role="navigation">
            <Row>
              <Col>
                <Link to='/'><Button className="link" style={buttonStyle}><FontAwesomeIcon  icon={faHome} size='3x' color="gray" /></Button></Link>
              </Col>
              <Col>
                <Link to='/cpi'><Button className="link" style={buttonStyle}><FontAwesomeIcon icon={faMoneyBillAlt} size='3x' color="gray" /></Button></Link>
              </Col>
              <Col>
                <Link to='/map'><Button className="link" style={buttonStyle}><FontAwesomeIcon  icon={faMapMarkerAlt} size='3x' color="gray" /></Button></Link>
              </Col>
              <Col>
                <Link to='/MytestClass'><Button className="link" style={buttonStyle}>Test DB</Button></Link>
              </Col>
            </Row>
            <Route exact path="/" component={Home} />
            <Route path="/cpi" component={Cpi} />
            <Route path="/map" component={MapClass} />
            {/* <Route path="/MytestClass" component={TestClass} /> */}
          </Container>
        </Router>
       
      </>














    );
  }
}

export default App;
