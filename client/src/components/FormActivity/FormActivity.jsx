import React from "react"
import {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {getActivities,postAddActivities} from "../../actions/index.js"


export default function FormActivity(){

  const [inputs, setInputs] = useState({
    name: "",
    dificulty:"",
    duration:"",
    season:""
  })

  const handleChangeinputs = ({target})=>{
    setInputs(()=>({
      ...inputs,
      [target.name]: target.value
    }))
  }
console.log(inputs.dificulty)
	return(
<div>
  <Link to="/home"><button>back</button></Link>
      <form>
        <div >
          <label>nombre de la actividad:</label>
          <input type="text"
          onChange={(e)=> handleChangeinputs(e)}
          value={inputs.name}
          name="name"
          />
        </div>
        <div >
          <label >dificultad:</label>
          <input type="range"
          onChange={(e)=> handleChangeinputs(e)}
          value={inputs.dificulty}
          name="dificulty"
          min="0"
          max="5"
          /><span>{inputs.dificulty? inputs.dificulty <= 1? "facil":inputs.dificulty <=3 ? "normal":"dificil": "normal"}</span>    
        </div>
        <div >
          <label>duracion:</label>
          <input type="range"
          onChange={(e)=> handleChangeinputs(e)}
          value={inputs.duration}
          name="duration"
          min="0"
          max="24"
          /><span>{inputs.duration? inputs.duration: 12 } horas</span>
        </div >
        <div>
          <select >
            <option>Verano</option>
            <option>Otoño</option>
            <option>Primavera</option>
            <option>Invierno</option>
          </select>
        </div>
      </form>
</div>
    )	
}
