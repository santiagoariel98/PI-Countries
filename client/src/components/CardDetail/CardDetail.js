import React from "react"
import {useEffect} from "react"
import {getCountryById} from "../../actions/index.js"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"



export default function CardDetail({match}){
	const dispatch = useDispatch()
	useEffect(()=>{dispatch(getCountryById(match.params.id))},[dispatch,match.params.id])
	const country =  useSelector((state)=> state.byId)
	return(
			<div className="container-card-detail">
				<div className="container">
					<Link to="/home"className="btn-back">Back</Link>				
				</div>
			{
				country?
			<>
			<div className="container-cards">
				<section className="card">
					<div className="card-photo">
						<img className="card-photo-img" src={country.flags} alt="img country" />					
					</div>				
					<div className="card-info">
						<h1 className="title-info">{country.name}</h1>
						<p>{country.id}</p>
						<p>Capital: <strong>{country.capital}</strong></p>
						<p>Subregion: <strong>{country.subregion}</strong></p>
						<p>Area: <strong>{(country.area* 0.0010).toFixed(2) + " km2"}</strong></p>
						<p>Population: <strong>{country.population?.toLocaleString("en")}</strong></p>						
					</div>
				</section>				
			</div>
				<h1 className="title-activity">Activities</h1>

					<div className="card-detail-activity">{country.Activities && country.Activities.length?
						country.Activities.map(e=>{
							return (
								<div className="activities"key={e.name}>
									<h2> {e.name[0].toUpperCase() + e.name.slice(1)}</h2>	
									<p>Season:</p>
									<strong>{e.season.join(", ")}</strong>
									<p> Duration: {e.duration} hs</p>
									<p> Dificulty: <strong>{" ★ ".repeat(e.dificulty)}</strong></p>					
								</div>
								)
						}):
						<footer className="create-activity">
						<p>"There is no activity to display."</p>
						<Link to="/activity">
							<button>Create Activity</button>
						</Link>
						</footer>
					}</div>										
			</>:
				<div >
					<p> Country Not Found</p>
					<Link to="/home"><button>Back</button></Link>
				</div>	
			}
			</div>
		)
}