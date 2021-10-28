import React from "react"
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {postAddActivities, getCountries} from "../../actions/index.js"
import {Link} from "react-router-dom"
import {MsgComplete} from "../Utils/MsgComplete.jsx"

export default function FormActivity(){
  const allCountries = useSelector((state)=> state.allCountries)
  const dispatch = useDispatch()
  const [complete, setComplete] = useState(false)
  const [inputs, setInputs] = useState({
    name: "",
    dificulty: 3,
    duration: 12,
    season:[],
    country: []
  })
  const [errors, setErrors] = useState({
    name:"Min 5 letters required",
    season:"Select at least 1 season",
    country: "Select at least one country"}) 
const validate = (input)=>{
  let errors = {}
  if(input.name.search(/\d/) >= 0){
    errors.name = "Only letters"
  }
  else if(input.name.length < 5){
    errors.name = "Min 5 letters required"
  } else if(input.name.length > 25){
    errors.name = "Max 26 letter"
  }    
  if(input.country.length <= 0){
    errors.country = "Select at least one country"
  }
  if(input.season.length <= 0){
    errors.season = "Select at least 1 season"
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
    name:"Min 5 letters required",
    season:"Select at least 1 season",
    country: "Select at least one country"})
  e.preventDefault()
  setComplete(true)
  dispatch(postAddActivities(inputs))
  }
useEffect(()=>{dispatch(getCountries())},[dispatch])
	return(
    <div className="container-form">
      <form className="form-activity">
          <Link to="/home"className="btn-back">{"<"}</Link>
          <h1 className="title">CREATE ACTIVITY</h1>
          <fieldset className="form-fieldset">
          <legend className="form-legend">Activity name</legend>
          {errors.name?<strong className="form-error">{errors.name}</strong>:<></>}
          <input type="text"
          placeholder="Activity name..."
          onChange={(e)=> handleChangeInputs(e)}
          value={inputs.name}
          name="name"
          autoComplete="off"
          />            
          </fieldset>
          <fieldset className="form-fieldset">
            <legend className="form-legend">Dificulty</legend>
            <span className="stars">{" ★ ".repeat(inputs.dificulty)}</span>
            <input type="range"
            onChange={(e)=> handleChangeInputs(e)}
            value={inputs.dificulty}
            name="dificulty"
            min="1"
            max="5"
            />            
          </fieldset>
          <fieldset className="form-fieldset">
            <legend className="form-legend">Duration</legend>
            <b className="clock">{inputs.duration? inputs.duration === 24? "+24": inputs.duration : 12 } Hs</b>
            <input type="range"
            onChange={(e)=> handleChangeInputs(e)}
            value={inputs.duration}
            name="duration"
            min="1"
            max="24"
            />            
          </fieldset>
          <fieldset className="form-fieldset">
            <legend className="form-legend">Season</legend>
            {errors.season?<strong className="form-error">{errors.season}</strong>:<></>}
            <select name="season"onChange={(e)=> handleChangeInputs(e)}>
              <option value="Summer">Summer</option>
              <option value="Autumn">Autumn</option>
              <option value="Spring">Spring</option>
              <option value="Winter">Winter</option>
            </select>
            <div className="form-button">
              {inputs.season.length? inputs.season.map(e=> 
                <button className="btn-season" key={e}value={e} name="season" onClick={(e)=> onClosed(e)}>{e}</button>):<></>
               }
            </div>            
          </fieldset>         
          <fieldset className="form-fieldset">
            <legend className="form-legend">Country</legend>
            {errors.country?<strong className="form-error">{errors.country}</strong>:<></>}
            <select name="country"onChange={(e)=> handleChangeInputs(e)}>
            {allCountries.length? allCountries.map(e=> 
            <option key={e.id} value={e.id}>{e.name}</option>): 
            <option value="none">no hay paises</option>}
            </select>
        <div className="form-button">
         {inputs.country.length? <hr/>:<></>}
          {inputs.country.length?
           inputs.country.map(e=> 
          <button className="btn-country" key={e} name="country" value={e} onClick={(e)=> onClosed(e)}>{e}</button>):<></>
          }
        </div>       
          </fieldset>

        <input 
        type="submit" 
        value="Submit" 
        onClick={(e)=> handleSubmit(e)} 
        disabled={!errors.name && !errors.country && !errors.season? false: true}/>
      </form>
    {complete && <MsgComplete setComplete={setComplete} />}     
    </div>

    )	
}
