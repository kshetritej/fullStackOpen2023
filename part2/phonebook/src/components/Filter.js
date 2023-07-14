import Person from './Person'

const Filter = (props) => {
    return (
        <>
            <div className='search'><h3>Search</h3>
                <input type="search" value={props.searchValue} onChange={props.onSearchChange} />
               
                {props.filterName.map((per) => (
                    props.searchTerm.length > 0 &&
                    <div>
                    <h4>Results matching {props.searchTerm}</h4>
                    <Person name={per.name} number={per.phone} />
                    </div>
                ))}
            </div>
        </>
    )

    // <Filter searchValue = {newSearch} onSearchChange = {handleSearchValue} filterName = {filteredNames} searchTerm = {newSearch} />
}

export default Filter