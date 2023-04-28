import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getRecipesName } from "../../../redux/actions";

import StyleSearch from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setSearchName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getRecipesName(name));
  }

  function handleChange(e) {
    e.preventDefault();
    setSearchName(e.target.value);
  }

  return (
    <div className={StyleSearch.search}>
      <input
        className={StyleSearch.searchTerm}
        type="text"
        onChange={handleChange}
        placeholder="Search recipe"
      />
      <button
        className={StyleSearch.searchButton}
        type="submit"
        onClick={(e) => {
          handleSubmit(e);
          setSearchName('');
        }}>
        Search
      </button>
    </div>
  );
}
