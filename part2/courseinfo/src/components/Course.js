import Header from './Header'
import Content from './Content'

const Course = ({ course }) => {
    return (
        <>
            <Header course = {course.name}/>
            <Content parts= {course.parts} exercises = {course.exercises} />
        </>
    )
}

export default Course;