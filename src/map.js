import React, { Component } from 'react'
import './App.css';
import * as d3 from 'd3';
import { Container, Row, Col, FormGroup, Label, Input, Card, CardBody, CardTitle, CardSubtitle, CardText , Button} from 'reactstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Map, TileLayer, Marker, Popup, } from 'react-leaflet'
import L from 'leaflet'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faMoneyBillAlt, faMapMarkerAlt, faAngleLeft, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from '@fortawesome/free-brands-svg-icons'
library.add(faHome, faMoneyBillAlt, faMapMarkerAlt, faAngleLeft, faEnvelope, faGithub)

let buttonStyle = {
    backgroundColor: "transparent",
    border: "none"
  }

//custom map markers for leaflet
const greenIcon = L.icon({
    iconUrl: 'img/green-marker.png',
    iconSize: [25, 41],
    iconAnchor: [22, 94],
    popupAnchor: [-10, -90],
});
const redIcon = L.icon({
    iconUrl: 'img/red-marker.png',
    iconSize: [25, 41],
    iconAnchor: [22, 94],
    popupAnchor: [-10, -90],
});

const blueIcon = L.icon({
    iconUrl: 'img/blue-marker.png',
    iconSize: [25, 41],
    iconAnchor: [22, 94],
    popupAnchor: [-10, -90],
});


export class MapClass extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            filteredData: [],
            zoom: 4,
            selected: '',
        }

    }

    render() {
        return (
            <>
                <Container>
                    <Row>
                        <Col>
                            <header >
                                <h1>Cost of Living Map</h1>
                            </header>
                           
                        </Col>
                    </Row>
                    <Row className="section">
                    <p>Here is a closer look at the cost of living across the US. Please note: information
                                displayed is based on the data available thus not all cities are represented on this map.
                    </p>
                    </Row>
                    <LeafletMap state={this.state} />
                    <Row className="footer">
                        <Col>
                            <Button style={buttonStyle}>
                                <a href="https://github.com/info340d-au18/project-munyii18386.git" alt="github">
                                    <FontAwesomeIcon className="navicon" icon={faGithub} color="gray" size='2x' /></a>
                            </Button>
                        </Col>
                        <Col>
                            <p>© 2018 Mburu</p>
                        </Col>
                        <Col>
                            <Button style={buttonStyle}>
                                <a href="mailto: lmburu@uw.edu" alt="email">
                                    <FontAwesomeIcon className="navicon" icon={faEnvelope} color="gray" size='2x' /></a>
                            </Button>
                        </Col>
                    </Row>
                    <Row className="end"></Row>
                </Container>
            
            </>
        )
    }

}

class LeafletMap extends Component {
    state = this.props.state

    //load in data. Data origins: https://github.com/dannycochran/Cost-of-Living/blob/master/living.csv
    componentDidMount() {
        d3.csv("data/cost-of-living-index.csv").then(d => {
            this.setState({
                data: d
            })
        })
    }

    //handles click event
    handleClick(event) {
        this.setState({ selected: event.target.id })

        if (event.target.id === 'High') {
            let highInfo = this.state.data.filter((d) => {
                return (d.CompositeIndex > 100)
            })
            this.setState({
                zoom: 4,
                filteredData: highInfo,
            })
        } else if (event.target.id === "Low") {
            let lowInfo = this.state.data.filter((d) => {
                return (d.CompositeIndex < 90)
            })
            this.setState({
                zoom: 5,
                filteredData: lowInfo,
            })
        } else if (event.target.id === "Mid") {
            let midInfo = this.state.data.filter((d) => {
                return (d.CompositeIndex > 90 && d.CompositeIndex < 100)
            })
            this.setState({
                zoom: 5,
                filteredData: midInfo,
            })
        } else {
            this.setState({
                zoom: 5,
                filteredData: this.state.data,
            })
        }
    }

    // create custom card for popup
    renderCardInfo(d) {
        return (
            <Card className="bg-info clearfix">
                <CardBody>
                    <CardTitle>Location: {d.City + ", " + d.State}</CardTitle>
                    <CardSubtitle>Composite Index: {d.CompositeIndex}</CardSubtitle>
                    <CardText>Grocery Index: {d.GroceryItems}</CardText>
                    <CardText>Housing Index: {d.Housing}</CardText>
                    <CardText>Utilities Index: {d.Utilities}</CardText>
                    <CardText>Transportation Index: {d.Transportation}</CardText>
                    <CardText>Healthcare Index: {d.HealthCare}</CardText>
                    <CardText>Misc Index: {d.Miscellaneous}</CardText>
                </CardBody>
            </Card>
        )
    }

  
    render() {
        // set map controls
        let options = ["All", "Low", "Mid", "High"];
        let mapControls = options.map((d, i) => {
            return (
                <Col key={i}>
                    <FormGroup check>
                        <Label check>
                            <Input onClick={(event) => this.handleClick(event)} type="radio" name={"radio" + i} id={d} checked={this.state.selected === d} />
                            {d + " Points"}
                        </Label>
                    </FormGroup>
                </Col>
            )
        })

        //create location markers based on data set
        let leafyMarkers = this.state.filteredData.map((d, i) => {
            if (d.CompositeIndex < 90) {
                return (
                    <Marker
                        key={i}
                        position={[d.Lat, d.Long]} icon={greenIcon} >
                        <Popup>{this.renderCardInfo(d)}</Popup>

                    </Marker>)
            } else if (d.CompositeIndex > 90 && d.CompositeIndex < 100) {
                return (
                    <Marker
                        key={i}
                        position={[d.Lat, d.Long]} icon={blueIcon}>
                        <Popup >{this.renderCardInfo(d)}</Popup>
                    </Marker >)
            } else {
                return (
                    <Marker onClick={this.renderMarkerInfo}
                        key={i}
                        position={[d.Lat, d.Long]} icon={redIcon}>
                        <Popup>{this.renderCardInfo(d)}</Popup>
                    </Marker>)
            }
        })

        // display map
        return (
            <Container className="leafyMap">
                <Row>
                    {mapControls}
                </Row>
                <Map className="leafyMap" center={[37.6, -95.665]} zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {leafyMarkers}
                </Map>
            </Container>
        )
    }
}


