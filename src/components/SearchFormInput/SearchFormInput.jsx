const SearchFormInput = ({ value, name, change }) => {
    return (
        <input type="text" name={name} value={value} onChange={change} placeholder={name} />
    );
}

export default SearchFormInput;