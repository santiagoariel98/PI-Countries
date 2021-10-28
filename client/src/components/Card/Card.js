import React from "react"
import {Link} from "react-router-dom"



export default function Card({img,name,continent,id,population,maps,Activities}){
	return(
			<div className="card">
				<div className="card-photo">
					<img className="card-photo-img"src={img} alt="img-not-found" />
				</div>
				<h4 className="card-title">{name}</h4>
				<div className="card-info">
					{Activities && Activities.length? <p className="activity position-card">+Activity</p>: <></>}								
					<p className="card-info-continent">{continent}</p>
					<Link to={`/country/${id}`}>+ info</Link>	
				</div>
			</div>
		)
}