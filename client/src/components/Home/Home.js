import React from "react"
import {Link} from "react-router-dom"
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getCountries, getCountriesName,getFilters} from "../../actions/index.js"
import Cards from "../Cards/Cards.js"

export default function Home() {

const dispatch = useDispatch()
const allCountries = useSelector((state)=> state.countries)

const [currentPage, setCurrentPage]= useState(1)
const countriesPerPage= 9
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
		<div id="container-home">
			<header className="header">
				<h1 className="logo"><Link to="/">APP Countries</Link></h1>			
					<ul className="main-nav">
						<li><Link to="/activity" className="btn-menu btn-nav">Create Activity</Link></li>
						<li>
							<div className="search">
								<input type="text"
								placeholder = "Search country..."
								value={NameCountries}
								onChange={e=>handleChangeSearch(e)}
								/>
								<button onClick={e=>handleSumbit(e)}>Search</button>								
							</div>
							<div className="filter-bar">
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
							</div>					
						</li>
					</ul>
			</header>
			<nav className="container-nav">
				<div className="pag">
				<Link to=""className="btn-page" name="first" onClick={(e)=> handlePagePrevious(e)}>{"<<"}</Link>
				<Link to=""className="btn-page" onClick={(e)=> handlePagePrevious(e)}>{"<"}</Link>
				<span className="pag-number">{currentPage + "-" + lastPage}</span>
				<Link to=""className="btn-page" onClick={(e)=> handlePageNext(e)}>></Link>
				<Link to=""className="btn-page" name="last" onClick={(e)=> handlePageNext(e)}>>></Link>
				</div>	
			</nav>	
			<div id="section">
				<Cards currentCountries={currentCountries}/>				
			</div>

		</div>
		)
}
