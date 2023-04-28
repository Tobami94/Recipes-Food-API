const { Router } = require('express');
const { Recipe, Diet } = require('../db')



const router = Router();




router.post('/', async (req, res) => {

      try {

        const { name, image, summary, healthScore, diets, steps, createInDb } = req.body;
               console.log(diets)
        const createRecipe = await Recipe.create({
            name,
            image,
            summary,
            healthScore,
            steps,
            createInDb,
    
        })

        const createDb = await Diet.findAll({
            where: {
                name: diets
            }
        })
        createRecipe.addDiet(createDb)
        return res.status(200).send("La receta fue creada con exito")  
    } catch (err) {
         res.status(404).json({ err: err.message })
    }

    }); 


    

module.exports = router;