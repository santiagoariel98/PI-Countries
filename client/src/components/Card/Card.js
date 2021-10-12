import React from "react"
import style from "./Card.module.css"
import {Link} from "react-router-dom"


export default function Card({img,name,continent,id}){
	return(
			<div className={style.Card}>
				<img src={img} alt="img not found " />
				<h4>{name}</h4>
				<h6>{continent}</h6>
				<Link to={`/country/${id}`}><button>+ info</button></Link>
			</div>
		)
}