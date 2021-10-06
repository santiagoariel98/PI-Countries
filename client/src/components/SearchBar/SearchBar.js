import React from "react"
import {useState} from "react"
import {useDispatch} from "react-redux"
import {getCountriesName,getFilters} from "../../actions/index"
import style from "./SearchBar.module.css"

export default function SearchBar(){


	const dispatch =  useDispatch()
	const [filters, setFilters]= useState({Continent: "all", Order: "Asc"})
	const [NameCountries,setNameCountries] = useState("")


	let handleChangeSearch = (e)=>{
		setNameCountries(e.target.value)
	}

	let handleSumbit = (e)=>{
		dispatch(getCountriesName(NameCountries))
	}
 	const handleChangeInputs = (e)=>{
  	e.preventDefault()
	setFilters(()=>({
		...filters,
		[e.target.name]: e.target.value
	}))
	dispatch(getFilters({...filters, [e.target.name]: e.target.value}))
 }

	return(
		<div className={style.SearchBar}>
{/*			<select name="Continent" onChange={e=> handleChangeInputs(e) }>
				<option value="All">All</option>		
				<option value="Asia">Asia</option>
				<option value="Africa">Africa</option>						
				<option value="Americas">America</option>								
				<option value="Europe">Europe</option>
				<option value="Oceania">Oceania</option>
			</select>
			<select name="Order"  onChange={e=> handleChangeInputs(e)}>
				
				<option value="Asc" default>A-Z</option>
				<option value="Des">Z-A</option>					
			</select>*/}

			<span>
				<input type="text"
				placeholder = "Search country..."
				onChange={e=>handleChangeSearch(e)}
				/>
				<button onClick={e=>handleSumbit(e)}>Sumbit</button>				
			</span>

		</div>
		)
}