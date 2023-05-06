import React, { useState, } from 'react'
import { useNavigate } from 'react-router-dom';
import { BiSearchAlt } from "react-icons/bi";
import "./Header/Header.css";
const Search = ({ history }) => {

    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const searchHandler = (e) => {
        e.preventDefault()
        // console.log(keyword);
        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }

    return (

        <form onSubmit={searchHandler} className='search'>
                <input
                    type="text"
                    id="search_field"
                    className=""
                    autoComplete="off"
                    placeholder="Search..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <div className='searchBtn'>
                    <button id="search_btn" className="">
                        <BiSearchAlt />
                    </button>
                </div>
        </form>
    )
}

export default Search