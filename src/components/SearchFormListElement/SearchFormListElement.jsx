import './SearchFormListElement.css';
const SearchFormListElement = ({ data }) => {
    const { title, snippet } = data;
    return (
        <li>
            <hr />
            <h3 dangerouslySetInnerHTML={{ __html: title }}></h3>
            <p dangerouslySetInnerHTML={{ __html: snippet }}></p>
            <hr />
        </li>
    );
}

export default SearchFormListElement;