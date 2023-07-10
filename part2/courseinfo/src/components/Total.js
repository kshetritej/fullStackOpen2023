const Total = ({ parts }) => {

    const totalExercises = parts.reduce((previousVal, exercises) => {
        return previousVal += exercises.length
    }, 0)

    return(
        <>
        <h4> Total Exercises: {totalExercises} </h4>
        </>
    )
}

export default Total;