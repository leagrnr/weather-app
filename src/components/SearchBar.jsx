import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const onChange = (event, { newValue }) => {
        setValue(newValue);
    };

    const onSuggestionsFetchRequested = async ({ value }) => {
        if (value.length > 2) {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                params: {
                    q: value,
                    format: "json",
                    addressdetails: 1,
                    limit: 5,
                },
            });
            setSuggestions(response.data.map(city => ({
                name: city.display_name,
                lat: city.lat,
                lon: city.lon,
            })));
        }
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const getSuggestionValue = suggestion => suggestion.name;

    const renderSuggestion = suggestion => (
        <div className="suggestion-item">
            {suggestion.name}
        </div>
    );

    const onSuggestionSelected = (event, { suggestion }) => {
        onSearch(suggestion.name);
    };

    const inputProps = {
        placeholder: "Search for a city",
        value,
        onChange,
    };

    return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            onSuggestionSelected={onSuggestionSelected}
            inputProps={inputProps}
            theme={{
                container: "autosuggest-container",
                suggestionsContainer: "suggestions-container",
                suggestion: "suggestion",
                suggestionHighlighted: "suggestion-highlighted",
            }}
        />
    );
};

export default SearchBar;