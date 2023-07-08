const Statistics = (props) =>{
	if(props.all == 0){
		return(
			<p>No feedbacks given</p>
		)
	}
	return(
		<div>
		<p> Good {props.good} </p>
		<p> Neutral {props.neutral} </p>
		<p> Bad {props.bad} </p>
		<p> All {props.all} </p>
		<p> Average {props.average} </p>
		<p> Positive Feedbacks : {props.positive} </p>
		</div>
	)
}

export default Statistics;
