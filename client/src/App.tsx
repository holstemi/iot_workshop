import React, { Component } from 'react';
import SensorTable from './SensorTable';
import ReadingTable from './ReadingTable';
//import {Grid, Row, Col, Panel} from 'react-bootstrap';

interface State{
  sensors:{
    data: Sensor[],
    error: any
  }
  readings: {
    data: Reading[],
    error: any
  }
};



class App extends Component<{}, State> {
  state = {
    sensors: {
      data: [],
      error: null
    },
    readings: {
      data: [],
      error: null
    }
  }

  componentDidMount(){
    this.fetchSensors();
    this.fetchReadings();
    setInterval(this.fetchSensors.bind(this), 3000);
    setInterval(this.fetchReadings.bind(this), 3000);
  }

  async fetchSensors(){
    try{
      const response = await fetch('/api/getsensors');
      if(!response.ok){
        throw Error(response.statusText);
      }
      const data: Sensor[] = await response.json();
      this.setState({
        sensors: {
          data,
          error: null
        }
      });
    }
    catch(error){
      this.setState({
        sensors: {
          data: [],
          error: error.toString()
        }
      });
    }
  }

  async fetchReadings(){
    try{
      const response = await fetch('/api/getreadings/100');
      if(!response.ok){
        throw Error(response.statusText);
      }
      const data: Reading[] = await response.json();
      this.setState({
        readings: {
          data,
          error: null
        }
      });
    }
    catch(error){
      this.setState({
        readings: {
          data: [],
          error: error.toString()
        }
      });
    }
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <div>
          <SensorTable {...this.state.sensors}/>
        </div>
        <div>
          <ReadingTable {...this.state.readings}/>
        </div>
      </div>
    );
  }
}

export default App;
