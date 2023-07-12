const PersonForm = (props) => {

    return(
    <>
        <form onSubmit={props.onSubmitAction}>
            <h3>Add New Entry</h3>
            <div>
                name: <input type="text" value={props.nameValue} onChange={props.onNameChange} />
                <div>phone: <input type="number" value={props.phoneValue} onChange={props.onPhoneChange} /></div>
            </div>
            <div>
                <button type="submit" > add </button>
            </div>
        </form>
    </>
    )

    //   <PersonForm onSubmitAction = {addName} nameValue = {newName} onNameChange ={handleNameChange} phoneValue = {newNumber} onPhoneChange = {handleNumberChange} />

}

export default PersonForm