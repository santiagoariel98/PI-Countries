import React from "react"
import {Link} from "react-router-dom"
import style from "./LandingPage.module.css"

export default function LandingPage() {

	return(
		<div >
			<h1 className={style.Title}>Worlds</h1>
			<Link to="/home">
				<button className={style["btn-Landing"]}>Start</button>
			</Link>

		</div>
		)

}