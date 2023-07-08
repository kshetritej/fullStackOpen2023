import StatisticLine from './StatisticLine'

const Statistics = (props) =>{
	if(props.all == 0){
		return(
			<p>No feedbacks given</p>
		)
	}
	return(
		<table>
		<StatisticLine text = "good" value = {props.good} />
		<StatisticLine text = "neutral" value = {props.neutral} />
		<StatisticLine text = "bad" value = {props.bad} />
		<StatisticLine text = "All" value = {props.all} />
		<StatisticLine text = "average" value = {props.average} />
		<StatisticLine text = "positive" value ={props.positive} />
		</table>
	)
}

export default Statistics;
