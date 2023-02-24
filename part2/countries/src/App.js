import { useState, useEffect } from "react";
import CountryList from "./components/CountryList";
import countryService from "./services/Country";

function App() {
  const [countries, setCountries] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    let ignore = false;

    countryService.getAll().then((initialCountries) => {
      if (!ignore) {
        setCountries(initialCountries);
        console.log("fetched countries");
      }
    });

    return () => (ignore = true);
  }, []);

  const handleInput = (event) => {
    setFilter(event.target.value);
  };

  const filteredCountries = countries?.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div>
        find countries <input value={filter} onChange={handleInput} />
        <CountryList countries={filteredCountries} />
      </div>
    </>
  );
}

export default App;
