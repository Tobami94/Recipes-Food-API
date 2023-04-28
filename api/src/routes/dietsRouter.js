const { Router } = require('express');
const axios = require("axios");
const { API_KEY } = process.env;
const { Diet } = require('../db');


const router = Router();


 router.get('/', async (req, res) => {
 const  { data }  = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
 const dietasTotal = data.results.map(e => e.diets)
 const dietsDb = dietasTotal.flat() //crea nueva matriz y concatena
    dietsDb.forEach(element => {
        Diet.findOrCreate({
            where: {
                name: element
            }
        })
        
    });

   const allDiets = await Diet.findAll();
   return res.status(200).send(allDiets);
}); 


module.exports = router;