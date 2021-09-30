import { useState } from "react";
import { connect } from "react-redux";
import { getCountries } from "../../actions";

function NavBar(props) {
  const [searchString, setSearchString] = useState("");

  const handleChange = ({ target }) => {
    setSearchString(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.getCountries(searchString);
  };

  return (
    <div>
      <div>traer paises</div>
      <form onSubmit={handleSubmit}>
        <input type="submit" />
      </form>
    </div>
  );
}

export default connect(null, { getCountries })(NavBar);
