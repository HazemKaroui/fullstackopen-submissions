import axios from "axios";
const baseUrl = "https://restcountries.com/v3.1";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const apikey = process.env.REACT_APP_API_KEY;

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((response) => response.data);
};

const getByName = (name) => {
  const request = axios.get(`${baseUrl}/name/${name}`);
  return request.then((response) => response.data);
};

const getCityWeather = (lat, lon) => {
  const request = axios.get(
    `${weatherUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`
  );
  return request.then((response) => response.data);
};

export default { getAll, getByName, getCityWeather };
