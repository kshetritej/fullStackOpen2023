import Header from '.components/Header';
import Content from '.components/Content';

const Course = (props) =>{
    return (
        <div>
            <Header course = {props.name} />
            <Content content = {props.parts} />
        </div>
    )
}

export default Course;
