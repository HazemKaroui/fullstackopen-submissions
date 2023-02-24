import { useState } from "react";
import CountryDetails from "./CountryDetails";

const CountryList = ({ countries }) => {
  const [shownCountry, setShownCountry] = useState(null);

  if (!countries) return null;
  if (shownCountry)
    return (
      <>
        <button onClick={() => setShownCountry(null)}>close</button>
        <CountryDetails country={shownCountry} />
      </>
    );

  if (countries === []) return <div>no countries match your query</div>;
  else if (countries.length === 1)
    return <CountryDetails country={countries[0]} />;
  else if (countries.length > 10)
    return <div>Too many matches, specify another filter</div>;
  else {
    console.log("rendering countries", countries);
    return countries.map((country) => (
      <div key={country.cca3}>
        {country.name.common}{" "}
        <button onClick={() => setShownCountry(country)}>show</button>
      </div>
    ));
  }
};

export default CountryList;
