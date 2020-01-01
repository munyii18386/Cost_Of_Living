import React, { Component } from 'react';
import * as d3 from 'd3';
import { Container, Row, Col } from 'reactstrap';
import { Button, FormGroup, Input } from 'reactstrap';
import { find, groupBy, orderBy } from 'lodash';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faMoneyBillAlt, faMapMarkerAlt, faAngleLeft, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from '@fortawesome/free-brands-svg-icons'
library.add(faHome, faMoneyBillAlt, faMapMarkerAlt, faAngleLeft, faEnvelope, faGithub)

let buttonStyle = {
    backgroundColor: "transparent",
    border: "none"
  }

export class Cpi extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            currentCity: '',
            currentState: '',
            desiredCity: '',
            desiredState: '',
            noData: "",
            statement: '',
            summary: [
                { name: "CPI", current: 100, anticipated: 100 },
                { name: "Grocery", current: 100, anticipated: 100 },
                { name: "Housing", current: 100, anticipated: 100 },
                { name: "Util", current: 100, anticipated: 100 },
                { name: "Trans", current: 100, anticipated: 100 },
                { name: "Health", current: 100, anticipated: 100 },
                { name: "Misc", current: 100, anticipated: 100 }
            ],
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Cost of Living Comparison</h1>
                    </Col>
                </Row>
                <Row className='section'>
                    <p>Explore the differences between locations. Enter your current city, state and your desired
                         city, state to see the difference in cost of living.Please Note: Results are dependent on the available data.</p>
                </Row>
                <FormArea state={this.state} />
                <Row className="footer" >
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


        )
    }
}

class FormArea extends Component {
    state = this.props.state

    // getting the data
    componentDidMount() {
        d3.csv("data/cost-of-living-index.csv").then(d => {
            this.setState({
                data: d
            })
        })
    }

    handleClick(event) {
        if (event.target.id === "currentState") {
            this.setState({ currentState: event.target.value })
        } else if (event.target.id === "currentCity") {
            this.setState({ currentCity: event.target.value })
        } else if (event.target.id === "desiredState") {
            this.setState({ desiredState: event.target.value })
        } else {
            this.setState({ desiredCity: event.target.value })
        }


    }

    renderInfo(event) {
        event.preventDefault()
        this.setState({
            noData: '',
            statement: ''
        })
        let currentInfo = find(this.state.data, (d) => {
            return (d.City.toUpperCase() === this.state.currentCity.toUpperCase() && d.State === this.state.currentState)
        })
        let desiredInfo = find(this.state.data, (d) => {
            return (d.City.toUpperCase() === this.state.desiredCity.toUpperCase() && d.State === this.state.desiredState)
        })
        if (currentInfo === null || currentInfo === undefined || desiredInfo == null || desiredInfo == null) {
            this.setState({
                noData: "Unfortunately the information you are requesting is currently unavailable. Please Try again.",
                summary: [
                    { name: "CPI", current: 100, anticipated: 100 },
                    { name: "Grocery", current: 100, anticipated: 100 },
                    { name: "Housing", current: 100, anticipated: 100 },
                    { name: "Util", current: 100, anticipated: 100 },
                    { name: "Trans", current: 100, anticipated: 100 },
                    { name: "Health", current: 100, anticipated: 100 },
                    { name: "Misc", current: 100, anticipated: 100 }
                ],
            })
        } else {
            let mysummary = [
                { name: "CPI", current: currentInfo.CompositeIndex, anticipated: desiredInfo.CompositeIndex },
                { name: "Grocery", current: currentInfo.GroceryItems, anticipated: desiredInfo.GroceryItems },
                { name: "Housing", current: currentInfo.Housing, anticipated: desiredInfo.Housing },
                { name: "Util", current: currentInfo.Utilities, anticipated: desiredInfo.Utilities },
                { name: "Trans", current: currentInfo.Transportation, anticipated: desiredInfo.Transportation },
                { name: "Health", current: currentInfo.HealthCare, anticipated: desiredInfo.HealthCare },
                { name: "Misc", current: currentInfo.Miscellaneous, anticipated: desiredInfo.Miscellaneous }
            ]
            let comment = "Differences between " + currentInfo.City + ", " + currentInfo.State + " and " + desiredInfo.City + ", " + desiredInfo.State
            console.log(mysummary)
            console.log(comment)
            this.setState({
                statement: comment,
                summary: mysummary
            })
        }




    }

    render() {


        //create list of states
        let groupState = groupBy(orderBy(this.state.data, ["State"], ['asc']), "State")
        let listOfStates = ["Select a State"]
        for (let key in groupState) {
            listOfStates.push(key)
        }
        let createStateOptions = listOfStates.map((d, i) => {
            return (
                <option key={i}>{d}</option>
            )
        })

        
        return (
            <Container>
                <Row>
                    <p className="text-muted label">
                        I live in:
                    </p>

                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Input onChange={(event) => { this.handleClick(event) }} type="select" name="select" id="currentState">
                                {createStateOptions}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Input onChange={(event) => { this.handleClick(event) }} type="email" name="email" id="currentCity" placeholder="Current City" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <p className="text-muted label">
                        I want to live in:
                    </p>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Input onChange={(event) => { this.handleClick(event) }} type="select" name="select" id="desiredState">
                                {createStateOptions}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Input onChange={(event) => { this.handleClick(event) }} type="email" name="email" id="desiredCity" placeholder="Desired City" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Button className="button" onClick={(event) => { this.renderInfo(event) }}>Compare</Button>
                </Row>
                <Row className="text-warning error">
                    <p>
                        {this.state.noData}
                    </p>
                </Row>
                <Row className="text-success info">
                    <p>
                        {this.state.statement}
                    </p>
                </Row>
                <Row >
                <ResponsiveContainer width="89%" aspect={2}>
                    <BarChart  data={this.state.summary}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="current" stackId="a" fill="#D0FF14" />
                        <Bar dataKey="anticipated" stackId="a" fill="#AB274F" />
                    </BarChart>
                </ResponsiveContainer>
                </Row>
            </Container>
        )
    }
}






