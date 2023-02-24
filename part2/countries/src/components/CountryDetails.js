import { useEffect, useState } from "react";
import countryService from "../services/Country";

const CountryDetails = ({ country }) => {
  const lat = country.capitalInfo.latlng[0];
  const lon = country.capitalInfo.latlng[1];
  const [capitalWeather, setCapitalWeather] = useState(null);
  const weatherIcon = `http://openweathermap.org/img/wn/${
    capitalWeather?.weather[0].icon ?? "01d"
  }@2x.png`;
  const weatherDescription = capitalWeather?.weather[0].description;

  useEffect(() => {
    countryService
      .getCityWeather(lat, lon)
      .then((response) => setCapitalWeather(response));
  }, []);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital: {country.capital}</div>
      <div>area: {country.area}</div>
      <h4>Languages</h4>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt={country.flags.alt} height="200" />
      <h2>Weather in {country.capital}</h2>
      <div>temperature is {capitalWeather?.main.temp ?? "..."} Celcius</div>
      <img src={weatherIcon} alt={weatherDescription} />
      <div>wind {capitalWeather?.wind.speed ?? "..."} m/s</div>
    </div>
  );
};

export default CountryDetails;
