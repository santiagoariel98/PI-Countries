import React from "react"
import {useState, useEffect} from "react"
import {getCountryById} from "../../actions/index.js"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import style from "./CardDetail.module.css"


export default function CardDetail({match}){
		let id = match.params.id 
		const dispatch = useDispatch()
		const [estado, setEstado] = useState("")

		useEffect(()=>{
			if(estado === "")
			dispatch(getCountryById(id),[dispatch])
			setEstado("true")
		},[estado, dispatch, id])

		const country =  useSelector((state)=> state.byId)
	return(
			<div>{
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
					<h5>{country.area + " km2"}</h5>
					<h5>{"population: "+ country.population}</h5>
					<h5>{country.Activities}</h5>

				</div>: <p>no Existe</p>		
			}
			</div>
		)
}