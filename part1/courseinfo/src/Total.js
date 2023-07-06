const Total = (props) =>{
	console.log("The only way to go fast, is to go well")

	return(
		<div>
		<p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
		</div>
	)
}

export default Total;
