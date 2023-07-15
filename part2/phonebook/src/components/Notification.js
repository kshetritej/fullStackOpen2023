const Notification = ({message}) => {
    if(message === null){
        return null
    }
    return(
        <div className="warning">
            {message}
        </div>
    )
}

export default Notification