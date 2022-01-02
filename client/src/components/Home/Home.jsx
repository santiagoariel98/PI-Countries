import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getCountries,
	getCountriesName,
	getFilters,
} from "../../actions/index.js";
import Cards from "../Cards/Cards.js";

export default function Home() {
	const dispatch = useDispatch();
	const allCountries = useSelector((state) => state.countries);

	const [currentPage, setCurrentPage] = useState(1);
	const countriesPerPage = 9;
	const indexOfLastCountries = currentPage * countriesPerPage;
	const indexOfFirstCountries = indexOfLastCountries - countriesPerPage;
	const currentCountries = allCountries.slice(
		indexOfFirstCountries,
		indexOfLastCountries
	);

	const lastPage = Math.ceil(allCountries.length / countriesPerPage);

	const [NameCountries, setNameCountries] = useState("");
	const [filters, setFilters] = useState({
		Continent: "All",
		Order: "act",
		Activities: false,
		sort: true,
	});

	const handleChangeSearch = (e) => {
		setNameCountries(e.target.value);
	};
	const handleSumbit = (e) => {
		setCurrentPage(1);
		setNameCountries("");
		dispatch(getCountriesName(NameCountries));
	};

	let handleChangeInputs = (e) => {
		if (e.target.type === "checkbox") {
			dispatch(
				getFilters({ ...filters, [e.target.name]: e.target.checked })
			);
		} else {
			setCurrentPage(1);
			e.preventDefault();
			if (e.target.name === "sort") {
				setFilters((prev) => ({ ...filters, sort: !prev.sort }));
				dispatch(getFilters({ ...filters, sort: !filters.sort }));
			} else {
				setFilters(() => ({
					...filters,
					[e.target.name]: e.target.value,
				}));
				dispatch(
					getFilters({ ...filters, [e.target.name]: e.target.value })
				);
			}
		}
	};

	let handlePageNext = (e) => {
		e.preventDefault();
		if (e.target.name) {
			setCurrentPage(lastPage);
		} else if (currentPage !== lastPage) {
			setCurrentPage(currentPage + 1);
		} else setCurrentPage(lastPage);
	};
	let handlePagePrevious = (e) => {
		e.preventDefault();
		if (e.target.name) {
			setCurrentPage(1);
		} else if (currentPage - 1 !== 0) {
			setCurrentPage(currentPage - 1);
		} else setCurrentPage(1);
	};

	useEffect(() => {
		dispatch(getCountries());
	}, [dispatch]);
	return (
		<div className="home-container">
			<div className="navbar-container">
				<div className="navbar-left">
					<p className="navbar-logo">
						<Link to="/">APP Countries</Link>
					</p>
				</div>
				<div className="navbar-center">
					<div className="navbar-search">
						<input
							type="text"
							placeholder="Search country..."
							value={NameCountries}
							onChange={(e) => handleChangeSearch(e)}
						/>
						<select
							name="Continent"
							onChange={(e) => handleChangeInputs(e)}
						>
							<option value="All">All</option>
							<option value="Asia">Asia</option>
							<option value="Africa">Africa</option>
							<option value="Americas">America</option>
							<option value="Europe">Europe</option>
							<option value="Oceania">Oceania</option>
						</select>
						<button
							className="material-icons-outlined"
							onClick={(e) => handleSumbit(e)}
						>
							search
						</button>
					</div>
					<div className="navbar-sort">
						<select
							name="Order"
							onChange={(e) => handleChangeInputs(e)}
						>
							<option value="act">Activities</option>
							<option value="alfa">A-Z</option>
							<option value="people">People</option>
						</select>
						<button
							name="sort"
							onClick={(e) => handleChangeInputs(e)}
							className="material-icons-outlined"
						>
							{filters.sort ? "expand_more" : "expand_less"}
						</button>
					</div>
				</div>
				<div className="navbar-right">
					<Link to="/activity" className="btn-menu btn-nav">
						Create Activity
					</Link>
				</div>
			</div>
			<header className="container-nav">
				<div className="pag">
					<Link
						to=""
						className="btn-page"
						name="first"
						onClick={(e) => handlePagePrevious(e)}
					>
						{"<<"}
					</Link>
					<Link
						to=""
						className="btn-page"
						onClick={(e) => handlePagePrevious(e)}
					>
						{"<"}
					</Link>
					<span className="pag-number">
						{currentPage + "-" + lastPage}
					</span>
					<Link
						to=""
						className="btn-page"
						onClick={(e) => handlePageNext(e)}
					>
						>
					</Link>
					<Link
						to=""
						className="btn-page"
						name="last"
						onClick={(e) => handlePageNext(e)}
					>
						>>
					</Link>
				</div>
			</header>
			<section>
				<Cards currentCountries={currentCountries} />
			</section>
		</div>
	);
}
