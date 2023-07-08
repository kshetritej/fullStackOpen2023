import StatisticLine from './StatisticLine'

const Statistics = (props) =>{
	if(props.all == 0){
		return(
			<p>No feedbacks given</p>
		)
	}
	return(
		<div>
		<StatisticLine text = "good" value = {props.good} />
		<StatisticLine text = "neutral" value = {props.neutral} />
		<StatisticLine text = "bad" value = {props.bad} />
		<StatisticLine text = "All" value = {props.all} />
		<StatisticLine text = "average" value = {props.average} />
		<StatisticLine text = "positive feedbacks" value ={props.positive} />
		</div>
	)
}

export default Statistics;
