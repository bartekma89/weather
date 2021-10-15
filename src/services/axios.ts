import _axios from "axios";

const axios = _axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  headers: {
    "content-type": "application/json",
  },
});

export default axios;
