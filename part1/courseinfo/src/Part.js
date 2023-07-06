
const Part = (props) => {
	console.log(props)
	return(
		<div>
		<p>{props.name} {props.number} </p>
		</div>
	)
}

export default Part;
