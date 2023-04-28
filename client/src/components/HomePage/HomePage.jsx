import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import StyleHome from "./Home.module.css";
import {
  getRecipes,
  filterDietType,
  filterCreados,
  orderAlfabethic,
  orderScoreHealth,
} from "../../redux/actions";

//components
import Card from "./Card/Card";
import Paginado from "./Paginado/Paginado";
import SearchBar from "./SearchBar/SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((e) => e.recipes); //trae el estado de reducer

  //localState páginado
  const [currentPage, setCurrentPage] = useState(1); //página inicial
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const [order, setOrder] = useState("");
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  ); //devuelve el indice y el ultimo de las recetas

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes())
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  function handleFilterDiet(e) {
    e.preventDefault();
    dispatch(filterDietType(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterCreados(e) {
    dispatch(filterCreados(e.target.value));
  }

  function handleOrderAlpha(e) {
    e.preventDefault();
    dispatch(orderAlfabethic(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleHealthScore(e) {
    e.preventDefault();
    dispatch(orderScoreHealth(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  return (
    <div className={StyleHome.home}>
      <div className={StyleHome.containerText}>
        <h1>Recipes Cook</h1>
        <p>
          Search for recipes, filter them by type of diet or origin.<br></br>{" "}
          You can order the recipes that you like by health score or
          alphabetical order. <br></br>You can also create your own recipes to
          share with the community.
        </p>
        <button className={StyleHome.refreshButton} onClick={handleClick}>
          RESTORE FILTERS
        </button>
        <Link to="/">
          <button className={StyleHome.createButton}>CREATE NEW RECIPE</button>
        </Link>
        <br></br>
        <br></br>
        <SearchBar></SearchBar>
      </div>
      <br></br>
      <br></br>
      <label className={StyleHome.filters}>Organizar recetas </label>
      <select
        className={StyleHome.opciones1}
        onChange={(e) => handleOrderAlpha(e)}>
        <option disabled selected>
          default
        </option>
        <option value="ascen">A - Z</option>
        <option value="descen">Z - A</option>
      </select>
      <select
        className={StyleHome.opciones1}
        onChange={(e) => handleHealthScore(e)}>
        <option disabled selected>
          HealthScore
        </option>
        <option value="asc">Min to Max</option>
        <option value="desc">Max to Min</option>
      </select>
      <label className={StyleHome.filters}>Tipos de dietas </label>
      <select
        className={StyleHome.opciones1}
        onChange={(e) => handleFilterDiet(e)}>
        <option value="All">All recipes</option>
        <option value="ketogenic">Keto</option>
        <option value="whole 30">Whole30</option>
        <option value="primal">Primal</option>
        <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
        <option value="gluten free">Gluten Free</option>
        <option value="dairy free">Dairy Free</option>
        <option value="paleolithic">Paleo</option>
        <option value="pescatarian">Pescetarian</option>
        <option value="fodmap friendly">Low FODMAP</option>
        <option value="vegan">Vegan</option>
      </select>
      <label className={StyleHome.filters}>Origen </label>
      <select
        className={StyleHome.opciones1}
        onChange={(e) => handleFilterCreados(e)}>
        <option value="AllRecip">All recipes</option>
        <option value="allDB">Created</option>
        <option value="allApi">Api</option>
      </select>
      <br></br>
      <div>
        <Paginado
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
        />
      </div>
      <br></br>
      <div className={StyleHome.allCards}>
        {currentRecipes?.map((i) => {
          return (
            <Link to={"/" + i.id}>
              <Card key={i.id} name={i.name} image={i.image} diets={i.diets} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
