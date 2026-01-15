import React from "react";
import "./SearchResult.css"

import { useNavigate } from "react-router-dom";

export const SearchResult = ({ result }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log(result.id); // Check if the id is correct
        navigate(`/exam/${result.id}`);
    };

    return (
        <div
            className="search-result"
            onClick={handleClick}
        >
            {result.Exam}
        </div>
    );
};
