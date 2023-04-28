import React from "react";

import StylePag from "./Paginado.module.css";

export default function Paginado({ recipesPerPage, allRecipes, paginado}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav  className={StylePag.pagination}>
      <ul className={StylePag.pages}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className="number" key={number}>
              <button
              className={StylePag.pageBtn}
                onClick={() => paginado(number)}
                style={{ width: "30px" }}>
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
