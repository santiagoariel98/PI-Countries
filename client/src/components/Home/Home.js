import React from "react"
import {Link} from "react-router-dom"
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getCountries, filterByOrder, getCountriesName,getFilters} from "../../actions/index.js"

import Cards from "../Cards/Cards.js"
import Pages from "../Pages/Pages.js"
// import FormActivity from "../FormActivity/FormActivity.jsx"
export default function Home() {

const dispatch = useDispatch()
const allCountries = useSelector((state)=> state.countries)

// estados locales
const [currentPage, setCurrentPage]= useState(1)
const [countriesPerPage]= useState(16)
const [NameCountries,setNameCountries] = useState("")
const [filters, setFilters]= useState({Continent: "All", Order: "Asc"})
// paginado
const indexOfLastCountries = currentPage * countriesPerPage
const indexOfFirstCountries = indexOfLastCountries - countriesPerPage
const currentCountries = allCountries.slice(indexOfFirstCountries,indexOfLastCountries)
const pages = (numberPage)=>{setCurrentPage(numberPage)}

const handleChangeSearch = (e)=>{setNameCountries(e.target.value)
}
const handleSumbit = (e)=>{
	setCurrentPage(1)
	dispatch(getCountriesName(NameCountries))
}


let handleChangeInputs = (e)=>{
	setCurrentPage(1)
	e.preventDefault()
	setFilters(()=>({
		...filters,
		[e.target.name]: e.target.value
	}))
	dispatch(getFilters({...filters, [e.target.name]: e.target.value}))
 }

useEffect(()=>{dispatch(getCountries())},[dispatch])

	return(
		<div>

		<Link to="/Activity">Create Activity</Link>
			<nav>
				<select name="Continent" onChange={e=> handleChangeInputs(e) }>
					<option value="All">Todos</option>		
					<option value="Asia">Asia</option>
					<option value="Africa">Africa</option>						
					<option value="Americas">America</option>								
					<option value="Europe">Europa</option>
					<option value="Oceania">Oceania</option>
				</select>
				<select name="Order" onChange={e=> handleChangeInputs(e) }>
					<option value="Asc">A-Z</option>
					<option value="Des">Z-A</option>					
				</select>
				<span>
					<input type="text"
					placeholder = "Search country..."
					onChange={e=>handleChangeSearch(e)}
				/>
					<button onClick={e=>handleSumbit(e)}>></button>				
				</span>
				<Cards currentCountries={currentCountries}/>
				<Pages 
				countriesPerPage={countriesPerPage}
				allCountries={allCountries}
				pages={pages} 
				/>

			</nav>
		</div>
		)
}