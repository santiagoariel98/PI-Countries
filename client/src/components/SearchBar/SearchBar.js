import React from "react"
import {useState} from "react"
import {useDispatch} from "react-redux"


import {getCountriesName} from "../../actions/index"


export default function SearchBar(){

	const dispatch =  useDispatch()
	const [nameCountries, setNameCountries] = useState("")

	let handleSumbit = (e)=>{
		setNameCountries(e.target.value)
		e.preventDefault()
		dispatch(getCountriesName(e.target.value))
	}

	return(
		<div>
		<input type="text"
		placeholder = "Buscar pais"
		onChange={e=>handleSumbit(e)}
		/>
		</div>
		)
}