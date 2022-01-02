import {
  GET_COUNTRIES,
  GET_COUNTRIES_BY_ID,
  GET_COUNTRIES_NAME,
  POST_ADD_ACTIVITIES,
  GET_ACTIVITIES,
  GET_FILTERS,
} from "../actions/";
const initialState = {
  countries: [],
  allCountries: [],
  byId: [],
  activities: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };
    case GET_FILTERS:
      let filters = state.allCountries.filter((e) =>
        state.countries.includes(e)
      );

      if (action.payload.Continent) {
        filters =
          action.payload.Continent === "All"
            ? state.allCountries
            : state.allCountries.filter(
                (e) => e.continent === action.payload.Continent
              );
      }

      if (action.payload.Order === "alfa" && action.payload.sort) {
        filters.sort((a, b) =>
          a.name < b.name ? -1 : a.name > b.name ? 1 : 0
        );
      } else if (action.payload.Order === "alfa") {
        filters.sort((a, b) =>
          a.name > b.name ? -1 : a.name < b.name ? 1 : 0
        );
      } else if (action.payload.Order === "act" && action.payload.sort) {
        filters.sort((a, b) =>
          b.Activities.length < a.Activities.length
            ? -1
            : b.Activities.length > a.Activities.length
            ? 1
            : 0
        );
      } else if (action.payload.Order === "act") {
        filters.sort((a, b) =>
          b.Activities.length > a.Activities.length
            ? -1
            : b.Activities.length < a.Activities.length
            ? 1
            : 0
        );
      } else if (action.payload.Order === "people" && action.payload.sort) {
        filters.sort((a, b) => b.population - a.population);
      } else {
        filters.sort((a, b) => a.population - b.population);
      }

      return {
        ...state,
        countries: filters,
      };
    case GET_COUNTRIES_BY_ID:
      return {
        ...state,
        byId: action.payload,
      };
    case GET_COUNTRIES_NAME:
      return {
        ...state,
        countries: !action.payload ? [] : action.payload,
      };
    case POST_ADD_ACTIVITIES:
      return {
        ...state,
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
