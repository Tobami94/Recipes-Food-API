const { Router } = require('express');
const { getAllRecipes } = require('../controllers/getRecipes');


const router = Router();

//Route Name

 router.get('/', async (req, res) => {
    const  name  = req.query.name;
    const allRecipes = await getAllRecipes();
    if (name) {
        const recipesByName = await allRecipes.filter(i => i.name.toLowerCase().includes(name.toLocaleLowerCase()))
        recipesByName.length ?
        res.status(200).send(recipesByName) :
        res.status(404).send("No se encuentra receta");
    } else {
        res.status(200).send(allRecipes);
    }
});

 

//Route id

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const recipeTotal = await getAllRecipes();
    
    if(id) {
        const recipeId = await recipeTotal.filter( e => e.id == id)
        recipeId.length?
        res.status(200).json(recipeId) :
        res.status(404).send("No se encuentra receta");
    }
})
    
module.exports = router;