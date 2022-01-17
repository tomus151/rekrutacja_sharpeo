const SearchFormButton = ({ name, click }) => {
    return (
        <button onClick={() => click(name)}>{name}</button>
    );
}

export default SearchFormButton;