import React from "react"
import style from "./NavBar.module.css"
import SearchBar from "../SearchBar/SearchBar.js"
import {Link} from "react-router-dom"
export default function NavBar() {

	return(
<div className={style.NavBar}>
  <div className={style.Filters}>
    <ul>
      <li>
          <Link to="">Home</Link>
      </li>
      <li>
          <Link to="/activity">Create activity</Link>
      </li>
    </ul>
  </div>
  <SearchBar/> 
</div>
		)

}