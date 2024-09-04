import React, {Component} from 'react';
import './App.css';

function Display (props) {
  return (
  <div className='displays'>
    <div id='currentCalcDisplay'>{props.currCalc}</div>
    <div id='display'>{props.currInput}</div>
  </div>);
};

class Calculator extends Component {
  constructor (props) {
    super(props);
    this.state = {
      lastClicked: "",
      currentDisplay: "",
      currentCalc: [],
      input: "0"
    }

    this.allClear = this.allClear.bind(this);
    this.addNumber = this.addNumber.bind(this);
    this.addDot = this.addDot.bind(this);
    this.addSign = this.addSign.bind(this);
    this.getResult = this.getResult.bind(this)
  };

  allClear () {
    this.setState({
      lastClicked: "",
      currentDisplay: "",
      currentCalc: [],
      input: "0"
    })
  };

  addNumber (number) {
    let newInput = "";
    let newInputArr = [];

    if (this.state.lastClicked === "=") {
      newInput = number;
      newInputArr = [number];
    } else if(["+", "-", "/", "*", "+-", "--", "/-", "*-" ].includes(this.state.input)) {
      newInput = number;
      newInputArr = this.state.currentCalc.concat(newInput);
    } else if (this.state.input === "0"){
      newInput = number;
      newInputArr = this.state.currentCalc.slice(0, -1).concat(newInput);
    } else {
      newInput = this.state.input + number;
      newInputArr = this.state.currentCalc.slice(0, -1).concat(newInput);
    };

    this.setState({
      lastClicked: number,
      currentDisplay: newInputArr.join(""),
      currentCalc: newInputArr,
      input: newInput
    });
  };

  addDot () {
    let newInput = "";
    let newInputArr = [];

    if (this.state.input.includes(".")) {
      newInput = this.state.input;
      newInputArr = this.state.currentCalc.slice(0, -1).concat(newInput);
    } else if (["+", "-", "/", "*","+-", "--", "/-", "*-" ].includes(this.state.input)){
      newInput = "0.";
      newInputArr = this.state.currentCalc.concat(newInput);
    } else {
      newInput = this.state.input + ".";
      newInputArr = this.state.currentCalc.slice(0, -1).concat(newInput);
    };

    this.setState({
      lastClicked: ".",
      currentDisplay: newInputArr.join(""),
      currentCalc: newInputArr,
      input: newInput
    });
  }

  addSign (sign) {
    let newInput = "";
    let newInputArr = [];

    if (["+", "-", "/", "*", "+-", "--", "/-", "*-" ].includes(this.state.input)) {
      if(sign === "-" && this.state.input.length <= 1) {
        newInput = this.state.input + sign;
        newInputArr = this.state.currentCalc.slice(0, -1).concat(newInput);
      } else {
        newInput = sign;
        newInputArr = this.state.currentCalc.slice(0, -1).concat(newInput);
      };
    } else {
      newInput = sign;
      newInputArr = this.state.currentCalc.concat(newInput)
    };

    this.setState({
      lastClicked: sign,
      currentDisplay: newInputArr.join(""),
      currentCalc: newInputArr,
      input: newInput
    });
  }

  getResult () {
    const result = eval(this.state.currentCalc.slice().join("")); 
    const newDisplay = this.state.currentCalc.concat(" =", result);

    console.log(result);

    this.setState({
      lastClicked: "=",
      currentDisplay: newDisplay.join(""),
      currentCalc: [result],
      input: result
    })
  } 


  render () {
    const {currentDisplay, currentCalc, input} = this.state;

    return (
      <div className="CalculatorContainer">
        <Display currCalc={currentDisplay} currInput={input} />
        <div id="buttons">
          <button id='clear' onClick={this.allClear}>AC</button>
          <button id='divide' className='calc' onClick={() => {this.addSign("/")}}>/</button>
          <button id='multiply' className='calc' onClick={() => {this.addSign("*")}}>x</button>
          <button id='seven' className='number' onClick={() => {this.addNumber("7")}}>7</button>
          <button id='eight' className='number' onClick={() => {this.addNumber("8")}}>8</button>
          <button id='nine' className='number' onClick={() => {this.addNumber("9")}}>9</button>
          <button id='subtract' className='calc' onClick={() => {this.addSign("-")}}>-</button>
          <button id='four' className='number' onClick={() => {this.addNumber("4")}}>4</button>
          <button id='five' className='number' onClick={() => {this.addNumber("5")}}>5</button>
          <button id='six' className='number' onClick={() => {this.addNumber("6")}}>6</button>
          <button id='add' className='calc' onClick={() => {this.addSign("+")}}>+</button>
          <button id='one' className='number' onClick={() => {this.addNumber("1")}}>1</button>
          <button id='two' className='number' onClick={() => {this.addNumber("2")}}>2</button>
          <button id='three' className='number' onClick={() => {this.addNumber("3")}}>3</button>
          <button id='zero' className='number' onClick={() => {this.addNumber("0")}}>0</button>
          <button id='decimal' className='number' onClick={this.addDot}> . </button>
          <button id='equals'onClick={this.getResult}>=</button>
        </div>      
      </div>
    );
  }
};

export default Calculator;
