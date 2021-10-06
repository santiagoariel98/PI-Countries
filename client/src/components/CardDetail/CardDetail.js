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
	console.log(country.Activities)
	return(
			<div className={style.CardDetail}>{
				country?
				<div className={style.Card}>
					<Link to="/home">
					<button>Back</button>
					</Link>
					<img src={country.flags} alt="" width="200px"/>
					<h1>{country.name}</h1>
					<h3>{country.id}</h3>
					<h5>{country.capital}</h5>
					<h5>{country.subregion}</h5>
					<h5>{(country.area* 0.0010).toFixed(2) + " km2"}</h5>
					<h5>{"Population: "+ country.population?.toLocaleString("en")}</h5>

				</div>:
				<h5>no hay Pais que mostrar</h5>		
			}

				<div className={style.activityTitle}> Activities
					<div className={style.Activities}>{country.Activities && country.Activities.length?
						country.Activities.map(e=>{
							return (
								<span>
									<h5> {e.name[0].toUpperCase() + e.name.slice(1)}</h5>	
									<h6> Season: {e.season.join(", ")}</h6>
									<h6> Duration: {e.duration} hs</h6>
									<h6> Dificulty: {"★".repeat(e.dificulty)}	</h6>					
								</span>
								)
						}): "There is no activity to display."
					}</div>							
				</div>
			

			</div>
		)
}