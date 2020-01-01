import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col, Input, Button } from 'reactstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faQuoteLeft, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as d3 from 'd3';
import { find, groupBy, orderBy } from 'lodash';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts"
library.add(faQuoteLeft, faGithub, faEnvelope)

let buttonStyle = {
    backgroundColor: "transparent",
    border: "none"
  }


export class Home extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            selectedState: '',
            selectedCity: '',
            defaultInfo: [
                { City: "" },
                { CompositeIndex: "100" },
                { GroceryItems: "100" },
                { HealthCare: "100" },
                { Housing: "100" },
                { Miscellaneous: "100" },
                { Transportation: "100" },
                { Utilities: "100" },
            ],
            cityInfo: [
                { City: "" },
                { CompositeIndex: "100" },
                { GroceryItems: "100" },
                { HealthCare: "100" },
                { Housing: "100" },
                { Miscellaneous: "100" },
                { Transportation: "100" },
                { Utilities: "100" },
            ],
            noData: ""
        }
    }
    render() {

        return (
            <>
                <Container>
                    <Row>
                        <Col>
                            <header>
                                <h1>The Real Cost...</h1>
                            </header>
                        </Col>
                    </Row>
                    <Row className="section">
                        <div>
                            <blockquote>
                                <FontAwesomeIcon icon={faQuoteLeft} />
                                The old rules are crumbling and nobody knows what the new rules are.
                                So make up your own rules.
                            <FontAwesomeIcon icon={faQuoteLeft} id="closeQuote" />
                                <cite>- Neil Gaiman to The University of the Arts in 2012</cite>
                            </blockquote>
                        </div>
                        <div>
                            <p>
                                Graduation is an exciting time and definately a milestone to be recognized.
                                However, this day also marks the beginning of a new adventure that comes with
                                more "adulting" than most are prepared for. Part of the challenge is trying to
                                figure out the real world.
                        </p>
                            <p>
                                Money in, money out is something everybody struggles with. Some of this cost can
                                be reduced by understanding cost of living. How much are you willing to
                                pay for food
                                or transportation or healthcare...?
                        </p>
                        </div>
                    </Row>
                </Container>
                <Container >
                    <Row className="section">
                        <Col>
                            <header>
                                <h2>Quick Search</h2>
                            </header>
                        </Col>
                    </Row>
                    <Row className="section">
                        <Col>
                            <p>Before we move on to discuss Cost of Living, lets take a moment run a quick search. Enter a city and state to see the results.</p>
                            <p>A more comprehensive search is available on the next page</p>
                        </Col>
                    </Row>
                    <Row>
                        <QuickSearch state={this.state} />
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col>
                            <header>
                                <h1>Cost of Living</h1>
                            </header>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row className="section">
                        <Col>
                            <h2>
                                What is the 'Cost of Living'?
                        </h2>
                        </Col>
                    </Row>
                    <Row className="section">
                        <Col>
                            <p>
                                The cost of living is the amount of money needed to sustain a certain level of living
                                including basic expenses such as housing, food, taxes and health care. The cost of living
                                is often used to compare how expensive it is to live in one city versus another.
                                The cost of living is tied to wages because salary levels are measured against the expenses
                                required to maintain a basic standard of living depending on the geographic region.
                        </p>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row className="section">
                        <Col>
                            <h2>
                                The Cost of Living Index
                        </h2>
                        </Col>
                    </Row>
                    <Row className="section">
                        <Col>
                            <p>
                                The cost of living index compares the cost of living in a major city to a corresponding
                                metropolitan area. The index incorporates the expense of various components of basic human
                                needs creating an aggregate measure that workforce entrants can use as a benchmark. As college
                                graduates weigh employment alternatives and currently employed job seekers consider relocation,
                                the index provides an informative snapshot of rental, transportation and grocery costs.
                    </p>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row className="section">
                        <Col>
                            <h2>
                                Cost of Living and Wages
                        </h2>
                        </Col>
                    </Row>
                    <Row className="section">
                        <Col>
                            <p>
                                The rising cost of living has spurred debate over the U.S. federal minimum wage and the
                                disparity
                                between the lowest wage allowed by law and the earnings needed to maintain an adequate cost
                                of living. Proponents of a minimum wage hike cite increased worker productivity levels since
                                1968 as inequitably correlated to the minimum hourly rate of pay in 2012. As the minimum wage
                                once tracked the increase in productivity, the divergence between earnings and worker
                                efficiency
                                has reached historically disproportionate levels. By contrast, opponents of a minimum wage
                                increase contend that a raise could spur higher consumer prices as employers offset rising
                                labor
                                costs.
                    </p>
                            <cite><a href="https://www.investopedia.com/terms/c/cost-of-living.asp" alt="link to investopidia"> - Investopidia</a></cite>
                        </Col>
                    </Row>
                    <Row className="footer">
                        <Col >
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



class QuickSearch extends Component {
    state = this.props.state
    componentDidMount() {
        d3.csv("data/cost-of-living-index.csv").then(d => {
            this.setState({
                data: d
            })
        })
    }

    quickSearchResults(event) {
        event.preventDefault();
        let cityInfo = find(this.state.data, (d) => {
            let dCity = d.City.toUpperCase()
            let sCity = this.state.selectedCity.toUpperCase()
            return (dCity === sCity && d.State === this.state.selectedState)
        })
        this.setState({ cityInfo: [cityInfo] })
        if (cityInfo === null || cityInfo === undefined) {
            this.setState({
                noData: "Unfortunately the information you are requesting is currently unavailable. Please Try again.",
                cityInfo: this.state.defaultInfo
            })
        } else {
            this.setState({ noData: "" })
        }

    }

    render() {
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
                <Row form>
                    <Col md={6} className="userInput">
                        <Input onChange={(event) => { this.setState({ selectedState: event.target.value }) }} type="select" name="select" id="State">
                            {createStateOptions}
                        </Input>
                    </Col>
                    <Col md={6} className="userInput">
                        <Input onChange={(event) => { this.setState({ selectedCity: event.target.value }) }} type="city-name" name="city-name" id="City" placeholder="City" />
                    </Col>
                    <Col className="userInput"><Button className="button" onClick={(event) => { this.quickSearchResults(event) }}>Search</Button></Col>
                </Row>

                <Row className="text-warning error">
                    <p>
                        {this.state.noData}
                    </p>
                </Row>

                <Row >
                <ResponsiveContainer width="99%" aspect={2}>
                    <BarChart data={this.state.cityInfo}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="City" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="CompositeIndex" fill="#B31E00" />
                        <Bar dataKey="GroceryItems" fill="#E6E600" />
                        <Bar dataKey="Housing" fill="#1A9900" />
                        <Bar dataKey="Utilities" fill="#001999" />
                        <Bar dataKey="Transportation" fill="#FF00FF" />
                        <Bar dataKey="HealthCare" fill="#FF7733" />
                        <Bar dataKey="Miscellaneous" fill="#8884d8" />
                    </BarChart>
                    </ResponsiveContainer>
                </Row>
            </Container>
        )
    }
}




