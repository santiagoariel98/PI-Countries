import React from "react"

export default function Paginado({countriesPerPage,allCountries,paginado}){
	const pageNumbers= []
	let countries = typeof allCountries === "string" ? 9 :allCountries.length
	for(let i = 1; i<= Math.ceil(countries/countriesPerPage); i++){
		pageNumbers.push(i)
	}
	return (
		<nav>
			<ul className= "paginado">
				{ pageNumbers && 
					pageNumbers.map(number =>(
					<li className="number" key={number}>
						<h6 onClick={()=> paginado(number)} className="linkPag" >{number}</h6>								
					</li>

				))}
			</ul>
		</nav>
		)
}