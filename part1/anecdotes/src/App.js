import {useState} from 'react'
import Button from './Button'

const App = () => {
	const anecdotes = [
		'If it hurts, do it more oftern.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimiztionis the root of all evil.',
		'Debugging is twice as hard as writing the code int he first place. Therefore, if you write the code as cleverly as possible, you are, by definition , not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
		'The only way to go fast, it to go well.'
]

const [selected, setSelected] = useState(0)

const randomNumber =()=>{
	const rand = Math.floor(Math.random()*8)
	console.log(rand)
	return(
		rand
	)
}

const newAnecdote =() =>{
	return(
		setSelected(randomNumber())
	)
}

return (
	<div>
	<p> {anecdotes[selected]} </p>
	<div>
	<Button handleClick = {newAnecdote} text="roll again!"  />
	</div>
	</div>
)
}
export default App;
