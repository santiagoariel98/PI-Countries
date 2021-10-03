import React from "react"
import {Link} from "react-router-dom"
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getCountries, filterByContinent, filterByOrder} from "../../actions/index.js"

import Cards from "../Cards/Cards.js"
import Paginado from "../Paginado/Paginado.js"
// import FormActivity from "../FormActivity/FormActivity.jsx"
import SearchBar from "../SearchBar/SearchBar.js"
export default function Home() {

const dispatch = useDispatch()
const allCountries = useSelector((state)=> state.countries)

// estados locales
const [currentPage, setCurrentPage]= useState(1)
const [countriesPerPage]= useState(9)
// paginado
const indexOfLastCountries = currentPage * countriesPerPage
const indexOfFirstCountries = indexOfLastCountries - countriesPerPage
const currentCountries = allCountries.slice(indexOfFirstCountries,indexOfLastCountries)
const paginado = (numberPage)=>{
	setCurrentPage(numberPage)
}

useEffect(()=>{dispatch(getCountries())},[dispatch])

let handleFilterStatus = (e)=>{
	e.preventDefault()
	setCurrentPage(1)
	dispatch(filterByContinent(e.target.value))
}
let HandlerFilterOrder = (e)=>{
	e.preventDefault()
	setCurrentPage(1)
	dispatch(filterByOrder(e.target.value))
}
	return(
		<div>
			<h1>esta es la home</h1>
			<div>
				<SearchBar/>
				<select onChange={e=> handleFilterStatus(e) }>
					<option value="All">Todos</option>		
					<option value="Asia">Asia</option>
					<option value="Africa">Africa</option>						
					<option value="Americas">America</option>								
					<option value="Europe">Europa</option>
					<option value="Oceania">Oceania</option>
				</select>
				<select onChange={e=> HandlerFilterOrder(e)}>
					<option value="Asc">Ascendente</option>
					<option value="Des">Descendente</option>					
				</select>
				<select name="" id="">
					<option value="Api">de la API</option>
					<option value="DB">de la DB</option>
				</select>
                <Link to="/activity"><button>crear actividad</button></Link>
				<Cards currentCountries={currentCountries}/>

				<Paginado 
				countriesPerPage={countriesPerPage}
				allCountries={allCountries}
				paginado={paginado} 
				/>
			</div>
		</div>
		)

}