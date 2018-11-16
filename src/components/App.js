import React, { Component } from 'react';
import '../styles/App.css';

const wrapper = {
  margin: '40px',
  border: '5px solid #00cef5'
};
class App extends Component {
  state = {
    numInputs: 0,
    values: [],
    errorMessage: ''
  };

  handleNumInputChange = e => {
    let numInputs = parseInt(e.target.value);
    let values = this.state.values;
    values.length = 0;

    this.setState({
      numInputs: numInputs,
      values
    });
  };

  handleInputChange = (i, e) => {
    let values = this.state.values;
    values[i] = e.target.value;
    if (e.target.value.match(/^[\+|\-]*$/g)) {
      this.setState({ values: values });
    }
  };

  determineFlips = index => {
    let values = this.state.values;
    let value = values[index];
    let counter = 0;
    if (value && value[value.length - 1] === '-') {
      counter = 1;
    }
    if (value && value.length > 1) {
      for (let i = 0; i < value.length - 1; i++) {
        if (value[i] !== value[i + 1]) {
          counter++;
        }
      }
    }
    return counter;
  };

  render() {
    let numInputs = this.state.numInputs;
    let pancakeStacks = [];
    for (let i = 0; i < numInputs; i++) {
      pancakeStacks.push(
        <div style={wrapper}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 50%' }}>
            <div style={{ alignSelf: 'center' }}>
              <p style={{ fontWeight: 'bold' }}>Enter Pancakes</p>
              <input
                style={{ marginBottom: '10px' }}
                onChange={e => this.handleInputChange(i, e)}
                placeholder="e.g. ++--+"
              />
            </div>
            <div style={{ justifySelf: 'start', alignSelf: 'center' }}>
              <p style={{ fontWeight: 'bold' }}>
                Number of flips: {this.determineFlips(i)}
              </p>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="App">
        <div>
          <h1>Enter amount of test cases</h1>
          <input onChange={this.handleNumInputChange} placeholder="e.g. 5" />
        </div>
        {pancakeStacks}
      </div>
    );
  }
}

export default App;
