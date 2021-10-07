import React from "react"
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {postAddActivities, getCountries} from "../../actions/index.js"
import validate from "./validate.js"
import style from "./FormActivity.module.css"


export default function FormActivity(){

  const allCountries = useSelector((state)=> state.allCountries)
  const dispatch = useDispatch()

  const [inputs, setInputs] = useState({
    name: "",
    dificulty:"3",
    duration:"12",
    season:[],
    country: []
  })

  useEffect(()=>{dispatch(getCountries())},[dispatch])

  const [inputErrors, setInputErrors] = useState({name: "Activity is required",season: "Season is required",country: []})

  const handleChangeInputs = (e)=>{

    if(Array.isArray(inputs[e.target.name]) && inputs[e.target.name].length  > 5) return
    console.log(inputs.country.length+1)

    e.preventDefault()
    if(Array.isArray(inputs[e.target.name])&& !inputs[e.target.name].includes(e.target.value)){
      setInputs(()=>({...inputs, [e.target.name]: [...inputs[e.target.name],e.target.value]}))   
    }
    else{
      setInputs(()=>({
      ...inputs,
      [e.target.name]: Array.isArray(inputs[e.target.name])&& 
      inputs[e.target.name].includes(e.target.value)? inputs[e.target.name]: e.target.value
     }))
    }
    let errors = validate({...inputs,[e.target.name]:e.target.value})
    if(Object.values(errors).length !== 0 ){
      setInputErrors(errors)
    } else {
      setInputErrors({})
    }
  }

  const handleSumbit = (e)=>{
  e.preventDefault()
  dispatch(postAddActivities(inputs))
  }

  const onClosed = (e)=>{
    console.log(e.target.name + " "+ e.target.value)
    e.preventDefault()
    let filter = inputs[e.target.name].filter(arr=> arr !== e.target.value)
    setInputs(()=>({
      ...inputs,
      [e.target.name]: filter
    }))
  }
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
          <span>{inputs.duration? inputs.duration == 24? "+24": inputs.duration : 12 } Hs</span> 
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

        <input className={style.Sumbit}id="inputValidate"type="submit" value="Submit" onClick={(e)=> handleSumbit(e)} />
        <div className={style.Errors}>
          <h6 >{inputs.season && inputs.season.length? "": "Season is required"}</h6>
          <h6 >{inputs.country && inputs.country.length? "": "Country is required"}</h6>
          <h6 >{inputErrors.name? inputErrors.name: null}</h6>
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