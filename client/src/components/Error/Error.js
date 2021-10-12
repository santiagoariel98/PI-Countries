import React from "react"
import {Link} from "react-router-dom"
import style from "./Error.module.css"


export default function Error(){
	return(
			<div className={style.Error}>
				<p>Not Found</p>
				<Link to="/home"><button>back</button></Link>
			</div>
		)
}