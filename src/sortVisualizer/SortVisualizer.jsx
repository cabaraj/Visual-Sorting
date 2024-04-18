import React from "react";
import "./SortVisualizer.css";
import DisplayBars from "./DisplayBars.jsx";
import bubbleSort from "./algorithms/bubbleSort.js";

const NUMBER_OF_BARS = 10;
const INITIAL_COLOR = "gray";
const COMPARING_COLOR = "blue";
const SWAP_COLOR = "red";
const COMPLETED_COLOR = "green";
const ANIMATION_WAIT_TIME_MS = 100;

export default class SortVisualizer extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            array : [],
        };
    }

    //when the component first gets included into the main HTML file
    componentDidMount() {
        this.initArray();
    }

    initArray() {
        function getRandomInt() {
            return Math.floor(Math.random() * NUMBER_OF_BARS)+1
        }
        const array = [];
        
        for (let i = 0; i < NUMBER_OF_BARS; i++){
            array.push(getRandomInt())
        }
        // init the array to have random integers to be represented with bars
        this.setState({array});
    }

    //function to call sort algo and receives an array with the necessary swaps
    async startSort() {
        const copyArray = [...this.state.array];
        
        const swaps = bubbleSort(copyArray);
        for(let swap of swaps){
            await sleep(3);
            animateBars(swap);  
        }
    }
    
    //function that will return something to be displayed initially
    render() {
        //const {array} = this.state;
        const array = this.state.array;
        return (
            <div className="container">
                <div className="row" id="bar-container">
                    <DisplayBars array={array} barColor={INITIAL_COLOR} noOfBars={NUMBER_OF_BARS}/>                        
                </div>
                <div className="row">
                    <div className="col">
                        <button onClick={() => this.initArray()}>Generate New Array</button>
                        <button onClick={() => this.startSort()}>Sort</button>
                    </div>                
                </div>
            </div>
        );
        
    }
}

async function sleep(n){
    // n is the number of times the function was called in the nested function
    return new Promise(resolve => setTimeout(resolve, ANIMATION_WAIT_TIME_MS*n));
}

/* to show as if we change bars, we modify their height */
async function animateBars(currentBars, i) {
    const arrayBars = document.getElementsByClassName("array-bar");
    const b1 = arrayBars[currentBars[0]].style;
    const b2 = arrayBars[currentBars[1]].style;
    //change bars color to COMPARING and check if swap is needed
    //await sleep();
    b1.backgroundColor = b2.backgroundColor = COMPARING_COLOR;
    await sleep(1);    
    if(currentBars[2]){
        [b1.height, b2.height] = [b2.height, b1.height];
        b1.backgroundColor = b2.backgroundColor = SWAP_COLOR;
    }
    await sleep(1);
    b1.backgroundColor = b2.backgroundColor = INITIAL_COLOR;
    await sleep(1);    
}


