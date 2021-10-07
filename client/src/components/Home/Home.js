import React from "react"
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getCountries} from "../../actions/index.js"
import style from "./home.module.css"
import Cards from "../Cards/Cards.js"
import Pages from "../Pages/Pages.js"
import NavBar from "../NavBar/NavBar.js"
import Loading from "../Loading/Loading.js"
export default function Home() {
const dispatch = useDispatch()

const allCountries = useSelector((state)=> state.countries)

//state
const [currentPage, setCurrentPage]= useState(1)
const [loading, setLoading] = useState(true)
//page
const countriesPerPage = 12
const indexOfLastCountries = currentPage * countriesPerPage
const indexOfFirstCountries = indexOfLastCountries - countriesPerPage
const currentCountries = allCountries.slice(indexOfFirstCountries,indexOfLastCountries)
const pages = (numberPage)=>{
	setCurrentPage(numberPage)
}

useEffect(()=>{
	dispatch(getCountries())},[dispatch])

	return(
		<div className={style.loquesea}>
			<NavBar/>{
			<>
				<div>		
					<Cards currentCountries={currentCountries}/>
				</div>
					<Pages 
					countriesPerPage={countriesPerPage}
					allCountries={allCountries}
					pages={pages} 
					/>						
			</>
	
			}
		
		</div>
		)

}