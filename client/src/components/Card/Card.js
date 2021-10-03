import React from "react"
import style from "./Card.module.css"
import {Link} from "react-router-dom"


export default function Card({img,name,continent,id}){
if(img === undefined){
	return(<div key="ninguno" ><h5 >no se encotro al pais</h5></div>)
}

	return(
			<div className={style.Card} >
				<Link to={`/country/${id}`}>
					<button>info aqui</button>
				</Link>
{				<img src={img} alt="img not found " width="100px"/>}
				<h2>{name}</h2>
				<h5>{continent}</h5>

			</div>
		)
}