const Statistics = (props) =>{
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
