import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postNewRecipe, getDiets } from "../../redux/actions";
import { Link, useHistory } from "react-router-dom";
import StyleForm from "./FormPage.module.css";

function validate(create) {
  const errors = {};
  if (!create.name) errors.name = "El nombre es requerido";
  if (create.healthScore < 1 || create.healthScore > 100)
    errors.healthScore = "El HealthScore no puede ser superior a 100";
  if (!create.diets.length) errors.diets = "Debes elegir los tipos de dieta";
  return errors;
}

export default function FormPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [create, setCreate] = useState({
    name: "",
    summary: "",
    healthScore: "",
    diets: [],
    steps: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    e.preventDefault();
    setCreate((prevCreate) => {
      const newCreate = {
        ...prevCreate,
        [e.target.name]: e.target.value,
      };
      const validations = validate(newCreate);
      setErrors(validations);
      return newCreate;
    });
  }

  function handleSelect(e) {
    setCreate({
      ...create,
      diets: [...create.diets, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(errors).length > 0) {
      alert("Porfavor esta informacion es requerida");
    } else if (
      create.name === "" &&
      create.healthScore === "" &&
      create.diets === ""
    ) {
      alert("El formulario no esta completado");
    } else {
      dispatch(postNewRecipe(create));
      alert("Su receta fue publicada con exito");
      setCreate({
        name: "",
        summary: "",
        healthScore: "",
        steps: [],
        diets: [],
      });
      history.push("/home");
    }
  }

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className={StyleForm.createRecipe}>
      <h1 className={StyleForm.infoMsg}>Crear nueva Receta</h1>
      <form
        className={StyleForm.form}
        onSubmit={(e) => {
          handleSubmit(e);
        }}>
        <div>
          <label>Name recipe: </label>
          <input
            placeholder=" your recipe name"
            type="text"
            value={create.name}
            name="name"
            onChange={(e) => handleChange(e)}></input>
        </div>
        <div>
          <label>Summary: </label>
          <input
            placeholder=" recipe summary"
            type="text"
            value={create.summary}
            name="summary"
            onChange={(e) => handleChange(e)}></input>
        </div>
        <div>
          <label>Health Score: </label>
          <input
            placeholder=" recipe health score"
            type="text"
            value={create.healthScore}
            name="healthScore"
            onChange={(e) => handleChange(e)}></input>
        </div>
        <div>
          <label>Image: </label>
          <input
            type="text"
            value={create.image}
            name="image"
            onChange={(e) => handleChange(e)}></input>
        </div>
        <br></br>
        <div className={StyleForm.nameInput}>
          <label className="msgs">Step by Step </label>
          <br></br>
          <br></br>
          <textarea
            name="steps"
            type="text"
            rows="4"
            cols="40"
            value={create.steps}
            onChange={(e) => handleChange(e)}
          />
          {errors.steps && (
            <span className={StyleForm.errors}>{errors.steps}</span>
          )}
        </div>
        <div>
          <h3>Diets Types</h3>
        </div>
        <div>
          <div onChange={(e) => handleSelect(e)}>
            <label>
              <input
                className={StyleForm.inputs}
                type="checkbox"
                value="whole 30"
              />
              Whole30
            </label>
            <label>
              <input
                className={StyleForm.inputs}
                type="checkbox"
                value="primal"
              />
              Primal
            </label>
            <label>
              <input
                className={StyleForm.inputs}
                type="checkbox"
                value="lacto ovo vegetarian"
              />
              Lacto-Ovo-Vegetarian
            </label>
            <label>
              <input
                className={StyleForm.inputs}
                type="checkbox"
                value="gluten free"
              />
              Gluten Free
            </label>
            <label>
              {" "}
              <input
                className={StyleForm.inputs}
                type="checkbox"
                value="dairy free"
              />
              Dairy Free
            </label>
            <label>
              <input
                className={StyleForm.inputs}
                type="checkbox"
                value="paleolithic"
              />
              Paleo
            </label>
            <label>
              {" "}
              <input
                className={StyleForm.inputs}
                type="checkbox"
                value="pescatarian"
              />
              Pescetarian
            </label>
            <label>
              <input
                className={StyleForm.inputs}
                type="checkbox"
                value="fodmap friendly"
              />
              Low FODMAP
            </label>
            <label>
              {" "}
              <input
                className={StyleForm.inputs}
                type="checkbox"
                value="vegan"
              />
              Vegan
            </label>
          </div>
        </div>
        <br></br>
        <button className={StyleForm.sendButton} type="submit">
          REGISTER YOUR RECIPE
        </button>
      </form>
      <br></br>
      <Link to="/home">
        <button className={StyleForm.hbtn}>GO BACK</button>
      </Link>
    </div>
  );
}
