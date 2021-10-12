import React from "react"
import {useEffect} from "react"
import {getCountryById} from "../../actions/index.js"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import style from "./CardDetail.module.css"


export default function CardDetail({match}){

	const dispatch = useDispatch()
	useEffect(()=>{dispatch(getCountryById(match.params.id))},[dispatch,match.params.id])
	
	const country =  useSelector((state)=> state.byId)
	return(
			<div className={style.CardDetail}>{
				country?
			<>
				<div className={style.Card}>

					<Link to="/home">
					<button>Back</button>
					</Link>
					<img src={country.flags} alt="" width="200px"/>
					<h3>{country.id}</h3>
					<h1>{country.name}</h1>
					<div><h5>Capital:</h5><h5>{country.capital}</h5></div>
					<div><h5>Subregion:</h5><h5>{country.subregion}</h5></div>
					<div><h5>Area:</h5><h5>{(country.area* 0.0010).toFixed(2) + " km2"}</h5></div>
					<div><h5>Population:</h5><h5>{country.population?.toLocaleString("en")}</h5></div>
				</div>
				<div className={style.Card}>
				<h1>Activities</h1>
					<div className={style.Activities}>{country.Activities && country.Activities.length?
						country.Activities.map(e=>{
							return (
								<span>
									<h5> {e.name[0].toUpperCase() + e.name.slice(1)}</h5>	
									<h6>Season:</h6>
									<h6>{e.season.join(", ")}</h6>
									<h6> Duration: {e.duration} hs</h6>
									<h6> Dificulty: {"★".repeat(e.dificulty)}	</h6>					
								</span>
								)
						}):
						<>
						<p>"There is no activity to display."</p>
						<Link to="/activity">
							<button>Create Activity</button>
						</Link>
						</>
					}</div>							
				</div>				
			</>:
				<div className={style.Error}>
					<p> Country Not Found</p>
					<Link to="/home"><button>back</button></Link>
				</div>	
			}


			

			</div>
		)
}