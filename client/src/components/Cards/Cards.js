import React from "react"
import Card from "../Card/Card"
import {CountryNotFound} from "../Error/Error.js"

export default function Cards({currentCountries}){
	return(
		<div className="container-cards">
		{currentCountries.length? currentCountries.map(e=>{
		return(
			<Card 
			img={e.img? e.img: e.flags} 
			name={e.name}
			population={e.population} 
			continent={e.continent} 
			id={e.id}
			maps={e.maps} 
			key={e.id} />)
	}):
		<CountryNotFound/>
	}			
		</div>
)
}