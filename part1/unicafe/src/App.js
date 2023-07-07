import {useState} from 'react'
import Button from './Button'

const App = () =>{
	//saves clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	
	const countGood = () =>{
		return (
			setGood(good + 1)
			
		)
	}
	
	const countNeutral = () => {
		return (
			setNeutral(neutral +1)
		)
	}
	const countBad = () =>{
		return (
			setBad(bad + 1)
		)
	}

	console.log("good", good)
	console.log("neutral", neutral)
	console.log("bad", bad)
	return (
		<div>
			<h1> Give Feedback </h1>
			<Button handleClick = {countGood}  text = 'Good' />
			<Button handleClick = {countNeutral} text = "Neutral" />
			<Button handleClick = {countBad} text = "Bad" />
	
		<h1> Statistics </h1>
		<p> Good {good} </p>
		<p> Neutral {neutral} </p>
		<p> Bad {bad} </p>

		</div>
	)

}

export default App;
