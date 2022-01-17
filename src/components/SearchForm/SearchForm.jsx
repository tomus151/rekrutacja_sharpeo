import { useState, useEffect } from 'react';
import SearchFormInput from '../SearchFormInput/SearchFormInput';
import SearchFormButton from '../SearchFormButton/SearchFormButton';
import SearchFormList from '../SearchFormList/SearchFormList';
import './SearchForm.css';
const inputsNames = ['search', 'replace']
const buttonsNames = ['search', 'replace', 'replace all']
const SearchForm = () => {
    const [comments, setComments] = useState([])
    const [searchInputValue, setSearchInputValue] = useState("");
    const [replaceInputValue, setReplaceInputValue] = useState("");
    const setFirstData = async () => {
        await fetch('https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=revisions&rvprop=content&rvsection=0&list=search&format=json&srsearch=%22Liverpool%22&srlimit=10')
            .then(response => response.json())
            .then(data => {
                let newData = data.query.search.map((item) => {
                    let newItem = { ...item };
                    newItem.title = newItem.title.replace(/<span.*">/g, '').replace(/<\/span>/, '')
                    newItem.snippet = newItem.snippet.replace(/<span.*">/g, '').replace(/<\/span>/, '')
                    return newItem
                })
                setComments(newData)
            })
    }
    useEffect(() => {
        setFirstData()
    }, [])
    const handleFormSubmit = (e) => {
        e.preventDefault()
    }
    const handleInputChange = (e) => {
        if (e.target.name === 'search') setSearchInputValue(e.target.value)
        else if (e.target.name === 'replace') setReplaceInputValue(e.target.value);
    }
    const inputsArray = inputsNames.map((name, index) => {
        return (
            <SearchFormInput
                key={'input-' + index}
                name={name}
                value={name === 'search' ? searchInputValue : replaceInputValue}
                change={handleInputChange}
            />
        )

    })
    const handleClick = (name) => {
        if (name === 'search') {
            let newData = [...comments].map(item => {
                let newItem = { ...item }
                newItem.title = newItem.title.replaceAll('<span class="text-to-highlight">', '').replaceAll('</span>', '')
                newItem.snippet = newItem.snippet.replaceAll('<span class="text-to-highlight">', '').replaceAll('</span>', '')
                if (newItem.title.indexOf(searchInputValue) > -1) {

                    newItem.title = newItem.title.replaceAll(searchInputValue, '<span class="text-to-highlight">' + searchInputValue + '</span>')
                }
                if (newItem.snippet.indexOf(searchInputValue) > -1) {
                    newItem.snippet = newItem.snippet.replaceAll('<span class="text-to-highlight">', '').replaceAll('</span>', '')
                    newItem.snippet = newItem.snippet.replaceAll(searchInputValue, '<span class="text-to-highlight">' + searchInputValue + '</span>')
                }
                return newItem;
            })
            setComments(newData)
        } else if (name === 'replace') {
            let canReplace = true;
            let newData = [...comments].map((item, index) => {
                if (canReplace) {
                    let newItem = { ...item }
                    if (newItem.title.indexOf(searchInputValue) > -1 && canReplace) {
                        newItem.title = newItem.title.replace('<span class="text-to-highlight">', '').replace('</span>', '')
                        newItem.title = newItem.title.replace(searchInputValue, replaceInputValue)
                        canReplace = false;
                    }
                    if (newItem.snippet.indexOf(searchInputValue) > -1 && canReplace) {
                        newItem.snippet = newItem.snippet.replace('<span class="text-to-highlight">', '').replace('</span>', '')
                        newItem.snippet = newItem.snippet.replace(searchInputValue, replaceInputValue)
                        canReplace = false
                    }
                    return newItem;
                }
                return item;
            })
            setComments(newData)
        } else if (name === 'replace all') {
            let newData = [...comments].map((item, index) => {
                let newItem = { ...item }
                if (item.title.indexOf(searchInputValue) > -1) {
                    newItem.title = item.title.replaceAll('<span class="text-to-highlight">', '').replaceAll('</span>', '').replaceAll(searchInputValue, replaceInputValue)
                }
                if (item.snippet.indexOf(searchInputValue) > -1) {
                    newItem.snippet = item.snippet.replaceAll('<span class="text-to-highlight">', '').replaceAll('</span>', '').replaceAll(searchInputValue, replaceInputValue)
                }
                return newItem;
            })
            setComments(newData)
        }
    }
    const buttonsArray = buttonsNames.map((name, index) => <SearchFormButton key={String(Math.floor(Math.random() * 1000)) + String(new Date().getTime() + String(index))} name={name} click={handleClick} />)
    return (
        <form className="form-container" onSubmit={handleFormSubmit}>
            <div className="form-top-container">
                <div className="inputs-container">
                    {inputsArray}
                </div>
                <div className="buttons-container">
                    {buttonsArray}
                </div>
            </div>
            <SearchFormList comments={comments} />
        </form>
    );
}

export default SearchForm;