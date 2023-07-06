const Total = (props) =>{
	console.log("The only way to go fast, is to go well")

	return(
		<div>
		<p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
		</div>
	)
}

export default Total;
