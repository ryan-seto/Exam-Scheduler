import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import debounce from "lodash/debounce";

export const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState("");
    const [data, setData] = useState([]);
    // const searchBarRef = useRef(null); // Reference to the search bar container
    // const resultsRef = useRef(null); // Reference to the results list
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data once when the component mounts
        fetch("http://localhost:5001/api/exams")
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    // Debounced version of handleChange
    const debouncedHandleChange = debounce((value) => {
        const lowerCaseValue = value.toLowerCase();
        const filteredResults = data.filter((user) =>
            user?.Exam?.toLowerCase().includes(lowerCaseValue)
        );
        console.log("Filtered results:", filteredResults); // Debugging
        setResults(filteredResults);
    }, 50); // Wait 300ms after the last keystroke

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);

        if (value) {
            debouncedHandleChange(value);
        } else {
            setResults([]); // Clear results if input is empty
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission

            // Get the first result from the filtered results
            const firstResult = data.find((exam) =>
                exam?.Exam?.toLowerCase().includes(input.toLowerCase())
            );

            if (firstResult && firstResult.id) {
                navigate(`/exam/${firstResult.id}`);
            } else {
                console.error("No results found.");
            }
        }
      };

    const handleClear = () => {
        setInput(""); // Clear input field
        setResults([]); // Clear results
    };

    // this is messing with the search results, this was an attempt to hide
    // search results after clicking elsewhere on the screen

    // const handleClickOutside = (event) => {
    //     if (
    //         (!searchBarRef.current || !searchBarRef.current.contains(event.target)) &&
    //         (!resultsRef.current || !resultsRef.current.contains(event.target)) // Exclude clicks on results
    //     ) {
    //         setResults([]); // Clear results on outside click
    //     }
    // };

    // useEffect(() => {
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, []);

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input
                placeholder="Search for a course code"
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown} // Listen for Enter key
            />
            <button className="clear-button" onClick={handleClear}>
                CLEAR
            </button>
        </div>
    );
};
