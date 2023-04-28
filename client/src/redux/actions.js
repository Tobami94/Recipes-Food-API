import axios from 'axios';

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPES_NAME = "GET_RECIPES_NAME";
export const GET_RECIPES_DETAIL = "GET_RECIPES_DETAIL";
export const GET_DIETS = "GET_DIETS";
export const POST_NEW_RECIPE = "POST_NEW_RECIPE";
export const DIET_FILTER = "DIET_FILTER";
export const CREADOS_FILTER = "CREADOS_FILTER";
export const ORDER_ALFABETICO = "ORDER_ALFABETICO";
export const ORDER_SCOREHEALTH = "ORDER_SCOREHEALTH";



const LOCAL_URL = "http://localhost:3001";


// get_recipes 

export function getRecipes () {
    return async function (dispatch) {
      try {
         const res = await axios.get(`${LOCAL_URL}/recipes`)
       return dispatch({
        type: GET_RECIPES,
        payload: res.data
       });
      } catch (err) {
         console.log(err);
    }; 
  };
};


export function getRecipesName (name) {
   return async function (dispatch) {
      try {
         const res = await axios.get(`${LOCAL_URL}/recipes?name=${name}`)
      return dispatch({
         type: GET_RECIPES_NAME,
         payload: res.data
  });           
 } catch (err) {
 console.log(err)
    };
  };
};


export function getRecipesDetail (payload) {
   return async function (dispatch) {
      try { 
         const res = await axios.get(`${LOCAL_URL}/recipes/${payload}`)
      return dispatch({
         type: GET_RECIPES_DETAIL,
         payload: res.data
      })
   } catch (err) {
      console.log(err)
    };  
  };
};


//filters

export function filterDietType (payload) {
   return {
      type: DIET_FILTER,
      payload
  };
};


export function filterCreados (payload) {
 return {
   type: CREADOS_FILTER,
   payload
 }
}

//orders

export function orderAlfabethic (payload) {
   return {
      type: ORDER_ALFABETICO,
      payload
   }
}

export function orderScoreHealth (payload) {
   return {
      type: ORDER_SCOREHEALTH,
      payload
   }
}

//post

export function postNewRecipe(payload) {
   return async function(dispatch) {
       try {
           var res = await axios.post(`${LOCAL_URL}/recipe`, payload);
           return {
            type: POST_NEW_RECIPE,
            res
           }
       } catch (err) {
           console.log(err)
       }
   }
}

export function getDiets() {
   return async function (dispatch) {
      try { 
         const res = await axios.get(`${LOCAL_URL}/diets`)
      return dispatch({
         type: GET_DIETS,
         payload: res.data
      })
   } catch (err) {
      console.log(err)
    };  
  };
};
