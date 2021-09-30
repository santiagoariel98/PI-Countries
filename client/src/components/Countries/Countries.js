import { connect } from "react-redux";
import Country from "../Country/Country";
// import styles from "./Cards.module.css";
import { Link } from "react-router-dom";


function Countries({ countries }) {
  return (
    <>
      {countries
        ? countries.map((country) => {
            return (
              <Link to={`/${country.id}`}>
                <Country

                  img={country.img}                
                  name={country.name}
                  continent={country.continent}
                />
              </Link>
            );
          })
        : ""}
    </>
  );
}

function mapStateToProps(state) {
  return {
    countries: state.countries,
  };
}
export default connect(mapStateToProps)(Countries);
