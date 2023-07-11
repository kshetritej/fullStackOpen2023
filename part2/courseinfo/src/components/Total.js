const Total = ({ parts }) => {

    let totalExercises = parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0);

    return (
        <h4>Total exercises: {totalExercises} </h4>
    )
}

export default Total;