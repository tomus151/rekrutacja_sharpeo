import SearchFormListElement from '../SearchFormListElement/SearchFormListElement';
import './SearchFormList.css';
const SearchFormList = ({ comments }) => {
    const listElements = comments.map((item, index) => {
        return (< SearchFormListElement
            key={String(Math.floor(Math.random() * 1000)) + String(new Date().getTime()) + String(index)}
            data={item}
        />)
    });
    return (
        <ul>
            {listElements}
        </ul>
    );
}

export default SearchFormList;