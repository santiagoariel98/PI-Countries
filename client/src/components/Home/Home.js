import React from "react"
import {Link} from "react-router-dom"
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getCountries, getCountriesName,getFilters} from "../../actions/index.js"
import "./home.module.css"
import Cards from "../Cards/Cards.js"

export default function Home() {

const dispatch = useDispatch()
const allCountries = useSelector((state)=> state.countries)

const [currentPage, setCurrentPage]= useState(1)
const countriesPerPage= 16
const indexOfLastCountries = currentPage * countriesPerPage
const indexOfFirstCountries = indexOfLastCountries - countriesPerPage
const currentCountries = allCountries.slice(indexOfFirstCountries,indexOfLastCountries)

const lastPage = Math.ceil(allCountries.length/countriesPerPage)

const [NameCountries,setNameCountries] = useState("")
const [filters, setFilters]= useState({Continent: "All", Order: "Asc", Activities: false})

const handleChangeSearch = (e)=>{
	setNameCountries(e.target.value)
}
const handleSumbit = (e)=>{
	setCurrentPage(1)
	setNameCountries("")
	dispatch(getCountriesName(NameCountries))
}


let handleChangeInputs = (e)=>{
	if(e.target.type === 'checkbox'){
		dispatch(getFilters({...filters,[e.target.name]:e.target.checked}))
	}
	else{
		setCurrentPage(1)
		e.preventDefault()
		setFilters(()=>({
			...filters,
			[e.target.name]: e.target.value
		}))
		dispatch(getFilters({...filters, [e.target.name]: e.target.value}))		
	}
 }

let handlePageNext= (e)=>{
	e.preventDefault()
	if(e.target.name){
		setCurrentPage(lastPage)
	}
	else if(currentPage !== lastPage){
		setCurrentPage(currentPage + 1)		
	}else setCurrentPage(lastPage)

}
let handlePagePrevious= (e)=>{
	e.preventDefault()
	if(e.target.name){
		setCurrentPage(1)
	}
	else if(currentPage -1 !== 0){
		setCurrentPage(currentPage - 1)
	} else setCurrentPage(1)
}

useEffect(()=>{dispatch(getCountries())},[dispatch])
	return(
		<div>
			<nav>
				<Link to="/activity">
					<button>Create Activity</button>
				</Link>
				<div>
							<select name="Continent" onChange={e=> handleChangeInputs(e) }>
								<option value="All">All</option>		
								<option value="Asia">Asia</option>
								<option value="Africa">Africa</option>						
								<option value="Americas">America</option>								
								<option value="Europe">Europa</option>
								<option value="Oceania">Oceania</option>
							</select>
							<select name="Order" onChange={e=> handleChangeInputs(e) }>
								<option value="Act">Activities</option>								
								<option value="Asc">A-Z</option>
								<option value="Des">Z-A</option>
								<option value="Max">People↑</option>
								<option value="Min">People↓</option>				
							</select>								


					<input type="text"
					placeholder = "Search country..."
					value={NameCountries}
					onChange={e=>handleChangeSearch(e)}
					/>
					<button onClick={e=>handleSumbit(e)}>sumbit</button>				
				</div>
			</nav>
			<p>
				<button className="btnPage" name="first" onClick={(e)=> handlePagePrevious(e)}>{"<<"}</button>
				<button onClick={(e)=> handlePagePrevious(e)}>{"<"}</button>
				<span>{currentPage + "-" + lastPage}</span>
				<button onClick={(e)=> handlePageNext(e)}>></button>
				<button className="btnPage" name="last" onClick={(e)=> handlePageNext(e)}>>></button>
			</p>

				<Cards currentCountries={currentCountries}/>
				
		</div>
		)
}