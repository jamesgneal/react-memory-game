import React from "react";
import "./MemoryCard.css";

const MemoryCard = props => (
	<button onClick={props.checkClicked}>
		<div className="card">
			<div className="img-container">
				<img id={props.name} alt={props.name} src={props.image} data-clicked={props.clicked} />
			</div>
		</div>
	</button>
);

export default MemoryCard;
