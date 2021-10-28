import React from "react"
import {useEffect} from "react"
import {getCountryById} from "../../actions/index.js"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {CountryNotFound} from "../Error/Error.js"
import {APIKEY} from "../../index.js"

export default function CardDetail({match}){
	const dispatch = useDispatch()
	useEffect(()=>{dispatch(getCountryById(match.params.id))},[dispatch,match.params.id])
	const country =  useSelector((state)=> state.byId)
	return(
			<div className="container-card-detail">
			{
				country?
			<>
			<div className="container">
				<Link to="/home"className="btn-back">{"<"}</Link>				
			</div>
			<div className="container-cards">
				<section className="card">
					<div className="card-photo">
						<img className="card-photo-img-detail" src={country.flags} alt="img country" />					
					</div>
					<hr/>
					<h1 className="card-title">{country.name}</h1>	
					<div className="card-info">
						<hr/>
						<p><strong>{country.id}</strong></p>						
						<p>Capital: <strong>{country.capital}</strong></p>
						<p className="card-info-continent-detail">{country.continent}</p>
						{country.Activities && country.Activities.length? <p className="activity position-detail">+Activity</p>: <></>}
						<p>Subregion: <strong>{country.subregion}</strong></p>						
						<p>Area: <strong>{(country.area* 0.0010).toFixed(2) + " km"}<sup>2</sup></strong></p>						
						<p>Population: <strong>{country.population?.toLocaleString("en")}</strong></p>						
					</div>
					<div>
					
					<iframe
						width='95%'
						title="google maps"
						loading="lazy"
						src={`https://www.google.com/maps/embed/v1/place?key=${APIKEY}
						&q=${country.name}`}
					/>
					</div>
				</section>				
			</div>
					<div className="container-cards">{country.Activities && country.Activities.length?
						country.Activities.map(e=>{
							return (
								<div className="card-activity"key={e.name + " " +e.season}>
									<h3> {e.name[0].toUpperCase() + e.name.slice(1).toLowerCase()}</h3>
									<hr/>	
									<p><strong>Season:</strong></p>
									<div>
										{e.season.map(e=> 
	          							<span key={e.id} className="btn-season-detail">{e}</span>)}										
									</div>
									<p><strong>Duration:</strong> {e.duration} hs</p>
									<p className="activity position-detail-act"> Dificulty: {"★".repeat(e.dificulty)}</p>					
								</div>
								)
						}):
						<footer className="create-activity">
						<p>There is no activity to display.</p>
						<Link to="/activity">
							<button>Create Activity</button>
						</Link>
						</footer>
					}</div>										
			</>:
			<CountryNotFound/>
			}
			</div>
		)
}