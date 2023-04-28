import { 
    GET_RECIPES,
    GET_RECIPES_NAME,
    GET_RECIPES_DETAIL,
    GET_DIETS,
    POST_NEW_RECIPE,
    DIET_FILTER,
    CREADOS_FILTER,
    ORDER_ALFABETICO,
    ORDER_SCOREHEALTH,
    
} from "./actions"



const initialState = {
    recipes: [],
    allRecipes: [],
    recipeDetails: [],
    allDiets: [],
    recipeAux: []


}

function rootReducer ( state = initialState, action) {
  switch (action.type) {

    case GET_RECIPES:
        return {
            ...state,
            recipes: action.payload,
            allRecipes: action.payload,
        };

        case GET_RECIPES_NAME:
          return {
            ...state,
            recipes: action.payload,
          };

          case GET_RECIPES_DETAIL:
            return {
              ...state,
              recipeDetails: action.payload,
            };

            case GET_DIETS:
              return {
                ...state,
                allDiets: action.payload,
              };

            case POST_NEW_RECIPE:
              return {
                ...state
              };

        case DIET_FILTER:
          const allRecipes = state.allRecipes;
          const filteredByDiet = action.payload === 'All' ? allRecipes :
          allRecipes.filter(r => r.diets?.some(d => d.toLowerCase() === action.payload.toLowerCase()))
          return {
              ...state,
              recipes: filteredByDiet
          };

   case CREADOS_FILTER:
    const createdFilter = action.payload === 'allDB' ? state.allRecipes.filter(i => i.createdInDb) : state.allRecipes.filter(i => !i.createdInDb)
    return {
        ...state,
        recipes: action.payload === 'AllRecip' ? state.allRecipes : createdFilter
    };
    
    case ORDER_ALFABETICO:
      const orderAlfa = action.payload === 'ascen' ?
      state.recipes.sort(function(a, b) {
        if (a.name > b.name) {
          return 1;
        }

        if (b.name > a.name) {
          return -1;
        }
      
        return 0;
      }) :
      state.recipes.sort(function(a, b) {
        if(a.name < b.name) {
          return -1;
        } 

        if(b.name < a.name) {
           return 1;
        }
        
        return 0;

      });
        return {
         ...state,
         recipes: orderAlfa
     };

     case ORDER_SCOREHEALTH:
          const orderHealthScore = action.payload === 'asc' ?
          state.recipes.sort(function(a, b) {
            if (a.healthScore > b.healthScore) return 1;
            if (a.healthScore < b.healthScore) return -1;
            return 0;
          }) :
          state.recipes.sort(function(a, b) {
            if (a.healthScore < b.healthScore) return 1;
            if (a.healthScore > b.healthScore) return -1;
            return 0;
          });
          
          return {
            ...state,
            recipes: orderHealthScore
          };

        default:
            return state;
  }


}


export default rootReducer;