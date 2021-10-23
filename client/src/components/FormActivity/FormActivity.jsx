import React from "react"
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {postAddActivities, getCountries} from "../../actions/index.js"
import {Link} from "react-router-dom"

export default function FormActivity(){
  const allCountries = useSelector((state)=> state.allCountries)
  const dispatch = useDispatch()
  const [inputs, setInputs] = useState({
    name: "",
    dificulty: 3,
    duration: 12,
    season:[],
    country: []
  })
  const [errors, setErrors] = useState({
    name:"requires 5 letter",
    season:"requires a season",
    country: "requires a country"}) 
const validate = (input)=>{
  let errors = {}

  if(input.name.length < 5){
    errors.name = "requires 5 letter"
  } else if(input.name.length > 25){
    errors.name = "max 26 letter"
  }
  if(input.country.length <= 0){
    errors.country = "requires a country"
  }
  if(input.season.length <= 0){
    errors.season = "requires a season"
  }
  return errors
}    
  const handleChangeInputs = (e)=>{
    e.preventDefault()
    const{name,value} = e.target
    if(Array.isArray(inputs[name])){
      if(inputs[name].includes(value)){
        setInputs({...inputs})
        setErrors(validate({...inputs}))
      } 
      else if(inputs[name].length < 21){
        setInputs({...inputs, [name]: [...inputs[name], value]})
        setErrors(validate({...inputs, [name]: [...inputs[name], value]}))
      }
    } else{
      setInputs({...inputs, [name]: value})
      setErrors(validate({...inputs, [name]: value}))
    }
  }

  const onClosed = (e)=>{
    e.preventDefault()
    let filter = inputs[e.target.name].filter(arr=> arr !== e.target.value)
    setErrors(validate({...inputs,[e.target.name]: filter}))
    setInputs({...inputs,[e.target.name]: filter})
  }

  const handleSubmit = (e)=>{
    setTimeout(200)
    setInputs({
    name: "",
    dificulty: 3,
    duration: 12,
    season:[],
    country: []
  })
  setErrors({
    name:"requires 5 letter",
    season:"requires a season",
    country: "requires a country"})
  e.preventDefault()  
  dispatch(postAddActivities(inputs))
  }
useEffect(()=>{dispatch(getCountries())},[dispatch])
	return(
      <form className="form-activity">
          <Link to="/home"className="btn-back">back</Link>
          <h2>Create Activity</h2>
          <label >Activity name: <span className="form-error">{errors.name? errors.name:""}</span></label>
          <input type="text"
          onChange={(e)=> handleChangeInputs(e)}
          value={inputs.name}
          name="name"
          />
          <label >Dificulty: <span>{" ★ ".repeat(inputs.dificulty)}</span></label>
          <input type="range"
          onChange={(e)=> handleChangeInputs(e)}
          value={inputs.dificulty}
          name="dificulty"
          min="1"
          max="5"
          />    
          <label >Duration: <span>{inputs.duration? inputs.duration === 24? "+24": inputs.duration : 12 } Hs</span></label>
          <input type="range"
          onChange={(e)=> handleChangeInputs(e)}
          value={inputs.duration}
          name="duration"
          min="1"
          max="24"
          />           
          <label>Season: <span className="form-error">{errors.season? errors.season:""}</span></label>
          <select name="season"onChange={(e)=> handleChangeInputs(e)}>
            <option value="Summer">Summer</option>
            <option value="Autumn">Autumn</option>
            <option value="Spring">Spring</option>
            <option value="Winter">Winter</option>
          </select>
        <label >Country: <span className="form-error">{errors.country? errors.country:""}</span></label>
        <select name="country"onChange={(e)=> handleChangeInputs(e)}>
        {allCountries.length? allCountries.map(e=> 
        <option key={e.id} value={e.id}>{e.name}</option>): 
        <option value="none">no hay paises</option>}
        </select>
        <input 
        type="submit" 
        value="Submit" 
        onClick={(e)=> handleSubmit(e)} 
        disabled={!errors.name && !errors.country && !errors.season? false: true}/>
        <div className="form-button">
          {inputs.season.length? inputs.season.map(e=> 
            <button key={e}value={e} name="season" onClick={(e)=> onClosed(e)}>{e}</button>):<></>
           }
        </div> 
        <div className="form-button">
          {inputs.country.length?
           inputs.country.map(e=> 
          <button key={e} name="country" value={e} onClick={(e)=> onClosed(e)}>{e}</button>):<></>
          }
        </div>       
      </form>
    )	
}
