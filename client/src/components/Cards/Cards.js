import React from "react"
import style from "./Cards.module.css"
import Card from "../Card/Card"

export default function Cards({currentCountries}){
	if(typeof currentCountries === "string") {
		return(<Card/>)
	}
	return(
			<div className ={style.Card} key={currentCountries.length}>
			{currentCountries && 
				currentCountries.map(e=>{
			return (
					<Card img={e.img? e.img: e.flags} name={e.name} continent={e.continent} id={e.id} key={e.id} />
				)
			})}
			</div>
		)
}