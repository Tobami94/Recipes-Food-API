import React from "react";
import StyleCard from "./Card.module.css";

export default function RecipeCard({ name, image, diets }) {
  return (
    <div className={StyleCard.container}>
      <div className={StyleCard.card}>
      <img
        src={image}
        className={StyleCard.cardImg}
        no-repeat 
        center
        alt="null"
        width="200px"
        height="250px"
      />
      <h3 className={StyleCard.cardName}>{name}</h3>

<h3 className={StyleCard.titleDietas}>DIET TYPES</h3>    
      <div>
        {diets?.map((e) => {
          return <button className={StyleCard.cardDieta}>{e}</button>
        })}
      </div>
      <br></br>
      <a href="#" className={StyleCard.btn}>Let's Cook!</a>
      </div>
      </div>
  );
}
