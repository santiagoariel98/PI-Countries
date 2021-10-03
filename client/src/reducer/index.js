import {GET_COUNTRIES, FILTER_BY_CONTINENT, FILTER_BY_ORDER,GET_COUNTRIES_BY_ID,GET_COUNTRIES_NAME,POST_ADD_ACTIVITIES,GET_ACTIVITIES} from "../actions/"

const initialState = {
  countries: [],
  allCountries:[],
  byId: [],
  activities: []
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_COUNTRIES:
        return {
          ...state,  
          countries: action.payload,
          allCountries: action.payload,
        }
      case FILTER_BY_CONTINENT:
        const allCountries = state.allCountries
        const statusFilter = action.payload === "All" ? allCountries: 
        allCountries.filter(el=> el.continent === action.payload)
        return {
          ...state,
          countries: statusFilter,
        }
      case FILTER_BY_ORDER:
        const arrayFilter = state.allCountries.filter(e=> state.countries.includes(e))
        const statusFilterOrder = action.payload === "Asc" ? arrayFilter.sort((a,b)=> a.name < b.name? -1: a.name>b.name?1:0):
          arrayFilter.sort((a,b)=> a.name > b.name? -1: a.name<b.name?1:0)
        return {
          ...state,
          countries:statusFilterOrder
        }
      case GET_COUNTRIES_BY_ID:
        return{
          ...state,
          byId: action.payload
        } 
      case GET_COUNTRIES_NAME:
        return{
          ...state,
          countries: action.payload
        }

        
      case POST_ADD_ACTIVITIES:
        return{
          ...state,
        }
      case GET_ACTIVITIES:

        return{
          ...state,
          activities: action.payload
        }

      default:
      return state;
  }
};

export default reducer;