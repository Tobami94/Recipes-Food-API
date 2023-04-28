import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipesDetail } from "../../redux/actions";

import StyleDetail from "./DetailsPage.module.css";

export default function Details(props) {
  const dispatch = useDispatch();
  const { id } = props.match.params;

  useEffect(() => {
    dispatch(getRecipesDetail(id));
  }, [id, dispatch]);

  const detallesRecipe = useSelector((state) => state.recipeDetails);

  console.log(detallesRecipe.name);

  return (
    <div className={StyleDetail.container} key={id}>
      <img
        className={StyleDetail.detailsImg}
        alt="null"
        src={detallesRecipe[0]?.image}
      />
      <div className={StyleDetail.contenedorTexto}>
        <h1 className={StyleDetail.nameDetail}>{detallesRecipe[0]?.name}</h1>
        <div>
          <h2 className={StyleDetail.titleDiets}>DIET TYPES </h2>
          <div className={StyleDetail.dietsDetail}>
            {detallesRecipe[0]?.diets
              ? detallesRecipe[0]?.diets.map((e) => {
                  return (
                    <h2 key={e}>
                      <button className={StyleDetail.dietaT}>{e}</button>
                    </h2>
                  );
                })
              : detallesRecipe[0]?.diets?.map((e) => {
                  return (
                    <h2 key={e.name}>
                      <button className={StyleDetail.dietaT}>{e.name}</button>
                    </h2>
                  );
                })}
          </div>
        </div>
        <div>
          <h3 className={StyleDetail.cta}>
            HealthScore {detallesRecipe[0]?.healthScore} Points
          </h3>
        </div>
        <div className="infoSalud">
          <h3 className={StyleDetail.titleDiets}>Summary </h3>
          <p className={StyleDetail.parrafos}>
            {detallesRecipe[0]?.summary?.replace(/<[^>]*>/g, "")}
          </p>
        </div>
        <div>
          <h3 className={StyleDetail.titleDiets}>Step by Step </h3>
          <ul className={StyleDetail.stepsUl}>
            {Array.isArray(detallesRecipe[0]?.steps) ? (
              detallesRecipe[0]?.steps.map((e) => {
                return <li key={e.number}>{e.step}</li>;
              })
            ) : (
              <li>{detallesRecipe[0]?.steps}</li>
            )}
          </ul>
        </div>

        <Link to="/home">
          <button className={StyleDetail.hbtn}>GO BACK</button>
        </Link>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}
