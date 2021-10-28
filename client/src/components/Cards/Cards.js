import React from "react"
import Card from "../Card/Card"
import {CountryNotFoundHome} from "../Error/Error.js"

export default function Cards({currentCountries,searchInit}){
	return(
		<div className="container-cards">
		{currentCountries.length? currentCountries.map(e=>{
		return(
			<Card
			Activities ={e.Activities}
			img={e.img? e.img: e.flags} 
			name={e.name}
			population={e.population} 
			continent={e.continent} 
			id={e.id}
			maps={e.maps} 
			key={e.id} />)
	}):
		<CountryNotFoundHome searchInit={searchInit}/>
	}			
		</div>
)
}