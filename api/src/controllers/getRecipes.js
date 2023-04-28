require('dotenv').config();
const axios = require("axios");
const { Diet, Recipe } = require("../db");
const { API_KEY } = process.env;

// Controller functions: 

const getApiInfo = async () => {
    const { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const apiInfo = await data.results.map(i => {
        return {
            name: i.title,
            id: i.id,
            image: i.image,
            diets: i.diets,
            summary: i.summary,
            healthScore: i.healthScore,
            steps: i.analyzedInstructions[0]?.steps.map(e => {
                return {
                    number: e.number,
                    step: e.step
                }
            }),
        }
    });

    return apiInfo;
};


 const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet, //incluye este modelo para relaciones
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
}


//concateno la info traida de la api y la de la db

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
}
 



module.exports = {
    getApiInfo,
    getDbInfo,
    getAllRecipes, 
}