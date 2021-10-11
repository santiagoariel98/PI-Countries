import React from "react"

export default function Pages({countriesPerPage,allCountries,pages}){
	const pageNumbers= []
	let countries = typeof allCountries === "string" ? 9 :allCountries.length
	for(let i = 1; i<= Math.ceil(countries/countriesPerPage); i++){
		pageNumbers.push(i)
	}
	return (
		<nav>
			<ul className= "page">
				{ pageNumbers && 
					pageNumbers.map(number =>(
					<li className="number" key={number}>
						<span  onClick={()=> pages(number)} className="linkPag" >{number}</span>								
					</li>

				))}
			</ul>
		</nav>
		)
}