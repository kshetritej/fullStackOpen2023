const Person = (props) =>{
    const text = "Delete"
    return(
        <div>
            
            <h5>{props.name} : {props.number} 
                <button onClick = {props.deleteName}>{text}</button>
            </h5>
            
        </div>
    )
}

export default Person