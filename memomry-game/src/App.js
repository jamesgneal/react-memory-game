import React, { Component } from "react";
import MemoryCard from "./components/MemoryCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Score from "./components/Score";
import friends from "./friends.json";
import "./App.css";

class App extends Component {
	// Setting this.state.friends to the friends json array
	state = {
		cardArr: [],
		score: 0,
		hiScore: 0
	};

	// refactored shuffle from star wars rpg - dunno how "Reactorish" this is
	shuffleCards = arr => {
		let j, x, i;
		for (i = arr.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = arr[i];
			arr[i] = arr[j];
			arr[j] = x;
		}
		this.setState({ cardArr: arr });
	};

	componentDidMount() {
		this.shuffleCards(friends);
	}

	allFalse = () => {
		console.log(friends);
		for (let i = 0; i < friends.length; i++) {
            document.getElementById(friends[i].name).setAttribute("data-clicked", false);
        }
	};

	incrementScore = () => {
		// up the score
		this.setState({ score: this.state.score + 1 });

		// check to see if the hi score needs to be updated
		if (this.state.score >= this.state.hiScore) {
			this.setState({ hiScore: this.state.hiScore + 1 });
		}
	};

	loseGame = () => {
		alert("You lost");
		this.setState({ score: 0 });
		this.allFalse();
		this.shuffleCards(friends);
	};

	checkClicked = event => {
		if (event.target.getAttribute("data-clicked") === "true") {
			console.log("clicked");
			this.loseGame();
		} else {
			console.log("not clicked");
			this.incrementScore();
			event.target.setAttribute("data-clicked", true);
			this.shuffleCards(friends);
		}
	};

	// Map over this.state.cardArr and render a MemoryCard component for each card object
	render() {
		return (
			<Wrapper>
				<Title>
					Memory Game
					<Score score={this.state.score} hiScore={this.state.hiScore} />
				</Title>
				{this.state.cardArr.map(card => (
					<MemoryCard
						id={card.id}
						key={card.id}
						image={card.image}
						name={card.name}
						clicked={false}
						checkClicked={this.checkClicked}
					/>
				))}
			</Wrapper>
		);
	}
}

export default App;
