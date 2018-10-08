import React from 'react'
import Card from './card.js'
import './main.css'
import swal from 'sweetalert2';

let pokeArray = 'burger, cake, choclate, chocochip, chocoroll, cupcake, donut, Icecream'

  pokeArray = pokeArray.split(', ')

class Memorygame extends React.Component {
	constructor(props) {
		super(props);
		this.restart = this.restart.bind(this);
		this.resetTime = null;
		this.checkMatch = this.checkMatch.bind(this);

		this.state = this.cleanState();

		this.state.deck = this.shuffleDeck();
	}
	cleanState() {
		return {
			deck: this.shuffleDeck(),
			pairs: [],
			selected: [],
			moves: 0,
			count:0,
		};
	}
	
	componentWillMount(){
		clearInterval(this.timer)
	}
	tick(){
		this.setState({count:(this.state.count+1)})
	}

	startTimer(){
		clearInterval(this.timer)
		this.timer = setInterval(this.tick.bind(this),800)
	}
	stopTimer(){
		clearInterval(this.timer)
	}
  gameBoard () {
    return (
      <div id='gameBoard'> {
					this.state.deck.map((card, i) => {
						return (
							<Card
								className={card}
								handleClick={this.clickHandler.bind(this, i)}
								index={i}
								id={i}
								isSelected={this.state.selected.includes(i)}
								key={i}
								didMatch={this.state.pairs.includes(i)}
							/>
						)
					}, this)
				}
			</div>
		)
	}

	clickHandler(cid) {
		if(this.state.selected.includes(cid) || this.resetTime) {
			return;
		}
		if(this.state.selected.length >= 1) {
			this.resetTime = setTimeout(() => {
				this.checkMatch();
			}, 500);
		}
		this.state.selected.push(cid)
		let moves=this.state.moves;
		this.startTimer();
		moves+=1;
		this.setState({
			moves,
			selected: this.state.selected
		})
	}

	checkMatch() {
		let pairs = this.state.pairs;
		const matchSelected = this.state.selected.map((id) => {
			return this.state.deck[id];
		});
		
		if(matchSelected[0] === matchSelected[1]) {
			pairs = pairs.concat(this.state.selected); 
		}

		this.setState({
			selected: [],
			pairs,
		});
		this.resetTime = null;
		if(this.state.pairs.length === 12) {
			this.stopTimer();
			swal({
				title:'Finish',
				text:'Do you want to restart',
				type:"sucess",
				confirmButtonText:"Restart",
				reverseButtons:true
			}).then((result)=>{
				if(result.value){
					this.restart();
				}
			})
		}
	}

  render () {
    const gameboard = this.gameBoard()
  	return (
			<div>
				{gameboard}
				<div className="footer">
				<div className="moves">Moves : {this.state.moves}</div>
				<div id="timer">Time : {this.state.count}</div>
				</div>
			</div>
		);
  }

	
  pickCards() {
    const deck = [];
		let pokeArrayCopy = pokeArray.slice();
		let i = 0;

    while (i < 6) {
			let j = 0;
			const randomNumber = this.randomNumber(pokeArrayCopy);
      const newCard = pokeArrayCopy.splice(randomNumber, 1)[0];

		  while (j < 2) {
        deck.push(newCard);
				j++;
      }
			i++;
    }
		return deck;
  }

  shuffleDeck() {
    let deck = this.pickCards();

    for(let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tempVal = deck[i];
      deck[i] = deck[j];
      deck[j] = tempVal;
    }
    return deck;
  }

	randomNumber(arr) {
		const ourArray = arr;
		const min = 0;
		const max = ourArray.length - 1;  
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	
	restart() {
		this.setState(this.cleanState());
	}
};
export default Memorygame;