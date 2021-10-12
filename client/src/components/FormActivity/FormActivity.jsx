import React from "react"
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {postAddActivities, getCountries} from "../../actions/index.js"
import style from "./FormActivity.module.css"


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
    name:"Activity: requires 5 letter",
    season:"Season: requires a season",
    country: "Country: requires a country"}) 

const validate = (input)=>{
  let errors = {}

  if(input.name.length < 5){
    errors.name = "Activity: requires 5 letter"
  } else if(input.name.length > 25){
    errors.name = "Activity: max 26 letter"
  }
  if(input.country.length <= 0){
    errors.country = "Country: requires a country"
  }
  if(input.season.length <= 0){
    errors.season = "Season: requires a season"
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

  const handleSumbit = (e)=>{
  e.preventDefault()
  
  dispatch(postAddActivities(inputs))
  }

useEffect(()=>{dispatch(getCountries())},[dispatch])
	return(
<div className={style.Form}>
  <Link className={style.Sumbit}to="/home">back</Link>
      <form>
        <div >
          <label>Activity name:</label>
          <input type="text"
          onChange={(e)=> handleChangeInputs(e)}
          value={inputs.name}
          name="name"
          />
        </div>
        <div >
          <label >Dificulty:</label>
          <div>
          <span>{"★".repeat(inputs.dificulty)}</span>
          <input type="range"
          onChange={(e)=> handleChangeInputs(e)}
          value={inputs.dificulty}
          name="dificulty"
          min="1"
          max="5"

          />    
          </div>
        </div>
        <div >
          <label>Duration:</label>
          <div>
          <span>{inputs.duration? inputs.duration === 24? "+24": inputs.duration : 12 } Hs</span> 
          <input type="range"
          className={style.range}
          onChange={(e)=> handleChangeInputs(e)}
          value={inputs.duration}
          name="duration"
          min="1"
          max="24"
          />           
          </div>

        </div >
        <div>
          <label>Season:</label>
          <select name="season"onChange={(e)=> handleChangeInputs(e)}>
            <option value="Summer">Summer</option>
            <option value="Fall">Fall</option>
            <option value="Spring">Spring</option>
            <option value="Winter">Winter</option>
          </select>
        </div>

        <div>
        <label>Country: </label>
        <select name="country"onChange={(e)=> handleChangeInputs(e)}>
        {allCountries.length? allCountries.map(e=> 
        <option key={e.id} value={e.id}>{e.name}</option>): 
        <option value="none">no hay paises</option>}
        </select>
        </div>

        <input className={style.Sumbit}
        id="inputValidate"type="submit" 
        value="Submit" 
        onClick={(e)=> handleSumbit(e)} 
        disabled={!errors.name && !errors.country && !errors.season? false: true}/>
        <div className={style.Errors}>{

        }
          <h6 >{errors.name? errors.name:""}</h6>
          <h6 >{errors.country? errors.country:""}</h6>
          <h6 >{errors.season? errors.season:""}</h6>
        </div>
            <div  className={style.divs}>
              {inputs.season.length? inputs.season.map(e=> 
                <span className={style.btnClose} key={e}>{e.toUpperCase()}<button value={e} name="season" onClick={(e)=> onClosed(e)}>x</button></span>):
              <></>
               }
            </div> 
        <div className={style.divs}>
          {inputs.country.length?
           inputs.country.map(e=> 
          <span className={style.btnClose}key={e}>{e}<button name="country" value={e}  onClick={(e)=> onClosed(e)}>x</button></span>):
          <></>
          }
        </div>       
      </form>

</div>
    )	
}
