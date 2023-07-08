import {useState} from 'react'
import Button from './Button'
import Statistics from './Statistics'

const App = () =>{
	//saves clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const [total, setTotal] = useState(0)

	const countGood = () =>{
		return (
			setGood(good + 1),
			setTotal(total +1)
		)
	}
	
	const countNeutral = () => {
		return (
			setNeutral(neutral +1),
			setTotal(total + 1)
		)
	}
	const countBad = () =>{
		return (
			setBad(bad + 1),
			setTotal(total +1)
		)
	}
	const calcAverage = () =>{
		const average = total/3
		return(average)
	}
	const calcPositive = () =>{
			const positivePercentage =((good/total) *100)
		return(
			Number(positivePercentage) + "%")
	}
	console.log("good", good)
	console.log("neutral", neutral)
	console.log("bad", bad)
	console.log("total", total)
	return (
		<div>
			<h1> Give Feedback </h1>
			<Button handleClick = {countGood}  text = 'Good' />
			<Button handleClick = {countNeutral} text = "Neutral" />
			<Button handleClick = {countBad} text = "Bad" />
	
		<h1> Statistics </h1>
		<Statistics good = {good} neutral = {neutral} bad = {bad} all={total} average={calcAverage()} positive = {calcPositive()} />
		</div>
	)

}

export default App;
