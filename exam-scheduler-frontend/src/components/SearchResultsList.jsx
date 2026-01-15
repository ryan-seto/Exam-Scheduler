import React from "react";
import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

const MAX_RESULTS = 8; // Maximum number of search results to display

export const SearchResultsList = ({ results }) => {

    const limitedResults = results.slice(0, MAX_RESULTS);
    return (
        <div className="results-list">
            {limitedResults.map((result, id) => {
                console.log(result); // Add this log to check each result
                return <SearchResult result={result} key={id} />;
            })}
        </div>
    );
};