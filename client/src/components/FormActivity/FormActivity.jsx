import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAddActivities, getCountries } from "../../actions/index.js";
import { Link } from "react-router-dom";
import { MsgComplete } from "../Utils/MsgComplete.jsx";

export default function FormActivity() {
  const allCountries = useSelector((state) => state.allCountries);
  const dispatch = useDispatch();
  const [complete, setComplete] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    dificulty: 3,
    duration: 12,
    season: [],
    country: [],
  });
  const [errors, setErrors] = useState({
    name: "Activity name: Min 5 letters required",
    season: "Season:  Select at least 1 season",
    country: "Countries: Select at least one country",
  });
  const validate = (input) => {
    let errors = {};
    if (input.name.search(/\d/) >= 0) {
      errors.name = "Activity name: Only letters";
    } else if (input.name.length < 5) {
      errors.name = "Activity name: Min 5 letters required";
    } else if (input.name.length > 25) {
      errors.name = "Activity name: Max 26 letter";
    }
    if (input.country.length <= 0) {
      errors.country = "Countries: Select at least one country";
    }
    if (input.season.length <= 0) {
      errors.season = "Season: Select at least 1 season";
    }
    return errors;
  };
  const handleChangeInputs = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (Array.isArray(inputs[name])) {
      if (inputs[name].includes(value)) {
        setInputs({ ...inputs });
        setErrors(validate({ ...inputs }));
      } else if (inputs[name].length < 21) {
        setInputs({ ...inputs, [name]: [...inputs[name], value] });
        setErrors(validate({ ...inputs, [name]: [...inputs[name], value] }));
      }
    } else {
      setInputs({ ...inputs, [name]: value });
      setErrors(validate({ ...inputs, [name]: value }));
    }
  };

  const onClosed = (e) => {
    e.preventDefault();
    let filter = inputs[e.target.name].filter((arr) => arr !== e.target.value);
    setErrors(validate({ ...inputs, [e.target.name]: filter }));
    setInputs({ ...inputs, [e.target.name]: filter });
  };

  const handleSubmit = (e) => {
    setTimeout(200);
    setInputs({
      name: "",
      dificulty: 3,
      duration: 12,
      season: [],
      country: [],
    });
    setErrors({
      name: "Activity name: Min 5 letters required",
      season: "Season:  Select at least 1 season",
      country: "Countries: Select at least one country",
    });
    e.preventDefault();
    setComplete(true);
    dispatch(postAddActivities(inputs));
  };
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className="form-container">
      <form className="form-wrapper">
        <Link to="/home" className="btn-back">
          {"<"}
        </Link>
        <h1>CREATE ACTIVITY</h1>
        <div className="form-label">
          <p className="form-title">Activity Name</p>
          <input
            type="text"
            placeholder="Tour du Mont Blanc, Camino del Inca..."
            onChange={(e) => handleChangeInputs(e)}
            value={inputs.name}
            name="name"
            autoComplete="off"
            className="form-inputs"
          />
        </div>
        <div className="form-multiply-label">
          <div className="form-label">
            <p className="form-title">Dificulty</p>
            <select
              name="dificulty"
              onChange={(e) => handleChangeInputs(e)}
              value={inputs.dificulty}
              className="form-inputs"
            >
              <option value="1">★ (Easy)</option>
              <option value="2">★★</option>
              <option value="3">★★★ (Medium)</option>
              <option value="4">★★★★</option>
              <option value="5">★★★★★ (Hard)</option>
            </select>
          </div>

          <div>
            <p className="form-title">Duration</p>
            <div>
              <input
                type="number"
                placeholder="72"
                min="1"
                max="72"
                name="duration"
                value={inputs.duration}
                onChange={(e) => handleChangeInputs(e)}
                className="form-inputs"
              />
              <span>HS</span>
            </div>
          </div>
          <div className="form-label">
            <p className="form-title">Season</p>
            <select
              name="season"
              onChange={(e) => handleChangeInputs(e)}
              className="form-inputs"
            >
              <option value="Summer">Summer</option>
              <option value="Autumn">Autumn</option>
              <option value="Spring">Spring</option>
              <option value="Winter">Winter</option>
            </select>
          </div>
        </div>
        <div>
          <div className="form-button">
            {inputs.season.length ? <hr /> : <></>}
            {inputs.season.length ? (
              inputs.season.map((e) => (
                <button
                  className="btn-season"
                  key={e}
                  value={e}
                  name="season"
                  onClick={(e) => onClosed(e)}
                >
                  {e}
                </button>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="form-label">
          <p className="form-title">Countries</p>
          <select
            name="country"
            onChange={(e) => handleChangeInputs(e)}
            className="form-inputs"
          >
            {allCountries.length ? (
              allCountries.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))
            ) : (
              <option value="none">no hay paises</option>
            )}
          </select>
        </div>
        <div className="form-button">
          {inputs.country.length ? <hr /> : <></>}
          {inputs.country.length ? (
            inputs.country.map((e) => (
              <button
                className="btn-country"
                key={e}
                name="country"
                value={e}
                onClick={(e) => onClosed(e)}
              >
                {e}
              </button>
            ))
          ) : (
            <></>
          )}
        </div>
        <div className="form-errors">
          {errors.season ? (
            <strong className="form-error">{errors.season}</strong>
          ) : (
            <></>
          )}
          {errors.country ? (
            <strong className="form-error">{errors.country}</strong>
          ) : (
            <></>
          )}
          {errors.name ? (
            <strong className="form-error">{errors.name}</strong>
          ) : (
            <></>
          )}
        </div>
        <input
          type="submit"
          value="Create Activity"
          className="form-btn-submit"
          onClick={(e) => handleSubmit(e)}
          disabled={
            !errors.name && !errors.country && !errors.season ? false : true
          }
        />
      </form>
      {complete && <MsgComplete setComplete={setComplete} />}
    </div>
  );
}

// style={{
//   backgroundImage: "url(" + { allCountries.filter((a) => a.id === e) } + ")",
// }}
