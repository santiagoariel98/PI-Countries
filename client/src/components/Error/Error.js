import React from "react"
import {Link} from "react-router-dom"
import {getCountriesName} from "../../actions/index.js"
import {useDispatch} from "react-redux"

export default function Error(){
	return(
			<div className="Errors">
				<p className="msgErrors">404</p>
				<p>PAGE NOT FOUND</p>
				<Link to="/home"className="btn-back">{"<"}</Link>
			</div>
		)
}

export function CountryNotFound(){
	return(
			<div className="Errors">
				<p className="msgErrors">404</p>
				<p>COUNTRY NOT FOUND</p>
				<Link to="/home"className="btn-back">{"<"}</Link>
			</div>
		)
}
export function CountryNotFoundHome(){
	const dispatch = useDispatch()
	return(
			<div className="Errors">
				<p className="msgErrors">404</p>
				<p>COUNTRY NOT FOUND</p>
				<p className="btn-back" onClick={()=>dispatch(getCountriesName(""))}>x</p>
			</div>
		)
}


export function CountriesNotLoaded(){
	return(
			<div className="Errors">
				<p className="msgErrors">404</p>
				<p>COUNTRY NOT LOADED</p>
				<p>reload the page.</p>
			</div>
		)
}