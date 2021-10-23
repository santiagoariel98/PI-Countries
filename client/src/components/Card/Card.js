import React from "react"
import {Link} from "react-router-dom"



export default function Card({img,name,continent,id,population,maps}){
	return(
			<div className="card">
				<div className="card-photo">
					<img className="card-photo-img"src={img} alt="img-not-found" />
				</div>
				<div className="card-info">
					<h4 className="title-info">{name}</h4>
					<hr/>
					<p className="card-text">{continent}</p>
					<Link to={`/country/${id}`}>+info</Link>	
				</div>
			</div>
		)
}