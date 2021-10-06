import React from "react"
import style from "./Card.module.css"
import {Link} from "react-router-dom"


export default function Card({img,name,continent,id}){

if(img === undefined){
	return(<div key="ninguno" ><h5 >No hay paises que mostrar.</h5></div>)
}

	return(
			<div className={style.Card}>

				<img src={img} alt="img not found " />
				<h4>{name}</h4>
				<h6>{continent}</h6>
				<Link to={`/country/${id}`}><button>info aqui</button></Link>
			</div>
		)
}