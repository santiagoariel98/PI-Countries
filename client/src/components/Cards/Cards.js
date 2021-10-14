import React from "react"
import style from "./Cards.module.css"
import Card from "../Card/Card"

export default function Cards({currentCountries}){
	return(
		<div style={{margin: "0 auto"}}>
		{currentCountries && currentCountries.map(e=>{
		return(
			<Card className={style.Card} 
			img={e.img? e.img: e.flags} 
			name={e.name}
			population={e.population} 
			continent={e.continent} 
			id={e.id} 
			key={e.id} />)
	})}			
		</div>
)
}