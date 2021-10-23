import React from "react"
import {Link} from "react-router-dom"


export default function Error(){
	return(
			<div >
				<p>Not Found</p>
				<Link to="/home"><button>back</button></Link>
			</div>
		)
}

export function CountryNotFound(){
	return(
		<div>
			<h1>Country not Found</h1>
		</div>
		)
}