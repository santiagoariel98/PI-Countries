import axios from "axios"

export const GET_COUNTRIES = "GET_COUNTRIES"

export function getCountries(){
	return (dispatch)=> {
		return axios.get("http://localhost:3001/countries").then(res=> {
  			let countries = res.data.map(e=>{
    			let country = {
				    img: e.flags,
				    name: e.name,
				    continent: e.continent
    			}
    			return country
  			})
  			dispatch({
  				type: GET_COUNTRIES,
  				payload: countries
  			})
		})
	}
}